<template>
  <div class="pendo-header-guides">
    <!-- Selection set -->
    <div class="pendo-header-guides__selections">
      <!-- App selector -->
      <div class="pendo-header-guides__selector pendo-header-guides__selector--app">
        <PendoIcon type="monitor" :size="16" class="pendo-header-guides__selector-icon" />
        <span class="pendo-header-guides__selector-text">{{ appName }}</span>
      </div>

      <!-- Divider -->
      <div class="pendo-header-guides__divider-wrapper">
        <div class="pendo-header-guides__divider" />
      </div>

      <!-- Product area dropdown -->
      <button
        type="button"
        class="pendo-header-guides__selector pendo-header-guides__selector--dropdown"
        :class="{ 'pendo-header-guides__selector--open': openDropdown === 'productArea' }"
        @click="toggleDropdown('productArea')"
      >
        <div
          v-if="productAreaColor"
          class="pendo-header-guides__color-swatch"
          :style="{ backgroundColor: productAreaColor, borderColor: productAreaBorderColor }"
        />
        <span class="pendo-header-guides__selector-text">{{ productAreaName }}</span>
        <PendoIcon
          :type="openDropdown === 'productArea' ? 'chevron-up' : 'chevron-down'"
          :size="16"
          class="pendo-header-guides__selector-chevron"
        />
      </button>

      <!-- Divider -->
      <div class="pendo-header-guides__divider-wrapper">
        <div class="pendo-header-guides__divider" />
      </div>

      <!-- Category dropdown -->
      <button
        type="button"
        class="pendo-header-guides__selector pendo-header-guides__selector--dropdown"
        :class="{ 'pendo-header-guides__selector--open': openDropdown === 'category' }"
        @click="toggleDropdown('category')"
      >
        <span class="pendo-header-guides__selector-text">{{ categoryName }}</span>
        <PendoIcon
          :type="openDropdown === 'category' ? 'chevron-up' : 'chevron-down'"
          :size="16"
          class="pendo-header-guides__selector-chevron"
        />
      </button>
    </div>

    <!-- Last update info -->
    <div v-if="showLastUpdate" class="pendo-header-guides__last-update">
      {{ lastUpdateText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** App name */
  appName: {
    type: String,
    default: 'App'
  },
  /** Product area name */
  productAreaName: {
    type: String,
    default: 'Product area'
  },
  /** Product area color swatch */
  productAreaColor: {
    type: String,
    default: '#D77A0A' // Ochre
  },
  /** Product area color border (darker shade) */
  productAreaBorderColor: {
    type: String,
    default: '#9F5800'
  },
  /** Category name */
  categoryName: {
    type: String,
    default: 'Category'
  },
  /** Show last update info */
  showLastUpdate: {
    type: Boolean,
    default: true
  },
  /** Last update user email */
  lastUpdateUser: {
    type: String,
    default: ''
  },
  /** Last update date */
  lastUpdateDate: {
    type: String,
    default: ''
  },
  /** Last update time */
  lastUpdateTime: {
    type: String,
    default: ''
  },
  /** Custom last update text (overrides computed text) */
  lastUpdateCustomText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'app-click',
  'product-area-click',
  'category-click',
  'dropdown-toggle'
])

const openDropdown = ref(null)

const lastUpdateText = computed(() => {
  if (props.lastUpdateCustomText) {
    return props.lastUpdateCustomText
  }
  if (props.lastUpdateUser && props.lastUpdateDate && props.lastUpdateTime) {
    return `Last update by ${props.lastUpdateUser} on ${props.lastUpdateDate} at ${props.lastUpdateTime}`
  }
  return ''
})

const toggleDropdown = (key) => {
  const wasOpen = openDropdown.value === key
  openDropdown.value = wasOpen ? null : key
  
  emit('dropdown-toggle', { key, isOpen: !wasOpen })
  
  if (key === 'productArea') {
    emit('product-area-click')
  } else if (key === 'category') {
    emit('category-click')
  }
}

defineExpose({
  openDropdown,
  closeAllDropdowns: () => { openDropdown.value = null }
})
</script>

<style scoped>
.pendo-header-guides {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   SELECTIONS
   ======================================== */
.pendo-header-guides__selections {
  display: flex;
  align-items: center;
}

.pendo-header-guides__selector {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: default;
  font-family: inherit;
}

.pendo-header-guides__selector--dropdown {
  cursor: pointer;
}

.pendo-header-guides__selector--dropdown:hover .pendo-header-guides__selector-text {
  color: #1A1C25; /* gray-110 */
}

.pendo-header-guides__selector-icon {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

.pendo-header-guides__selector-text {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
}

.pendo-header-guides__selector-chevron {
  color: #2A2C35; /* gray-100 */
  flex-shrink: 0;
}

/* Color swatch for product area */
.pendo-header-guides__color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 1px;
  border: 0.5px solid;
  flex-shrink: 0;
}

/* ========================================
   DIVIDER
   ======================================== */
.pendo-header-guides__divider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 38px;
  padding: 0 10px;
}

.pendo-header-guides__divider {
  width: 1px;
  height: 24px;
  background-color: #EAECF1; /* gray-30 */
}

/* ========================================
   LAST UPDATE
   ======================================== */
.pendo-header-guides__last-update {
  font-size: 12.642px;
  font-weight: 400;
  line-height: 1.5;
  color: #6A6C75; /* gray-70 */
  flex-shrink: 0;
}
</style>

