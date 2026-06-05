<template>
  <div class="flex justify-center w-full">
    <div 
      class="flex items-center h-8 px-2 py-1.5 rounded-[3px] cursor-pointer transition-colors hover:bg-[#f4f4f7]"
      :class="[
        collapsed ? 'w-[38px] justify-center' : 'w-[195px] justify-between',
        { 'mt-0.5': !noTopMargin }
      ]"
      :title="collapsed ? label : null"
      @click="$emit('click')"
    >
      <div class="flex items-center">
        <div class="w-[26px] h-[26px] p-1 flex items-center justify-center" :style="{ color: iconColor }">
          <!-- Home -->
          <svg v-if="icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          <!-- Dashboard -->
          <svg v-else-if="icon === 'dashboard'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
          <!-- Jump -->
          <svg v-else-if="icon === 'jump'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="17" r="1"/>
            <path d="M21 7v6h-6"/>
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
          </svg>
          <!-- Clock -->
          <svg v-else-if="icon === 'clock'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 6v6l4 2"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <!-- Product -->
          <svg v-else-if="icon === 'product'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M9 21V9"/>
          </svg>
          <!-- People -->
          <svg v-else-if="icon === 'people'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 21a8 8 0 0 0-16 0"/>
            <circle cx="10" cy="8" r="5"/>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
          </svg>
          <!-- Analytics -->
          <svg v-else-if="icon === 'analytics'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
            <rect x="15" y="5" width="4" height="12" rx="1"/>
            <rect x="7" y="8" width="4" height="9" rx="1"/>
          </svg>
          <!-- Replay -->
          <svg v-else-if="icon === 'replay'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5.83331 5.15014C5.83331 4.9129 6.10146 4.77491 6.29451 4.9128L9.58437 7.2627C9.74722 7.37902 9.74722 7.62106 9.58437 7.73738L6.29451 10.0873C6.10146 10.2252 5.83331 10.0872 5.83331 9.84994V5.15014Z"/>
            <path d="M7.00002 13.3333C10.2217 13.3333 12.8334 10.7216 12.8334 7.49996C12.8334 4.2783 10.2217 1.66663 7.00002 1.66663C6.1704 1.66663 5.38123 1.83981 4.66669 2.15201M1.16669 7.49996C1.16669 8.21823 1.29651 8.90618 1.53396 9.54163M2.75485 3.49914C2.22687 4.05916 1.80848 4.72364 1.53396 5.45829M2.75485 11.5008C3.29107 12.0695 3.94032 12.5305 4.66669 12.8479"/>
          </svg>
          <!-- Listen -->
          <svg v-else-if="icon === 'listen'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.54698 12.5028C9.54698 11.477 9.10552 10.4932 8.31972 9.76787C7.53391 9.04251 6.46813 8.63501 5.35684 8.63501C4.24554 8.63501 3.17976 9.04251 2.39395 9.76787C1.60815 10.4932 1.16669 11.477 1.16669 12.5028"/>
            <path d="M5.38287 8.63512C6.98497 8.63512 8.28374 7.33635 8.28374 5.73425C8.28374 4.13214 6.98497 2.83337 5.38287 2.83337C3.78076 2.83337 2.48199 4.13214 2.48199 5.73425C2.48199 7.33635 3.78076 8.63512 5.38287 8.63512Z"/>
            <path d="M11.6242 8.30793C12.3085 7.62351 12.6931 6.69536 12.6934 5.72751C12.6937 4.75965 12.3096 3.83129 11.6257 3.14648"/>
            <path d="M10.2612 6.94486C10.4205 6.78562 10.5466 6.59639 10.6322 6.38811C10.7179 6.17983 10.7614 5.95663 10.7603 5.73143C10.7592 5.50622 10.7134 5.28347 10.6257 5.07606C10.5379 4.86865 10.4099 4.6807 10.249 4.52307"/>
          </svg>
          <!-- Sentiment -->
          <svg v-else-if="icon === 'sentiment'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
          </svg>
          <!-- Guides -->
          <svg v-else-if="icon === 'guides'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round">
            <path d="M0.929688 3.77237C0.929688 3.12804 1.45202 2.60571 2.09635 2.60571H11.9036C12.548 2.60571 13.0703 3.12805 13.0703 3.77238V9.33044C13.0703 9.97479 12.548 10.4971 11.9036 10.4971H9.42813L6.92411 12.3941L4.57188 10.4971H2.09635C1.45202 10.4971 0.929688 9.97479 0.929688 9.33044V3.77237Z"/>
          </svg>
          <!-- Orchestrate -->
          <svg v-else-if="icon === 'orchestrate'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 24" fill="none">
            <path d="M4.9996 8.25L4.9996 7C4.9996 6.33696 5.21032 5.70107 5.58539 5.23223C5.96046 4.76339 6.46917 4.5 6.9996 4.5L7.9996 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.9996 15.75V17C4.9996 17.663 5.21032 18.2989 5.58539 18.7678C5.96046 19.2366 6.46917 19.5 6.9996 19.5H7.9996" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="18.9996" y="16.75" width="5.5" height="7" rx="1" transform="rotate(90 18.9996 16.75)" stroke="currentColor" stroke-width="2"/>
            <rect x="18.9996" y="1.75" width="5.5" height="7" rx="1" transform="rotate(90 18.9996 1.75)" stroke="currentColor" stroke-width="2"/>
            <rect x="7.9996" y="9.25" width="5.5" height="7" rx="1" transform="rotate(90 7.9996 9.25)" stroke="currentColor" stroke-width="2"/>
          </svg>
          <!-- Roadmaps -->
          <svg v-else-if="icon === 'roadmaps'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 15" fill="none" stroke="currentColor" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11.0833 2.25H2.91667C2.27233 2.25 1.75 2.77233 1.75 3.41667V11.5833C1.75 12.2277 2.27233 12.75 2.91667 12.75H11.0833C11.7277 12.75 12.25 12.2277 12.25 11.5833V3.41667C12.25 2.77233 11.7277 2.25 11.0833 2.25Z"/>
            <path d="M5.25 5.16675H9.33333"/>
            <path d="M4.66681 7.5H8.16681"/>
            <path d="M6.41681 9.83325H9.33348"/>
          </svg>
        </div>
        <span v-if="!collapsed" class="text-[#3a3c45] text-[14px] font-medium font-['Inter'] ml-[6px]">
          {{ label }}
        </span>
      </div>
      <div v-if="!collapsed" class="flex items-center gap-1">
        <span v-if="shortcut" class="text-[#6a6c75] text-[12px] font-medium font-['Inter'] opacity-80">
          {{ shortcut }}
        </span>
        <svg v-if="hasDropdown" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="#6a6c75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  hasDropdown: { type: Boolean, default: false },
  shortcut: { type: String, default: null },
  noTopMargin: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  iconColor: { type: String, default: '#2a2c35' }
})

defineEmits(['click'])
</script>
