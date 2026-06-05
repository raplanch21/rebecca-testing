# Insights Homepage - Export Package

This package contains all the components and code needed to recreate the Insights Homepage in another application.

## Package Contents

### Views
- `views/InsightsHome.vue` - Main page component with all insights sections

### Components

#### Card Components
- `components/InsightCard.vue` - Individual insight card with metrics, trends, and expandable summaries
- `components/GroupedInsightCard.vue` - Grouped insight card for v3 variant (multiple items in one card)
- `components/AgentModeModal.vue` - Draggable modal for Agent mode interactions

#### Agent Components
- `components/agent/AccountRetentionResponse.vue` - Structured response component for account retention insights

#### Pendo Design System Components
- `components/pendo/PendoButton.vue` - Button component (primary, secondary, tertiary variants)
- `components/pendo/PendoIcon.vue` - Icon component using Lucide icons
- `components/pendo/PendoAppTag.vue` - App/feature tag with icon
- `components/pendo/PendoFilterTag.vue` - Filter pill tag
- `components/pendo/PendoTrendTag.vue` - Trend percentage badge (positive/negative)

### Assets
- `assets/index.css` - Complete CSS with design tokens, color palette, and utility classes

## Installation Requirements

### NPM Packages
```json
{
  "dependencies": {
    "vue": "^3.x",
    "lucide-vue-next": "^0.x"
  }
}
```

### Fonts
The design uses three font families (included via Google Fonts CDN in index.css):
- **Inter** - Primary UI font
- **Sora** - Heading font (used for page title and some large text)
- **DM Mono** - Monospace font (used for code/technical tags)

## Features Included

### Insight Card Variants
1. **Default (v1)** - Two-column layout with floating chip CTA
2. **Hidden Summary (v2)** - Three-column layout with simple CTA
3. **Grouped (v3)** - Two items per card with shared summary
4. **Menu (v4)** - Cards with dropdown menu in header

### Agent Mode Integration
- Draggable modal interface
- Context-aware responses based on insight type
- Suggested action items
- Loading states and animations
- Welcome screen for empty state

### Interactive Features
- Expandable insight summaries
- Trend indicators (positive/negative percentages)
- Secondary metrics section
- App/feature tags
- Filter tags
- "See all" expand/collapse functionality
- Highlight cards with thumbs up/down feedback

## Design System

### Color Palette
The design uses a comprehensive color system with multiple palettes:
- **Gray** - 12 shades (0-110) for neutral elements
- **Teal** - Primary brand color with 12 shades (5-120)
- **Green** - Success states and positive trends
- **Red** - Error states and negative trends
- **Purple, Pink, Blue, Yellow, Orange, Magenta** - Accent colors

All colors are defined as CSS variables in `assets/index.css`.

### Typography Scale
- **Page Title**: 36px, Sora, 600 weight
- **Section Title**: 16px, Inter, 600 weight
- **Card Title**: 16px, Inter, 600 weight
- **Body Text**: 14.222px, Inter, 400 weight
- **Small Text**: 12.642px, Inter, 400 weight
- **Metric Value**: 32px, Inter, 700 weight

### Spacing System
Consistent spacing variables:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## Key Component Props

### InsightsHome
```javascript
{
  variant: 'default' | 'hidden-summary' | 'grouped' | 'menu',
  isGlobalAgentModeOpen: Boolean,
  agentModeContext: { title: String, context: String }
}
```

### InsightCard
```javascript
{
  title: String,
  primaryLabel: String,
  primaryValue: String,
  primaryTrend: Number,
  description: String,
  range: String,
  secondaryMetrics: Array,
  summary: String,
  ctaVariant: 'button' | 'floating-chip' | 'badge' | 'simple-cta',
  hideSummaryPreview: Boolean,
  showMenu: Boolean
}
```

### GroupedInsightCard
```javascript
{
  title: String,
  items: Array, // Each item has: value, trend, description parts, range
  summary: String
}
```

### AgentModeModal
```javascript
{
  isOpen: Boolean,
  title: String,
  initialContext: String
}
```

## Responsive Design

The layout is fully responsive:
- **Desktop (>1280px)**: Full three-column or two-column layout
- **Tablet (1024-1279px)**: Two-column layout
- **Mobile (<1024px)**: Single-column layout with adjusted padding

## Integration Steps

1. **Install Dependencies**
   ```bash
   npm install vue@^3 lucide-vue-next
   ```

2. **Copy Files**
   - Place all component files in your components directory
   - Add `index.css` to your assets or import it globally

3. **Import Fonts**
   - The `index.css` already includes Google Fonts import
   - Or add to your HTML: 
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600&family=DM+Mono:wght@400;500;600&display=swap" rel="stylesheet">
   ```

4. **Use the Page**
   ```vue
   <template>
     <InsightsHome 
       variant="default"
       :is-global-agent-mode-open="isAgentModeOpen"
       :agent-mode-context="agentContext"
       @open-global-agent-mode="handleOpenAgentMode"
       @close-global-agent-mode="handleCloseAgentMode"
     />
   </template>

   <script setup>
   import InsightsHome from './views/InsightsHome.vue'
   import { ref } from 'vue'

   const isAgentModeOpen = ref(false)
   const agentContext = ref({ title: 'Agent mode', context: '' })

   const handleOpenAgentMode = (data) => {
     agentContext.value = data
     isAgentModeOpen.value = true
   }

   const handleCloseAgentMode = () => {
     isAgentModeOpen.value = false
   }
   </script>
   ```

## Customization

### Change Colors
Edit CSS variables in `assets/index.css`:
```css
:root {
  --teal-70: #128297;  /* Primary brand color */
  --gray-100: #2A2C35; /* Primary text color */
  /* ... etc */
}
```

### Change Variants
Pass different `variant` prop to InsightsHome:
- `"default"` - Original design
- `"hidden-summary"` - Collapsed preview
- `"grouped"` - Multi-item cards
- `"menu"` - With dropdown menus

### Customize Data
The InsightsHome component contains sample data. Update the data arrays:
- `accountRetentionMetrics`
- `agentRetentionMetrics`
- `groupedInsights`
- Summary text variables

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

## License

This code is provided as-is for internal use within your organization.

---

**Last Updated**: February 2026
**Version**: 1.0.0
