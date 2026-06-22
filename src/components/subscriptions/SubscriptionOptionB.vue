<template>
  <div class="option-b">
    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-header__title">Feature Launch Dashboard</h1>
        <PendoTag type="info" label="Option B: Card Deck" size="small" />
      </div>
      <PendoButton type="primary" prefix-icon="bell" label="Manage digests" @click="showBlade = true" />
    </div>

    <!-- Dashboard placeholder -->
    <div class="dashboard-placeholder">
      <p>Dashboard content area</p>
    </div>

    <!-- Blade (card grid) -->
    <Transition name="blade-slide">
      <div v-if="showBlade" class="blade-overlay">
        <div class="blade-backdrop" @click="showBlade = false" />
        <div class="blade-panel">
          <div class="blade-header">
            <h2 class="blade-header__title">Digests</h2>
            <button type="button" class="blade-close-btn" @click="showBlade = false">
              <PendoIcon type="x" :size="16" />
            </button>
          </div>

          <div class="blade-body">
            <p class="blade-desc">Configure recurring AI-generated insights delivered to Slack, Teams, or email.</p>

            <!-- Empty state -->
            <div v-if="subscriptions.length === 0" class="empty-state">
              <div class="empty-state__icon">
                <PendoIcon type="send" :size="28" />
              </div>
              <p class="empty-state__title">Create your first digest</p>
              <p class="empty-state__desc">Automate insights delivery to keep your team informed without manual effort.</p>
              <PendoButton type="primary" prefix-icon="plus" label="New digest" @click="openWizard(null)" />
            </div>

            <!-- Card grid -->
            <div v-else class="card-grid">
              <div
                v-for="sub in subscriptions"
                :key="sub.id"
                class="sub-card"
                :class="{ 'sub-card--paused': sub.status === 'paused' }"
              >
                <div class="sub-card__top">
                  <div class="sub-card__title-row">
                    <span class="sub-card__name">{{ sub.name || 'Untitled' }}</span>
                    <div class="sub-card__actions">
                      <button class="sub-card__action" title="Duplicate" @click.stop="duplicateSub(sub)">
                        <PendoIcon type="copy" :size="13" />
                      </button>
                      <button class="sub-card__action sub-card__action--danger" title="Delete" @click.stop="deleteSub(sub.id)">
                        <PendoIcon type="trash-2" :size="13" />
                      </button>
                    </div>
                  </div>
                  <div class="sub-card__pills">
                    <span class="sub-card__pill">{{ getSegmentLabel(sub.segment) }}</span>
                    <span class="sub-card__pill">{{ getDetailLabel(sub.detailLevel) }}</span>
                    <span class="sub-card__pill">{{ sub.selectedWidgets.length }} widgets</span>
                  </div>
                </div>

                <div class="sub-card__divider" />

                <div class="sub-card__bottom">
                  <div class="sub-card__schedule">
                    <PendoIcon type="calendar" :size="13" />
                    <span>{{ formatScheduleSummary(sub) }}</span>
                  </div>
                  <div class="sub-card__channel">
                    <PendoIcon type="hash" :size="13" />
                    <span>{{ sub.channels.join(', ') || 'No channels' }}</span>
                  </div>
                  <div class="sub-card__footer">
                    <div class="sub-card__status">
                      <span
                        class="status-dot"
                        :class="sub.status === 'active' ? 'status-dot--active' : 'status-dot--paused'"
                      />
                      <span class="status-label">{{ sub.status === 'active' ? 'Active' : 'Paused' }}</span>
                    </div>
                    <div class="sub-card__footer-actions">
                      <PendoToggle :modelValue="sub.status === 'active'" @update:modelValue="toggleStatus(sub)" />
                      <button class="sub-card__edit-btn" @click="openWizard(sub)">
                        <PendoIcon type="edit" :size="13" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- New digest CTA card -->
              <button class="new-card" @click="openWizard(null)">
                <PendoIcon type="plus" :size="20" />
                <span>New digest</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Fullscreen wizard drawer -->
    <PendoDrawer
      :visible="wizardOpen"
      :title="isEditing ? 'Edit digest' : 'New digest'"
      size="fullscreen"
      placement="bottom"
      :mask="false"
      @update:visible="wizardOpen = $event"
      @close="closeWizard"
    >
      <template #header="{ close }">
        <div class="wizard-masthead__left">
          <span class="wizard-masthead__title">{{ isEditing ? 'Edit digest' : 'New digest' }}</span>
        </div>
        <div class="wizard-masthead__center">
          <button
            :class="['wizard-step', { 'wizard-step--active': wizardStep === 1, 'wizard-step--done': wizardStep === 2 }]"
            @click="wizardStep = 1"
          >
            <span class="wizard-step__num">1</span>
            Configure
          </button>
          <PendoIcon class="wizard-step__chevron" type="chevron-right" :size="16" />
          <button
            :class="['wizard-step', { 'wizard-step--active': wizardStep === 2 }]"
            @click="wizardStep = 2"
          >
            <span class="wizard-step__num">2</span>
            Schedule
          </button>
        </div>
        <div class="wizard-masthead__right">
          <button type="button" class="wizard-close-btn" @click="close">
            <PendoIcon type="x" :size="16" />
          </button>
        </div>
      </template>

      <!-- Wizard body -->
      <div class="wizard-body">
        <!-- STEP 1: Configure -->
        <div v-if="wizardStep === 1" class="wizard-content">
          <PendoCard :bordered="true" :shadow="false" body-padding="0" class="wizard-card">
            <template #header>
              <span class="wizard-card__header-text">Configure digest content</span>
            </template>
            <div class="wizard-card__body">
              <div class="wizard-section">
                <h4 class="wizard-label">Segment</h4>
                <p class="wizard-helper">Choose a segment to filter dashboard data for this digest.</p>
                <div class="wizard-field" style="max-width: 280px;">
                  <PendoSelect v-model="draft.segment" :options="SEGMENTS" />
                </div>
              </div>

              <div class="wizard-section">
                <h4 class="wizard-label">Message detail level</h4>
                <p class="wizard-helper">Choose how much depth each delivery should include.</p>
                <div class="detail-cards">
                  <button
                    v-for="level in DETAIL_LEVELS"
                    :key="level.value"
                    :class="['detail-card', { 'detail-card--selected': draft.detailLevel === level.value }]"
                    @click="draft.detailLevel = level.value"
                  >
                    <PendoIcon :type="detailIcon(level.value)" :size="20" />
                    <span class="detail-card__label">{{ level.label }}</span>
                    <span class="detail-card__desc">{{ level.description }}</span>
                  </button>
                </div>
              </div>

              <div class="wizard-section">
                <h4 class="wizard-label">Widgets</h4>
                <p class="wizard-helper">Select which dashboard widgets to include in this digest.</p>
                <div class="widget-grid">
                  <label
                    v-for="w in WIDGETS"
                    :key="w.id"
                    class="widget-card"
                    :class="{ 'widget-card--selected': draft.selectedWidgets.includes(w.id) }"
                  >
                    <PendoCheckbox :modelValue="draft.selectedWidgets.includes(w.id)" @update:modelValue="toggleWidget(w.id)" />
                    <div class="widget-card__text">
                      <span class="widget-card__name">{{ w.name }}</span>
                      <span class="widget-card__meta">{{ w.activity }}</span>
                    </div>
                    <PendoTag v-if="w.recommended" type="filter" label="Rec" size="small" />
                  </label>
                </div>
              </div>
            </div>
          </PendoCard>
        </div>

        <!-- STEP 2: Schedule -->
        <div v-if="wizardStep === 2" class="wizard-content">
          <PendoCard :bordered="true" :shadow="false" body-padding="0" class="wizard-card">
            <template #header>
              <span class="wizard-card__header-text">Set up schedule & delivery</span>
            </template>
            <div class="wizard-card__body">
              <div class="wizard-section">
                <h4 class="wizard-label">Digest name</h4>
                <p class="wizard-helper">This name appears at the top of each delivery.</p>
                <div class="wizard-field" style="max-width: 400px;">
                  <PendoInput v-model="draft.name" placeholder="e.g., Weekly Executive Digest" />
                </div>
              </div>

              <div class="wizard-section">
                <h4 class="wizard-label">Frequency</h4>
                <div class="freq-group">
                  <button
                    v-for="f in FREQUENCIES"
                    :key="f.value"
                    type="button"
                    :class="['freq-btn', { 'freq-btn--active': draft.frequency === f.value }]"
                    @click="draft.frequency = f.value"
                  >
                    {{ f.label }}
                  </button>
                </div>
                <div class="schedule-row">
                  <div v-if="draft.frequency === 'Weekly'" class="schedule-field">
                    <label class="schedule-field__label">Day</label>
                    <PendoSelect v-model="draft.day" :options="DAYS" />
                  </div>
                  <div class="schedule-field">
                    <label class="schedule-field__label">Time</label>
                    <PendoSelect v-model="draft.time" :options="TIMES" />
                  </div>
                  <div class="schedule-field">
                    <label class="schedule-field__label">Timezone</label>
                    <PendoSelect v-model="draft.timezone" :options="TIMEZONES" />
                  </div>
                </div>
              </div>

              <div class="wizard-section">
                <h4 class="wizard-label">Destination</h4>
                <div class="wizard-field" style="max-width: 200px;">
                  <PendoSelect v-model="draft.destination" :options="DESTINATIONS" />
                </div>
              </div>

              <div class="wizard-section">
                <h4 class="wizard-label">Channels</h4>
                <div class="channel-picker">
                  <div class="channel-picker__row">
                    <div v-for="(ch, i) in draft.channels" :key="ch" class="channel-chip">
                      <span>{{ ch }}</span>
                      <button type="button" class="channel-chip__x" @click="draft.channels.splice(i, 1)">
                        <PendoIcon type="x" :size="10" />
                      </button>
                    </div>
                    <div class="channel-add-wrapper">
                      <button type="button" class="channel-add-btn" @click="showChannelMenu = !showChannelMenu">
                        <PendoIcon type="plus" :size="12" /> Add
                      </button>
                      <div v-if="showChannelMenu" class="channel-menu">
                        <div
                          v-for="ch in availableChannels"
                          :key="ch"
                          class="channel-menu__item"
                          @click="draft.channels.push(ch); showChannelMenu = false"
                        >
                          {{ ch }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PendoCard>
        </div>
      </div>

      <template #footer-right>
        <PendoButton v-if="wizardStep === 2" type="secondary" label="Back" @click="wizardStep = 1" />
        <PendoButton v-if="wizardStep === 1" type="primary" label="Next: Schedule" @click="wizardStep = 2" />
        <PendoButton v-else type="primary" :label="isEditing ? 'Save changes' : 'Create digest'" @click="saveWizard" />
      </template>
    </PendoDrawer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { PendoButton, PendoIcon, PendoInput, PendoSelect, PendoTag, PendoCheckbox, PendoToggle, PendoCard, PendoDrawer } from '../pendo'
import {
  SEGMENTS, DETAIL_LEVELS, WIDGETS, FREQUENCIES, DAYS, TIMES, TIMEZONES, DESTINATIONS, CHANNELS,
  createMockSubscriptions, createBlankSubscription, formatScheduleSummary, getSegmentLabel, getDetailLabel
} from './shared'

const showBlade = ref(true)
const wizardOpen = ref(false)
const wizardStep = ref(1)
const isEditing = ref(false)
const editingId = ref(null)
const subscriptions = createMockSubscriptions()
const draft = reactive(createBlankSubscription())
const showChannelMenu = ref(false)

const availableChannels = computed(() =>
  CHANNELS.filter(ch => !draft.channels.includes(ch))
)

function detailIcon (value) {
  if (value === 'executive') return 'zap'
  if (value === 'summary') return 'align-left'
  return 'file-text'
}

function openWizard (sub) {
  if (sub) {
    Object.assign(draft, JSON.parse(JSON.stringify(sub)))
    isEditing.value = true
    editingId.value = sub.id
  } else {
    Object.assign(draft, createBlankSubscription())
    isEditing.value = false
    editingId.value = null
  }
  wizardStep.value = 1
  wizardOpen.value = true
}

function closeWizard () {
  wizardOpen.value = false
}

function toggleWidget (id) {
  const idx = draft.selectedWidgets.indexOf(id)
  if (idx > -1) draft.selectedWidgets.splice(idx, 1)
  else draft.selectedWidgets.push(id)
}

function toggleStatus (sub) {
  const previousStatus = sub.status
  sub.status = sub.status === 'active' ? 'paused' : 'active'

  pendo.track('digest_status_toggled', {
    digest_id: sub.id,
    new_status: sub.status,
    previous_status: previousStatus,
    sub_option_variant: 'B'
  })
}

function saveWizard () {
  if (isEditing.value) {
    const idx = subscriptions.findIndex(s => s.id === editingId.value)
    if (idx > -1) Object.assign(subscriptions[idx], JSON.parse(JSON.stringify(draft)))
  } else {
    subscriptions.push(reactive(JSON.parse(JSON.stringify(draft))))
  }
  closeWizard()
}

function duplicateSub (sub) {
  const clone = JSON.parse(JSON.stringify(sub))
  clone.id = `sub-${Date.now()}`
  clone.name = `${sub.name} (copy)`
  subscriptions.push(reactive(clone))
}

function deleteSub (id) {
  const idx = subscriptions.findIndex(s => s.id === id)
  if (idx > -1) subscriptions.splice(idx, 1)
}
</script>

<style scoped>
/* ── Page layout ── */
.option-b {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--gray-10, #f5f6f8);
  position: relative;
  overflow: hidden;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: white;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
}

.page-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-header__title {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.dashboard-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-50, #9a9da5);
  font-family: 'Inter', sans-serif;
}

/* ── Blade (card grid host) ── */
.blade-overlay {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.blade-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.08);
}

.blade-panel {
  position: relative;
  width: 520px;
  background: white;
  border-left: 1px solid var(--gray-30, #eaecf1);
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1;
}

.blade-slide-enter-active,
.blade-slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.blade-slide-enter-from,
.blade-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}

.blade-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
  flex-shrink: 0;
}

.blade-header__title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.blade-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-80, #4a4c55);
}

.blade-close-btn:hover {
  background: var(--gray-20, #f0f1f4);
}

.blade-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.blade-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-70, #6a6c75);
  margin: 0 0 20px;
  line-height: 1.5;
}

/* ── Empty state ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
}

.empty-state__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(18, 130, 151, 0.08), rgba(18, 130, 151, 0.16));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal-90, #01586a);
  margin-bottom: 16px;
}

.empty-state__title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0 0 6px;
}

.empty-state__desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-60, #8a8d97);
  margin: 0 0 16px;
  max-width: 280px;
  line-height: 1.5;
}

/* ── Card grid ── */
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sub-card {
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.sub-card:hover {
  border-color: var(--gray-40, #dadce5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.sub-card--paused {
  opacity: 0.7;
}

.sub-card__top {
  padding: 14px 16px 10px;
}

.sub-card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.sub-card__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.sub-card__actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.15s;
}

.sub-card:hover .sub-card__actions {
  opacity: 1;
}

.sub-card__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-50, #9a9da5);
}

.sub-card__action:hover {
  background: var(--gray-20, #f0f1f4);
  color: var(--gray-80, #4a4c55);
}

.sub-card__action--danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

.sub-card__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sub-card__pill {
  display: inline-flex;
  padding: 2px 8px;
  background: var(--gray-10, #f5f6f8);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--gray-70, #6a6c75);
}

.sub-card__divider {
  height: 1px;
  background: var(--gray-20, #f0f1f4);
  margin: 0 16px;
}

.sub-card__bottom {
  padding: 10px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sub-card__schedule,
.sub-card__channel {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  color: var(--gray-60, #8a8d97);
}

.sub-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.sub-card__status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.status-dot--active { background: #00a86b; }
.status-dot--paused { background: #b0b2bc; }

.status-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-60, #8a8d97);
}

.sub-card__footer-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sub-card__edit-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 4px;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-70, #6a6c75);
  transition: all 0.15s;
}

.sub-card__edit-btn:hover {
  border-color: var(--teal-90, #01586a);
  color: var(--teal-90, #01586a);
}

/* New digest CTA card */
.new-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 28px;
  border: 2px dashed var(--gray-30, #eaecf1);
  border-radius: 8px;
  background: none;
  cursor: pointer;
  color: var(--gray-50, #9a9da5);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.new-card:hover {
  border-color: var(--teal-90, #01586a);
  color: var(--teal-90, #01586a);
  background: rgba(18, 130, 151, 0.02);
}

/* ── Wizard masthead ── */
:deep(.pendo-drawer__header) {
  height: 72px !important;
  min-height: 72px !important;
  align-items: center;
  padding: 0 24px !important;
  background: white;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
}

.wizard-masthead__left,
.wizard-masthead__right {
  flex: 1 0 0;
  display: flex;
  align-items: center;
}

.wizard-masthead__right {
  justify-content: flex-end;
}

.wizard-masthead__title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.wizard-masthead__center {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wizard-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: none;
  background: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-50, #9a9da5);
  cursor: pointer;
  transition: all 0.15s;
}

.wizard-step--active {
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.wizard-step--done {
  color: var(--gray-70, #6a6c75);
}

.wizard-step__num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background: var(--gray-20, #f0f1f4);
  color: var(--gray-60, #8a8d97);
}

.wizard-step--active .wizard-step__num {
  background: var(--teal-90, #01586a);
  color: white;
}

.wizard-step--done .wizard-step__num {
  background: var(--teal-60, #5bbfc9);
  color: white;
}

.wizard-step__chevron {
  color: var(--gray-40, #dadce5);
}

.wizard-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-80, #4a4c55);
}

.wizard-close-btn:hover {
  background: var(--gray-20, #f0f1f4);
}

/* ── Wizard body ── */
.wizard-body {
  padding: 24px;
  height: 100%;
}

.wizard-content {
  height: 100%;
}

.wizard-card {
  height: 100%;
}

.wizard-card :deep(.pendo-card__body) {
  overflow-y: auto;
}

.wizard-card__header-text {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: var(--gray-100, #2a2c35);
}

.wizard-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.wizard-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wizard-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.wizard-helper {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-60, #8a8d97);
  margin: 0 0 4px;
  line-height: 1.5;
}

.wizard-field :deep(.pendo-select),
.wizard-field :deep(.pendo-input) {
  width: 100% !important;
  display: block !important;
}

.wizard-field :deep(.pendo-select__trigger) {
  width: 100% !important;
}

/* Detail level cards */
.detail-cards {
  display: flex;
  gap: 10px;
}

.detail-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  color: var(--gray-60, #8a8d97);
}

.detail-card:hover {
  border-color: var(--gray-50, #9a9da5);
}

.detail-card--selected {
  border-color: var(--teal-90, #01586a);
  background: rgba(18, 130, 151, 0.03);
  color: var(--teal-90, #01586a);
}

.detail-card__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.detail-card__desc {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-60, #8a8d97);
  line-height: 1.4;
}

/* Widget grid */
.widget-grid {
  display: flex;
  flex-direction: column;
}

.widget-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  cursor: pointer;
  transition: background 0.1s;
}

.widget-card:last-child { border-bottom: none; }

.widget-card:hover { background: var(--gray-10, #f5f6f8); }

.widget-card--selected {
  background: rgba(18, 130, 151, 0.02);
}

.widget-card__text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.widget-card__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-100, #2a2c35);
}

.widget-card__meta {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-50, #9a9da5);
}

/* Frequency + Schedule (shared) */
.freq-group {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--gray-40, #dadce5);
  max-width: 360px;
}

.freq-btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-80, #4a4c55);
  cursor: pointer;
  transition: all 0.15s;
}

.freq-btn:not(:last-child) {
  border-right: 1px solid var(--gray-40, #dadce5);
}

.freq-btn--active {
  background: rgba(18, 130, 151, 0.08);
  color: var(--teal-90, #01586a);
  font-weight: 600;
}

.schedule-row {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  max-width: 480px;
}

.schedule-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.schedule-field__label {
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--gray-80, #4a4c55);
}

.schedule-field :deep(.pendo-select) {
  width: 100% !important;
  display: block !important;
  min-width: 0 !important;
}

.schedule-field :deep(.pendo-select__trigger) {
  width: 100% !important;
  min-width: 0 !important;
}

/* Channel picker */
.channel-picker__row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.channel-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-20, #f0f1f4);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--gray-90, #3a3c45);
}

.channel-chip__x {
  display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gray-60, #8a8d97);
  padding: 0;
}

.channel-add-wrapper {
  position: relative;
}

.channel-add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px dashed var(--gray-40, #dadce5);
  border-radius: 3px;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  color: var(--gray-60, #8a8d97);
}

.channel-add-btn:hover {
  border-color: var(--teal-90, #01586a);
  color: var(--teal-90, #01586a);
}

.channel-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
  min-width: 200px;
}

.channel-menu__item {
  padding: 8px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-90, #3a3c45);
  cursor: pointer;
}

.channel-menu__item:hover {
  background: var(--gray-10, #f5f6f8);
}

/* Footer overrides */
:deep(.pendo-drawer__footer) {
  background: white;
  border-top: 1px solid var(--gray-30, #eaecf1);
  padding: 16px 24px !important;
}
</style>
