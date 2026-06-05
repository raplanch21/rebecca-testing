<template>
  <span
    v-if="visible"
    class="pendo-text-cursor"
    :class="{ 'pendo-text-cursor--blinking': blinking }"
    :style="cursorStyle"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Whether the cursor is visible */
  visible: {
    type: Boolean,
    default: true
  },
  /** Whether the cursor should blink */
  blinking: {
    type: Boolean,
    default: true
  },
  /** Cursor height (e.g., '17px', '1em') */
  height: {
    type: String,
    default: '17px'
  },
  /** Cursor color */
  color: {
    type: String,
    default: '#2A2C35' // gray-100
  }
})

const cursorStyle = computed(() => ({
  height: props.height,
  backgroundColor: props.color
}))
</script>

<style scoped>
.pendo-text-cursor {
  display: inline-block;
  width: 1px;
  vertical-align: middle;
}

.pendo-text-cursor--blinking {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>

