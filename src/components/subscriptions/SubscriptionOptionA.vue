<template>
  <div class="option-a">
    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-header__title">Feature Launch Dashboard</h1>
        <PendoTag type="info" label="Option A: Hub & Spoke" size="small" />
      </div>
      <PendoButton type="primary" prefix-icon="bell" label="Manage digests" @click="showBlade = true" />
    </div>

    <!-- Dashboard placeholder -->
    <div class="dashboard-placeholder">
      <p>Dashboard content area</p>
    </div>

    <!-- Blade overlay -->
    <Transition name="blade-slide">
      <div v-if="showBlade" class="blade-overlay">
        <div class="blade-backdrop" @click="closeBlade" />
        <div class="blade-panel">
          <!-- Blade header -->
          <div class="blade-header">
            <div class="blade-header__left">
              <button v-if="view !== 'list'" type="button" class="blade-back-btn" @click="goToList">
                <PendoIcon type="arrow-left" :size="16" />
              </button>
              <h2 class="blade-header__title">
                {{ view === 'list' ? 'Digests' : (isEditing ? 'Edit digest' : 'New digest') }}
              </h2>
            </div>
            <button type="button" class="blade-close-btn" @click="closeBlade">
              <PendoIcon type="x" :size="16" />
            </button>
          </div>

          <!-- LIST VIEW -->
          <template v-if="view === 'list'">
            <div class="blade-body">
              <div class="list-hero">
                <p class="list-hero__desc">Configure recurring AI-generated insights delivered to Slack, Teams, or email.</p>
              </div>

              <div v-if="subscriptions.length === 0" class="empty-state">
                <PendoIcon type="inbox" :size="32" />
                <p class="empty-state__title">No digests yet</p>
                <p class="empty-state__desc">Create your first digest to start receiving automated insights.</p>
                <PendoButton type="primary" prefix-icon="plus" label="New digest" @click="startCreate" />
              </div>

              <div v-else class="sub-list">
                <div
                  v-for="sub in subscriptions"
                  :key="sub.id"
                  class="sub-row"
                  @click="startEdit(sub)"
                >
                  <div class="sub-row__main">
                    <div class="sub-row__top">
                      <span class="sub-row__name">{{ sub.name || 'Untitled digest' }}</span>
                      <span
                        class="sub-row__status-dot"
                        :class="sub.status === 'active' ? 'sub-row__status-dot--active' : 'sub-row__status-dot--paused'"
                      />
                    </div>
                    <div class="sub-row__meta">
                      <span>{{ formatScheduleSummary(sub) }}</span>
                      <span class="sub-row__sep">·</span>
                      <span>{{ getSegmentLabel(sub.segment) }}</span>
                      <span class="sub-row__sep">·</span>
                      <span>{{ getDetailLabel(sub.detailLevel) }}</span>
                    </div>
                    <div class="sub-row__channels">
                      <PendoIcon type="hash" :size="12" />
                      <span>{{ sub.channels.join(', ') || 'No channels' }}</span>
                    </div>
                  </div>
                  <div class="sub-row__actions" @click.stop>
                    <button class="sub-row__action-btn" title="Duplicate" @click="duplicateSub(sub)">
                      <PendoIcon type="copy" :size="14" />
                    </button>
                    <button class="sub-row__action-btn sub-row__action-btn--danger" title="Delete" @click="deleteSub(sub.id)">
                      <PendoIcon type="trash-2" :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="blade-footer">
              <PendoButton type="secondary" prefix-icon="plus" label="New digest" @click="startCreate" />
            </div>
          </template>

          <!-- EDITOR VIEW (2-step) -->
          <template v-else>
            <!-- Step indicator -->
            <div class="step-bar">
              <button
                :class="['step-bar__item', { 'step-bar__item--active': step === 1, 'step-bar__item--done': step === 2 }]"
                @click="step = 1"
              >
                <span class="step-bar__num">1</span>
                <span>Configure</span>
              </button>
              <div class="step-bar__connector" />
              <button
                :class="['step-bar__item', { 'step-bar__item--active': step === 2 }]"
                @click="step = 2"
              >
                <span class="step-bar__num">2</span>
                <span>Schedule</span>
              </button>
            </div>

            <div class="blade-body">
              <!-- STEP 1: Configure -->
              <div v-if="step === 1" class="editor-step">
                <div class="editor-section">
                  <h4 class="editor-label">Segment</h4>
                  <p class="editor-helper">Filter dashboard data for this digest.</p>
                  <PendoSelect v-model="draft.segment" :options="SEGMENTS" />
                </div>

                <div class="editor-section">
                  <h4 class="editor-label">Message detail</h4>
                  <p class="editor-helper">Control the depth of analysis in each delivery.</p>
                  <div class="detail-options">
                    <label
                      v-for="level in DETAIL_LEVELS"
                      :key="level.value"
                      class="detail-option"
                      :class="{ 'detail-option--selected': draft.detailLevel === level.value }"
                    >
                      <PendoRadio v-model="draft.detailLevel" :value="level.value" name="detailLevel" />
                      <div class="detail-option__text">
                        <span class="detail-option__label">{{ level.label }}</span>
                        <span class="detail-option__desc">{{ level.description }}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="editor-section">
                  <h4 class="editor-label">Widgets</h4>
                  <p class="editor-helper">Select which dashboard widgets to include.</p>
                  <div class="widget-list">
                    <label v-for="w in WIDGETS" :key="w.id" class="widget-row">
                      <PendoCheckbox :modelValue="draft.selectedWidgets.includes(w.id)" @update:modelValue="toggleWidget(w.id)" />
                      <div class="widget-row__info">
                        <span class="widget-row__name">{{ w.name }}</span>
                        <span class="widget-row__activity">{{ w.activity }}</span>
                      </div>
                      <PendoTag v-if="w.recommended" type="filter" label="Recommended" size="small" />
                    </label>
                  </div>
                </div>
              </div>

              <!-- STEP 2: Schedule -->
              <div v-if="step === 2" class="editor-step">
                <div class="editor-section">
                  <h4 class="editor-label">Digest name</h4>
                  <PendoInput v-model="draft.name" placeholder="e.g., Weekly Executive Digest" />
                </div>

                <div class="editor-section">
                  <h4 class="editor-label">Frequency</h4>
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
                  <div class="schedule-fields">
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

                <div class="editor-section">
                  <h4 class="editor-label">Destination</h4>
                  <PendoSelect v-model="draft.destination" :options="DESTINATIONS" />
                </div>

                <div class="editor-section">
                  <h4 class="editor-label">Channels</h4>
                  <div class="channel-picker">
                    <div class="channel-picker__selected">
                      <div v-for="(ch, i) in draft.channels" :key="ch" class="channel-chip">
                        <span>{{ ch }}</span>
                        <button type="button" class="channel-chip__remove" @click="draft.channels.splice(i, 1)">
                          <PendoIcon type="x" :size="10" />
                        </button>
                      </div>
                      <button v-if="availableChannels.length > 0" type="button" class="channel-picker__add" @click="showChannelMenu = !showChannelMenu">
                        <PendoIcon type="plus" :size="12" />
                        <span>Add channel</span>
                      </button>
                    </div>
                    <div v-if="showChannelMenu" class="channel-menu">
                      <div
                        v-for="ch in availableChannels"
                        :key="ch"
                        class="channel-menu__item"
                        @click="addChannel(ch)"
                      >
                        {{ ch }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Editor footer -->
            <div class="blade-footer blade-footer--split">
              <PendoButton v-if="step === 2" type="secondary" label="Back" @click="step = 1" />
              <div v-else />
              <div class="blade-footer__right">
                <PendoButton type="secondary" label="Cancel" @click="goToList" />
                <PendoButton
                  v-if="step === 1"
                  type="primary"
                  label="Next: Schedule"
                  suffix-icon="arrow-right"
                  @click="step = 2"
                />
                <PendoButton
                  v-else
                  type="primary"
                  :label="isEditing ? 'Save changes' : 'Create digest'"
                  @click="saveDraft"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { PendoButton, PendoIcon, PendoInput, PendoSelect, PendoTag, PendoCheckbox, PendoRadio } from '../pendo'
import {
  SEGMENTS, DETAIL_LEVELS, WIDGETS, FREQUENCIES, DAYS, TIMES, TIMEZONES, DESTINATIONS, CHANNELS,
  createMockSubscriptions, createBlankSubscription, formatScheduleSummary, getSegmentLabel, getDetailLabel
} from './shared'

const showBlade = ref(true)
const view = ref('list')
const step = ref(1)
const isEditing = ref(false)
const editingId = ref(null)
const subscriptions = createMockSubscriptions()
const draft = reactive(createBlankSubscription())
const showChannelMenu = ref(false)

const availableChannels = computed(() =>
  CHANNELS.filter(ch => !draft.channels.includes(ch))
)

function closeBlade () {
  showBlade.value = false
  view.value = 'list'
  step.value = 1
}

function goToList () {
  view.value = 'list'
  step.value = 1
  isEditing.value = false
  editingId.value = null
}

function startCreate () {
  Object.assign(draft, createBlankSubscription())
  isEditing.value = false
  editingId.value = null
  step.value = 1
  view.value = 'editor'
}

function startEdit (sub) {
  Object.assign(draft, JSON.parse(JSON.stringify(sub)))
  isEditing.value = true
  editingId.value = sub.id
  step.value = 1
  view.value = 'editor'
}

function toggleWidget (id) {
  const idx = draft.selectedWidgets.indexOf(id)
  if (idx > -1) draft.selectedWidgets.splice(idx, 1)
  else draft.selectedWidgets.push(id)
}

function addChannel (ch) {
  draft.channels.push(ch)
  showChannelMenu.value = false
}

function saveDraft () {
  if (isEditing.value) {
    const idx = subscriptions.findIndex(s => s.id === editingId.value)
    if (idx > -1) Object.assign(subscriptions[idx], JSON.parse(JSON.stringify(draft)))
  } else {
    subscriptions.push(reactive(JSON.parse(JSON.stringify(draft))))
  }
  goToList()
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
.option-a {
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

/* ── Blade header ── */
.blade-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
  flex-shrink: 0;
}

.blade-header__left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blade-header__title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.blade-back-btn,
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

.blade-back-btn:hover,
.blade-close-btn:hover {
  background: var(--gray-20, #f0f1f4);
}

/* ── Blade body ── */
.blade-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* ── Blade footer ── */
.blade-footer {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid var(--gray-30, #eaecf1);
  flex-shrink: 0;
  gap: 8px;
}

.blade-footer--split {
  justify-content: space-between;
}

.blade-footer__right {
  display: flex;
  gap: 8px;
}

/* ── List view ── */
.list-hero__desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-70, #6a6c75);
  margin: 0 0 20px;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
  color: var(--gray-50, #9a9da5);
}

.empty-state__title {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-90, #3a3c45);
  margin: 8px 0 0;
}

.empty-state__desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-60, #8a8d97);
  margin: 0 0 12px;
  max-width: 280px;
}

/* ── Subscription rows ── */
.sub-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--gray-20, #f0f1f4);
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  overflow: hidden;
}

.sub-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: white;
  cursor: pointer;
  transition: background-color 0.1s;
}

.sub-row:hover {
  background: var(--gray-10, #f5f6f8);
}

.sub-row__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.sub-row__top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sub-row__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  line-height: 1.4;
}

.sub-row__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sub-row__status-dot--active { background: #00a86b; }
.sub-row__status-dot--paused { background: #b0b2bc; }

.sub-row__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  color: var(--gray-60, #8a8d97);
  line-height: 1.4;
}

.sub-row__sep { color: var(--gray-40, #dadce5); }

.sub-row__channels {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-50, #9a9da5);
}

.sub-row__actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.sub-row:hover .sub-row__actions {
  opacity: 1;
}

.sub-row__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-60, #8a8d97);
}

.sub-row__action-btn:hover {
  background: var(--gray-20, #f0f1f4);
  color: var(--gray-90, #3a3c45);
}

.sub-row__action-btn--danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* ── Step bar ── */
.step-bar {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 12px 20px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  flex-shrink: 0;
}

.step-bar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-50, #9a9da5);
  transition: all 0.15s;
}

.step-bar__item--active {
  color: var(--teal-90, #01586a);
  background: rgba(18, 130, 151, 0.06);
  font-weight: 600;
}

.step-bar__item--done {
  color: var(--gray-80, #4a4c55);
}

.step-bar__num {
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

.step-bar__item--active .step-bar__num {
  background: var(--teal-90, #01586a);
  color: white;
}

.step-bar__item--done .step-bar__num {
  background: var(--teal-60, #5bbfc9);
  color: white;
}

.step-bar__connector {
  flex: 1;
  height: 1px;
  background: var(--gray-30, #eaecf1);
  margin: 0 4px;
}

/* ── Editor sections ── */
.editor-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.editor-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.editor-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.editor-helper {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-60, #8a8d97);
  margin: 0 0 4px;
  line-height: 1.5;
}

/* Detail level cards */
.detail-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.detail-option:hover {
  border-color: var(--gray-50, #9a9da5);
}

.detail-option--selected {
  border-color: var(--teal-90, #01586a);
  background: rgba(18, 130, 151, 0.03);
}

.detail-option__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-option__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.detail-option__desc {
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  color: var(--gray-60, #8a8d97);
  line-height: 1.4;
}

/* Widget selection */
.widget-list {
  display: flex;
  flex-direction: column;
}

.widget-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  cursor: pointer;
}

.widget-row:last-child { border-bottom: none; }

.widget-row:hover {
  background: var(--gray-10, #f5f6f8);
  margin: 0 -8px;
  padding: 10px 8px;
  border-radius: 4px;
}

.widget-row__info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.widget-row__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-100, #2a2c35);
}

.widget-row__activity {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-50, #9a9da5);
}

/* Frequency buttons */
.freq-group {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--gray-40, #dadce5);
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

/* Schedule fields row */
.schedule-fields {
  display: flex;
  gap: 8px;
  margin-top: 8px;
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
.channel-picker {
  position: relative;
}

.channel-picker__selected {
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

.channel-chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gray-60, #8a8d97);
  padding: 0;
}

.channel-chip__remove:hover {
  color: var(--gray-100, #2a2c35);
}

.channel-picker__add {
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
  transition: all 0.15s;
}

.channel-picker__add:hover {
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
  transition: background 0.1s;
}

.channel-menu__item:hover {
  background: var(--gray-10, #f5f6f8);
}
</style>
