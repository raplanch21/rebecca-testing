<script setup>
import SignalsExportShell from './SignalsExportShell.vue'
import SignalsInboxPage from './SignalsInboxPage.vue'

const emit = defineEmits(['ask-leo'])

function onAsk(value) {
  emit('ask-leo', { type: 'prompt', text: value })
}

function onAskFromInbox(payload) {
  emit('ask-leo', { type: 'signal', signal: payload })
}
</script>

<template>
  <SignalsExportShell @ask="onAsk">
    <SignalsInboxPage @ask-leo="onAskFromInbox" />
  </SignalsExportShell>
</template>
