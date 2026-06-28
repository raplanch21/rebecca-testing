<script setup>
import { ref } from 'vue'
import { figmaStateCards } from './signalsData.js'

const emit = defineEmits(['ask-leo'])
const openSignalStateId = ref('path-report')

function toggleSignalState(signalId) {
  openSignalStateId.value = openSignalStateId.value === signalId ? '' : signalId
}

function barWidth(width) {
  return `${Math.max(0, Math.min(100, width))}%`
}

function handleAskLeo(card) {
  if (typeof pendo !== 'undefined') {
    pendo.track('ask_leo_from_signal', {
      signalId: card.id,
      signalTag: card.tag,
      signalTagTone: card.tagTone,
      signalPeriod: card.period
    })
  }
  emit('ask-leo', card)
}
</script>

<template>
  <section class="signals-export-section">
    <div class="fy27-state-layout">
      <article
        v-for="card in figmaStateCards"
        :key="card.id"
        class="fy27-state-card figma-card"
        :class="{ 'fy27-state-card--open': openSignalStateId === card.id }"
      >
        <div class="figma-card-top">
          <div class="figma-card-header">
            <div
              class="figma-card-badge"
              :class="{
                'figma-card-badge--adoption': card.tagTone === 'adoption',
                'figma-card-badge--journeys': card.tagTone === 'journeys',
                'figma-card-badge--sentiment': card.tagTone === 'sentiment'
              }"
            >
              {{ card.tag }}
            </div>
            <span class="figma-card-period">{{ card.period }}</span>
          </div>

          <div class="figma-card-main-row">
            <p class="figma-card-headline">
              <span
                v-for="(part, idx) in card.headlineParts"
                :key="`${card.id}-headline-${idx}`"
                :class="{
                  'figma-headline-strong': part.strong,
                  'figma-headline-dotted': part.dotted,
                  'figma-headline-accent': part.accent
                }"
              >
                {{ part.text }}
              </span>
            </p>

            <div class="figma-metrics">
              <div v-for="metric in card.metrics" :key="`${card.id}-${metric.label}`" class="figma-metric-item">
                <span class="figma-metric-value">{{ metric.value }}</span>
                <span class="figma-metric-label">{{ metric.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="figma-card-toolbar">
          <button class="figma-takeaways-btn" @click="toggleSignalState(card.id)">
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
              :class="{ 'figma-toolbar-chevron-up': openSignalStateId === card.id }"
            ><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <button class="figma-actions-btn" @click="handleAskLeo(card)">
            Ask Leo
          </button>
        </div>

        <div v-if="openSignalStateId === card.id" class="figma-card-expanded">
          <p class="figma-breakdown-title">{{ card.breakdownTitle }}</p>
          <div class="figma-breakdown-chart-grid">
            <div class="figma-breakdown-legend-col">
              <div v-for="item in card.breakdown" :key="`${card.id}-${item.label}`" class="figma-breakdown-label">
                <span class="figma-breakdown-dot" :style="{ backgroundColor: item.dot }"></span>
                <span>{{ item.label }}</span>
              </div>
            </div>

            <div class="figma-breakdown-chart-col">
              <div class="export-breakdown-bars">
                <div v-for="item in card.breakdown" :key="`${card.id}-${item.label}-bar`" class="export-breakdown-row">
                  <div class="export-breakdown-track" :style="{ backgroundColor: item.track }">
                    <div class="export-breakdown-fill" :style="{ width: barWidth(item.width), backgroundColor: item.fill }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="figma-breakdown-values-col">
              <span v-for="item in card.breakdown" :key="`${card.id}-${item.label}-value`" class="figma-breakdown-value">
                {{ item.value }}
              </span>
            </div>
          </div>

          <p v-if="card.takeaway" class="figma-body-copy">{{ card.takeaway }}</p>

          <template v-if="card.additionalInfo?.length">
            <p v-for="text in card.additionalInfo" :key="`${card.id}-${text}`" class="figma-body-copy">
              {{ text }}
            </p>
          </template>

          <p class="figma-opportunity-title">Opportunity</p>
          <p class="figma-body-copy">{{ card.opportunity }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped src="./signalsShared.css"></style>
