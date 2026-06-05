<template>
  <div class="blade-wrapper">
    <!-- Masthead -->
    <div class="blade-masthead">
      <span class="blade-masthead__title">Your dashboard signals</span>
      <PendoIconButton icon="x" icon-size="16" tooltip="Close" @click="$emit('close')" />
    </div>

    <!-- Back bar (create view only) -->
    <div v-if="view === 'create'" class="blade-back-bar">
      <button type="button" class="blade-back-btn" @click="editingDigestId = null; view = 'list'">
        <PendoIcon type="arrow-left" :size="16" />
        <span>Back to digests</span>
      </button>
    </div>

    <!-- ═══════════ LIST VIEW ═══════════ -->
    <template v-if="view === 'list'">
      <div class="blade-body">
        <div class="blade-content">
          <div class="blade-description">
            <h2 class="blade-description__heading">Manage digests for {{ dashboardName }}</h2>
            <p class="blade-description__text">
              Get updates on your dashboard based on the data you've selected, delivered on a schedule that works for your team.
            </p>
          </div>

          <!-- Empty state -->
          <div v-if="localDigests.length === 0" class="digest-empty">
            <PendoButton type="tertiary" prefix-icon="plus" label="Create new digest" @click="startCreate" />
          </div>

          <!-- Digest cards -->
          <div v-else class="digest-list">
            <div
              v-for="digest in localDigests"
              :key="digest.id"
              class="digest-card"
              @click="$emit('edit', digest)"
            >
              <div class="digest-card__info">
                <div class="digest-card__header">
                  <span class="digest-card__name">{{ digest.name }}</span>
                  <PendoIconButton
                    icon="more-horizontal-filled"
                    icon-size="16"
                    tooltip="Options"
                    @click.stop="toggleMenu(digest.id)"
                  />
                  <div v-if="openMenuId === digest.id" class="digest-card__menu">
                    <div class="digest-card__menu-item" @click.stop="handleEdit(digest)">
                      <PendoIcon type="edit" :size="14" />
                      <span>Edit</span>
                    </div>
                    <div class="digest-card__menu-item" @click.stop="handleDuplicate(digest)">
                      <PendoIcon type="copy" :size="14" />
                      <span>Duplicate</span>
                    </div>
                    <div class="digest-card__menu-item digest-card__menu-item--danger" @click.stop="handleDelete(digest)">
                      <PendoIcon type="trash" :size="14" />
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
                <span class="digest-card__schedule">{{ digest.schedule }}</span>
              </div>
              <div class="digest-card__status">
                <span class="digest-card__dot" :class="digest.active ? 'digest-card__dot--active' : 'digest-card__dot--disabled'" />
                <span class="digest-card__status-label">{{ digest.active ? 'Active' : 'Disabled' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="localDigests.length > 0" class="blade-footer">
        <PendoButton type="secondary" label="Cancel" @click="$emit('close')" />
        <PendoButton type="primary" prefix-icon="plus" label="New digest" @click="startCreate" />
      </div>
    </template>

    <!-- ═══════════ CREATE VIEW ═══════════ -->
    <template v-else-if="view === 'create'">
      <!-- Fixed hero + tabs -->
      <div class="create-header">
        <div class="create-hero">
          <h3 class="create-hero__title">{{ editingDigestId ? 'Edit digest' : 'Subscribe to updates' }} for {{ dashboardName }}</h3>
          <p class="create-hero__description">{{ editingDigestId ? 'Update your digest configuration and schedule.' : 'Get recurring Slack updates with the latest dashboard metrics.' }}</p>
        </div>
        <div class="create-tabs">
          <div class="create-tabs__links">
            <button
              type="button"
              :class="['create-tabs__link', { 'create-tabs__link--active': activeTab === 'context' }]"
              @click="activeTab = 'context'"
            >
              Context
            </button>
            <button
              type="button"
              :class="['create-tabs__link', { 'create-tabs__link--active': activeTab === 'scheduling' }]"
              @click="activeTab = 'scheduling'"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>

      <!-- Scrollable tab content -->
      <div class="create-scroll-area">
        <div class="blade-content">

          <!-- ── Context Tab ── -->
          <div v-if="activeTab === 'context'" class="create-tab-content">
            <div class="create-section">
              <h5 class="create-label">Describe your goal</h5>
              <textarea
                v-model="contextDescription"
                class="goal-textarea"
                placeholder="What do you want this digest to focus on?"
              ></textarea>
            </div>

            <!-- Manage widgets -->
            <div class="create-section">
              <h5 class="create-label">Manage widgets</h5>
              <p class="create-helper">Choose which dashboard widgets to include in this digest.</p>
              <div class="widget-wrapper">
                <div
                  class="widget-select"
                  :class="{ 'widget-select--open': showWidgetDropdown }"
                  tabindex="0"
                  @click="toggleWidgetDropdown"
                  @keydown.esc="showWidgetDropdown = false"
                >
                  <div v-if="formData.widgets.length > 0" class="widget-tags" ref="widgetTagsRef">
                    <div v-for="w in visibleWidgets" :key="w" class="widget-tag">
                      <span class="widget-tag__text">{{ w }}</span>
                      <button type="button" class="widget-tag__close" @click.stop="removeWidget(w)">
                        <PendoIcon type="x" :size="12" :stroke-width="2" />
                      </button>
                    </div>
                    <div v-if="overflowCount > 0" class="widget-tag widget-tag--overflow">
                      <span class="widget-tag__text">+{{ overflowCount }}</span>
                    </div>
                  </div>
                  <span v-else class="widget-select__placeholder">Select widgets</span>
                  <div class="widget-select__chevron" :class="{ 'widget-select__chevron--open': showWidgetDropdown }">
                    <PendoIcon type="chevron-down" :size="16" />
                  </div>
                </div>
                <Transition name="ch-dropdown">
                  <div v-if="showWidgetDropdown" class="widget-dropdown pendo-dropdown-scroll">
                    <div class="widget-dropdown__actions">
                      <button type="button" class="widget-dropdown__action" @click.stop="selectAllWidgets">Select all</button>
                      <span class="widget-dropdown__divider">|</span>
                      <button type="button" class="widget-dropdown__action" @click.stop="deselectAllWidgets">Deselect all</button>
                    </div>
                    <div
                      v-for="w in availableWidgets"
                      :key="w"
                      class="widget-dropdown__item"
                      @click="toggleWidget(w)"
                    >
                      <span>{{ w }}</span>
                      <PendoIcon v-if="formData.widgets.includes(w)" type="check" :size="16" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Select filters -->
            <div class="create-section">
              <h5 class="create-label">Select filters</h5>
              <p class="create-helper">Choose global filters for this digest. Since users have different filter settings, specify which view to show.</p>
              <div class="filter-pills">
                <!-- Segment pill (only when added) -->
                <div v-if="formData.segment !== null" class="filter-pill">
                  <button type="button" class="filter-pill__remove" @click="removeFilter('segment')">
                    <PendoIcon type="x" :size="12" />
                  </button>
                  <span class="filter-pill__label">Segment</span>
                  <div class="filter-pill__value-wrap" @click="showSegmentDropdown = !showSegmentDropdown">
                    <span class="filter-pill__value">{{ formData.segment || 'Select' }}</span>
                    <PendoIcon type="chevron-down" :size="12" />
                  </div>
                  <Transition name="ch-dropdown">
                    <div v-if="showSegmentDropdown" class="filter-pill__dropdown pendo-dropdown-scroll">
                      <div
                        v-for="seg in segmentOptions"
                        :key="seg"
                        class="filter-pill__dropdown-item"
                        @click="formData.segment = seg; showSegmentDropdown = false"
                      >
                        <span>{{ seg }}</span>
                        <PendoIcon v-if="formData.segment === seg" type="check" :size="16" />
                      </div>
                    </div>
                  </Transition>
                </div>

                <!-- App pill (only when added) -->
                <div v-if="formData.app !== null" class="filter-pill">
                  <button type="button" class="filter-pill__remove" @click="removeFilter('app')">
                    <PendoIcon type="x" :size="12" />
                  </button>
                  <span class="filter-pill__label">App</span>
                  <div class="filter-pill__value-wrap" @click="showAppDropdown = !showAppDropdown">
                    <span class="filter-pill__value">{{ formData.app || 'Select' }}</span>
                    <PendoIcon type="chevron-down" :size="12" />
                  </div>
                  <Transition name="ch-dropdown">
                    <div v-if="showAppDropdown" class="filter-pill__dropdown pendo-dropdown-scroll">
                      <div
                        v-for="a in appOptions"
                        :key="a"
                        class="filter-pill__dropdown-item"
                        @click="formData.app = a; showAppDropdown = false"
                      >
                        <span>{{ a }}</span>
                        <PendoIcon v-if="formData.app === a" type="check" :size="16" />
                      </div>
                    </div>
                  </Transition>
                </div>

                <!-- Add filter button (when at least one filter type is still available) -->
                <div v-if="formData.segment === null || formData.app === null" class="filter-add-wrap">
                  <button type="button" class="filter-add-btn" @click="showFilterTypeMenu = !showFilterTypeMenu">
                    <PendoIcon type="plus" :size="16" />
                    <span>Add filter</span>
                  </button>
                  <Transition name="ch-dropdown">
                    <div v-if="showFilterTypeMenu" class="filter-add-dropdown">
                      <div
                        v-if="formData.segment === null"
                        class="filter-pill__dropdown-item"
                        @click="addFilter('segment')"
                      >
                        Segment
                      </div>
                      <div
                        v-if="formData.app === null"
                        class="filter-pill__dropdown-item"
                        @click="addFilter('app')"
                      >
                        App
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <!-- Select detail -->
            <div class="create-section">
              <h5 class="create-label">Select detail</h5>
              <p class="create-helper">Control the depth of analysis for your digest.</p>
              <PendoSelect
                v-model="formData.detail"
                :options="detailOptions"
                class="detail-select"
              />
            </div>
          </div>

          <!-- ── Scheduling Tab ── -->
          <div v-else-if="activeTab === 'scheduling'" class="create-tab-content">
            <!-- Frequency -->
            <div class="create-section">
              <h5 class="create-label">Frequency</h5>
              <div class="freq-group">
                <button
                  v-for="freq in ['Daily', 'Weekly', 'Monthly']"
                  :key="freq"
                  type="button"
                  :class="['freq-group__item', { 'freq-group__item--active': formData.frequency === freq }]"
                  @click="formData.frequency = freq"
                >
                  {{ freq }}
                </button>
              </div>

              <!-- Day / Time / Timezone row -->
              <div class="create-row">
                <div v-if="formData.frequency === 'Weekly'" class="create-field">
                  <label class="create-field__label">Day</label>
                  <PendoSelect v-model="formData.day" :options="dayOptions" />
                </div>
                <div v-if="formData.frequency === 'Monthly'" class="create-field">
                  <label class="create-field__label">Day of month</label>
                  <PendoSelect v-model="formData.dayOfMonth" :options="dayOfMonthOptions" />
                </div>
                <div class="create-field">
                  <label class="create-field__label">Time</label>
                  <PendoSelect v-model="formData.time" :options="timeOptions" />
                </div>
                <div class="create-field">
                  <label class="create-field__label">Time zone</label>
                  <PendoSelect v-model="formData.timezone" :options="timezoneOptions" />
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="create-section">
              <h5 class="create-label">Update name</h5>
              <PendoInput v-model="formData.name" placeholder="Weekly Trends insights digest" style="width: 100%;" />
              <p class="create-helper" style="margin-top: 4px; font-size: 12.642px;">This name appears at the top of the Slack message.</p>
            </div>

            <!-- Destination -->
            <div class="create-section">
              <h5 class="create-label">Send updates to</h5>
              <PendoSelect v-model="formData.subscriptionType" :options="subscriptionTypeOptions" />
            </div>

            <!-- Channels -->
            <div class="create-section">
              <h5 class="create-label">Channels</h5>
              <div class="channel-wrapper">
                <div
                  class="channel-select"
                  :class="{ 'channel-select--open': showChannelDropdown }"
                  tabindex="0"
                  @click="toggleChannelDropdown"
                  @keydown.esc="showChannelDropdown = false"
                >
                  <div v-if="formData.channels.length > 0" class="channel-tags">
                    <div v-for="(ch, idx) in formData.channels" :key="ch" class="channel-tag">
                      <span class="channel-tag__text">{{ ch }}</span>
                      <button type="button" class="channel-tag__close" @click.stop="formData.channels.splice(idx, 1)">
                        <PendoIcon type="x" :size="12" :stroke-width="2" />
                      </button>
                    </div>
                  </div>
                  <span v-else class="channel-select__placeholder">Select channels</span>
                  <div class="channel-select__chevron" :class="{ 'channel-select__chevron--open': showChannelDropdown }">
                    <PendoIcon type="chevron-down" :size="16" />
                  </div>
                </div>
                <Transition name="ch-dropdown">
                  <div v-if="showChannelDropdown" class="channel-dropdown pendo-dropdown-scroll">
                    <div
                      v-for="ch in availableChannels"
                      :key="ch"
                      class="channel-dropdown__item"
                      @click="toggleChannel(ch)"
                    >
                      <span>{{ ch }}</span>
                      <PendoIcon v-if="formData.channels.includes(ch)" type="check" :size="16" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Create footer -->
      <div class="blade-footer">
        <PendoButton type="secondary" label="Cancel" @click="editingDigestId = null; view = 'list'" />
        <PendoButton
          v-if="showNextButton"
          type="primary"
          label="Next: Schedule"
          @click="activeTab = 'scheduling'"
        />
        <PendoButton
          v-else
          type="primary"
          :label="editingDigestId ? 'Update digest' : 'Save digest'"
          :disabled="!isScheduleComplete"
          @click="handleConfirm"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { PendoButton, PendoIcon, PendoIconButton, PendoInput, PendoSelect } from './pendo'

const WEBHOOK_URL = 'https://pendoio.app.n8n.cloud/webhook/dashboard-subscribe'

const props = defineProps({
  dashboardName: {
    type: String,
    default: 'Autonomous Insights'
  },
  digests: {
    type: Array,
    default: () => []
  },
  dashboardFilters: {
    type: Object,
    default: () => ({ segment: null, app: null })
  }
})

const emit = defineEmits(['close', 'new', 'edit', 'delete', 'duplicate', 'highlight-widget'])

// ── View state ──
const view = ref('list')
const activeTab = ref('context')
const localDigests = reactive([...props.digests])
const openMenuId = ref(null)
const showChannelDropdown = ref(false)
const showWidgetDropdown = ref(false)
const showSegmentDropdown = ref(false)
const showAppDropdown = ref(false)
const showFilterTypeMenu = ref(false)

watch(() => props.digests, (val) => {
  localDigests.splice(0, localDigests.length, ...val)
})

// ── Options (declared before formData so they can be referenced) ──
const availableWidgets = [
  'Visitor adoption',
  'Account retention',
  'Conversion rate',
  'Time to complete',
  'User feedback | Trends feature'
]

const availableChannels = [
  '#n8n-test', '#product-team-updates', '#team-insights',
  '#engineering', '#design', '#customer-success', '#sales'
]

const segmentOptions = [
  'Enterprise', 'Mid-Market', 'SMB', 'Free', 'Trial', 'All accounts'
]

const appOptions = [
  'Pendo Web', 'Pendo Mobile', 'Pendo Adopt', 'All apps'
]

const detailOptions = [
  { value: 'Executive', label: 'Executive', description: 'High-level KPIs and top-line trends only' },
  { value: 'Summary', label: 'Summary', description: 'Key metrics with brief analysis and callouts' },
  { value: 'Detailed', label: 'Detailed', description: 'Full breakdown with tables, cohort data, and recommendations' }
]

// ── Form data (mirrors BladeConfiguration) ──
const formData = ref({
  frequency: 'Weekly',
  day: 'Monday',
  dayOfMonth: '1',
  time: '9:00 AM',
  timezone: 'EST',
  name: props.dashboardName,
  subscriptionType: 'Slack',
  channels: [],
  widgets: [...availableWidgets],
  segment: props.dashboardFilters.segment || null,
  app: props.dashboardFilters.app || null,
  detail: 'Executive'
})

const contextDescription = ref('')

const dayOptions = [
  { value: 'Monday', label: 'Monday' }, { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' }, { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
]

const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1), label: String(i + 1)
}))

const timeOptions = [
  { value: '9:00 AM', label: '9:00 AM' }, { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' }, { value: '12:00 PM', label: '12:00 PM' }
]

const timezoneOptions = [
  { value: 'EST', label: 'EST' }, { value: 'CST', label: 'CST' },
  { value: 'MST', label: 'MST' }, { value: 'PST', label: 'PST' }
]

const subscriptionTypeOptions = [
  { value: 'Slack', label: 'Slack', icon: 'slack' },
  { value: 'Teams', label: 'Teams', icon: 'teams' },
  { value: 'Email', label: 'Email' }
]

const isScheduleComplete = computed(() => {
  const fd = formData.value
  return fd.frequency && fd.time && fd.timezone && fd.name && fd.subscriptionType && fd.channels.length > 0
})

const showNextButton = computed(() => {
  if (activeTab.value !== 'context') return false
  if (editingDigestId.value && isScheduleComplete.value) return false
  return true
})

// ── List actions ──
function toggleMenu (id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

const editingDigestId = ref(null)

function handleEdit (digest) {
  openMenuId.value = null
  editingDigestId.value = digest.id

  if (digest.config) {
    formData.value = { ...digest.config }
    contextDescription.value = digest.config._contextDescription || ''
  } else {
    resetForm()
  }

  view.value = 'create'
  activeTab.value = 'context'
}

function handleDuplicate (digest) {
  openMenuId.value = null
  const clone = { ...digest, id: `digest-${Date.now()}`, name: `${digest.name} (copy)` }
  localDigests.push(clone)
  emit('duplicate', clone)

  if (typeof pendo !== 'undefined') {
    pendo.track('digest_management_duplicated', {
      originalDigestId: digest.id,
      originalName: digest.name,
      newDigestId: clone.id
    })
  }
}

function handleDelete (digest) {
  openMenuId.value = null
  const idx = localDigests.findIndex(d => d.id === digest.id)
  if (idx > -1) localDigests.splice(idx, 1)
  emit('delete', digest)

  if (typeof pendo !== 'undefined') {
    pendo.track('digest_management_deleted', {
      digestId: digest.id,
      digestName: digest.name
    })
  }
}

// ── Create flow ──
function startCreate () {
  editingDigestId.value = null
  resetForm()
  view.value = 'create'
  activeTab.value = 'context'
}

function resetForm () {
  formData.value = {
    frequency: 'Weekly',
    day: 'Monday',
    dayOfMonth: '1',
    time: '9:00 AM',
    timezone: 'EST',
    name: props.dashboardName,
    subscriptionType: 'Slack',
    channels: [],
    widgets: [...availableWidgets],
    segment: props.dashboardFilters.segment || null,
    app: props.dashboardFilters.app || null,
    detail: 'Executive'
  }
  contextDescription.value = ''
}

async function handleConfirm () {
  const fd = formData.value
  const scheduleLabel = [
    fd.frequency,
    fd.frequency === 'Weekly' ? `every ${fd.day}` : fd.frequency === 'Monthly' ? `on the ${fd.dayOfMonth}` : null,
    `at ${fd.time} ${fd.timezone}`,
    fd.channels.length > 0 ? `in ${fd.channels.join(', ')}` : null
  ].filter(Boolean).join(' ')

  const storedConfig = {
    ...fd,
    widgets: [...fd.widgets],
    channels: [...fd.channels],
    _contextDescription: contextDescription.value
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Tiffany Kitchen',
        dashboardName: props.dashboardName,
        dashboardUrl: `${window.location.origin}/insights/milestone-3`,
        prototypeUrl: window.location.origin,
        settingsUrl: `${window.location.origin}/settings`,
        name: fd.name,
        frequency: fd.frequency,
        day: fd.day,
        dayOfMonth: fd.dayOfMonth,
        time: fd.time,
        timezone: fd.timezone
      })
    })
    if (!response.ok) throw new Error(`Webhook failed: ${response.status}`)
    console.log('Webhook sent successfully')
  } catch (err) {
    console.error('Webhook error:', err)
  }

  if (editingDigestId.value) {
    const idx = localDigests.findIndex(d => d.id === editingDigestId.value)
    if (idx > -1) {
      localDigests[idx] = {
        ...localDigests[idx],
        name: fd.name || localDigests[idx].name,
        schedule: scheduleLabel,
        config: storedConfig
      }
      emit('edit', localDigests[idx])
    }
  } else {
    const newDigest = {
      id: `digest-${Date.now()}`,
      name: fd.name || `${props.dashboardName} digest`,
      schedule: scheduleLabel,
      active: true,
      config: storedConfig
    }
    localDigests.push(newDigest)
    emit('new', newDigest)
  }

  if (typeof pendo !== 'undefined') {
    pendo.track('digest_management_created', {
      digestName: fd.name,
      dashboardName: props.dashboardName,
      frequency: fd.frequency,
      day: fd.day,
      dayOfMonth: fd.dayOfMonth,
      time: fd.time,
      timezone: fd.timezone,
      subscriptionType: fd.subscriptionType,
      channelCount: fd.channels.length,
      widgetCount: fd.widgets.length,
      segment: fd.segment,
      app: fd.app,
      detailLevel: fd.detail,
      contextDescription: contextDescription.value ? contextDescription.value.substring(0, 100) : ''
    })
  }

  editingDigestId.value = null
  view.value = 'list'
}


// ── Filter helpers ──
function addFilter (type) {
  if (type === 'segment') formData.value.segment = ''
  else if (type === 'app') formData.value.app = ''
  showFilterTypeMenu.value = false
}

function removeFilter (type) {
  if (type === 'segment') {
    formData.value.segment = null
    showSegmentDropdown.value = false
  } else if (type === 'app') {
    formData.value.app = null
    showAppDropdown.value = false
  }
}

// ── Widget dropdown ──
const MAX_VISIBLE_TAGS = 2
const widgetTagsRef = ref(null)

const visibleWidgets = computed(() => {
  return formData.value.widgets.slice(0, MAX_VISIBLE_TAGS)
})

const overflowCount = computed(() => {
  return Math.max(0, formData.value.widgets.length - MAX_VISIBLE_TAGS)
})

function toggleWidgetDropdown () {
  showWidgetDropdown.value = !showWidgetDropdown.value
}

function toggleWidget (w) {
  const idx = formData.value.widgets.indexOf(w)
  if (idx > -1) {
    formData.value.widgets.splice(idx, 1)
  } else {
    formData.value.widgets.push(w)
    emit('highlight-widget', w)
  }
}

function removeWidget (w) {
  const idx = formData.value.widgets.indexOf(w)
  if (idx > -1) formData.value.widgets.splice(idx, 1)
}

function selectAllWidgets () {
  formData.value.widgets = [...availableWidgets]
}

function deselectAllWidgets () {
  formData.value.widgets = []
}

// ── Channel dropdown ──
function toggleChannelDropdown () {
  showChannelDropdown.value = !showChannelDropdown.value
}

function toggleChannel (ch) {
  const idx = formData.value.channels.indexOf(ch)
  if (idx > -1) formData.value.channels.splice(idx, 1)
  else formData.value.channels.push(ch)
}

function handleClickOutside (event) {
  if (!event.target.closest('.channel-wrapper') && showChannelDropdown.value) {
    showChannelDropdown.value = false
  }
  if (!event.target.closest('.widget-wrapper') && showWidgetDropdown.value) {
    showWidgetDropdown.value = false
  }
  if (!event.target.closest('.filter-pill') && (showSegmentDropdown.value || showAppDropdown.value)) {
    showSegmentDropdown.value = false
    showAppDropdown.value = false
  }
  if (!event.target.closest('.filter-add-wrap') && showFilterTypeMenu.value) {
    showFilterTypeMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* ═══════════════════════════════════════════
   SHELL — wrapper, masthead, footer
   ═══════════════════════════════════════════ */
.blade-wrapper {
  width: 500px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--gray-0, #ffffff);
  border-left: 1px solid var(--gray-40, #dadce5);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.17);
}

.blade-masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 16px 24px;
  border-bottom: 1px solid var(--gray-40, #dadce5);
  background: var(--gray-0, #ffffff);
  flex-shrink: 0;
}

.blade-masthead__title {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-90, #3a3c45);
}

.blade-body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 24px;
  background: var(--gray-0, #ffffff);
}

.blade-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
  min-height: 100%;
}

.blade-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px 16px 24px;
  border-top: 1px solid var(--gray-40, #dadce5);
  background: var(--gray-0, #ffffff);
  flex-shrink: 0;
}

.blade-footer :deep(.pendo-button) {
  flex: 1;
}

/* ═══════════════════════════════════════════
   BACK BAR
   ═══════════════════════════════════════════ */
.blade-back-bar {
  padding: 8px 24px;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  flex-shrink: 0;
}

.blade-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  transition: color 0.15s;
}

.blade-back-btn:hover {
  color: var(--gray-100, #2a2c35);
}

/* ═══════════════════════════════════════════
   LIST VIEW — description, empty, cards
   ═══════════════════════════════════════════ */
.blade-description {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blade-description__heading {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.blade-description__text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  margin: 0;
}

.digest-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 1px dashed var(--gray-30, #eaecf1);
  border-radius: 3px;
  height: 105px;
  box-sizing: border-box;
}

.digest-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.digest-card {
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.digest-card:hover {
  border-color: var(--gray-50, #babcc5);
  background: var(--gray-10, #f5f6f8);
}

.digest-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.digest-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.digest-card__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--gray-100, #2a2c35);
}

.digest-card__schedule {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
}

.digest-card__status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.digest-card__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.digest-card__dot--active {
  background-color: var(--green-90, #008648);
}

.digest-card__dot--disabled {
  background-color: var(--gray-50, #babcc5);
}

.digest-card__status-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
}

.digest-card__menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 160px;
  z-index: 10;
  overflow: hidden;
}

.digest-card__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
  transition: background 0.1s;
}

.digest-card__menu-item:hover {
  background: var(--gray-10, #f5f6f8);
}

.digest-card__menu-item--danger {
  color: #db2547;
}

/* ═══════════════════════════════════════════
   CREATE VIEW — hero, tabs, form sections
   ═══════════════════════════════════════════ */
/* ── Create header (fixed above scroll) ── */
.create-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 24px 0;
  flex-shrink: 0;
  background: var(--gray-0, #ffffff);
}

/* ── Scrollable tab content ── */
.create-scroll-area {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--gray-0, #ffffff);
}

.create-scroll-area .blade-content {
  padding-top: 24px;
  padding-bottom: 32px;
}

.create-hero {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.create-hero__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.3;
  color: #000000;
  margin: 0;
}

.create-hero__description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  margin: 0;
}

/* ── Tabs ── */
.create-tabs {
  display: flex;
  flex-direction: column;
  height: 37px;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: 0;
}

.create-tabs__links {
  display: flex;
  gap: 40px;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-40, #dadce5);
}

/* ── Detail select ── */
.detail-select {
  width: 100% !important;
  max-width: 380px !important;
}

.create-tabs__link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 36px;
  justify-content: flex-end;
  padding: 0 0 4px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.35;
  color: var(--gray-110, #1a1c25);
  position: relative;
  font-weight: 400;
}

.create-tabs__link--active {
  font-weight: 600;
}

.create-tabs__link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gray-110, #1a1c25);
}

/* ── Tab Content ── */
.create-tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}

/* ── Sections ── */
.create-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
}

.create-section:first-child {
  gap: 8px;
}

.create-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.create-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.create-helper {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.create-field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.create-field-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.35;
  color: #2a2c35;
  margin: 0;
}

/* ── Frequency Group ── */
.freq-group {
  display: flex;
  height: 36px;
  width: 100%;
}

.freq-group__item {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: var(--gray-0, #ffffff);
  border: 1px solid var(--gray-40, #dadce5);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
  transition: all 0.2s;
}

.freq-group__item:first-child {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.freq-group__item:last-child {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.freq-group__item:not(:first-child) {
  border-left: none;
}

.freq-group__item--active {
  background: rgba(18, 130, 151, 0.08);
  font-weight: 600;
  color: var(--teal-90, #01586a);
  z-index: 1;
}

/* ── Row / Field Layout ── */
.create-row {
  display: flex;
  gap: 8px;
  width: 100%;
}

.create-field {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.create-field__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
}

.create-field :deep(.pendo-select),
.create-section :deep(.pendo-select) {
  width: 100% !important;
  max-width: none !important;
  display: block !important;
  min-width: 0 !important;
}

.create-field :deep(.pendo-select__trigger),
.create-section :deep(.pendo-select__trigger) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.create-section :deep(.pendo-input) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

/* ── Goal Textarea ── */
.goal-textarea {
  width: 100%;
  height: 72px;
  padding: 8px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  resize: none;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.goal-textarea::placeholder {
  color: var(--gray-60, #9a9ca5);
}

.goal-textarea:focus {
  border-color: #01586a;
}

/* ── Channel Select ── */
.channel-wrapper {
  position: relative;
  width: 100%;
}

.channel-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 36px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}

.channel-select:has(.channel-tags) {
  padding: 4px 12px 4px 8px;
}

.channel-select:not(:has(.channel-tags)) {
  height: 36px;
  padding: 0 12px;
}

.channel-select:hover {
  border-color: #2a2c35;
}

.channel-select__placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #2a2c35;
}

.channel-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.channel-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30, #eaecf1);
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
}

.channel-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110, #1a1c25);
  font-weight: 600;
}

.channel-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100, #2a2c35);
}

.channel-select__chevron {
  display: flex;
  align-items: center;
  color: #6a6c75;
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s;
}

.channel-select__chevron--open {
  transform: rotate(180deg);
}

.channel-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  max-height: 164px;
  overflow-y: auto;
  z-index: 100;
}

.channel-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2a2c35;
  transition: background-color 0.1s;
}

.channel-dropdown__item:hover {
  background-color: #f5f6f8;
}

.ch-dropdown-enter-active,
.ch-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ch-dropdown-enter-from,
.ch-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Widget Select (mirrors channel-select) ── */
.widget-wrapper {
  position: relative;
  width: 100%;
}

.widget-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 36px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}

.widget-select:has(.widget-tags) {
  padding: 4px 12px 4px 8px;
}

.widget-select:not(:has(.widget-tags)) {
  height: 36px;
  padding: 0 12px;
}

.widget-select:hover {
  border-color: #2a2c35;
}

.widget-select__placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #2a2c35;
}

.widget-tags {
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.widget-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30, #eaecf1);
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
  flex-shrink: 0;
  max-width: 220px;
  min-width: 0;
  overflow: hidden;
}

.widget-tag--overflow {
  cursor: default;
}

.widget-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110, #1a1c25);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.widget-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100, #2a2c35);
}

.widget-select__chevron {
  display: flex;
  align-items: center;
  color: #6a6c75;
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s;
}

.widget-select__chevron--open {
  transform: rotate(180deg);
}

.widget-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  max-height: 220px;
  overflow-y: auto;
  z-index: 100;
}

.widget-dropdown__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
}

.widget-dropdown__action {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--teal-90, #006a80);
  cursor: pointer;
  padding: 0;
}

.widget-dropdown__action:hover {
  text-decoration: underline;
}

.widget-dropdown__divider {
  color: var(--gray-40, #dadce5);
  font-size: 13px;
}

.widget-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2a2c35;
  transition: background-color 0.1s;
}

.widget-dropdown__item:hover {
  background-color: #f5f6f8;
}

/* ── Filter Pills ── */
.filter-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  height: 28px;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  background: white;
  overflow: visible;
  position: relative;
}

.filter-pill__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-60, #9a9ca5);
  flex-shrink: 0;
}

.filter-pill__remove:hover {
  color: var(--gray-100, #2a2c35);
}

.filter-pill__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  padding: 0 0 0 4px;
  white-space: nowrap;
}

.filter-pill__value-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
  height: 100%;
  background: white;
}

.filter-pill__value-wrap:hover {
  background: var(--gray-10, #f5f6f8);
}

.filter-pill__value {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--teal-80, #01697e);
  white-space: nowrap;
}

.filter-pill__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.filter-pill__dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2a2c35;
  transition: background-color 0.1s;
}

.filter-pill__dropdown-item:hover {
  background-color: #f5f6f8;
}

/* ── Add filter button ── */
.filter-add-wrap {
  position: relative;
}

.filter-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  border-radius: 3px;
  transition: color 0.15s;
}

.filter-add-btn:hover {
  color: var(--gray-100, #2a2c35);
}

.filter-add-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 140px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  z-index: 100;
  overflow: hidden;
}

/* ── Test Row ── */
.test-row {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.test-row__select {
  flex: 1;
  min-width: 0;
}

.test-row__select :deep(.pendo-select) {
  width: 100% !important;
  display: block !important;
}

.test-row :deep(.pendo-button) {
  flex-shrink: 0;
}
</style>
