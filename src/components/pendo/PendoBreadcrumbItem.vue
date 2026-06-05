<template>
  <!-- Parent type - clickable teal link -->
  <div v-if="type === 'parent'" class="breadcrumb-item breadcrumb-item--parent">
    <a :href="href" class="breadcrumb-item__link" @click="handleClick">
      <slot>{{ label }}</slot>
    </a>
  </div>

  <!-- Current type - non-clickable dark text, truncated -->
  <div v-else-if="type === 'current'" class="breadcrumb-item breadcrumb-item--current">
    <span class="breadcrumb-item__text" :title="label">
      <slot>{{ truncatedLabel }}</slot>
    </span>
  </div>

  <!-- More type - ellipsis for overflow -->
  <div v-else-if="type === 'more'" class="breadcrumb-item breadcrumb-item--more">
    <button class="breadcrumb-item__more-btn" @click="$emit('expand')">
      <slot>...</slot>
    </button>
  </div>

  <!-- Recents dropdown type -->
  <div 
    v-else-if="type === 'recents'" 
    class="breadcrumb-item breadcrumb-item--recents"
    :class="{ 'breadcrumb-item--loading': state === 'loading' }">
    <button class="breadcrumb-item__dropdown" @click="$emit('toggle')" :disabled="state === 'loading'">
      <!-- Loading spinner (shown before text in loading state) -->
      <span v-if="state === 'loading'" class="breadcrumb-item__loading-spinner">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="breadcrumb-item__spinner-icon">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="24" stroke-dashoffset="8" />
        </svg>
      </span>
      <span class="breadcrumb-item__dropdown-text">
        <slot>{{ label || 'Recents' }}</slot>
      </span>
      <!-- Chevron icon (hidden in loading state) -->
      <PendoIcon 
        v-if="state !== 'loading'" 
        :type="state === 'active' ? 'chevron-up' : 'chevron-down'" 
        :size="16" 
        class="breadcrumb-item__dropdown-icon" 
      />
    </button>
  </div>

  <!-- Backlink type - back arrow with text -->
  <div v-else-if="type === 'backlink'" class="breadcrumb-item breadcrumb-item--backlink">
    <a :href="href" class="breadcrumb-item__link breadcrumb-item__link--backlink" @click="handleClick">
      <PendoIcon type="arrow-left" :size="16" class="breadcrumb-item__backlink-icon" />
      <span>
        <slot>{{ label }}</slot>
      </span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /**
   * Breadcrumb item type
   * - parent: Clickable teal link for parent navigation
   * - current: Non-clickable current page (truncated at 48 chars)
   * - more: Ellipsis button for collapsed items
   * - recents: Dropdown trigger for recent items
   * - backlink: Back navigation with arrow icon
   */
  type: {
    type: String,
    default: 'parent',
    validator: (v) => ['parent', 'current', 'more', 'recents', 'backlink'].includes(v)
  },
  /**
   * State for recents dropdown type
   * - default: Normal state with chevron-down
   * - loading: Loading state with spinner (40% opacity)
   * - active: Expanded state with chevron-up
   */
  state: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'loading', 'active'].includes(v)
  },
  /** Display label */
  label: {
    type: String,
    default: ''
  },
  /** Link href for parent and backlink types */
  href: {
    type: String,
    default: '#'
  },
  /** Maximum characters before truncation (for current type) */
  maxLength: {
    type: Number,
    default: 48
  }
})

const emit = defineEmits(['click', 'toggle', 'expand'])

/**
 * Truncated label for current type (max 48 characters)
 */
const truncatedLabel = computed(() => {
  if (props.label.length > props.maxLength) {
    return props.label.substring(0, props.maxLength) + '...'
  }
  return props.label
})

/**
 * Handle click event for links
 */
const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.breadcrumb-item {
  display: flex;
  align-items: center;
  height: 26px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ===== PARENT TYPE ===== */
.breadcrumb-item--parent .breadcrumb-item__link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-radius: 3px;
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* palette/teal/70 */
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.breadcrumb-item--parent .breadcrumb-item__link:hover {
  opacity: 0.8;
}

/* ===== CURRENT TYPE ===== */
.breadcrumb-item--current {
  justify-content: center;
}

.breadcrumb-item--current .breadcrumb-item__text {
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #4A4C55; /* palette/gray/80 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 304px;
}

/* ===== MORE TYPE ===== */
.breadcrumb-item--more {
  justify-content: center;
  padding: 3px 0;
}

.breadcrumb-item--more .breadcrumb-item__more-btn {
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* palette/teal/70 */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s ease;
}

.breadcrumb-item--more .breadcrumb-item__more-btn:hover {
  opacity: 0.8;
}

/* ===== RECENTS DROPDOWN TYPE ===== */
.breadcrumb-item--recents {
  justify-content: flex-start;
}

.breadcrumb-item--recents .breadcrumb-item__dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s ease;
}

.breadcrumb-item--recents .breadcrumb-item__dropdown:hover {
  opacity: 0.8;
}

.breadcrumb-item--recents .breadcrumb-item__dropdown-text {
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* palette/teal/70 */
}

.breadcrumb-item--recents .breadcrumb-item__dropdown-icon {
  color: #128297; /* palette/teal/70 */
}

/* Loading state - 40% opacity */
.breadcrumb-item--recents.breadcrumb-item--loading {
  opacity: 0.4;
}

.breadcrumb-item--recents.breadcrumb-item--loading .breadcrumb-item__dropdown {
  cursor: wait;
}

.breadcrumb-item--recents .breadcrumb-item__loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 13px;
}

.breadcrumb-item--recents .breadcrumb-item__spinner-icon {
  color: #128297; /* palette/teal/70 */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ===== BACKLINK TYPE ===== */
.breadcrumb-item--backlink .breadcrumb-item__link--backlink {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 0;
  border-radius: 3px;
  font-size: 12.642px;
  font-weight: 600;
  line-height: 1.5;
  color: #128297; /* palette/teal/70 */
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.breadcrumb-item--backlink .breadcrumb-item__link--backlink:hover {
  opacity: 0.8;
}

.breadcrumb-item--backlink .breadcrumb-item__backlink-icon {
  color: #128297; /* palette/teal/70 */
}
</style>

