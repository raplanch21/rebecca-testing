# Quick Start - Agent Mode in 10 Minutes

## Step 1: Copy Files (2 minutes)

Copy these 3 files to your project:

```
your-app/src/
├── components/
│   ├── AgentModeModal.vue              ← Copy from export
│   ├── agent/
│   │   └── AccountRetentionResponse.vue  ← Copy from export
│   └── pendo/
│       └── PendoIcon.vue               ← Copy from export
```

**Source location:**
- `insights-homepage-export/components/AgentModeModal.vue`
- `insights-homepage-export/components/agent/AccountRetentionResponse.vue`
- `insights-homepage-export/components/pendo/PendoIcon.vue`

## Step 2: Install Dependencies (30 seconds)

```bash
npm install lucide-vue-next
```

## Step 3: Add to Your Component (5 minutes)

### Basic Implementation

```vue
<template>
  <div class="your-page">
    <!-- Your existing content -->
    
    <!-- Trigger button -->
    <button @click="openAgentMode">
      Ask Agent Mode
    </button>
    
    <!-- Agent Mode Modal -->
    <AgentModeModal 
      :is-open="isAgentOpen"
      :title="agentTitle"
      :initial-context="agentContext"
      @close="closeAgentMode"
      @update:is-open="isAgentOpen = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

// State
const isAgentOpen = ref(false)
const agentTitle = ref('Agent mode')
const agentContext = ref('How can I help you today?')

// Methods
const openAgentMode = () => {
  agentTitle.value = 'Account retention'
  agentContext.value = 'Show me retention insights'
  isAgentOpen.value = true
}

const closeAgentMode = () => {
  isAgentOpen.value = false
}
</script>
```

## Step 4: Test It (2 minutes)

1. **Click the trigger button** - Modal should slide in from right
2. **Try dragging** - Click and drag the top handle
3. **Type a message** - Input should expand
4. **Close it** - Click X button

## ✅ Done!

You now have a working Agent Mode modal!

---

## Common Integration Patterns

### Pattern 1: With Insight Cards

```vue
<template>
  <InsightCard 
    title="Account retention"
    @open-agent-mode="handleOpenAgent"
  />
  
  <AgentModeModal 
    :is-open="isOpen"
    :title="context.title"
    :initial-context="context.context"
    @close="isOpen = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const context = ref({ title: '', context: '' })

const handleOpenAgent = (data) => {
  context.value = data
  isOpen.value = true
}
</script>
```

### Pattern 2: Global App Level

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <Navigation @open-agent="openAgent" />
    <router-view @open-agent="openAgent" />
    
    <AgentModeModal 
      :is-open="globalAgentOpen"
      :title="agentData.title"
      :initial-context="agentData.context"
      @close="globalAgentOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const globalAgentOpen = ref(false)
const agentData = ref({ title: 'Agent mode', context: '' })

const openAgent = (data) => {
  agentData.value = data
  globalAgentOpen.value = true
}
</script>
```

### Pattern 3: With State Management (Pinia)

```javascript
// stores/agentMode.js
import { defineStore } from 'pinia'

export const useAgentModeStore = defineStore('agentMode', {
  state: () => ({
    isOpen: false,
    title: 'Agent mode',
    context: ''
  }),
  
  actions: {
    open(title, context) {
      this.title = title
      this.context = context
      this.isOpen = true
    },
    
    close() {
      this.isOpen = false
    }
  }
})
```

```vue
<!-- Any component -->
<template>
  <button @click="store.open('Retention', 'Show insights')">
    Ask Agent
  </button>
</template>

<script setup>
import { useAgentModeStore } from '@/stores/agentMode'
const store = useAgentModeStore()
</script>
```

```vue
<!-- App.vue -->
<template>
  <AgentModeModal 
    :is-open="store.isOpen"
    :title="store.title"
    :initial-context="store.context"
    @close="store.close()"
  />
</template>

<script setup>
import { useAgentModeStore } from '@/stores/agentMode'
const store = useAgentModeStore()
</script>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | Boolean | `false` | Controls modal visibility |
| `title` | String | `'Acme finance...'` | Modal header title |
| `initialContext` | String | `''` | Starting context/prompt |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | `none` | Modal close requested |
| `update:isOpen` | `Boolean` | Two-way binding for isOpen |

## Customization

### Change Size
```css
.agent-modal {
  width: 600px;  /* Change from 471px */
  height: 900px; /* Change from 760px */
}
```

### Change Position
```css
.agent-modal {
  top: 100px;   /* Change from 80px */
  right: 40px;  /* Change from 24px */
}
```

### Change Colors
```css
.agent-modal__header {
  background-color: #your-color;
}

.agent-modal__send-btn {
  background-color: #your-brand-color;
}
```

## Troubleshooting

### Modal doesn't open
- Check `isOpen` prop is `true`
- Verify component is imported correctly

### Icons not showing
```bash
npm install lucide-vue-next
```

### Can't drag modal
- Check browser DevTools for JavaScript errors
- Verify drag event listeners are attached

### Modal appears behind content
Add to CSS:
```css
.agent-modal {
  z-index: 9999 !important;
}
```

## Next Steps

- **Customize responses:** Edit `AgentModeModal.vue` line ~333-460
- **Add actions:** Modify suggested action handlers
- **Style it:** Update colors and spacing
- **Connect API:** Replace mock responses with real API calls

## Resources

- `COMPONENT_GUIDE.md` - Complete props/events reference
- `FEATURES.md` - Feature details and behavior
- `IMPLEMENTATION.md` - Advanced integration patterns
- `CODE_EXAMPLES.md` - More code samples

---

**Time to implement:** ~10 minutes  
**Difficulty:** Easy  
**Dependencies:** Vue 3, lucide-vue-next
