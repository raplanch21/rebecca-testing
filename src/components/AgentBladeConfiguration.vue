<template>
  <div class="blade-wrapper">
    <div class="blade-panel">
      <!-- Header -->
      <div class="blade-header">
        <div class="blade-header__left">
          <h2 class="blade-header__title">Product signals</h2>
        </div>
        <div class="blade-header__right">
          <button type="button" class="blade-header__close" aria-label="Close" @click="$emit('close')">
            <PendoIcon type="x" :size="16" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="blade-body">
        <div class="blade-content">
          <!-- Hero -->
          <div class="blade-section blade-hero">
            <h3 class="blade-hero__title">Agent settings</h3>
          </div>

          <!-- Tabs -->
          <div class="blade-tabs">
            <div class="blade-tabs__links">
              <button
                type="button"
                :class="['blade-tabs__link', { 'blade-tabs__link--active': activeTab === 'context' }]"
                @click="activeTab = 'context'"
              >
                Context
              </button>
              <button
                v-if="showShareTab"
                type="button"
                :class="['blade-tabs__link', { 'blade-tabs__link--active': activeTab === 'share' }]"
                @click="activeTab = 'share'"
              >
                Share
              </button>
              <button
                type="button"
                :class="['blade-tabs__link', { 'blade-tabs__link--active': activeTab === 'scheduling' }]"
                @click="activeTab = 'scheduling'"
              >
                Schedule
              </button>
            </div>
          </div>

          <!-- Context Tab -->
          <div v-if="activeTab === 'context'" class="blade-tab-content">

            <!-- Accordion: Select widgets -->
            <div class="accordion-section">
              <button class="accordion-trigger" @click="toggleAccordion('widgets')">
                <span class="accordion-trigger-text">
                  <span class="blade-label">Select widgets</span>
                  <span class="blade-helper">Choose which widgets your agent uses to generate insights.</span>
                </span>
                <PendoIcon :type="openAccordions.widgets ? 'chevron-up' : 'chevron-down'" :size="16" :stroke-width="2" />
              </button>
              <div v-if="openAccordions.widgets" class="accordion-body">
                <div class="widget-selection-list">
                  <label v-for="widget in dashboardWidgets" :key="widget.id" class="widget-selection-row">
                    <PendoCheckbox v-model="widget.selected" />
                    <div class="widget-selection-info">
                      <span class="widget-selection-name">{{ widget.name }}</span>
                      <span class="widget-selection-activity">{{ widget.activity }}</span>
                    </div>
                    <PendoTag v-if="widget.recommended" type="filter" label="Recommended" size="regular" />
                  </label>
                </div>
              </div>
            </div>

            <!-- Accordion: Dashboard context -->
            <div class="accordion-section">
              <button class="accordion-trigger" @click="toggleAccordion('dashboardContext')">
                <span class="accordion-trigger-text">
                  <span class="blade-label">Dashboard context</span>
                  <span class="blade-helper">Help your agent generate more relevant insights.</span>
                </span>
                <PendoIcon :type="openAccordions.dashboardContext ? 'chevron-up' : 'chevron-down'" :size="16" :stroke-width="2" />
              </button>
              <div v-if="openAccordions.dashboardContext" class="accordion-body">
                <div class="context-fields">
                  <div class="context-field">
                    <label class="blade-field__label">What's your goal?</label>
                    <div class="context-field-wrapper" :class="{ 'context-field-wrapper--edit': editingFields.goal }">
                      <textarea
                        v-model="contextFields.goal"
                        class="context-field-input"
                        placeholder="e.g., Increase adoption of Trends to 50% of accounts taking Level 1 actions within the first month."
                        rows="3"
                        :readonly="!editingFields.goal"
                      ></textarea>
                      <div class="context-field-footer">
                        <PendoButton type="secondary" prefix-icon="plus" label="Add attachment" size="small" />
                        <div class="context-field-footer-icons">
                          <button type="button" class="context-field-icon-btn" :aria-label="editingFields.goal ? 'Save' : 'Edit'" @click="toggleFieldEdit('goal')">
                            <PendoIcon :type="editingFields.goal ? 'check' : 'edit'" :size="16" />
                          </button>
                          <button type="button" class="context-field-icon-btn" aria-label="Undo" @click="undoField('goal')">
                            <PendoIcon type="rotate-ccw" :size="16" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="context-field">
                    <label class="blade-field__label">What do your stakeholders need to know?</label>
                    <div class="context-field-wrapper" :class="{ 'context-field-wrapper--edit': editingFields.stakeholderQuestions }">
                      <textarea
                        v-model="contextFields.stakeholderQuestions"
                        class="context-field-input"
                        placeholder="e.g., Are users engaging with card-level insights? Which segments are adopting fastest?"
                        rows="3"
                        :readonly="!editingFields.stakeholderQuestions"
                      ></textarea>
                      <div class="context-field-footer">
                        <PendoButton type="secondary" prefix-icon="plus" label="Add attachment" size="small" />
                        <div class="context-field-footer-icons">
                          <button type="button" class="context-field-icon-btn" :aria-label="editingFields.stakeholderQuestions ? 'Save' : 'Edit'" @click="toggleFieldEdit('stakeholderQuestions')">
                            <PendoIcon :type="editingFields.stakeholderQuestions ? 'check' : 'edit'" :size="16" />
                          </button>
                          <button type="button" class="context-field-icon-btn" aria-label="Undo" @click="undoField('stakeholderQuestions')">
                            <PendoIcon type="rotate-ccw" :size="16" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accordion: Key events -->
            <div class="accordion-section">
              <button class="accordion-trigger" @click="toggleAccordion('keyEvents')">
                <span class="accordion-trigger-text">
                  <span class="blade-label">Key events</span>
                  <span class="blade-helper">Event descriptions that help generate more relevant summaries.</span>
                </span>
                <PendoIcon :type="openAccordions.keyEvents ? 'chevron-up' : 'chevron-down'" :size="16" :stroke-width="2" />
              </button>
              <div v-if="openAccordions.keyEvents" class="accordion-body">
                <div class="blade-field-group">
                  <label class="blade-field-label">cardInsightsNavigation</label>
                  <PendoInput
                    v-model="formData.keyEvents.cardInsightsNavigation"
                    placeholder="This feature measures clicks on Trend cards."
                    :readonly="true"
                  />
                </div>
                <div class="blade-field-group">
                  <label class="blade-field-label">trendsLoaded</label>
                  <PendoInput
                    v-model="formData.keyEvents.trendsLoaded"
                    placeholder="Tracks when Trends are loaded in the UI."
                    :readonly="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Share Tab -->
          <div v-else-if="activeTab === 'share'" class="blade-tab-content">
            <!-- Insight message preview -->
            <div class="blade-section">
              <h5 class="blade-label">Insight message</h5>
              <p class="blade-helper">This is the current signal generated by your agent.</p>
              <div class="share-insight-preview pendo-dropdown-scroll">
                <span v-if="insightMessage" v-html="insightMessage"></span>
                <span v-else class="share-insight-empty">No insight generated yet. Customize your agent to generate signals.</span>
              </div>
            </div>

            <!-- User commentary -->
            <div class="blade-section">
              <h5 class="blade-label">Add a note</h5>
              <p class="blade-helper">Include any information you want to share alongside this insight.</p>
              <div class="context-field-wrapper" :class="{ 'context-field-wrapper--edit': editingCommentary }">
                <textarea
                  v-model="shareCommentary"
                  class="context-field-input"
                  placeholder="e.g., The reporting drop is likely from our Jan 20 Slack integration launch."
                  rows="4"
                  :readonly="!editingCommentary"
                ></textarea>
                <div class="context-field-footer">
                  <PendoButton type="secondary" prefix-icon="plus" label="Add attachment" size="small" />
                  <div class="context-field-footer-icons">
                    <button type="button" class="context-field-icon-btn" :aria-label="editingCommentary ? 'Save' : 'Edit'" @click="toggleCommentaryEdit">
                      <PendoIcon :type="editingCommentary ? 'check' : 'edit'" :size="16" />
                    </button>
                    <button type="button" class="context-field-icon-btn" aria-label="Undo" @click="shareCommentary = savedCommentary; editingCommentary = false">
                      <PendoIcon type="rotate-ccw" :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Send to -->
            <div class="blade-section">
              <h5 class="blade-label">Send updates to</h5>
              <PendoSelect v-model="formData.subscriptionType" :options="subscriptionTypeOptions" />
            </div>

            <!-- Channels -->
            <div class="blade-section">
              <h5 class="blade-label">Channels</h5>
              <div class="blade-channel-wrapper" @click="toggleChannelDropdown">
                <div class="blade-channel-select">
                  <div v-if="formData.channels.length > 0" class="blade-channel-tags">
                    <div
                      v-for="(channel, index) in formData.channels"
                      :key="channel"
                      class="blade-tag"
                    >
                      <span class="blade-tag__text">{{ channel }}</span>
                      <button
                        type="button"
                        class="blade-tag__close"
                        aria-label="Remove channel"
                        @click.stop="removeChannel(index)"
                      >
                        <PendoIcon type="x" :size="12" :stroke-width="2" />
                      </button>
                    </div>
                  </div>
                  <span v-else class="blade-channel-select__placeholder">Select channels</span>
                  <div
                    class="blade-channel-select__icon"
                    :class="{ 'blade-channel-select__icon--open': showChannelDropdown }"
                  >
                    <PendoIcon type="chevron-down" :size="16" />
                  </div>
                </div>

                <Transition name="channel-dropdown">
                  <div v-if="showChannelDropdown" class="blade-channel-dropdown pendo-dropdown-scroll">
                    <div
                      v-for="ch in availableChannels"
                      :key="ch"
                      class="blade-channel-dropdown__item"
                      @click="toggleChannel(ch)"
                    >
                      <span>{{ ch }}</span>
                      <PendoIcon v-if="formData.channels.includes(ch)" type="check" :size="16" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Test -->
            <div class="blade-section">
              <h5 class="blade-sublabel">Send test message to</h5>
              <div class="blade-test-row">
                <PendoSelect
                  v-model="formData.testChannel"
                  :options="testChannelOptions"
                  placeholder="Select channel"
                  :open-upward="true"
                  class="blade-test-select"
                />
                <PendoButton
                  type="tertiary"
                  label="Send test"
                  suffix-icon="send"
                  size="small"
                  :disabled="!formData.testChannel"
                />
              </div>
            </div>
          </div>

          <!-- Schedule Tab -->
          <div v-else-if="activeTab === 'scheduling'" class="blade-tab-content">
            <!-- Frequency -->
            <div class="blade-section">
              <h5 class="blade-label">Frequency</h5>
              <div class="blade-button-group">
                <button
                  type="button"
                  :class="['blade-button-group__item', { 'blade-button-group__item--active': formData.frequency === 'Daily' }]"
                  @click="formData.frequency = 'Daily'"
                >
                  Daily
                </button>
                <button
                  type="button"
                  :class="['blade-button-group__item', { 'blade-button-group__item--active': formData.frequency === 'Weekly' }]"
                  @click="formData.frequency = 'Weekly'"
                >
                  Weekly
                </button>
                <button
                  type="button"
                  :class="['blade-button-group__item', { 'blade-button-group__item--active': formData.frequency === 'Monthly' }]"
                  @click="formData.frequency = 'Monthly'"
                >
                  Monthly
                </button>
              </div>

              <!-- Daily: Time + Timezone -->
              <div v-if="formData.frequency === 'Daily'" class="blade-row">
                <div class="blade-field">
                  <label class="blade-field__label">Time</label>
                  <PendoSelect v-model="formData.time" :options="timeOptions" />
                </div>
                <div class="blade-field">
                  <label class="blade-field__label">Time zone</label>
                  <PendoSelect v-model="formData.timezone" :options="timezoneOptions" />
                </div>
              </div>

              <!-- Weekly: Day + Time + Timezone -->
              <div v-else-if="formData.frequency === 'Weekly'" class="blade-row">
                <div class="blade-field">
                  <label class="blade-field__label">Day</label>
                  <PendoSelect v-model="formData.day" :options="dayOptions" />
                </div>
                <div class="blade-field">
                  <label class="blade-field__label">Time</label>
                  <PendoSelect v-model="formData.time" :options="timeOptions" />
                </div>
                <div class="blade-field">
                  <label class="blade-field__label">Time zone</label>
                  <PendoSelect v-model="formData.timezone" :options="timezoneOptions" />
                </div>
              </div>

              <!-- Monthly: Day of month + Time + Timezone -->
              <div v-else-if="formData.frequency === 'Monthly'" class="blade-row">
                <div class="blade-field">
                  <label class="blade-field__label">Day of month</label>
                  <PendoSelect v-model="formData.dayOfMonth" :options="dayOfMonthOptions" />
                </div>
                <div class="blade-field">
                  <label class="blade-field__label">Time</label>
                  <PendoSelect v-model="formData.time" :options="timeOptions" />
                </div>
                <div class="blade-field">
                  <label class="blade-field__label">Time zone</label>
                  <PendoSelect v-model="formData.timezone" :options="timezoneOptions" />
                </div>
              </div>
            </div>

            <!-- Update name -->
            <div class="blade-section">
              <h5 class="blade-label">Update name</h5>
              <PendoInput v-model="formData.name" placeholder="Weekly Trends insights digest" style="width: 100%;" />
              <p class="blade-helper" style="margin-top: 4px; font-size: 12.642px;">This name appears at the top of the Slack message.</p>
            </div>

            <!-- Subscription Type -->
            <div class="blade-section">
              <h5 class="blade-label">Send updates to</h5>
              <PendoSelect v-model="formData.subscriptionType" :options="subscriptionTypeOptions" />
            </div>

            <!-- Channels -->
            <div class="blade-section">
              <h5 class="blade-label">Channels</h5>

              <div class="blade-channel-wrapper">
                <div
                  class="blade-channel-select"
                  :class="{ 'blade-channel-select--open': showChannelDropdown }"
                  tabindex="0"
                  @click="toggleChannelDropdown"
                  @keydown.enter.prevent="toggleChannelDropdown"
                  @keydown.space.prevent="toggleChannelDropdown"
                  @keydown.esc="showChannelDropdown = false"
                >
                  <div v-if="formData.channels.length > 0" class="blade-channel-tags">
                    <div
                      v-for="(channel, index) in formData.channels"
                      :key="channel"
                      class="blade-tag"
                    >
                      <span class="blade-tag__text">{{ channel }}</span>
                      <button
                        type="button"
                        class="blade-tag__close"
                        aria-label="Remove channel"
                        @click.stop="removeChannel(index)"
                      >
                        <PendoIcon type="x" :size="12" :stroke-width="2" />
                      </button>
                    </div>
                  </div>
                  <span v-else class="blade-channel-select__placeholder">Select channels</span>
                  <div
                    class="blade-channel-select__icon"
                    :class="{ 'blade-channel-select__icon--open': showChannelDropdown }"
                  >
                    <PendoIcon type="chevron-down" :size="16" />
                  </div>
                </div>

                <Transition name="channel-dropdown">
                  <div v-if="showChannelDropdown" class="blade-channel-dropdown pendo-dropdown-scroll">
                    <div
                      v-for="channel in availableChannels"
                      :key="channel"
                      class="blade-channel-dropdown__item"
                      @click="toggleChannel(channel)"
                    >
                      <span>{{ channel }}</span>
                      <PendoIcon v-if="formData.channels.includes(channel)" type="check" :size="16" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Test message -->
            <div class="blade-section">
              <h5 class="blade-sublabel">Send test message to</h5>

              <div class="blade-test-row">
                <PendoSelect
                  v-model="formData.testChannel"
                  :options="testChannelOptions"
                  placeholder="Select channel"
                  :open-upward="true"
                  class="blade-test-select"
                />
                <PendoButton
                  type="tertiary"
                  label="Send test"
                  suffix-icon="send"
                  size="small"
                  :disabled="!formData.testChannel"
                />
              </div>
            </div>

            <!-- Add another -->
            <div class="blade-section blade-section--bottom">
              <PendoButton
                type="secondary"
                prefix-icon="plus"
                label="Add another"
                size="small"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div class="blade-footer">
        <div class="blade-footer__actions">
          <PendoButton
            type="secondary"
            label="Cancel"
            @click="$emit('close')"
          />
          <PendoButton
            type="primary"
            label="Save"
            @click="handleSaveClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { PendoButton, PendoInput, PendoSelect, PendoIcon, PendoCheckbox, PendoTag } from './pendo'

const props = defineProps({
  dashboardName: {
    type: String,
    default: 'Dashboard'
  },
  mode: {
    type: String,
    default: 'customize',
    validator: (v) => ['customize', 'notifications', 'share'].includes(v)
  },
  showShareTab: {
    type: Boolean,
    default: false
  },
  focusSection: {
    type: String,
    default: ''
  },
  initialData: {
    default: () => null
  },
  insightMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'save'])

const modeToTab = { customize: 'context', notifications: 'scheduling', share: 'share' }
const activeTab = ref(modeToTab[props.mode] || 'context')

watch(() => props.mode, (newMode) => {
  activeTab.value = modeToTab[newMode] || 'context'
})

// --- Accordion state ---

const sectionMap = { widgets: 'widgets', context: 'dashboardContext' }

const openAccordions = reactive({
  widgets: !props.focusSection || props.focusSection === 'widgets',
  dashboardContext: props.focusSection === 'context',
  keyEvents: false
})

watch(() => props.focusSection, (section) => {
  if (!section) return
  activeTab.value = 'context'
  const key = sectionMap[section]
  if (key) {
    Object.keys(openAccordions).forEach(k => { openAccordions[k] = false })
    openAccordions[key] = true
  }
})

const toggleAccordion = (section) => {
  openAccordions[section] = !openAccordions[section]
}

// --- Widget selection ---

const getInitialSelected = (id) => {
  if (!props.initialData?.widgets) return false
  const match = props.initialData.widgets.find(w => w.id === id)
  return match ? match.selected : false
}

const dashboardWidgets = reactive([
  { id: 1, name: 'Visitor adoption', activity: '12 views/week', selected: getInitialSelected(1), recommended: true },
  { id: 2, name: 'Account retention', activity: '9 views/week', selected: getInitialSelected(2), recommended: true },
  { id: 3, name: 'Conversion rate', activity: '18 views/week', selected: getInitialSelected(3), recommended: true },
  { id: 4, name: 'Time to complete', activity: '15 views/week', selected: getInitialSelected(4), recommended: true },
  { id: 5, name: 'User feedback | Trends feature', activity: '3 views/week', selected: getInitialSelected(5), recommended: false },
  { id: 6, name: 'Feature background', activity: '1 view/week', selected: getInitialSelected(6), recommended: false },
  { id: 7, name: 'The team', activity: 'No recent activity', selected: getInitialSelected(7), recommended: false }
])

// --- Context fields ---

const contextFields = reactive({
  goal: props.initialData?.context?.goal || '',
  stakeholderQuestions: props.initialData?.context?.stakeholderQuestions || ''
})

const editingFields = reactive({ goal: false, stakeholderQuestions: false })
const savedFields = reactive({
  goal: props.initialData?.context?.goal || '',
  stakeholderQuestions: props.initialData?.context?.stakeholderQuestions || ''
})

const demoPrefills = {
  goal: 'Increase adoption of the Trends feature to 50% of accounts taking Level 1 actions (viewing a Trend card, applying a filter, or clicking an insight) within the first 30 days of launch. Secondary goal: reduce manual analysis time by 25% for product and CS teams using Trends-generated insights in weekly reviews.',
  stakeholderQuestions: 'Are enterprise accounts engaging with card-level insights at a higher rate than mid-market? Which onboarding cohort shows the fastest time-to-first-engagement with Trends? Is there a measurable drop in manual report-building among teams that have adopted Trends? What does the feedback sentiment look like — are users finding the AI-surfaced patterns actionable?'
}

const toggleFieldEdit = (field) => {
  if (editingFields[field]) {
    savedFields[field] = contextFields[field]
  } else if (!contextFields[field]) {
    contextFields[field] = demoPrefills[field] || ''
  }
  editingFields[field] = !editingFields[field]
}

const undoField = (field) => {
  contextFields[field] = savedFields[field]
  editingFields[field] = false
}

// --- Share tab ---

const shareCommentary = ref('')
const savedCommentary = ref('')
const editingCommentary = ref(false)

const commentaryPrefill = `Retention — We'll be covering these metrics during our monthly strategy meeting this Thursday. Come with questions.\nConversion — The onboarding guide targeting new account activation is currently in approval. Expected to go live Friday — we should see this move next week.\nJanuary cohort — I've flagged this with the onboarding team. If we don't see improvement by next Monday, we'll escalate.`

const toggleCommentaryEdit = () => {
  if (editingCommentary.value) {
    savedCommentary.value = shareCommentary.value
  } else if (!shareCommentary.value) {
    shareCommentary.value = commentaryPrefill
  }
  editingCommentary.value = !editingCommentary.value
}

// --- Schedule form ---

const formData = reactive({
  frequency: 'Weekly',
  day: 'Monday',
  dayOfMonth: '1',
  time: '9:00 AM',
  timezone: 'EST',
  name: props.dashboardName,
  subscriptionType: 'Slack',
  channels: [],
  testChannel: '',
  keyEvents: {
    cardInsightsNavigation: 'This feature measures clicks on Trend cards.',
    trendsLoaded: 'Tracks when Trends are loaded in the UI.'
  }
})

// --- Channel dropdown ---

const showChannelDropdown = ref(false)

const availableChannels = [
  '#n8n-test',
  '#product-team-updates',
  '#team-insights',
  '#engineering',
  '#design',
  '#customer-success',
  '#sales'
]

const testChannelOptions = computed(() => {
  return availableChannels.map(channel => ({
    value: channel,
    label: channel
  }))
})

const toggleChannelDropdown = () => {
  showChannelDropdown.value = !showChannelDropdown.value
}

const toggleChannel = (channel) => {
  const index = formData.channels.indexOf(channel)
  if (index > -1) {
    formData.channels.splice(index, 1)
  } else {
    formData.channels.push(channel)
  }
}

const removeChannel = (index) => {
  formData.channels.splice(index, 1)
}

// --- Select options ---

const dayOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
]

const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1
  return { value: String(day), label: String(day) }
})

const timeOptions = [
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' }
]

const timezoneOptions = [
  { value: 'EST', label: 'EST' },
  { value: 'CST', label: 'CST' },
  { value: 'MST', label: 'MST' },
  { value: 'PST', label: 'PST' }
]

const subscriptionTypeOptions = [
  { value: 'Slack', label: 'Slack', icon: 'slack' },
  { value: 'Teams', label: 'Teams', icon: 'teams' },
  { value: 'Email', label: 'Email' }
]

// --- Save handler ---

const handleSaveClick = () => {
  const selectedWidgets = dashboardWidgets.filter(w => w.selected)

  if (typeof pendo !== 'undefined') {
    pendo.track('agent_configuration_saved', {
      selectedWidgetCount: selectedWidgets.length,
      hasGoalDescription: !!contextFields.goal,
      hasStakeholderQuestions: !!contextFields.stakeholderQuestions,
      frequency: formData.frequency,
      day: formData.day,
      time: formData.time,
      timezone: formData.timezone,
      channelCount: formData.channels.length,
      subscriptionName: formData.name
    })
  }

  emit('save', { widgets: dashboardWidgets, context: contextFields, schedule: formData })
}

// --- Click-outside handler ---

const handleClickOutside = (event) => {
  const wrapper = event.target.closest('.blade-channel-wrapper')
  if (!wrapper && showChannelDropdown.value) {
    showChannelDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ========================================
   Layout: Blade wrapper & panel
   ======================================== */
.blade-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  display: flex;
  flex-direction: column;
}

.blade-panel {
  background: var(--gray-0);
  border-left: 1px solid var(--gray-40);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* ========================================
   Header
   ======================================== */
.blade-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 16px 24px;
  border-bottom: 1px solid var(--gray-40);
  background: var(--gray-0);
}

.blade-header__left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.blade-header__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-90);
  margin: 0;
}

.blade-header__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.blade-header__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 26px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: var(--gray-100);
}

.blade-header__close:hover {
  background: var(--gray-20);
}

/* ========================================
   Body
   ======================================== */
.blade-body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--gray-0);
  padding: 24px 0;
}

.blade-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
}

/* ========================================
   Hero
   ======================================== */
.blade-hero {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 24px;
}

.blade-hero__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 22.781px;
  line-height: 1.3;
  color: #000000;
  margin: 0;
}

/* ========================================
   Tabs
   ======================================== */
.blade-tabs {
  display: flex;
  flex-direction: column;
  height: 37px;
}

.blade-tabs__links {
  display: flex;
  gap: 40px;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-40);
}

.blade-tabs__link {
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
  color: var(--gray-110);
  position: relative;
}

.blade-tabs__link--active {
  font-weight: 600;
}

.blade-tabs__link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gray-110);
}

.blade-tabs__link:not(.blade-tabs__link--active) {
  font-weight: 400;
}

/* ========================================
   Tab content
   ======================================== */
.blade-tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  min-height: 0;
  width: 100%;
}

/* ========================================
   Accordion sections (agent-specific)
   ======================================== */
.accordion-section {
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
}

.accordion-section:last-child {
  border-bottom: none;
}

.accordion-trigger {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 16px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.1s ease;
}

.accordion-trigger:hover {
  background-color: var(--gray-10, #f5f6f8);
}

.accordion-trigger-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.accordion-trigger-text .blade-label {
  padding: 0;
}

.accordion-trigger-text .blade-helper {
  padding: 0;
}

.accordion-body {
  padding: 12px 24px 16px;
}

/* ========================================
   Context fields (agent-specific)
   ======================================== */
.context-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.context-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Share tab: insight preview */
.share-insight-preview {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.6;
  color: var(--gray-80, #4a4c56);
  background: var(--gray-10, #f5f6f8);
  border: 1px solid var(--gray-30, #e5e7eb);
  border-radius: 4px;
  padding: 12px 14px;
  max-height: 200px;
  overflow-y: auto;
}

.share-insight-preview :deep(strong) {
  font-weight: 600;
  color: var(--gray-100, #2a2c35);
}

.share-insight-preview :deep(p) {
  margin: 0 0 8px;
}

.share-insight-preview :deep(p:last-child) {
  margin-bottom: 0;
}

.share-insight-empty {
  color: var(--gray-50, #b0b2bc);
  font-style: italic;
}

.context-field-wrapper {
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 3px;
  overflow: hidden;
  transition: border-color 0.15s ease;
}

.context-field-wrapper:focus-within,
.context-field-wrapper--edit {
  border-color: var(--teal-90, #01586a);
}

.context-field-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 8px 8px;
  border-top: 1px solid var(--gray-40, #dadce5);
}

.context-field-footer-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.context-field-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-70, #6a6c75);
  padding: 0;
  transition: color 0.1s ease;
}

.context-field-icon-btn:hover {
  color: var(--gray-100, #2a2c35);
}

.context-field-input {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  background: white;
  border: none;
  border-radius: 0;
  padding: 9px 10px 9px 8px;
  resize: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.context-field-input::placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  color: var(--gray-50, #b0b2bc);
}

/* ========================================
   Widget selection (agent-specific)
   ======================================== */
.widget-selection-list {
  display: flex;
  flex-direction: column;
}

.widget-selection-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--gray-20, #f0f1f4);
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.widget-selection-row:last-child {
  border-bottom: none;
}

.widget-selection-row:hover {
  background-color: var(--gray-10, #f5f6f8);
  margin: 0 -12px;
  padding: 12px 12px;
  border-radius: 4px;
}

.widget-selection-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.widget-selection-name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-100, #2a2c35);
  line-height: 1.4;
}

.widget-selection-activity {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  color: var(--gray-60, #8a8d97);
  line-height: 1.4;
}

/* ========================================
   Sections & labels
   ======================================== */
.blade-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
}

.blade-section > * {
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.blade-section:first-child {
  gap: 8px;
}

.blade-section--bottom {
  margin-top: auto;
}

.blade-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.blade-sublabel {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.blade-helper {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.blade-field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.blade-field-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.35;
  color: #2a2c35;
  margin: 0;
}

/* ========================================
   Button group (frequency)
   ======================================== */
.blade-button-group {
  display: flex;
  height: 36px;
  width: 100%;
  max-width: none;
}

.blade-button-group__item {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: var(--gray-0);
  border: 1px solid var(--gray-40);
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 0;
}

.blade-button-group__item:first-child {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.blade-button-group__item:last-child {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.blade-button-group__item:not(:first-child) {
  border-left: none;
}

.blade-button-group__item--active {
  background: rgba(18, 130, 151, 0.08);
  border: 1px solid var(--gray-40);
  font-weight: 600;
  color: var(--teal-90);
  z-index: 1;
}

/* ========================================
   Row layout (day/time/timezone selectors)
   ======================================== */
.blade-row {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: none;
  flex-wrap: nowrap;
  box-sizing: border-box;
}

.blade-field {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  max-width: none;
  box-sizing: border-box;
}

.blade-field__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100);
}

.blade-field :deep(.pendo-select) {
  width: 100% !important;
  max-width: none !important;
  display: block !important;
  min-width: 0 !important;
}

.blade-field :deep(.pendo-select__trigger) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.blade-field :deep(.pendo-input) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.blade-section :deep(.pendo-select) {
  width: 100% !important;
  max-width: none !important;
  display: block !important;
  min-width: 0 !important;
}

.blade-section :deep(.pendo-select__trigger) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

.blade-section :deep(.pendo-input) {
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
}

/* ========================================
   Channel select & dropdown
   ======================================== */
.blade-channel-wrapper {
  position: relative;
  width: 100%;
}

.blade-channel-select {
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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}

.blade-channel-select:has(.blade-channel-tags) {
  padding: 4px 12px 4px 8px;
}

.blade-channel-select:not(:has(.blade-channel-tags)) {
  height: 36px;
  padding: 0 12px;
}

.blade-channel-select:hover {
  border-color: #2a2c35;
}

.blade-channel-select:focus {
  border-color: #2a2c35;
  box-shadow: 0 0 0 2px rgba(42, 44, 53, 0.15);
}

.blade-channel-select__placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #2a2c35;
}

.blade-channel-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.blade-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30);
  border: 1px solid var(--gray-30);
  border-radius: 3px;
  flex-shrink: 1;
  min-width: 0;
}

.blade-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110);
  font-weight: 600;
}

.blade-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100);
  flex-shrink: 0;
}

.blade-channel-select__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a6c75;
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.blade-channel-select__icon--open {
  transform: rotate(180deg);
}

.blade-channel-dropdown {
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

.blade-channel-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2a2c35;
  transition: background-color 0.1s ease;
}

.blade-channel-dropdown__item:hover {
  background-color: #f5f6f8;
}

.blade-channel-dropdown__item:first-child {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.blade-channel-dropdown__item:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

/* Channel dropdown transition */
.channel-dropdown-enter-active,
.channel-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.channel-dropdown-enter-from,
.channel-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ========================================
   Test row
   ======================================== */
.blade-test-row {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.blade-test-select {
  flex: 1;
  min-width: 0;
}

.blade-test-select :deep(.pendo-select) {
  width: 100% !important;
  display: block !important;
}

.blade-test-select :deep(.pendo-select__trigger) {
  justify-content: flex-start;
  gap: 12px;
  width: 100% !important;
}

.blade-test-select :deep(.pendo-select__placeholder) {
  color: #2a2c35;
}

.blade-test-select :deep(.pendo-select__arrow) {
  margin-left: auto;
}

.blade-test-select :deep(.pendo-select__dropdown) {
  max-height: 164px !important;
}

.blade-test-row :deep(.pendo-button) {
  flex-shrink: 0;
}

/* ========================================
   Footer
   ======================================== */
.blade-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 16px 24px;
  border-top: 1px solid var(--gray-40);
  background: var(--gray-0);
}

.blade-footer__actions {
  display: flex;
  gap: 8px;
  width: 100%;
}

.blade-footer__actions :deep(.pendo-button) {
  flex: 1;
  min-height: 36px;
}

/* ========================================
   Responsive
   ======================================== */
@media (min-width: 1025px) and (max-width: 1280px) {
  .blade-row {
    gap: 8px;
  }

  .blade-test-row {
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .blade-wrapper {
    width: 100%;
  }

  .blade-row {
    flex-direction: column;
    gap: 16px;
  }

  .blade-test-row {
    flex-direction: column;
  }

  .blade-test-row > * {
    width: 100%;
  }
}
</style>
