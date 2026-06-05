<template>
  <div
    class="pendo-divider"
    :class="[`pendo-divider--${direction}`]"
    :style="wrapperStyle"
    role="separator"
  >
    <div class="pendo-divider__line" :style="lineStyle" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Direction: horizontal or vertical */
  direction: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
  /** Stroke color */
  color: {
    type: String,
    default: '#EAECF1' // gray-30
  },
  /** Line thickness */
  thickness: {
    type: String,
    default: '1px'
  },
  /** Length of the divider (width for horizontal, height for vertical) */
  length: {
    type: String,
    default: '100%'
  },
  /** Spacing around the divider (vertical padding for horizontal, horizontal padding for vertical) */
  spacing: {
    type: String,
    default: '0'
  },
  /** Inset from edges (horizontal padding for horizontal, vertical padding for vertical) */
  inset: {
    type: String,
    default: '0'
  }
})

/**
 * Computes the wrapper style based on direction and spacing.
 */
const wrapperStyle = computed(() => {
  if (props.direction === 'horizontal') {
    return {
      padding: `${props.spacing} ${props.inset}`,
      width: props.length
    }
  } else {
    return {
      padding: `${props.inset} ${props.spacing}`,
      height: props.length
    }
  }
})

/**
 * Computes the line style based on direction and color.
 */
const lineStyle = computed(() => {
  return {
    backgroundColor: props.color,
    ...(props.direction === 'horizontal'
      ? { height: props.thickness, width: '100%' }
      : { width: props.thickness, height: '100%' }
    )
  }
})
</script>

<style scoped>
.pendo-divider {
  flex-shrink: 0;
  box-sizing: border-box;
}

.pendo-divider--horizontal {
  display: flex;
  align-items: center;
  width: 100%;
}

.pendo-divider--vertical {
  display: inline-flex;
  justify-content: center;
}

.pendo-divider__line {
  flex-shrink: 0;
}
</style>



