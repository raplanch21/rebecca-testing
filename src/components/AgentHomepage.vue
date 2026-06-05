<script setup>
import { SignalsCardsFullPage } from '../exported-signals'

const emit = defineEmits(['open-global-agent-mode'])

function handleAskLeo(payload) {
  const promptText = typeof payload?.text === 'string' ? payload.text.trim() : ''
  const context = promptText || 'User interacted with Ask Leo from Agent homepage signals.'

  emit('open-global-agent-mode', {
    title: 'Ask Leo',
    context
  })
}
</script>

<template>
  <div class="agent-homepage">
    <SignalsCardsFullPage @ask-leo="handleAskLeo" />
  </div>
</template>

<style scoped>
.agent-homepage {
  min-height: 100%;
  background: var(--fy27-color-bg);
}
</style>
