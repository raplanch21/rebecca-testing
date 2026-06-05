<template>
  <component
    :is="lucideIcon"
    :size="width || height || size"
    :stroke-width="strokeWidth"
    :color="stroke"
    :style="{ display }"
    class="pendo-icon"
    :class="[`pendo-icon__${type}`]"
  />
</template>

<script setup>
import { computed } from 'vue'
import {
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Edit,
  Trash,
  Copy,
  Settings,
  AlertCircle,
  CircleMinus,
  AlertTriangle,
  TriangleAlert,
  Info,
  CheckCircle,
  CircleCheck,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  Search,
  User,
  Users,
  Download,
  Upload,
  Monitor,
  Box,
  Clock,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  LayoutDashboard,
  Bell,
  Sparkle,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  MessageSquare,
  MousePointer,
  BarChart,
  LineChart,
  ChartNoAxesCombined,
  Smartphone,
  Puzzle,
  Pin,
  Maximize,
  Undo,
  Redo,
  Type,
  Code,
  Sliders,
  Table
} from 'lucide-vue-next'

const props = defineProps({
  type: { type: String, required: true },
  fill: { type: String, default: 'none' },
  size: { type: [Number, String], default: 24 },
  height: { type: [Number, String], default: null },
  width: { type: [Number, String], default: null },
  stroke: { type: String, default: 'currentColor' },
  strokeLinecap: { type: String, default: 'round' },
  strokeLinejoin: { type: String, default: 'round' },
  strokeWidth: { type: [Number, String], default: 2 },
  display: { type: String, default: 'inline-flex' }
})

// Map icon type strings to Lucide components
const iconMap = {
  'x': X,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'plus': Plus,
  'minus': Minus,
  'edit': Edit,
  'trash': Trash,
  'copy': Copy,
  'settings': Settings,
  'alert-circle': AlertCircle,
  'circle-minus': CircleMinus,
  'circle-minus-filled': CircleMinus,
  'alert-triangle': AlertTriangle,
  'triangle-alert': TriangleAlert,
  'triangle-alert-filled': TriangleAlert,
  'info': Info,
  'info-filled': Info,
  'check-circle': CheckCircle,
  'circle-check': CircleCheck,
  'circle-check-filled': CircleCheck,
  'external-link': ExternalLink,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'unlock': Unlock,
  'refresh-cw': RefreshCw,
  'search': Search,
  'user': User,
  'users': Users,
  'download': Download,
  'upload': Upload,
  'monitor': Monitor,
  'box': Box,
  'clock': Clock,
  'more-vertical': MoreVertical,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'dashboard': LayoutDashboard,
  'layout-dashboard': LayoutDashboard,
  'bell': Bell,
  'sparkle': Sparkle,
  'thumbs-up': ThumbsUp,
  'thumbs-down': ThumbsDown,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  'mouse-pointer': MousePointer,
  'bar-chart': BarChart,
  'line-chart': LineChart,
  'chart-no-axes-combined': ChartNoAxesCombined,
  'smartphone': Smartphone,
  'puzzle': Puzzle,
  'pin': Pin,
  'maximize': Maximize,
  'undo': Undo,
  'redo': Redo,
  'type': Type,
  'code': Code,
  'sliders': Sliders,
  'table': Table
}

const lucideIcon = computed(() => {
  return iconMap[props.type] || Info
})
</script>

<style scoped>
.pendo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
