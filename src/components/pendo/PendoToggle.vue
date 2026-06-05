<template>
  <label
    class="pendo-toggle"
    :class="{
      'pendo-toggle--inline': !!inlineLabel,
      'pendo-toggle--checked': modelValue,
      'pendo-toggle--disabled': disabled
    }"
    @click.prevent>
    <!-- Top Label -->
    <div v-if="topLabel" class="pendo-toggle__label pendo-toggle__label--top">
      {{ topLabel }}
    </div>
    
    <!-- Hidden checkbox for form compatibility -->
    <input
      :checked="modelValue"
      class="pendo-toggle__input"
      tabindex="-1"
      aria-hidden="true"
      :disabled="disabled"
      type="checkbox"
      @change="toggle">
    
    <!-- Toggle slide -->
    <div
      class="pendo-toggle__slide"
      role="switch"
      :aria-checked="String(modelValue)"
      :aria-disabled="String(disabled)"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
      @keyup.space.prevent="toggle"
      @keydown.space.prevent>
      <div class="pendo-toggle__inner">
        <div class="pendo-toggle__handle" />
        <div class="pendo-toggle__icon">
          <svg
            v-if="modelValue"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Inline Label -->
    <div v-if="inlineLabel" class="pendo-toggle__label pendo-toggle__label--inline">
      {{ inlineLabel }}
    </div>
    
    <!-- Bottom Label -->
    <div v-if="bottomLabel" class="pendo-toggle__label pendo-toggle__label--bottom">
      {{ bottomLabel }}
    </div>
  </label>
</template>

<script setup>
defineProps({
  /** Bound value (v-model) */
  modelValue: {
    type: Boolean,
    required: true
  },
  /** Disable user interactions */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Label displayed above toggle */
  topLabel: {
    type: String,
    default: ''
  },
  /** Label displayed below toggle */
  bottomLabel: {
    type: String,
    default: ''
  },
  /** Label displayed inline next to toggle */
  inlineLabel: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

function toggle() {
  if (arguments[0]?.target?.disabled) return
  emit('update:modelValue', !arguments[0]?.target?.checked ?? true)
  emit('change', !arguments[0]?.target?.checked ?? true)
}
</script>

<style scoped>
.pendo-toggle {
  display: inline-block;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.pendo-toggle--inline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.pendo-toggle__label {
  font-size: 14px;
  color: #2a2c35;
}

.pendo-toggle__label--top {
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
}

.pendo-toggle__label--bottom {
  color: #6a6c75;
  margin-top: 4px;
  display: block;
}

.pendo-toggle__label--inline {
  font-weight: 500;
}

.pendo-toggle__input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.pendo-toggle__slide {
  box-sizing: content-box;
  background-color: #c4c6cf;
  display: block;
  height: 20px;
  width: 40px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
}

.pendo-toggle__slide:focus-visible {
  outline: 2px solid #2a2c35; /* gray-100 */
  outline-offset: 2px;
}

.pendo-toggle__inner {
  color: white;
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
  transition: all 0.15s ease;
}

.pendo-toggle__handle {
  background-color: white;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  transition: transform 0.15s ease;
}

.pendo-toggle__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 4px;
  width: 16px;
  height: 100%;
}

/* Checked state */
.pendo-toggle--checked .pendo-toggle__slide {
  background-color: #009855;
}

.pendo-toggle--checked .pendo-toggle__inner {
  flex-direction: row;
}

.pendo-toggle--checked .pendo-toggle__handle {
  transform: translateX(20px);
}

.pendo-toggle--checked .pendo-toggle__icon {
  padding-left: 4px;
  padding-right: 0;
}

/* Disabled state */
.pendo-toggle--disabled .pendo-toggle__slide {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

