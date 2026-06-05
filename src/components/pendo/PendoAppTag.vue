<template>
  <span class="pendo-app-tag">
    <PendoIcon v-if="icon" :type="icon" :size="12" class="pendo-app-tag__icon" />
    <span class="pendo-app-tag__label">{{ label }}</span>
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
.pendo-app-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 27px;
  padding: 0 6px;
  max-width: 180px;
  background-color: var(--gray-20, #F4F4F7);
  border: 1px solid var(--gray-20, #F4F4F7);
  border-radius: 3px;
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  font-size: 14.222px;
  line-height: 1.2;
  color: var(--gray-110, #1A1C25);
  white-space: nowrap;
  overflow: visible;
}

.pendo-app-tag__icon {
  flex-shrink: 0;
  color: var(--gray-110, #1A1C25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pendo-app-tag__label {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
</style>


