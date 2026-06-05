<template>
  <div class="dashboard-container">
    <div class="dashboard-main" :class="{ 'dashboard-main--with-blade': showBlade }">
    <!-- Top-of-page header (matches app screenshot style) -->
    <div class="bg-white border-b border-[var(--gray-30)] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4 sm:pb-5">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Title row -->
        <div class="flex flex-col gap-2 min-w-0 flex-1" style="min-width: 200px;">
          <div class="flex items-center gap-3">
            <PendoButton 
              type="secondary" 
              icon="chart-no-axes-combined" 
              :icon-stroke-width="1.5"
              aria-label="Dashboard options"
              style="background-color: rgba(187, 31, 82, 0.1); border-color: transparent; color: #BB1F52;"
            />
            <h1 class="text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.15] font-semibold text-[var(--gray-100)]" style="font-family: var(--font-family-headings);">
              Autonomous Insights
            </h1>
          </div>
          <p class="text-[13px] sm:text-[14px] text-[var(--gray-70)] pl-[48px]">
            Tracking user engagement, adoption rates, and growth metrics for Trends.
          </p>
        </div>

        <!-- Actions row -->
        <div class="flex flex-wrap items-center gap-2">
          <PendoButton class="hidden sm:inline-flex" type="tertiary" icon="star" :icon-stroke-width="2.5" aria-label="Favorite" />
          <PendoButton type="secondary" icon="more-horizontal-filled" aria-label="More actions" />
          <PendoButton class="hidden md:inline-flex" type="secondary" prefix-icon="message-circle" label="0" aria-label="Comments" />

          <!-- Subscribe split button -->
          <div class="inline-flex">
            <PendoButton 
              type="secondary" 
              prefix-icon="rss" 
              label="Subscribe to updates" 
              title="Get recurring Slack updates with the latest dashboard metrics."
              style="border-top-right-radius: 0; border-bottom-right-radius: 0;" 
              @click="handleSubscribeClick" 
            />
            <PendoButton type="secondary" icon="chevron-down" aria-label="Subscribe options" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-left-width: 0;" />
          </div>

          <!-- Add to dashboard button -->
          <PendoButton class="hidden lg:inline-flex" type="primary" label="Add to dashboard" suffix-icon="chevron-down" aria-label="Add to dashboard" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <!-- Filter row -->
      <div class="py-4 sm:py-6">
        <div class="border border-[var(--gray-30)] rounded-[6px] bg-white px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div class="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto overflow-x-auto">
            <div class="inline-flex items-center gap-2 rounded-full border border-[var(--gray-40)] px-3 py-1 min-w-0 flex-shrink-0">
              <span class="text-[13px] sm:text-[14px] text-[var(--gray-100)] whitespace-nowrap">Segment is</span>
              <button type="button" class="inline-flex items-center gap-1 min-w-0 text-[var(--teal-90)] font-semibold text-[13px] sm:text-[14px]">
                <span class="truncate">Enterprise</span>
                <PendoIcon type="chevron-down" :size="16" :stroke-width="2" />
              </button>
              <button
                type="button"
                class="ml-1 w-6 h-6 rounded-full border border-[var(--gray-40)] flex items-center justify-center text-[var(--gray-60)] hover:bg-[var(--gray-20)]"
                aria-label="Clear segment"
              >
                <PendoIcon type="x" :size="14" :stroke-width="2" />
              </button>
            </div>

            <button type="button" class="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-[var(--gray-90)] flex-shrink-0">
              <PendoIcon type="filter" :size="16" :stroke-width="2" />
              <span class="hidden sm:inline">Add filter</span>
            </button>
          </div>

          <button type="button" class="text-[13px] sm:text-[14px] font-semibold text-[var(--teal-90)] whitespace-nowrap w-full sm:w-auto text-left sm:text-right">
            Clear filters
          </button>
        </div>
      </div>

      <!-- Section header -->
      <div class="my-6 sm:my-8 lg:my-10">
        <div class="h-px bg-[var(--gray-40)]" />
        <div class="py-8 sm:py-10 lg:py-12 text-center px-4">
          <div class="text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.15] font-semibold text-[var(--gray-100)]">
            General usage
          </div>
          <div class="mt-2 sm:mt-3 text-[14px] sm:text-[15px] lg:text-[16px] text-[var(--gray-70)]">
            How many visitors and accounts are using Trends?
          </div>
        </div>
        <div class="h-px bg-[var(--gray-40)]" />
      </div>

      <!-- Feature background and The team sections -->
      <div class="info-grid" :class="{ 'info-grid--blade-open': showBlade }">
        <!-- Feature background -->
        <div class="bg-white rounded-[6px] p-6">
          <h2 class="text-[18px] font-semibold text-[var(--gray-100)] mb-4">Feature background</h2>
          <p class="text-[14px] text-[var(--gray-70)] mb-4">Use this section to provide your team context on the feature.</p>
          <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)] mb-4">
            <li><span class="font-semibold">Who's the target user?</span> Product managers, analysts, and business intelligence teams who need to quickly identify emerging patterns and anomalies in product usage data.</li>
            <li><span class="font-semibold">What's their problem?</span> Users spend hours manually analyzing dashboards and building custom queries to spot trends, often missing important signals until it's too late to act.</li>
            <li><span class="font-semibold">What's the solution?</span> Trends uses AI to automatically surface meaningful patterns, anomalies, and insights from your product data, helping teams stay ahead of important changes without manual analysis.</li>
          </ul>
          <h3 class="text-[14px] font-semibold text-[var(--gray-100)] mb-2">Goal</h3>
          <p class="text-[14px] text-[var(--gray-100)] mb-4">We're targeting 50% of accounts taking Level 1 actions (clicking through to card insights) within the first month.</p>
          <h3 class="text-[14px] font-semibold text-[var(--gray-100)] mb-2">Important links</h3>
          <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)]">
            <li>Product requirements doc</li>
            <li>Design prototype in Figma</li>
            <li>User research findings</li>
            <li>Beta feedback summary</li>
          </ul>
        </div>

        <!-- The team and Important dates -->
        <div class="bg-white rounded-[6px] p-6">
          <h2 class="text-[18px] font-semibold text-[var(--gray-100)] mb-4">The team</h2>
          <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)] mb-6">
            <li><span class="font-semibold">Product manager:</span> Tiffany Kitchen</li>
            <li><span class="font-semibold">Designer:</span> Rebecca Planchart</li>
            <li><span class="font-semibold">Program manager:</span> Alex Rivera</li>
            <li><span class="font-semibold">Engineering manager:</span> Maya Patel</li>
            <li><span class="font-semibold">Tech lead:</span> Chris Thompson</li>
            <li><span class="font-semibold">Dev team:</span> Chris Thompson, Priya Singh, Marcus Johnson</li>
            <li><span class="font-semibold">Content lead:</span> Maddy Snyder</li>
          </ul>
          <h2 class="text-[18px] font-semibold text-[var(--gray-100)] mb-4">Important dates</h2>
          <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)]">
            <li><span class="font-semibold">Jan 3, 2026:</span> Beta launch to select customers</li>
            <li><span class="font-semibold">Jan 15, 2026:</span> General availability rollout</li>
            <li><span class="font-semibold">Feb 5, 2026:</span> First engagement analysis checkpoint</li>
            <li><span class="font-semibold">Feb 28, 2026:</span> End of Q1 adoption target window</li>
          </ul>
        </div>
      </div>

      <!-- Number of visitors and accounts cards -->
      <div class="metric-cards-grid" :class="{ 'metric-cards-grid--blade-open': showBlade }">
        <!-- Number of visitors card -->
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Number of visitors</span>
            </div>
          </template>
          <div class="px-4 pt-4 pb-6 flex flex-col h-full">
            <!-- Filter pills -->
            <div class="flex items-center gap-2 mb-6 flex-wrap">
              <PendoTag type="filter" label="Last 6 weeks" size="regular" />
              <PendoTag type="filter" label="[Module] Analytics | active paying custom..." size="regular" />
              <PendoTag type="filter" label="Pendo" size="regular" />
              <PendoTag type="filter" label="All Visitors" size="regular" />
              <PendoTag type="filter" label="Visitors" size="regular" />
            </div>
            
            <!-- Metrics -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">2.7K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Today</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">2.5K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Daily (DAU)</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">9.9K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Weekly (WAU)</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">41.2K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Monthly (MAU)</div>
              </div>
            </div>
          </div>
        </PendoCard>

        <!-- Number of accounts card -->
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Number of accounts</span>
            </div>
          </template>
          <div class="px-4 pt-4 pb-6 flex flex-col h-full">
            <!-- Filter pills -->
            <div class="flex items-center gap-2 mb-6 flex-wrap">
              <PendoTag type="filter" label="Last 6 weeks" size="regular" />
              <PendoTag type="filter" label="[Module] Analytics | active paying custom..." size="regular" />
              <PendoTag type="filter" label="Pendo" size="regular" />
              <PendoTag type="filter" label="All Accounts" size="regular" />
              <PendoTag type="filter" label="Accounts" size="regular" />
            </div>
            
            <!-- Metrics -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">2.6K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Today</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">2.5K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Daily (DAA)</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">3.9K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Weekly (WAA)</div>
              </div>
              <div class="text-center">
                <div class="text-[28px] sm:text-[36px] leading-[1.1] font-semibold text-[var(--gray-100)]">5.1K</div>
                <div class="mt-1 text-[12px] sm:text-[14px] text-[var(--gray-70)]">Monthly (MAA)</div>
              </div>
            </div>
          </div>
        </PendoCard>
      </div>

      <!-- Chart card -->
      <div class="mb-6">
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Weekly active visitors and accounts for Trends</span>
            </div>
          </template>
          <div class="px-4 pt-4 pb-6">
            <!-- Filter pills -->
            <div class="flex items-center gap-2 mb-6 flex-wrap">
              <PendoTag type="filter" label="Last 6 weeks" size="regular" />
              <PendoTag type="filter" label="Weekly" size="regular" />
              <PendoTag type="filter" label="[Module] Analytics | active paying custom..." size="regular" />
              <PendoTag type="filter" label="Pendo" size="regular" />
              <PendoTag type="filter" label="All Accounts" size="regular" />
            </div>
            
            <!-- Highcharts chart -->
            <highcharts :options="chartOptions" />
          </div>
        </PendoCard>
      </div>

      <!-- Qualitative Feedback Card -->
      <div class="mb-6">
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center justify-between w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">User feedback | Trends feature</span>
            </div>
          </template>
          <div class="px-4 pt-4 pb-6">
            <!-- Filter pills -->
            <div class="flex items-center gap-2 mb-4 flex-wrap">
              <PendoTag type="filter" label="Last 6 weeks" size="regular" />
              <PendoTag type="filter" label="[Module] Analytics | active paying custom..." size="regular" />
              <PendoTag type="filter" label="Pendo" size="regular" />
              <PendoTag type="filter" label="All Accounts" size="regular" />
            </div>

            <!-- Question prompt -->
            <div class="mb-4">
              <h3 class="text-[16px] font-semibold text-[var(--gray-100)] mb-2">
                What's your experience with the Trends feature?
              </h3>
              <div class="text-[14px] text-[var(--gray-70)]">
                <span class="font-semibold">52 responses</span> · 
                <span>68 visitors seen</span> · 
                <span class="font-semibold">41 unique responses</span> · 
                <span>76% response rate</span>
              </div>
            </div>

            <!-- Feedback responses -->
            <div class="space-y-4">
              <!-- Response 1 -->
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  Trends has become my go-to for understanding what's happening across our product. The AI-generated insights save me hours of manual analysis each week.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Enterprise Account • February 1, 2026 · 10:15:42 AM EST
                </div>
              </div>

              <!-- Response 2 -->
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  Love the concept but I wish I could customize which metrics show up in my Trends view. Sometimes I'm drowning in data that isn't relevant to my role.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Mid-Market Account • January 31, 2026 · 2:33:18 PM EST
                </div>
              </div>

              <!-- Response 3 -->
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  The insights are helpful, but I find myself wanting more context. Would be great if clicking on a trend showed me session replays or specific user examples.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Enterprise Account • January 30, 2026 · 9:45:55 AM EST
                </div>
              </div>

              <!-- Response 4 -->
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  This feature is a game changer for our weekly standups. We can quickly see what's trending without having to build custom reports.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  SMB Account • January 29, 2026 · 4:22:11 PM EST
                </div>
              </div>

              <!-- Response 5 -->
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  I check Trends every morning now. It's become part of my routine. My only request is to add a way to share specific insights directly to Slack.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Enterprise Account • January 28, 2026 · 8:10:33 AM EST
                </div>
              </div>
            </div>
          </div>
        </PendoCard>
      </div>
    </div>

    </div>
    <!-- End dashboard-main -->

    <!-- Backdrop for mobile/tablet blade -->
    <div 
      v-if="configurationType === 'Blade configuration' && showBlade"
      class="blade-backdrop"
      @click="showBlade = false"
    ></div>

    <!-- Blade Configuration - only show for Blade configuration -->
    <BladeConfiguration
      v-if="configurationType === 'Blade configuration' && showBlade"
      dashboard-name="Autonomous Insights"
      class="blade-responsive"
      @close="showBlade = false"
      @save="handleSubscribeSave"
    />

    <!-- Subscribe Modal - only show for Drawer configuration -->
    <SubscribeModal
      v-if="configurationType === 'Drawer configuration'"
      v-model:visible="showSubscribeModal"
      dashboard-name="Autonomous Insights"
      @save="handleSubscribeSave"
    />
  </div>
  <!-- End dashboard-container -->
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Chart } from 'highcharts-vue'
import {
  PendoButton,
  PendoCard,
  PendoIcon,
  PendoTag
} from './pendo'
import SubscribeModal from './SubscribeModal.vue'
import BladeConfiguration from './BladeConfiguration.vue'

const props = defineProps({
  configurationType: {
    type: String,
    default: 'Drawer configuration'
  }
})

const route = useRoute()
const showSubscribeModal = ref(false)
const showBlade = ref(false)

// Open blade automatically if route has openBlade meta
onMounted(() => {
  console.log('FeatureLaunchDashboard mounted')
  console.log('Route meta:', route.meta)
  console.log('Configuration type:', props.configurationType)
  console.log('Should open blade:', route.meta.openBlade && props.configurationType === 'Blade configuration')
  
  if (route.meta.openBlade && props.configurationType === 'Blade configuration') {
    showBlade.value = true
    console.log('Blade opened automatically')
  }
})

// Prevent body scroll when blade is open on mobile/tablet
watch(showBlade, (isOpen) => {
  if (window.innerWidth <= 1024) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Close the modal/blade when switching configuration types
watch(() => props.configurationType, (newType) => {
  if (newType !== 'Drawer configuration') {
    showSubscribeModal.value = false
  }
  if (newType !== 'Blade configuration') {
    showBlade.value = false
  }
})

const handleSubscribeClick = () => {
  if (props.configurationType === 'Drawer configuration') {
    showSubscribeModal.value = true
  } else if (props.configurationType === 'Blade configuration') {
    showBlade.value = true
  }
}

const handleSubscribeSave = (formData) => {
  console.log('Subscribe data:', formData)
  // Handle save logic here
}

const chartOptions = {
  chart: {
    type: 'line',
    height: 400,
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    events: {
      load: function() {
        this.series.forEach(function(series) {
          if (series.graph) {
            series.graph.attr({
              'stroke-linecap': 'round'
            })
          }
        })
      },
      redraw: function() {
        this.series.forEach(function(series) {
          if (series.graph) {
            series.graph.attr({
              'stroke-linecap': 'round'
            })
          }
        })
      }
    }
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: ['Jan 15', 'Jan 22', 'Jan 29', 'Feb 5'],
    lineColor: '#EAECF1',
    tickColor: '#EAECF1',
    labels: {
      style: {
        color: '#6A6C75',
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    title: {
      text: 'Quantity',
      style: {
        color: '#6A6C75',
        fontSize: '12px'
      }
    },
    gridLineColor: '#EAECF1',
    labels: {
      style: {
        color: '#6A6C75',
        fontSize: '12px'
      }
    },
    min: 0,
    max: 11000
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: {
      color: '#2A2C35',
      fontSize: '14px',
      fontWeight: '400'
    },
    itemHoverStyle: {
      color: '#2A2C35'
    },
    // Hide default (line) legend symbols and render dot via HTML.
    symbolWidth: 0,
    symbolHeight: 0,
    symbolPadding: 0,
    useHTML: true,
    labelFormatter: function () {
      const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${this.color};margin-right:8px;vertical-align:middle;"></span>`
      return `${dot}<span style="vertical-align:middle;">${this.name}</span>`
    }
  },
  plotOptions: {
    line: {
      lineWidth: 2,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 5,
        lineWidth: 2,
        lineColor: '#FFFFFF',
        states: {
          hover: {
            enabled: true,
            radius: 6,
            lineWidth: 2,
            lineColor: '#FFFFFF'
          }
        }
      }
    },
    series: {
      linecap: 'round',
      states: {
        hover: {
          lineWidthPlus: 0
        }
      }
    }
  },
  series: [
    {
      name: 'Visitors',
      data: [7500, 8800, 9400, 9856],
      color: '#128297',
      marker: { enabled: false }
    },
    {
      name: 'Accounts',
      data: [3200, 3600, 3800, 3892],
      color: '#DA1010',
      marker: { enabled: false }
    }
  ],
  tooltip: {
    shared: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE5',
    borderWidth: 1,
    borderRadius: 6,
    shadow: false,
    style: {
      color: '#2A2C35',
      fontSize: '12px'
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.dashboard-main {
  flex: 1 1 0%;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--gray-0);
  transition: width 0.3s ease, margin-right 0.3s ease;
}

.dashboard-main--with-blade {
  width: calc(100% - 480px);
  flex: none;
}

/* Metric cards grid */
.metric-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .metric-cards-grid {
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }
}

/* Desktop: 2 columns */
@media (min-width: 1024px) {
  .metric-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

/* When blade is open, always stack vertically */
.metric-cards-grid--blade-open {
  grid-template-columns: 1fr !important;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.info-grid--blade-open {
  grid-template-columns: 1fr !important;
}

/* Blade backdrop for mobile/tablet */
.blade-backdrop {
  display: none;
}

/* Mobile: Blade overlays full screen */
@media (max-width: 768px) {
  .dashboard-main--with-blade {
    width: 100%;
  }
  
  .blade-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }
  
  :deep(.blade-wrapper) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    z-index: 1000;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
  }
}

/* Tablet: Blade overlays but narrower */
@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard-main--with-blade {
    width: 100%;
  }
  
  .blade-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }
  
  :deep(.blade-wrapper) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 480px;
    z-index: 1000;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
  }
}

/* Desktop side-by-side: narrower blade on mid-size screens */
@media (min-width: 1025px) and (max-width: 1440px) {
  .dashboard-main--with-blade {
    width: calc(100% - 400px);
    min-width: 0;
  }

  :deep(.blade-wrapper) {
    width: 400px;
  }

  .metric-cards-grid {
    grid-template-columns: 1fr !important;
  }
}

/* Large desktop: full-width blade */
@media (min-width: 1441px) {
  .dashboard-main--with-blade {
    width: calc(100% - 480px);
  }

  :deep(.blade-wrapper) {
    width: 480px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive adjustments for cards */
:deep(.pendo-card) {
  font-size: 14px;
}

@media (max-width: 640px) {
  :deep(.pendo-card__header) {
    padding: 12px 16px;
  }
  
  :deep(.pendo-card__body) {
    padding: 16px;
  }
}

/* Responsive chart adjustments */
:deep(.highcharts-container) {
  width: 100% !important;
}

@media (max-width: 640px) {
  :deep(.highcharts-axis-labels text) {
    font-size: 11px !important;
  }
  
  :deep(.highcharts-legend-item text) {
    font-size: 12px !important;
  }
}
</style>
