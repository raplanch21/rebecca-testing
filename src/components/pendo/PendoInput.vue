<template>
  <div
    class="pendo-input"
    :class="{
      'pendo-input--disabled': disabled,
      'pendo-input--error': error,
      'pendo-input--focused': isFocused,
      [`pendo-input--${size}`]: size
    }">
    <!-- Label -->
    <label v-if="label" class="pendo-input__label">
      {{ label }}
      <span v-if="required" class="pendo-input__required">*</span>
    </label>
    
    <!-- Input wrapper -->
    <div class="pendo-input__wrapper">
      <!-- Prefix -->
      <span v-if="$slots.prefix || prefixIcon" class="pendo-input__prefix">
        <slot name="prefix">
          <PendoIcon v-if="prefixIcon" :type="prefixIcon" :size="16" />
        </slot>
      </span>
      
      <!-- Input -->
      <input
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        class="pendo-input__inner"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="$emit('enter', $event)">
      
      <!-- Suffix -->
      <span v-if="$slots.suffix || suffixIcon || clearable" class="pendo-input__suffix">
        <PendoIcon
          v-if="clearable && modelValue"
          type="x"
          :size="16"
          class="pendo-input__clear"
          @click="clear" />
        <slot name="suffix">
          <PendoIcon v-if="suffixIcon" :type="suffixIcon" :size="16" />
        </slot>
      </span>
    </div>
    
    <!-- Helper text -->
    <div v-if="helperText || error" class="pendo-input__helper" :class="{ 'pendo-input__helper--error': error }">
      {{ error || helperText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PendoIcon from './PendoIcon.vue'

defineProps({
  /** Input value (v-model) */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** Input label */
  label: {
    type: String,
    default: ''
  },
  /** Placeholder text */
  placeholder: {
    type: String,
    default: ''
  },
  /** Input type */
  type: {
    type: String,
    default: 'text'
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Readonly state */
  readonly: {
    type: Boolean,
    default: false
  },
  /** Required field */
  required: {
    type: Boolean,
    default: false
  },
  /** Show clear button */
  clearable: {
    type: Boolean,
    default: false
  },
  /** Error message */
  error: {
    type: String,
    default: ''
  },
  /** Helper text */
  helperText: {
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
  /** Max length */
  maxlength: {
    type: [String, Number],
    default: null
  },
  /** Size: medium, small */
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'enter', 'clear'])

const inputRef = ref(null)
const isFocused = ref(false)

function onInput(event) {
  emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}

function onFocus(event) {
  isFocused.value = true
  emit('focus', event)
}

function onBlur(event) {
  isFocused.value = false
  emit('blur', event)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function focus() {
  inputRef.value?.focus()
}

defineExpose({ focus })
</script>

<style scoped>
.pendo-input {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  width: 100%;
}

.pendo-input__label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2a2c35;
  margin-bottom: 6px;
}

.pendo-input__required {
  color: #db2547;
  margin-left: 2px;
}

.pendo-input__wrapper {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.pendo-input--focused .pendo-input__wrapper {
  border-color: #2a2c35; /* gray-100 */
  box-shadow: 0 0 0 2px rgba(42, 44, 53, 0.15);
}

.pendo-input--error .pendo-input__wrapper {
  border-color: #db2547;
}

.pendo-input--error.pendo-input--focused .pendo-input__wrapper {
  box-shadow: 0 0 0 3px rgba(219, 37, 71, 0.1);
}

.pendo-input--disabled .pendo-input__wrapper {
  background-color: #f5f6f8;
  cursor: not-allowed;
}

.pendo-input__inner {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #2a2c35;
  width: 100%;
}

.pendo-input__inner::placeholder {
  color: #9a9ca5;
}

.pendo-input__inner:disabled {
  cursor: not-allowed;
  color: #9a9ca5;
}

/* Sizes */
.pendo-input--medium .pendo-input__wrapper {
  height: 36px;
  padding: 0 12px;
}

.pendo-input--medium .pendo-input__inner {
  font-size: 14px;
}

.pendo-input--small .pendo-input__wrapper {
  height: 32px;
  padding: 0 10px;
}

.pendo-input--small .pendo-input__inner {
  font-size: 13px;
}

.pendo-input__prefix,
.pendo-input__suffix {
  display: flex;
  align-items: center;
  color: #6a6c75;
}

.pendo-input__prefix {
  margin-right: 8px;
}

.pendo-input__suffix {
  margin-left: 8px;
}

.pendo-input__clear {
  cursor: pointer;
  transition: color 0.15s ease;
}

.pendo-input__clear:hover {
  color: #2a2c35;
}

.pendo-input__helper {
  font-size: 12px;
  color: #6a6c75;
  margin-top: 4px;
}

.pendo-input__helper--error {
  color: #db2547;
}
</style>

