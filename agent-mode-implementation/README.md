# Agent Mode Floating Window Implementation

## Overview
Complete documentation for implementing the Agent Mode draggable floating window/modal interface in any Vue 3 project.

## What is Agent Mode?

Agent Mode is an **AI-powered chat interface** that appears as a **draggable floating modal** on the right side of the screen. It provides context-aware responses to user questions about insights and analytics.

### Key Features
- 🎯 **Draggable modal** with snap-to-position
- 🤖 **Context-aware AI responses** based on insight type
- 📋 **Suggested action items** for each insight
- 💬 **Message history** with timestamps
- ⏳ **Loading animations** while "thinking"
- 📌 **Pin/maximize controls**
- 🎨 **Smooth slide-in animations**
- 📱 **Responsive design** (mobile-friendly)

## Document Index

### 📄 [QUICKSTART.md](./QUICKSTART.md)
**START HERE** - 10-minute implementation guide
- Copy/paste setup
- Minimal configuration
- Basic usage example
- ⏱️ Est. time: 10 minutes

### 📄 [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md)
Complete component documentation
- Props & events reference
- Component structure
- State management
- Features breakdown
- ⏱️ Est. time: 15 minutes

### 📄 [FEATURES.md](./FEATURES.md)
Detailed feature documentation
- Drag & drop functionality
- Context-aware responses
- Message system
- UI controls
- ⏱️ Est. time: 12 minutes

### 📄 [IMPLEMENTATION.md](./IMPLEMENTATION.md)
Step-by-step integration guide
- Installation steps
- File structure
- Integration patterns
- Customization options
- ⏱️ Est. time: 20 minutes

### 📄 [CODE_EXAMPLES.md](./CODE_EXAMPLES.md)
Working code examples
- Basic usage
- Custom responses
- Event handling
- Styling examples
- ⏱️ Est. time: 8 minutes

### 📄 [VISUAL_REFERENCE.md](./VISUAL_REFERENCE.md)
Visual design documentation
- UI screenshots (ASCII)
- Layout diagrams
- Animation sequences
- State variations
- ⏱️ Est. time: 6 minutes

## Quick Reference

### Files Required
```
your-app/
├── components/
│   ├── AgentModeModal.vue           (1,170 lines)
│   ├── agent/
│   │   └── AccountRetentionResponse.vue  (414 lines)
│   └── pendo/
│       └── PendoIcon.vue            (172 lines)
```

### Dependencies
```bash
npm install lucide-vue-next
```

### Basic Usage
```vue
<template>
  <AgentModeModal 
    :is-open="isOpen"
    title="Account retention"
    initial-context="Your insight context"
    @close="isOpen = false"
  />
</template>
```

## Component Specifications

### Dimensions
- **Width:** 471px (max-width on mobile)
- **Height:** 760px (adjusts to viewport)
- **Position:** Fixed, top-right corner (80px from top, 24px from right)
- **Z-index:** 900

### Responsive Breakpoints
- **Desktop (>639px):** 471px width, full features
- **Mobile (≤639px):** Full width minus 32px padding, adjusted controls

### Animation
- **Slide-in:** 0.3s ease from right
- **Slide-out:** 0.3s ease to right

## Features Breakdown

### 1. Draggable Modal
- Click and drag from header handle
- Snaps to default position when close
- Smooth drag with visual feedback

### 2. Context-Aware Responses
- Detects insight type from title
- Generates appropriate AI response
- Provides relevant action items
- Loading state with animation

### 3. Message System
- User messages (right-aligned, gray)
- AI messages (left-aligned, white)
- Timestamps for each message
- Message history preserved

### 4. UI Controls
- **New button:** Start fresh conversation
- **Pin button:** Keep modal visible
- **Maximize button:** Full screen view
- **Close button:** Hide modal

### 5. Input Area
- Auto-expanding textarea
- @ mention support (placeholder)
- Insert button for references
- Settings slider button
- Send button (disabled when empty)

### 6. Welcome Screen
- Shows when no messages
- Personalized greeting
- Clean, minimal design

## Supported Insight Types

The modal provides custom responses for:
- ✅ Account retention
- ✅ Agent retention
- ✅ Feature adoption
- ✅ User engagement
- ✅ Session duration
- ✅ Conversion rate
- ✅ Retention by application
- ✅ Adoption by feature
- ✅ Engagement by segment
- ✅ Conversion by funnel
- ✅ Session duration by device
- ✅ Agent usage by feature

## Integration Options

### Option 1: Standalone Modal
Use as an independent floating window

### Option 2: Insight Card Integration
Trigger from insight card "Agent mode" buttons

### Option 3: Global Navigation
Open from top navigation or sidebar

### Option 4: Page-Level
Manage at app/page level with state management

## Customization Points

### Easy to Customize:
- ✅ Modal size and position
- ✅ Colors and branding
- ✅ Response templates
- ✅ Action items
- ✅ Welcome message
- ✅ Animations

### Moderate Customization:
- ⚙️ Drag behavior
- ⚙️ Message formatting
- ⚙️ Input controls
- ⚙️ Icon set

### Advanced Customization:
- 🔧 AI response logic
- 🔧 Context detection
- 🔧 Custom message types
- 🔧 Backend integration

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari (latest)
- ✅ Chrome Mobile (latest)

## File Sizes
- **AgentModeModal.vue:** ~45 KB
- **AccountRetentionResponse.vue:** ~16 KB
- **Total bundle impact:** ~25-30 KB (gzipped)

## Performance Notes
- Smooth 60fps animations
- Efficient drag handling
- Minimal re-renders
- Lazy-loaded responses

## Testing Checklist
- [ ] Modal opens/closes smoothly
- [ ] Dragging works on desktop
- [ ] Snap-to-position functions correctly
- [ ] Messages display properly
- [ ] Loading animation shows
- [ ] Action items are clickable
- [ ] Input expands correctly
- [ ] Send button enables/disables
- [ ] Responsive at mobile size
- [ ] Close button works
- [ ] New conversation clears state
- [ ] Welcome screen displays

## Common Use Cases

1. **Insight Exploration:** User clicks "Ask in Agent mode" from insight card
2. **Follow-up Questions:** User asks clarifying questions about metrics
3. **Action Planning:** User reviews suggested next steps
4. **Data Analysis:** User requests deeper analysis of trends
5. **Report Generation:** User asks for specific data views

## Next Steps

1. **Read:** Start with `QUICKSTART.md` for immediate setup
2. **Understand:** Review `COMPONENT_GUIDE.md` for architecture
3. **Implement:** Follow `IMPLEMENTATION.md` for integration
4. **Customize:** Use `CODE_EXAMPLES.md` for modifications
5. **Reference:** Check `FEATURES.md` for detailed behavior

## Package Contents

```
agent-mode-implementation/
├── README.md                    (this file)
├── QUICKSTART.md               (10-min setup guide)
├── COMPONENT_GUIDE.md          (Complete component docs)
├── FEATURES.md                 (Feature documentation)
├── IMPLEMENTATION.md           (Integration guide)
├── CODE_EXAMPLES.md            (Working examples)
└── VISUAL_REFERENCE.md         (UI diagrams)
```

## Questions?

Each documentation file includes:
- Detailed explanations
- Code snippets
- Visual examples
- Troubleshooting tips

---

**Version:** 1.0.0  
**Last Updated:** February 5, 2026  
**Framework:** Vue 3 Composition API  
**License:** Internal Use
