# Icon System Documentation

## Overview

This project uses a **hybrid icon system** that combines **Lucide React icons** with **custom Figma assets**. This approach provides consistency, scalability, and brand alignment.

## 🏗️ Architecture

### Files Structure
```
src/
├── config/
│   └── iconConfig.js          # Master configuration for all icons
├── components/
│   ├── HybridIcon.jsx         # Core hybrid icon component
│   └── Icons.jsx              # Legacy icon components (being phased out)
├── assets/icons/
│   ├── 18px nav icons/        # Navigation icons from Figma
│   ├── Logo.svg               # Brand logo
│   └── [other design assets]  # Additional Figma exports
└── ICON_SYSTEM_DOCS.md        # This documentation file
```

## 🎯 Quick Usage

### For Navigation Icons
```jsx
import { SmartIcon } from '../components/HybridIcon'
import { NAVIGATION_ICONS } from '../config/iconConfig'

// Simple usage
<SmartIcon iconKey="home" iconConfig={NAVIGATION_ICONS} />

// With navigation wrapper (40px hover area)
<SmartIcon 
  iconKey="home" 
  iconConfig={NAVIGATION_ICONS} 
  wrapInNavItem={true}
  isActive={true}
/>
```

### For UI Icons
```jsx
import { SmartIcon } from '../components/HybridIcon'
import { UI_ICONS } from '../config/iconConfig'

<SmartIcon iconKey="chevronDown" iconConfig={UI_ICONS} />
```

## 📊 Current Icon Mapping

### Navigation Icons (All 18px, strokeWidth: 1.5)

| Icon Key | Lucide Component | Figma Asset | Description | Status |
|----------|------------------|-------------|-------------|---------|
| `home` | `Home` | `home_18px.svg` | Home/Dashboard entry | ✅ Lucide preferred |
| `dashboard` | `LayoutDashboard` | `Dashboard_18px.svg` | Analytics dashboard | ✅ Lucide preferred |
| `product` | `Package` | `product_18px.svg` | Product management | ✅ Lucide preferred |
| `people` | `Users` | `People_18px.svg` | User management | ✅ Lucide preferred |
| `paths` | `GitBranch` | `Behavior_18px.svg` | User behavior paths | ✅ ACTIVE STATE |
| `nps` | `Heart` | `NPS_18px.svg` | Net Promoter Score | ✅ Lucide preferred |
| `guides` | `BookOpen` | `guides_18px.svg` | User guides | ✅ Lucide preferred |
| `orchestrate` | `Workflow` | `Orchestrate_18px.svg` | Workflow orchestration | ✅ Lucide preferred |
| `listen` | `Headphones` | `Listen_18px.svg` | User feedback | ✅ Lucide preferred |
| `replay` | `RotateCcw` | `Replay_18px.svg` | Session replay | ✅ Lucide preferred |
| `saas` | `Building2` | `saas_18px.svg` | SaaS management | ✅ Lucide preferred |
| `pendoTools` | `Wrench` | `product-tools_18px.svg` | Pendo tools | ✅ Lucide preferred |
| `productSwitcher` | `Grid3X3` | `Product-switcher_18px.svg` | Product switcher | ✅ Lucide preferred |
| `settings` | `Settings` | `Settings_18px.svg` | Application settings | ✅ Lucide preferred |
| `collapse` | `ChevronLeft` | `arrow_expand_18px.svg` | Collapse navigation (22px) | ✅ Lucide preferred |

### Brand Icons
| Icon Key | Source | Asset | Description |
|----------|--------|-------|-------------|
| `logo` | Figma Asset | `Logo.svg` | Primary brand logo (36x36px) |

## 🎨 Design Variables (from Figma)

```javascript
colors: {
  offblack: '#060119',    // Primary dark
  white: '#FFFFFF',       // Primary light  
  gray70: '#6A6C75',      // Secondary text
  gray100: '#2A2C35',     // Primary text
}
```

## 🔧 Adding New Icons

### Method 1: Add Lucide Icon
1. Check [Lucide.dev](https://lucide.dev/icons/) for available icons
2. Add configuration to `iconConfig.js`:
```javascript
newIcon: {
  source: ICON_SOURCES.LUCIDE,
  lucideName: 'IconName',
  description: 'Icon description',
  size: 18,
  strokeWidth: 1.5
}
```

### Method 2: Add Figma Asset
1. Export SVG from Figma
2. Place in appropriate assets folder
3. Import in `HybridIcon.jsx`:
```javascript
import newIconSvg from '../assets/icons/new-icon.svg'
```
4. Add to `FIGMA_ASSET_MAP`
5. Add configuration to `iconConfig.js`

### Method 3: Extract from Figma (AI Assistant)
```javascript
// In future conversations, reference this file and ask:
// "Extract the [icon name] from the current Figma frame and add it to our icon system"
```

## 🎯 Best Practices

### Icon Selection Priority
1. **Lucide first** - For consistent stroke weights and hover states
2. **Figma assets** - For brand-specific or unique design elements
3. **Figma extraction** - For new custom icons matching exact brand specifications

### Hover States
```css
/* Automatic hover states with hybrid system */
.hybrid-icon {
  transition: all 200ms ease-in-out;
}

/* Navigation items get 40px hover area */
.nav-item {
  width: 40px;
  height: 40px;
}
```

### Consistency Rules
- **Navigation icons**: 18px, strokeWidth 1.5
- **UI icons**: 16px, strokeWidth 1.5  
- **Collapse icon**: 22px (special case)
- **Logo**: 36x36px (Figma asset only)

## 🔄 Migration Status

### ✅ Completed
- Hybrid icon system architecture
- Configuration-based icon rendering
- Lucide React integration
- 40px hover areas for navigation
- 10px gaps between navigation items
- Active state for paths icon

### 🚧 In Progress
- Converting legacy Icons.jsx to use hybrid system
- Adding hover state animations
- Normalizing stroke weights

### 📋 Future Enhancements
- Figma variable integration
- Dynamic icon theming
- Icon animation library
- Accessibility improvements

## 🎮 Interactive Features

### Current Hover Behavior
- **Scale transform**: 1.05x on hover
- **Smooth transitions**: 200ms ease-in-out
- **40px hover area**: For all navigation icons
- **Visual feedback**: Consistent across all icon types

### Active States
- **Pink background**: `bg-brand-pink bg-opacity-60`
- **Border**: `border-brand-pink border-[1.75px]`
- **Currently active**: `paths` icon

## 🔮 Future Conversations Reference

When working with icons in future conversations:

1. **Read this file** for current system state
2. **Reference `iconConfig.js`** for available icons
3. **Check `HybridIcon.jsx`** for implementation details
4. **Use SmartIcon component** for new implementations
5. **Follow the priority system**: Lucide → Figma Asset → Figma Extraction

### Common Requests
```javascript
// "Add a new settings icon"
// → Check Lucide first, add to NAVIGATION_ICONS config

// "Extract icon from Figma frame"  
// → Use MCP Figma tools, add to FIGMA_ASSET_MAP

// "Update hover animation"
// → Modify HybridIcon component baseStyle

// "Change icon source preference"
// → Update source field in iconConfig.js
```

---

**Last Updated**: Current implementation
**Version**: 1.0.0 (Hybrid System)
**Status**: ✅ Active Development 