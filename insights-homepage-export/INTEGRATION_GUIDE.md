# Quick Integration Guide

## File Structure in Your App

```
your-app/
├── src/
│   ├── views/
│   │   └── InsightsHome.vue          ← Copy from export
│   ├── components/
│   │   ├── InsightCard.vue           ← Copy from export
│   │   ├── GroupedInsightCard.vue    ← Copy from export
│   │   ├── AgentModeModal.vue        ← Copy from export
│   │   ├── agent/
│   │   │   └── AccountRetentionResponse.vue  ← Copy from export
│   │   └── pendo/
│   │       ├── PendoButton.vue       ← Copy from export
│   │       ├── PendoIcon.vue         ← Copy from export
│   │       ├── PendoAppTag.vue       ← Copy from export
│   │       ├── PendoFilterTag.vue    ← Copy from export
│   │       └── PendoTrendTag.vue     ← Copy from export
│   └── assets/
│       └── index.css                  ← Copy from export or merge
```

## Installation Steps

### 1. Install Dependencies
```bash
npm install lucide-vue-next
```

### 2. Copy Files
Copy all files from the export package to your project, maintaining the folder structure.

### 3. Import CSS Globally
In your main entry file (e.g., `main.js` or `main.ts`):
```javascript
import './assets/index.css'
```

Or if you already have a global CSS file, merge the contents of `index.css` into it.

### 4. Add to Router (if using Vue Router)
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

### 5. Use Standalone (without router)
```vue
<template>
  <div class="app-container">
    <InsightsHome 
      :variant="currentVariant"
      :is-global-agent-mode-open="isAgentModeOpen"
      :agent-mode-context="agentContext"
      @open-global-agent-mode="handleOpenAgentMode"
      @close-global-agent-mode="handleCloseAgentMode"
    />
  </div>
</template>

<script setup>
import InsightsHome from './views/InsightsHome.vue'
import { ref } from 'vue'

const currentVariant = ref('default') // 'default' | 'hidden-summary' | 'grouped' | 'menu'
const isAgentModeOpen = ref(false)
const agentContext = ref({ 
  title: 'Agent mode', 
  context: 'How can I help you today?' 
})

const handleOpenAgentMode = (data) => {
  agentContext.value = data
  isAgentModeOpen.value = true
}

const handleCloseAgentMode = () => {
  isAgentModeOpen.value = false
}
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #FCFCFD;
}
</style>
```

## Connecting to Your Data

### Replace Sample Data with API Calls

In `InsightsHome.vue`, replace the hardcoded data with your API calls:

```javascript
// Instead of:
const accountRetentionMetrics = [
  { label: 'Dashboard creators', value: '89%', trend: 24 },
  { label: 'Non-creators', value: '38%', trend: 8 }
]

// Use:
import { ref, onMounted } from 'vue'

const accountRetentionMetrics = ref([])

onMounted(async () => {
  const response = await fetch('/api/insights/account-retention')
  const data = await response.json()
  accountRetentionMetrics.value = data.metrics
})
```

### Data Format Examples

#### For Regular Insight Cards
```javascript
{
  title: "Account retention",
  primaryLabel: "Overall retention",
  primaryValue: "55%",
  primaryTrend: 10,  // positive number for increase, negative for decrease
  range: "(50% → 55%)",
  description: "Your custom description text",
  secondaryMetrics: [
    { label: "Metric 1", value: "89%", trend: 24 },
    { label: "Metric 2", value: "38%", trend: -8 }
  ],
  summary: "Your insight summary with *bold* text supported"
}
```

#### For Grouped Insight Cards
```javascript
{
  title: "Retention by application",
  summary: "Overall insight summary across all items",
  items: [
    {
      value: "60%",
      trend: 11,
      descriptionPrefix: "60% of accounts who used",
      appLabel: "AcmeFinance",
      appIcon: "monitor",
      descriptionSuffix: "last month returned this",
      descriptionContinued: "month, an 11% increase.",
      range: "(54% → 60%)"
    }
  ]
}
```

## Customization Examples

### Change Primary Brand Color
In `assets/index.css`:
```css
:root {
  --teal-70: #your-brand-color;  /* Changes all teal-70 references */
  --teal-80: #your-darker-shade; /* For hover states */
  --teal-90: #your-darkest-shade; /* For active states */
}
```

### Adjust Card Styles
In the component's `<style scoped>` section, override:
```css
.insight-card {
  border-radius: 12px; /* Change from 8px */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Add shadow */
}
```

### Change Page Layout
In `InsightsHome.vue`:
```css
/* Change from 2-column to 3-column for default variant */
.insights-home__cards--two-col {
  grid-template-columns: repeat(3, 1fr); /* Change from 2 to 3 */
}
```

## Common Issues & Solutions

### Issue: Icons not showing
**Solution**: Make sure `lucide-vue-next` is installed:
```bash
npm install lucide-vue-next
```

### Issue: Fonts look different
**Solution**: Ensure the Google Fonts import is working. Check browser console for font loading errors.

### Issue: Colors not matching
**Solution**: Make sure `index.css` is imported globally in your main entry file.

### Issue: Components not found
**Solution**: Check that all file paths in import statements match your project structure. You may need to update relative paths.

### Issue: CSS conflicts with existing styles
**Solution**: The export uses scoped styles where possible, but some global styles exist. Either:
1. Namespace all CSS variables with a prefix (e.g., `--insights-teal-70`)
2. Wrap the InsightsHome in a container div with a unique class

## Testing After Integration

1. **Visual Check**: Compare with original design
   - Card layouts render correctly
   - Colors match the design system
   - Spacing and typography look right

2. **Interaction Check**:
   - Click "See all" to expand/collapse
   - Expand insight summaries
   - Open Agent mode modal
   - Drag Agent mode modal
   - Click CTA buttons

3. **Responsive Check**:
   - Test at 1920px (desktop)
   - Test at 1280px (laptop)
   - Test at 768px (tablet)
   - Test at 375px (mobile)

4. **Data Check**:
   - Replace sample data with real data
   - Verify trend indicators show correct colors (green for positive, red for negative)
   - Test with missing data (null values, empty arrays)

## Support

For questions or issues with integration:
1. Check the main README.md for component prop documentation
2. Review the source code comments in each component
3. Use browser DevTools to inspect styling and component hierarchy

---

**Need Help?** This is a self-contained package with no external dependencies (except Vue 3 and Lucide icons).
