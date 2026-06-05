<template>
  <button
    :disabled="disabled"
    type="button"
    :class="buttonClass"
    :aria-label="ariaLabel || (modelValue ? 'Remove from favorites' : 'Add to favorites')"
    :aria-pressed="modelValue"
    @click="handleClick"
  >
    <svg
      :class="['pendo-favorite-button__icon', { 'pendo-favorite-button__icon--animating': isAnimating }]"
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.33334L9.79333 5.36668L14.2267 5.84001L10.88 8.82668L11.8 13.1867L8 10.9467L4.2 13.1867L5.12 8.82668L1.77333 5.84001L6.20667 5.36668L8 1.33334Z"
        :stroke="iconColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :fill="modelValue ? iconColor : 'none'"
      />
    </svg>
    <!-- Animation particles (CSS only, simplified from Lottie) -->
    <span v-if="isAnimating" class="pendo-favorite-button__particles">
      <span class="pendo-favorite-button__particle"></span>
      <span class="pendo-favorite-button__particle"></span>
      <span class="pendo-favorite-button__particle"></span>
      <span class="pendo-favorite-button__particle"></span>
      <span class="pendo-favorite-button__particle"></span>
      <span class="pendo-favorite-button__particle"></span>
    </span>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  /** v-model binding for favorite state */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** Size: regular (16px icon), small (14px icon), mini (12px icon) */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['mini', 'small', 'regular'].includes(v)
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Aria label for accessibility */
  ariaLabel: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'click'])

const isAnimating = ref(false)

const iconSize = computed(() => {
  return { mini: 12, small: 14, regular: 16 }[props.size]
})

const iconColor = computed(() => {
  return props.modelValue ? '#FF9237' : '#2A2C35' // orange-50 or gray-100
})

const buttonClass = computed(() => {
  return [
    'pendo-favorite-button',
    `pendo-favorite-button--${props.size}`,
    {
      'pendo-favorite-button--selected': props.modelValue,
      'pendo-favorite-button--disabled': props.disabled,
      'pendo-favorite-button--animating': isAnimating.value
    }
  ]
})

const handleClick = (event) => {
  if (props.disabled) return
  
  // Trigger animation when selecting (not when deselecting)
  if (!props.modelValue) {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 400)
  }
  
  emit('update:modelValue', !props.modelValue)
  emit('click', event)
}
</script>

<style scoped>
.pendo-favorite-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 4px;
  border-radius: 3px;
  position: relative;
}

/* Sizes */
.pendo-favorite-button--regular {
  width: 24px;
  height: 24px;
}

.pendo-favorite-button--small {
  width: 22px;
  height: 22px;
}

.pendo-favorite-button--mini {
  width: 20px;
  height: 20px;
}

/* Hover state */
.pendo-favorite-button:hover:not(:disabled) {
  background-color: #EAECF1; /* gray-30 */
}

/* Selected state */
.pendo-favorite-button--selected:hover:not(:disabled) {
  background-color: #FFF4EB; /* light orange tint */
}

/* Disabled state */
.pendo-favorite-button--disabled,
.pendo-favorite-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus state */
.pendo-favorite-button:focus-visible:not(:disabled) {
  outline: 2px solid #128297; /* teal-70 */
  outline-offset: 2px;
}

/* Icon */
.pendo-favorite-button__icon {
  transition: transform 0.2s ease;
}

.pendo-favorite-button__icon--animating {
  animation: star-pop 0.4s ease-out;
}

@keyframes star-pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

/* Particles animation */
.pendo-favorite-button__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pendo-favorite-button__particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: #FFB571; /* orange-40 */
  border-radius: 50%;
  animation: particle-burst 0.4s ease-out forwards;
}

.pendo-favorite-button__particle:nth-child(1) {
  top: 50%;
  left: 50%;
  animation-delay: 0ms;
  --tx: -12px;
  --ty: -8px;
}

.pendo-favorite-button__particle:nth-child(2) {
  top: 50%;
  left: 50%;
  animation-delay: 30ms;
  --tx: 10px;
  --ty: -10px;
}

.pendo-favorite-button__particle:nth-child(3) {
  top: 50%;
  left: 50%;
  animation-delay: 60ms;
  --tx: 12px;
  --ty: 4px;
}

.pendo-favorite-button__particle:nth-child(4) {
  top: 50%;
  left: 50%;
  animation-delay: 90ms;
  --tx: -8px;
  --ty: 10px;
}

.pendo-favorite-button__particle:nth-child(5) {
  top: 50%;
  left: 50%;
  animation-delay: 45ms;
  --tx: 4px;
  --ty: 12px;
}

.pendo-favorite-button__particle:nth-child(6) {
  top: 50%;
  left: 50%;
  animation-delay: 75ms;
  --tx: -10px;
  --ty: 2px;
}

@keyframes particle-burst {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    transform: translate(calc(-50% + var(--tx) * 0.5), calc(-50% + var(--ty) * 0.5)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
    opacity: 0;
  }
}
</style>

