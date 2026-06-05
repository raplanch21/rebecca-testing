<template>
  <div class="pendo-dropdown-menu" :style="menuStyle">
    <!-- Search Header -->
    <div v-if="showSearch" class="pendo-dropdown-menu__search-container">
      <div class="pendo-dropdown-menu__search-input">
        <PendoIcon type="search" :size="16" class="pendo-dropdown-menu__search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="pendo-dropdown-menu__search-field"
          @input="$emit('search', searchQuery)"
        />
      </div>
      <div class="pendo-dropdown-menu__divider" />
    </div>

    <!-- Selected Header (for multi-select) -->
    <div v-if="showSelectedHeader" class="pendo-dropdown-menu__selected-header">
      <span class="pendo-dropdown-menu__selected-label">
        SELECTED ({{ selectedCount }})
      </span>
      <button
        type="button"
        class="pendo-dropdown-menu__clear-btn"
        @click="$emit('clear')"
      >
        Clear
      </button>
    </div>

    <!-- Top Slots / Selected Items -->
    <div v-if="$slots.selected || selectedItems.length > 0" class="pendo-dropdown-menu__section">
      <slot name="selected">
        <PendoDropdownOption
          v-for="item in selectedItems"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :icon="item.icon"
          :status="item.status"
          :selected="true"
          :show-checkbox="multiSelect"
          @click="handleOptionClick(item)"
        />
      </slot>
    </div>

    <!-- Divider between sections -->
    <div v-if="showDivider && (selectedItems.length > 0 || $slots.selected)" class="pendo-dropdown-menu__divider-wrapper">
      <div class="pendo-dropdown-menu__divider" />
    </div>

    <!-- Main Options -->
    <div class="pendo-dropdown-menu__section">
      <slot>
        <PendoDropdownOption
          v-for="item in filteredOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :icon="item.icon"
          :status="item.status"
          :selected="isSelected(item)"
          :show-checkbox="multiSelect"
          @click="handleOptionClick(item)"
        />
      </slot>
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="pendo-dropdown-menu__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoIcon from './PendoIcon.vue'
import PendoDropdownOption from './PendoDropdownOption.vue'

const props = defineProps({
  /** Array of options: [{ label, value, icon?, status? }] */
  options: {
    type: Array,
    default: () => []
  },
  /** Selected value(s) - single value or array for multi-select */
  modelValue: {
    type: [String, Number, Array, Object],
    default: null
  },
  /** Enable multi-select mode */
  multiSelect: {
    type: Boolean,
    default: false
  },
  /** Show search input */
  showSearch: {
    type: Boolean,
    default: false
  },
  /** Search placeholder text */
  searchPlaceholder: {
    type: String,
    default: 'Search ...'
  },
  /** Show selected header with count and clear button */
  showSelectedHeader: {
    type: Boolean,
    default: false
  },
  /** Show divider between selected and unselected items */
  showDivider: {
    type: Boolean,
    default: false
  },
  /** Menu width */
  width: {
    type: String,
    default: '211px'
  },
  /** Maximum height before scrolling */
  maxHeight: {
    type: String,
    default: '300px'
  }
})

const emit = defineEmits(['update:modelValue', 'select', 'clear', 'search'])

const searchQuery = ref('')

const menuStyle = computed(() => ({
  width: props.width,
  maxHeight: props.maxHeight
}))

const selectedCount = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length
  }
  return props.modelValue ? 1 : 0
})

const selectedItems = computed(() => {
  if (!props.multiSelect || !Array.isArray(props.modelValue)) return []
  return props.options.filter(opt => props.modelValue.includes(opt.value))
})

const filteredOptions = computed(() => {
  let opts = props.options

  // Filter out selected items if showing them separately
  if (props.multiSelect && selectedItems.value.length > 0) {
    const selectedValues = selectedItems.value.map(s => s.value)
    opts = opts.filter(opt => !selectedValues.includes(opt.value))
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    opts = opts.filter(opt => opt.label.toLowerCase().includes(query))
  }

  return opts
})

const isSelected = (item) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(item.value)
  }
  return props.modelValue === item.value
}

const handleOptionClick = (item) => {
  if (props.multiSelect) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValue.indexOf(item.value)

    if (index > -1) {
      currentValue.splice(index, 1)
    } else {
      currentValue.push(item.value)
    }

    emit('update:modelValue', currentValue)
    emit('select', item, currentValue)
  } else {
    emit('update:modelValue', item.value)
    emit('select', item)
  }
}
</script>

<style scoped>
.pendo-dropdown-menu {
  background-color: #ffffff;
  border: 1px solid #EAECF1; /* gray-30 */
  border-radius: 3px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.17); /* Depth 2 */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 0;
}

/* ========================================
   SEARCH
   ======================================== */
.pendo-dropdown-menu__search-container {
  display: flex;
  flex-direction: column;
}

.pendo-dropdown-menu__search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin: 0 16px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
}

.pendo-dropdown-menu__search-icon {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-dropdown-menu__search-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35;
  background: transparent;
}

.pendo-dropdown-menu__search-field::placeholder {
  color: #BABCC5; /* gray-50 */
}

/* ========================================
   DIVIDER
   ======================================== */
.pendo-dropdown-menu__divider-wrapper {
  padding: 8px 0;
}

.pendo-dropdown-menu__divider {
  height: 1px;
  background-color: #DADCE5; /* gray-40 */
  margin: 8px 0;
}

.pendo-dropdown-menu__search-container .pendo-dropdown-menu__divider {
  margin: 8px 0 0 0;
}

/* ========================================
   SELECTED HEADER
   ======================================== */
.pendo-dropdown-menu__selected-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.pendo-dropdown-menu__selected-label {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #6A6C75; /* gray-70 */
}

.pendo-dropdown-menu__clear-btn {
  background: transparent;
  border: none;
  padding: 0;
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* teal-70 */
  cursor: pointer;
  transition: color 0.15s ease;
}

.pendo-dropdown-menu__clear-btn:hover {
  color: #016479; /* teal-80 */
  text-decoration: underline;
}

/* ========================================
   SECTIONS
   ======================================== */
.pendo-dropdown-menu__section {
  display: flex;
  flex-direction: column;
}

.pendo-dropdown-menu__footer {
  border-top: 1px solid #DADCE5;
  padding: 8px 16px;
  margin-top: 8px;
}
</style>

