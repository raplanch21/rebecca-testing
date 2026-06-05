<template>
  <span :class="tagClass">
    {{ formattedValue }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Numeric value for the trend (e.g., 11 for +11%, -1 for -1%) */
  value: {
    type: Number,
    required: true
  },
  /** Size: regular, small */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['small', 'regular'].includes(v)
  }
})

const isPositive = computed(() => props.value >= 0)

const formattedValue = computed(() => {
  const prefix = props.value >= 0 ? '+' : ''
  return `${prefix}${props.value}%`
})

const tagClass = computed(() => {
  return [
    'pendo-trend-tag',
    `pendo-trend-tag--${props.size}`,
    isPositive.value ? 'pendo-trend-tag--positive' : 'pendo-trend-tag--negative'
  ]
})
</script>

<style scoped>
.pendo-trend-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 3px;
  white-space: nowrap;
}

/* Sizes */
.pendo-trend-tag--regular {
  height: 24px;
  padding: 4px 8px;
  font-size: 12.642px;
}

.pendo-trend-tag--small {
  height: 20px;
  padding: 2px 6px;
  font-size: 12.642px;
}

/* Types */
.pendo-trend-tag--positive {
  background-color: var(--green-10, #E3F7ED);
  color: var(--green-110, #005027);
}

.pendo-trend-tag--negative {
  background-color: var(--red-10, #FFF5F5);
  color: var(--red-100, #8A0000);
}
</style>


