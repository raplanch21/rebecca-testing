<template>
  <span class="pendo-filter-tag">
    <PendoIcon v-if="icon" :type="icon" :size="12" class="pendo-filter-tag__icon" />
    <span class="pendo-filter-tag__label">{{ label }}</span>
  </span>
</template>

<script setup>
import PendoIcon from './PendoIconLucide.vue'

defineProps({
  /** Tag label text */
  label: {
    type: String,
    required: true
  },
  /** Icon type (optional) */
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.pendo-filter-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 24px;
  padding: 4px 8px;
  background-color: var(--gray-0, #FFFFFF);
  border: 1px solid var(--gray-40, #DADCE5);
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 1.5;
  color: var(--gray-110, #1A1C25);
  white-space: nowrap;
}

.pendo-filter-tag__icon {
  flex-shrink: 0;
  color: var(--gray-100, #2A2C35);
}

.pendo-filter-tag__label {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


