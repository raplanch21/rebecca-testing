<template>
  <!-- Standard Dropdown Trigger -->
  <div v-if="variant === 'standard'" :class="standardClass">
    <!-- Label -->
    <div v-if="label" class="pendo-dropdown-trigger__label-row">
      <span class="pendo-dropdown-trigger__label">{{ label }}</span>
      <PendoIcon v-if="showLabelInfo" type="info" :size="12" class="pendo-dropdown-trigger__label-info" />
      <span v-if="required" class="pendo-dropdown-trigger__required">*</span>
    </div>

    <!-- Select box -->
    <button
      type="button"
      class="pendo-dropdown-trigger__select"
      :disabled="disabled"
      @click="handleClick"
    >
      <div class="pendo-dropdown-trigger__content">
        <PendoIcon v-if="icon" :type="icon" :size="16" class="pendo-dropdown-trigger__icon" />
        <span :class="hasValue ? 'pendo-dropdown-trigger__value' : 'pendo-dropdown-trigger__placeholder'">
          <slot>{{ hasValue ? modelValue : placeholder }}</slot>
        </span>
      </div>
      <svg
        class="pendo-dropdown-trigger__chevron"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :d="isOpen ? 'M10.5 8.75L7 5.25L3.5 8.75' : 'M3.5 5.25L7 8.75L10.5 5.25'"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Error message -->
    <span v-if="error" class="pendo-dropdown-trigger__error">{{ error }}</span>
  </div>

  <!-- Text Trigger -->
  <button
    v-else-if="variant === 'text'"
    type="button"
    :class="textClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <div class="pendo-dropdown-trigger__text-content">
      <PendoIcon v-if="icon" :type="icon" :size="16" class="pendo-dropdown-trigger__text-icon" />
      <span class="pendo-dropdown-trigger__text-label">
        <slot>{{ modelValue || placeholder }}</slot>
      </span>
      <svg
        class="pendo-dropdown-trigger__text-chevron"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :d="isOpen ? 'M12 10L8 6L4 10' : 'M4 6L8 10L12 6'"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div v-if="!disabled" class="pendo-dropdown-trigger__text-underline" />
  </button>

  <!-- Data Source / Chart Trigger -->
  <button
    v-else
    type="button"
    :class="dataSourceClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <div class="pendo-dropdown-trigger__ds-content">
      <PendoIcon v-if="icon" :type="icon" :size="16" class="pendo-dropdown-trigger__ds-icon" />
      <span class="pendo-dropdown-trigger__ds-label">
        <slot>{{ modelValue || placeholder }}</slot>
      </span>
      <svg
        class="pendo-dropdown-trigger__ds-chevron"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :d="isOpen ? 'M12 10L8 6L4 10' : 'M4 6L8 10L12 6'"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div v-if="!disabled" class="pendo-dropdown-trigger__ds-underline" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Trigger variant: standard, text, dataSource, chart */
  variant: {
    type: String,
    default: 'standard',
    validator: (v) => ['standard', 'text', 'dataSource', 'chart'].includes(v)
  },
  /** Selected value */
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  /** Placeholder text */
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  /** Label text (standard variant only) */
  label: {
    type: String,
    default: ''
  },
  /** Show info icon next to label */
  showLabelInfo: {
    type: Boolean,
    default: false
  },
  /** Required field indicator */
  required: {
    type: Boolean,
    default: false
  },
  /** Prefix icon type */
  icon: {
    type: String,
    default: ''
  },
  /** Color scheme for text variant: teal, gray */
  color: {
    type: String,
    default: 'teal',
    validator: (v) => ['teal', 'gray'].includes(v)
  },
  /** Open/clicked state */
  isOpen: {
    type: Boolean,
    default: false
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Error message (standard variant only) */
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click', 'update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

const standardClass = computed(() => [
  'pendo-dropdown-trigger',
  'pendo-dropdown-trigger--standard',
  {
    'pendo-dropdown-trigger--open': props.isOpen,
    'pendo-dropdown-trigger--disabled': props.disabled,
    'pendo-dropdown-trigger--error': props.error
  }
])

const textClass = computed(() => [
  'pendo-dropdown-trigger',
  'pendo-dropdown-trigger--text',
  `pendo-dropdown-trigger--${props.color}`,
  {
    'pendo-dropdown-trigger--open': props.isOpen,
    'pendo-dropdown-trigger--disabled': props.disabled
  }
])

const dataSourceClass = computed(() => [
  'pendo-dropdown-trigger',
  `pendo-dropdown-trigger--${props.variant}`,
  {
    'pendo-dropdown-trigger--open': props.isOpen,
    'pendo-dropdown-trigger--disabled': props.disabled
  }
])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.pendo-dropdown-trigger {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   STANDARD DROPDOWN TRIGGER
   ======================================== */
.pendo-dropdown-trigger--standard {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pendo-dropdown-trigger__label-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pendo-dropdown-trigger__label {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger__label-info {
  color: #2A2C35;
}

.pendo-dropdown-trigger__required {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #E83B3B; /* red */
}

.pendo-dropdown-trigger__select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 9px 10px 9px 8px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.pendo-dropdown-trigger__select:hover:not(:disabled) {
  border-color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger--open .pendo-dropdown-trigger__select {
  border-color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger--disabled .pendo-dropdown-trigger__select {
  background-color: #F4F4F7; /* gray-20 */
  border-color: #DADCE5;
  cursor: not-allowed;
}

.pendo-dropdown-trigger--error .pendo-dropdown-trigger__select {
  border-color: #DA1010; /* red-60 */
}

.pendo-dropdown-trigger__content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pendo-dropdown-trigger__icon {
  color: #2A2C35;
  flex-shrink: 0;
}

.pendo-dropdown-trigger__value {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger__placeholder {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #9A9CA5; /* gray-60 */
}

.pendo-dropdown-trigger__chevron {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-dropdown-trigger--disabled .pendo-dropdown-trigger__chevron {
  color: #6A6C75; /* gray-70 */
}

.pendo-dropdown-trigger__error {
  font-size: 12.642px;
  font-weight: 400;
  line-height: 1.5;
  color: #DA1010; /* red-60 */
}

/* ========================================
   TEXT TRIGGER
   ======================================== */
.pendo-dropdown-trigger--text {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.pendo-dropdown-trigger__text-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pendo-dropdown-trigger__text-icon {
  flex-shrink: 0;
}

.pendo-dropdown-trigger__text-label {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
}

.pendo-dropdown-trigger__text-chevron {
  flex-shrink: 0;
}

.pendo-dropdown-trigger__text-underline {
  width: 100%;
  height: 1px;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.15s ease;
}

/* Teal color */
.pendo-dropdown-trigger--teal .pendo-dropdown-trigger__text-icon,
.pendo-dropdown-trigger--teal .pendo-dropdown-trigger__text-label,
.pendo-dropdown-trigger--teal .pendo-dropdown-trigger__text-chevron {
  color: #128297; /* teal-70 */
}

.pendo-dropdown-trigger--teal:hover:not(:disabled) .pendo-dropdown-trigger__text-icon,
.pendo-dropdown-trigger--teal:hover:not(:disabled) .pendo-dropdown-trigger__text-label,
.pendo-dropdown-trigger--teal:hover:not(:disabled) .pendo-dropdown-trigger__text-chevron,
.pendo-dropdown-trigger--teal.pendo-dropdown-trigger--open .pendo-dropdown-trigger__text-icon,
.pendo-dropdown-trigger--teal.pendo-dropdown-trigger--open .pendo-dropdown-trigger__text-label,
.pendo-dropdown-trigger--teal.pendo-dropdown-trigger--open .pendo-dropdown-trigger__text-chevron {
  color: #016479; /* teal-80 */
}

.pendo-dropdown-trigger--teal:hover:not(:disabled) .pendo-dropdown-trigger__text-underline,
.pendo-dropdown-trigger--teal.pendo-dropdown-trigger--open .pendo-dropdown-trigger__text-underline {
  opacity: 1;
  background-color: #016479; /* teal-80 */
}

/* Gray color */
.pendo-dropdown-trigger--gray .pendo-dropdown-trigger__text-icon,
.pendo-dropdown-trigger--gray .pendo-dropdown-trigger__text-label,
.pendo-dropdown-trigger--gray .pendo-dropdown-trigger__text-chevron {
  color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger--gray:hover:not(:disabled) .pendo-dropdown-trigger__text-underline,
.pendo-dropdown-trigger--gray.pendo-dropdown-trigger--open .pendo-dropdown-trigger__text-underline {
  opacity: 1;
  background-color: #2A2C35; /* gray-100 */
}

/* Disabled text trigger */
.pendo-dropdown-trigger--text.pendo-dropdown-trigger--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ========================================
   DATA SOURCE / CHART TRIGGER
   ======================================== */
.pendo-dropdown-trigger--dataSource,
.pendo-dropdown-trigger--chart {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.pendo-dropdown-trigger__ds-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pendo-dropdown-trigger__ds-icon {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-dropdown-trigger__ds-label {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-trigger__ds-chevron {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-dropdown-trigger__ds-underline {
  width: 100%;
  height: 1px;
  background-color: #DADCE5; /* gray-40 */
  transition: height 0.15s ease, background-color 0.15s ease;
}

.pendo-dropdown-trigger--dataSource:hover:not(:disabled) .pendo-dropdown-trigger__ds-underline,
.pendo-dropdown-trigger--chart:hover:not(:disabled) .pendo-dropdown-trigger__ds-underline,
.pendo-dropdown-trigger--dataSource.pendo-dropdown-trigger--open .pendo-dropdown-trigger__ds-underline,
.pendo-dropdown-trigger--chart.pendo-dropdown-trigger--open .pendo-dropdown-trigger__ds-underline {
  height: 2px;
  background-color: #2A2C35; /* gray-100 */
}

/* Disabled data source/chart trigger */
.pendo-dropdown-trigger--dataSource.pendo-dropdown-trigger--disabled,
.pendo-dropdown-trigger--chart.pendo-dropdown-trigger--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pendo-dropdown-trigger--dataSource.pendo-dropdown-trigger--disabled .pendo-dropdown-trigger__ds-underline,
.pendo-dropdown-trigger--chart.pendo-dropdown-trigger--disabled .pendo-dropdown-trigger__ds-underline {
  display: none;
}
</style>

