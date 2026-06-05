# Implementation Guide

## Complete Integration Steps

### Prerequisites
- Vue 3 project
- Node.js/npm installed
- Basic understanding of Vue Composition API

---

## Step 1: Install Dependencies

```bash
npm install lucide-vue-next
```

**Why:** Agent Mode uses Lucide for icons (sparkle, arrows, controls)

---

## Step 2: Copy Component Files

### File Structure
```
your-app/src/
├── components/
│   ├── AgentModeModal.vue              # Main modal component (1,170 lines)
│   ├── agent/
│   │   └── AccountRetentionResponse.vue  # Structured response (414 lines)
│   └── pendo/
│       └── PendoIcon.vue                # Icon component (172 lines)
```

### Source Files
Copy from `insights-homepage-export/`:
- `components/AgentModeModal.vue`
- `components/agent/AccountRetentionResponse.vue`
- `components/pendo/PendoIcon.vue`

---

## Step 3: Choose Integration Pattern

### Pattern A: Page-Level Integration

**Use when:** Agent mode is specific to one page

```vue
<!-- views/InsightsPage.vue -->
<template>
  <div class="insights-page">
    <h1>Insights</h1>
    
    <!-- Insight cards -->
    <InsightCard 
      v-for="insight in insights"
      :key="insight.id"
      v-bind="insight"
      @open-agent-mode="openAgent"
    />
    
    <!-- Agent Mode Modal -->
    <AgentModeModal 
      :is-open="agentOpen"
      :title="agentData.title"
      :initial-context="agentData.context"
      @close="agentOpen = false"
      @update:is-open="agentOpen = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'
import InsightCard from '@/components/InsightCard.vue'

const agentOpen = ref(false)
const agentData = ref({ title: '', context: '' })

const openAgent = (data) => {
  agentData.value = data
  agentOpen.value = true
}

const insights = ref([
  {
    title: 'Account retention',
    primaryValue: '55%',
    // ... more props
  }
])
</script>
```

### Pattern B: App-Level Integration

**Use when:** Agent mode available globally across all pages

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <Navigation @open-agent="handleOpenAgent" />
    
    <router-view @open-agent="handleOpenAgent" />
    
    <!-- Global Agent Mode Modal -->
    <AgentModeModal 
      :is-open="globalAgentOpen"
      :title="globalAgentData.title"
      :initial-context="globalAgentData.context"
      @close="handleCloseAgent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const globalAgentOpen = ref(false)
const globalAgentData = ref({ 
  title: 'Agent mode', 
  context: 'How can I help you today?' 
})

const handleOpenAgent = (data) => {
  globalAgentData.value = data
  globalAgentOpen.value = true
}

const handleCloseAgent = () => {
  globalAgentOpen.value = false
}
</script>
```

### Pattern C: State Management (Pinia/Vuex)

**Use when:** Complex app with centralized state

#### Create Store
```javascript
// stores/agentMode.js
import { defineStore } from 'pinia'

export const useAgentModeStore = defineStore('agentMode', {
  state: () => ({
    isOpen: false,
    title: 'Agent mode',
    context: 'How can I help you today?'
  }),
  
  actions: {
    open(title, context) {
      this.title = title
      this.context = context
      this.isOpen = true
    },
    
    close() {
      this.isOpen = false
    },
    
    setTitle(title) {
      this.title = title
    },
    
    setContext(context) {
      this.context = context
    }
  },
  
  getters: {
    isActive: (state) => state.isOpen
  }
})
```

#### Use in App.vue
```vue
<template>
  <div id="app">
    <router-view />
    
    <AgentModeModal 
      v-model:is-open="store.isOpen"
      :title="store.title"
      :initial-context="store.context"
      @close="store.close()"
    />
  </div>
</template>

<script setup>
import { useAgentModeStore } from '@/stores/agentMode'
import AgentModeModal from '@/components/AgentModeModal.vue'

const store = useAgentModeStore()
</script>
```

#### Trigger from Any Component
```vue
<template>
  <button @click="openAgent">
    Ask Agent Mode
  </button>
</template>

<script setup>
import { useAgentModeStore } from '@/stores/agentMode'

const store = useAgentModeStore()

const openAgent = () => {
  store.open('Account retention', 'Show me retention insights')
}
</script>
```

---

## Step 4: Connect to Insight Cards

### InsightCard Integration

```vue
<!-- InsightCard.vue -->
<template>
  <div class="insight-card">
    <h3>{{ title }}</h3>
    <p>{{ primaryValue }}</p>
    
    <!-- Agent Mode Button -->
    <button @click="handleAgentClick">
      <PendoIcon type="sparkle" :size="16" />
      <span>Ask in Agent mode</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  primaryValue: String,
  summary: String
})

const emit = defineEmits(['open-agent-mode'])

const handleAgentClick = () => {
  emit('open-agent-mode', {
    title: props.title,
    context: props.summary
  })
}
</script>
```

---

## Step 5: Customize Responses (Optional)

### Add New Insight Type

Edit `AgentModeModal.vue` around line 333:

```javascript
const generateInsightResponse = (insight, title) => {
  // Add your custom insight type
  if (title.toLowerCase().includes('your custom type')) {
    return {
      content: `<p>Your custom <strong>AI response</strong> here.</p>`,
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Custom action 1', action: 'custom-1' },
        { label: 'Custom action 2', action: 'custom-2' },
        { label: 'Custom action 3', action: 'custom-3' }
      ]
    }
  }
  
  // ... existing insight types
}
```

### Handle Custom Actions

```javascript
const handleSuggestedAction = (action) => {
  console.log('Action clicked:', action)
  
  // Add custom logic
  if (action.action === 'custom-1') {
    // Navigate, open modal, etc.
    router.push('/custom-page')
  }
}
```

---

## Step 6: Style Customization

### Change Brand Colors

```css
/* In AgentModeModal.vue <style scoped> */

/* Change primary button color */
.agent-modal__send-btn {
  background-color: #your-brand-color;
}

.agent-modal__send-btn:hover {
  background-color: #your-brand-color-dark;
}

/* Change "New" button color */
.agent-modal__new-btn span {
  background-color: #your-brand-color;
}

/* Change action item color */
.agent-modal__action-item {
  color: #your-brand-color;
}
```

### Change Modal Size

```css
.agent-modal {
  width: 600px;  /* Change from 471px */
  height: 900px; /* Change from 760px */
}
```

### Change Position

```javascript
// In AgentModeModal.vue, line ~169
const defaultPosition = { top: 100, right: 40 }  // Adjust these
```

---

## Step 7: Add Backend Integration (Advanced)

### Replace Mock Responses with API

```javascript
// Add this method in AgentModeModal.vue
const fetchAIResponse = async (insight, title) => {
  try {
    const response = await fetch('/api/agent-mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        insight,
        title,
        userId: currentUser.value.id
      })
    })
    
    const data = await response.json()
    
    return {
      content: data.response,
      actionsLabel: data.actionsLabel,
      actions: data.actions
    }
  } catch (error) {
    console.error('AI response error:', error)
    return generateInsightResponse(insight, title)  // Fallback
  }
}

// Then in the watch for isOpen, replace:
const response = generateInsightResponse(...)

// With:
const response = await fetchAIResponse(...)
```

---

## Step 8: Testing

### Test Checklist

#### Basic Functionality
- [ ] Modal opens when triggered
- [ ] Modal closes with X button
- [ ] Modal slides in smoothly from right
- [ ] Welcome screen shows when context is empty

#### Dragging
- [ ] Can click and drag header
- [ ] Modal follows cursor
- [ ] Snaps back to position when released near default
- [ ] Position resets when modal closes

#### Messages
- [ ] User messages display right-aligned
- [ ] AI messages display left-aligned
- [ ] Timestamps show correctly
- [ ] Loading animation appears
- [ ] Action items are clickable

#### Input
- [ ] Textarea expands when typing
- [ ] Send button disabled when empty
- [ ] Send button enabled when text present
- [ ] Enter key sends message
- [ ] Input clears after sending

#### Responsive
- [ ] Desktop: 471px width
- [ ] Mobile: Full width with padding
- [ ] Keyboard accessible
- [ ] Touch-friendly (mobile)

### Testing Code

```javascript
// Create test component
<template>
  <div>
    <button @click="testOpen">Test Open</button>
    <button @click="testWithContext">Test with Context</button>
    <button @click="testClose">Test Close</button>
    
    <AgentModeModal 
      :is-open="isOpen"
      :title="title"
      :initial-context="context"
      @close="isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AgentModeModal from '@/components/AgentModeModal.vue'

const isOpen = ref(false)
const title = ref('Test Mode')
const context = ref('')

const testOpen = () => {
  title.value = 'Test Mode'
  context.value = 'How can I help you today?'
  isOpen.value = true
}

const testWithContext = () => {
  title.value = 'Account retention'
  context.value = 'Show me account retention insights'
  isOpen.value = true
}

const testClose = () => {
  isOpen.value = false
}
</script>
```

---

## Step 9: Production Checklist

### Before Deploy

- [ ] Remove console.log statements
- [ ] Test on all target browsers
- [ ] Test on mobile devices
- [ ] Verify API integration (if added)
- [ ] Check accessibility with screen reader
- [ ] Test keyboard navigation
- [ ] Verify z-index doesn't conflict
- [ ] Test with long messages
- [ ] Test with empty states
- [ ] Test drag performance
- [ ] Check bundle size impact

### Performance Optimization

```javascript
// Add lazy loading if needed
const AgentModeModal = defineAsyncComponent(() =>
  import('@/components/AgentModeModal.vue')
)
```

---

## Common Issues & Solutions

### Issue: Modal doesn't appear
**Solution:** Check z-index, ensure `isOpen` is true

### Issue: Icons don't show
**Solution:** `npm install lucide-vue-next`

### Issue: Can't drag modal
**Solution:** Check DevTools console for errors

### Issue: Styles look wrong
**Solution:** Ensure CSS variables are defined in global styles

### Issue: Messages don't scroll
**Solution:** Check `conversationRef` is properly bound

### Issue: Input doesn't expand
**Solution:** Verify `adjustTextareaHeight` is called on input

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Copy files
3. ✅ Choose integration pattern
4. ✅ Connect to trigger points
5. ⚙️ Customize responses (optional)
6. ⚙️ Style to match brand (optional)
7. ⚙️ Add backend integration (optional)
8. ✅ Test thoroughly
9. ✅ Deploy

---

**Estimated Time:**  
- Basic: 30 minutes  
- With customization: 2 hours  
- With backend: 4+ hours
