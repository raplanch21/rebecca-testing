<template>
  <div
    class="pendo-alert"
    :class="[
      `pendo-alert--${type}`,
      `pendo-alert--${variant}`,
      { 'pendo-alert--closable': closable }
    ]"
    role="alert">
    <!-- Icon -->
    <div class="pendo-alert__icon">
      <PendoIcon :type="iconType" :size="24" />
    </div>
    
    <!-- Content -->
    <div class="pendo-alert__content">
      <!-- Title + Description variant -->
      <template v-if="variant === 'title-description'">
        <div v-if="title" class="pendo-alert__title">{{ title }}</div>
        <div class="pendo-alert__description">
          <slot>{{ description }}</slot>
        </div>
        <!-- Action links -->
        <div v-if="$slots.actions || links.length" class="pendo-alert__actions">
          <slot name="actions">
            <a
              v-for="(link, index) in links"
              :key="index"
              :href="link.href"
              class="pendo-alert__link"
              @click="link.onClick">
              {{ link.text }}
            </a>
          </slot>
        </div>
      </template>
      
      <!-- Inline variant (bold label + regular text on same line) -->
      <template v-else-if="variant === 'inline'">
        <div class="pendo-alert__inline-text">
          <span class="pendo-alert__inline-label">{{ title }}</span>
          <span class="pendo-alert__inline-description">
            <slot>{{ description }}</slot>
          </span>
        </div>
      </template>
      
      <!-- Inline link variant (regular text with inline link) -->
      <template v-else-if="variant === 'inline-link'">
        <div class="pendo-alert__inline-text">
          <slot>
            <span>{{ description }}</span>
            <a v-if="inlineLink" :href="inlineLink.href" class="pendo-alert__inline-link" @click="inlineLink.onClick">
              {{ inlineLink.text }}
            </a>
          </slot>
        </div>
      </template>
      
      <!-- Actions variant (title + description + action links) -->
      <template v-else-if="variant === 'actions'">
        <div v-if="title" class="pendo-alert__title">{{ title }}</div>
        <div class="pendo-alert__description">
          <slot>{{ description }}</slot>
        </div>
        <div v-if="$slots.actions || links.length" class="pendo-alert__actions">
          <slot name="actions">
            <a
              v-for="(link, index) in links"
              :key="index"
              :href="link.href"
              class="pendo-alert__link"
              @click="link.onClick">
              {{ link.text }}
            </a>
          </slot>
        </div>
      </template>
      
      <!-- Centered variant -->
      <template v-else-if="variant === 'centered'">
        <div class="pendo-alert__inline-text">
          <span class="pendo-alert__inline-label">{{ title }}</span>
          <span class="pendo-alert__inline-description">
            <slot>{{ description }}</slot>
          </span>
        </div>
      </template>
    </div>
    
    <!-- Close button -->
    <button
      v-if="closable"
      class="pendo-alert__close"
      aria-label="Close alert"
      @click="$emit('close')">
      <PendoIcon type="x" :size="16" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Alert type: info, success, warning, error */
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'success', 'warning', 'error'].includes(v)
  },
  /** Display variant: title-description, inline, inline-link, actions, centered */
  variant: {
    type: String,
    default: 'title-description',
    validator: (v) => ['title-description', 'inline', 'inline-link', 'actions', 'centered'].includes(v)
  },
  /** Alert title (used in title-description, inline, actions, centered variants) */
  title: {
    type: String,
    default: ''
  },
  /** Alert description */
  description: {
    type: String,
    default: ''
  },
  /** Show close button */
  closable: {
    type: Boolean,
    default: true
  },
  /** Action links array for actions variant: [{ text: 'Link 1', href: '#', onClick: fn }] */
  links: {
    type: Array,
    default: () => []
  },
  /** Inline link for inline-link variant: { text: 'Link', href: '#', onClick: fn } */
  inlineLink: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const iconType = computed(() => {
  const icons = {
    info: 'info-filled',
    success: 'circle-check-filled',
    warning: 'triangle-alert-filled',
    error: 'circle-minus-filled'
  }
  return icons[props.type]
})
</script>

<style scoped>
.pendo-alert {
  display: flex;
  align-items: flex-start; /* Align to top for multiline content */
  gap: 12px;
  padding: 17px 17px 17px 24px;
  border-radius: 3px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  /* Left border accent - 8px */
  border-left-width: 8px;
  border-left-style: solid;
  /* Top, right, bottom borders - 1px */
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
}

/* Inline variants should center vertically */
.pendo-alert--inline,
.pendo-alert--inline-link,
.pendo-alert--centered {
  align-items: center;
}

.pendo-alert__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.pendo-alert__content {
  flex: 1;
  min-width: 0;
}

/* Title styling - Inter Semi Bold 14.222px, line-height 1.5 */
.pendo-alert__title {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #2A2C35; /* palette/gray/100 */
}

/* Description styling - Inter Regular 14.222px, line-height 1.5 */
.pendo-alert__description {
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* palette/gray/100 */
}

/* Inline text container */
.pendo-alert__inline-text {
  font-size: 14.222px;
  line-height: 1.5;
  color: #2A2C35; /* palette/gray/100 */
}

/* Inline label - Semi Bold */
.pendo-alert__inline-label {
  font-weight: 600;
}

/* Inline description - Regular */
.pendo-alert__inline-description {
  font-weight: 400;
}

/* Inline link within text */
.pendo-alert__inline-link {
  font-weight: 600;
  text-decoration: underline;
  color: #2A2C35; /* palette/gray/100 */
  cursor: pointer;
}

.pendo-alert__inline-link:hover {
  color: #3A3C45; /* palette/gray/90 */
}

/* Action links container */
.pendo-alert__actions {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 0;
}

/* Action link styling - Inter Semi Bold 14.222px, underlined */
.pendo-alert__link {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: underline;
  color: #3A3C45; /* palette/gray/90 */
  cursor: pointer;
  padding: 10px 0;
}

.pendo-alert__link:hover {
  color: #2A2C35; /* palette/gray/100 */
}

/* Close button - always centered on y-axis */
.pendo-alert__close {
  flex-shrink: 0;
  align-self: center; /* Always center vertically regardless of parent align-items */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: #2A2C35; /* palette/gray/100 */
  transition: opacity 0.15s ease;
}

.pendo-alert__close:hover {
  opacity: 0.7;
}

/* ===== TYPE VARIANTS ===== */

/* Info - uses blue palette */
.pendo-alert--info {
  background-color: #F5FCFE; /* palette/blue/5 */
  border-color: #0182B6; /* palette/blue/80 */
}

.pendo-alert--info .pendo-alert__icon {
  color: #0182B6; /* palette/blue/80 */
}

.pendo-alert--info .pendo-alert__close {
  color: #2A2C35; /* palette/gray/100 */
}

/* Warning - uses yellow palette */
.pendo-alert--warning {
  background-color: #FFFDFA; /* palette/yellow/5 */
  border-color: #DBA211; /* palette/yellow/70 */
}

.pendo-alert--warning .pendo-alert__icon {
  color: #DBA211; /* palette/yellow/70 */
}

.pendo-alert--warning .pendo-alert__close {
  color: #2A2C35; /* palette/gray/100 */
}

/* Error - uses red palette */
.pendo-alert--error {
  background-color: #FFFAFA; /* palette/red/5 */
  border-color: #BD0000; /* palette/red/80 */
}

.pendo-alert--error .pendo-alert__icon {
  color: #BD0000; /* palette/red/80 */
}

.pendo-alert--error .pendo-alert__close {
  color: #BD0000; /* palette/red/80 - matches icon */
}

/* Success - uses green palette */
.pendo-alert--success {
  background-color: #F3FCF7; /* palette/green/5 */
  border-color: #00AA62; /* palette/green/70 */
}

.pendo-alert--success .pendo-alert__icon {
  color: #00AA62; /* palette/green/70 */
}

.pendo-alert--success .pendo-alert__close {
  color: #00AA62; /* palette/green/70 - matches icon */
}

/* ===== DISPLAY VARIANTS ===== */

/* Centered variant */
.pendo-alert--centered {
  justify-content: center;
  padding-left: 20px;
}

.pendo-alert--centered .pendo-alert__content {
  flex: none;
}
</style>
