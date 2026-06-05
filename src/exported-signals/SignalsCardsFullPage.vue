<script setup>
import SignalsExportShell from './SignalsExportShell.vue'
import SignalsCardsPage from './SignalsCardsPage.vue'

const emit = defineEmits(['ask-leo'])

function onAsk(value) {
  emit('ask-leo', { type: 'prompt', text: value })
}

function onAskFromCard(signal) {
  emit('ask-leo', { type: 'signal', signal })
}
</script>

<template>
  <SignalsExportShell @ask="onAsk">
    <SignalsCardsPage @ask-leo="onAskFromCard" />
  </SignalsExportShell>
</template>
