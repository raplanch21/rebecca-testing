<template>
  <div
    class="pendo-dropdown-option"
    :class="{
      'pendo-dropdown-option--selected': selected,
      'pendo-dropdown-option--disabled': disabled,
      'pendo-dropdown-option--hover': isHovered
    }"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="pendo-dropdown-option__left">
      <!-- Checkbox (for multi-select) -->
      <PendoCheckbox
        v-if="showCheckbox"
        :model-value="selected"
        class="pendo-dropdown-option__checkbox"
        @click.stop
        @update:model-value="handleClick"
      />

      <!-- Product area swatch -->
      <span v-if="showProductSwatch" class="pendo-dropdown-option__product-swatch" />

      <!-- Icon -->
      <PendoIcon
        v-if="icon"
        :type="icon"
        :size="16"
        class="pendo-dropdown-option__icon"
      />

      <!-- Status dot -->
      <span
        v-if="status"
        class="pendo-dropdown-option__status-dot"
        :style="{ backgroundColor: statusColor }"
      />

      <!-- Label -->
      <span class="pendo-dropdown-option__label">
        <slot>{{ label }}</slot>
      </span>
    </div>

    <div v-if="$slots.right || showActions" class="pendo-dropdown-option__right">
      <slot name="right">
        <button
          v-if="showActions && actions.includes('edit')"
          type="button"
          class="pendo-dropdown-option__action"
          :class="{ 'pendo-dropdown-option__action--active': isHovered || selected }"
          @click.stop="$emit('edit', value)"
        >
          <PendoIcon type="edit" :size="12" />
        </button>
        <button
          v-if="showActions && actions.includes('copy')"
          type="button"
          class="pendo-dropdown-option__action"
          :class="{ 'pendo-dropdown-option__action--active': isHovered || selected }"
          @click.stop="$emit('copy', value)"
        >
          <PendoIcon type="copy" :size="12" />
        </button>
        <button
          v-if="showActions && actions.includes('delete')"
          type="button"
          class="pendo-dropdown-option__action"
          :class="{ 'pendo-dropdown-option__action--active': isHovered || selected }"
          @click.stop="$emit('delete', value)"
        >
          <PendoIcon type="trash" :size="12" />
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoIcon from './PendoIcon.vue'
import PendoCheckbox from './PendoCheckbox.vue'

const props = defineProps({
  /** Option label text */
  label: {
    type: String,
    default: ''
  },
  /** Option value */
  value: {
    type: [String, Number, Object],
    default: null
  },
  /** Icon type */
  icon: {
    type: String,
    default: ''
  },
  /** Status for status dots: new, underConsideration, inDiscovery, inDevelopment, nowAvailable, archived, public, staged, draft, disabled */
  status: {
    type: String,
    default: '',
    validator: (v) => !v || ['new', 'underConsideration', 'inDiscovery', 'inDevelopment', 'nowAvailable', 'archived', 'public', 'staged', 'draft', 'disabled'].includes(v)
  },
  /** Selected state */
  selected: {
    type: Boolean,
    default: false
  },
  /** Show checkbox */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /** Show product area swatch */
  showProductSwatch: {
    type: Boolean,
    default: false
  },
  /** Show action buttons */
  showActions: {
    type: Boolean,
    default: false
  },
  /** Which actions to show: ['edit', 'copy', 'delete'] */
  actions: {
    type: Array,
    default: () => ['edit', 'copy', 'delete']
  },
  /** Disabled state */
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'edit', 'copy', 'delete'])

const isHovered = ref(false)

const statusColor = computed(() => {
  const colors = {
    new: '#53AFFF',              // blue-40
    underConsideration: '#07699B', // blue-90
    inDiscovery: '#A973F2',      // purple-40
    inDevelopment: '#FF9237',    // orange-50
    nowAvailable: '#00AA62',     // green-70
    public: '#00AA62',           // green-70 (guide status)
    staged: '#A973F2',           // purple-40 (guide status)
    draft: '#6A6C75',            // gray-70 (guide status)
    disabled: '#6A6C75',         // gray-70 (guide status)
    archived: '#6A6C75'          // gray-70
  }
  return colors[props.status] || '#6A6C75'
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click', { label: props.label, value: props.value })
  }
}
</script>

<style scoped>
.pendo-dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 24px 4px 16px;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.15s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 29px; /* 21px content + 4px padding top + 4px padding bottom */
}

/* Hover state - light gray background */
.pendo-dropdown-option:hover,
.pendo-dropdown-option--hover {
  background-color: #EAECF1; /* gray-30 */
}

/* Selected state - slightly darker gray background */
.pendo-dropdown-option--selected {
  background-color: #DADCE5; /* gray-40 */
}

.pendo-dropdown-option--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pendo-dropdown-option__left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.pendo-dropdown-option__checkbox {
  flex-shrink: 0;
}

.pendo-dropdown-option__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pendo-dropdown-option__icon {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-dropdown-option__product-swatch {
  width: 16px;
  height: 16px;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 2px;
  background-color: #ffffff;
  flex-shrink: 0;
}

.pendo-dropdown-option__label {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 21px;
  display: flex;
  align-items: center;
}

.pendo-dropdown-option__right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.pendo-dropdown-option__action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #6A6C75; /* gray-70 - default state */
  transition: color 0.15s ease;
}

/* Action icons turn darker on hover/selected state */
.pendo-dropdown-option__action--active {
  color: #2A2C35; /* gray-100 */
}

.pendo-dropdown-option__action:hover {
  color: #2A2C35; /* gray-100 */
}
</style>

