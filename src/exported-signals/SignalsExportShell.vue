<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ask'])
const promptValue = ref('')
const quickSuggestions = [
  'Account health summary',
  'Top adoption shifts',
  'Explain this signal',
  'Draft follow-up actions'
]

function submitPrompt() {
  const value = promptValue.value.trim()
  if (!value) return
  if (typeof pendo !== 'undefined') {
    pendo.track('leo_prompt_submitted', {
      promptLength: value.length,
      isQuickSuggestion: quickSuggestions.includes(value)
    })
  }
  emit('ask', value)
  promptValue.value = ''
}
</script>

<template>
  <div class="signals-export-page">
    <div class="signals-export-page-inner">
      <section class="signals-export-hero">
        <div class="signals-export-branding">
          <span class="signals-export-leo-dot"></span>
          <span class="signals-export-hero-name">Leo</span>
          <span class="signals-export-hero-badge">Beta</span>
        </div>

        <h1 class="signals-export-hero-greeting">Good afternoon, Lauren.</h1>

        <div class="signals-export-prompt-card">
          <textarea
            v-model="promptValue"
            class="signals-export-prompt-input"
            rows="1"
            placeholder="Ask Leo anything about these signals..."
            @keydown.enter.exact.prevent="submitPrompt"
          ></textarea>
          <div class="signals-export-prompt-actions">
            <button class="signals-export-send-btn" :disabled="!promptValue.trim()" @click="submitPrompt">
              Ask Leo
            </button>
          </div>
        </div>
        <div class="signals-export-suggestions">
          <button
            v-for="suggestion in quickSuggestions"
            :key="suggestion"
            class="signals-export-suggestion-chip"
            @click="promptValue = suggestion"
          >
            {{ suggestion }}
          </button>
        </div>
      </section>

      <slot />
    </div>
  </div>
</template>

<style scoped src="./signalsShared.css"></style>
