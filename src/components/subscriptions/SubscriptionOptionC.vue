<template>
  <div class="option-c">
    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-header__title">Feature Launch Dashboard</h1>
        <PendoTag type="info" label="Option C: Split Panel" size="small" />
      </div>
      <PendoButton type="primary" prefix-icon="bell" label="Manage digests" @click="showBlade = true" />
    </div>

    <!-- Dashboard placeholder -->
    <div class="dashboard-placeholder">
      <p>Dashboard content area</p>
    </div>

    <!-- Split-panel blade -->
    <Transition name="blade-slide">
      <div v-if="showBlade" class="blade-overlay">
        <div class="blade-backdrop" @click="showBlade = false" />
        <div class="blade-panel">
          <!-- Blade header -->
          <div class="blade-header">
            <h2 class="blade-header__title">Digests</h2>
            <button type="button" class="blade-close-btn" @click="showBlade = false">
              <PendoIcon type="x" :size="16" />
            </button>
          </div>

          <!-- Split body -->
          <div class="split-body">
            <!-- LEFT: subscription list sidebar -->
            <div class="split-left">
              <div class="split-left__header">
                <button class="split-left__new-btn" @click="createNew">
                  <PendoIcon type="plus" :size="14" />
                  <span>New</span>
                </button>
              </div>
              <div class="split-left__list">
                <div v-if="subscriptions.length === 0" class="split-left__empty">
                  <span>No digests</span>
                </div>
                <button
                  v-for="sub in subscriptions"
                  :key="sub.id"
                  :class="['split-left__item', { 'split-left__item--active': selectedId === sub.id }]"
                  @click="selectSub(sub)"
                >
                  <div class="split-left__item-top">
                    <span
                      class="split-left__dot"
                      :class="sub.status === 'active' ? 'split-left__dot--active' : 'split-left__dot--paused'"
                    />
                    <span class="split-left__name">{{ sub.name || 'Untitled' }}</span>
                  </div>
                  <span class="split-left__meta">{{ sub.frequency }} · {{ getSegmentLabel(sub.segment) }}</span>
                </button>
              </div>
            </div>

            <!-- RIGHT: detail panel -->
            <div class="split-right">
              <!-- No selection state -->
              <div v-if="!selectedId" class="split-right__empty">
                <PendoIcon type="inbox" :size="28" />
                <p>Select a digest or create a new one</p>
              </div>

              <template v-else>
                <!-- Detail header -->
                <div class="detail-header">
                  <div class="detail-header__main">
                    <input
                      v-model="draft.name"
                      class="detail-header__name-input"
                      placeholder="Digest name..."
                    />
                    <div class="detail-header__status">
                      <PendoToggle :modelValue="draft.status === 'active'" @update:modelValue="toggleDraftStatus" />
                      <span class="detail-header__status-text">{{ draft.status === 'active' ? 'Active' : 'Paused' }}</span>
                    </div>
                  </div>
                  <div class="detail-header__actions">
                    <button class="detail-header__action" title="Duplicate" @click="duplicateCurrent">
                      <PendoIcon type="copy" :size="14" />
                    </button>
                    <button class="detail-header__action detail-header__action--danger" title="Delete" @click="deleteCurrent">
                      <PendoIcon type="trash-2" :size="14" />
                    </button>
                  </div>
                </div>

                <!-- Tabs -->
                <div class="detail-tabs">
                  <button
                    :class="['detail-tab', { 'detail-tab--active': activeTab === 'configure' }]"
                    @click="activeTab = 'configure'"
                  >
                    Configure
                  </button>
                  <button
                    :class="['detail-tab', { 'detail-tab--active': activeTab === 'schedule' }]"
                    @click="activeTab = 'schedule'"
                  >
                    Schedule
                  </button>
                </div>

                <!-- Tab content -->
                <div class="detail-body">
                  <!-- Configure tab -->
                  <div v-if="activeTab === 'configure'" class="tab-content">
                    <div class="field-group">
                      <label class="field-label">Segment</label>
                      <PendoSelect v-model="draft.segment" :options="SEGMENTS" />
                    </div>

                    <div class="field-group">
                      <label class="field-label">Message detail</label>
                      <div class="detail-level-row">
                        <button
                          v-for="level in DETAIL_LEVELS"
                          :key="level.value"
                          :class="['detail-level-btn', { 'detail-level-btn--active': draft.detailLevel === level.value }]"
                          @click="draft.detailLevel = level.value"
                        >
                          {{ level.label }}
                        </button>
                      </div>
                      <p class="field-desc">{{ activeDetailDesc }}</p>
                    </div>

                    <div class="field-group">
                      <label class="field-label">Widgets ({{ draft.selectedWidgets.length }})</label>
                      <div class="compact-widget-list">
                        <label v-for="w in WIDGETS" :key="w.id" class="compact-widget">
                          <PendoCheckbox
                            :modelValue="draft.selectedWidgets.includes(w.id)"
                            @update:modelValue="toggleWidget(w.id)"
                          />
                          <span class="compact-widget__name">{{ w.name }}</span>
                          <PendoTag v-if="w.recommended" type="filter" label="Rec" size="small" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Schedule tab -->
                  <div v-if="activeTab === 'schedule'" class="tab-content">
                    <div class="field-group">
                      <label class="field-label">Frequency</label>
                      <div class="freq-row">
                        <button
                          v-for="f in FREQUENCIES"
                          :key="f.value"
                          :class="['freq-pill', { 'freq-pill--active': draft.frequency === f.value }]"
                          @click="draft.frequency = f.value"
                        >
                          {{ f.label }}
                        </button>
                      </div>
                    </div>

                    <div class="schedule-fields">
                      <div v-if="draft.frequency === 'Weekly'" class="field-group field-group--compact">
                        <label class="field-label--small">Day</label>
                        <PendoSelect v-model="draft.day" :options="DAYS" />
                      </div>
                      <div class="field-group field-group--compact">
                        <label class="field-label--small">Time</label>
                        <PendoSelect v-model="draft.time" :options="TIMES" />
                      </div>
                      <div class="field-group field-group--compact">
                        <label class="field-label--small">Timezone</label>
                        <PendoSelect v-model="draft.timezone" :options="TIMEZONES" />
                      </div>
                    </div>

                    <div class="field-group">
                      <label class="field-label">Destination</label>
                      <PendoSelect v-model="draft.destination" :options="DESTINATIONS" />
                    </div>

                    <div class="field-group">
                      <label class="field-label">Channels</label>
                      <div class="channel-row">
                        <div v-for="(ch, i) in draft.channels" :key="ch" class="channel-chip">
                          <span>{{ ch }}</span>
                          <button type="button" @click="draft.channels.splice(i, 1)" class="channel-chip__x">
                            <PendoIcon type="x" :size="10" />
                          </button>
                        </div>
                        <div class="channel-add-wrap">
                          <button type="button" class="channel-add" @click="showChMenu = !showChMenu">
                            <PendoIcon type="plus" :size="12" /> Add
                          </button>
                          <div v-if="showChMenu" class="ch-menu">
                            <div
                              v-for="ch in availableChannels"
                              :key="ch"
                              class="ch-menu__item"
                              @click="draft.channels.push(ch); showChMenu = false"
                            >
                              {{ ch }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div class="detail-footer">
                  <PendoButton type="secondary" label="Cancel" @click="revertDraft" />
                  <PendoButton type="primary" :label="isNew ? 'Create digest' : 'Save'" @click="saveDraft" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { PendoButton, PendoIcon, PendoSelect, PendoTag, PendoCheckbox, PendoToggle } from '../pendo'
import {
  SEGMENTS, DETAIL_LEVELS, WIDGETS, FREQUENCIES, DAYS, TIMES, TIMEZONES, DESTINATIONS, CHANNELS,
  createMockSubscriptions, createBlankSubscription, getSegmentLabel
} from './shared'

const showBlade = ref(true)
const activeTab = ref('configure')
const selectedId = ref(null)
const isNew = ref(false)
const subscriptions = createMockSubscriptions()
const draft = reactive(createBlankSubscription())
const showChMenu = ref(false)

const availableChannels = computed(() =>
  CHANNELS.filter(ch => !draft.channels.includes(ch))
)

const activeDetailDesc = computed(() => {
  const match = DETAIL_LEVELS.find(d => d.value === draft.detailLevel)
  return match?.description || ''
})

function selectSub (sub) {
  selectedId.value = sub.id
  isNew.value = false
  Object.assign(draft, JSON.parse(JSON.stringify(sub)))
  activeTab.value = 'configure'
}

function createNew () {
  const blank = createBlankSubscription()
  Object.assign(draft, blank)
  selectedId.value = blank.id
  isNew.value = true
  activeTab.value = 'configure'
}

function toggleWidget (id) {
  const idx = draft.selectedWidgets.indexOf(id)
  if (idx > -1) draft.selectedWidgets.splice(idx, 1)
  else draft.selectedWidgets.push(id)
}

function toggleDraftStatus (val) {
  draft.status = val ? 'active' : 'paused'
}

function saveDraft () {
  if (isNew.value) {
    subscriptions.push(reactive(JSON.parse(JSON.stringify(draft))))
    isNew.value = false
  } else {
    const idx = subscriptions.findIndex(s => s.id === selectedId.value)
    if (idx > -1) Object.assign(subscriptions[idx], JSON.parse(JSON.stringify(draft)))
  }
}

function revertDraft () {
  if (isNew.value) {
    selectedId.value = null
    isNew.value = false
    return
  }
  const original = subscriptions.find(s => s.id === selectedId.value)
  if (original) Object.assign(draft, JSON.parse(JSON.stringify(original)))
}

function duplicateCurrent () {
  const clone = JSON.parse(JSON.stringify(draft))
  clone.id = `sub-${Date.now()}`
  clone.name = `${draft.name} (copy)`
  subscriptions.push(reactive(clone))
  selectedId.value = clone.id
  Object.assign(draft, clone)
  isNew.value = false
}

function deleteCurrent () {
  const idx = subscriptions.findIndex(s => s.id === selectedId.value)
  if (idx > -1) subscriptions.splice(idx, 1)
  selectedId.value = null
  isNew.value = false
}

// Auto-select first subscription when blade opens
watch(showBlade, (open) => {
  if (open && subscriptions.length > 0 && !selectedId.value) {
    selectSub(subscriptions[0])
  }
})

// Select first on mount if available
if (subscriptions.length > 0) selectSub(subscriptions[0])
</script>

<style scoped>
/* ── Page layout ── */
.option-c {
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

/* ── Blade overlay ── */
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
  width: 640px;
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

/* ── Split layout ── */
.split-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* Left sidebar */
.split-left {
  width: 190px;
  flex-shrink: 0;
  border-right: 1px solid var(--gray-20, #f0f1f4);
  display: flex;
  flex-direction: column;
  background: var(--gray-10, #f5f6f8);
}

.split-left__header {
  padding: 12px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
}

.split-left__new-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 7px 12px;
  border: 1px dashed var(--gray-40, #dadce5);
  border-radius: 5px;
  background: white;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-70, #6a6c75);
  transition: all 0.15s;
}

.split-left__new-btn:hover {
  border-color: var(--teal-90, #01586a);
  color: var(--teal-90, #01586a);
}

.split-left__list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.split-left__empty {
  padding: 32px 12px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-50, #9a9da5);
}

.split-left__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
  border-left: 3px solid transparent;
}

.split-left__item:hover {
  background: var(--gray-20, #f0f1f4);
}

.split-left__item--active {
  background: white;
  border-left-color: var(--teal-90, #01586a);
}

.split-left__item-top {
  display: flex;
  align-items: center;
  gap: 6px;
}

.split-left__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.split-left__dot--active { background: #00a86b; }
.split-left__dot--paused { background: #b0b2bc; }

.split-left__name {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.split-left__meta {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: var(--gray-50, #9a9da5);
  padding-left: 12px;
}

/* Right detail panel */
.split-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.split-right__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--gray-40, #dadce5);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.split-right__empty p {
  color: var(--gray-50, #9a9da5);
  margin: 0;
}

/* Detail header */
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  gap: 12px;
}

.detail-header__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.detail-header__name-input {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  border: none;
  background: none;
  outline: none;
  padding: 0;
  width: 100%;
}

.detail-header__name-input:focus {
  border-bottom: 1px solid var(--teal-90, #01586a);
  padding-bottom: 2px;
}

.detail-header__name-input::placeholder {
  color: var(--gray-40, #dadce5);
}

.detail-header__status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-header__status-text {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-60, #8a8d97);
}

.detail-header__actions {
  display: flex;
  gap: 4px;
}

.detail-header__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-50, #9a9da5);
}

.detail-header__action:hover {
  background: var(--gray-20, #f0f1f4);
  color: var(--gray-80, #4a4c55);
}

.detail-header__action--danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Detail tabs */
.detail-tabs {
  display: flex;
  gap: 0;
  padding: 0 16px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
}

.detail-tab {
  padding: 10px 16px 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-60, #8a8d97);
  position: relative;
  transition: color 0.15s;
}

.detail-tab--active {
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.detail-tab--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--gray-100, #2a2c35);
}

/* Detail body */
.detail-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-group--compact {
  flex: 1;
  min-width: 0;
}

.field-label {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.field-label--small {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-80, #4a4c55);
}

.field-desc {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-50, #9a9da5);
  margin: 0;
  line-height: 1.4;
}

.field-group :deep(.pendo-select) {
  width: 100% !important;
  display: block !important;
  min-width: 0 !important;
}

.field-group :deep(.pendo-select__trigger) {
  width: 100% !important;
  min-width: 0 !important;
}

/* Detail level segmented control */
.detail-level-row {
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--gray-40, #dadce5);
}

.detail-level-btn {
  flex: 1;
  padding: 7px 8px;
  border: none;
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
  cursor: pointer;
  transition: all 0.15s;
}

.detail-level-btn:not(:last-child) {
  border-right: 1px solid var(--gray-40, #dadce5);
}

.detail-level-btn--active {
  background: rgba(18, 130, 151, 0.08);
  color: var(--teal-90, #01586a);
  font-weight: 600;
}

/* Compact widget list */
.compact-widget-list {
  display: flex;
  flex-direction: column;
}

.compact-widget {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px solid var(--gray-10, #f5f6f8);
  cursor: pointer;
}

.compact-widget:last-child { border-bottom: none; }

.compact-widget:hover { background: var(--gray-10, #f5f6f8); margin: 0 -6px; padding: 7px 6px; border-radius: 3px; }

.compact-widget__name {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-100, #2a2c35);
  flex: 1;
}

/* Frequency pills */
.freq-row {
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--gray-40, #dadce5);
}

.freq-pill {
  flex: 1;
  padding: 7px 8px;
  border: none;
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
  cursor: pointer;
  transition: all 0.15s;
}

.freq-pill:not(:last-child) {
  border-right: 1px solid var(--gray-40, #dadce5);
}

.freq-pill--active {
  background: rgba(18, 130, 151, 0.08);
  color: var(--teal-90, #01586a);
  font-weight: 600;
}

/* Schedule fields row */
.schedule-fields {
  display: flex;
  gap: 8px;
}

.schedule-fields .field-group--compact :deep(.pendo-select) {
  width: 100% !important;
  display: block !important;
  min-width: 0 !important;
}

.schedule-fields .field-group--compact :deep(.pendo-select__trigger) {
  width: 100% !important;
  min-width: 0 !important;
}

/* Channel row */
.channel-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.channel-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  background: var(--gray-20, #f0f1f4);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
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

.channel-add-wrap {
  position: relative;
}

.channel-add {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border: 1px dashed var(--gray-40, #dadce5);
  border-radius: 3px;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-60, #8a8d97);
}

.channel-add:hover {
  border-color: var(--teal-90, #01586a);
  color: var(--teal-90, #01586a);
}

.ch-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 160px;
  overflow-y: auto;
  z-index: 10;
  min-width: 180px;
}

.ch-menu__item {
  padding: 7px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-90, #3a3c45);
  cursor: pointer;
}

.ch-menu__item:hover {
  background: var(--gray-10, #f5f6f8);
}

/* Detail footer */
.detail-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--gray-20, #f0f1f4);
  flex-shrink: 0;
}
</style>
