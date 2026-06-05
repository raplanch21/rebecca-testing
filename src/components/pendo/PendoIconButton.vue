<template>
  <button
    :disabled="disabled"
    :type="nativeType"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <PendoIcon
      :type="icon"
      :size="iconSize"
      :stroke-width="1.5"
      class="pendo-icon-button__icon"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Icon type (from PendoIcon) */
  icon: {
    type: String,
    required: true
  },
  /** Size: regular (16px icon), small (14px icon), mini (12px icon) */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['mini', 'small', 'regular'].includes(v)
  },
  /** Selected/active state */
  selected: {
    type: Boolean,
    default: false
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Native button type */
  nativeType: {
    type: String,
    default: 'button'
  },
  /** Aria label for accessibility */
  ariaLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])

const iconSize = computed(() => {
  return { mini: 12, small: 14, regular: 16 }[props.size]
})

const buttonClass = computed(() => {
  return [
    'pendo-icon-button',
    `pendo-icon-button--${props.size}`,
    {
      'pendo-icon-button--selected': props.selected,
      'pendo-icon-button--disabled': props.disabled
    }
  ]
})
</script>

<style scoped>
.pendo-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 4px;
  border-radius: 3px;
}

/* Sizes */
.pendo-icon-button--regular {
  width: 24px;
  height: 24px;
}

.pendo-icon-button--small {
  width: 22px;
  height: 22px;
}

.pendo-icon-button--mini {
  width: 20px;
  height: 20px;
}

/* Default state - gray-70 */
.pendo-icon-button .pendo-icon-button__icon {
  color: #6A6C75; /* gray-70 */
}

/* Hover state - gray-100 */
.pendo-icon-button:hover:not(:disabled):not(.pendo-icon-button--selected) .pendo-icon-button__icon {
  color: #2A2C35; /* gray-100 */
}

/* Selected state - gray-110 with background */
.pendo-icon-button--selected {
  background-color: #EAECF1; /* gray-30 */
}

.pendo-icon-button--selected .pendo-icon-button__icon {
  color: #1C1D23; /* gray-110 */
}

.pendo-icon-button--selected:hover:not(:disabled) {
  background-color: #DADCE5; /* gray-40 */
}

/* Disabled state */
.pendo-icon-button--disabled,
.pendo-icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus state */
.pendo-icon-button:focus-visible:not(:disabled) {
  outline: 2px solid #128297; /* teal-70 */
  outline-offset: 2px;
}
</style>

