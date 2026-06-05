<template>
  <button
    type="button"
    :class="triggerClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <div class="pendo-date-picker-trigger__content">
      <!-- Calendar icon -->
      <svg
        class="pendo-date-picker-trigger__calendar-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Calendar body -->
        <rect
          x="2"
          y="3"
          width="12"
          height="11"
          rx="1"
          stroke="currentColor"
          stroke-width="1.2"
          fill="none"
        />
        <!-- Top line -->
        <path
          d="M2 7H14"
          stroke="currentColor"
          stroke-width="1.2"
        />
        <!-- Left hook -->
        <path
          d="M5 1.5V4"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
        />
        <!-- Right hook -->
        <path
          d="M11 1.5V4"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
        />
      </svg>
      <!-- Date text -->
      <span class="pendo-date-picker-trigger__text">
        <slot>{{ displayText }}</slot>
      </span>
    </div>
    <!-- Chevron icon -->
    <svg
      class="pendo-date-picker-trigger__chevron"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Selected date value (Date object or string) */
  modelValue: {
    type: [Date, String, Array],
    default: null
  },
  /** Date format type: default (single), minmax (range), multiple, range */
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'minmax', 'multiple', 'range'].includes(v)
  },
  /** Placeholder text when no date is selected */
  placeholder: {
    type: String,
    default: 'Select date'
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Custom date formatter function */
  formatter: {
    type: Function,
    default: null
  }
})

defineEmits(['click', 'update:modelValue'])

/**
 * Formats a date to "MMM D, YYYY" format (e.g., "Apr 25, 2019").
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  if (!date) return ''
  
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return String(date)
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

/**
 * Computes the display text based on the type and value.
 */
const displayText = computed(() => {
  if (props.formatter) {
    return props.formatter(props.modelValue)
  }
  
  if (!props.modelValue) {
    return props.placeholder
  }
  
  // Handle array of dates
  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0) {
      return props.placeholder
    }
    
    if (props.type === 'multiple') {
      // Multiple dates: "Jan 9, 2018, Jan 25, 2018"
      return props.modelValue.map(formatDate).join(', ')
    }
    
    if (props.type === 'range' || props.type === 'minmax') {
      // Range: "Apr 25, 2019 - Apr 29, 2019"
      if (props.modelValue.length >= 2) {
        return `${formatDate(props.modelValue[0])} - ${formatDate(props.modelValue[1])}`
      }
      return formatDate(props.modelValue[0])
    }
  }
  
  // Single date
  return formatDate(props.modelValue)
})

const triggerClass = computed(() => [
  'pendo-date-picker-trigger',
  {
    'pendo-date-picker-trigger--disabled': props.disabled,
    'pendo-date-picker-trigger--placeholder': !props.modelValue
  }
])
</script>

<style scoped>
.pendo-date-picker-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 9px 10px 9px 8px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: border-color 0.15s ease;
  min-width: 0;
}

.pendo-date-picker-trigger:hover:not(:disabled) {
  border-color: #128297; /* teal-70 */
}

.pendo-date-picker-trigger:focus {
  outline: none;
  border-color: #128297; /* teal-70 */
  box-shadow: 0 0 0 2px rgba(18, 130, 151, 0.15);
}

.pendo-date-picker-trigger--disabled {
  background-color: #F4F4F7; /* gray-20 */
  border-color: #DADCE5; /* gray-40 */
  cursor: not-allowed;
  opacity: 0.6;
}

/* ========================================
   CONTENT
   ======================================== */
.pendo-date-picker-trigger__content {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

/* ========================================
   CALENDAR ICON
   ======================================== */
.pendo-date-picker-trigger__calendar-icon {
  flex-shrink: 0;
  color: #2A2C35; /* gray-100 */
}

.pendo-date-picker-trigger--disabled .pendo-date-picker-trigger__calendar-icon {
  color: #6A6C75; /* gray-70 */
}

/* ========================================
   TEXT
   ======================================== */
.pendo-date-picker-trigger__text {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pendo-date-picker-trigger--placeholder .pendo-date-picker-trigger__text {
  color: #6A6C75; /* gray-70 */
}

.pendo-date-picker-trigger--disabled .pendo-date-picker-trigger__text {
  color: #6A6C75; /* gray-70 */
}

/* ========================================
   CHEVRON ICON
   ======================================== */
.pendo-date-picker-trigger__chevron {
  flex-shrink: 0;
  color: #2A2C35; /* gray-100 */
  margin-left: 10px;
}

.pendo-date-picker-trigger--disabled .pendo-date-picker-trigger__chevron {
  color: #6A6C75; /* gray-70 */
}
</style>

