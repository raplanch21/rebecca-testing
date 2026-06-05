<template>
  <div class="bg-gray-0 border-b border-border-color h-[52px] flex items-center justify-between px-5 py-2.5">
    <!-- Left side - Back arrow only -->
    <div class="flex items-center">
      <div style="width: 32px; height: 32px; padding: 4px; border-radius: 8px; border: 1px solid #eaecf1; margin-right: 16px">
        <button class="w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[14px] h-[14px]">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Right side - Title and Icons -->
    <div style="display: flex; justify-content: flex-end; align-items: center; gap: 6px; margin-left: auto">
      <PendoSelect v-model="selectedPage" :options="pageOptions" :editable="true" style="width: 240px;" @update:modelValue="handlePageChange" @update:options="handlePageRename" />
      <PendoSelect v-if="showPrototypeSelectors" v-model="selectedSubscription" :options="subscriptionOptions" style="width: auto; min-width: 200px;" />
      <div class="flex items-center gap-1.5 text-gray-100">
        <button class="w-8 h-8 p-1 flex items-center justify-center hover:bg-gray-10 transition-colors rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-[24px] h-[24px]">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3172 3.27624C11.495 3.09937 11.7362 3 11.9877 3H20.0517C20.5754 3 21 3.42225 21 3.94313V11.9637C21 12.2119 20.9017 12.45 20.7263 12.6266L12.6887 20.7178C12.093 21.3175 11.0659 20.8979 11.0659 20.055V12.8804H3.95015C3.10533 12.8804 2.68228 11.8645 3.27964 11.2704L11.3172 3.27624ZM12.3431 4.79643L6.02141 11.0839H11.9239C12.4476 11.0839 12.8721 11.5062 12.8721 12.0271V17.9772L19.1938 11.6133V4.79643H12.3431Z" fill="currentColor"/>
          </svg>
        </button>
        <button class="w-8 h-8 p-1 flex items-center justify-center hover:bg-gray-10 transition-colors rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[21px] h-[21px]">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
        <button class="w-8 h-8 p-1 flex items-center justify-center hover:bg-gray-10 transition-colors rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[21px] h-[21px]">
            <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
          </svg>
        </button>
        <!-- Avatar placeholder -->
        <div class="w-8 h-8 rounded-full bg-[var(--green-10)] flex items-center justify-center" style="border: 1.5px solid rgba(0, 152, 85, 0.3)">
          <span class="text-[var(--green-80)] text-sm font-semibold">T</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PendoSelect from './pendo/PendoSelect.vue'

const showPrototypeSelectors = false

const props = defineProps({
  configurationType: {
    type: String,
    default: 'Drawer configuration'
  },
  activePage: {
    type: String,
    default: 'Dashboard'
  },
  pageOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:configurationType', 'update:activePage', 'pageChange', 'pageRename'])

const selectedSubscription = computed({
  get: () => props.configurationType,
  set: (value) => emit('update:configurationType', value)
})

const selectedPage = computed({
  get: () => props.activePage,
  set: (value) => emit('update:activePage', value)
})

const handlePageChange = (value) => {
  emit('pageChange', value)
}

const handlePageRename = (updatedOptions) => {
  emit('pageRename', updatedOptions)
}

const subscriptionOptions = [
  { value: 'Drawer configuration', label: 'Drawer configuration' },
  { value: 'Blade configuration', label: 'Blade configuration' }
]
</script>

