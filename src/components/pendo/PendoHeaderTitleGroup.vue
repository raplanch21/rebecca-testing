<template>
  <div class="pendo-header-title-group">
    <!-- Icon -->
    <div v-if="showIcon" class="pendo-header-title-group__icon-wrapper" :style="iconWrapperStyle">
      <PendoIcon :type="icon" :size="24" class="pendo-header-title-group__icon" :style="{ color: iconColor }" />
    </div>

    <!-- Title -->
    <div class="pendo-header-title-group__title-container">
      <h1 class="pendo-header-title-group__title">
        <slot>{{ title }}</slot>
      </h1>
    </div>

    <!-- Button group -->
    <div v-if="buttons !== 'none'" class="pendo-header-title-group__buttons">
      <!-- Star/Favorite button (Four or Three buttons) -->
      <PendoIconButton
        v-if="showFavorite"
        icon="star"
        size="regular"
        :selected="isFavorite"
        @click="$emit('toggle-favorite')"
      />

      <!-- More button (Four buttons only) -->
      <PendoIconButton
        v-if="showMore"
        icon="more-horizontal"
        size="regular"
        @click="$emit('more-click')"
      />

      <!-- Share button (Four, Three, or Two buttons) -->
      <PendoButton
        v-if="showShare"
        type="secondary"
        size="regular"
        :prefix-icon="shareIcon"
        @click="$emit('share-click')"
      >
        {{ shareLabel }}
      </PendoButton>

      <!-- Primary action button (always shown when buttons !== 'none') -->
      <PendoButton
        type="primary"
        size="regular"
        :prefix-icon="primaryIcon"
        @click="$emit('primary-click')"
      >
        {{ primaryLabel }}
      </PendoButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'
import PendoIconButton from './PendoIconButton.vue'
import PendoButton from './PendoButton.vue'

const props = defineProps({
  /** Header title text */
  title: {
    type: String,
    default: 'Header title'
  },
  /** Show icon before title */
  showIcon: {
    type: Boolean,
    default: true
  },
  /** Icon type (from PendoIcon) */
  icon: {
    type: String,
    default: 'clock'
  },
  /** Icon color */
  iconColor: {
    type: String,
    default: '#FF7107' // orange-60
  },
  /** Icon background color */
  iconBgColor: {
    type: String,
    default: '#FFE8D2' // orange-20
  },
  /** Number of buttons to show: four, three, two, one, none */
  buttons: {
    type: String,
    default: 'four',
    validator: (v) => ['four', 'three', 'two', 'one', 'none'].includes(v)
  },
  /** Is favorite/starred */
  isFavorite: {
    type: Boolean,
    default: false
  },
  /** Primary button label */
  primaryLabel: {
    type: String,
    default: 'Create new'
  },
  /** Primary button icon */
  primaryIcon: {
    type: String,
    default: 'plus'
  },
  /** Share button label */
  shareLabel: {
    type: String,
    default: 'Share'
  },
  /** Share button icon */
  shareIcon: {
    type: String,
    default: 'external-link'
  }
})

const emit = defineEmits([
  'toggle-favorite',
  'more-click',
  'share-click',
  'primary-click'
])

const iconWrapperStyle = computed(() => ({
  backgroundColor: props.iconBgColor
}))

const showFavorite = computed(() => ['four', 'three'].includes(props.buttons))
const showMore = computed(() => props.buttons === 'four')
const showShare = computed(() => ['four', 'three', 'two'].includes(props.buttons))
</script>

<style scoped>
.pendo-header-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   ICON
   ======================================== */
.pendo-header-title-group__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}

.pendo-header-title-group__icon {
  flex-shrink: 0;
}

/* ========================================
   TITLE
   ======================================== */
.pendo-header-title-group__title-container {
  flex: 1;
  min-width: 0;
}

.pendo-header-title-group__title {
  font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.2;
  color: #2A2C35; /* gray-100 */
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ========================================
   BUTTON GROUP
   ======================================== */
.pendo-header-title-group__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
}
</style>

