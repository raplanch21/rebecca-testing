<template>
  <button
    :disabled="disabled || loading"
    :type="nativeType"
    :class="buttonClass"
    @click="$emit('click', $event)">
    <!-- Loading spinner -->
    <span v-if="loading" class="pendo-button__loader">
      <svg class="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </span>
    <!-- Prefix Icon -->
    <PendoIcon
      v-if="(icon || prefixIcon) && !loading"
      :type="icon || prefixIcon"
      :size="iconSize"
      :stroke-width="iconStrokeWidth"
      class="pendo-button__prefix-icon"
    />
    <!-- Label -->
    <span v-if="label || $slots.default" class="pendo-button__label">
      <slot>{{ label }}</slot>
    </span>
    <!-- Suffix Icon -->
    <PendoIcon
      v-if="suffixIcon"
      :type="suffixIcon"
      :size="iconSize"
      :stroke-width="iconStrokeWidth"
      class="pendo-button__suffix-icon"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Button type: primary, secondary, tertiary, tertiary-link, destructive, ghost */
  type: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'tertiary', 'tertiary-link', 'destructive', 'ghost'].includes(v)
  },
  /** Size: regular, small, mini */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['mini', 'small', 'regular'].includes(v)
  },
  /** Button label text */
  label: {
    type: String,
    default: ''
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Loading state */
  loading: {
    type: Boolean,
    default: false
  },
  /** Native button type */
  nativeType: {
    type: String,
    default: 'button'
  },
  /** Icon (same as prefixIcon) */
  icon: {
    type: String,
    default: ''
  },
  /** Prefix icon type */
  prefixIcon: {
    type: String,
    default: ''
  },
  /** Suffix icon type */
  suffixIcon: {
    type: String,
    default: ''
  },
  /** Stroke width for icons inside the button */
  iconStrokeWidth: {
    type: [Number, String],
    default: 2
  },
  /** Full width button */
  block: {
    type: Boolean,
    default: false
  },
  /** Round button style */
  round: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const iconSize = computed(() => {
  // Figma secondary/small uses a 16px icon.
  return { mini: 12, small: 16, regular: 16 }[props.size]
})

const isIconOnly = computed(() => {
  return (props.icon || props.prefixIcon) && !props.label
})

const buttonClass = computed(() => {
  return [
    'pendo-button',
    `pendo-button--${props.type}`,
    `pendo-button--${props.size}`,
    {
      'pendo-button--block': props.block,
      'pendo-button--round': props.round,
      'pendo-button--icon-only': isIconOnly.value,
      'pendo-button--loading': props.loading,
      'pendo-button--disabled': props.disabled
    }
  ]
})
</script>

<style scoped>
.pendo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 6px;
  white-space: nowrap;
}

/* ========================================
   SIZES
   ======================================== */

/* Regular - 36px height */
.pendo-button--regular {
  height: 36px;
  padding: 0 12px;
  font-size: 14.222px; /* paragraph/base/semibold */
}

/* Small - 32px height */
.pendo-button--small {
  height: 32px;
  padding: 0 12px;
  font-size: 14.222px; /* paragraph/base/semibold */
}

/* Mini - 26px height */
.pendo-button--mini {
  height: 26px;
  padding: 0 8px;
  font-size: 12.642px; /* paragraph/small/semibold */
}

/* Icon only adjustments */
.pendo-button--icon-only.pendo-button--regular {
  width: 36px;
  padding: 0;
}

.pendo-button--icon-only.pendo-button--small {
  width: 32px;
  padding: 0;
}

.pendo-button--icon-only.pendo-button--mini {
  width: 26px;
  padding: 0;
}

/* ========================================
   PRIMARY - Solid teal background
   ======================================== */
.pendo-button--primary {
  background-color: #005164; /* teal-90 */
  color: #ffffff;
}

.pendo-button--primary:hover:not(:disabled) {
  background-color: #016479; /* teal-80 */
}

.pendo-button--primary:active:not(:disabled) {
  background-color: #005164; /* teal-90 */
}

.pendo-button--primary:focus-visible:not(:disabled) {
  background-color: #005164; /* teal-90 */
  outline: 2px solid #005164;
  outline-offset: 2px;
}

/* ========================================
   SECONDARY - Ghost teal text with gray border
   ======================================== */
.pendo-button--secondary {
  background-color: transparent;
  color: #005164; /* teal-90 */
  border: 1px solid #DADCE5; /* gray-40 */
}

.pendo-button--secondary:hover:not(:disabled) {
  background-color: #F5F6F8; /* gray-10 */
  color: #005164; /* teal-90 */
  border-color: #DADCE5; /* gray-40 */
}

.pendo-button--secondary:active:not(:disabled) {
  background-color: #F5F6F8; /* gray-10 */
  color: #005164; /* teal-90 */
  border-color: #DADCE5; /* gray-40 */
}

.pendo-button--secondary:focus-visible:not(:disabled) {
  color: #005164; /* teal-90 */
  border-color: #DADCE5; /* gray-40 */
  outline: 2px solid #005164;
  outline-offset: 2px;
}

/* ========================================
   TERTIARY - Ghost gray icon, no border
   ======================================== */
.pendo-button--tertiary {
  background-color: transparent;
  color: #005164; /* teal-90 */
  border: none;
  padding: 0;
}

.pendo-button--tertiary:hover:not(:disabled) {
  color: #005164; /* teal-90 */
  text-decoration: underline;
}

.pendo-button--tertiary:active:not(:disabled) {
  color: #005164; /* teal-90 */
  text-decoration: underline;
}

.pendo-button--tertiary:focus-visible:not(:disabled) {
  color: #005164; /* teal-90 */
  outline: 2px solid #005164;
  outline-offset: 2px;
}

.pendo-button--tertiary:disabled {
  opacity: 0.4;
  color: #005164; /* teal-90 */
}

.pendo-button--tertiary .pendo-icon {
  color: inherit;
}

/* ========================================
   TERTIARY LINK - Ghost teal text
   ======================================== */
.pendo-button--tertiary-link {
  background-color: transparent;
  color: #005164; /* teal-90 */
  padding-left: 0;
  padding-right: 0;
}

.pendo-button--tertiary-link:hover:not(:disabled) {
  color: #005164; /* teal-90 */
  text-decoration: underline;
}

.pendo-button--tertiary-link:active:not(:disabled) {
  color: #005164; /* teal-90 */
  text-decoration: underline;
}

.pendo-button--tertiary-link:focus-visible:not(:disabled) {
  color: #005164; /* teal-90 */
  outline: 2px solid #005164;
  outline-offset: 2px;
}

/* ========================================
   DESTRUCTIVE - Red background
   ======================================== */
.pendo-button--destructive {
  background-color: #DA1010; /* red-60 */
  color: #ffffff;
}

.pendo-button--destructive:hover:not(:disabled) {
  background-color: #BD0000; /* red-80 */
}

.pendo-button--destructive:active:not(:disabled) {
  background-color: #A50000; /* red-90 */
}

.pendo-button--destructive:focus-visible:not(:disabled) {
  background-color: #BD0000; /* red-80 */
  outline: 2px solid #DA1010;
  outline-offset: 2px;
}

/* ========================================
   STATES
   ======================================== */

/* Disabled */
.pendo-button--disabled,
.pendo-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading */
.pendo-button--loading {
  cursor: wait;
}

/* Block (full width) */
.pendo-button--block {
  width: 100%;
}

/* Round */
.pendo-button--round {
  border-radius: 9999px;
}

/* ========================================
   LOADER
   ======================================== */
.pendo-button__loader {
  display: inline-flex;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ========================================
   LABEL
   ======================================== */
.pendo-button__label {
  display: inline-flex;
  align-items: center;
}
</style>

