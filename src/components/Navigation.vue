<template>
  <div
    class="navigation-sidebar bg-[#fafafc] h-full fixed left-0 top-0 flex flex-col py-2.5 overflow-hidden border-r border-[#dadce5]"
    :class="isCollapsed ? 'w-[64px] px-0' : 'w-[220px] px-0.5'"
  >
    <!-- Header Section -->
    <div
      class="mb-4 h-8 flex items-center"
      :class="isCollapsed ? 'px-0 justify-center' : 'px-6 justify-start'"
    >
      <button
        type="button"
        class="w-[26px] h-[26px] p-1 flex items-center justify-center m-0.5"
        :class="isCollapsed ? 'mr-0' : 'mr-[14px]'"
        aria-label="Toggle navigation"
        @click="toggleCollapsed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 12h16"/>
          <path d="M4 18h16"/>
          <path d="M4 6h16"/>
        </svg>
      </button>
      <!-- Pendo Logo -->
      <svg v-if="!isCollapsed" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 799 183" fill="none">
        <path d="M259 36.7C245.302 36.6557 232.103 41.8421 222.1 51.2V36.6H204.6V182.8H222.1V131C228.6 137.013 236.47 141.347 245.026 143.627C253.582 145.906 262.565 146.062 271.195 144.081C279.825 142.1 287.84 138.041 294.545 132.258C301.25 126.475 306.441 119.142 309.668 110.896C312.894 102.65 314.058 93.7416 313.059 84.9438C312.06 76.1459 308.928 67.7251 303.935 60.4129C298.941 53.1008 292.238 47.1186 284.407 42.986C276.576 38.8535 267.854 36.6957 259 36.7ZM295.9 91.1C295.9 98.3981 293.736 105.532 289.681 111.601C285.627 117.669 279.864 122.398 273.121 125.191C266.378 127.984 258.959 128.715 251.801 127.291C244.643 125.867 238.068 122.353 232.908 117.192C227.747 112.032 224.233 105.457 222.809 98.2988C221.385 91.1409 222.116 83.7216 224.909 76.979C227.702 70.2364 232.431 64.4734 238.499 60.4188C244.568 56.3641 251.702 54.2 259 54.2C268.783 54.2106 278.163 58.1017 285.081 65.0195C291.998 71.9373 295.889 81.3168 295.9 91.1Z" fill="#060119"/>
        <path d="M381.2 36.6C374.056 36.6 366.982 38.0071 360.382 40.741C353.782 43.4748 347.785 47.4819 342.733 52.5334C337.682 57.5849 333.675 63.5819 330.941 70.182C328.207 76.7821 326.8 83.8561 326.8 91C326.8 98.1439 328.207 105.218 330.941 111.818C333.675 118.418 337.682 124.415 342.733 129.467C347.785 134.518 353.782 138.525 360.382 141.259C366.982 143.993 374.056 145.4 381.2 145.4C398 145.4 413.4 139.1 423.5 128.2L428.7 122.5L429.4 121.8L428.7 121.1L417.3 110.6L416.6 109.9L415.9 110.6L410.7 116.3C404 123.6 393 127.9 381.3 127.9C373.041 127.869 365.031 125.076 358.543 119.966C352.056 114.856 347.464 107.722 345.5 99.7H434.3V91C434.1 60.5 410.9 36.6 381.2 36.6ZM345.3 82.2C347.278 74.186 351.874 67.061 358.358 61.9531C364.843 56.8453 372.846 54.0465 381.1 54C397.9 54 411.9 65.5 415.6 82.2H345.3Z" fill="#060119"/>
        <path d="M500.2 36.6C487.688 36.6065 475.644 41.3596 466.5 49.9V36.6H449V146.2H466.5V90.3C466.5 70.3 481.6 54.1 500.2 54.1C518.8 54.1 533.9 70.3 533.9 90.3V146.2H551.4V90.3C551.4 60.7 528.5 36.6 500.2 36.6Z" fill="#060119"/>
        <path d="M657.5 0V51.8C649.738 44.6061 640.045 39.8327 629.611 38.0646C619.176 36.2964 608.452 37.6104 598.753 41.8455C589.054 46.0806 580.801 53.0528 575.005 61.908C569.209 70.7631 566.122 81.1167 566.122 91.7C566.122 102.283 569.209 112.637 575.005 121.492C580.801 130.347 589.054 137.319 598.753 141.555C608.452 145.79 619.176 147.104 629.611 145.335C640.045 143.567 649.738 138.794 657.5 131.6V146.2H674.9V0H657.5ZM657.5 91.7C657.5 98.9981 655.336 106.132 651.281 112.201C647.227 118.269 641.464 122.998 634.721 125.791C627.978 128.584 620.559 129.315 613.401 127.891C606.243 126.467 599.668 122.953 594.508 117.792C589.347 112.632 585.833 106.057 584.409 98.8988C582.985 91.7409 583.716 84.3216 586.509 77.579C589.302 70.8364 594.031 65.0734 600.099 61.0188C606.168 56.9641 613.302 54.8 620.6 54.8C630.383 54.8106 639.763 58.7017 646.681 65.6195C653.598 72.5373 657.489 81.9168 657.5 91.7Z" fill="#060119"/>
        <path d="M744.5 37.3C733.741 37.3 723.223 40.4905 714.277 46.4681C705.331 52.4456 698.358 60.9417 694.241 70.882C690.124 80.8223 689.046 91.7603 691.145 102.313C693.244 112.865 698.425 122.559 706.033 130.167C713.641 137.775 723.335 142.956 733.887 145.055C744.44 147.154 755.378 146.076 765.318 141.959C775.258 137.842 783.754 130.869 789.732 121.923C795.709 112.977 798.9 102.459 798.9 91.7C798.884 77.2771 793.148 63.4495 782.949 53.2509C772.751 43.0524 758.923 37.3159 744.5 37.3ZM781.3 91.7C781.3 98.9981 779.136 106.132 775.081 112.201C771.027 118.269 765.264 122.998 758.521 125.791C751.778 128.584 744.359 129.315 737.201 127.891C730.043 126.467 723.468 122.953 718.308 117.792C713.147 112.632 709.633 106.057 708.209 98.8988C706.785 91.7409 707.516 84.3216 710.309 77.579C713.102 70.8364 717.831 65.0734 723.899 61.0188C729.968 56.9641 737.102 54.8 744.4 54.8C754.183 54.8106 763.563 58.7017 770.481 65.6195C777.398 72.5373 781.289 81.9168 781.3 91.7Z" fill="#060119"/>
        <path d="M82 18.6L0 100.7H82V182.8L164.1 100.7V18.6H82Z" fill="#FF4876"/>
      </svg>
    </div>

    <!-- Create New Button -->
    <div class="w-full mb-4" :class="isCollapsed ? 'px-0 flex justify-center' : 'px-6'">
      <button
        class="bg-[#2a2c35] rounded-[3px] flex items-center justify-center gap-1"
        :class="isCollapsed ? 'w-[38px] h-[38px]' : 'w-full h-8'"
        :title="isCollapsed ? 'Create new' : null"
        :style="isCollapsed ? null : 'padding: 0 10px 0 8px'"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3.33v9.34M3.33 8h9.34" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-if="!isCollapsed" class="text-white text-[14px] font-semibold leading-[1.5] font-['Inter']">
          Create new
        </span>
      </button>
    </div>

    <!-- Main Navigation Section -->
    <div class="flex flex-col flex-1">
      <!-- Quick Access -->
      <div class="flex flex-col pt-2">
        <NavItem icon="home" label="Home" :no-top-margin="true" :collapsed="isCollapsed" @click="navigateToHome" />
        <NavItem icon="dashboard" label="Dashboards" :collapsed="isCollapsed" @click="navigateToDashboard" />
        <NavItem icon="jump" label="Jump to page" shortcut="⌘+K" :collapsed="isCollapsed" />
        <NavItem icon="clock" label="Recents" :collapsed="isCollapsed" />
      </div>

      <!-- Learn Section -->
      <div class="flex flex-col pt-2">
        <div class="mt-5" :class="isCollapsed ? 'px-0' : 'px-2.5'">
          <SectionTitle v-if="!isCollapsed">LEARN</SectionTitle>
          <NavItem icon="product" label="Product" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="people" label="People" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="analytics" label="Analytics" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="replay" label="Replay" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="listen" label="Listen" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="sentiment" label="Sentiment" :collapsed="isCollapsed" />
        </div>

        <!-- Act Section -->
        <div class="mt-5" :class="isCollapsed ? 'px-0' : 'px-2.5'">
          <SectionTitle v-if="!isCollapsed">ACT</SectionTitle>
          <NavItem icon="guides" label="Guides" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="orchestrate" label="Orchestrate" :has-dropdown="true" :collapsed="isCollapsed" />
          <NavItem icon="roadmaps" label="Roadmaps" :collapsed="isCollapsed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavItem from './NavItem.vue'
import SectionTitle from './SectionTitle.vue'

const props = defineProps({
  collapsed: { type: Boolean, default: false }
})

const emit = defineEmits(['update:collapsed'])

const router = useRouter()

const isCollapsed = computed(() => props.collapsed)

const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}

const navigateToHome = () => {
  router.push('/home')
}

const navigateToDashboard = () => {
  router.push('/insights/feature-launch')
}
</script>



