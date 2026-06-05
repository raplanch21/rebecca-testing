<template>
  <div class="pendo-number-input" :class="{ 'pendo-number-input--disabled': disabled }">
    <!-- Label -->
    <div v-if="label" class="pendo-number-input__label-wrapper">
      <span class="pendo-number-input__label">{{ label }}</span>
      <span v-if="required" class="pendo-number-input__required">*</span>
      <PendoIcon v-if="showLabelInfo" type="info" :size="12" class="pendo-number-input__label-info" />
    </div>

    <!-- Input container -->
    <div class="pendo-number-input__container" :class="containerClass">
      <!-- Prepend slot -->
      <div v-if="$slots.prepend || prepend" class="pendo-number-input__prepend">
        <slot name="prepend">{{ prepend }}</slot>
      </div>

      <!-- Input wrapper -->
      <div
        class="pendo-number-input__input-wrapper"
        :class="inputWrapperClass"
      >
        <input
          ref="inputRef"
          type="number"
          class="pendo-number-input__input"
          :value="modelValue"
          :disabled="disabled"
          :min="min"
          :max="max"
          :step="step"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        
        <!-- Suffix -->
        <span v-if="suffix" class="pendo-number-input__suffix">{{ suffix }}</span>
        
        <!-- Arrows -->
        <div v-if="showArrows" class="pendo-number-input__arrows">
          <button
            type="button"
            class="pendo-number-input__arrow pendo-number-input__arrow--up"
            :disabled="disabled"
            @click="increment"
            aria-label="Increment"
          >
            <PendoIcon type="chevron-up" :size="16" />
          </button>
          <button
            type="button"
            class="pendo-number-input__arrow pendo-number-input__arrow--down"
            :disabled="disabled"
            @click="decrement"
            aria-label="Decrement"
          >
            <PendoIcon type="chevron-down" :size="16" />
          </button>
        </div>
      </div>

      <!-- Append slot -->
      <div v-if="$slots.append || append" class="pendo-number-input__append">
        <slot name="append">{{ append }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** v-model binding for the number value */
  modelValue: {
    type: [Number, String],
    default: 0
  },
  /** Label text */
  label: {
    type: String,
    default: ''
  },
  /** Show required asterisk */
  required: {
    type: Boolean,
    default: false
  },
  /** Show info icon next to label */
  showLabelInfo: {
    type: Boolean,
    default: false
  },
  /** Placeholder text */
  placeholder: {
    type: String,
    default: ''
  },
  /** Suffix text (e.g., 'px', '%') */
  suffix: {
    type: String,
    default: ''
  },
  /** Prepend text/content */
  prepend: {
    type: String,
    default: ''
  },
  /** Append text/content */
  append: {
    type: String,
    default: ''
  },
  /** Show increment/decrement arrows */
  showArrows: {
    type: Boolean,
    default: false
  },
  /** Minimum value */
  min: {
    type: Number,
    default: -Infinity
  },
  /** Maximum value */
  max: {
    type: Number,
    default: Infinity
  },
  /** Step value for increment/decrement */
  step: {
    type: Number,
    default: 1
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const inputRef = ref(null)
const isFocused = ref(false)
const isHovered = ref(false)

const hasSlots = computed(() => {
  return props.prepend || props.append
})

const containerClass = computed(() => ({
  'pendo-number-input__container--with-slots': hasSlots.value
}))

const inputWrapperClass = computed(() => ({
  'pendo-number-input__input-wrapper--hover': isHovered.value && !isFocused.value && !props.disabled,
  'pendo-number-input__input-wrapper--focused': isFocused.value && !props.disabled,
  'pendo-number-input__input-wrapper--disabled': props.disabled,
  'pendo-number-input__input-wrapper--with-slots': hasSlots.value
}))

const handleInput = (event) => {
  const value = event.target.value === '' ? '' : Number(event.target.value)
  emit('update:modelValue', value)
  emit('change', value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const increment = () => {
  if (props.disabled) return
  const currentValue = Number(props.modelValue) || 0
  const newValue = Math.min(currentValue + props.step, props.max)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const decrement = () => {
  if (props.disabled) return
  const currentValue = Number(props.modelValue) || 0
  const newValue = Math.max(currentValue - props.step, props.min)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// Expose focus method
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<style scoped>
.pendo-number-input {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  width: fit-content;
}

/* Label */
.pendo-number-input__label-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pendo-number-input__label {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
}

.pendo-number-input__required {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #E83B3B;
}

.pendo-number-input__label-info {
  color: var(--gray-100, #2A2C35);
}

/* Container */
.pendo-number-input__container {
  display: inline-flex;
  width: fit-content;
}

/* Prepend/Append slots */
.pendo-number-input__prepend,
.pendo-number-input__append {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: var(--gray-10, #F8F8F9);
  border: 1px solid var(--gray-40, #DADCE5);
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
  height: 36px;
  box-sizing: border-box;
}

.pendo-number-input__prepend {
  border-right: none;
  border-radius: 3px 0 0 3px;
}

.pendo-number-input__append {
  border-left: none;
  border-radius: 0 3px 3px 0;
}

/* Input wrapper */
.pendo-number-input__input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid var(--gray-40, #DADCE5);
  border-radius: 3px;
  transition: border-color 0.15s ease, border-width 0.15s ease;
  box-sizing: border-box;
}

.pendo-number-input__input-wrapper--with-slots {
  border-radius: 0;
}

.pendo-number-input__input-wrapper--hover {
  border-color: var(--gray-80, #4A4C55);
}

.pendo-number-input__input-wrapper--focused {
  border: 2px solid var(--gray-80, #4A4C55);
  padding: 7px; /* Adjust padding to account for thicker border */
}

.pendo-number-input__input-wrapper--disabled {
  background-color: var(--gray-20, #F4F4F7);
  border-color: var(--gray-40, #DADCE5);
}

/* Input */
.pendo-number-input__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  padding: 0;
  min-width: 0;
  -moz-appearance: textfield; /* Firefox: hide native arrows */
}

.pendo-number-input__input::-webkit-outer-spin-button,
.pendo-number-input__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pendo-number-input__input::placeholder {
  color: var(--gray-60, #9A9CA5);
}

.pendo-number-input--disabled .pendo-number-input__input {
  color: var(--gray-70, #6A6C75);
  cursor: not-allowed;
}

/* Suffix */
.pendo-number-input__suffix {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  white-space: nowrap;
}

/* Arrows */
.pendo-number-input__arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pendo-number-input__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--gray-100, #2A2C35);
  transition: color 0.15s ease;
}

.pendo-number-input__arrow:hover:not(:disabled) {
  color: var(--gray-80, #4A4C55);
}

.pendo-number-input__arrow:disabled {
  color: var(--gray-50, #BABCC5);
  cursor: not-allowed;
}
</style>

