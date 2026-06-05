<template>
  <div :class="dropdownClass">
    <!-- Shortcuts Panel -->
    <div v-if="showShortcuts && type === 'default'" class="pendo-date-picker-dropdown__shortcuts">
      <button
        v-for="shortcut in shortcuts"
        :key="shortcut.value"
        type="button"
        class="pendo-date-picker-dropdown__shortcut-item"
        @click="handleShortcutClick(shortcut)"
      >
        {{ shortcut.label }}
      </button>
    </div>

    <!-- Calendar(s) -->
    <div class="pendo-date-picker-dropdown__calendars">
      <!-- First Calendar -->
      <div class="pendo-date-picker-dropdown__calendar">
        <!-- Header -->
        <div class="pendo-date-picker-dropdown__header">
          <button
            type="button"
            class="pendo-date-picker-dropdown__nav-btn"
            aria-label="Previous month"
            @click="prevMonth(0)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="pendo-date-picker-dropdown__month-title">
            {{ formatMonthYear(currentMonth) }}
          </span>
          <button
            v-if="type === 'default'"
            type="button"
            class="pendo-date-picker-dropdown__nav-btn"
            aria-label="Next month"
            @click="nextMonth(0)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div v-else class="pendo-date-picker-dropdown__nav-placeholder" />
        </div>

        <!-- Day Headers -->
        <div class="pendo-date-picker-dropdown__day-headers">
          <span v-for="day in dayHeaders" :key="day" class="pendo-date-picker-dropdown__day-header">
            {{ day }}
          </span>
        </div>

        <!-- Days Grid -->
        <div class="pendo-date-picker-dropdown__days">
          <div v-for="(week, weekIndex) in getCalendarWeeks(currentMonth)" :key="weekIndex" class="pendo-date-picker-dropdown__week">
            <button
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              type="button"
              :class="getDayClass(day, currentMonth)"
              :disabled="!day.inMonth"
              @click="day.inMonth && handleDayClick(day.date)"
            >
              <span v-if="day.inMonth">{{ day.day }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Second Calendar (for minmax/range type) -->
      <div v-if="type === 'minmax'" class="pendo-date-picker-dropdown__calendar pendo-date-picker-dropdown__calendar--second">
        <!-- Header -->
        <div class="pendo-date-picker-dropdown__header">
          <div class="pendo-date-picker-dropdown__nav-placeholder" />
          <span class="pendo-date-picker-dropdown__month-title">
            {{ formatMonthYear(secondMonth) }}
          </span>
          <button
            type="button"
            class="pendo-date-picker-dropdown__nav-btn"
            aria-label="Next month"
            @click="nextMonth(1)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Day Headers -->
        <div class="pendo-date-picker-dropdown__day-headers">
          <span v-for="day in dayHeaders" :key="day" class="pendo-date-picker-dropdown__day-header">
            {{ day }}
          </span>
        </div>

        <!-- Days Grid -->
        <div class="pendo-date-picker-dropdown__days">
          <div v-for="(week, weekIndex) in getCalendarWeeks(secondMonth)" :key="weekIndex" class="pendo-date-picker-dropdown__week">
            <button
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              type="button"
              :class="getDayClass(day, secondMonth)"
              :disabled="!day.inMonth"
              @click="day.inMonth && handleDayClick(day.date)"
            >
              <span v-if="day.inMonth">{{ day.day }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** Selected date(s) - Date object, string, or array for range */
  modelValue: {
    type: [Date, String, Array],
    default: null
  },
  /** Type: default (single with shortcuts), minmax (dual calendar for range) */
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'minmax'].includes(v)
  },
  /** Show shortcuts panel (only for default type) */
  showShortcuts: {
    type: Boolean,
    default: true
  },
  /** Custom shortcuts array */
  shortcuts: {
    type: Array,
    default: () => [
      { label: 'Last 7 Days', value: 'last7' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'Next 7 Days', value: 'next7' },
      { label: 'Next 30 Days', value: 'next30' },
      { label: 'Next 90 Days', value: 'next90' },
      { label: 'Custom Range', value: 'custom' }
    ]
  },
  /** Minimum selectable date */
  minDate: {
    type: [Date, String],
    default: null
  },
  /** Maximum selectable date */
  maxDate: {
    type: [Date, String],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'select', 'shortcut-click'])

const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Current displayed month for first calendar
const currentMonth = ref(new Date())

// Second month for dual calendar (minmax type)
const secondMonth = computed(() => {
  const date = new Date(currentMonth.value)
  date.setMonth(date.getMonth() + 1)
  return date
})

// Initialize current month based on modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const date = Array.isArray(newVal) ? newVal[0] : newVal
    if (date) {
      currentMonth.value = new Date(date)
    }
  }
}, { immediate: true })

const dropdownClass = computed(() => [
  'pendo-date-picker-dropdown',
  `pendo-date-picker-dropdown--${props.type}`,
  {
    'pendo-date-picker-dropdown--with-shortcuts': props.showShortcuts && props.type === 'default'
  }
])

/**
 * Formats a date to "Month YYYY" format.
 */
const formatMonthYear = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Generates calendar weeks for a given month.
 */
const getCalendarWeeks = (monthDate) => {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const weeks = []
  let currentWeek = []

  // Fill in empty days before the first day of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push({ day: '', inMonth: false, date: null })
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    currentWeek.push({ day, inMonth: true, date })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // Fill in empty days after the last day of the month
  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push({ day: '', inMonth: false, date: null })
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

/**
 * Determines if two dates are the same day.
 */
const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

/**
 * Determines if a date is within a range.
 */
const isInRange = (date, start, end) => {
  if (!date || !start || !end) return false
  const d = new Date(date).getTime()
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  return d > Math.min(s, e) && d < Math.max(s, e)
}

/**
 * Gets the CSS class for a day cell.
 */
const getDayClass = (day) => {
  const classes = ['pendo-date-picker-dropdown__day']

  if (!day.inMonth) {
    classes.push('pendo-date-picker-dropdown__day--empty')
    return classes
  }

  const value = props.modelValue

  if (Array.isArray(value) && value.length >= 2) {
    // Range selection
    if (isSameDay(day.date, value[0]) || isSameDay(day.date, value[1])) {
      classes.push('pendo-date-picker-dropdown__day--selected')
    } else if (isInRange(day.date, value[0], value[1])) {
      classes.push('pendo-date-picker-dropdown__day--in-range')
    }
  } else if (Array.isArray(value) && value.length === 1) {
    if (isSameDay(day.date, value[0])) {
      classes.push('pendo-date-picker-dropdown__day--selected')
    }
  } else if (value && isSameDay(day.date, value)) {
    classes.push('pendo-date-picker-dropdown__day--selected')
  }

  // Check if date is disabled
  if (props.minDate && day.date < new Date(props.minDate)) {
    classes.push('pendo-date-picker-dropdown__day--disabled')
  }
  if (props.maxDate && day.date > new Date(props.maxDate)) {
    classes.push('pendo-date-picker-dropdown__day--disabled')
  }

  return classes
}

/**
 * Navigates to the previous month.
 */
const prevMonth = () => {
  const date = new Date(currentMonth.value)
  date.setMonth(date.getMonth() - 1)
  currentMonth.value = date
}

/**
 * Navigates to the next month.
 */
const nextMonth = () => {
  const date = new Date(currentMonth.value)
  date.setMonth(date.getMonth() + 1)
  currentMonth.value = date
}

/**
 * Handles day click.
 */
const handleDayClick = (date) => {
  if (props.type === 'minmax') {
    // Range selection logic
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    
    if (currentValue.length === 0 || currentValue.length === 2) {
      // Start new range
      emit('update:modelValue', [date])
    } else {
      // Complete range
      const start = currentValue[0]
      if (date < start) {
        emit('update:modelValue', [date, start])
      } else {
        emit('update:modelValue', [start, date])
      }
    }
  } else {
    // Single date selection
    emit('update:modelValue', date)
  }
  
  emit('select', date)
}

/**
 * Handles shortcut click.
 */
const handleShortcutClick = (shortcut) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let result = null
  
  switch (shortcut.value) {
    case 'last7': {
      const start = new Date(today)
      start.setDate(start.getDate() - 7)
      result = [start, today]
      break
    }
    case 'tomorrow': {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      result = tomorrow
      break
    }
    case 'next7': {
      const end = new Date(today)
      end.setDate(end.getDate() + 7)
      result = [today, end]
      break
    }
    case 'next30': {
      const end = new Date(today)
      end.setDate(end.getDate() + 30)
      result = [today, end]
      break
    }
    case 'next90': {
      const end = new Date(today)
      end.setDate(end.getDate() + 90)
      result = [today, end]
      break
    }
    default:
      // Custom range or unknown - just emit the shortcut
      break
  }
  
  if (result) {
    emit('update:modelValue', result)
  }
  
  emit('shortcut-click', shortcut)
}
</script>

<style scoped>
.pendo-date-picker-dropdown {
  display: inline-flex;
  background-color: #ffffff;
  border: 1px solid #DADCE5; /* gray-40 */
  border-radius: 3px;
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.17); /* Depth 3 */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========================================
   SHORTCUTS PANEL
   ======================================== */
.pendo-date-picker-dropdown__shortcuts {
  display: flex;
  flex-direction: column;
  width: 140px;
  padding: 8px 0;
  border-right: 1px solid #DADCE5; /* gray-40 */
  background-color: #ffffff;
}

.pendo-date-picker-dropdown__shortcut-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 24px 4px 16px;
  background: transparent;
  border: none;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.pendo-date-picker-dropdown__shortcut-item:hover {
  background-color: #F8F8F9; /* gray-10 */
}

/* ========================================
   CALENDARS CONTAINER
   ======================================== */
.pendo-date-picker-dropdown__calendars {
  display: flex;
}

/* ========================================
   CALENDAR
   ======================================== */
.pendo-date-picker-dropdown__calendar {
  display: flex;
  flex-direction: column;
  width: 240px;
}

.pendo-date-picker-dropdown__calendar--second {
  border-left: 1px solid #DADCE5; /* gray-40 */
}

/* ========================================
   HEADER
   ======================================== */
.pendo-date-picker-dropdown__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 21px;
  height: 48px;
  padding: 0 8px;
}

.pendo-date-picker-dropdown__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 34px;
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: 3px;
  color: #2A2C35; /* gray-100 */
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.pendo-date-picker-dropdown__nav-btn:hover {
  background-color: #EAECF1; /* gray-30 */
}

.pendo-date-picker-dropdown__nav-placeholder {
  width: 32px;
  height: 34px;
}

.pendo-date-picker-dropdown__month-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: #128297; /* teal-70 */
  text-align: center;
}

/* ========================================
   DAY HEADERS
   ======================================== */
.pendo-date-picker-dropdown__day-headers {
  display: flex;
  padding: 0 8px;
}

.pendo-date-picker-dropdown__day-header {
  width: 32px;
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #6A6C75; /* gray-70 */
  text-align: center;
}

/* ========================================
   DAYS GRID
   ======================================== */
.pendo-date-picker-dropdown__days {
  display: flex;
  flex-direction: column;
  padding: 0 8px 8px 8px;
}

.pendo-date-picker-dropdown__week {
  display: flex;
}

.pendo-date-picker-dropdown__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: 3px;
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35; /* gray-100 */
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.pendo-date-picker-dropdown__day:hover:not(:disabled) {
  background-color: #EAECF1; /* gray-30 */
}

.pendo-date-picker-dropdown__day--empty {
  cursor: default;
}

.pendo-date-picker-dropdown__day--selected {
  background-color: #128297; /* teal-70 */
  color: #ffffff;
}

.pendo-date-picker-dropdown__day--selected:hover:not(:disabled) {
  background-color: #016479; /* teal-80 */
}

.pendo-date-picker-dropdown__day--in-range {
  background-color: #F0FEFC; /* teal-5 */
}

.pendo-date-picker-dropdown__day--disabled {
  color: #BABCC5; /* gray-50 */
  cursor: not-allowed;
}

.pendo-date-picker-dropdown__day--disabled:hover {
  background-color: transparent;
}
</style>

