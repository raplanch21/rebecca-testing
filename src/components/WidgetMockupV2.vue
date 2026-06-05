<template>
  <div class="mockup-page">
    <div class="mockup-label">Variation 2 — Footer Actions + Expandable Sections</div>
    <div class="mockup-description">Signals always visible. Footer action links expand config sections inline below.</div>

    <div class="widget-container">
      <div class="ai-widget-border">
        <div class="ai-widget-inner">
          <!-- Header -->
          <div class="ai-widget-header">
            <svg width="0" height="0" style="position: absolute;">
              <defs>
                <linearGradient id="ai-sparkle-gradient-v2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#7423e2" />
                  <stop offset="100%" stop-color="#128297" />
                </linearGradient>
              </defs>
            </svg>
            <div class="ai-widget-icon-border">
              <div class="ai-widget-icon-inner">
                <PendoIcon type="sparkle" :size="18" stroke="url(#ai-sparkle-gradient-v2)" :stroke-width="1.5" />
              </div>
            </div>
            <span class="ai-widget-title">Dashboard signals</span>
            <div class="ai-widget-more">
              <PendoButton type="tertiary" icon="more-horizontal-filled" aria-label="More options" />
            </div>
          </div>

          <!-- Signal Content (always visible) -->
          <div class="signals">
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

          <!-- Footer Actions -->
          <div class="footer-divider" />
          <div class="footer-actions">
            <button
              class="footer-action"
              :class="{ 'footer-action--active': openSection === 'customize' }"
              @click="toggleSection('customize')"
            >
              <PendoIcon type="settings" :size="14" :stroke-width="1.5" />
              <span>Customize</span>
            </button>
            <button
              class="footer-action"
              :class="{ 'footer-action--active': openSection === 'autoSlack' }"
              @click="toggleSection('autoSlack')"
            >
              <PendoIcon type="slack" :size="14" />
              <span>Auto updates</span>
            </button>
            <button
              class="footer-action"
              :class="{ 'footer-action--active': openSection === 'manualSlack' }"
              @click="toggleSection('manualSlack')"
            >
              <PendoIcon type="send" :size="14" :stroke-width="1.5" />
              <span>Share</span>
            </button>
          </div>

          <!-- Expandable Section: Customize -->
          <div v-if="openSection === 'customize'" class="expanded-section">
            <div class="expanded-section-header">
              <span class="expanded-section-title">Customize signals</span>
              <button class="close-section" @click="openSection = null">
                <PendoIcon type="x" :size="14" :stroke-width="2" />
              </button>
            </div>
            <p class="expanded-section-desc">Select widgets to use as context:</p>
            <div class="widget-list">
              <label v-for="widget in widgets" :key="widget.id" class="widget-row">
                <PendoCheckbox v-model="widget.selected" />
                <span class="widget-name">{{ widget.name }}</span>
                <PendoTag v-if="widget.recommended" type="filter" label="Recommended" size="regular" />
                <span class="widget-activity">{{ widget.activity }}</span>
              </label>
            </div>
            <div class="section-actions">
              <PendoButton type="secondary" label="Cancel" @click="openSection = null" />
              <PendoButton type="primary" label="Save" />
            </div>
          </div>

          <!-- Expandable Section: Auto Slack -->
          <div v-if="openSection === 'autoSlack'" class="expanded-section">
            <div class="expanded-section-header">
              <span class="expanded-section-title">Automated Slack updates</span>
              <button class="close-section" @click="openSection = null">
                <PendoIcon type="x" :size="14" :stroke-width="2" />
              </button>
            </div>
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
            <div class="section-actions">
              <PendoButton type="secondary" label="Cancel" @click="openSection = null" />
              <PendoButton type="primary" label="Enable automation" />
            </div>
          </div>

          <!-- Expandable Section: Manual Slack -->
          <div v-if="openSection === 'manualSlack'" class="expanded-section">
            <div class="expanded-section-header">
              <span class="expanded-section-title">Share to Slack</span>
              <button class="close-section" @click="openSection = null">
                <PendoIcon type="x" :size="14" :stroke-width="2" />
              </button>
            </div>
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
            <div class="section-actions">
              <PendoButton type="secondary" label="Cancel" @click="openSection = null" />
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
  PendoDropdownTrigger
} from './pendo'

const openSection = ref(null)

const toggleSection = (section) => {
  openSection.value = openSection.value === section ? null : section
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
  padding: 12px 12px 16px;
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

.ai-widget-more {
  margin-left: auto;
}

.ai-widget-more :deep(.pendo-button) {
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

.ai-widget-more :deep(.pendo-button:hover) {
  background-color: rgba(0, 0, 0, 0.06);
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

/* Footer */
.footer-divider {
  height: 1px;
  background: var(--gray-30, #EAECF1);
  margin: 12px 0;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-action {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: none;
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-70, #6a6c75);
  cursor: pointer;
  transition: all 0.15s ease;
}

.footer-action:hover {
  color: var(--gray-100, #2a2c35);
  background: rgba(0, 0, 0, 0.03);
}

.footer-action--active {
  color: var(--teal-70, #128297);
  background: rgba(18, 130, 151, 0.06);
  border-color: rgba(18, 130, 151, 0.2);
}

/* Expanded section */
.expanded-section {
  margin-top: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 6px;
}

.expanded-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.expanded-section-title {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.close-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-60, #9A9CA5);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.close-section:hover {
  background-color: rgba(0, 0, 0, 0.06);
  color: var(--gray-100, #2a2c35);
}

.expanded-section-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
  margin: 0 0 12px;
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
  padding: 8px 4px;
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
  font-size: 13px;
  color: var(--gray-100, #2a2c35);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.widget-activity {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: var(--gray-70, #6a6c75);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Form fields */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.slack-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 8px 10px;
  background: var(--gray-10, #F5F6F8);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
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
  margin-top: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
}

.section-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
</style>
