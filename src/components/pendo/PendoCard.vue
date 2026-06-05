<template>
  <div
    class="pendo-card"
    :class="cardClass">
    <!-- Header -->
    <div v-if="showHeader" class="pendo-card__header">
      <slot name="header">
        <!-- Left section -->
        <div class="pendo-card__header-left">
          <slot name="header-left">
            <div class="pendo-card__title-group">
              <span class="pendo-card__title">{{ title }}</span>
              <span v-if="count !== null" class="pendo-card__count">({{ count }})</span>
              <button
                v-if="showInfoIcon"
                class="pendo-card__info-btn"
                type="button"
                aria-label="More information"
                @click="$emit('info-click')"
              >
                <PendoIcon type="info" :size="16" />
              </button>
            </div>
          </slot>
        </div>

        <!-- Center section -->
        <div v-if="$slots['header-center']" class="pendo-card__header-center">
          <slot name="header-center" />
        </div>

        <!-- Right section -->
        <div class="pendo-card__header-right">
          <slot name="header-right">
            <!-- Collapsible toggle -->
            <button
              v-if="collapsible"
              class="pendo-card__collapse-btn"
              type="button"
              :aria-expanded="!isCollapsed"
              aria-label="Toggle card content"
              @click="toggleCollapse"
            >
              <PendoIcon :type="isCollapsed ? 'chevron-down' : 'chevron-up'" :size="16" />
            </button>
          </slot>
        </div>
      </slot>
    </div>
    
    <!-- Body -->
    <div v-show="!collapsible || !isCollapsed" class="pendo-card__body" :style="bodyStyle">
      <slot />
    </div>
    
    <!-- Footer -->
    <div v-if="$slots.footer" v-show="!collapsible || !isCollapsed" class="pendo-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
import PendoIcon from './PendoIcon.vue'

const slots = useSlots()

const props = defineProps({
  /** Card title */
  title: {
    type: String,
    default: ''
  },
  /** Item count to display next to title */
  count: {
    type: [Number, String],
    default: null
  },
  /** Show info icon next to title */
  showInfoIcon: {
    type: Boolean,
    default: false
  },
  /** Show border */
  bordered: {
    type: Boolean,
    default: true
  },
  /** Show shadow */
  shadow: {
    type: Boolean,
    default: false
  },
  /** Hoverable effect - shows teal border on hover */
  hoverable: {
    type: Boolean,
    default: false
  },
  /** Disabled state - grays out content */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Body padding */
  bodyPadding: {
    type: String,
    default: '16px'
  },
  /** Make card collapsible */
  collapsible: {
    type: Boolean,
    default: false
  },
  /** Default collapsed state (only works with collapsible) */
  defaultCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['info-click', 'collapse', 'expand'])

const isCollapsed = ref(props.defaultCollapsed)

const cardClass = computed(() => ({
  'pendo-card--bordered': props.bordered,
  'pendo-card--shadow': props.shadow,
  'pendo-card--hoverable': props.hoverable,
  'pendo-card--disabled': props.disabled,
  'pendo-card--collapsed': props.collapsible && isCollapsed.value
}))

const showHeader = computed(() => {
  return props.title || props.collapsible || slots.header
})

const bodyStyle = computed(() => ({
  padding: props.bodyPadding
}))

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit(isCollapsed.value ? 'collapse' : 'expand')
}
</script>

<style scoped>
.pendo-card {
  background-color: #ffffff;
  border-radius: 6px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: border-color 0.15s ease, box-shadow 0.2s ease;
}

/* ========================================
   BORDERED STATE
   ======================================== */
.pendo-card--bordered {
  border: 1px solid #DADCE5; /* gray-40 */
}

/* ========================================
   SHADOW STATE
   ======================================== */
.pendo-card--shadow {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.17); /* Depth 2 */
}

/* ========================================
   HOVERABLE STATE - Teal border on hover
   ======================================== */
.pendo-card--hoverable:hover {
  border-color: #005164; /* teal-90 */
}

/* ========================================
   DISABLED STATE
   ======================================== */
.pendo-card--disabled {
  pointer-events: none;
}

.pendo-card--disabled .pendo-card__title,
.pendo-card--disabled .pendo-card__count {
  color: #BABCC5; /* gray-50 */
}

.pendo-card--disabled .pendo-card__body {
  opacity: 0.5;
}

/* ========================================
   HEADER
   ======================================== */
.pendo-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #DADCE5; /* gray-40 */
  border-radius: 6px 6px 0 0;
}

.pendo-card__header-left {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px;
  min-width: 0;
}

.pendo-card__header-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 16px;
}

.pendo-card__header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-left: 16px;
  padding-right: 8px;
}

/* Title group */
.pendo-card__title-group {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;
}

.pendo-card__title {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.35;
  color: #2A2C35; /* gray-100 */
  margin: 0;
}

.pendo-card__count {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.35;
  color: #6A6C75; /* gray-70 */
}

/* Info button */
.pendo-card__info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #6A6C75; /* gray-70 */
  transition: color 0.15s ease;
}

.pendo-card__info-btn:hover {
  color: #2A2C35; /* gray-100 */
}

/* Collapse button */
.pendo-card__collapse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #2A2C35; /* gray-100 */
  transition: background-color 0.15s ease;
}

.pendo-card__collapse-btn:hover {
  background-color: #EAECF1; /* gray-30 */
}

/* ========================================
   BODY
   ======================================== */
.pendo-card__body {
  /* padding set via prop */
}

/* ========================================
   FOOTER
   ======================================== */
.pendo-card__footer {
  padding: 16px;
  border-top: 1px solid #DADCE5; /* gray-40 */
}

/* ========================================
   COLLAPSED STATE
   ======================================== */
.pendo-card--collapsed .pendo-card__header {
  border-bottom: none;
  border-radius: 6px;
}
</style>

