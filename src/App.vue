<template>
  <div class="App">
    <!-- FY27 full-page layout (isolated from prototype shell) -->
    <div v-if="isFy27Layout" class="fy27-layout-shell h-screen w-full overflow-y-auto overflow-x-hidden relative">
      <div class="fy27-page-menu">
        <PendoSelect
          v-model="activePage"
          :options="pageOptions"
          :editable="true"
          style="width: 260px;"
          @update:modelValue="handlePageChange"
          @update:options="handlePageRename"
        />
      </div>
      <router-view
        :configuration-type="configurationType"
        :is-global-agent-mode-open="isGlobalAgentModeOpen"
        :agent-mode-context="agentModeContext"
        @open-global-agent-mode="handleOpenAgentMode"
        @close-global-agent-mode="handleCloseAgentMode"
      />
    </div>

    <!-- Default layout with navigation -->
    <div v-else-if="isDefaultLayout" class="flex">
      <Navigation v-model:collapsed="navCollapsed" />
      <div class="min-w-0 flex-1" :class="navCollapsed ? 'ml-[64px]' : 'ml-[220px]'">
        <div class="bg-white h-screen flex flex-col overflow-hidden">
          <AppHeader 
            v-model:configuration-type="configurationType"
            v-model:active-page="activePage"
            :page-options="pageOptions"
            @page-change="handlePageChange"
            @page-rename="handlePageRename"
          />
          <div
            class="flex-1 bg-[var(--gray-10)]"
            :class="isHomeRoute ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'"
          >
            <router-view 
              :configuration-type="configurationType"
              :is-global-agent-mode-open="isGlobalAgentModeOpen"
              :agent-mode-context="agentModeContext"
              @open-global-agent-mode="handleOpenAgentMode"
              @close-global-agent-mode="handleCloseAgentMode"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Standalone layout without navigation -->
    <div v-else class="bg-white h-screen flex flex-col">
      <div class="border-b border-[var(--gray-30)] px-8 py-4 bg-white">
        <router-link to="/insights/feature-launch" class="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--teal-90)] hover:text-[var(--teal-100)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to dashboard
        </router-link>
      </div>
      <div class="flex-1 overflow-y-auto bg-[var(--gray-10)]">
        <router-view />
      </div>
    </div>
    
    <!-- Global Agent Mode Modal -->
    <AgentModeModal 
      :is-open="isGlobalAgentModeOpen"
      :title="agentModeContext.title"
      :initial-context="agentModeContext.context"
      @close="handleCloseAgentMode"
      @update:is-open="isGlobalAgentModeOpen = $event"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'
import AppHeader from './components/Header.vue'
import AgentModeModal from './components/AgentModeModal.vue'
import PendoSelect from './components/pendo/PendoSelect.vue'

const route = useRoute()
const router = useRouter()

const navCollapsed = ref(false)
const configurationType = ref('Blade configuration')
const activePage = ref('Dashboard')

const PAGE_LABELS_KEY = 'dxr-page-labels'

const defaultPageOptions = [
  { value: 'Home', label: 'Home' },
  { value: 'Dashboard', label: 'Autonomous Insights' },
  { value: 'Autonomous Insights preview', label: 'Autonomous Insights preview' },
  { value: 'Generative insights', label: 'Generative insights' },
  { value: 'Dashboard signals V1', label: 'Dashboard signals V1' },
  { value: 'Dashboard signals V2', label: 'Dashboard signals V2' },
  { value: 'Milestone3', label: 'Milestone 3' },
  { value: 'SubscriptionOptionA', label: 'Subscriptions: Option A' },
  { value: 'SubscriptionOptionB', label: 'Subscriptions: Option B' },
  { value: 'SubscriptionOptionC', label: 'Subscriptions: Option C' },
  { value: 'SubscriptionOptionD', label: 'Subscriptions: Option D' },
  { value: 'SubscriptionOptionE', label: 'Subscriptions: Option E' },
  { value: 'SignalsDashboardInsights', label: 'Signals dashboard insights' },
  { value: 'AgentHomepage', label: 'Agent homepage' },
]

function loadSavedLabels () {
  try {
    return JSON.parse(localStorage.getItem(PAGE_LABELS_KEY)) || {}
  } catch { return {} }
}

function applyLabels (options, saved) {
  return options.map(o => saved[o.value] ? { ...o, label: saved[o.value] } : o)
}

const pageOptions = ref(applyLabels(defaultPageOptions, loadSavedLabels()))

const isDefaultLayout = computed(() => {
  return route.meta.layout !== 'standalone'
})

const isFy27Layout = computed(() => {
  return route.meta.layout === 'fy27'
})

const isHomeRoute = computed(() => route.path === '/home')

// Global Agent Mode State
const isGlobalAgentModeOpen = ref(false)
const agentModeContext = ref({
  title: 'Agent mode',
  context: 'How can I help you today?'
})

const handleOpenAgentMode = (data) => {
  agentModeContext.value = {
    title: data.title || 'Agent mode',
    context: data.context || 'How can I help you today?'
  }
  isGlobalAgentModeOpen.value = true
}

const handleCloseAgentMode = () => {
  isGlobalAgentModeOpen.value = false
}

const pathToPageValue = {
  '/home': 'Home',
  '/insights/feature-launch': 'Dashboard',
  '/settings': 'Dashboard',
  '/insights/static-url': 'Autonomous Insights preview',
  '/insights/generative': 'Generative insights',
  '/insights/in-pendo-v1': 'Dashboard signals V1',
  '/insights/in-pendo-v2': 'Dashboard signals V2',
  '/insights/milestone-3': 'Milestone3',
  '/insights/milestone-3/blade': 'Milestone3',
  '/subscriptions/option-a': 'SubscriptionOptionA',
  '/subscriptions/option-b': 'SubscriptionOptionB',
  '/subscriptions/option-c': 'SubscriptionOptionC',
  '/subscriptions/option-d': 'SubscriptionOptionD',
  '/pndm-demo': 'SubscriptionOptionE',
  '/insights/signals-dashboard': 'SignalsDashboardInsights',
  '/agent-homepage': 'AgentHomepage'
}

watch(() => route.path, (newPath) => {
  const match = pathToPageValue[newPath]
  if (match) activePage.value = match
}, { immediate: true })

const pageValueToPath = Object.fromEntries(
  Object.entries(pathToPageValue)
    .filter(([path]) => path !== '/settings')
    .map(([path, value]) => [value, path])
)

const handlePageChange = (value) => {
  const target = pageValueToPath[value]
  if (target) router.push(target)
}

const handlePageRename = (updated) => {
  pageOptions.value = updated
  const saved = {}
  for (const opt of updated) {
    const def = defaultPageOptions.find(d => d.value === opt.value)
    if (def && opt.label !== def.label) saved[opt.value] = opt.label
  }
  localStorage.setItem(PAGE_LABELS_KEY, JSON.stringify(saved))
}
</script>

<style scoped>
.fy27-page-menu {
  position: absolute;
  top: 12px;
  right: 16px;
  z-index: 40;
}
</style>
