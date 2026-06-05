<template>
  <div class="App">
    <!-- Toggle between views -->
    <div v-if="currentView === 'demo'" class="demo-view">
      <ComponentDemo />
      <div class="view-toggle-container">
        <button class="view-toggle" @click="currentView = 'insights'">
          View Insights Home →
        </button>
      </div>
    </div>
    <div v-else class="flex h-screen">
      <Navigation />
      <div class="ml-0 md:ml-[220px] w-full flex flex-col overflow-hidden">
        <InsightsHeader 
          v-model="insightVariant" 
          :is-agent-mode-open="isGlobalAgentModeOpen"
          @toggle-agent-mode="toggleGlobalAgentMode"
        />
        <div class="flex-1 overflow-auto">
          <InsightsHome 
            :variant="insightVariant" 
            :is-global-agent-mode-open="isGlobalAgentModeOpen"
            :agent-mode-context="agentModeContext"
            @open-global-agent-mode="openGlobalAgentMode"
            @close-global-agent-mode="closeGlobalAgentMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigation from './components/Navigation.vue'
// import AppHeader from './components/Header.vue'
import ComponentDemo from './components/ComponentDemo.vue'
import InsightsHeader from './components/InsightsHeader.vue'
import InsightsHome from './views/InsightsHome.vue'

// Start with insights view to show the new page
const currentView = ref('insights')
// Insight card variant: 'default' or 'hidden-summary'
const insightVariant = ref('default')
// Global Agent mode state
const isGlobalAgentModeOpen = ref(false)
const agentModeContext = ref({ title: 'Agent mode', context: 'How can I help you today?' })

const toggleGlobalAgentMode = () => {
  isGlobalAgentModeOpen.value = !isGlobalAgentModeOpen.value
  if (isGlobalAgentModeOpen.value) {
    // Reset to default context when opening from header
    agentModeContext.value = { title: 'Agent mode', context: 'How can I help you today?' }
  }
}

const openGlobalAgentMode = (data) => {
  if (data) {
    agentModeContext.value = data
  }
  isGlobalAgentModeOpen.value = true
}

const closeGlobalAgentMode = () => {
  isGlobalAgentModeOpen.value = false
}
</script>

<style scoped>
.view-toggle-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.view-toggle {
  background: #2a2c35;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.view-toggle:hover {
  background: #3a3c45;
  transform: translateY(-2px);
}
</style>

