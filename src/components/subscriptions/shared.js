/**
 * Shared mock data and constants for all three subscription exploration options.
 * Centralizes the subscription model so each option renders consistently.
 */
import { reactive } from 'vue'

export const SEGMENTS = [
  { value: 'all', label: 'All visitors' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'mid-market', label: 'Mid-market' },
  { value: 'smb', label: 'SMB' },
  { value: 'trial', label: 'Trial accounts' },
  { value: 'power-users', label: 'Power users' }
]

export const DETAIL_LEVELS = [
  { value: 'executive', label: 'Executive', description: 'High-level KPIs and top-line trends only' },
  { value: 'summary', label: 'Summary', description: 'Key metrics with brief analysis and callouts' },
  { value: 'detailed', label: 'Detailed', description: 'Full breakdown with charts, cohort data, and recommendations' }
]

export const WIDGETS = [
  { id: 1, name: 'Visitor adoption', activity: '12 views/week', recommended: true },
  { id: 2, name: 'Account retention', activity: '9 views/week', recommended: true },
  { id: 3, name: 'Conversion rate', activity: '18 views/week', recommended: true },
  { id: 4, name: 'Time to complete', activity: '15 views/week', recommended: true },
  { id: 5, name: 'User feedback', activity: '3 views/week', recommended: false },
  { id: 6, name: 'Feature background', activity: '1 view/week', recommended: false },
  { id: 7, name: 'The team', activity: 'No recent activity', recommended: false }
]

export const FREQUENCIES = [
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Bi-weekly', label: 'Bi-weekly' },
  { value: 'Monthly', label: 'Monthly' }
]

export const DAYS = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' }
]

export const TIMES = [
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' }
]

export const TIMEZONES = [
  { value: 'ET', label: 'Eastern (ET)' },
  { value: 'CT', label: 'Central (CT)' },
  { value: 'MT', label: 'Mountain (MT)' },
  { value: 'PT', label: 'Pacific (PT)' }
]

export const DESTINATIONS = [
  { value: 'Slack', label: 'Slack' },
  { value: 'Teams', label: 'Teams' },
  { value: 'Email', label: 'Email' }
]

export const CHANNELS = [
  '#dashboard-signals',
  '#product-team-updates',
  '#team-insights',
  '#engineering',
  '#design',
  '#customer-success',
  '#sales',
  '#n8n-test'
]

export function createMockSubscriptions () {
  return reactive([
    {
      id: 'sub-1',
      name: 'Weekly Executive Digest',
      status: 'active',
      segment: 'enterprise',
      selectedWidgets: [1, 2, 3],
      detailLevel: 'executive',
      frequency: 'Weekly',
      day: 'Monday',
      time: '9:00 AM',
      timezone: 'ET',
      destination: 'Slack',
      channels: ['#dashboard-signals'],
      lastRunAt: '2026-03-02T09:00:00',
      nextRunAt: '2026-03-09T09:00:00'
    },
    {
      id: 'sub-2',
      name: 'Detailed Engineering Report',
      status: 'active',
      segment: 'all',
      selectedWidgets: [1, 2, 3, 4, 5],
      detailLevel: 'detailed',
      frequency: 'Weekly',
      day: 'Friday',
      time: '2:00 PM',
      timezone: 'ET',
      destination: 'Slack',
      channels: ['#engineering'],
      lastRunAt: '2026-02-28T14:00:00',
      nextRunAt: '2026-03-07T14:00:00'
    },
    {
      id: 'sub-3',
      name: 'Weekly CS Summary',
      status: 'paused',
      segment: 'mid-market',
      selectedWidgets: [1, 3],
      detailLevel: 'summary',
      frequency: 'Weekly',
      day: '',
      time: '8:00 AM',
      timezone: 'ET',
      destination: 'Slack',
      channels: ['#dashboard-signals'],
      lastRunAt: '2026-02-25T08:00:00',
      nextRunAt: null
    }
  ])
}

export function createBlankSubscription () {
  return {
    id: `sub-${Date.now()}`,
    name: '',
    status: 'active',
    segment: 'all',
    selectedWidgets: WIDGETS.filter(w => w.recommended).map(w => w.id),
    detailLevel: 'summary',
    frequency: 'Weekly',
    day: 'Monday',
    time: '9:00 AM',
    timezone: 'ET',
    destination: 'Slack',
    channels: [],
    lastRunAt: null,
    nextRunAt: null
  }
}

export function formatNextRun (nextRunAt) {
  if (!nextRunAt) return 'Paused'
  const d = new Date(nextRunAt)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
}

export function formatScheduleSummary (sub) {
  const parts = [sub.frequency]
  if (sub.frequency === 'Weekly' && sub.day) parts.push(`on ${sub.day}s`)
  parts.push(`at ${sub.time} ${sub.timezone}`)
  return parts.join(' ')
}

export function getSegmentLabel (value) {
  return SEGMENTS.find(s => s.value === value)?.label || value
}

export function getDetailLabel (value) {
  return DETAIL_LEVELS.find(d => d.value === value)?.label || value
}
