<template>
  <div :class="collapseClass">
    <!-- Upper divider for normal type -->
    <div v-if="type === 'normal'" class="pendo-collapse__divider" />

    <!-- Header -->
    <button
      type="button"
      class="pendo-collapse__header"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      <div class="pendo-collapse__header-content">
        <span class="pendo-collapse__title">
          <slot name="title">{{ title }}</slot>
        </span>
      </div>
      <span class="pendo-collapse__icon">
        <!-- Chevron icons for normal and header types -->
        <svg
          v-if="type !== 'subhead'"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :d="isExpanded ? 'M12 10L8 6L4 10' : 'M4 6L8 10L12 6'"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- Plus/Minus icons for subhead type -->
        <svg
          v-else
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Horizontal line (always visible) -->
          <path
            d="M3 7H11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <!-- Vertical line (only when collapsed) -->
          <path
            v-if="!isExpanded"
            d="M7 3V11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>

    <!-- Bottom divider -->
    <div class="pendo-collapse__divider" />

    <!-- Content area -->
    <div v-show="isExpanded" class="pendo-collapse__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** Collapse title text */
  title: {
    type: String,
    default: ''
  },
  /** Type: normal, header, subhead */
  type: {
    type: String,
    default: 'normal',
    validator: (v) => ['normal', 'header', 'subhead'].includes(v)
  },
  /** v-model for expanded state */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** Default expanded state (used when not using v-model) */
  defaultExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'expand', 'collapse'])

// Internal state - syncs with v-model if provided
const internalExpanded = ref(props.modelValue || props.defaultExpanded)

// Watch for external v-model changes
watch(() => props.modelValue, (newVal) => {
  internalExpanded.value = newVal
})

const isExpanded = computed(() => internalExpanded.value)

const collapseClass = computed(() => [
  'pendo-collapse',
  `pendo-collapse--${props.type}`,
  {
    'pendo-collapse--expanded': isExpanded.value
  }
])

/**
 * Toggles the expanded state of the collapse.
 */
const toggle = () => {
  internalExpanded.value = !internalExpanded.value
  emit('update:modelValue', internalExpanded.value)
  emit(internalExpanded.value ? 'expand' : 'collapse')
}
</script>

<style scoped>
.pendo-collapse {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  width: 100%;
}

/* ========================================
   DIVIDERS
   ======================================== */
.pendo-collapse__divider {
  height: 1px;
  width: 100%;
  background-color: #DADCE5; /* gray-40 */
}

/* ========================================
   HEADER
   ======================================== */
.pendo-collapse__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.pendo-collapse__header-content {
  display: flex;
  align-items: center;
}

/* ========================================
   NORMAL TYPE
   ======================================== */
.pendo-collapse--normal .pendo-collapse__header {
  height: 48px;
  background-color: transparent;
}

.pendo-collapse--normal .pendo-collapse__header:hover {
  background-color: #F8F8F9; /* gray-10 */
}

.pendo-collapse--normal .pendo-collapse__title {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}

.pendo-collapse--normal .pendo-collapse__icon {
  color: #2A2C35; /* gray-100 */
}

/* ========================================
   HEADER TYPE
   ======================================== */
.pendo-collapse--header .pendo-collapse__header {
  height: 75px;
  background-color: #F8F8F9; /* gray-10 */
}

.pendo-collapse--header .pendo-collapse__header:hover {
  background-color: #EAECF1; /* gray-30 */
}

.pendo-collapse--header .pendo-collapse__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: #2A2C35; /* gray-100 */
}

.pendo-collapse--header .pendo-collapse__icon {
  color: #2A2C35; /* gray-100 */
}

/* ========================================
   SUBHEAD TYPE (Details Collapse Item)
   ======================================== */
.pendo-collapse--subhead .pendo-collapse__header {
  height: 36px;
  background-color: #F8F8F9; /* gray-10 */
}

.pendo-collapse--subhead .pendo-collapse__header:hover {
  background-color: #EAECF1; /* gray-30 */
}

.pendo-collapse--subhead .pendo-collapse__title {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #4A4C55; /* gray-80 */
}

.pendo-collapse--subhead .pendo-collapse__icon {
  color: #6A6C75; /* gray-70 */
}

.pendo-collapse--subhead.pendo-collapse--expanded .pendo-collapse__icon {
  color: #2A2C35; /* gray-100 */
}

/* ========================================
   ICON
   ======================================== */
.pendo-collapse__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ========================================
   CONTENT
   ======================================== */
.pendo-collapse__content {
  padding: 8px 8px 24px 8px;
  font-size: 12.642px;
  font-weight: 400;
  line-height: 1.5;
  color: #4A4C55; /* gray-80 */
}

.pendo-collapse--subhead .pendo-collapse__content {
  padding: 4px;
}

/* ========================================
   EXPANDED STATE - Hide bottom divider when expanded
   (content flows directly after header)
   ======================================== */
.pendo-collapse--expanded .pendo-collapse__divider:last-of-type {
  /* Keep divider visible but after content will show */
}
</style>

