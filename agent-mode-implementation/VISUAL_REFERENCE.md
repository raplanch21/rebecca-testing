# Visual Reference

## UI Layout Diagrams

### Full Modal View (Desktop)

```
┌─────────────────────────────────────────────────┐
│  ●  ●  ●  ●  ●  ●  (Drag Handle)                │  ← Header (Gray #EAECF1)
├─────────────────────────────────────────────────┤
│  Account retention                              │
│  [New ▼] [📌] [⛶] [✕]                          │  ← Title Bar
├─────────────────────────────────────────────────┤
│                                                 │
│                                                 │
│              Welcome back, Darshana!            │  ← Welcome Screen
│                                                 │  (when no messages)
│                                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│  Ask another question (enter @ to reference)   │
│  ┌───────────────────────────────────────────┐ │  ← Input Area
│  │ Type message here...                      │ │
│  └───────────────────────────────────────────┘ │
│  [Insert (@)] [⚙] ────────────────────── [→]  │
│  Generative AI features may produce...         │
└─────────────────────────────────────────────────┘
      471px width × 760px height
```

### With Messages

```
┌─────────────────────────────────────────────────┐
│  ●  ●  ●  ●  ●  ●  (Drag Handle)                │
├─────────────────────────────────────────────────┤
│  Account retention          [New ▼] [📌] [⛶] [✕] │
├─────────────────────────────────────────────────┤
│                          February 5, 2026 3:45PM │
│                  ┌─────────────────────────────┐ │
│                  │ Show me retention insights  │ │  ← User Message
│                  └─────────────────────────────┘ │  (Right, Gray BG)
│                                                 │
│  February 5, 2026 3:45PM                        │
│  ┌─────────────────────────────────────────────┐│
│  │ 💬 Reasoning                                ││  ← AI Message
│  │                                             ││  (Left, White BG)
│  │ Looking at retention by application,       ││
│  │ AcmeFinance is outperforming...            ││
│  │                                             ││
│  │ Here are some suggested next steps:        ││
│  │   1. Compare feature usage patterns        ││
│  │   2. Create segments for high-retention    ││
│  │   3. Analyze user feedback specific        ││
│  │                                             ││
│  │ [📋] [🔄] [👍] [👎]                         ││  ← Message Toolbar
│  └─────────────────────────────────────────────┘│
│                                                 │
├─────────────────────────────────────────────────┤
│  Ask another question...                        │
│  [Insert (@)] [⚙] ─────────────────────── [→]  │
│  Generative AI may produce inaccurate...       │
└─────────────────────────────────────────────────┘
```

### Loading State

```
┌─────────────────────────────────────────────────┐
│  ●  ●  ●  ●  ●  ●  (Drag Handle)                │
├─────────────────────────────────────────────────┤
│  Account retention          [New ▼] [📌] [⛶] [✕] │
├─────────────────────────────────────────────────┤
│                          February 5, 2026 3:45PM │
│                  ┌─────────────────────────────┐ │
│                  │ Show me retention insights  │ │
│                  └─────────────────────────────┘ │
│                                                 │
│  February 5, 2026 3:45PM                        │
│  ┌─────────────────────────────────────────────┐│
│  │                                             ││
│  │          ●   ●   ●  (bouncing dots)        ││  ← Loading
│  │                                             ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

## Component Breakdown

### Header Section
```
┌─────────────────────────────────────────────────┐
│  ●  ●  ●  ●  ●  ●    ← 6 dots (3x2 grid)       │
│     Drag Handle      Gray dots #9A9CA5         │
│     cursor: move                                │
└─────────────────────────────────────────────────┘
     Background: var(--gray-30, #EAECF1)
     Height: ~24px
     Cursor changes to 'move' on hover
```

### Title Bar
```
┌─────────────────────────────────────────────────┐
│  Account retention...   [New ▼] [📌] [⛶] [✕]  │
│  ↑                      ↑       ↑    ↑    ↑    │
│  Title (truncates)      New    Pin  Max Close  │
│  14.222px, 600 weight                           │
└─────────────────────────────────────────────────┘
     Background: var(--gray-0, #FFFFFF)
     Height: ~44px
```

#### New Button Detail
```
┌──────────────┐
│ New  │  ▼  │  ← Split button
└──────┴──────┘
   Teal    Gray
  #128297  divider
```

### Message Types

#### User Message (Right)
```
                         February 5, 2026, 3:45PM
                    ┌──────────────────────────┐
                    │ Show me retention...     │
                    └──────────────────────────┘
                    Background: #F8F8F9
                    Max-width: 80%
                    Border-radius: 6px
                    Padding: 12px 16px
```

#### Agent Message (Left)
```
February 5, 2026, 3:45PM
┌────────────────────────────────────────────────┐
│ [💬 Reasoning]                                 │  ← Optional chip
│                                                │
│ Looking at retention by application,          │
│ AcmeFinance is outperforming...               │
│                                                │
│ Here are some suggested next steps:           │
│   1. Compare feature usage patterns           │
│   2. Create segments for high-retention       │
│   3. Analyze user feedback specific           │
│                                                │
│ [📋] [🔄] [👍] [👎]                            │  ← Toolbar
└────────────────────────────────────────────────┘
Background: #FFFFFF
Full width
Padding: 0 16px 12px 16px
```

### Input Area
```
┌─────────────────────────────────────────────────┐
│ Ask another question (enter @ to reference)    │
│ ┌───────────────────────────────────────────┐  │
│ │ [cursor here]                             │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                 │
│ [Insert (@)]  [⚙]  ──────────────────── [→]   │
│  ↑           ↑      spacer            ↑       │
│  Insert    Settings                   Send     │
│  button    button                    button    │
│                                                 │
│ Generative AI features may produce...          │
└─────────────────────────────────────────────────┘
```

#### Input States
```
Empty (Send disabled):
[Insert (@)] [⚙] ───────────────── [→ gray]

With Text (Send enabled):
[Insert (@)] [⚙] ───────────────── [→ teal]
```

---

## Animation Sequences

### Slide In (Opening)
```
Frame 1: Off-screen right ───────────────►
Frame 2:           ┌──────┐
Frame 3:      ┌────────────────┐
Frame 4: ┌──────────────────────────┐
         (300ms ease)
```

### Slide Out (Closing)
```
Frame 1: ┌──────────────────────────┐
Frame 2:      ┌────────────────┐
Frame 3:           ┌──────┐
Frame 4: Off-screen right ───────────────►
         (300ms ease)
```

### Loading Dots Animation
```
Frame 1:  ●  ○  ○
Frame 2:  ○  ●  ○
Frame 3:  ○  ○  ●
Frame 4:  ○  ●  ○
         (loops, 1.4s cycle)
```

### Drag Movement
```
Start Position:              New Position:
     (80px, 24px)                (150px, 100px)
     ┌────────┐                      ┌────────┐
     │ Modal  │  ──dragging────►     │ Modal  │
     └────────┘                      └────────┘
```

---

## Color Palette

### Background Colors
```
Modal:          #FFFFFF (white)
Header:         #EAECF1 (gray-30)
User Message:   #F8F8F9 (gray-10)
Agent Message:  #FFFFFF (white)
Input BG:       #FFFFFF (white)
```

### Text Colors
```
Title:          #2A2C35 (gray-100)
Message:        #2A2C35 (gray-100)
Timestamp:      #6A6C75 (gray-70)
Disclaimer:     #9A9CA5 (gray-60)
Placeholder:    #BABCC5 (gray-50)
```

### Accent Colors
```
Primary (Teal): #128297
Hover Teal:     #016479
Active Teal:    #01586A

Action Items:   #1A7F93 (teal-70)
Reasoning Chip: #FF4876 (pink)
```

### Border Colors
```
Modal Border:   none
Input Border:   #DADCE5 (gray-40)
Message Border: none
Divider:        #EAECF1 (gray-30)
```

---

## Responsive Layouts

### Desktop (>639px)
```
┌─────────────────────────────┐
│         471px width         │
│                             │
│        760px height         │
│                             │
│  Position: top: 80px        │
│            right: 24px      │
└─────────────────────────────┘
```

### Mobile (≤639px)
```
┌────────────────────────────────┐
│  Full width - 32px padding     │
│                                │
│  Adjusted height               │
│  (max 760px or viewport-96px) │
│                                │
│  Position: top: 64px           │
│            right/left: 16px    │
└────────────────────────────────┘
```

---

## Icon Reference

### Control Icons
- **New:** Dropdown arrow (chevron-down)
- **Pin:** Pin icon
- **Maximize:** Expand arrows (maximize)
- **Close:** X icon

### Message Toolbar Icons
- **Copy:** Copy icon
- **Refresh:** Circular arrows (refresh-cw)
- **Thumbs Up:** thumbs-up
- **Thumbs Down:** thumbs-down

### Input Icons
- **Settings:** Sliders icon (sliders)
- **Send:** Arrow right (arrow-right)

### Content Icons
- **Sparkle:** Agent mode indicator (sparkle)
- **Reasoning:** Sparkle in pink chip

---

## Z-Index Layers

```
Layer 3: Modal (z-index: 900)
         ┌────────────────┐
         │  Agent Modal   │
         └────────────────┘
         
Layer 2: Dropdown menus (z-index: 100)

Layer 1: Page content (z-index: auto)
```

---

## Typography Scale

```
Title:          14.222px, 600 weight, Inter
Message:        14.222px, 400 weight, Inter
Timestamp:      11px, 400 weight, Inter
Welcome:        22.781px, 600 weight, Inter
Action Item:    12.642px, 600 weight, Inter
Disclaimer:     11px, 400 weight, Inter
Button:         14.222px, 600 weight, Inter
```

---

## Spacing System

```
Modal Padding:     16px (all sides)
Message Gap:       16px
Input Padding:     12px
Button Gap:        8px
Icon Gap:          4px
Section Gap:       12px
```

---

**Visual Style:** Clean, modern, professional  
**Design Language:** Minimalist with clear hierarchy  
**Accessibility:** WCAG 2.1 Level AA compatible
