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

          <!-- Share split button -->
          <div class="inline-flex">
            <PendoButton 
              type="secondary" 
              label="Share" 
              style="border-top-right-radius: 0; border-bottom-right-radius: 0;" 
              @click="handleShareClick" 
            />
            <PendoButton type="secondary" icon="chevron-down" aria-label="Share options" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-left-width: 0;" />
          </div>

          <!-- Add to dashboard button -->
          <PendoButton class="hidden lg:inline-flex" type="primary" label="Add to dashboard" suffix-icon="chevron-down" aria-label="Add to dashboard" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <!-- AI Signals Card -->
      <div class="py-4 sm:py-6 pb-0 sm:pb-0">
        <div class="signals-card">
          <!-- Header -->
          <div class="signals-card-header">
            <div class="signals-card-title-group">
              <svg class="signals-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4.15" fill="#F1E7FC" fill-opacity="0.7" />
                <path d="M12 16.908L12.5728 13.8772C12.6338 13.5541 12.7915 13.2567 13.0241 13.0241C13.2567 12.7916 13.5541 12.6346 13.8772 12.5736L16.908 12.0008L13.8772 11.4272C13.554 11.3662 13.2567 11.2085 13.0241 10.9759C12.7915 10.7433 12.6338 10.446 12.5728 10.1228L12 7.092L11.4264 10.1228C11.3654 10.4459 11.2084 10.7433 10.9759 10.9759C10.7433 11.2085 10.4459 11.3662 10.1228 11.4272L7.092 12L10.1228 12.5736C10.4459 12.6346 10.7434 12.7916 10.9759 13.0241C11.2084 13.2566 11.3654 13.5541 11.4264 13.8772L12 16.908ZM12 18C11.7455 18 11.4984 17.911 11.3026 17.7484C11.1071 17.5859 10.9756 17.36 10.9288 17.1101L10.928 17.1109L10.3544 14.0801C10.3341 13.9724 10.2818 13.8733 10.2042 13.7958C10.1267 13.7182 10.0276 13.6659 9.91985 13.6456L6.8891 13.072C6.63947 13.0251 6.41398 12.8927 6.25163 12.6974C6.08902 12.5016 6 12.2545 6 12C6.00006 11.7456 6.08907 11.4992 6.25163 11.3034C6.41401 11.1079 6.63936 10.9749 6.8891 10.928L9.91985 10.3552C10.0275 10.3349 10.1267 10.2825 10.2042 10.205C10.2817 10.1275 10.334 10.0283 10.3544 9.92065L10.928 6.8891C10.975 6.63961 11.1073 6.41387 11.3026 6.25163C11.4984 6.08902 11.7455 6 12 6C12.2544 6.00006 12.5009 6.08914 12.6966 6.25163C12.892 6.41392 13.025 6.6395 13.072 6.8891L13.6448 9.92065C13.6652 10.0284 13.7175 10.1275 13.795 10.205C13.8725 10.2825 13.9716 10.3348 14.0794 10.3552L17.1109 10.928C17.3605 10.975 17.5861 11.108 17.7484 11.3034C17.9109 11.4991 17.9999 11.7456 18 12C18 12.2545 17.911 12.5016 17.7484 12.6974C17.5861 12.8927 17.3604 13.025 17.1109 13.072L14.0794 13.6456C13.9717 13.666 13.8725 13.7183 13.795 13.7958C13.7175 13.8733 13.6651 13.9725 13.6448 14.0801L13.072 17.1109C13.0253 17.361 12.8923 17.5858 12.6966 17.7484C12.5008 17.9109 12.2544 17.9999 12 18Z" fill="url(#sparkle-fill-gradient)" />
                <defs>
                  <linearGradient id="sparkle-fill-gradient" x1="18" y1="12" x2="6" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9440EE" />
                    <stop offset="1" stop-color="#5AB7CF" />
                  </linearGradient>
                </defs>
              </svg>
              <span class="signals-card-title">Dashboard signals</span>
            </div>
            <div class="signals-card-more">
              <PendoButton type="tertiary" icon="more-horizontal-filled" aria-label="More options" @click="toggleWidgetMenu" />
              <div v-if="showWidgetMenu" class="signals-card-menu">
                <PendoDropdownMenu width="211px">
                  <PendoDropdownOption icon="settings" label="Customize" @click="handleCustomize" />
                  <PendoDropdownOption icon="bell" label="Notification settings" @click="handleNotificationSettings" />
                </PendoDropdownMenu>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="signals-card-body">
            <!-- Default signals content -->
            <div v-if="!signalsCustomized" class="signals-rich-text">
              <p>
                All four tracked metrics moved in the right direction this week. Account retention climbed to <strong>61%</strong> (<strong class="signals-highlight-teal">+4pts</strong>), visitor adoption is up to <strong>52%</strong> (<strong class="signals-highlight-teal">+4pts</strong>), conversion rate rose to <strong>38%</strong> (<strong class="signals-highlight-teal">+4pts</strong>), and average time to complete dropped to <strong>3m 12s</strong> (<strong class="signals-highlight-teal">-18s</strong>).
              </p>
              <p>
                No areas of concern at the moment — steady improvements across the board. Worth watching whether these gains hold through the next reporting period.
              </p>
            </div>

            <!-- Customized signals content -->
            <div v-else class="signals-rich-text">
              <p>
                All tracked metrics improved this week — but new accounts from January are dropping off at a higher rate than any recent cohort, and it could affect next month's numbers.
              </p>
              <ul class="signals-metrics-list">
                <li>Account retention: <strong>61%</strong>&nbsp; <span class="signals-highlight-teal">+4pts</span></li>
                <li>Visitor adoption: <strong>52%</strong>&nbsp; <span class="signals-highlight-teal">+4pts</span></li>
                <li>Conversion rate: <strong>38%</strong>&nbsp; <span class="signals-highlight-teal">+4pts</span></li>
                <li>Time to complete: <strong>3m 12s</strong>&nbsp; <span class="signals-highlight-teal">-18s</span></li>
              </ul>
              <div class="signals-callout">
                <p class="signals-callout-title">⚠️ January cohort drop-off</p>
                <p>76% of January accounts have returned since onboarding — lower than prior cohorts at this point. If the pattern holds, expect a 2–3pt impact next month.</p>
                <p><strong>What to do:</strong> Review onboarding completion for this cohort.</p>
                <p class="signals-callout-link">→ <a href="#">View these accounts</a></p>
              </div>
            </div>

            <p v-if="signalsCustomized" class="signals-card-footer">
              <span class="signals-footer-text">Generated from</span>
              <span>&nbsp;</span>
              <a v-if="selectedWidgetCount > 0" class="signals-footer-link-teal" href="#" @click.prevent="openBladeToSection('widgets')">{{ selectedWidgetCount }} widget{{ selectedWidgetCount !== 1 ? 's' : '' }}</a>
              <span v-if="selectedWidgetCount > 0 && hasCustomContext">&nbsp;</span>
              <span v-if="selectedWidgetCount > 0 && hasCustomContext" class="signals-footer-text">and</span>
              <span v-if="selectedWidgetCount > 0 && hasCustomContext">&nbsp;</span>
              <a v-if="hasCustomContext" class="signals-footer-link-purple" href="#" @click.prevent="openBladeToSection('context')">your context</a>
              <span class="signals-footer-text">,</span>
              <span>&nbsp;</span>
              <span class="signals-footer-text">{{ customizedTimestamp }}</span>
            </p>
          </div>
        </div>
      </div>

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
      <div class="info-grid">
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

      <!-- Visitor adoption and Account retention cards -->
      <div class="metric-cards-grid">
        <!-- Visitor adoption card -->
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Visitor adoption</span>
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

        <!-- Account retention card -->
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Account retention</span>
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
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Conversion rate</span>
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

      <!-- Time to complete chart card -->
      <div class="mb-6">
        <PendoCard :bordered="true" :shadow="false" body-padding="0">
          <template #header>
            <div class="flex items-center w-full px-4">
              <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Time to complete</span>
            </div>
          </template>
          <div class="px-4 pt-4 pb-6">
            <div class="flex items-center gap-2 mb-6 flex-wrap">
              <PendoTag type="filter" label="Last 6 weeks" size="regular" />
              <PendoTag type="filter" label="Weekly" size="regular" />
              <PendoTag type="filter" label="[Module] Analytics | active paying custom..." size="regular" />
              <PendoTag type="filter" label="Pendo" size="regular" />
              <PendoTag type="filter" label="All Accounts" size="regular" />
            </div>
            <div class="time-to-complete-chart">
              <highcharts :options="conversionChartOptions" />
            </div>
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
              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  Trends has become my go-to for understanding what's happening across our product. The AI-generated insights save me hours of manual analysis each week.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Enterprise Account • February 1, 2026 · 10:15:42 AM EST
                </div>
              </div>

              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  Love the concept but I wish I could customize which metrics show up in my Trends view. Sometimes I'm drowning in data that isn't relevant to my role.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Mid-Market Account • January 31, 2026 · 2:33:18 PM EST
                </div>
              </div>

              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  The insights are helpful, but I find myself wanting more context. Would be great if clicking on a trend showed me session replays or specific user examples.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  Enterprise Account • January 30, 2026 · 9:45:55 AM EST
                </div>
              </div>

              <div class="border-t border-[var(--gray-30)] pt-4">
                <p class="text-[14px] text-[var(--gray-100)] mb-2">
                  This feature is a game changer for our weekly standups. We can quickly see what's trending without having to build custom reports.
                </p>
                <div class="text-[13px] text-[var(--gray-70)]">
                  SMB Account • January 29, 2026 · 4:22:11 PM EST
                </div>
              </div>

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
      v-if="showBlade"
      class="blade-backdrop"
      @click="showBlade = false"
    ></div>

    <!-- Blade Configuration -->
    <AgentBladeConfiguration
      v-if="showBlade"
      dashboard-name="Autonomous Insights"
      :mode="bladeMode"
      :focus-section="bladeFocusSection"
      :initial-data="lastSavedData"
      class="blade-responsive"
      @close="showBlade = false"
      @save="handleShareSave"
    />

    <!-- Subscribe Modal -->
    <SubscribeModal
      v-if="configurationType === 'Drawer configuration'"
      v-model:visible="showShareModal"
      dashboard-name="Autonomous Insights"
      @save="handleShareSave"
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
  PendoTag,
  PendoDropdownMenu,
  PendoDropdownOption
} from './pendo'
import SubscribeModal from './SubscribeModal.vue'
import AgentBladeConfiguration from './AgentBladeConfiguration.vue'

const props = defineProps({
  configurationType: {
    type: String,
    default: 'Drawer configuration'
  }
})

const route = useRoute()
const showShareModal = ref(false)
const showBlade = ref(false)
const showWidgetMenu = ref(false)
const bladeMode = ref('customize')
const bladeFocusSection = ref('')

const toggleWidgetMenu = () => {
  showWidgetMenu.value = !showWidgetMenu.value
}

const handleCustomize = () => {
  showWidgetMenu.value = false
  bladeMode.value = 'customize'
  bladeFocusSection.value = ''
  showBlade.value = true
}

const openBladeToSection = (section) => {
  bladeMode.value = 'customize'
  bladeFocusSection.value = section
  showBlade.value = true
}

const handleNotificationSettings = () => {
  showWidgetMenu.value = false
  bladeMode.value = 'notifications'
  showBlade.value = true
}

onMounted(() => {
  if (route.meta.openBlade && props.configurationType === 'Blade configuration') {
    showBlade.value = true
  }
})

watch(showBlade, (isOpen) => {
  if (window.innerWidth <= 1024) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

watch(() => props.configurationType, (newType) => {
  if (newType !== 'Drawer configuration') {
    showShareModal.value = false
  }
  if (newType !== 'Blade configuration') {
    showBlade.value = false
  }
})

const handleShareClick = () => {
  showShareModal.value = true
}

const signalsCustomized = ref(false)
const customizedTimestamp = ref('')
const selectedWidgetCount = ref(0)
const hasCustomContext = ref(false)
const lastSavedData = ref(null)

const handleShareSave = (data) => {
  const plain = JSON.parse(JSON.stringify(data))
  console.log('Share data:', plain)

  const widgetCount = plain.widgets?.filter(w => w.selected).length || 0
  const hasGoal = !!plain.context?.goal?.trim()
  const hasStakeholder = !!plain.context?.stakeholderQuestions?.trim()

  selectedWidgetCount.value = widgetCount
  hasCustomContext.value = hasGoal || hasStakeholder

  lastSavedData.value = {
    widgets: plain.widgets || [],
    context: {
      goal: plain.context?.goal || '',
      stakeholderQuestions: plain.context?.stakeholderQuestions || ''
    }
  }

  if (widgetCount > 0 || hasGoal || hasStakeholder) {
    signalsCustomized.value = true
    const now = new Date()
    customizedTimestamp.value = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  showBlade.value = false
}

const sharedChartConfig = {
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
            series.graph.attr({ 'stroke-linecap': 'round' })
          }
        })
      },
      redraw: function() {
        this.series.forEach(function(series) {
          if (series.graph) {
            series.graph.attr({ 'stroke-linecap': 'round' })
          }
        })
      }
    }
  },
  title: { text: null },
  credits: { enabled: false },
  xAxis: {
    categories: ['Jan 15', 'Jan 22', 'Jan 29', 'Feb 5'],
    lineColor: '#EAECF1',
    tickColor: '#EAECF1',
    labels: { style: { color: '#6A6C75', fontSize: '12px' } }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: { color: '#2A2C35', fontSize: '14px', fontWeight: '400' },
    itemHoverStyle: { color: '#2A2C35' },
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
          hover: { enabled: true, radius: 6, lineWidth: 2, lineColor: '#FFFFFF' }
        }
      }
    },
    series: {
      linecap: 'round',
      states: { hover: { lineWidthPlus: 0 } }
    }
  },
  tooltip: {
    shared: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE5',
    borderWidth: 1,
    borderRadius: 6,
    shadow: false,
    style: { color: '#2A2C35', fontSize: '12px' }
  }
}

const chartOptions = {
  ...sharedChartConfig,
  yAxis: {
    title: { text: 'Quantity', style: { color: '#6A6C75', fontSize: '12px' } },
    gridLineColor: '#EAECF1',
    labels: { style: { color: '#6A6C75', fontSize: '12px' } },
    min: 0,
    max: 11000
  },
  series: [
    { name: 'Visitors', data: [7500, 8800, 9400, 9856], color: '#128297', marker: { enabled: false } },
    { name: 'Accounts', data: [3200, 3600, 3800, 3892], color: '#DA1010', marker: { enabled: false } }
  ]
}

const conversionChartOptions = {
  ...sharedChartConfig,
  chart: {
    ...sharedChartConfig.chart,
    spacingBottom: 25
  },
  legend: {
    ...sharedChartConfig.legend,
    itemStyle: {
      ...sharedChartConfig.legend.itemStyle,
      textOverflow: 'none'
    },
    itemWidth: undefined
  },
  yAxis: {
    title: { text: 'Minutes', style: { color: '#6A6C75', fontSize: '12px' } },
    gridLineColor: '#EAECF1',
    labels: { style: { color: '#6A6C75', fontSize: '12px' } },
    min: 0,
    max: 8
  },
  series: [
    { name: 'Avg. time to complete', data: [5.2, 4.5, 3.8, 3.2], color: '#128297', marker: { enabled: false } },
    { name: 'Target', data: [3, 3, 3, 3], color: '#DA1010', dashStyle: 'Dash', marker: { enabled: false } }
  ],
  tooltip: {
    ...sharedChartConfig.tooltip,
    valueSuffix: ' min'
  }
}
</script>

<style scoped>
/* Signals Card */
.signals-card {
  border: 1px solid rgba(148, 64, 238, 0.06);
  border-radius: 6px;
  background: linear-gradient(229.089deg, rgb(255, 255, 255) 50.514%, rgba(241, 231, 252, 0.12) 94.799%);
  box-shadow: 0px 1.806px 18.06px 0px rgba(148, 64, 238, 0.06);
  overflow: hidden;
}

.signals-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(148, 64, 238, 0.06);
}

.signals-card-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.signals-card-icon {
  flex-shrink: 0;
}

.signals-card-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.35;
  color: var(--gray-100, #2a2c35);
}

.signals-card-more {
  position: relative;
  flex-shrink: 0;
}

.signals-card-more :deep(.pendo-button) {
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

.signals-card-more :deep(.pendo-button:hover) {
  background-color: rgba(0, 0, 0, 0.06);
}

.signals-card-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  margin-top: 4px;
}

/* Card Body */
.signals-card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.signals-rich-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--gray-100, #2a2c35);
}

.signals-rich-text p {
  margin: 0 0 10px;
}

.signals-rich-text p:last-child {
  margin-bottom: 0;
}

.signals-rich-text strong {
  font-weight: 600;
}

.signals-highlight-teal {
  color: #128297;
}

.signals-metrics-list {
  list-style: disc;
  padding-left: 20px;
  margin: 10px 0;
}

.signals-metrics-list li {
  margin-bottom: 2px;
  line-height: 1.65;
}

.signals-callout {
  margin-top: 12px;
  padding: 12px 14px;
  background: #fffbf0;
  border-left: 3px solid #f0ad4e;
  border-radius: 0 4px 4px 0;
}

.signals-callout p {
  margin: 0 0 6px;
}

.signals-callout p:last-child {
  margin-bottom: 0;
}

.signals-callout-title {
  font-weight: 600;
}

.signals-callout-link a {
  color: #128297;
  text-decoration: none;
}
.signals-callout-link a:hover {
  text-decoration: underline;
}


/* Footer metadata */
.signals-card-footer {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  font-style: italic;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
}

.signals-footer-text {
  color: var(--gray-100, #2a2c35);
}

.signals-footer-link-teal {
  font-weight: 600;
  color: #128297;
  text-decoration: none;
  cursor: pointer;
}

.signals-footer-link-teal:hover {
  text-decoration: underline;
}

.signals-footer-link-purple {
  font-weight: 600;
  color: #9440ee;
  text-decoration: none;
  cursor: pointer;
}

.signals-footer-link-purple:hover {
  text-decoration: underline;
}

.signals-customized-badge {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: #9440ee;
  background: rgba(148, 64, 238, 0.08);
  border: 1px solid rgba(148, 64, 238, 0.18);
  border-radius: 3px;
  padding: 2px 6px;
  vertical-align: middle;
}

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
  transition: width 0.3s ease;
}

.dashboard-main--with-blade .signals-card-body,
.dashboard-main--with-blade .signals-rich-text p {
  word-break: break-word;
}

.dashboard-main--with-blade .metric-cards-grid,
.dashboard-main--with-blade .info-grid {
  grid-template-columns: 1fr !important;
}

/* Metric cards grid */
.metric-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .metric-cards-grid {
    gap: 1.25rem;
    margin-bottom: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .metric-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
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

.blade-backdrop {
  display: none;
}

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

@media (min-width: 1025px) and (max-width: 1440px) {
  .dashboard-main--with-blade {
    width: calc(100% - 400px);
    min-width: 0;
  }

  :deep(.blade-wrapper) {
    width: 400px;
  }

  .dashboard-main--with-blade .metric-cards-grid,
  .dashboard-main--with-blade .info-grid {
    grid-template-columns: 1fr !important;
  }
}

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

:deep(.highcharts-container) {
  width: 100% !important;
}

.time-to-complete-chart :deep(.highcharts-container),
.time-to-complete-chart :deep(.highcharts-container svg) {
  overflow: visible !important;
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
