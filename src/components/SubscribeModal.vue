<template>
  <PendoDrawer
    :visible="visible"
    :title="`Subscribe to ${dashboardName}`"
    size="fullscreen"
    placement="bottom"
    :mask="false"
    @update:visible="$emit('update:visible', $event)"
    @close="$emit('close')"
  >
    <!-- Full drawer masthead (content for `.pendo-drawer__header`) -->
    <template #header="{ close }">
      <div class="subscribe-masthead__left">
        <div class="subscribe-masthead__title">
          Subscribe to {{ dashboardName }}
        </div>
      </div>

      <div class="subscribe-masthead__center" aria-label="Steps">
        <span
          class="subscribe-masthead__step"
          :class="{ 'subscribe-masthead__step--active': activeTab === 'schedule' }"
        >
          Schedule
        </span>
        <PendoIcon class="subscribe-masthead__chevron" type="chevron-right" :size="16" />
        <span
          class="subscribe-masthead__step"
          :class="{ 'subscribe-masthead__step--active': activeTab === 'dashboard-details' }"
        >
          Dashboard details
        </span>
        <PendoIcon class="subscribe-masthead__chevron" type="chevron-right" :size="16" />
        <span
          class="subscribe-masthead__step"
          :class="{ 'subscribe-masthead__step--active': activeTab === 'preview' }"
        >
          Preview
        </span>
      </div>

      <div class="subscribe-masthead__right">
        <button type="button" class="subscribe-masthead__close" aria-label="Close drawer" @click="close">
          <PendoIcon type="x" :size="16" />
        </button>
      </div>
    </template>

    <div class="subscribe-drawer__main">
      <div v-if="activeTab === 'schedule'" class="h-full">
        <PendoCard :bordered="true" :shadow="false" body-padding="0" class="h-full flex flex-col">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Set up recurring updates</span>
            </div>
          </template>
          
          <div class="px-6 py-4 space-y-6 flex-1" style="overflow: visible;">
          <!-- Subscription type -->
          <div class="drawer-section drawer-field-container">
            <h3 class="drawer-label">Subscription type</h3>
            <p class="drawer-helper">Where do you want to send this update?</p>
            <div style="display: inline-block; width: 160px;">
              <PendoSelect v-model="formData.subscriptionType" :options="subscriptionTypes" />
            </div>
          </div>

          <!-- Name -->
          <div class="drawer-section drawer-field-container">
            <h3 class="drawer-label">Name</h3>
            <p class="drawer-helper">What would you like to name this update?</p>
            <PendoInput v-model="formData.name" placeholder="Weekly Trends insights digest" />
          </div>

          <!-- Frequency -->
          <div class="drawer-section drawer-field-container">
            <h3 class="drawer-label">Frequency</h3>
            <p class="drawer-helper">How often should this update post to {{ formData.subscriptionType }}?</p>
            <div class="flex items-center gap-2.5 flex-wrap">
              <div style="display: inline-block; min-width: 160px;">
                <PendoSelect v-model="formData.frequency" :options="frequencies" placeholder="Choose cadence" />
              </div>
              <template v-if="formData.frequency === 'Weekly'">
                <span class="drawer-inline-text">on</span>
                <div style="display: inline-block; min-width: 120px;">
                  <PendoSelect v-model="formData.day" :options="days" />
                </div>
              </template>
              <template v-if="formData.frequency === 'Daily' || formData.frequency === 'Weekly'">
                <span class="drawer-inline-text">at</span>
                <div style="display: inline-block; min-width: 100px;">
                  <PendoSelect v-model="formData.time" :options="times" />
                </div>
                <div style="display: inline-block; min-width: 160px;">
                  <PendoSelect v-model="formData.timezone" :options="timezones" />
                </div>
              </template>
            </div>
          </div>

          <!-- Channel (only for Slack) -->
          <div v-if="formData.subscriptionType === 'Slack'" class="drawer-section drawer-field-container">
            <h3 class="drawer-label">Channels</h3>
            <p class="drawer-helper">Where do you want to send this in Slack?</p>
            
            <div class="drawer-channel-wrapper">
              <div class="drawer-channel-select" @click="toggleChannelDropdown">
                <div v-if="formData.channels.length > 0" class="drawer-channel-tags">
                  <div
                    v-for="(channel, index) in formData.channels"
                    :key="channel"
                    class="drawer-tag"
                  >
                    <span class="drawer-tag__text">{{ channel }}</span>
                    <button
                      type="button"
                      class="drawer-tag__close"
                      aria-label="Remove channel"
                      @click.stop="removeChannel(index)"
                    >
                      <PendoIcon type="x" :size="12" :stroke-width="2" />
                    </button>
                  </div>
                </div>
                <span v-else class="drawer-channel-select__placeholder">Select channels</span>
                <div class="drawer-channel-select__icon" :class="{ 'drawer-channel-select__icon--open': showChannelDropdown }">
                  <PendoIcon type="chevron-down" :size="14" />
                </div>
              </div>
              
              <div v-if="showChannelDropdown" class="drawer-channel-dropdown pendo-dropdown-scroll">
                <div
                  v-for="channel in availableChannels"
                  :key="channel"
                  class="drawer-channel-dropdown__item"
                  @click="toggleChannel(channel)"
                >
                  <span>{{ channel }}</span>
                  <PendoIcon v-if="formData.channels.includes(channel)" type="check" :size="16" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </PendoCard>
      </div>

      <!-- Dashboard details tab -->
      <div v-else-if="activeTab === 'dashboard-details'" class="h-full">
        <PendoCard
          :bordered="true"
          :shadow="false"
          body-padding="0"
          class="h-full flex flex-col"
        >
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Dashboard context</span>
            </div>
          </template>

          <div class="px-6 py-4 space-y-6 flex-1" style="overflow: visible;">
            <!-- Include details header -->
            <div class="drawer-section">
              <h4 class="drawer-label" style="font-size: 16px;">Include details about your dashboard</h4>
              <p class="drawer-helper">Adding context helps us provide more relevant insights and better understand what your goals are.</p>
            </div>

            <!-- What you're tracking -->
            <div class="drawer-section">
              <h3 class="drawer-label">What you're tracking</h3>
              <p class="drawer-helper">This description is generated by Pendo AI using your dashboard data and business context.</p>
              
              <!-- AI Description Input Field Container -->
              <div class="drawer-textarea-container" :class="{ 'drawer-textarea-container--edit': isEditMode }" style="max-width: 100%;">
                <div class="drawer-textarea-wrapper">
                  <textarea
                    v-model="formData.aiDescription"
                    class="drawer-textarea pendo-dropdown-scroll"
                    :readonly="!isEditMode"
                  ></textarea>
                </div>

                <!-- Attachments Section (when attachments exist) -->
                <div v-if="formData.attachments.length > 0" class="drawer-attachments-row">
                  <p class="drawer-attachments-label">AI has access to:</p>
                  <div
                    v-for="(attachment, index) in formData.attachments"
                    :key="attachment"
                    class="drawer-tag"
                  >
                    <PendoIcon :type="getAttachmentIcon(attachment)" :size="12" class="drawer-tag__icon" />
                    <span class="drawer-tag__text">{{ attachment }}</span>
                    <button
                      type="button"
                      class="drawer-tag__close"
                      aria-label="Remove attachment"
                      @click="removeAttachment(index)"
                    >
                      <PendoIcon type="x" :size="12" :stroke-width="2" />
                    </button>
                  </div>
                </div>

                <!-- Add Attachment Button Row -->
                <div class="drawer-add-attachment-row">
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.svg,.xlsx,.csv"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                  <PendoButton
                    type="secondary"
                    prefix-icon="plus"
                    label="Add attachment"
                    size="small"
                    @click="triggerFileInput"
                  />
                  <div class="drawer-edit-icons">
                    <button type="button" class="drawer-edit-icon" :aria-label="isEditMode ? 'Save' : 'Edit'" @click="toggleEditMode">
                      <PendoIcon :type="isEditMode ? 'check' : 'edit'" :size="16" />
                    </button>
                    <button type="button" class="drawer-edit-icon" aria-label="Undo" @click="undoChanges">
                      <PendoIcon type="rotate-ccw" :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PendoCard>
      </div>

      <!-- Preview tab -->
      <div v-else-if="activeTab === 'preview'" class="h-full">
        <div class="slack-preview">
          <div class="slack-preview__container">
            <div class="slack-preview__message">
              <div class="slack-preview__header">
                <div class="slack-preview__avatar">
                  <img src="/pendo-analyst-avatar.png" alt="PendoAnalyst avatar" class="slack-preview__avatar-img" />
                </div>
                <div class="slack-preview__header-content">
                  <div class="slack-preview__meta">
                    <div class="slack-preview__meta-left">
                      <span class="slack-preview__author">PendoAnalyst</span>
                      <span class="slack-preview__app-badge">APP</span>
                    </div>
                    <span class="slack-preview__time">9:30 AM</span>
                  </div>
                  <div class="slack-preview__cadence">
                    <div class="slack-preview__scheduled-tag">
                      <PendoIcon type="calendar" :size="12" />
                      <span>Scheduled report</span>
                    </div>
                    <span class="slack-preview__cadence-text">Sent automatically · Weekly</span>
                  </div>
                </div>
              </div>
              
              <div class="slack-preview__content">
                <div class="slack-preview__card-header">
                  <a href="#" class="slack-preview__card-title"><strong>{Dashboard Name}</strong> — Feb 2, 2026</a>
                </div>
                
                <div class="slack-preview__card-body">
                  <div class="slack-preview__border-card">
                    <p class="slack-preview__field-label">🚀 What's Working Well</p>
                    <ul class="slack-preview__list">
                      <li><strong>Crushing the timebox goal.</strong> <strong>{Feature}</strong> hit 226% of target (362 visitors vs. 179 goal). Strong adoption momentum continues.</li>
                      <li><strong>Broad account reach.</strong> 216 unique accounts accessed <strong>{Page}</strong> and 183 engaged with <strong>{Feature}</strong> over the past 30 days — solid cross-customer penetration across 484 unique visitors.</li>
                      <li><strong>Deep engagement.</strong> Users spent 10,385 minutes in <strong>{Feature}</strong> this period — averaging ~18 minutes per visitor. This suggests meaningful usage, not casual browsing.</li>
                      <li><strong>Consistent weekly activity.</strong> Weekly visitors held steady at 215-292 users across January. The week of Jan 26 showed the highest event volume (1,237 <strong>{event}</strong> events).</li>
                    </ul>
                  </div>
                  
                  <div class="slack-preview__border-card">
                    <p class="slack-preview__field-label">⚠️ What Needs Attention</p>
                    <ul class="slack-preview__list">
                      <li><strong>Retention is the challenge.</strong> Cohort data shows sharp week-over-week drops: Jan 6-12 cohort went from 61% (week 0) to 26% (week 1). Users try <strong>{Feature}</strong> but don't consistently return.</li>
                      <li><strong>Sentiment split.</strong> 61 positive vs 47 negative feedback items. Top concern: users want <strong>{feature output/content quality}</strong> to keep improving.</li>
                      <li><strong>Internal adoption gap.</strong> 0 of 13 monthly active Pendo employees (0%) using <strong>{Feature}</strong>. Limited dogfooding means friction points go unnoticed.</li>
                      <li><strong>22% landing-to-feature drop-off.</strong> 756 visitors hit <strong>{Page}</strong> but only 590 (78%) made it to <strong>{Feature}</strong>.</li>
                    </ul>
                  </div>
                  
                  <div class="slack-preview__border-card">
                    <p class="slack-preview__field-label">💡 What the Data Suggests</p>
                    <ul class="slack-preview__list">
                      <li><strong>Prioritize retention over acquisition.</strong> The 226% goal masks a retention problem. Focus on onboarding improvements, use-case guides, or re-engagement campaigns.</li>
                      <li><strong>Address output quality feedback.</strong> The top negative theme suggests users want better, more actionable responses. This is the lever for retention.</li>
                      <li><strong>Drive internal usage.</strong> Getting the 13 MAVs to actively use <strong>{Feature}</strong> will surface friction points faster.</li>
                      <li><strong>Investigate the conversion drop-off.</strong> Why do 22% of <strong>{Page}</strong> visitors not start using <strong>{Feature}</strong>? Test messaging or clearer CTAs.</li>
                    </ul>
                  </div>
                  
                  <div class="slack-preview__footer">
                    <button type="button" class="slack-preview__view-button">
                      📊 View dashboard in Pendo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer actions (match Figma selection) -->
    <template #footer-right>
      <template v-if="activeTab === 'schedule'">
        <PendoButton type="primary" label="Next" @click="handleNext" />
      </template>

      <template v-else-if="activeTab === 'dashboard-details'">
        <PendoButton type="secondary" label="Back" @click="handleBack" />
        <PendoButton type="primary" label="Next" @click="handleNext" />
      </template>

      <template v-else-if="activeTab === 'preview'">
        <PendoButton type="secondary" label="Back" @click="handleBack" />
        <PendoButton type="primary" label="Confirm" @click="handleSave" />
      </template>
    </template>
  </PendoDrawer>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import PendoDrawer from './pendo/PendoDrawer.vue'
import { PendoCard, PendoButton, PendoInput, PendoSelect, PendoTag, PendoIcon } from './pendo'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dashboardName: {
    type: String,
    default: 'Custom report templates'
  }
})

const emit = defineEmits(['update:visible', 'close', 'save'])

const activeTab = ref('schedule')

const showChannelDropdown = ref(false)
const isEditMode = ref(false)

const formData = ref({
  subscriptionType: 'Slack',
  name: props.dashboardName,
  frequency: null,
  day: 'Monday',
  time: '9:00 AM',
  timezone: 'Eastern time (ET)',
  channels: [],
  attachments: [],
  aiDescription: `This dashboard monitors Autonomous Insights (Trends)—a feature that uses AI to automatically surface meaningful patterns, anomalies, and insights from your product data.

You're measuring adoption (target: 50% taking Level 1 actions), engagement patterns, retention rates, click-through to card insights, daily active usage, and gathering qualitative feedback. Metrics track whether users are discovering deeper insights or just browsing surface-level trends.`
})

const originalAiDescription = ref(formData.value.aiDescription)


const availableChannels = [
  '#n8n-test',
  '#product-team-updates',
  '#team-insights',
  '#engineering',
  '#design',
  '#analytics',
  '#customer-success'
]

const subscriptionTypes = [
  { value: 'Slack', label: 'Slack', icon: 'slack' },
  { value: 'Teams', label: 'Teams', icon: 'teams' },
  { value: 'Email', label: 'Email' }
]

const frequencies = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' }
]

const days = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }
]

const times = [
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' }
]

const timezones = [
  { value: 'Eastern time (ET)', label: 'Eastern time (ET)' },
  { value: 'Central time (CT)', label: 'Central time (CT)' },
  { value: 'Mountain time (MT)', label: 'Mountain time (MT)' },
  { value: 'Pacific time (PT)', label: 'Pacific time (PT)' }
]

const removeChannel = (index) => {
  formData.value.channels.splice(index, 1)
}

const toggleChannelDropdown = () => {
  showChannelDropdown.value = !showChannelDropdown.value
}

const toggleChannel = (channel) => {
  const index = formData.value.channels.indexOf(channel)
  if (index > -1) {
    formData.value.channels.splice(index, 1)
  } else {
    formData.value.channels.push(channel)
  }
}

const fileInputRef = ref(null)

const removeAttachment = (index) => {
  formData.value.attachments.splice(index, 1)
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file is from Insights attachments folder
  const filePath = file.webkitRelativePath || file.name
  
  // Add file name to attachments if not already present
  if (!formData.value.attachments.includes(file.name)) {
    formData.value.attachments.push(file.name)
    if (typeof pendo !== 'undefined') {
      pendo.track('context_attachment_uploaded', {
        fileName: file.name,
        fileType: file.name.split('.').pop() || '',
        attachmentCount: formData.value.attachments.length,
        sourceComponent: 'SubscribeModal'
      })
    }
  }

  // Reset input to allow selecting the same file again
  event.target.value = ''
}

const getAttachmentIcon = (filename) => {
  const lowerName = filename.toLowerCase()
  
  if (lowerName.includes('.pdf')) {
    return 'file-text'
  } else if (lowerName.includes('.csv')) {
    return 'table'
  } else if (lowerName.includes('.xlsx') || lowerName.includes('.xls')) {
    return 'table'
  } else if (lowerName.includes('.png') || lowerName.includes('.jpg') || lowerName.includes('.jpeg') || lowerName.includes('.svg')) {
    return 'image'
  } else if (lowerName.includes('.docx') || lowerName.includes('.doc') || lowerName.includes('.txt')) {
    return 'file-text'
  }
  
  // Default fallback
  return 'file'
}


const handleNext = () => {
  if (activeTab.value === 'schedule') activeTab.value = 'dashboard-details'
  else if (activeTab.value === 'dashboard-details') activeTab.value = 'preview'
}

const handleBack = () => {
  if (activeTab.value === 'dashboard-details') activeTab.value = 'schedule'
  else if (activeTab.value === 'preview') activeTab.value = 'dashboard-details'
}

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

const undoChanges = () => {
  formData.value.aiDescription = originalAiDescription.value
  isEditMode.value = false
}

const handleSave = async () => {
  if (typeof pendo !== 'undefined') {
    pendo.track('subscription_created_drawer', {
      subscriptionType: formData.value.subscriptionType,
      frequency: formData.value.frequency,
      day: formData.value.day,
      time: formData.value.time,
      timezone: formData.value.timezone,
      channelCount: formData.value.channels.length,
      channels: formData.value.channels.join(', '),
      dashboardName: props.dashboardName,
      attachmentCount: formData.value.attachments.length,
      hasCustomDescription: formData.value.aiDescription !== originalAiDescription.value
    })
  }
  // Send confirmation to Slack via n8n webhook
  try {
    const webhookUrl = 'https://pendoio.app.n8n.cloud/webhook/dashboard-subscribe'
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Tiffany Kitchen',
        dashboardName: props.dashboardName,
        dashboardUrl: `${window.location.origin}/insights/static-url`,
        prototypeUrl: window.location.origin,
        settingsUrl: `${window.location.origin}/settings`,
        // Include subscription details for Slack message
        name: formData.value.name,
        frequency: formData.value.frequency,
        day: formData.value.day,
        time: formData.value.time,
        timezone: formData.value.timezone
      })
    })

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`)
    }

    console.log('✅ Slack confirmation sent successfully')
    
    // Existing save logic
    emit('save', formData.value)
    emit('update:visible', false)
    emit('close')
  } catch (error) {
    console.error('Failed to send Slack confirmation:', error)
    
    // Show alert to user
    alert('Subscription saved, but failed to send Slack confirmation. Please check the console for details.')
    
    // Still close modal and save form data
    emit('save', formData.value)
    emit('update:visible', false)
    emit('close')
  }
}

const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.drawer-channel-wrapper')
  if (!dropdown && showChannelDropdown.value) {
    showChannelDropdown.value = false
  }
}

watch(showChannelDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Replace the actual drawer header container (DOM path user referenced) */
:deep(.pendo-drawer__header) {
  /* Figma selection: top bar height is 92px */
  height: 92px !important;
  min-height: 92px !important;
  align-items: center; /* override PendoDrawer default flex-start */
  padding: 16px 20px 16px 24px !important;
  background: #ffffff;
  border-bottom: 1px solid #dadce5;
}

/* Footer (matches Figma selection: Footer node 11:4700) */
:deep(.pendo-drawer__footer) {
  background: #ffffff;
  border-top: 1px solid #dadce5;
  padding: 16px 20px 16px 24px !important;
  align-items: flex-start; /* Figma: items-start */
  height: 92px !important; /* match masthead height */
  min-height: 92px !important;
}

/* PendoDrawer default wrappers center content; Figma footer is items-start */
:deep(.pendo-drawer__footer-left),
:deep(.pendo-drawer__footer-right) {
  align-items: flex-start;
  height: 100%;
}

/* Figma: primary button min-width 88px */
:deep(.pendo-drawer__footer-right .pendo-button) {
  min-width: 88px;
}

.subscribe-context-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Match selection: card radius 6px */
:deep(.subscribe-context-card.pendo-card) {
  border-radius: 6px;
}

:deep(.subscribe-context-card.pendo-card .pendo-card__header) {
  border-radius: 6px 6px 0 0;
}

/* Two-column layout */
.subscribe-context-card__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
  padding: 32px;
  background: #f8f8f9; /* gray-10 */
}

/* Left column - Info */
.subscribe-context-card__info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subscribe-context-card__title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 22.781px;
  font-weight: 600;
  line-height: 1.3;
  color: #2a2c35;
  margin: 0;
}

.subscribe-context-card__description {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0 0 8px 0;
}

.subscribe-context-card__description:last-of-type {
  margin-bottom: 4px;
}

.subscribe-context-card__benefits {
  margin: 0;
  padding-left: 20px;
  list-style: disc;
}

.subscribe-context-card__benefits li {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2a2c35;
  margin-bottom: 0;
}

/* Right column - Form */
.subscribe-context-card__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
}

.subscribe-context-card__form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subscribe-context-card__label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #2a2c35;
}

.subscribe-context-card__attachments {
  max-width: 600px;
}

.subscribe-context-card__description {
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.subscribe-masthead__left,
.subscribe-masthead__right {
  flex: 1 0 0;
  display: flex;
  align-items: center;
  min-width: 1px;
}

.subscribe-masthead__right {
  justify-content: flex-end;
}

.subscribe-masthead__title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0;
  font-style: normal;
  color: #3a3c45; /* 🌈 palette/gray/90 */
  white-space: nowrap;
}

.subscribe-masthead__center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-shrink: 0;
}

.subscribe-masthead__step {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0;
  font-style: normal;
  color: #2a2c35; /* 🌈 palette/gray/100 */
  text-align: center;
  white-space: nowrap;
}

.subscribe-masthead__step--active {
  font-size: 14.222px; /* 🌈 Paragraph/Base - Semibold */
  font-weight: 600;
  line-height: 1.5;
}

.subscribe-masthead__chevron {
  color: #2a2c35;
  flex-shrink: 0;
}

.subscribe-masthead__close {
  width: 24px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
  color: #2a2c35;
}

.subscribe-masthead__close:hover {
  background-color: #eaecf1; /* gray-30 */
}

.subscribe-drawer__main {
  height: 100%;
  min-width: 0;
  padding: 24px;
  overflow: visible;
}

/* Make card fill modal body */
:deep(.pendo-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.pendo-card__body) {
  flex: 1;
  overflow: visible;
}

/* Drawer form section styles - matching blade patterns */
.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-field-container {
  max-width: 480px;
}

.drawer-field-container :deep(.pendo-input),
.drawer-field-container :deep(.pendo-select) {
  max-width: 480px;
}

.drawer-field-container :deep(.pendo-select__placeholder) {
  color: #2a2c35;
}

.drawer-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.drawer-helper {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
  margin: 0;
}

.drawer-inline-text {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
}

/* Drawer textarea container - matching blade structure */
.drawer-textarea-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  border: 1px solid var(--gray-40);
  border-radius: 6px;
  overflow: hidden;
}

.drawer-textarea-container--edit {
  border-color: #01586a;
}

.drawer-textarea-container--readonly {
  background: var(--gray-20);
}

.drawer-textarea-wrapper {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 9px 4px 0 8px;
}

.drawer-textarea-container--readonly .drawer-textarea-wrapper {
  background: var(--gray-20);
  padding: 9px 10px 9px 8px;
}

.drawer-textarea-content {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100);
  padding: 0 4px 4px 0;
}

.drawer-textarea-content p {
  margin: 0;
}

.drawer-textarea {
  width: 100%;
  min-height: 220px;
  padding: 0 12px 4px 0;
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100);
  background: transparent;
  border: none;
  resize: none;
  outline: none;
}

.drawer-textarea:focus {
  outline: none;
}

/* Drawer tags - matching blade tag patterns */
.drawer-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30);
  border: 1px solid var(--gray-30);
  border-radius: 3px;
  flex-shrink: 0;
}

.drawer-tag__icon {
  flex-shrink: 0;
  color: var(--gray-100);
}

.drawer-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110);
  font-weight: 600;
}

.drawer-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100);
  flex-shrink: 0;
  transition: color 0.2s;
}

.drawer-tag__close:hover {
  color: var(--gray-70);
}

/* Drawer Channel Selector - matching blade */
.drawer-channel-wrapper {
  position: relative;
  width: 100%;
}

.drawer-channel-select {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 4px 12px 4px 8px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.drawer-channel-select:hover {
  border-color: #babcc5;
}

.drawer-channel-select:has(.drawer-channel-tags) {
  padding: 4px 12px 4px 8px;
}

.drawer-channel-select:not(:has(.drawer-channel-tags)) {
  height: 36px;
  padding: 0 12px;
}

.drawer-channel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.drawer-channel-select__placeholder {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
}

.drawer-channel-select__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a6c75;
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.drawer-channel-select__icon--open {
  transform: rotate(180deg);
}

.drawer-channel-dropdown {
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
  z-index: 1001;
}

.drawer-channel-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #2a2c35;
  transition: background-color 0.1s ease;
}

.drawer-channel-dropdown__item:hover {
  background-color: #f5f6f8;
}

.drawer-channel-dropdown__item span {
  flex: 1;
}

/* Drawer attachments row - matching blade */
.drawer-attachments-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px 8px;
  background: white;
  border-top: 1px solid var(--gray-20);
  flex-wrap: wrap;
}

.drawer-attachments-label {
  font-family: 'Inter', sans-serif;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100);
  flex-shrink: 0;
  white-space: nowrap;
}

/* Add Attachment Button Row - matching blade */
.drawer-add-attachment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 8px 8px;
  border-top: 1px solid var(--gray-40);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.drawer-edit-icons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.drawer-edit-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-70);
  transition: color 0.2s;
}

.drawer-edit-icon:hover {
  color: var(--gray-100);
}

/* Slack dropdown styling */
.slack-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 36px;
  padding: 9px 10px 9px 8px;
  background: white;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.slack-dropdown__trigger:hover {
  border-color: #BABCC5; /* gray-50 */
}

.slack-dropdown__content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slack-dropdown__text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}


/* Channel menu dropdown */
.channel-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: white;
  border: 1px solid #DADCE5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  z-index: 1001;
  width: 240px;
  max-height: 164px;
  overflow-y: auto;
}

.channel-menu__option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #2A2C35;
  text-align: left;
  transition: background-color 0.1s ease;
}

.channel-menu__option:hover {
  background-color: #F5F6F8; /* gray-10 */
}

/* Slack Preview Styles */
.slack-preview {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  padding: 0 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.slack-preview__container {
  max-width: 1200px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.slack-preview__message {
  padding: 32px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}


.slack-preview__header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
}

.slack-preview__header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.slack-preview__avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.slack-preview__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slack-preview__meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slack-preview__meta-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.slack-preview__author {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-weight: 900;
  color: #1d1c1d;
  line-height: 1.467;
}

.slack-preview__app-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 3px;
  background: rgba(29, 28, 29, 0.13);
  border-radius: 2px;
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: rgba(29, 28, 29, 0.7);
  line-height: 12px;
}

.slack-preview__time {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #616061;
  line-height: 1.467;
}

.slack-preview__cadence {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 16px;
}

.slack-preview__scheduled-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px;
  height: 16px;
  background: #EBFAFD;
  border: 1px solid #EBFAFD;
  border-radius: 3px;
  flex-shrink: 0;
}

.slack-preview__scheduled-tag span {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.5px;
  color: #01586a;
  white-space: nowrap;
}

.slack-preview__scheduled-tag :deep(.pendo-icon) {
  color: #01586a;
  flex-shrink: 0;
}

.slack-preview__cadence-text {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.11px;
  color: #4a4c55;
  white-space: nowrap;
}

.slack-preview__content {
  margin-left: 44px;
  padding-top: 0;
}

.slack-preview__card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.slack-preview__border-card {
  margin-bottom: 24px;
}

.slack-preview__border-card:last-of-type {
  margin-bottom: 12px;
}

.slack-preview__card-title {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1264a3;
  text-decoration: none;
  line-height: 1.5;
}

.slack-preview__card-title:hover {
  text-decoration: underline;
}

.slack-preview__card-title strong {
  font-weight: 900;
}

.slack-preview__badge {
  display: inline-block;
  padding: 2px 4px;
  background: rgba(248, 117, 120, 0.15);
  border-radius: 4px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  color: #f87578;
  line-height: normal;
}

.slack-preview__card-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.slack-preview__field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.slack-preview__field-label {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 900;
  color: #1d1c1d;
  line-height: 1.5;
  margin: 0 0 8px 0;
}

.slack-preview__field-value {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #374151;
  line-height: 1.5;
  margin: 0;
}

.slack-preview__card-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.slack-preview__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: transparent;
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #1d1c1d;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.slack-preview__action-btn:hover {
  background: #f8f8f8;
}

.slack-preview__list {
  margin: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slack-preview__list li {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1d1c1d;
  margin: 0;
  line-height: 1.5;
}

.slack-preview__list li strong {
  font-weight: 900;
}

.slack-preview__sublist {
  margin: 4px 0 0 0;
  padding-left: 0;
  list-style: none;
}

.slack-preview__sublist li {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1d1c1d;
  margin-bottom: 2px;
  line-height: 1.5;
}

.slack-preview__footer {
  margin-top: 0;
  padding-top: 12px;
  border-top: 1px solid var(--gray-40);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slack-preview__view-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background: #006632;
  border: none;
  border-radius: 4px;
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
  width: fit-content;
}

.slack-preview__view-button:hover {
  background: #005027;
}

.slack-preview__footer p {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1d1c1d;
  margin: 0;
  line-height: 1.5;
}
</style>
