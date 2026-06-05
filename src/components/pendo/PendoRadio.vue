<template>
  <label
    class="pendo-radio"
    :class="{
      'pendo-radio--checked': isChecked,
      'pendo-radio--disabled': disabled
    }"
  >
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
      class="pendo-radio__native"
    />
    <span class="pendo-radio__input">
      <span v-if="isChecked" class="pendo-radio__inner-dot" />
    </span>
    <span v-if="label || $slots.default" class="pendo-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** v-model binding for selected value */
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  /** Value for this radio option */
  value: {
    type: [String, Number, Boolean],
    default: ''
  },
  /** Radio label text */
  label: {
    type: String,
    default: ''
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Name attribute for radio group */
  name: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const handleChange = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped>
.pendo-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
}

.pendo-radio--disabled {
  cursor: not-allowed;
  color: var(--gray-70, #6A6C75);
}

.pendo-radio__native {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.pendo-radio__input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--gray-70, #6A6C75);
  background-color: #ffffff;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.pendo-radio__inner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ffffff;
}

.pendo-radio__label {
  margin-left: 8px;
}

/* Hover state for unselected */
.pendo-radio:not(.pendo-radio--checked):not(.pendo-radio--disabled):hover .pendo-radio__input {
  border-color: var(--teal-70, #128297);
}

/* Selected state */
.pendo-radio--checked .pendo-radio__input {
  background-color: var(--teal-70, #128297);
  border-color: var(--teal-70, #128297);
}

/* Disabled state */
.pendo-radio--disabled .pendo-radio__input {
  background-color: var(--gray-20, #F4F4F7);
  border-color: var(--gray-40, #DADCE5);
}

.pendo-radio--disabled.pendo-radio--checked .pendo-radio__input {
  background-color: var(--gray-40, #DADCE5);
  border-color: var(--gray-40, #DADCE5);
}
</style>

