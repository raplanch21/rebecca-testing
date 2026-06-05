<template>
  <div class="generative-insights-page">
    <iframe 
      src="/agent-analytics-insights.html" 
      class="insights-iframe"
      title="Agent Analytics Insights"
      @load="handleIframeLoad"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const handleIframeLoad = () => {
  console.log('Agent Analytics Insights loaded')
}

onMounted(() => {
  // Ensure iframe takes full height
  const adjustIframeHeight = () => {
    const iframe = document.querySelector('.insights-iframe')
    if (iframe) {
      iframe.style.height = `${window.innerHeight - 80}px`
    }
  }
  
  adjustIframeHeight()
  window.addEventListener('resize', adjustIframeHeight)
})
</script>

<style scoped>
.generative-insights-page {
  width: 100%;
  height: 100vh;
  background: var(--gray-0);
  overflow: hidden;
}

.insights-iframe {
  width: 100%;
  height: calc(100vh - 80px);
  border: none;
  display: block;
}
</style>
