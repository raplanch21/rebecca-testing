<template>
  <div
    class="pendo-select"
    :class="{
      'pendo-select--disabled': disabled,
      'pendo-select--error': error,
      'pendo-select--open': isOpen,
      [`pendo-select--${size}`]: size
    }">
    <!-- Label -->
    <label v-if="label" class="pendo-select__label">
      {{ label }}
      <span v-if="required" class="pendo-select__required">*</span>
    </label>
    
    <!-- Trigger -->
    <div
      ref="triggerRef"
      class="pendo-select__trigger"
      tabindex="0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.esc="close"
      @keydown.down.prevent="openAndFocusFirst">
      <span v-if="selectedLabel" class="pendo-select__value">
        <PendoIcon v-if="selectedOption?.icon" :type="selectedOption.icon" :size="16" class="pendo-select__value-icon" />
        {{ selectedLabel }}
      </span>
      <span v-else class="pendo-select__placeholder">{{ placeholder }}</span>
      <PendoIcon
        type="chevron-down"
        :size="16"
        class="pendo-select__arrow"
        :class="{ 'pendo-select__arrow--open': isOpen }" />
    </div>
    
    <!-- Dropdown -->
    <Transition :name="shouldOpenUpward ? 'dropdown-upward' : 'dropdown'">
      <div 
        v-if="isOpen" 
        ref="dropdownRef" 
        class="pendo-select__dropdown pendo-dropdown-scroll" 
        :class="{ 'pendo-select__dropdown--upward': shouldOpenUpward }"
        :style="dropdownStyle">
        <div
          v-for="(option, idx) in options"
          :key="option.value"
          class="pendo-select__option"
          :class="{
            'pendo-select__option--selected': option.value === modelValue,
            'pendo-select__option--disabled': option.disabled,
            'pendo-select__option--editing': editingIndex === idx
          }"
          @click="editingIndex !== idx && selectOption(option)">
          <PendoIcon v-if="option.icon" :type="option.icon" :size="16" class="pendo-select__option-icon" />
          <!-- Inline edit mode -->
          <input
            v-if="editable && editingIndex === idx"
            ref="editInputRef"
            v-model="editDraft"
            class="pendo-select__edit-input"
            @click.stop
            @keydown.enter.prevent="commitEdit(idx)"
            @keydown.esc.prevent="cancelEdit"
            @blur="commitEdit(idx)"
          />
          <!-- Normal label + description + edit button -->
          <template v-else>
            <div class="pendo-select__option-content">
              <span class="pendo-select__option-label">{{ option.label }}</span>
              <span v-if="option.description" class="pendo-select__option-description">{{ option.description }}</span>
            </div>
            <button
              v-if="editable"
              class="pendo-select__edit-btn"
              title="Rename"
              @click.stop="startEdit(idx, option.label)"
            >
              <PendoIcon type="edit" :size="12" />
            </button>
          </template>
        </div>
      </div>
    </Transition>
    
    <!-- Helper text -->
    <div v-if="helperText || error" class="pendo-select__helper" :class="{ 'pendo-select__helper--error': error }">
      {{ error || helperText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Selected value (v-model) */
  modelValue: {
    type: [String, Number, Boolean, null],
    default: null
  },
  /** Options array: [{ label, value, disabled? }] */
  options: {
    type: Array,
    default: () => []
  },
  /** Label text */
  label: {
    type: String,
    default: ''
  },
  /** Placeholder text */
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Required field */
  required: {
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
  /** Size: medium, small */
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium'].includes(v)
  },
  /** Open dropdown upward instead of downward */
  openUpward: {
    type: Boolean,
    default: false
  },
  /** Allow inline renaming of option labels */
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'update:options'])

const triggerRef = ref(null)
const dropdownRef = ref(null)
const editInputRef = ref(null)
const isOpen = ref(false)
const dropdownStyle = ref({})
const shouldOpenUpward = ref(false)
const editingIndex = ref(null)
const editDraft = ref('')

const selectedOption = computed(() => {
  return props.options.find(o => o.value === props.modelValue)
})

const selectedLabel = computed(() => {
  return selectedOption.value?.label || ''
})

function updateDropdownPosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  
  // Calculate available space above and below the trigger
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  
  // Minimum dropdown height needed (accounting for padding and options)
  const estimatedDropdownHeight = Math.min(240, props.options.length * 42 + 16)
  
  // Determine whether to open upward or downward
  // Prefer downward unless there's insufficient space below and more space above
  const useUpward = props.openUpward || (spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow)
  shouldOpenUpward.value = useUpward
  
  // Find the closest card or modal body to constrain height
  let container = triggerRef.value.closest('.pendo-card__body') || 
                  triggerRef.value.closest('.pendo-modal__body') ||
                  triggerRef.value.closest('.blade-body')
  
  let maxHeight = 240 // default
  if (container) {
    const containerRect = container.getBoundingClientRect()
    const containerStyle = window.getComputedStyle(container)
    const paddingBottom = parseInt(containerStyle.paddingBottom) || 0
    
    if (useUpward) {
      // Available space = trigger top - container top - buffer
      const availableSpace = rect.top - containerRect.top - 12
      maxHeight = Math.min(240, Math.max(120, availableSpace))
    } else {
      // Available space = container bottom - padding - trigger bottom - buffer
      const availableSpace = containerRect.bottom - paddingBottom - rect.bottom - 12
      maxHeight = Math.min(240, Math.max(120, availableSpace))
    }
  } else {
    // Use viewport space if no container found
    maxHeight = useUpward 
      ? Math.min(240, Math.max(120, spaceAbove - 12))
      : Math.min(240, Math.max(120, spaceBelow - 12))
  }
  
  if (useUpward) {
    dropdownStyle.value = {
      bottom: `${window.innerHeight - rect.top + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      maxHeight: `${maxHeight}px`
    }
  } else {
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      maxHeight: `${maxHeight}px`
    }
  }
}

function toggle() {
  if (props.disabled) return
  if (!isOpen.value) {
    updateDropdownPosition()
  }
  isOpen.value = !isOpen.value
}

function open() {
  if (props.disabled) return
  updateDropdownPosition()
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function openAndFocusFirst() {
  open()
}

function selectOption(option) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  close()
}

function startEdit (idx, currentLabel) {
  editingIndex.value = idx
  editDraft.value = currentLabel
  nextTick(() => {
    const inputs = editInputRef.value
    const el = Array.isArray(inputs) ? inputs[0] : inputs
    el?.focus()
    el?.select()
  })
}

function commitEdit (idx) {
  if (editingIndex.value === null) return
  const trimmed = editDraft.value.trim()
  if (trimmed && trimmed !== props.options[idx].label) {
    const updated = props.options.map((o, i) =>
      i === idx ? { ...o, label: trimmed } : { ...o }
    )
    emit('update:options', updated)
  }
  editingIndex.value = null
}

function cancelEdit () {
  editingIndex.value = null
}

function handleClickOutside(event) {
  if (triggerRef.value && !triggerRef.value.contains(event.target)) {
    close()
  }
}

function handleScrollOrResize() {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScrollOrResize, true)
  window.addEventListener('resize', handleScrollOrResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScrollOrResize, true)
  window.removeEventListener('resize', handleScrollOrResize)
})
</script>

<style scoped>
.pendo-select {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  width: 100%;
  min-width: 120px;
  display: inline-block;
}

.pendo-select__label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2a2c35;
  margin-bottom: 6px;
}

.pendo-select__required {
  color: #db2547;
  margin-left: 2px;
}

.pendo-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.pendo-select--medium .pendo-select__trigger {
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
}

.pendo-select--small .pendo-select__trigger {
  height: 32px;
  padding: 0 10px;
  font-size: 13px;
}

.pendo-select__trigger:focus {
  outline: none;
  border-color: #2a2c35; /* gray-100 */
  box-shadow: 0 0 0 2px rgba(42, 44, 53, 0.15);
}

.pendo-select--error .pendo-select__trigger {
  border-color: #db2547;
}

.pendo-select--disabled .pendo-select__trigger {
  background-color: #f5f6f8;
  cursor: not-allowed;
  color: #9a9ca5;
}

.pendo-select__value {
  color: #2a2c35;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pendo-select__value-icon {
  flex-shrink: 0;
}

.pendo-select__placeholder {
  color: #9a9ca5;
}

.pendo-select__arrow {
  color: #6a6c75;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.pendo-select__arrow--open {
  transform: rotate(180deg);
}

.pendo-select__dropdown {
  position: fixed;
  margin-top: 4px;
  background: white;
  border: 1px solid #dadce5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  z-index: 1001;
  max-height: 240px;
  overflow-y: auto;
  min-width: 180px;
  width: max-content;
}

.pendo-select__option {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #2a2c35;
  transition: background-color 0.1s ease;
}

.pendo-select__option-icon {
  flex-shrink: 0;
}

.pendo-select__option:hover {
  background-color: #f5f6f8;
}

.pendo-select__option--selected {
  background-color: rgba(0, 81, 100, 0.08); /* teal-90 at 8% opacity */
  color: #2a2c35;
  font-weight: 600;
}

.pendo-select__option--selected:hover {
  background-color: rgba(0, 81, 100, 0.12); /* teal-90 at 12% opacity */
}

.pendo-select__option--disabled {
  color: #9a9ca5;
  cursor: not-allowed;
}

.pendo-select__option--disabled:hover {
  background-color: transparent;
}

.pendo-select__option-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.pendo-select__option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  line-height: 1.5;
}

.pendo-select__option-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #6a6c75;
  white-space: normal;
}

.pendo-select__edit-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  background: none;
  border-radius: 4px;
  color: #9a9ca5;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: color 0.1s, background 0.1s;
}

.pendo-select__option:hover .pendo-select__edit-btn {
  display: flex;
}

.pendo-select__edit-btn:hover {
  color: #2a2c35;
  background: rgba(0, 0, 0, 0.06);
}

.pendo-select__edit-input {
  flex: 1;
  min-width: 0;
  border: 1px solid #dadce5;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 14px;
  color: #2a2c35;
  outline: none;
  background: white;
}

.pendo-select__edit-input:focus {
  border-color: #2a2c35;
  box-shadow: 0 0 0 2px rgba(42, 44, 53, 0.12);
}

.pendo-select__option--editing {
  background-color: #f5f6f8;
}

.pendo-select__check {
  color: #128297; /* teal-70 */
}

.pendo-select__helper {
  font-size: 12px;
  color: #6a6c75;
  margin-top: 4px;
}

.pendo-select__helper--error {
  color: #db2547;
}

/* Dropdown transition - downward */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Dropdown transition - upward */
.dropdown-upward-enter-active,
.dropdown-upward-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-upward-enter-from,
.dropdown-upward-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

