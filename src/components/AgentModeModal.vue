<template>
  <transition name="slide-in">
    <div v-if="isOpen" class="agent-modal" @mousedown="startDrag" :style="{ top: modalPosition.top + 'px', right: modalPosition.right + 'px' }">
      <!-- Draggable Header -->
      <div class="agent-modal__header">
        <div class="agent-modal__drag-handle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
            <circle cx="3" cy="3" r="1.5" fill="#9A9CA5"/>
            <circle cx="8" cy="3" r="1.5" fill="#9A9CA5"/>
            <circle cx="13" cy="3" r="1.5" fill="#9A9CA5"/>
            <circle cx="3" cy="9" r="1.5" fill="#9A9CA5"/>
            <circle cx="8" cy="9" r="1.5" fill="#9A9CA5"/>
            <circle cx="13" cy="9" r="1.5" fill="#9A9CA5"/>
          </svg>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="agent-modal__title-bar">
        <h2 class="agent-modal__title">{{ title }}</h2>
        <div class="agent-modal__actions">
          <button class="agent-modal__new-btn" @click="startNewConversation">
            <span>New</span>
            <div class="agent-modal__new-btn-split">
              <div class="agent-modal__new-btn-divider"></div>
              <PendoIcon type="chevron-down" :size="16" />
            </div>
          </button>
          <button class="agent-modal__icon-btn" @click="togglePin" :class="{ 'agent-modal__icon-btn--active': isPinned }">
            <PendoIcon type="pin" :size="16" />
          </button>
          <button class="agent-modal__icon-btn" @click="toggleMaximize">
            <PendoIcon type="maximize" :size="16" />
          </button>
          <button class="agent-modal__icon-btn agent-modal__icon-btn--close" @click="close">
            <PendoIcon type="x" :size="16" />
          </button>
        </div>
      </div>

      <!-- Conversation Area -->
      <div class="agent-modal__conversation" ref="conversationRef">
        <!-- Welcome Message (shown when no messages) -->
        <div v-if="messages.length === 0" class="agent-modal__welcome">
          <p class="agent-modal__welcome-text">Welcome back, Darshana!</p>
        </div>
        
        <div v-for="(message, index) in messages" :key="index" class="agent-modal__message-group">
          <div v-if="message.timestamp" class="agent-modal__timestamp" :class="{ 'agent-modal__timestamp--left': message.type === 'agent' }">
            {{ message.timestamp }}
          </div>
          
          <div v-if="message.type === 'user'" class="agent-modal__message agent-modal__message--user">
            {{ message.content }}
          </div>
          
          <div v-if="message.type === 'agent' && message.isLoading" class="agent-modal__message agent-modal__message--agent agent-modal__message--loading">
            <div class="agent-modal__loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <div v-else-if="message.type === 'agent'" class="agent-modal__message agent-modal__message--agent">
            <div v-if="message.reasoning" class="agent-modal__reasoning">
              <PendoIcon type="sparkle" :size="14" />
              <span>Reasoning</span>
              <PendoIcon type="chevron-right" :size="14" />
            </div>
            <div class="agent-modal__message-content">
              <AccountRetentionResponse
                v-if="message.renderComponent === 'accountRetention'"
                class="agent-modal__message-text"
              />
              <div v-else class="agent-modal__message-text" v-html="message.content"></div>
              <div v-if="message.actionsLabel || (message.actions && message.actions.length > 0)" class="agent-modal__message-actions">
                <p v-if="message.actionsLabel" class="agent-modal__message-actions-label">{{ message.actionsLabel }}</p>
                <ol v-if="message.actions && message.actions.length > 0" class="agent-modal__message-actions-list">
                  <li 
                    v-for="(action, actionIndex) in message.actions" 
                    :key="actionIndex"
                    class="agent-modal__action-item"
                    @click="handleSuggestedAction(action)"
                  >
                    {{ action.label }}
                  </li>
                </ol>
              </div>
            </div>
            <div class="agent-modal__message-toolbar">
              <button class="agent-modal__message-action" title="Copy">
                <PendoIcon type="copy" :size="16" />
              </button>
              <button class="agent-modal__message-action" title="Refresh" @click="handleRetry(message)">
                <PendoIcon type="refresh-cw" :size="16" />
              </button>
              <button class="agent-modal__message-action" title="Thumbs up" @click="handleThumbsUp(message)">
                <PendoIcon type="thumbs-up" :size="16" />
              </button>
              <button class="agent-modal__message-action" title="Thumbs down" @click="handleThumbsDown(message)">
                <PendoIcon type="thumbs-down" :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="agent-modal__input-container">
        <div class="agent-modal__input-wrapper">
          <textarea
            v-model="inputMessage"
            class="agent-modal__input"
            placeholder="Ask another question (enter @ to reference a Pendo item)"
            rows="1"
            @keydown.enter.exact.prevent="sendMessage"
            @input="adjustTextareaHeight"
            ref="inputRef"
          ></textarea>
          <div class="agent-modal__input-actions">
            <button class="agent-modal__input-btn">
              <span>Insert (@)</span>
            </button>
            <button class="agent-modal__input-btn agent-modal__input-btn--icon" aria-label="Options">
              <PendoIcon type="sliders" :size="16" />
            </button>
            <button class="agent-modal__send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
              <PendoIcon type="arrow-right" :size="16" />
            </button>
          </div>
        </div>
        <p class="agent-modal__disclaimer">
          Generative AI features may produce inaccurate or incomplete content. You are responsible for reviewing and verifying all AI-generated output before use.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import PendoIcon from './pendo/PendoIconLucide.vue'
import AccountRetentionResponse from './agent/AccountRetentionResponse.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Acme finance account health sum...'
  },
  initialContext: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'update:isOpen'])

const messages = ref([])
const conversationId = ref(crypto.randomUUID())

const inputMessage = ref('')
const isPinned = ref(false)
const conversationRef = ref(null)
const inputRef = ref(null)
const defaultPosition = { top: 80, right: 24 }
const modalPosition = ref({ ...defaultPosition })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const snapThreshold = 20 // pixels within default position to snap

const close = () => {
  emit('close')
  emit('update:isOpen', false)
  // Reset position on close
  modalPosition.value = { ...defaultPosition }
}

const startNewConversation = () => {
  messages.value = []
  inputMessage.value = ''
  conversationId.value = crypto.randomUUID()
}

const togglePin = () => {
  isPinned.value = !isPinned.value
}

const toggleMaximize = () => {
  // Toggle maximize functionality
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const messageId = crypto.randomUUID()
  const content = inputMessage.value
  
  messages.value.push({
    type: 'user',
    content,
    messageId,
    timestamp: new Date().toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    })
  })
  
  if (window.pendo) {
    window.pendo.trackAgent("prompt", {
      agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
      conversationId: conversationId.value,
      messageId,
      content,
      suggestedPrompt: false
    })
  }
  
  inputMessage.value = ''
  
  // Scroll to bottom
  nextTick(() => {
    if (conversationRef.value) {
      conversationRef.value.scrollTop = conversationRef.value.scrollHeight
    }
  })
}

const adjustTextareaHeight = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

const startDrag = (event) => {
  if (event.target.closest('.agent-modal__header')) {
    isDragging.value = true
    dragStart.value = {
      x: event.clientX,
      y: event.clientY
    }
    
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
}

const onDrag = (event) => {
  if (!isDragging.value) return
  
  const deltaX = event.clientX - dragStart.value.x
  const deltaY = event.clientY - dragStart.value.y
  
  modalPosition.value = {
    top: modalPosition.value.top + deltaY,
    right: modalPosition.value.right - deltaX
  }
  
  dragStart.value = {
    x: event.clientX,
    y: event.clientY
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  
  // Snap to default position if within threshold
  const topDiff = Math.abs(modalPosition.value.top - defaultPosition.top)
  const rightDiff = Math.abs(modalPosition.value.right - defaultPosition.right)
  
  if (topDiff <= snapThreshold && rightDiff <= snapThreshold) {
    modalPosition.value = { ...defaultPosition }
    return
  }
  
  // Snap to top edge if within threshold
  if (modalPosition.value.top <= snapThreshold) {
    modalPosition.value.top = defaultPosition.top
  }
  
  // Snap to right edge if within threshold
  if (modalPosition.value.right <= snapThreshold) {
    modalPosition.value.right = defaultPosition.right
  }
}

// Initialize with context if provided
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.initialContext) {
    conversationId.value = crypto.randomUUID()
    const timestamp = new Date().toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    })
    
    // Check if this is a general landing screen or insight-specific
    const isLandingScreen = props.initialContext === 'How can I help you today?'
    
    if (isLandingScreen) {
      // Landing screen - no initial messages, just empty state
      messages.value = []
    } else {
      // Insight-specific - show only AI response, no user message
      messages.value = [
        {
          type: 'agent',
          content: '',
          timestamp: timestamp,
          isLoading: true,
          reasoning: false
        }
      ]
      
      // Simulate AI response after a delay
      setTimeout(() => {
        // Generate contextual response based on the insight
        const response = generateInsightResponse(props.initialContext, props.title)
        const responseMessageId = crypto.randomUUID()
        
        messages.value[0] = {
          type: 'agent',
          content: response.content || '',
          messageId: responseMessageId,
          timestamp: timestamp,
          isLoading: false,
          reasoning: false,
          renderComponent: response.renderComponent,
          actionsLabel: response.actionsLabel,
          actions: response.actions
        }
        
        if (window.pendo) {
          window.pendo.trackAgent("agent_response", {
            agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
            conversationId: conversationId.value,
            messageId: responseMessageId,
            content: response.content || ''
          })
        }
      }, 1500)
    }
  }
}, { immediate: true })

// Generate contextual response based on insight
const generateInsightResponse = (insight, title) => {
  // V3 Grouped Cards - check title patterns
  if (title.toLowerCase().includes('retention by application')) {
    return {
      content: `<p>Looking at <strong>retention by application</strong>, AcmeFinance is outperforming with 11% growth while AcmeHealth shows a 4% decline. This suggests <strong>different user experiences across applications</strong>.</p><p>I recommend investigating what's working in AcmeFinance and identifying friction points in AcmeHealth to replicate success patterns.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Compare feature usage patterns between AcmeFinance and AcmeHealth users.', action: 'compare-apps' },
        { label: 'Create segments for high-retention vs declining accounts.', action: 'create-segments' },
        { label: 'Analyze user feedback specific to each application.', action: 'analyze-feedback' }
      ]
    }
  } else if (title.toLowerCase().includes('adoption by feature')) {
    return {
      content: `<p>The <strong>Analytics Tab is your fastest-growing feature</strong> with 15% growth, outpacing the New Dashboard at 8%. This indicates strong demand for data analysis capabilities.</p><p>Consider creating dedicated guides and promoting Analytics Tab more prominently to capitalize on this momentum.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Create an onboarding guide specifically for Analytics Tab.', action: 'create-guide' },
        { label: 'Analyze which user segments are driving Analytics Tab adoption.', action: 'analyze-segments' },
        { label: 'Set up a dashboard to track feature adoption trends.', action: 'create-dashboard' }
      ]
    }
  } else if (title.toLowerCase().includes('engagement by segment')) {
    return {
      content: `<p><strong>Enterprise users are your power users</strong> with 12.3K daily active users (+15%), significantly outpacing Pro tier at 8.1K (+9%). This concentration of engagement in Enterprise suggests they're finding the most value.</p><p>Focus product development on features that serve Enterprise needs to maintain this strong engagement.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Interview Enterprise users to understand their key workflows.', action: 'conduct-interviews' },
        { label: 'Analyze which features Enterprise users engage with most.', action: 'analyze-features' },
        { label: 'Create a retention strategy specific to Enterprise tier.', action: 'create-strategy' }
      ]
    }
  } else if (title.toLowerCase().includes('conversion by funnel')) {
    return {
      content: `<p>Your <strong>trial experience is highly effective</strong> with 32% trial-to-paid conversion (+8%), but free-to-trial conversion lags at 18% (+4%). The bottleneck is getting users into trial.</p><p>Focus on driving more free users into trial to maximize your strong trial-to-paid conversion rate.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Analyze barriers preventing free users from starting trials.', action: 'analyze-barriers' },
        { label: 'A/B test different trial signup flows to increase conversion.', action: 'ab-test' },
        { label: 'Create targeted campaigns to drive free-to-trial conversion.', action: 'create-campaigns' }
      ]
    }
  } else if (title.toLowerCase().includes('session duration by device')) {
    return {
      content: `<p><strong>Mobile experience needs attention</strong>—casual users on mobile dropped 10% to 5-minute sessions while desktop power users maintain 12 minutes. This suggests friction points specific to the mobile experience.</p><p>Investigate mobile UX issues to improve engagement on smaller screens.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Conduct mobile usability testing to identify friction points.', action: 'usability-test' },
        { label: 'Analyze which mobile features have the highest drop-off rates.', action: 'analyze-dropoff' },
        { label: 'Review mobile session recordings to understand user behavior.', action: 'review-recordings' }
      ]
    }
  } else if (title.toLowerCase().includes('agent usage by feature')) {
    return {
      content: `<p><strong>AcmeAgent shows balanced growth</strong> with conversations up 10% and prompts up 5%. Users are engaging more frequently, indicating growing comfort with AI capabilities.</p><p>Consider adding advanced prompt templates to accelerate usage and help users get more value from the agent.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Analyze most successful prompt patterns to create templates.', action: 'analyze-prompts' },
        { label: 'Create a guide showcasing advanced agent capabilities.', action: 'create-guide' },
        { label: 'Track which features users access through the agent most.', action: 'track-features' }
      ]
    }
  } else if (title.toLowerCase().includes('account retention')) {
    return {
      renderComponent: 'accountRetention'
    }
  } else if (title.toLowerCase().includes('agent retention')) {
    return {
      content: `<p>This <strong>${title.toLowerCase()}</strong> insight shows users engaging with the Code Generation feature have <strong>3x higher retention rates</strong>. This is a clear indicator of a high-value feature that drives stickiness.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Promote Code Generation feature in onboarding to accelerate adoption.', action: 'update-onboarding' },
        { label: 'Create a cohort to track new users adopting Code Generation.', action: 'create-cohort' },
        { label: 'Analyze what makes Code Generation users more engaged.', action: 'analyze-users' }
      ]
    }
  } else if (title.toLowerCase().includes('feature adoption')) {
    return {
      content: `<p>The <strong>Analytics tab is your fastest-growing feature</strong> with 45% adoption growth among data teams. This indicates strong demand for analytics capabilities in this user segment.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Create a dedicated guide for Analytics tab to capture broader interest.', action: 'create-guide' },
        { label: 'Analyze which data team workflows drive the highest engagement.', action: 'analyze-workflows' },
        { label: 'Expand Analytics tab features based on user feedback.', action: 'expand-features' }
      ]
    }
  } else if (title.toLowerCase().includes('user engagement')) {
    return {
      content: `<p>Users who complete the <strong>interactive tutorial in their first session are 4x more likely</strong> to become daily active users. This is a critical conversion point in your onboarding flow.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Prioritize the interactive tutorial in the onboarding experience.', action: 'update-onboarding' },
        { label: 'Analyze completion rates and identify drop-off points in the tutorial.', action: 'analyze-completion' },
        { label: 'A/B test different tutorial formats to improve completion.', action: 'ab-test' }
      ]
    }
  } else if (title.toLowerCase().includes('session duration')) {
    return {
      content: `<p>The <strong>Settings page accounts for 40% of session time drops</strong>. Users are abandoning after 2-3 clicks, suggesting significant friction in navigation and form complexity.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Conduct usability testing on the Settings page to identify pain points.', action: 'usability-test' },
        { label: 'Review session recordings to understand where users get stuck.', action: 'review-recordings' },
        { label: 'Simplify Settings navigation and reduce form complexity.', action: 'simplify-settings' }
      ]
    }
  } else if (title.toLowerCase().includes('conversion rate')) {
    return {
      content: `<p>Users who activate the <strong>Collaboration feature during trial convert at 38%</strong> vs. 18% baseline. This feature is a strong conversion driver and should be highlighted earlier in the trial experience.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Highlight Collaboration feature earlier in the trial onboarding.', action: 'update-onboarding' },
        { label: 'Create guides that showcase team collaboration use cases.', action: 'create-guides' },
        { label: 'Analyze which collaboration features drive the highest conversion.', action: 'analyze-features' }
      ]
    }
  } else {
    return {
      content: `<p>Based on this <strong>${title.toLowerCase()}</strong> insight: ${insight.split('.')[0]}.</p><p>This highlights important trends in your data.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Analyze the underlying data to understand key drivers.', action: 'analyze-data' },
        { label: 'Create a dashboard to monitor this metric over time.', action: 'create-dashboard' },
        { label: 'Set up alerts for significant changes in this metric.', action: 'set-alerts' }
      ]
    }
  }
}

const handleSuggestedAction = (action) => {
  // Handle suggested action clicks
  console.log('Action clicked:', action)
  
  if (window.pendo) {
    window.pendo.trackAgent("prompt", {
      agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
      conversationId: conversationId.value,
      messageId: crypto.randomUUID(),
      content: action.label,
      suggestedPrompt: true
    })
  }
}

const handleRetry = (message) => {
  if (window.pendo) {
    window.pendo.trackAgent("user_reaction", {
      agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
      conversationId: conversationId.value,
      messageId: message.messageId,
      content: "retry"
    })
  }
}

const handleThumbsUp = (message) => {
  if (window.pendo) {
    window.pendo.trackAgent("user_reaction", {
      agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
      conversationId: conversationId.value,
      messageId: message.messageId,
      content: "positive"
    })
  }
}

const handleThumbsDown = (message) => {
  if (window.pendo) {
    window.pendo.trackAgent("user_reaction", {
      agentId: "_3TEU5SdvhA2l5qeuAgZpYbqG4s",
      conversationId: conversationId.value,
      messageId: message.messageId,
      content: "negative"
    })
  }
}
</script>

<style scoped>
.agent-modal {
  position: fixed;
  top: 80px;
  right: 24px;
  display: flex;
  flex-direction: column;
  width: min(471px, calc(100vw - 32px));
  height: min(760px, calc(100vh - 112px));
  background-color: var(--gray-0, #FFFFFF);
  border-radius: 6px;
  box-shadow: 0px 2px 20px 0px rgba(1, 100, 121, 0.1);
  overflow: hidden;
  z-index: 900;
  border: none;
}

@media (max-width: 639px) {
  .agent-modal {
    top: 64px;
    right: 16px;
    left: 16px;
    width: auto;
    height: min(760px, calc(100vh - 96px));
  }
}

/* Slide-in animation */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-in-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Header */
.agent-modal__header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: var(--gray-30, #EAECF1);
  border-radius: 6px 6px 0 0;
  cursor: move;
}

.agent-modal__drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Title Bar */
.agent-modal__title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 8px 16px;
  background-color: var(--gray-0, #FFFFFF);
}

.agent-modal__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.agent-modal__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agent-modal__new-btn {
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: 0;
  background-color: var(--gray-10, #F8F8F9);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  height: 26px;
  overflow: hidden;
}

.agent-modal__new-btn span {
  padding: 0 12px;
  background-color: var(--teal-70, #128297);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px 0 0 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-0, #FFFFFF);
}

.agent-modal__new-btn-split {
  background-color: var(--teal-70, #128297);
  height: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 4px;
  border-radius: 0 6px 6px 0;
}

.agent-modal__new-btn-divider {
  width: 1px;
  height: 100%;
  background-color: var(--teal-80, #016479);
}

.agent-modal__new-btn :deep(.pendo-icon) {
  width: 16px;
  height: 16px;
  color: var(--gray-0, #FFFFFF);
}

.agent-modal__new-btn:hover {
  background-color: var(--teal-80, #016479);
}

.agent-modal__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  background-color: var(--gray-10, #F8F8F9);
  border: none;
  border-radius: 4px;
  color: var(--gray-90, #3A3C45);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.agent-modal__icon-btn:hover {
  background-color: var(--gray-20, #F4F4F7);
}

.agent-modal__icon-btn--active {
  background-color: var(--gray-30, #EAECF1);
}

.agent-modal__icon-btn--close:hover {
  background-color: var(--red-10, #FFF5F5);
  color: var(--red-80, #BD0000);
}

/* Conversation Area */
.agent-modal__conversation {
  flex: 1;
  overflow-y: auto;
  padding: 32px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.agent-modal__message-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
}

.agent-modal__timestamp {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
  text-align: right;
  margin: 0;
  padding-right: 11px;
}

.agent-modal__timestamp--left {
  text-align: left;
  padding-right: 0;
  padding-left: 11px;
}

.agent-modal__message {
  padding: 12px 16px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
}

.agent-modal__welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 32px;
}

.agent-modal__welcome-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 22.781px;
  line-height: 1.3;
  letter-spacing: 0;
  color: var(--gray-100, #2A2C35);
  text-align: center;
  margin: 0;
}

.agent-modal__message--user {
  background-color: var(--gray-10, #F8F8F9);
  color: var(--gray-100, #2A2C35);
  align-self: flex-end;
  max-width: 80%;
  white-space: pre-line;
}

.agent-modal__message--agent {
  background-color: var(--gray-0, #FFFFFF);
  border: none;
  color: var(--gray-100, #2A2C35);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 16px 12px 16px;
}

.agent-modal__message--loading {
  padding: 16px;
}

.agent-modal__loading-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.agent-modal__loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--gray-60, #9A9CA5);
  animation: loading-bounce 1.4s infinite ease-in-out both;
}

.agent-modal__loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.agent-modal__loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.agent-modal__reasoning {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background-color: var(--gray-10, #F8F8F9);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.5;
  color: #FF4876;
  cursor: pointer;
  align-self: flex-start;
}

.agent-modal__message-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.agent-modal__message-text {
  margin: 0;
  white-space: pre-line;
  width: 100%;
}

.agent-modal__message-text p {
  margin: 0;
}

.agent-modal__message-text strong {
  font-weight: 600;
}

/* Agent Response Structured Layout */
.agent-response {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.agent-response__main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
  height: 48px;
}

.agent-response__insight-summary {
  background-color: var(--gray-10, #F8F8F9);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-response__insight-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.agent-response__insight-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0 0 6px 0;
}

.agent-response__insight-text:last-child {
  margin-bottom: 0;
}

.agent-response__insight-text strong {
  font-weight: 600;
}

.agent-response__table {
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 6px;
  overflow: hidden;
}

.agent-response__table-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background-color: var(--gray-0, #FFFFFF);
  border-bottom: 1px solid var(--gray-30, #EAECF1);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
}

.agent-response__table-icon {
  font-size: 16px;
}

.agent-response__table-grid {
  display: flex;
  flex-direction: column;
}

.agent-response__table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--gray-30, #EAECF1);
}

.agent-response__table-row--header {
  background-color: var(--gray-10, #F8F8F9);
}

.agent-response__table-row--header .agent-response__table-cell {
  font-weight: 600;
}

.agent-response__table-row--last {
  border-bottom: none;
}

.agent-response__table-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  background-color: var(--gray-0, #FFFFFF);
}

.agent-response__event-icon {
  font-size: 16px;
  color: var(--gray-100, #2A2C35);
}

.agent-response__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-response__section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.agent-response__section-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-response__pattern-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0 0 6px 0;
}

.agent-response__list {
  margin: 0 0 12px 0;
  padding-left: 20px;
  list-style-type: disc;
}

.agent-response__list:last-child {
  margin-bottom: 0;
}

.agent-response__list li {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin-bottom: 0;
}

.agent-response__list li strong {
  font-weight: 600;
}

.agent-response__account {
  margin-bottom: 12px;
}

.agent-response__account:last-child {
  margin-bottom: 0;
}

.agent-response__account-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0 0 4px 0;
}

.agent-response__account-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.agent-modal__message-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-modal__message-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 0;
  margin-top: 16px;
  align-self: flex-start;
}

.agent-modal__message-actions-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.agent-modal__message-actions-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: decimal;
}

.agent-modal__action-item {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--teal-70, #1A7F93);
  margin-bottom: 12px;
  cursor: pointer;
}

.agent-modal__action-item:last-child {
  margin-bottom: 0;
}

.agent-modal__action-item:hover {
  color: var(--teal-80, #016479);
}

.agent-modal__message-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 6px;
  background: transparent;
  border: none;
  border-radius: 3px;
  color: var(--gray-70, #6A6C75);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.agent-modal__message-action:hover {
  background-color: var(--gray-10, #F8F8F9);
}

/* Input Area */
.agent-modal__input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--gray-20, #F4F4F7);
}

.agent-modal__input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: var(--gray-0, #FFFFFF);
  border: 1px solid var(--gray-40, #DADCE5);
  border-radius: 3px;
}

.agent-modal__input {
  width: 100%;
  min-height: 24px;
  max-height: 120px;
  padding: 0;
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  resize: none;
  outline: none;
}

.agent-modal__input::placeholder {
  color: var(--gray-50, #BABCC5);
}

.agent-modal__input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agent-modal__input-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: var(--gray-10, #F8F8F9);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-90, #3A3C45);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.agent-modal__input-btn--icon {
  width: 32px;
  height: 32px;
  padding: 0;
  gap: 0;
  justify-content: center;
}

.agent-modal__input-btn:hover {
  background-color: var(--gray-20, #F4F4F7);
}

.agent-modal__send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  background-color: var(--teal-70, #128297);
  border: none;
  border-radius: 3px;
  color: var(--gray-0, #FFFFFF);
  cursor: pointer;
  transition: background-color 0.15s ease;
  margin-left: auto;
}

.agent-modal__send-btn:hover:not(:disabled) {
  background-color: var(--teal-80, #016479);
}

.agent-modal__send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.agent-modal__disclaimer {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.5;
  color: var(--gray-60, #9A9CA5);
  margin: 0;
}
</style>
