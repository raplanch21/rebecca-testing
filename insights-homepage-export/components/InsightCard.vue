<template>
  <div class="insight-card">
    <!-- Card Header -->
    <div class="insight-card__header">
      <h3 class="insight-card__title">{{ title }}</h3>
      <div class="insight-card__menu-wrapper">
        <button 
          class="insight-card__menu-btn" 
          type="button" 
          aria-label="More options"
          @click="isMenuOpen = !isMenuOpen"
        >
          <PendoIcon type="more-vertical" :size="16" />
        </button>
        
        <!-- Dropdown Menu -->
        <div v-if="isMenuOpen && showMenu" class="insight-card__menu-dropdown">
          <button class="insight-card__menu-item" @click="handleMenuAction('agent-mode')">
            <PendoIcon type="sparkle" :size="16" />
            <span>Ask in Agent mode</span>
          </button>
          <button class="insight-card__menu-item" @click="handleMenuAction('switch-segments')">
            <PendoIcon type="users" :size="16" />
            <span>Switch segments</span>
          </button>
          <button class="insight-card__menu-item" @click="handleMenuAction('archive')">
            <PendoIcon type="archive" :size="16" />
            <span>Archive</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Card Content -->
    <div class="insight-card__content" :class="{ 'insight-card__content--rounded': showMenu }">
      <!-- Primary Metric Section -->
      <div class="insight-card__primary">
        <!-- Main Metric -->
        <div class="insight-card__metric-section">
          <div class="insight-card__metrics">
            <div class="insight-card__metric-col">
              <div class="insight-card__metric-label">{{ primaryLabel }}</div>
              <div class="insight-card__metric-row">
                <span class="insight-card__metric-value">{{ primaryValue }}</span>
                <PendoTrendTag :value="primaryTrend" />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="insight-card__description">
            <p class="insight-card__description-text">
              <slot name="description">
                {{ description }}
              </slot>
            </p>
            <span class="insight-card__description-range">{{ range }}</span>
          </div>
        </div>
      </div>

      <!-- Secondary Metrics Section (hidden in v2 variant) -->
      <div v-if="!hideSummaryPreview" class="insight-card__secondary">
        <div 
          v-for="(metric, index) in secondaryMetrics" 
          :key="index"
          class="insight-card__secondary-metric"
        >
          <div class="insight-card__secondary-label">{{ metric.label }}</div>
          <div class="insight-card__secondary-row">
            <span class="insight-card__secondary-value">{{ metric.value }}</span>
            <PendoTrendTag :value="metric.trend" />
          </div>
        </div>
      </div>
    </div>

    <!-- Simple Footer Button (for simple-cta variant) - outside container for full width -->
    <button v-if="ctaVariant === 'simple-cta' && !showMenu" class="insight-card__simple-cta-btn" @click="openAgentMode">
      <PendoIcon type="sparkle" :size="16" />
      <span>Follow up in Agent mode</span>
      <PendoIcon type="arrow-right" :size="16" class="insight-card__simple-cta-arrow" />
    </button>

    <!-- Card Footer with Expandable Summary (hide for menu variant) -->
    <div v-if="!showMenu && ctaVariant !== 'simple-cta'" class="insight-card__footer-container">
      <div class="insight-card__footer">
        <!-- Button Row -->
        <button class="insight-card__expand-btn" @click="toggleExpanded">
          <span class="insight-card__label">Insight summary</span>
          <PendoIcon :type="isExpanded ? 'chevron-up' : 'chevron-down'" :size="16" />
        </button>
        
        <!-- Summary Text (collapsed state - only show if not hiding preview) -->
        <div v-if="!isExpanded && !hideSummaryPreview" class="insight-card__summary-container">
          <p class="insight-card__summary" v-html="formattedSummary"></p>
          
          <!-- Smart Suggestion Badge (only in collapsed state) -->
          <span 
            v-if="ctaVariant === 'badge'" 
            class="insight-card__badge"
            @click="$emit('follow-up')"
          >
            <span class="insight-card__badge-dot">•</span>
            <span class="insight-card__badge-text">Agent mode available</span>
          </span>
        </div>
        
        <!-- Summary Text (expanded state - always show when expanded) -->
        <div v-if="isExpanded" class="insight-card__expanded-content">
          <p class="insight-card__summary-text" v-html="formattedSummary"></p>
          
          <!-- Agent mode Button (bottom right) -->
          <button 
            v-if="ctaVariant === 'floating-chip'" 
            class="insight-card__agent-btn"
            @click="openAgentMode"
          >
            <PendoIcon type="sparkle" :size="16" class="insight-card__agent-btn-icon" />
            <span>Ask in Agent mode</span>
          </button>
          
          <!-- Default Button CTA -->
          <button v-if="ctaVariant === 'button'" class="insight-card__cta-btn" @click="$emit('follow-up')">
            <PendoIcon type="sparkle" :size="16" />
            <span>Follow up in Agent mode</span>
            <PendoIcon type="arrow-right" :size="16" class="insight-card__cta-arrow" />
          </button>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PendoIcon from './pendo/PendoIcon.vue'
import PendoTrendTag from './pendo/PendoTrendTag.vue'

const isExpanded = ref(false)
const isChipHovered = ref(false)
const isMenuOpen = ref(false)

const emit = defineEmits(['open-agent-mode'])

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const openAgentMode = () => {
  // Emit event to open global Agent mode
  emit('open-agent-mode', { title: props.title, context: props.summary })
  // Auto-collapse the summary when opening Agent mode
  isExpanded.value = false
  // Close menu if open
  isMenuOpen.value = false
}

const handleMenuAction = (action) => {
  isMenuOpen.value = false
  
  if (action === 'agent-mode') {
    openAgentMode()
  } else if (action === 'switch-segments') {
    // Handle switch segments
    console.log('Switch segments clicked')
  } else if (action === 'archive') {
    // Handle archive
    console.log('Archive clicked')
  }
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  const menu = event.target.closest('.insight-card__menu-wrapper')
  if (!menu && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const props = defineProps({
  /** Card title */
  title: {
    type: String,
    required: true
  },
  /** Primary metric label */
  primaryLabel: {
    type: String,
    default: 'Overall retention'
  },
  /** Primary metric value */
  primaryValue: {
    type: String,
    required: true
  },
  /** Primary trend percentage */
  primaryTrend: {
    type: Number,
    required: true
  },
  /** Description text */
  description: {
    type: String,
    default: ''
  },
  /** Range text (e.g., "(54% → 60%)") */
  range: {
    type: String,
    default: ''
  },
  /** Secondary metrics array */
  secondaryMetrics: {
    type: Array,
    default: () => []
  },
  /** Summary text for footer */
  summary: {
    type: String,
    default: ''
  },
  /** CTA style variant: 'button', 'floating-chip', 'badge', 'simple-cta' */
  ctaVariant: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'floating-chip', 'badge', 'simple-cta'].includes(value)
  },
  /** Hide summary preview in collapsed state */
  hideSummaryPreview: {
    type: Boolean,
    default: false
  },
  /** Show menu dropdown in header */
  showMenu: {
    type: Boolean,
    default: false
  }
})

// Convert markdown to HTML
const formattedSummary = computed(() => {
  if (!props.summary) return ''
  
  // Convert *text* to <strong>text</strong> for bold
  // Split paragraphs and wrap in spans with margin
  const paragraphs = props.summary.split(/\n\n/)
  return paragraphs
    .map((p, i) => {
      const formatted = p.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
      return i < paragraphs.length - 1 
        ? `<span style="display: block; margin-bottom: 8px;">${formatted}</span>`
        : formatted
    })
    .join('')
})
</script>

<style scoped>
.insight-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 554px;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 81, 100, 0.1);
  background: linear-gradient(149.33deg, rgba(46, 151, 170, 0.05) 1.27%, rgba(18, 60, 68, 0.05) 100.03%);
  overflow: visible;
}

/* Header */
.insight-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 24px;
  border-radius: 8px 8px 0 0;
}

.insight-card__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.insight-card__menu-wrapper {
  position: relative;
}

.insight-card__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 10px 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--gray-100, #2A2C35);
  transition: background-color 0.15s ease;
}

.insight-card__menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.insight-card__menu-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  background-color: var(--gray-0, #FFFFFF);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 8px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  padding: 4px;
  z-index: 100;
}

.insight-card__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  cursor: pointer;
  transition: background-color 0.15s ease;
  text-align: left;
}

.insight-card__menu-item:hover {
  background-color: var(--gray-10, #F8F8F9);
}

/* Content */
.insight-card__content {
  display: flex;
  flex: 1;
  background-color: var(--gray-0, #FFFFFF);
  border-radius: 8px 8px 0 0;
  align-items: stretch;
  min-height: 195px;
  height: auto;
}

.insight-card__content--rounded {
  border-radius: 8px;
}

/* Primary Section */
.insight-card__primary {
  flex: 1;
  min-width: 0;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

.insight-card__metric-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.insight-card__metrics {
  display: flex;
  gap: 12px;
}

.insight-card__metric-col {
  display: flex;
  flex-direction: column;
}

.insight-card__metric-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
}

.insight-card__metric-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.insight-card__metric-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--gray-110, #1A1C25);
}

/* Description */
.insight-card__description {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.insight-card__description-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.insight-card__description-range {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
}

/* Secondary Section */
.insight-card__secondary {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 20px 32px;
  background-color: var(--gray-0, #FFFFFF);
  border-left: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 0 8px 0 0;
  height: 100%;
  justify-content: space-between;
}

.insight-card__secondary-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.insight-card__secondary-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  white-space: nowrap;
}

.insight-card__secondary-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.insight-card__secondary-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.2;
  color: var(--gray-110, #1A1C25);
}

/* Footer Container */
.insight-card__footer-container {
  background-color: var(--gray-0, #FFFFFF);
  padding: 0 32px;
  border-radius: 0 0 8px 8px;
}

/* Footer */
.insight-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 0 0 3px 3px;
}

.insight-card__expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--teal-90, #01586a);
  transition: opacity 0.15s ease;
}

.insight-card__expand-btn:hover {
  opacity: 0.8;
}

.insight-card__expand-btn:focus-visible {
  outline: 2px solid var(--teal-90, #01586a);
  outline-offset: 2px;
  border-radius: 6px;
}

.insight-card__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--teal-90, #01586a);
}

.insight-card__summary-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;
}

.insight-card__expanded-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.insight-card__summary {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  background: linear-gradient(to bottom, #6A6C75 0%, #DADCE5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 100% 48px;
  background-position: top left;
  background-repeat: no-repeat;
}

.insight-card__summary-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
  margin: 0;
}

.insight-card__cta-btn {
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 4px;
  padding: 0;
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--teal-90, #01586A);
  cursor: pointer;
  transition: color 0.15s ease;
  white-space: nowrap;
}

.insight-card__cta-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.insight-card__cta-btn:hover .insight-card__cta-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Agent mode Button */
.insight-card__agent-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 10px;
  background-color: var(--gray-0, #FFFFFF);
  border: 1px solid #ACD9E4;
  border-radius: 6px;
  color: var(--teal-80, #01697E);
  cursor: pointer;
  transition: background-color 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  align-self: flex-end;
}

.insight-card__agent-btn:hover {
  background-color: rgba(172, 217, 228, 0.1);
}

.insight-card__agent-btn:hover span,
.insight-card__agent-btn:hover .insight-card__agent-btn-icon {
  color: var(--teal-80, #01697E);
}

.insight-card__agent-btn-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.insight-card__agent-btn-icon :deep(svg) {
  color: var(--teal-80, #01697E);
}

.insight-card__floating-chip-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
}

/* Smart Suggestion Badge */
.insight-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background-color: var(--gray-10, #F8F8F9);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 2px;
}

.insight-card__badge:hover {
  background-color: var(--teal-10, #E6F4F7);
  border-color: var(--teal-30, #A8D9E3);
}

.insight-card__badge-dot {
  font-size: 8px;
  color: var(--gray-70, #6A6C75);
}

.insight-card__badge-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 1.5;
  color: var(--gray-80, #4A4C55);
}

/* Simple CTA Button */
.insight-card__simple-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 36px;
  padding: 0;
  background-color: var(--gray-0, #FFFFFF);
  border: none;
  border-top: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 0 0 8px 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1;
  color: var(--teal-90, #01586A);
  cursor: pointer;
}

.insight-card__simple-cta-btn span {
  line-height: 1;
}

.insight-card__simple-cta-btn :deep(.pendo-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-card__simple-cta-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-card__simple-cta-btn:hover .insight-card__simple-cta-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>


