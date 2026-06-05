<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="pendo-modal" @click.self="onMaskClick">
        <div class="pendo-modal__container">
          <div 
            tabindex="-1" 
            class="pendo-modal__content" 
            :style="{ cursor: 'default', width: width, height: height || 'auto' }">
            
            <!-- Header -->
            <div class="pendo-modal__header">
              <slot name="header" :close="close">
                <span class="pendo-modal__title">
                  <slot name="title">{{ title }}</slot>
                </span>
              </slot>
              <div v-if="showClose" class="pendo-modal__close">
                <button
                  class="pendo-modal__close-button"
                  aria-label="Close"
                  @click="close">
                  <PendoIcon type="x" :size="20" />
                </button>
              </div>
            </div>

            <!-- Content with tabs if provided -->
            <div class="pendo-modal__content-wrapper">
              <!-- Left sidebar for tabs -->
              <div v-if="$slots.tabs" class="pendo-modal__sidebar">
                <slot name="tabs" />
              </div>

              <!-- Main content area -->
              <div class="pendo-modal__body">
                <slot />
              </div>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="pendo-modal__footer">
              <slot name="footer" :close="close" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import PendoIcon from './PendoIcon.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '1024px'
  },
  height: {
    type: String,
    default: null
  },
  showClose: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:visible', 'close'])

const close = () => {
  emit('update:visible', false)
  emit('close')
}

const onMaskClick = () => {
  if (props.maskClosable) {
    close()
  }
}

// Lock body scroll when modal is open
watch(() => props.visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.pendo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(186, 188, 197, 0.5); /* gray-50 at 50% opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.pendo-modal__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pendo-modal__content {
  background: #ffffff;
  border: 1px solid #EAECF1; /* gray-30 */
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 48px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  position: relative;
}

.pendo-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border-bottom: 1px solid #DADCE5; /* gray-40 */
}

.pendo-modal__title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 22.781px;
  font-weight: 600;
  line-height: 1.3;
  color: #2A2C35; /* gray-100 */
}

.pendo-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pendo-modal__close-button {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6A6C75; /* gray-70 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}

.pendo-modal__close-button:hover {
  color: #2A2C35; /* gray-100 */
}

.pendo-modal__content-wrapper {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.pendo-modal__sidebar {
  border-right: 1px solid #DADCE5; /* gray-40 */
  padding: 16px 24px 16px 16px;
  min-width: 220px;
  flex-shrink: 0;
}

.pendo-modal__body {
  flex: 1;
  background: #F5F6F8; /* gray-10 */
  padding: 24px;
  overflow-y: auto;
}

.pendo-modal__footer {
  border-top: 1px solid #DADCE5; /* gray-40 */
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .pendo-modal__content,
.modal-leave-active .pendo-modal__content {
  transition: transform 0.2s ease;
}

.modal-enter-from .pendo-modal__content,
.modal-leave-to .pendo-modal__content {
  transform: scale(0.95);
}
</style>
