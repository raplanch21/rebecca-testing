<template>
  <nav class="pendo-breadcrumbs" :class="`pendo-breadcrumbs--${version}`" aria-label="Breadcrumb">
    <!-- Simple Version: All Groups > Parent level > Parent level > Current step -->
    <template v-if="version === 'simple'">
      <!-- 1st level -->
      <div v-if="show1stLevel && items.length > 0" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="parent" 
          :label="items[0].label" 
          :href="items[0].href"
          @click="handleItemClick(items[0], 0)"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- 2nd level -->
      <div v-if="show2ndLevel && items.length > 1" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="parent" 
          :label="items[1].label" 
          :href="items[1].href"
          @click="handleItemClick(items[1], 1)"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- 3rd level -->
      <div v-if="show3rdLevel && items.length > 2" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="parent" 
          :label="items[2].label" 
          :href="items[2].href"
          @click="handleItemClick(items[2], 2)"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- Current (last item) -->
      <PendoBreadcrumbItem 
        v-if="currentItem"
        type="current" 
        :label="currentItem.label"
        :max-length="48"
      />
    </template>

    <!-- Truncated Version: All Groups > ... > Parent level > Current step -->
    <template v-else-if="version === 'truncated'">
      <!-- 1st level (always shown) -->
      <div v-if="show1stLevel && items.length > 0" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="parent" 
          :label="items[0].label" 
          :href="items[0].href"
          @click="handleItemClick(items[0], 0)"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- More ellipsis (when there are hidden levels) -->
      <div v-if="hasHiddenLevels" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="more"
          @expand="handleMoreClick"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- Immediate parent level (3rd level - last parent before current) -->
      <div v-if="show3rdLevel && immediateParent" class="pendo-breadcrumbs__level">
        <PendoBreadcrumbItem 
          type="parent" 
          :label="immediateParent.label" 
          :href="immediateParent.href"
          @click="handleItemClick(immediateParent, items.length - 2)"
        />
        <PendoBreadcrumbSeparator type="carat" />
      </div>

      <!-- Current (last item) -->
      <PendoBreadcrumbItem 
        v-if="currentItem"
        type="current" 
        :label="currentItem.label"
        :max-length="48"
      />
    </template>

    <!-- Backlinks Version: ← All dashboards | Recents ∨ -->
    <template v-else-if="version === 'backlinks'">
      <!-- Backlink -->
      <PendoBreadcrumbItem 
        v-if="backlink"
        type="backlink" 
        :label="backlink.label" 
        :href="backlink.href"
        @click="handleBacklinkClick"
      />

      <!-- Recents dropdown with pipe separator -->
      <div v-if="showRecents" class="pendo-breadcrumbs__recents">
        <PendoBreadcrumbSeparator type="pipe" />
        <PendoBreadcrumbItem 
          type="recents"
          :label="recentsLabel"
          :state="recentsState"
          @toggle="handleRecentsToggle"
        />
      </div>
    </template>

    <!-- Slot for custom content -->
    <slot></slot>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import PendoBreadcrumbItem from './PendoBreadcrumbItem.vue'
import PendoBreadcrumbSeparator from './PendoBreadcrumbSeparator.vue'

const props = defineProps({
  /**
   * Breadcrumb version/layout
   * - simple: Full breadcrumb trail (max 4 levels)
   * - truncated: Collapsed middle levels with "..." 
   * - backlinks: Back arrow + Recents dropdown
   */
  version: {
    type: String,
    default: 'simple',
    validator: (v) => ['simple', 'truncated', 'backlinks'].includes(v)
  },
  /**
   * Breadcrumb items array
   * Each item: { label: string, href: string }
   * Last item is treated as "current" (non-clickable)
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * Backlink configuration for backlinks version
   * { label: string, href: string }
   */
  backlink: {
    type: Object,
    default: null
  },
  /** Show 1st level in simple/truncated versions */
  show1stLevel: {
    type: Boolean,
    default: true
  },
  /** Show 2nd level in simple version */
  show2ndLevel: {
    type: Boolean,
    default: true
  },
  /** Show 3rd level (immediate parent) in simple/truncated versions */
  show3rdLevel: {
    type: Boolean,
    default: true
  },
  /** Show recents dropdown in backlinks version */
  showRecents: {
    type: Boolean,
    default: true
  },
  /** Recents dropdown label */
  recentsLabel: {
    type: String,
    default: 'Recents'
  },
  /** Recents dropdown state: default, loading, active */
  recentsState: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'loading', 'active'].includes(v)
  }
})

const emit = defineEmits(['item-click', 'more-click', 'backlink-click', 'recents-toggle'])

/**
 * Current item (last in the items array)
 */
const currentItem = computed(() => {
  if (props.items.length === 0) return null
  return props.items[props.items.length - 1]
})

/**
 * Immediate parent (second to last item) for truncated version
 */
const immediateParent = computed(() => {
  if (props.items.length < 2) return null
  return props.items[props.items.length - 2]
})

/**
 * Check if there are hidden levels (for truncated version)
 * Hidden when there are more than 4 levels
 */
const hasHiddenLevels = computed(() => {
  return props.items.length > 4
})

/**
 * Handle breadcrumb item click
 */
const handleItemClick = (item, index) => {
  emit('item-click', { item, index })
}

/**
 * Handle "more" ellipsis click
 */
const handleMoreClick = () => {
  emit('more-click')
}

/**
 * Handle backlink click
 */
const handleBacklinkClick = (event) => {
  emit('backlink-click', event)
}

/**
 * Handle recents dropdown toggle
 */
const handleRecentsToggle = () => {
  emit('recents-toggle')
}
</script>

<style scoped>
.pendo-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Backlinks version has larger gap */
.pendo-breadcrumbs--backlinks {
  gap: 12px;
}

/* Level container (parent + separator) */
.pendo-breadcrumbs__level {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Recents container (pipe + dropdown) */
.pendo-breadcrumbs__recents {
  display: inline-grid;
  grid-template-columns: max-content max-content;
  align-items: start;
  gap: 13px;
}
</style>

