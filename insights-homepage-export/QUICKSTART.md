# 🚀 Quick Start - 5 Minutes to Running

## Step 1: Install Dependencies (30 seconds)
```bash
npm install lucide-vue-next
```

## Step 2: Copy Files (1 minute)
Copy the entire export folder structure to your Vue 3 project:

```
your-app/src/
├── views/
│   └── InsightsHome.vue           ← Copy this
├── components/
│   ├── InsightCard.vue            ← Copy this
│   ├── GroupedInsightCard.vue     ← Copy this
│   ├── AgentModeModal.vue         ← Copy this
│   ├── agent/
│   │   └── AccountRetentionResponse.vue  ← Copy this
│   └── pendo/
│       └── (all 5 files)          ← Copy these
└── assets/
    └── index.css                   ← Copy or merge this
```

## Step 3: Import CSS (30 seconds)
In your `main.js` or `main.ts`:
```javascript
import './assets/index.css'
```

## Step 4: Use the Component (2 minutes)
**Option A - With Router:**
```javascript
// router/index.js
import InsightsHome from '@/views/InsightsHome.vue'

const routes = [
  {
    path: '/insights',
    name: 'Insights',
    component: InsightsHome
  }
]
```

**Option B - Direct in App.vue:**
```vue
<template>
  <InsightsHome 
    variant="default"
    :is-global-agent-mode-open="isAgentOpen"
    :agent-mode-context="agentContext"
    @open-global-agent-mode="openAgent"
    @close-global-agent-mode="isAgentOpen = false"
  />
</template>

<script setup>
import InsightsHome from './views/InsightsHome.vue'
import { ref } from 'vue'

const isAgentOpen = ref(false)
const agentContext = ref({ title: '', context: '' })

const openAgent = (data) => {
  agentContext.value = data
  isAgentOpen.value = true
}
</script>
```

## Step 5: Run Your App (30 seconds)
```bash
npm run dev
```

Navigate to `/insights` (if using router) or your app root.

---

## ✅ That's it! You should see:
- Insight cards with metrics
- Expandable summaries
- Agent mode button
- Highlight cards
- Responsive layout

## 🎨 Quick Customizations

### Change Brand Color
```css
/* In assets/index.css */
:root {
  --teal-70: #YOUR_COLOR;
}
```

### Change Layout Variant
```vue
<!-- Change variant prop -->
<InsightsHome variant="grouped" />
<!-- Options: 'default', 'hidden-summary', 'grouped', 'menu' -->
```

### Connect Your Data
```javascript
// In InsightsHome.vue, replace sample data
const fetchInsights = async () => {
  const response = await fetch('/api/insights')
  const data = await response.json()
  // Map to component format
}
```

## 📚 Need More Details?
- **README.md** - Full documentation
- **INTEGRATION_GUIDE.md** - Detailed setup
- **PACKAGE_CONTENTS.txt** - What's included

## ❓ Troubleshooting

**Icons not showing?**
```bash
npm install lucide-vue-next
```

**Styles look wrong?**
- Check that `index.css` is imported in `main.js`
- Clear browser cache

**Component not found?**
- Verify file paths match your structure
- Check import statements

---

**Total Time: ~5 minutes** 🎉

You now have a fully functional Insights homepage ready to customize!
