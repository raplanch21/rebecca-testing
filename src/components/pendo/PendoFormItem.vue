<template>
  <div
    class="pendo-form-item"
    :class="{
      'pendo-form-item--error': error,
      'pendo-form-item--required': required
    }">
    <!-- Label -->
    <label v-if="label" class="pendo-form-item__label">
      {{ label }}
      <span v-if="required" class="pendo-form-item__required">*</span>
    </label>
    
    <!-- Content -->
    <div class="pendo-form-item__content">
      <slot />
    </div>
    
    <!-- Helper / Error text -->
    <div v-if="error || helperText" class="pendo-form-item__helper" :class="{ 'pendo-form-item__helper--error': error }">
      {{ error || helperText }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Field label */
  label: {
    type: String,
    default: ''
  },
  /** Required field indicator */
  required: {
    type: Boolean,
    default: false
  },
  /** Error message */
  error: {
    type: String,
    default: ''
  },
  /** Helper text */
  helperText: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.pendo-form-item {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-bottom: 16px;
}

.pendo-form-item:last-child {
  margin-bottom: 0;
}

.pendo-form-item__label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2a2c35;
  margin-bottom: 6px;
}

.pendo-form-item__required {
  color: #db2547;
  margin-left: 2px;
}

.pendo-form-item__content {
  /* Container for form controls */
}

.pendo-form-item__helper {
  font-size: 12px;
  color: #6a6c75;
  margin-top: 4px;
}

.pendo-form-item__helper--error {
  color: #db2547;
}
</style>



