<template>
  <i 
    class="pendo-icon" 
    :class="[`pendo-icon__${type}`]"
    :style="{ display }">
    <svg
      :width="width || size"
      :height="height || size"
      :viewBox="iconData?.viewBox || '0 0 24 24'"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-linecap="strokeLinecap"
      :stroke-linejoin="strokeLinejoin"
      v-html="iconData?.path || ''"
    />
  </i>
</template>

<script setup>
import { computed } from 'vue'

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

// Simplified icon library - add icons as needed
const icons = {
  'grid': {
    viewBox: '0 0 24 24',
    path: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  },
  'briefcase': {
    viewBox: '0 0 24 24',
    path: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
  },
  'chart-line': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'
  },
  'chart-no-axes-combined': {
    viewBox: '0 0 24 24',
    path: '<path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/>'
  },
  'calendar': {
    viewBox: '0 0 24 24',
    path: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>'
  },
  'star': {
    viewBox: '0 0 24 24',
    path: '<polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9 12 2"/>'
  },
  'more-horizontal': {
    viewBox: '0 0 24 24',
    path: '<circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/>'
  },
  'more-horizontal-filled': {
    viewBox: '0 0 24 24',
    path: '<circle cx="5" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="2" fill="currentColor" stroke="none"/>'
  },
  'message-circle': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5A8.48 8.48 0 0 1 21 11v.5z"/>'
  },
  'share-2': {
    viewBox: '0 0 24 24',
    path: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.7" y1="10.7" x2="15.3" y2="6.8"/><line x1="8.7" y1="13.3" x2="15.3" y2="17.2"/>'
  },
  'filter': {
    viewBox: '0 0 24 24',
    path: '<polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"/>'
  },
  'x': {
    viewBox: '0 0 24 24',
    path: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  },
  'check': {
    viewBox: '0 0 24 24',
    path: '<polyline points="20 6 9 17 4 12"/>'
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    path: '<path d="m6 9 6 6 6-6"/>'
  },
  'chevron-up': {
    viewBox: '0 0 24 24',
    path: '<path d="m18 15-6-6-6 6"/>'
  },
  'chevron-right': {
    viewBox: '0 0 24 24',
    path: '<path d="m9 18 6-6-6-6"/>'
  },
  'chevron-left': {
    viewBox: '0 0 24 24',
    path: '<path d="m15 18-6-6 6-6"/>'
  },
  'arrow-right': {
    viewBox: '0 0 24 24',
    path: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'
  },
  'arrow-up-right': {
    viewBox: '0 0 24 24',
    path: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>'
  },
  'rss': {
    viewBox: '0 0 24 24',
    path: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>'
  },
  'slack': {
    viewBox: '0 0 24 24',
    path: '<rect width="3" height="8" x="13" y="2" rx="1.5" fill="#E01E5A" stroke="#E01E5A"/><path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" fill="#E01E5A" stroke="#E01E5A"/><rect width="3" height="8" x="8" y="14" rx="1.5" fill="#36C5F0" stroke="#36C5F0"/><path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" fill="#36C5F0" stroke="#36C5F0"/><rect width="8" height="3" x="14" y="13" rx="1.5" fill="#2EB67D" stroke="#2EB67D"/><path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" fill="#2EB67D" stroke="#2EB67D"/><rect width="8" height="3" x="2" y="8" rx="1.5" fill="#ECB22E" stroke="#ECB22E"/><path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" fill="#ECB22E" stroke="#ECB22E"/>'
  },
  'teams': {
    viewBox: '0 0 16 14',
    path: '<image href="/teams.png" width="16" height="14" />'
  },
  'plus': {
    viewBox: '0 0 24 24',
    path: '<path d="M5 12h14"/><path d="M12 5v14"/>'
  },
  'minus': {
    viewBox: '0 0 24 24',
    path: '<path d="M5 12h14"/>'
  },
  'edit': {
    viewBox: '0 0 24 24',
    path: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'
  },
  'trash': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>'
  },
  'copy': {
    viewBox: '0 0 24 24',
    path: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
  },
  'settings': {
    viewBox: '0 0 24 24',
    path: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'
  },
  'alert-circle': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
  },
  'circle-minus': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>'
  },
  'circle-minus-filled': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor"/><path d="M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round"/>'
  },
  'alert-triangle': {
    viewBox: '0 0 24 24',
    path: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
  },
  'triangle-alert': {
    viewBox: '0 0 24 24',
    path: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
  },
  'triangle-alert-filled': {
    viewBox: '0 0 24 24',
    path: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill="currentColor" stroke="currentColor"/><path d="M12 9v4" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="white" stroke="none"/>'
  },
  'info': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
  },
  'info-filled': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor"/><path d="M12 16v-4" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="white" stroke="none"/>'
  },
  'check-circle': {
    viewBox: '0 0 24 24',
    path: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
  },
  'circle-check': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
  },
  'circle-check-filled': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor"/><polyline points="8 12 11 15 16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
  },
  'external-link': {
    viewBox: '0 0 24 24',
    path: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>'
  },
  'eye': {
    viewBox: '0 0 24 24',
    path: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    path: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'
  },
  'lock': {
    viewBox: '0 0 24 24',
    path: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  },
  'unlock': {
    viewBox: '0 0 24 24',
    path: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'
  },
  'refresh-cw': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'
  },
  'rotate-ccw': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  },
  'search': {
    viewBox: '0 0 24 24',
    path: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'
  },
  'user': {
    viewBox: '0 0 24 24',
    path: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
  },
  'users': {
    viewBox: '0 0 24 24',
    path: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  'download': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>'
  },
  'upload': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>'
  },
  'table': {
    viewBox: '0 0 24 24',
    path: '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>'
  },
  'file-text': {
    viewBox: '0 0 24 24',
    path: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'
  },
  'file': {
    viewBox: '0 0 24 24',
    path: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'
  },
  'image': {
    viewBox: '0 0 24 24',
    path: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'
  },
  'sparkle': {
    viewBox: '0 0 24 24',
    path: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
  },
  'send': {
    viewBox: '0 0 24 24',
    path: '<path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/>'
  },
  'dashboard': {
    viewBox: '0 0 24 24',
    path: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
  },
  'layout-dashboard': {
    viewBox: '0 0 24 24',
    path: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
  },
  'thumbs-up': {
    viewBox: '0 0 24 24',
    path: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>'
  },
  'thumbs-down': {
    viewBox: '0 0 24 24',
    path: '<path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>'
  },
  'trending-up': {
    viewBox: '0 0 24 24',
    path: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'
  },
  'trending-down': {
    viewBox: '0 0 24 24',
    path: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>'
  },
  'monitor': {
    viewBox: '0 0 24 24',
    path: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>'
  },
  'box': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'
  },
  'clock': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
  },
  'more-vertical': {
    viewBox: '0 0 24 24',
    path: '<circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/>'
  },
  'arrow-left': {
    viewBox: '0 0 24 24',
    path: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'
  },
  'arrow-up': {
    viewBox: '0 0 24 24',
    path: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>'
  },
  'bell': {
    viewBox: '0 0 24 24',
    path: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'
  },
  'message-square': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
  },
  'mouse-pointer': {
    viewBox: '0 0 24 24',
    path: '<path d="M12.586 12.586 19 19"/><path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"/>'
  },
  'bar-chart': {
    viewBox: '0 0 24 24',
    path: '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>'
  },
  'line-chart': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>'
  },
  'smartphone': {
    viewBox: '0 0 24 24',
    path: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>'
  },
  'puzzle': {
    viewBox: '0 0 24 24',
    path: '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>'
  },
  'pin': {
    viewBox: '0 0 24 24',
    path: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>'
  },
  'maximize': {
    viewBox: '0 0 24 24',
    path: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'
  },
  'undo': {
    viewBox: '0 0 24 24',
    path: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>'
  },
  'redo': {
    viewBox: '0 0 24 24',
    path: '<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>'
  },
  'type': {
    viewBox: '0 0 24 24',
    path: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>'
  },
  'code': {
    viewBox: '0 0 24 24',
    path: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'
  },
  'sliders': {
    viewBox: '0 0 24 24',
    path: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>'
  },
  'archive': {
    viewBox: '0 0 24 24',
    path: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>'
  }
}

const iconData = computed(() => {
  return icons[props.type] || null
})
</script>

<style scoped>
.pendo-icon {
  align-items: center;
  justify-content: center;
}

.pendo-icon svg {
  display: block;
}
</style>



