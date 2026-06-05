<template>
  <div class="signals-dashboard-react-shell">
    <div v-if="mountError" class="signals-dashboard-react-error">
      Failed to render Signals dashboard JSX: {{ mountError }}
    </div>
    <div ref="mountEl" class="signals-dashboard-react-host"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import SignalsDashboard from './SignalsDashboardInsights.jsx'

const mountEl = ref(null)
const mountError = ref('')
let root = null

onMounted(() => {
  try {
    if (!mountEl.value) return
    root = createRoot(mountEl.value)
    root.render(createElement(SignalsDashboard))
  } catch (err) {
    mountError.value = err instanceof Error ? err.message : String(err)
  }
})

onBeforeUnmount(() => {
  if (root) root.unmount()
})
</script>

<style scoped>
.signals-dashboard-react-shell {
  height: 100%;
  min-height: 0;
}

.signals-dashboard-react-host {
  height: 100%;
  min-height: 100%;
  overflow: auto;
}

.signals-dashboard-react-error {
  margin: 16px;
  padding: 12px;
  border: 1px solid #fda4af;
  background: #fff1f2;
  color: #9f1239;
  border-radius: 6px;
  font-size: 13px;
}
</style>
