<template>
  <div class="mockup-page">
    <div class="mockup-label">Variation 3 — Ellipsis Menu + Inline Panel</div>
    <div class="mockup-description">Default shows signals. Ellipsis menu options swap to config panels with a back button.</div>

    <div class="widget-container">
      <div class="ai-widget-border">
        <div class="ai-widget-inner">
          <!-- Header -->
          <div class="ai-widget-header">
            <svg width="0" height="0" style="position: absolute;">
              <defs>
                <linearGradient id="ai-sparkle-gradient-v3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7423e2" />
                  <stop offset="100%" stop-color="#128297" />
                </linearGradient>
              </defs>
            </svg>

            <button v-if="activePanel" class="back-button" @click="activePanel = null">
              <PendoIcon type="arrow-left" :size="16" :stroke-width="2" />
            </button>

            <div v-if="!activePanel" class="ai-widget-icon-border">
              <div class="ai-widget-icon-inner">
                <PendoIcon type="sparkle" :size="18" stroke="url(#ai-sparkle-gradient-v3)" :stroke-width="1.5" />
              </div>
            </div>
            <span class="ai-widget-title">{{ activePanel ? panelTitles[activePanel] : 'Dashboard signals' }}</span>

            <div class="header-actions">
              <div class="ai-widget-more">
                <PendoButton type="tertiary" icon="more-horizontal-filled" aria-label="More options" @click="toggleMenu" />
                <div v-if="showMenu" class="menu-wrapper">
                  <PendoDropdownMenu width="220px">
                    <PendoDropdownOption icon="settings" label="Customize signals" @click="openPanel('customize')" />
                    <PendoDropdownOption icon="slack" label="Automated Slack updates" @click="openPanel('autoSlack')" />
                    <PendoDropdownOption icon="send" label="Share to Slack" @click="openPanel('manualSlack')" />
                  </PendoDropdownMenu>
                </div>
              </div>
            </div>
          </div>

          <!-- Default: Signal Content -->
          <div v-if="!activePanel" class="signals">
            <div class="signal">
              <div class="signal-icon signal-icon--up">
                <PendoIcon type="trending-up" :size="14" :stroke-width="2" />
              </div>
              <div class="signal-content">
                <div class="signal-title">Visitors up 12% week-over-week</div>
                <div class="signal-desc">Driven primarily by Enterprise segment growth.</div>
              </div>
            </div>
            <div class="signal">
              <div class="signal-icon signal-icon--down">
                <PendoIcon type="trending-down" :size="14" :stroke-width="2" />
              </div>
              <div class="signal-content">
                <div class="signal-title">Account activity declining in EMEA</div>
                <div class="signal-desc">3 accounts dropped below active threshold this week.</div>
              </div>
            </div>
            <div class="signal">
              <div class="signal-icon signal-icon--new">
                <PendoIcon type="sparkle" :size="14" :stroke-width="2" />
              </div>
              <div class="signal-content">
                <div class="signal-title">New: Analytics tab adoption reached 45%</div>
                <div class="signal-desc">Fastest-growing feature among data team users.</div>
              </div>
            </div>
          </div>

          <!-- Panel: Customize -->
          <div v-if="activePanel === 'customize'" class="panel">
            <p class="panel-description">Select which dashboard widgets provide context for signals:</p>
            <div class="widget-list">
              <label v-for="widget in widgets" :key="widget.id" class="widget-row">
                <PendoCheckbox v-model="widget.selected" />
                <span class="widget-name">{{ widget.name }}</span>
                <PendoTag v-if="widget.recommended" type="filter" label="Recommended" size="regular" />
                <span class="widget-activity">{{ widget.activity }}</span>
              </label>
            </div>
            <div class="panel-actions">
              <PendoButton type="secondary" label="Cancel" @click="activePanel = null" />
              <PendoButton type="primary" label="Save" />
            </div>
          </div>

          <!-- Panel: Auto Slack -->
          <div v-if="activePanel === 'autoSlack'" class="panel">
            <div class="form-fields">
              <div class="form-field">
                <label class="form-label">Channel</label>
                <PendoDropdownTrigger variant="standard" model-value="#product-insights" placeholder="Select channel" />
              </div>
              <div class="form-field">
                <label class="form-label">Frequency</label>
                <PendoDropdownTrigger variant="standard" model-value="Weekly on Mondays" placeholder="Select frequency" />
              </div>
              <div class="form-field">
                <label class="form-label">Include</label>
                <PendoDropdownTrigger variant="standard" model-value="All signals" placeholder="Select scope" />
              </div>
            </div>
            <div class="slack-status">
              <PendoIcon type="slack" :size="16" />
              <span>Connected to Acme workspace</span>
            </div>
            <div class="panel-actions">
              <PendoButton type="secondary" label="Disable" />
              <PendoButton type="primary" label="Save changes" />
            </div>
          </div>

          <!-- Panel: Manual Slack -->
          <div v-if="activePanel === 'manualSlack'" class="panel">
            <div class="form-fields">
              <div class="form-field">
                <label class="form-label">Channel</label>
                <PendoDropdownTrigger variant="standard" model-value="#product-insights" placeholder="Select channel" />
              </div>
              <div class="form-field">
                <label class="form-label">Commentary</label>
                <textarea class="commentary-input" placeholder="Add your commentary..." rows="3" />
              </div>
            </div>
            <label class="include-signals">
              <PendoCheckbox :model-value="true" />
              <span>Include all current signals</span>
            </label>
            <div class="panel-actions">
              <PendoButton type="secondary" label="Cancel" @click="activePanel = null" />
              <PendoButton type="primary" prefix-icon="slack" label="Send to Slack" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  PendoButton,
  PendoIcon,
  PendoCheckbox,
  PendoTag,
  PendoDropdownTrigger,
  PendoDropdownMenu,
  PendoDropdownOption
} from './pendo'

const activePanel = ref(null)
const showMenu = ref(false)

const panelTitles = {
  customize: 'Customize signals',
  autoSlack: 'Automated Slack updates',
  manualSlack: 'Share to Slack'
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const openPanel = (panel) => {
  activePanel.value = panel
  showMenu.value = false
}

const widgets = reactive([
  { id: 1, name: 'Weekly active visitors and accounts', activity: '18 views/week', selected: true, recommended: true },
  { id: 2, name: 'Number of visitors', activity: '12 views/week', selected: true, recommended: true },
  { id: 3, name: 'Number of accounts', activity: '9 views/week', selected: true, recommended: true },
  { id: 4, name: 'User feedback | Trends feature', activity: '3 views/week', selected: false, recommended: false },
  { id: 5, name: 'Feature background', activity: '1 view/week', selected: false, recommended: false },
  { id: 6, name: 'The team', activity: 'No recent activity', selected: false, recommended: false }
])
</script>

<style scoped>
.mockup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
  min-height: 100vh;
  background: var(--gray-10, #F5F6F8);
}

.mockup-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--gray-100, #2a2c35);
  margin-bottom: 8px;
}

.mockup-description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-70, #6a6c75);
  margin-bottom: 32px;
}

.widget-container {
  width: 100%;
  max-width: 640px;
}

/* Widget shell */
.ai-widget-border {
  border-radius: 6px;
  padding: 1.5px;
  background: linear-gradient(135deg, rgba(116, 35, 226, 0.5), rgba(18, 130, 151, 0.5));
}

.ai-widget-inner {
  background: linear-gradient(135deg, #fafefe, #ffffff);
  border-radius: 4.5px;
  padding: 12px 12px 24px;
}

.ai-widget-icon-border {
  width: 35px;
  height: 35px;
  border-radius: 6px;
  padding: 1.5px;
  background: linear-gradient(135deg, rgba(116, 35, 226, 0.5), rgba(18, 130, 151, 0.5));
  flex-shrink: 0;
}

.ai-widget-icon-inner {
  width: 32px;
  height: 32px;
  border-radius: 4.5px;
  background: linear-gradient(135deg, #fafefe, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-widget-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-widget-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  color: var(--gray-100, #2a2c35);
}

.header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.ai-widget-more {
  position: relative;
}

.ai-widget-more :deep(.pendo-button) {
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

.ai-widget-more :deep(.pendo-button:hover) {
  background-color: rgba(0, 0, 0, 0.06);
}

.menu-wrapper {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  margin-top: 4px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-70, #6a6c75);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.06);
  color: var(--gray-100, #2a2c35);
}

/* Signals */
.signals {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.signal {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--gray-20, #F4F4F7);
}

.signal:last-child {
  border-bottom: none;
}

.signal-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.signal-icon--up {
  background: rgba(0, 170, 98, 0.1);
  color: #00AA62;
}

.signal-icon--down {
  background: rgba(218, 16, 16, 0.1);
  color: #DA1010;
}

.signal-icon--new {
  background: rgba(116, 35, 226, 0.1);
  color: #7423e2;
}

.signal-content {
  flex: 1;
  min-width: 0;
}

.signal-title {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  line-height: 1.4;
}

.signal-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
  line-height: 1.4;
  margin-top: 2px;
}

/* Panel content */
.panel {
  margin-top: 20px;
  padding: 0 4px;
}

.panel-description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-70, #6a6c75);
  margin: 0 0 16px;
}

/* Widget list */
.widget-list {
  display: flex;
  flex-direction: column;
}

.widget-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--gray-20, #F4F4F7);
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.widget-row:hover {
  background-color: var(--gray-10, #F5F6F8);
}

.widget-row:last-child {
  border-bottom: none;
}

.widget-name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.widget-activity {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-70, #6a6c75);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Form fields */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.slack-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 10px 12px;
  background: var(--gray-10, #F5F6F8);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
}

.commentary-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--gray-40, #DADCE5);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  resize: vertical;
  outline: none;
  transition: border-color 0.15s ease;
}

.commentary-input:focus {
  border-color: var(--gray-100, #2a2c35);
}

.commentary-input::placeholder {
  color: var(--gray-50, #BABCC5);
}

.include-signals {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
}

.panel-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
</style>
