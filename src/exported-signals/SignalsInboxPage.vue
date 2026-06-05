<script setup>
import { computed, ref } from 'vue'
import { inboxMainContentById, inboxSidebarCards } from './signalsData.js'

const emit = defineEmits(['ask-leo'])

function handleInboxAskLeo() {
  if (typeof pendo !== 'undefined') {
    pendo.track('signal_inbox_ask_leo_initiated', {
      signalId: activeInboxContent.value?.id || activeInboxId.value,
      signalTitle: activeInboxContent.value?.title || '',
      signalTag: activeInboxContent.value?.tag || '',
      signalTagTone: activeInboxContent.value?.tagTone || ''
    })
  }
  emit('ask-leo', activeInboxContent.value)
  inboxActionsOpen.value = false
}

const activeInboxId = ref('inbox-path')
const inboxTakeawaysOpen = ref(false)
const inboxActionsOpen = ref(false)

const activeInboxContent = computed(() => {
  return inboxMainContentById[activeInboxId.value] || inboxMainContentById['inbox-path']
})

function selectInboxCard(id) {
  activeInboxId.value = id
  inboxTakeawaysOpen.value = false
  inboxActionsOpen.value = false
}

function formatAxisEvents(value) {
  return `${Number(value).toLocaleString()}`
}

function barWidth(width) {
  return `${Math.max(0, Math.min(100, width))}%`
}
</script>

<template>
  <section class="signals-export-section">
    <div class="signals-inbox-layout">
      <aside class="signals-inbox-sidebar">
        <div class="signals-inbox-sidebar-scroll">
          <article
            v-for="item in inboxSidebarCards"
            :key="item.id"
            class="signals-inbox-widget"
            :class="{ 'signals-inbox-widget--active': activeInboxId === item.id }"
            @click="selectInboxCard(item.id)"
          >
            <div class="signals-inbox-widget-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
              <span>{{ item.org }}</span>
            </div>

            <p class="signals-inbox-widget-copy">
              <span
                v-for="(part, idx) in item.headlineParts"
                :key="`${item.id}-${idx}`"
                :class="{
                  'figma-headline-strong': part.strong,
                  'figma-headline-dotted': part.dotted,
                  'figma-headline-accent': part.accent
                }"
              >
                {{ part.text }}
              </span>
            </p>

            <div class="signals-inbox-widget-footer">
              <div
                class="figma-card-badge"
                :class="{
                  'figma-card-badge--adoption': item.tagTone === 'adoption',
                  'figma-card-badge--journeys': item.tagTone === 'journeys',
                  'figma-card-badge--sentiment': item.tagTone === 'sentiment'
                }"
              >
                {{ item.tag }}
              </div>
              <span class="figma-card-period">{{ item.period }}</span>
            </div>
          </article>
        </div>
      </aside>

      <div class="signals-inbox-main">
        <div class="signals-inbox-main-header">
          <h3 class="signals-inbox-title">{{ activeInboxContent.title }}</h3>
          <div class="signals-inbox-header-actions">
            <button class="figma-actions-btn signals-inbox-link-btn">{{ activeInboxContent.actionLabel || 'View details' }}</button>
            <div class="signals-inbox-actions-menu-wrap">
              <button class="figma-actions-btn signals-inbox-header-menu-btn" @click.stop="inboxActionsOpen = !inboxActionsOpen">
                Actions
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" class="fy27-layout-chevron" :class="{ 'fy27-layout-chevron--open': inboxActionsOpen }"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div v-if="inboxActionsOpen" class="signals-inbox-header-menu">
                <button class="signals-inbox-header-menu-item" @click="inboxActionsOpen = false">Watch replays</button>
                <button class="signals-inbox-header-menu-item" @click="handleInboxAskLeo()">Ask Leo</button>
              </div>
            </div>
          </div>
        </div>

        <p class="figma-body-copy">
          <span
            v-for="(part, idx) in activeInboxContent.narrativeParts"
            :key="`narrative-${idx}`"
            :class="{
              'figma-headline-strong': part.strong,
              'figma-headline-accent': part.accent
            }"
          >
            {{ part.text }}
          </span>
        </p>

        <div class="signals-inbox-breakdown">
          <p class="figma-breakdown-title">{{ activeInboxContent.breakdownTitle }}</p>

          <div v-if="activeInboxContent.breakdownType === 'period-bars'" class="signals-inbox-period-chart-wrap">
            <div class="signals-period-table">
              <div class="signals-period-header-row">
                <span class="signals-period-header-cell signals-period-header-cell--metric"></span>
                <span class="signals-period-header-cell">Prior period</span>
                <span class="signals-period-header-cell">Current period</span>
                <span class="signals-period-header-cell">Change</span>
              </div>
              <div
                v-for="row in activeInboxContent.periodComparison"
                :key="`period-row-${row.label}`"
                class="signals-period-data-row"
              >
                <span class="signals-period-metric signals-period-metric--link">{{ row.label }}</span>
                <span class="signals-period-pill">{{ formatAxisEvents(row.priorEvents) }}</span>
                <span class="signals-period-pill">{{ formatAxisEvents(row.currentEvents) }}</span>
                <span
                  class="signals-period-delta-tag"
                  :class="{
                    'fy27-change-negative': row.change.startsWith('-'),
                    'fy27-change-positive': row.change.startsWith('+')
                  }"
                >
                  {{ row.change }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="figma-breakdown-chart-grid">
            <div class="figma-breakdown-legend-col">
              <div v-for="item in activeInboxContent.breakdown" :key="`inbox-${item.label}`" class="figma-breakdown-label">
                <span class="figma-breakdown-dot" :style="{ backgroundColor: item.dot }"></span>
                <span>{{ item.label }}</span>
              </div>
            </div>

            <div class="figma-breakdown-chart-col">
              <div class="export-breakdown-bars">
                <div v-for="item in activeInboxContent.breakdown" :key="`inbox-${item.label}-bar`" class="export-breakdown-row">
                  <div class="export-breakdown-track" :style="{ backgroundColor: item.track }">
                    <div class="export-breakdown-fill" :style="{ width: barWidth(item.width), backgroundColor: item.fill }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="figma-breakdown-values-col">
              <span
                v-for="item in activeInboxContent.breakdown"
                :key="`inbox-${item.label}-value`"
                class="figma-breakdown-value"
              >
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>

        <div class="signals-inbox-takeaways">
          <button class="figma-takeaways-btn signals-inbox-takeaways-btn" @click="inboxTakeawaysOpen = !inboxTakeawaysOpen">
            Takeaways
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{ 'figma-toolbar-chevron-up': inboxTakeawaysOpen }"
            ><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <template v-if="inboxTakeawaysOpen">
            <p class="figma-body-copy">{{ activeInboxContent.takeaway }}</p>
            <p class="figma-body-copy">{{ activeInboxContent.opportunity }}</p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./signalsShared.css"></style>
