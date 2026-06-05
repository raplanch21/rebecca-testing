# Agent Mode Component Guide

## Component Overview

**File:** `AgentModeModal.vue`  
**Type:** Modal/Dialog Component  
**Framework:** Vue 3 Composition API  
**Lines:** 1,170

## Component Structure

```
AgentModeModal.vue
├── Template (139 lines)
│   ├── Draggable Header (with dots handle)
│   ├── Title Bar (with New, Pin, Maximize, Close buttons)
│   ├── Conversation Area (scrollable messages)
│   └── Input Area (textarea with controls)
│
├── Script (327 lines)
│   ├── Props Definition
│   ├── State Management (refs)
│   ├── Drag & Drop Logic
│   ├── Message Handling
│   ├── Response Generation
│   └── Event Emitters
│
└── Styles (704 lines)
    ├── Base Modal Styles
    ├── Header & Controls
    ├── Message Styles
    ├── Input Area
    ├── Animations
    └── Responsive Media Queries
```

## Props

### `isOpen`
- **Type:** `Boolean`
- **Default:** `false`
- **Required:** No
- **Description:** Controls modal visibility
- **Example:**
  ```vue
  <AgentModeModal :is-open="true" />
  ```

### `title`
- **Type:** `String`
- **Default:** `'Acme finance account health sum...'`
- **Required:** No
- **Description:** Modal header title (truncates with ellipsis)
- **Example:**
  ```vue
  <AgentModeModal title="Account retention" />
  ```

### `initialContext`
- **Type:** `String`
- **Default:** `''`
- **Required:** No
- **Description:** Starting context or prompt for AI
  - If empty or "How can I help you today?" → Shows welcome screen
  - Otherwise → Generates AI response based on title
- **Example:**
  ```vue
  <AgentModeModal 
    title="Account retention"
    initial-context="Show me retention insights"
  />
  ```

## Events

### `@close`
- **Payload:** None
- **Description:** Emitted when user clicks close button
- **Example:**
  ```vue
  <AgentModeModal @close="handleClose" />
  ```

### `@update:isOpen`
- **Payload:** `Boolean`
- **Description:** Two-way binding for `isOpen` prop
- **Example:**
  ```vue
  <AgentModeModal v-model:is-open="modalOpen" />
  ```

## State Management

### Internal State (refs)

```javascript
const messages = ref([])           // Message history array
const inputMessage = ref('')       // Current input text
const isPinned = ref(false)        // Pin button state
const conversationRef = ref(null)  // Conversation container ref
const inputRef = ref(null)         // Textarea ref

// Drag state
const modalPosition = ref({ top: 80, right: 24 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
```

### Message Object Structure

```javascript
{
  type: 'user' | 'agent',           // Message sender
  content: String,                   // Message text (HTML allowed)
  timestamp: String,                 // Formatted timestamp
  isLoading: Boolean,               // Loading animation
  reasoning: Boolean,               // Show reasoning chip
  renderComponent: String,          // Component name to render
  actionsLabel: String,             // "Here are some suggested..."
  actions: Array                    // Action items
}
```

### Action Object Structure

```javascript
{
  label: String,     // Action text
  action: String     // Action identifier
}
```

## Methods

### Public Methods (exposed via template)

#### `close()`
Closes the modal and resets position
```javascript
const close = () => {
  emit('close')
  emit('update:isOpen', false)
  modalPosition.value = { ...defaultPosition }
}
```

#### `startNewConversation()`
Clears all messages and resets input
```javascript
const startNewConversation = () => {
  messages.value = []
  inputMessage.value = ''
}
```

#### `sendMessage()`
Sends user message (triggered by Enter key or send button)
```javascript
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messages.value.push({
    type: 'user',
    content: inputMessage.value,
    timestamp: new Date().toLocaleString(...)
  })
  
  inputMessage.value = ''
  // Auto-scroll to bottom
}
```

### Drag & Drop Methods

#### `startDrag(event)`
Initiates drag when clicking header
```javascript
const startDrag = (event) => {
  if (event.target.closest('.agent-modal__header')) {
    isDragging.value = true
    dragStart.value = { x: event.clientX, y: event.clientY }
    // Attach mouse move/up listeners
  }
}
```

#### `onDrag(event)`
Updates modal position during drag
```javascript
const onDrag = (event) => {
  if (!isDragging.value) return
  
  const deltaX = event.clientX - dragStart.value.x
  const deltaY = event.clientY - dragStart.value.y
  
  modalPosition.value = {
    top: modalPosition.value.top + deltaY,
    right: modalPosition.value.right - deltaX
  }
}
```

#### `stopDrag()`
Ends drag and snaps to position if close to default
```javascript
const stopDrag = () => {
  isDragging.value = false
  // Remove mouse listeners
  
  // Snap logic (within 20px threshold)
  const topDiff = Math.abs(modalPosition.value.top - defaultPosition.top)
  const rightDiff = Math.abs(modalPosition.value.right - defaultPosition.right)
  
  if (topDiff <= 20 && rightDiff <= 20) {
    modalPosition.value = { ...defaultPosition }
  }
}
```

### Response Generation

#### `generateInsightResponse(insight, title)`
Generates context-aware AI responses based on insight type
```javascript
const generateInsightResponse = (insight, title) => {
  // Check title patterns
  if (title.toLowerCase().includes('retention by application')) {
    return {
      content: '<p>Looking at <strong>retention...</p>',
      actionsLabel: 'Here are some suggested next steps:',
      actions: [
        { label: 'Compare feature usage...', action: 'compare-apps' },
        // ... more actions
      ]
    }
  }
  // ... more insight types
}
```

**Supported Insight Types:** (see line ~333-460)
- Account retention (renders component)
- Agent retention
- Feature adoption
- User engagement
- Session duration
- Conversion rate
- Retention by application
- Adoption by feature
- Engagement by segment
- Conversion by funnel
- Session duration by device
- Agent usage by feature
- Generic fallback

## Lifecycle

### `onMounted()`
Sets up drag event listeners
```javascript
onMounted(() => {
  // Already handled in startDrag
})
```

### `onUnmounted()`
Cleans up drag event listeners
```javascript
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
```

### Watch: `isOpen`
Generates initial AI response when modal opens
```javascript
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.initialContext) {
    const timestamp = new Date().toLocaleString(...)
    
    const isLandingScreen = props.initialContext === 'How can I help you today?'
    
    if (isLandingScreen) {
      messages.value = []  // Welcome screen
    } else {
      // Show loading then response
      messages.value = [{ type: 'agent', isLoading: true, ... }]
      
      setTimeout(() => {
        const response = generateInsightResponse(...)
        messages.value[0] = { ...response, isLoading: false }
      }, 1500)
    }
  }
}, { immediate: true })
```

## Sub-Components

### AccountRetentionResponse.vue
**Purpose:** Structured AI response for account retention insights
**Location:** `components/agent/AccountRetentionResponse.vue`
**Usage:** Rendered when `renderComponent: 'accountRetention'`

**Structure:**
- Header text
- Insight summary (gray box)
- Events table (top events driving retention)
- Friction patterns (3 patterns)
- Key accounts to watch
- Recommended actions with links

### PendoIcon.vue
**Purpose:** Icon component using Lucide icons
**Location:** `components/pendo/PendoIcon.vue`
**Usage:** All icons throughout the modal

## Styling

### CSS Classes

#### Modal Container
```css
.agent-modal {
  position: fixed;
  top: 80px;
  right: 24px;
  width: 471px;
  height: 760px;
  z-index: 900;
  /* ... */
}
```

#### Header
```css
.agent-modal__header {
  background-color: var(--gray-30);
  cursor: move;
  /* Draggable dots handle */
}
```

#### Messages
```css
.agent-modal__message--user {
  background-color: var(--gray-10);
  align-self: flex-end;  /* Right-aligned */
  max-width: 80%;
}

.agent-modal__message--agent {
  background-color: var(--gray-0);
  /* Left-aligned, full width */
}
```

#### Input Area
```css
.agent-modal__input {
  resize: none;
  max-height: 120px;
  /* Auto-expanding */
}

.agent-modal__send-btn {
  background-color: var(--teal-70);
  /* Disabled when empty */
}
```

### Animations

#### Slide In/Out
```css
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-in-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
```

#### Loading Dots
```css
.agent-modal__loading-dots span {
  animation: loading-bounce 1.4s infinite ease-in-out both;
}

@keyframes loading-bounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
```

### Responsive

```css
@media (max-width: 639px) {
  .agent-modal {
    top: 64px;
    right: 16px;
    left: 16px;
    width: auto;
    height: min(760px, calc(100vh - 96px));
  }
}
```

## CSS Variables Used

```css
--gray-0: #FFFFFF
--gray-10: #F8F8F9
--gray-20: #F4F4F7
--gray-30: #EAECF1
--gray-40: #DADCE5
--gray-50: #BABCC5
--gray-60: #9A9CA5
--gray-70: #6A6C75
--gray-90: #3A3C45
--gray-100: #2A2C35

--teal-70: #128297
--teal-80: #016479
--teal-90: #01586A

--red-10: #FFF5F5
--red-80: #BD0000
```

## Constants

```javascript
const defaultPosition = { top: 80, right: 24 }
const snapThreshold = 20  // pixels
```

## Performance Considerations

- Messages array grows with conversation (consider limiting)
- Drag events use document listeners (cleaned up on unmount)
- Textarea auto-expands (max 120px height)
- Smooth animations at 60fps
- Lazy-loaded AI responses (1.5s delay)

## Accessibility

- Modal has `aria-label` on buttons
- Keyboard support: Enter to send, Escape to close (can be added)
- Focus management on open/close
- Screen reader friendly message structure

## Future Enhancements

- [ ] Keyboard shortcuts (Cmd+Enter, Escape)
- [ ] Message editing/deletion
- [ ] Copy message to clipboard
- [ ] Export conversation
- [ ] Search messages
- [ ] Markdown support
- [ ] Code syntax highlighting
- [ ] File attachments
- [ ] Voice input

---

**Component Complexity:** Medium  
**Maintenance:** Low (well-structured, scoped styles)  
**Testability:** High (clear props/events, isolated logic)
