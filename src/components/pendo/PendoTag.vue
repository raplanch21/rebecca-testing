<template>
  <span :class="tagClass">
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Tag label text */
  label: {
    type: String,
    default: ''
  },
  /** Tag type: info, warning, error, success, default, filter, filter-active */
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'info', 'warning', 'error', 'success', 'filter', 'filter-active'].includes(v)
  },
  /** Size: regular, small */
  size: {
    type: String,
    default: 'regular',
    validator: (v) => ['small', 'regular'].includes(v)
  }
})

const tagClass = computed(() => {
  return [
    'pendo-tag',
    `pendo-tag--${props.type}`,
    `pendo-tag--${props.size}`
  ]
})
</script>

<style scoped>
.pendo-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 3px;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}

.pendo-tag--filter,
.pendo-tag--filter-active {
  cursor: default;
  user-select: none;
}

/* Sizes */
.pendo-tag--regular {
  height: 24px;
  padding: 0 10px;
  font-size: 12.6px;
}

.pendo-tag--small {
  height: 20px;
  padding: 0 8px;
  font-size: 12.6px;
}

/* Filter pill size override */
.pendo-tag--filter.pendo-tag--regular,
.pendo-tag--filter-active.pendo-tag--regular {
  height: 26px;
  padding: 1.5px 12px 0 12px;
  font-size: 12.642px;
  font-weight: 400;
  line-height: 1;
  border-radius: 50px;
  gap: 4px;
}

/* Types */
.pendo-tag--default {
  background-color: #EAECF1; /* gray-30 */
  color: #2A2C35; /* gray-100 */
  border: 1px solid #EAECF1;
}

.pendo-tag--info {
  background-color: #BABCC5; /* gray-50 */
  color: #ffffff;
  border: 1px solid #BABCC5;
}

.pendo-tag--warning {
  background-color: #DBA211; /* yellow-70 */
  color: #ffffff;
  border: 1px solid #DBA211;
}

.pendo-tag--error {
  background-color: #DA1010; /* red-60 */
  color: #ffffff;
  border: 1px solid #DA1010;
}

.pendo-tag--success {
  background-color: #0D8050; /* green-70 */
  color: #ffffff;
  border: 1px solid #0D8050;
}

.pendo-tag--filter {
  background-color: #ffffff; /* white/gray-0 */
  color: #1C1D23; /* gray-110 */
  border: 1px solid #DADCE5; /* gray-40 */
}

.pendo-tag--filter-active {
  background-color: #EAECF1; /* gray-20 */
  color: #1C1D23; /* gray-110 */
  border: 1px solid #DADCE5; /* gray-40 */
}
</style>

