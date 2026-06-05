# Code Examples

## Working code snippets for common use cases

---

## Example 1: Basic Usage

```vue
<template>
  <div>
    <button @click="openModal">Open Agent Mode</button>
    
    <AgentModeModal 
      :is-open="isOpen"
      title="Account retention"
      initial-context="Show me retention insights"
      @close="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}
</script>
```

---

## Example 2: With v-model

```vue
<template>
  <div>
    <button @click="isOpen = true">Open Agent Mode</button>
    
    <AgentModeModal 
      v-model:is-open="isOpen"
      title="Feature adoption"
      initial-context="Analyze feature adoption trends"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)
</script>
```

---

## Example 3: Dynamic Context

```vue
<template>
  <div class="dashboard">
    <div 
      v-for="insight in insights" 
      :key="insight.id"
      class="insight-card"
    >
      <h3>{{ insight.title }}</h3>
      <p>{{ insight.value }}</p>
      
      <button @click="askAboutInsight(insight)">
        Ask Agent Mode
      </button>
    </div>
    
    <AgentModeModal 
      :is-open="agentOpen"
      :title="selectedInsight.title"
      :initial-context="selectedInsight.context"
      @close="agentOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const agentOpen = ref(false)
const selectedInsight = ref({ title: '', context: '' })

const insights = ref([
  {
    id: 1,
    title: 'Account retention',
    value: '55%',
    context: 'Accounts that adopt Create Dashboard within 14 days retain at 89%'
  },
  {
    id: 2,
    title: 'Feature adoption',
    value: '7.5K',
    context: '7.5K users actively engaged with New Dashboard'
  }
])

const askAboutInsight = (insight) => {
  selectedInsight.value = {
    title: insight.title,
    context: insight.context
  }
  agentOpen.value = true
}
</script>
```

---

## Example 4: With Welcome Screen

```vue
<template>
  <button @click="openGeneral">Open General Agent Mode</button>
  
  <AgentModeModal 
    :is-open="isOpen"
    title="Agent mode"
    initial-context="How can I help you today?"
    @close="isOpen = false"
  />
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)

const openGeneral = () => {
  isOpen.value = true
}
</script>
```

---

## Example 5: With Event Emitter Composable

```javascript
// composables/useAgentMode.js
import { ref } from 'vue'

const isOpen = ref(false)
const modalTitle = ref('Agent mode')
const modalContext = ref('')

export function useAgentMode() {
  const open = (title, context) => {
    modalTitle.value = title
    modalContext.value = context
    isOpen.value = true
  }
  
  const close = () => {
    isOpen.value = false
  }
  
  return {
    isOpen,
    modalTitle,
    modalContext,
    open,
    close
  }
}
```

```vue
<!-- App.vue -->
<template>
  <router-view />
  
  <AgentModeModal 
    v-model:is-open="isOpen"
    :title="modalTitle"
    :initial-context="modalContext"
  />
</template>

<script setup>
import { useAgentMode } from '@/composables/useAgentMode'
import AgentModeModal from '@/components/AgentModeModal.vue'

const { isOpen, modalTitle, modalContext } = useAgentMode()
</script>
```

```vue
<!-- Any component -->
<template>
  <button @click="openAgent">Ask Agent</button>
</template>

<script setup>
import { useAgentMode } from '@/composables/useAgentMode'

const { open } = useAgentMode()

const openAgent = () => {
  open('Account retention', 'Show retention insights')
}
</script>
```

---

## Example 6: Custom Response Handler

```vue
<!-- CustomAgentModal.vue -->
<template>
  <AgentModeModal 
    ref="agentModalRef"
    :is-open="isOpen"
    :title="title"
    :initial-context="context"
    @close="isOpen = false"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  context: String
})

const emit = defineEmits(['close', 'action-clicked'])

const agentModalRef = ref(null)

// Override action handler
watch(() => props.isOpen, (newVal) => {
  if (newVal && agentModalRef.value) {
    // Access internal methods if needed
    // Or listen to custom events
  }
})
</script>
```

---

## Example 7: With Router Navigation

```vue
<template>
  <AgentModeModal 
    :is-open="isOpen"
    title="Insights Navigation"
    initial-context="Where would you like to go?"
    @close="isOpen = false"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AgentModeModal from '@/components/AgentModeModal.vue'

const router = useRouter()
const isOpen = ref(false)

// Handle suggested actions with navigation
const handleAction = (action) => {
  switch(action) {
    case 'view-reports':
      router.push('/reports')
      break
    case 'create-dashboard':
      router.push('/dashboards/new')
      break
    case 'analyze-trends':
      router.push('/analytics/trends')
      break
  }
  isOpen.value = false
}
</script>
```

---

## Example 8: With API Integration

```vue
<template>
  <AgentModeModal 
    :is-open="isOpen"
    :title="title"
    :initial-context="context"
    @close="handleClose"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const props = defineProps({
  isOpen: Boolean,
  insightId: String
})

const title = ref('')
const context = ref('')

// Fetch insight data when opening
watch(() => props.isOpen, async (newVal) => {
  if (newVal && props.insightId) {
    try {
      const response = await fetch(`/api/insights/${props.insightId}`)
      const data = await response.json()
      
      title.value = data.title
      context.value = data.summary
    } catch (error) {
      console.error('Failed to load insight:', error)
      title.value = 'Agent mode'
      context.value = 'How can I help you today?'
    }
  }
})

const handleClose = () => {
  emit('close')
}
</script>
```

---

## Example 9: With Keyboard Shortcut

```vue
<template>
  <div>
    <p>Press <kbd>Cmd+K</kbd> to open Agent Mode</p>
    
    <AgentModeModal 
      :is-open="isOpen"
      title="Agent mode"
      initial-context="How can I help you today?"
      @close="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)

const handleKeydown = (event) => {
  // Cmd+K or Ctrl+K
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    isOpen.value = !isOpen.value
  }
  
  // Escape to close
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
```

---

## Example 10: Custom Styling

```vue
<template>
  <AgentModeModal 
    :is-open="isOpen"
    title="Custom Styled Agent"
    initial-context="Custom theme example"
    @close="isOpen = false"
    class="custom-agent-modal"
  />
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(true)
</script>

<style>
/* Override modal styles */
.custom-agent-modal .agent-modal {
  width: 600px;
  height: 800px;
  border: 2px solid #your-color;
  border-radius: 16px;
}

.custom-agent-modal .agent-modal__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-agent-modal .agent-modal__send-btn {
  background-color: #667eea;
}

.custom-agent-modal .agent-modal__send-btn:hover {
  background-color: #5a67d8;
}

.custom-agent-modal .agent-modal__title {
  color: #fff;
}
</style>
```

---

## Example 11: With Teleport (Portal)

```vue
<template>
  <div>
    <button @click="isOpen = true">Open Agent</button>
    
    <!-- Teleport to body -->
    <Teleport to="body">
      <AgentModeModal 
        :is-open="isOpen"
        title="Teleported Agent Mode"
        initial-context="I'm rendered at body level"
        @close="isOpen = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)
</script>
```

---

## Example 12: With Loading State

```vue
<template>
  <div>
    <button @click="loadAndOpen" :disabled="loading">
      {{ loading ? 'Loading...' : 'Open Agent Mode' }}
    </button>
    
    <AgentModeModal 
      :is-open="isOpen"
      :title="insightData.title"
      :initial-context="insightData.context"
      @close="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)
const loading = ref(false)
const insightData = ref({ title: '', context: '' })

const loadAndOpen = async () => {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    insightData.value = {
      title: 'Account retention',
      context: 'Loaded from API'
    }
    
    isOpen.value = true
  } catch (error) {
    console.error('Failed to load:', error)
  } finally {
    loading.value = false
  }
}
</script>
```

---

## Quick Reference

### Minimal Setup
```vue
<AgentModeModal :is-open="true" />
```

### With Props
```vue
<AgentModeModal 
  :is-open="isOpen"
  title="My Title"
  initial-context="My context"
  @close="isOpen = false"
/>
```

### Two-Way Binding
```vue
<AgentModeModal v-model:is-open="isOpen" />
```

### Event Handling
```vue
<AgentModeModal 
  :is-open="isOpen"
  @close="handleClose"
  @update:is-open="isOpen = $event"
/>
```

---

**Total Examples:** 12  
**Difficulty Range:** Beginner to Advanced  
**Copy-Paste Ready:** Yes
