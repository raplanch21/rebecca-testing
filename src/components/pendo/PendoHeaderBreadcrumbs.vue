<template>
  <div class="pendo-header-breadcrumbs">
    <!-- Back button -->
    <button
      type="button"
      class="pendo-header-breadcrumbs__back-btn"
      @click="$emit('back-click')"
    >
      <PendoIcon type="arrow-left" :size="16" />
      <span class="pendo-header-breadcrumbs__back-text">{{ backLabel }}</span>
    </button>

    <!-- Divider -->
    <div class="pendo-header-breadcrumbs__divider-wrapper">
      <div class="pendo-header-breadcrumbs__divider" />
    </div>

    <!-- Recent dropdown trigger -->
    <button
      type="button"
      class="pendo-header-breadcrumbs__recent-btn"
      :class="{ 'pendo-header-breadcrumbs__recent-btn--open': isRecentOpen }"
      @click="handleRecentClick"
    >
      <span class="pendo-header-breadcrumbs__recent-text">{{ recentLabel }}</span>
      <PendoIcon
        :type="isRecentOpen ? 'chevron-up' : 'chevron-down'"
        :size="16"
        class="pendo-header-breadcrumbs__recent-chevron"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Back button label */
  backLabel: {
    type: String,
    default: 'Back'
  },
  /** Recent dropdown label */
  recentLabel: {
    type: String,
    default: 'Recent'
  },
  /** Controlled open state for recent dropdown */
  recentOpen: {
    type: Boolean,
    default: undefined
  }
})

const emit = defineEmits(['back-click', 'recent-click', 'recent-toggle'])

// Internal state for uncontrolled mode
const internalOpen = ref(false)

// Use controlled state if provided, otherwise use internal state
const isRecentOpen = props.recentOpen !== undefined ? props.recentOpen : internalOpen.value

const handleRecentClick = () => {
  if (props.recentOpen === undefined) {
    internalOpen.value = !internalOpen.value
  }
  emit('recent-click')
  emit('recent-toggle', props.recentOpen !== undefined ? !props.recentOpen : internalOpen.value)
}

defineExpose({
  closeRecent: () => { internalOpen.value = false }
})
</script>

<style scoped>
.pendo-header-breadcrumbs {
  display: flex;
  align-items: center;
  padding-left: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   BACK BUTTON
   ======================================== */
.pendo-header-breadcrumbs__back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: #128297; /* teal-70 */
  transition: color 0.15s ease;
}

.pendo-header-breadcrumbs__back-btn:hover {
  color: #016479; /* teal-80 */
}

.pendo-header-breadcrumbs__back-text {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
}

/* ========================================
   DIVIDER
   ======================================== */
.pendo-header-breadcrumbs__divider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 38px;
  padding: 0 10px;
}

.pendo-header-breadcrumbs__divider {
  width: 1px;
  height: 20px;
  background-color: #EAECF1; /* gray-30 */
}

/* ========================================
   RECENT DROPDOWN
   ======================================== */
.pendo-header-breadcrumbs__recent-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #128297; /* teal-70 */
  transition: color 0.15s ease;
}

.pendo-header-breadcrumbs__recent-btn:hover {
  color: #016479; /* teal-80 */
}

.pendo-header-breadcrumbs__recent-text {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
}

.pendo-header-breadcrumbs__recent-chevron {
  flex-shrink: 0;
}
</style>

