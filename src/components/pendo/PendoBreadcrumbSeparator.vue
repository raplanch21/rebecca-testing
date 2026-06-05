<template>
  <!-- Carat/Chevron separator -->
  <div v-if="type === 'carat'" class="breadcrumb-separator breadcrumb-separator--carat">
    <PendoIcon type="chevron-right" :size="12" />
  </div>

  <!-- Pipe separator -->
  <div v-else-if="type === 'pipe'" class="breadcrumb-separator breadcrumb-separator--pipe">
    <span class="breadcrumb-separator__pipe"></span>
  </div>
</template>

<script setup>
import PendoIcon from './PendoIcon.vue'

defineProps({
  /**
   * Separator type
   * - carat: Chevron right (>) separator
   * - pipe: Vertical pipe (|) separator
   */
  type: {
    type: String,
    default: 'carat',
    validator: (v) => ['carat', 'pipe'].includes(v)
  }
})
</script>

<style scoped>
.breadcrumb-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
}

/* ===== CARAT/CHEVRON TYPE ===== */
.breadcrumb-separator--carat {
  width: 12px;
  color: #2A2C35; /* palette/gray/100 */
}

/* ===== PIPE TYPE ===== */
.breadcrumb-separator--pipe {
  width: 1px;
}

.breadcrumb-separator__pipe {
  display: block;
  width: 1px;
  height: 100%;
  background-color: #DADCE5; /* palette/gray/40 */
}
</style>

