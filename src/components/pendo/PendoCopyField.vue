<template>
  <div class="pendo-copy-field">
    <!-- Label -->
    <label v-if="label" class="pendo-copy-field__label">{{ label }}</label>
    
    <!-- Field -->
    <div class="pendo-copy-field__wrapper">
      <input
        ref="inputRef"
        :value="value"
        :type="masked && !isRevealed ? 'password' : 'text'"
        class="pendo-copy-field__input"
        readonly
        @focus="$event.target.select()">
      
      <div class="pendo-copy-field__actions">
        <!-- Reveal/Hide button for masked fields -->
        <button
          v-if="masked"
          class="pendo-copy-field__action"
          :title="isRevealed ? 'Hide' : 'Reveal'"
          @click="toggleReveal">
          <PendoIcon :type="isRevealed ? 'eye-off' : 'eye'" :size="16" />
        </button>
        
        <!-- Copy button -->
        <button
          class="pendo-copy-field__action"
          title="Copy to clipboard"
          @click="copyToClipboard">
          <PendoIcon :type="copied ? 'check' : 'copy'" :size="16" />
        </button>
      </div>
    </div>
    
    <!-- Copied feedback -->
    <Transition name="fade">
      <div v-if="copied" class="pendo-copy-field__feedback">
        Copied to clipboard
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Value to display and copy */
  value: {
    type: String,
    default: ''
  },
  /** Field label */
  label: {
    type: String,
    default: ''
  },
  /** Mask the value (like a password) */
  masked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['copy'])

const inputRef = ref(null)
const copied = ref(false)
const isRevealed = ref(false)

function toggleReveal() {
  isRevealed.value = !isRevealed.value
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    emit('copy', props.value)
    
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    inputRef.value?.select()
    document.execCommand('copy')
    copied.value = true
    
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.pendo-copy-field {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
}

.pendo-copy-field__label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2a2c35;
  margin-bottom: 6px;
}

.pendo-copy-field__wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f6f8;
  border: 1px solid #dadce5;
  border-radius: 3px;
  height: 36px;
  overflow: hidden;
}

.pendo-copy-field__input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0 12px;
  font-size: 14px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: #2a2c35;
  outline: none;
  min-width: 0;
}

.pendo-copy-field__input:focus {
  background-color: #eaecf1;
}

.pendo-copy-field__actions {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: 4px;
}

.pendo-copy-field__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  color: #6a6c75;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.pendo-copy-field__action:hover {
  background-color: #eaecf1;
  color: #2a2c35;
}

.pendo-copy-field__feedback {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 12px;
  color: #009855;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

