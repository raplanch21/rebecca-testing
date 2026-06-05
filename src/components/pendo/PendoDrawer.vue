<template>
  <Teleport to="body" :disabled="!visible">
    <div
      v-if="visible"
      class="pendo-drawer"
      :class="[
        `pendo-drawer--${size}`,
        `pendo-drawer--${placement}`,
        { 'pendo-drawer--open': isOpen }
      ]"
      :style="{ zIndex }">
      
      <!-- Mask/Overlay -->
      <Transition name="fade">
        <div
          v-if="showMask && isOpen"
          class="pendo-drawer__mask"
          @click="onMaskClick" />
      </Transition>
      
      <!-- Drawer Panel -->
      <Transition :name="`slide-${placement}`" @after-leave="onAfterLeave">
        <div
          v-show="isOpen"
          ref="panelRef"
          class="pendo-drawer__panel"
          :style="panelStyles"
          @keydown.esc="close">
          
          <div class="pendo-drawer__content">
            <!-- Before Header (Label row) -->
            <div v-if="label || $slots.label" class="pendo-drawer__before-header">
              <div class="pendo-drawer__label">
                <slot name="label">{{ label }}</slot>
              </div>
              <div class="pendo-drawer__core-actions">
                <slot name="coreActions" />
                <button
                  v-if="showClose"
                  class="pendo-drawer__close"
                  aria-label="Close drawer"
                  @click="close">
                  <PendoIcon type="x" :size="16" />
                </button>
              </div>
            </div>
            
            <!-- Header -->
            <div class="pendo-drawer__header">
              <slot name="header" :close="close">
                <h2 v-if="title" class="pendo-drawer__title">{{ title }}</h2>
                <button
                  v-if="showClose && !label && !$slots.label"
                  class="pendo-drawer__close"
                  aria-label="Close drawer"
                  @click="close">
                  <PendoIcon type="x" :size="16" />
                </button>
              </slot>
            </div>
            
            <!-- Body -->
            <div class="pendo-drawer__body">
              <slot name="body">
                <slot />
              </slot>
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer || $slots['footer-left'] || $slots['footer-right']" class="pendo-drawer__footer">
              <slot name="footer" :close="close">
                <div class="pendo-drawer__footer-left">
                  <slot name="footer-left" :close="close" />
                </div>
                <div class="pendo-drawer__footer-right">
                  <slot name="footer-right" :close="close" />
                </div>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  /** Toggles drawer visibility */
  visible: {
    type: Boolean,
    default: false
  },
  /** Drawer size: small, medium, large, fullscreen */
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large', 'fullscreen'].includes(v) || typeof v === 'string'
  },
  /** Drawer title */
  title: {
    type: String,
    default: ''
  },
  /** Label for before-header banner */
  label: {
    type: String,
    default: ''
  },
  /** Show close button */
  showClose: {
    type: Boolean,
    default: true
  },
  /** Close on mask click */
  closeOnMaskClick: {
    type: Boolean,
    default: true
  },
  /** Show background mask */
  mask: {
    type: Boolean,
    default: true
  },
  /** Placement: top, bottom, left, right */
  placement: {
    type: String,
    default: 'right',
    validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v)
  },
  /** Z-index */
  zIndex: {
    type: Number,
    default: 1000
  }
})

const emit = defineEmits(['update:visible', 'open', 'opened', 'close', 'closed', 'before-close'])

const panelRef = ref(null)
const isOpen = ref(false)

const showMask = computed(() => {
  return props.size !== 'fullscreen' && props.mask
})

const drawerSize = computed(() => {
  const sizes = {
    small: '300px',
    medium: '400px',
    large: '500px',
    fullscreen: '100%'
  }
  return sizes[props.size] || props.size
})

const panelStyles = computed(() => {
  if (['top', 'bottom'].includes(props.placement)) {
    return { height: props.size === 'fullscreen' ? '100vh' : drawerSize.value }
  }
  return { width: props.size === 'fullscreen' ? '100vw' : drawerSize.value }
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      isOpen.value = true
      emit('open')
      setTimeout(() => emit('opened'), 220)
    })
  } else if (isOpen.value) {
    close()
  }
}, { immediate: true })

function close() {
  let stopClose = false
  const stop = () => { stopClose = true }
  
  emit('before-close', { stop })
  
  if (!stopClose) {
    isOpen.value = false
    emit('close')
  }
}

function onMaskClick() {
  if (props.closeOnMaskClick) {
    close()
  }
}

function onAfterLeave() {
  emit('update:visible', false)
  emit('closed')
}

defineExpose({ close })
</script>

<style scoped>
.pendo-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.pendo-drawer--open {
  pointer-events: auto;
}

.pendo-drawer__mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(218, 220, 229, 0.8);
  z-index: 1;
}

.pendo-drawer__panel {
  position: fixed;
  background: white;
  box-shadow: -4px 0 24px rgba(42, 44, 53, 0.12);
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Placement */
.pendo-drawer--right .pendo-drawer__panel {
  top: 0;
  right: 0;
  bottom: 0;
}

.pendo-drawer--left .pendo-drawer__panel {
  top: 0;
  left: 0;
  bottom: 0;
}

.pendo-drawer--top .pendo-drawer__panel {
  top: 0;
  left: 0;
  right: 0;
}

.pendo-drawer--bottom .pendo-drawer__panel {
  bottom: 0;
  left: 0;
  right: 0;
}

.pendo-drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.pendo-drawer__before-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 16px 24px;
  border-bottom: 1px solid #DADCE5; /* gray-40 */
  flex-shrink: 0;
}

.pendo-drawer__label {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #3A3C45; /* gray-90 */
}

.pendo-drawer__core-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pendo-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px 16px 24px;
  border-bottom: 1px solid #DADCE5; /* gray-40 */
  flex-shrink: 0;
}

.pendo-drawer__title {
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #3A3C45; /* gray-90 */
  margin: 0;
}

.pendo-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 26px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  color: #2A2C35; /* gray-100 */
  transition: background-color 0.15s ease, color 0.15s ease;
}

.pendo-drawer__close:hover {
  background-color: #EAECF1; /* gray-30 */
  color: #2A2C35;
}

.pendo-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
}

.pendo-drawer__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #DADCE5; /* gray-40 */
  flex-shrink: 0;
}

.pendo-drawer__footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pendo-drawer__footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ========================================
   FULLSCREEN SPECIFIC STYLES
   ======================================== */
.pendo-drawer--fullscreen .pendo-drawer__panel {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  box-shadow: none;
}

.pendo-drawer--fullscreen .pendo-drawer__body {
  background-color: #F8F8F9; /* gray-10 */
  padding: 0;
}

.pendo-drawer--fullscreen .pendo-drawer__header {
  background-color: #ffffff;
}

.pendo-drawer--fullscreen .pendo-drawer__footer {
  background-color: #ffffff;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-100%);
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>

