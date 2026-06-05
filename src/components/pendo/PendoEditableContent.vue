<template>
  <div
    class="pendo-editable-content"
    :class="{
      'pendo-editable-content--editing': isEditing,
      'pendo-editable-content--disabled': disabled,
      'pendo-editable-content--error': error,
      'pendo-editable-content--empty': empty,
      [`pendo-editable-content--${size}`]: true,
      [`pendo-editable-content--${variant}`]: true
    }"
  >
    <!-- Link Display mode -->
    <div
      v-if="!isEditing && variant === 'link'"
      class="pendo-editable-content__link-display"
      @click="startEditing"
    >
      <span class="pendo-editable-content__link-text">
        <slot>{{ displayValue }}</slot>
      </span>
    </div>

    <!-- Input Display mode (shows as static text when not editing) -->
    <div
      v-else-if="!isEditing && variant === 'input'"
      class="pendo-editable-content__input-display"
      @click="startEditing"
    >
      <span :class="empty ? 'pendo-editable-content__placeholder' : 'pendo-editable-content__value'">
        <slot>{{ displayValue }}</slot>
      </span>
    </div>

    <!-- Edit mode -->
    <div v-else class="pendo-editable-content__edit">
      <input
        ref="inputRef"
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        class="pendo-editable-content__input"
        @blur="handleBlur"
        @keydown.enter="confirmEdit"
        @keydown.escape="cancelEdit"
        @focus="isFocused = true"
      />

      <!-- Action Buttons -->
      <div v-if="showButtons" class="pendo-editable-content__buttons">
        <button
          type="button"
          class="pendo-editable-content__btn pendo-editable-content__btn--confirm"
          @click="confirmEdit"
          aria-label="Confirm"
        >
          <PendoIcon type="check" :size="16" />
        </button>
        <button
          type="button"
          class="pendo-editable-content__btn pendo-editable-content__btn--cancel"
          @click="cancelEdit"
          aria-label="Cancel"
        >
          <PendoIcon type="x" :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** v-model binding for the value */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** Placeholder text when empty */
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  /** Input type */
  type: {
    type: String,
    default: 'text'
  },
  /** Variant: link (teal dashed underline) or input (bordered input field) */
  variant: {
    type: String,
    default: 'input',
    validator: (v) => ['link', 'input'].includes(v)
  },
  /** Size: mini, small, regular */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['mini', 'small', 'regular'].includes(v)
  },
  /** Show confirm/cancel buttons when editing (input variant only) */
  showButtons: {
    type: Boolean,
    default: true
  },
  /** Max length for input */
  maxlength: {
    type: Number,
    default: null
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Error state */
  error: {
    type: Boolean,
    default: false
  },
  /** Empty state (shows placeholder styling) */
  empty: {
    type: Boolean,
    default: false
  },
  /** Edit on click or require explicit action */
  editOnClick: {
    type: Boolean,
    default: true
  },
  /** Confirm on blur (only when showButtons is false) */
  confirmOnBlur: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'edit-start', 'edit-confirm', 'edit-cancel'])

const inputRef = ref(null)
const isEditing = ref(false)
const isFocused = ref(false)
const localValue = ref(props.modelValue)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

const displayValue = computed(() => {
  return props.modelValue || props.placeholder
})

const startEditing = () => {
  if (props.disabled || !props.editOnClick) return

  isEditing.value = true
  localValue.value = props.modelValue
  emit('edit-start')

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
      inputRef.value.select()
      isFocused.value = true
    }
  })
}

const confirmEdit = () => {
  isEditing.value = false
  isFocused.value = false
  emit('update:modelValue', localValue.value)
  emit('edit-confirm', localValue.value)
}

const cancelEdit = () => {
  isEditing.value = false
  isFocused.value = false
  localValue.value = props.modelValue
  emit('edit-cancel')
}

const handleBlur = (event) => {
  // Don't blur if clicking on action buttons
  if (event.relatedTarget && event.relatedTarget.closest('.pendo-editable-content__buttons')) {
    return
  }

  isFocused.value = false

  // Only auto-confirm/cancel on blur if buttons are not shown
  if (!props.showButtons) {
    if (props.confirmOnBlur) {
      confirmEdit()
    } else {
      cancelEdit()
    }
  }
}

// Expose methods for external control
defineExpose({
  startEditing,
  confirmEdit,
  cancelEdit
})
</script>

<style scoped>
.pendo-editable-content {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   SIZES
   ======================================== */
.pendo-editable-content--mini {
  font-size: 12.642px;
  line-height: 1.5;
}

.pendo-editable-content--small {
  font-size: 14.222px;
  line-height: 1.5;
}

.pendo-editable-content--regular {
  font-size: 14.222px;
  line-height: 1.5;
}

/* ========================================
   LINK VARIANT - Display Mode
   ======================================== */
.pendo-editable-content__link-display {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px dashed #128297; /* teal-70 */
}

.pendo-editable-content__link-text {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: #128297; /* teal-70 */
}

.pendo-editable-content__link-display:hover .pendo-editable-content__link-text {
  color: #016479; /* teal-80 */
}

.pendo-editable-content--disabled .pendo-editable-content__link-display {
  cursor: not-allowed;
  opacity: 0.5;
}

/* ========================================
   INPUT VARIANT - Display Mode
   ======================================== */
.pendo-editable-content__input-display {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 18px 0 8px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.pendo-editable-content__input-display:hover {
  border-color: #2A2C35; /* gray-100 */
}

.pendo-editable-content__value {
  color: #2A2C35; /* gray-100 */
}

.pendo-editable-content__placeholder {
  color: #9A9CA5; /* gray-60 */
}

.pendo-editable-content--disabled .pendo-editable-content__input-display {
  cursor: not-allowed;
  background-color: #F4F4F7; /* gray-20 */
  opacity: 0.5;
}

.pendo-editable-content--disabled .pendo-editable-content__input-display:hover {
  border-color: #DADCE5;
}

.pendo-editable-content--error .pendo-editable-content__input-display {
  border-color: #DA1010; /* red-60 */
}

/* ========================================
   EDIT MODE
   ======================================== */
.pendo-editable-content__edit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.pendo-editable-content__input {
  flex: 1;
  height: 36px;
  padding: 0 18px 0 8px;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
  background-color: #ffffff;
  font-family: inherit;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
  outline: none;
  transition: border-color 0.15s ease;
}

.pendo-editable-content__input:focus {
  border-color: #128297; /* teal-70 */
}

.pendo-editable-content__input::placeholder {
  color: #9A9CA5; /* gray-60 */
}

.pendo-editable-content--error .pendo-editable-content__input {
  border-color: #DA1010; /* red-60 */
}

/* ========================================
   ACTION BUTTONS
   ======================================== */
.pendo-editable-content__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pendo-editable-content__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px 12px;
  transition: background-color 0.15s ease;
}

.pendo-editable-content__btn--confirm {
  background-color: #128297; /* teal-70 */
  color: #ffffff;
}

.pendo-editable-content__btn--confirm:hover {
  background-color: #016479; /* teal-80 */
}

.pendo-editable-content__btn--cancel {
  background-color: #EAECF1; /* gray-30 */
  color: #2A2C35; /* gray-100 */
}

.pendo-editable-content__btn--cancel:hover {
  background-color: #DADCE5; /* gray-40 */
}
</style>

