<template>
  <label
    :class="checkboxClass"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :name="name"
      :value="value"
      class="pendo-checkbox__input"
      @change="handleChange"
    />
    <span class="pendo-checkbox__box">
      <!-- Checkmark icon (for selected state) -->
      <svg
        v-if="isChecked && !indeterminate"
        class="pendo-checkbox__icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- Minus icon (for indeterminate state) -->
      <svg
        v-else-if="indeterminate"
        class="pendo-checkbox__icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 6H9.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="pendo-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  /** v-model binding for checked state */
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  /** Checkbox value (for array v-model) */
  value: {
    type: [String, Number, Boolean, Object],
    default: null
  },
  /** Checkbox label text */
  label: {
    type: String,
    default: ''
  },
  /** Indeterminate state (partial selection) */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Name attribute for form submission */
  name: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isHovered = ref(false)

/**
 * Determines if the checkbox is checked.
 * Supports both boolean and array v-model patterns.
 */
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

/**
 * Computes the CSS classes for the checkbox wrapper.
 */
const checkboxClass = computed(() => {
  return [
    'pendo-checkbox',
    {
      'pendo-checkbox--checked': isChecked.value,
      'pendo-checkbox--indeterminate': props.indeterminate,
      'pendo-checkbox--disabled': props.disabled,
      'pendo-checkbox--hovered': isHovered.value && !props.disabled && !isChecked.value && !props.indeterminate
    }
  ]
})

/**
 * Handles the change event from the native checkbox input.
 * Updates v-model and emits change event.
 */
const handleChange = (event) => {
  if (props.disabled) return

  const checked = event.target.checked

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    if (checked) {
      if (!newValue.includes(props.value)) {
        newValue.push(props.value)
      }
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}
</script>

<style scoped>
.pendo-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  user-select: none;
}

.pendo-checkbox--disabled {
  cursor: not-allowed;
}

/* Hide native checkbox */
.pendo-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* ========================================
   CHECKBOX BOX
   ======================================== */
.pendo-checkbox__box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 1px;
  flex-shrink: 0;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

/* Unselected state (default) */
.pendo-checkbox__box {
  background-color: #ffffff;
  border: 1px solid #6A6C75; /* gray-70 */
}

/* Unselected hover state */
.pendo-checkbox--hovered .pendo-checkbox__box {
  border-color: #128297; /* teal-70 */
}

/* Selected state */
.pendo-checkbox--checked .pendo-checkbox__box,
.pendo-checkbox--indeterminate .pendo-checkbox__box {
  background-color: #128297; /* teal-70 */
  border-color: #128297; /* teal-70 */
}

/* Disabled unselected state */
.pendo-checkbox--disabled .pendo-checkbox__box {
  background-color: #F4F4F7; /* gray-20 */
  border-color: #DADCE5; /* gray-40 */
}

/* Disabled selected state */
.pendo-checkbox--disabled.pendo-checkbox--checked .pendo-checkbox__box,
.pendo-checkbox--disabled.pendo-checkbox--indeterminate .pendo-checkbox__box {
  background-color: #DADCE5; /* gray-40 */
  border-color: #DADCE5; /* gray-40 */
}

/* ========================================
   CHECKBOX ICON
   ======================================== */
.pendo-checkbox__icon {
  color: #ffffff;
}

/* ========================================
   CHECKBOX LABEL
   ======================================== */
.pendo-checkbox__label {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}

/* Disabled label */
.pendo-checkbox--disabled .pendo-checkbox__label {
  color: #6A6C75; /* gray-70 */
}
</style>

