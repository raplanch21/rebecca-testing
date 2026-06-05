<template>
  <div class="grouped-insight-card">
    <!-- Card Header -->
    <div class="grouped-insight-card__header">
      <h3 class="grouped-insight-card__title">{{ title }}</h3>
      <button class="grouped-insight-card__menu-btn" type="button" aria-label="More options">
        <PendoIcon type="more-vertical" :size="16" />
      </button>
    </div>

    <!-- Stacked Items -->
    <div class="grouped-insight-card__list">
      <div class="grouped-insight-card__items-container">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="grouped-insight-card__item"
          :class="{ 'grouped-insight-card__item--border': index > 0 }"
        >
        <div class="grouped-insight-card__metric">
          <div class="grouped-insight-card__metric-value">{{ item.value }}</div>
          <PendoTrendTag :value="item.trend" />
        </div>

        <div class="grouped-insight-card__description">
          <div class="grouped-insight-card__description-text">
            <span>{{ item.descriptionPrefix }}</span>
            <PendoAppTag :label="item.appLabel" :icon="item.appIcon" />
            <span>{{ item.descriptionSuffix }} {{ item.descriptionContinued }}</span>
          </div>
          <span class="grouped-insight-card__range">{{ item.range }}</span>
        </div>
      </div>
      </div>
    </div>

    <!-- Footer with Expandable Summary -->
    <div class="grouped-insight-card__footer-container">
      <div class="grouped-insight-card__footer">
        <!-- Button Row -->
        <button class="grouped-insight-card__expand-btn" @click="toggleExpanded">
          <span class="grouped-insight-card__label">Insight summary</span>
          <PendoIcon :type="isExpanded ? 'chevron-up' : 'chevron-down'" :size="16" />
        </button>
        
        <!-- Summary Text (expanded state) -->
        <div v-if="isExpanded" class="grouped-insight-card__expanded-content">
          <p class="grouped-insight-card__summary-text">{{ summary }}</p>
          
          <!-- Agent mode Button -->
          <button 
            class="grouped-insight-card__agent-btn"
            @click="openAgentMode"
          >
            <PendoIcon type="sparkle" :size="16" class="grouped-insight-card__agent-btn-icon" />
            <span>Ask in Agent mode</span>
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PendoIcon from './pendo/PendoIcon.vue'
import PendoTrendTag from './pendo/PendoTrendTag.vue'
import PendoAppTag from './pendo/PendoAppTag.vue'

const isExpanded = ref(false)

const emit = defineEmits(['open-agent-mode'])

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const openAgentMode = () => {
  // Emit event to open global Agent mode
  emit('open-agent-mode', { title: props.title, context: props.summary })
  isExpanded.value = false
}

const props = defineProps({
  /** Card title / category name */
  title: {
    type: String,
    required: true
  },
  /** Array of items to display */
  items: {
    type: Array,
    required: true,
    validator: (items) => items.every(item => 
      item.value && 
      typeof item.trend === 'number' &&
      item.descriptionPrefix &&
      item.appLabel &&
      item.descriptionSuffix &&
      item.descriptionContinued &&
      item.range
    )
  },
  /** Summary text that spans both items */
  summary: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.grouped-insight-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 81, 100, 0.1);
  background: linear-gradient(149.33deg, rgba(46, 151, 170, 0.05) 1.27%, rgba(18, 60, 68, 0.05) 100.03%);
  overflow: hidden;
}

/* Header */
.grouped-insight-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 24px;
  border-radius: 8px 8px 0 0;
}

.grouped-insight-card__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.35;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.grouped-insight-card__menu-btn {
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
}

.grouped-insight-card__menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* List */
.grouped-insight-card__list {
  background-color: var(--gray-0, #FFFFFF);
  border-radius: 8px 8px 0 0;
}

.grouped-insight-card__items-container {
  padding: 0 32px;
}

.grouped-insight-card__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  background-color: var(--gray-0, #FFFFFF);
}

.grouped-insight-card__item--border {
  border-top: 1px solid rgba(0, 81, 100, 0.1);
}

/* Metric */
.grouped-insight-card__metric {
  display: flex;
  gap: 12px;
  align-items: center;
}

.grouped-insight-card__metric-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--gray-110, #1A1C25);
}

/* Description */
.grouped-insight-card__description {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grouped-insight-card__description-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
  display: inline;
}

.grouped-insight-card__description-text :deep(.pendo-app-tag) {
  display: inline-flex;
  vertical-align: baseline;
  margin: 0 4px;
}

.grouped-insight-card__range {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: var(--gray-70, #6A6C75);
}

/* Footer Container */
.grouped-insight-card__footer-container {
  background-color: var(--gray-0, #FFFFFF);
  padding: 0 32px;
  border-radius: 0 0 8px 8px;
}

/* Footer */
.grouped-insight-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 0 0 3px 3px;
}

.grouped-insight-card__expand-btn {
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

.grouped-insight-card__expand-btn:hover {
  opacity: 0.8;
}

.grouped-insight-card__expand-btn:focus-visible {
  outline: 2px solid var(--teal-90, #01586a);
  outline-offset: 2px;
  border-radius: 6px;
}

.grouped-insight-card__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--teal-90, #01586a);
}

.grouped-insight-card__expanded-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.grouped-insight-card__summary-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
  margin: 0;
}

/* Agent mode Button */
.grouped-insight-card__agent-btn {
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

.grouped-insight-card__agent-btn:hover {
  background-color: rgba(172, 217, 228, 0.1);
}

.grouped-insight-card__agent-btn:hover span,
.grouped-insight-card__agent-btn:hover .grouped-insight-card__agent-btn-icon {
  color: var(--teal-80, #01697E);
}

.grouped-insight-card__agent-btn-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grouped-insight-card__agent-btn-icon :deep(svg) {
  color: var(--teal-80, #01697E);
}
</style>
