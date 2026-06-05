<template>
  <div class="pendo-global-filter" :class="{ 'pendo-global-filter--with-additional': showAdditionalFilters }">
    <!-- Primary filter row -->
    <div class="pendo-global-filter__primary">
      <div class="pendo-global-filter__left">
        <!-- Segment dropdown -->
        <div class="pendo-global-filter__dropdown">
          <PendoDropdownTrigger
            variant="standard"
            :model-value="segment"
            placeholder="Everyone"
            :is-open="openDropdown === 'segment'"
            @click="toggleDropdown('segment')"
          />
        </div>

        <!-- Date picker -->
        <div class="pendo-global-filter__dropdown">
          <PendoDatePickerTrigger
            :model-value="dateRange"
            type="default"
            placeholder="Last 180 days"
            @click="toggleDropdown('date')"
          />
        </div>

        <!-- Accounts dropdown -->
        <div class="pendo-global-filter__dropdown">
          <PendoDropdownTrigger
            variant="standard"
            :model-value="accounts"
            placeholder="All accounts"
            :is-open="openDropdown === 'accounts'"
            @click="toggleDropdown('accounts')"
          />
        </div>

        <!-- Apps dropdown -->
        <div class="pendo-global-filter__dropdown">
          <PendoDropdownTrigger
            variant="standard"
            :model-value="apps"
            placeholder="All apps"
            :is-open="openDropdown === 'apps'"
            @click="toggleDropdown('apps')"
          />
        </div>

        <!-- Favorite/Star button -->
        <button
          class="pendo-global-filter__favorite-btn"
          type="button"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          @click="$emit('toggle-favorite')"
        >
          <PendoIcon type="star" :size="16" :class="{ 'pendo-global-filter__favorite-icon--active': isFavorite }" />
        </button>
      </div>

      <div class="pendo-global-filter__right">
        <!-- Action button (optional) -->
        <button
          v-if="showAction"
          class="pendo-global-filter__action-btn"
          type="button"
          @click="$emit('action-click')"
        >
          <PendoIcon type="layout-grid" :size="16" />
          <span>Pivot Data</span>
        </button>

        <!-- Search input -->
        <div v-if="showSearch" class="pendo-global-filter__search">
          <PendoInput
            v-model="searchValue"
            placeholder="Search"
            prefix-icon="search"
            @input="$emit('search', searchValue)"
          />
        </div>
      </div>
    </div>

    <!-- Additional filters row -->
    <div v-if="showAdditionalFilters" class="pendo-global-filter__additional">
      <div
        v-for="filter in additionalFilters"
        :key="filter.key"
        class="pendo-global-filter__text-dropdown"
      >
        <PendoDropdownTrigger
          variant="text"
          color="gray"
          :model-value="filter.value || filter.label"
          :is-open="openDropdown === filter.key"
          @click="toggleDropdown(filter.key)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoDropdownTrigger from './PendoDropdownTrigger.vue'
import PendoDatePickerTrigger from './PendoDatePickerTrigger.vue'
import PendoInput from './PendoInput.vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Selected segment value */
  segment: {
    type: String,
    default: 'Everyone'
  },
  /** Selected date range */
  dateRange: {
    type: [Date, String, Array],
    default: 'Last 180 days'
  },
  /** Selected accounts value */
  accounts: {
    type: String,
    default: 'All accounts'
  },
  /** Selected apps value */
  apps: {
    type: String,
    default: 'All apps'
  },
  /** Is favorite/starred */
  isFavorite: {
    type: Boolean,
    default: false
  },
  /** Show action button (Pivot Data) */
  showAction: {
    type: Boolean,
    default: false
  },
  /** Show search input */
  showSearch: {
    type: Boolean,
    default: true
  },
  /** Show additional filters row */
  showAdditionalFilters: {
    type: Boolean,
    default: false
  },
  /** Additional filter items */
  additionalFilters: {
    type: Array,
    default: () => [
      { key: 'productAreas', label: 'All product areas', value: '' },
      { key: 'guideCategories', label: 'All guide categories', value: '' },
      { key: 'statuses', label: 'All statuses', value: '' },
      { key: 'activations', label: 'All activations', value: '' },
      { key: 'expirations', label: 'All expirations', value: '' },
      { key: 'guideTypes', label: 'All guide types', value: '' },
      { key: 'createdBy', label: 'Created by', value: '' },
      { key: 'deviceTypes', label: 'All device types', value: '' }
    ]
  },
  /** Search value */
  search: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:segment',
  'update:dateRange',
  'update:accounts',
  'update:apps',
  'update:search',
  'toggle-favorite',
  'action-click',
  'search',
  'dropdown-toggle',
  'filter-change'
])

const openDropdown = ref(null)
const searchValue = ref(props.search)

const toggleDropdown = (key) => {
  if (openDropdown.value === key) {
    openDropdown.value = null
  } else {
    openDropdown.value = key
  }
  emit('dropdown-toggle', { key, isOpen: openDropdown.value === key })
}

defineExpose({
  openDropdown,
  closeAllDropdowns: () => { openDropdown.value = null }
})
</script>

<style scoped>
.pendo-global-filter {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   PRIMARY ROW
   ======================================== */
.pendo-global-filter__primary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.17); /* Depth 1 */
}

.pendo-global-filter--with-additional .pendo-global-filter__primary {
  border-radius: 2px 2px 0 0;
  border-bottom: none;
}

.pendo-global-filter__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pendo-global-filter__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Dropdown containers */
.pendo-global-filter__dropdown {
  width: 160px;
}

/* Favorite/Star button */
.pendo-global-filter__favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 2px;
  cursor: pointer;
  color: #2A2C35; /* gray-100 */
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.pendo-global-filter__favorite-btn:hover {
  border-color: #2A2C35; /* gray-100 */
}

.pendo-global-filter__favorite-icon--active {
  color: #FF9237; /* orange-50 */
  fill: #FF9237;
}

/* Action button (Pivot Data) */
.pendo-global-filter__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 36px;
  padding: 10px 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* teal-70 */
  transition: color 0.15s ease;
}

.pendo-global-filter__action-btn:hover {
  color: #016479; /* teal-80 */
}

/* Search input */
.pendo-global-filter__search {
  width: 236px;
}

/* ========================================
   ADDITIONAL FILTERS ROW
   ======================================== */
.pendo-global-filter__additional {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-top: none;
  border-radius: 0 0 2px 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.17); /* Depth 1 */
}

.pendo-global-filter__text-dropdown {
  flex-shrink: 0;
}

/* Override text dropdown styles for gray color */
.pendo-global-filter__text-dropdown :deep(.pendo-dropdown-trigger__button--gray .pendo-dropdown-trigger__text) {
  color: #2A2C35; /* gray-100 */
  font-weight: 600;
}

.pendo-global-filter__text-dropdown :deep(.pendo-dropdown-trigger__chevron-icon) {
  color: #2A2C35; /* gray-100 */
}
</style>

