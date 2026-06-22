<template>
  <div class="option-e">
    <div class="dashboard-main" :class="{ 'dashboard-main--with-blade': bladeOpen }">
    <!-- Page header -->
    <div class="bg-white border-b border-[var(--gray-30)] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4 sm:pb-5">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex flex-col gap-2 min-w-0 flex-1" style="min-width: 200px;">
          <div class="flex items-center gap-3">
            <PendoButton
              type="secondary"
              icon="chart-no-axes-combined"
              :icon-stroke-width="1.5"
              aria-label="Dashboard options"
              style="background-color: rgba(187, 31, 82, 0.1); border-color: transparent; color: #BB1F52; width: 36px; min-width: 36px; flex-shrink: 0;"
            />
            <h1 class="text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.15] font-semibold text-[var(--gray-100)]" style="font-family: var(--font-family-headings);">
              AcmeTravel - Credit Card Feature Launch
            </h1>
          </div>
          <p class="text-[13px] sm:text-[14px] text-[var(--gray-70)] pl-[48px]">
            Tracking adoption, conversion, and user sentiment for the new credit card booking feature.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <PendoButton class="hidden sm:inline-flex" type="tertiary" icon="star" :icon-stroke-width="2.5" aria-label="Favorite" />
          <PendoButton type="secondary" icon="more-horizontal-filled" aria-label="More actions" />
          <PendoButton class="hidden md:inline-flex" type="secondary" prefix-icon="message-circle" label="0" aria-label="Comments" />

          <div class="inline-flex">
            <PendoButton
              type="secondary"
              prefix-icon="rss"
              label="Subscribe to updates"
              title="Get recurring Slack updates with the latest dashboard metrics."
              style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
              @click="bladeOpen = true"
            />
            <PendoButton type="secondary" icon="chevron-down" aria-label="Subscribe options" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-left-width: 0;" />
          </div>

          <PendoButton class="hidden lg:inline-flex" type="primary" label="Add to dashboard" suffix-icon="chevron-down" aria-label="Add to dashboard" />
        </div>
      </div>
    </div>

    <!-- Dashboard content -->
    <div class="dashboard-scroll">
      <div class="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <!-- Filter row -->
        <div class="py-4 sm:py-6">
          <div class="border border-[var(--gray-30)] rounded-[6px] bg-white px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div class="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto overflow-x-auto">
              <div class="inline-flex items-center gap-2 rounded-full border border-[var(--gray-40)] px-3 py-1 min-w-0 flex-shrink-0">
                <span class="text-[13px] sm:text-[14px] text-[var(--gray-100)] whitespace-nowrap">Segment is</span>
                <button type="button" class="inline-flex items-center gap-1 min-w-0 text-[var(--teal-90)] font-semibold text-[13px] sm:text-[14px]">
                  <span class="truncate">{{ dashboardSegmentLabel }}</span>
                  <PendoIcon type="chevron-down" :size="16" :stroke-width="2" />
                </button>
                <button type="button" class="ml-1 w-6 h-6 rounded-full border border-[var(--gray-40)] flex items-center justify-center text-[var(--gray-60)] hover:bg-[var(--gray-20)]" aria-label="Clear segment">
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
              How many visitors and accounts are using the credit card feature?
            </div>
          </div>
          <div class="h-px bg-[var(--gray-40)]" />
        </div>

        <!-- Feature background and The team -->
        <div class="info-grid">
          <div class="widget-anchor bg-white rounded-[6px] p-6" data-widget="Feature background">
            <h2 class="text-[18px] font-semibold text-[var(--gray-100)] mb-4">Feature background</h2>
            <p class="text-[14px] text-[var(--gray-70)] mb-4">Use this section to provide your team context on the feature.</p>
            <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)] mb-4">
              <li><span class="font-semibold">Who's the target user?</span> Frequent travelers and business accounts who book flights and hotels through AcmeTravel and want to earn rewards on every transaction.</li>
              <li><span class="font-semibold">What's their problem?</span> Users currently leave the platform to complete payment, losing out on loyalty rewards and creating friction in the booking flow.</li>
              <li><span class="font-semibold">What's the solution?</span> An integrated credit card feature that lets users pay directly within the booking flow, earn 3x points on travel purchases, and access exclusive member pricing.</li>
            </ul>
            <h3 class="text-[14px] font-semibold text-[var(--gray-100)] mb-2">Goal</h3>
            <p class="text-[14px] text-[var(--gray-100)] mb-4">Drive 30% of eligible accounts to activate the credit card feature and complete at least one booking with it within the first 60 days.</p>
            <h3 class="text-[14px] font-semibold text-[var(--gray-100)] mb-2">Important links</h3>
            <ul class="list-disc pl-5 text-[14px] text-[var(--gray-100)]">
              <li>Product requirements doc</li>
              <li>Design prototype in Figma</li>
              <li>User research findings</li>
              <li>Beta feedback summary</li>
            </ul>
          </div>

          <div class="widget-anchor bg-white rounded-[6px] p-6" data-widget="The team">
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

        <!-- Visitor adoption and Account retention -->
        <div class="metric-cards-grid">
          <div class="widget-anchor" data-widget="Visitor adoption">
          <PendoCard :bordered="true" :shadow="false" body-padding="0">
            <template #header>
              <div class="flex items-center w-full px-4">
                <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Visitor adoption</span>
              </div>
            </template>
            <div class="px-4 pt-4 pb-6 flex flex-col h-full">
              <div class="flex items-center gap-2 mb-6 flex-wrap">
                <PendoTag type="filter" label="Last 6 weeks" size="regular" />
                <PendoTag type="filter" label="[Module] Booking | active paying custom..." size="regular" />
                <PendoTag type="filter" label="AcmeTravel" size="regular" />
                <PendoTag type="filter" label="All Visitors" size="regular" />
                <PendoTag type="filter" label="Visitors" size="regular" />
              </div>
              <div class="metric-values-grid grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
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
          </div>

          <div class="widget-anchor" data-widget="Account retention">
          <PendoCard :bordered="true" :shadow="false" body-padding="0">
            <template #header>
              <div class="flex items-center w-full px-4">
                <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Account retention</span>
              </div>
            </template>
            <div class="px-4 pt-4 pb-6 flex flex-col h-full">
              <div class="flex items-center gap-2 mb-6 flex-wrap">
                <PendoTag type="filter" label="Last 6 weeks" size="regular" />
                <PendoTag type="filter" label="[Module] Booking | active paying custom..." size="regular" />
                <PendoTag type="filter" label="AcmeTravel" size="regular" />
                <PendoTag type="filter" label="All Accounts" size="regular" />
                <PendoTag type="filter" label="Accounts" size="regular" />
              </div>
              <div class="metric-values-grid grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 items-start">
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
        </div>

        <!-- Conversion rate chart -->
        <div class="mb-6 widget-anchor" data-widget="Conversion rate">
          <PendoCard :bordered="true" :shadow="false" body-padding="0">
            <template #header>
              <div class="flex items-center w-full px-4">
                <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">Conversion rate</span>
              </div>
            </template>
            <div class="px-4 pt-4 pb-6">
              <div class="flex items-center gap-2 mb-6 flex-wrap">
                <PendoTag type="filter" label="Last 6 weeks" size="regular" />
                <PendoTag type="filter" label="Weekly" size="regular" />
                <PendoTag type="filter" label="[Module] Booking | active paying custom..." size="regular" />
                <PendoTag type="filter" label="AcmeTravel" size="regular" />
                <PendoTag type="filter" label="All Accounts" size="regular" />
              </div>
              <highcharts :options="chartOptions" />
            </div>
          </PendoCard>
        </div>

        <!-- Time to complete chart -->
        <div class="mb-6 widget-anchor" data-widget="Time to complete">
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
                <PendoTag type="filter" label="[Module] Booking | active paying custom..." size="regular" />
                <PendoTag type="filter" label="AcmeTravel" size="regular" />
                <PendoTag type="filter" label="All Accounts" size="regular" />
              </div>
              <highcharts :options="conversionChartOptions" />
            </div>
          </PendoCard>
        </div>

        <!-- User feedback -->
        <div class="mb-6 widget-anchor" data-widget="User feedback">
          <PendoCard :bordered="true" :shadow="false" body-padding="0">
            <template #header>
              <div class="flex items-center justify-between w-full px-4">
                <span class="text-[18px] font-normal leading-[1.35] text-[var(--gray-100)]">User feedback | Credit card feature</span>
              </div>
            </template>
            <div class="px-4 pt-4 pb-6">
              <div class="flex items-center gap-2 mb-4 flex-wrap">
                <PendoTag type="filter" label="Last 6 weeks" size="regular" />
                <PendoTag type="filter" label="[Module] Booking | active paying custom..." size="regular" />
                <PendoTag type="filter" label="AcmeTravel" size="regular" />
                <PendoTag type="filter" label="All Accounts" size="regular" />
              </div>
              <div class="mb-4">
                <h3 class="text-[16px] font-semibold text-[var(--gray-100)] mb-2">How has the credit card feature affected your booking experience?</h3>
                <div class="text-[14px] text-[var(--gray-70)]">
                  <span class="font-semibold">52 responses</span> ·
                  <span>68 visitors seen</span> ·
                  <span class="font-semibold">41 unique responses</span> ·
                  <span>76% response rate</span>
                </div>
              </div>
              <div class="space-y-4">
                <div class="border-t border-[var(--gray-30)] pt-4">
                  <p class="text-[14px] text-[var(--gray-100)] mb-2">Being able to pay and earn points without leaving the booking flow is a game changer. I've already racked up enough for a free hotel night in just three weeks.</p>
                  <div class="text-[13px] text-[var(--gray-70)]">Enterprise Account · February 1, 2026 · 10:15:42 AM EST</div>
                </div>
                <div class="border-t border-[var(--gray-30)] pt-4">
                  <p class="text-[14px] text-[var(--gray-100)] mb-2">The 3x points on travel are great, but I wish I could see my rewards balance right on the booking confirmation page instead of navigating to a separate section.</p>
                  <div class="text-[13px] text-[var(--gray-70)]">Mid-Market Account · January 31, 2026 · 2:33:18 PM EST</div>
                </div>
                <div class="border-t border-[var(--gray-30)] pt-4">
                  <p class="text-[14px] text-[var(--gray-100)] mb-2">Checkout is definitely faster now, but a few of our team members were confused about the card activation step. Would be helpful to have a short in-app walkthrough.</p>
                  <div class="text-[13px] text-[var(--gray-70)]">Enterprise Account · January 30, 2026 · 9:45:55 AM EST</div>
                </div>
              </div>
            </div>
          </PendoCard>
        </div>
      </div>
    </div>

    </div>
    <!-- End dashboard-main -->

    <!-- Blade panel (sibling to dashboard-main) -->
    <Transition name="blade-slide">
      <div v-if="bladeOpen" class="blade-panel">
          <!-- Blade masthead -->
          <div class="blade-masthead">
            <span class="blade-masthead__title">Your dashboard signals</span>
            <button type="button" class="blade-close-btn" @click="closeBlade">
              <PendoIcon type="x" :size="16" />
            </button>
          </div>

          <!-- ═══ LIST VIEW ═══ -->
          <template v-if="view === 'list'">
            <div class="blade-body">
              <div class="blade-content">
                <div class="blade-description">
                  <h2 class="blade-description__heading">Manage digests for this dashboard</h2>
                  <p class="blade-description__text">
                    Get updates on your dashboard based on the data you've selected, delivered on a schedule that works for your team.
                  </p>
                </div>

                <!-- Empty state -->
                <div v-if="subscriptions.length === 0" class="digest-empty">
                  <PendoButton type="tertiary" prefix-icon="plus" label="Create new digest" @click="startCreate" />
                </div>

                <!-- Digest cards -->
                <div v-else class="digest-list">
                  <div
                    v-for="sub in subscriptions"
                    :key="sub.id"
                    class="digest-card"
                    @click="startEdit(sub)"
                  >
                    <div class="digest-card__info">
                      <div class="digest-card__header">
                        <span class="digest-card__name">{{ sub.name || 'Untitled digest' }}</span>
                        <PendoIconButton
                          icon="more-horizontal-filled"
                          icon-size="16"
                          tooltip="Options"
                          @click.stop="toggleMenu(sub.id)"
                        />
                        <div v-if="openMenuId === sub.id" class="digest-card__menu">
                          <div class="digest-card__menu-item" @click.stop="startEdit(sub); openMenuId = null">
                            <PendoIcon type="edit" :size="14" />
                            <span>Edit</span>
                          </div>
                          <div class="digest-card__menu-item" @click.stop="handleDuplicate(sub)">
                            <PendoIcon type="copy" :size="14" />
                            <span>Duplicate</span>
                          </div>
                          <div class="digest-card__menu-item digest-card__menu-item--danger" @click.stop="deleteSub(sub.id)">
                            <PendoIcon type="trash" :size="14" />
                            <span>Delete</span>
                          </div>
                        </div>
                      </div>
                      <span class="digest-card__schedule">{{ formatScheduleSummary(sub) }}</span>
                    </div>
                    <div class="digest-card__status">
                      <span class="digest-card__dot" :class="sub.status === 'active' ? 'digest-card__dot--active' : 'digest-card__dot--disabled'" />
                      <span class="digest-card__status-label">{{ sub.status === 'active' ? 'Active' : 'Inactive' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="subscriptions.length > 0" class="blade-footer">
              <PendoButton type="secondary" label="Cancel" @click="closeBlade" />
              <PendoButton type="primary" prefix-icon="plus" label="New digest" @click="startCreate" />
            </div>
          </template>

          <!-- ═══ CONFIRMATION VIEW ═══ -->
          <template v-else-if="view === 'confirmation'">
            <div class="blade-body blade-body--centered">
              <div class="confirmation">
                <div class="confirmation__icon">
                  <PendoIcon type="check-circle" :size="40" />
                </div>
                <h3 class="confirmation__title">You're subscribed!</h3>
                <p class="confirmation__subtitle">
                  Your first digest arrives <strong>{{ nextDeliveryLabel }}</strong>.
                </p>
                <p class="confirmation__details">
                  <strong>{{ getDetailLabel(form.detailLevel) }}</strong> digest
                  to <strong>{{ form.destination }}</strong>
                  <template v-if="form.channels.length"> ({{ form.channels.join(', ') }})</template>
                  — {{ form.selectedWidgets.length }} widgets,
                  <strong>{{ getSegmentLabel(form.segment) }}</strong> segment.
                </p>

                <div class="confirmation__actions">
                  <PendoButton
                    type="secondary"
                    prefix-icon="settings"
                    label="Customize output"
                    @click="openPreferences"
                  />
                  <PendoButton type="primary" label="Done" @click="view = 'list'" />
                </div>

              </div>
            </div>
          </template>

          <!-- ═══ PREFERENCES VIEW (Schedule / Customize tabs) ═══ -->
          <template v-else-if="view === 'preferences'">
            <div :class="['blade-digest-name', { 'blade-digest-name--with-subheader': isNewDigest }]">
              {{ isNewDigest ? 'Create new digest' : form.name }}
            </div>
            <div v-if="isNewDigest" class="blade-digest-subheader">
              <p class="blade-digest-subheader__line">
                Get recurring updates with the latest dashboard metrics.
              </p>
            </div>
            <div v-if="!props.fullScrollPreferences" class="blade-tabs">
              <button
                :class="['blade-tab', { 'blade-tab--active': prefsTab === 'delivery' }]"
                @click="prefsTab = 'delivery'"
              >
                Schedule
              </button>
              <button
                :class="['blade-tab', { 'blade-tab--active': prefsTab === 'content' }]"
                @click="prefsTab = 'content'"
              >
                Customize
              </button>
            </div>

            <div class="blade-body blade-body--form">
              <div class="form-fields">
                <!-- Delivery tab (matches subscribe/create-new layout) -->
                <template v-if="showDeliverySection">
                  <h4 v-if="props.fullScrollPreferences" class="full-scroll-section-title">Schedule</h4>
                  <div class="field">
                    <h5 class="field__label field__label--required">Frequency</h5>
                    <div class="freq-group">
                      <button
                        v-for="f in FREQUENCIES"
                        :key="f.value"
                        type="button"
                        :class="['freq-btn', { 'freq-btn--active': form.frequency === f.value }]"
                        @click="form.frequency = f.value"
                      >
                        {{ f.label }}
                      </button>
                    </div>
                    <div class="schedule-row">
                      <div v-if="form.frequency === 'Weekly' || form.frequency === 'Bi-weekly'" class="schedule-field">
                        <label class="schedule-field__label">Day</label>
                        <PendoSelect v-model="form.day" :options="DAYS" />
                      </div>
                      <div class="schedule-field">
                        <label class="schedule-field__label">Time</label>
                        <PendoSelect v-model="form.time" :options="TIMES" />
                      </div>
                      <div class="schedule-field">
                        <label class="schedule-field__label">Time zone</label>
                        <PendoSelect v-model="form.timezone" :options="TIMEZONES" />
                      </div>
                    </div>
                  </div>

                  <div class="field">
                    <h5 class="field__label field__label--required">Name your digest</h5>
                    <PendoInput v-model="form.name" required />
                    <p class="field__hint">This name appears at the top of each update.</p>
                  </div>

                  <div class="field">
                    <h5 class="field__label field__label--required">Send updates to</h5>
                    <PendoSelect v-model="form.destination" :options="DESTINATIONS" required />
                  </div>

                  <div class="field">
                    <h5 class="field__label field__label--required">Channels</h5>
                    <div class="channel-wrapper">
                      <div
                        class="channel-select"
                        tabindex="0"
                        aria-required="true"
                        @click="showChMenuPrefs = !showChMenuPrefs"
                      >
                        <div v-if="form.channels.length > 0" class="channel-tags">
                          <div v-for="(ch, i) in form.channels" :key="ch" class="channel-tag">
                            <span class="channel-tag__text">{{ ch }}</span>
                            <button type="button" class="channel-tag__close" @click.stop="form.channels.splice(i, 1)">
                              <PendoIcon type="x" :size="12" :stroke-width="2" />
                            </button>
                          </div>
                        </div>
                        <span v-else class="channel-select__placeholder">Click to add channels...</span>
                        <div class="channel-select__chevron" :class="{ 'channel-select__chevron--open': showChMenuPrefs }">
                          <PendoIcon type="chevron-down" :size="16" />
                        </div>
                      </div>
                      <Transition name="dropdown-fade">
                        <div v-if="showChMenuPrefs" class="channel-dropdown">
                          <div
                            v-for="ch in CHANNELS"
                            :key="ch"
                            class="channel-dropdown__item"
                            @click.stop="toggleChannel(ch)"
                          >
                            <span>{{ ch }}</span>
                            <PendoIcon v-if="form.channels.includes(ch)" type="check" :size="16" />
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </template>

                <div v-if="props.fullScrollPreferences" class="full-scroll-divider" />

                <!-- Content tab -->
                <template v-if="showContentSection">
                  <h4 v-if="props.fullScrollPreferences" class="full-scroll-section-title">Customize</h4>
                  <!-- Describe your goal -->
                  <div class="field">
                    <h5 class="field__label">Describe your goal</h5>
                    <textarea
                      v-model="form.goalDescription"
                      class="goal-textarea"
                      placeholder="What do you want this digest to focus on? What do your stakeholders need to know?"
                    />
                  </div>

                  <!-- Manage widgets -->
                  <div class="field">
                    <h5 class="field__label">Manage widgets</h5>
                    <p class="field__helper">Select widgets to include in your digest. Only Data Explorer widgets are supported.</p>
                    <div class="widget-tag-wrapper">
                      <div
                        class="widget-tag-select"
                        tabindex="0"
                        @click="showWidgetMenu = !showWidgetMenu"
                      >
                        <div v-if="form.selectedWidgets.length > 0" class="widget-tags">
                          <div v-for="w in visibleWidgets" :key="w.id" class="widget-tag">
                            <span class="widget-tag__text">{{ w.name }}</span>
                            <button type="button" class="widget-tag__close" @click.stop="toggleWidget(w.id)">
                              <PendoIcon type="x" :size="12" :stroke-width="2" />
                            </button>
                          </div>
                          <div v-if="overflowCount > 0" class="widget-tag widget-tag--overflow">
                            <span class="widget-tag__text">+{{ overflowCount }}</span>
                          </div>
                        </div>
                        <span v-else class="widget-tag-select__placeholder">Select widgets</span>
                        <div class="widget-select__chevron" :class="{ 'widget-select__chevron--open': showWidgetMenu }">
                          <PendoIcon type="chevron-down" :size="16" />
                        </div>
                      </div>
                      <Transition name="dropdown-fade">
                        <div v-if="showWidgetMenu" class="channel-dropdown">
                          <div class="widget-dropdown-actions">
                            <button type="button" class="widget-dropdown-action" @click.stop="selectAllWidgets">Select all</button>
                            <span class="widget-dropdown-divider">|</span>
                            <button type="button" class="widget-dropdown-action" @click.stop="deselectAllWidgets">Deselect all</button>
                          </div>
                          <div
                            v-for="w in WIDGETS"
                            :key="w.id"
                            class="channel-dropdown__item"
                            @click.stop="toggleWidget(w.id, true)"
                          >
                            <span>{{ w.name }}</span>
                            <PendoIcon v-if="form.selectedWidgets.includes(w.id)" type="check" :size="16" />
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>

                  <!-- Select filters -->
                  <div class="field">
                    <h5 class="field__label">Select filters</h5>
                    <p class="field__helper">Choose global filters for this digest. Since users have different filter settings, specify which view to show.</p>
                    <div class="filter-pills">
                      <div v-if="form.segment !== null" class="filter-pill">
                        <button type="button" class="filter-pill__remove" @click="form.segment = null">
                          <PendoIcon type="x" :size="12" />
                        </button>
                        <span class="filter-pill__label">Segment</span>
                        <div class="filter-pill__value-wrap" @click="showSegmentMenu = !showSegmentMenu">
                          <span class="filter-pill__value">{{ segmentDisplayLabel }}</span>
                          <PendoIcon type="chevron-down" :size="12" />
                        </div>
                        <Transition name="dropdown-fade">
                          <div v-if="showSegmentMenu" class="filter-pill__dropdown">
                            <div
                              v-for="seg in SEGMENTS"
                              :key="seg.value"
                              class="filter-pill__dropdown-item"
                              @click.stop="form.segment = seg.value; showSegmentMenu = false"
                            >
                              <span>{{ seg.label }}</span>
                              <PendoIcon v-if="form.segment === seg.value" type="check" :size="16" />
                            </div>
                          </div>
                        </Transition>
                      </div>

                    <button v-if="form.segment === null" type="button" class="filter-add-btn" @click="form.segment = dashboardSegment">
                        <PendoIcon type="plus" :size="14" />
                        <span>Add filter</span>
                      </button>
                    </div>
                  </div>

                  <!-- Select detail -->
                  <div class="field">
                    <h5 class="field__label">Select detail</h5>
                    <p class="field__helper">Control the depth of analysis for your digest.</p>
                    <PendoSelect v-model="form.detailLevel" :options="DETAIL_LEVELS" />
                  </div>
                </template>
              </div>
            </div>

            <div class="blade-footer">
              <PendoButton type="secondary" label="Back" @click="view = 'list'" />
              <PendoButton
                v-if="isNewDigest"
                type="primary"
                label="Subscribe"
                :loading="isSubscribing"
                :disabled="!isScheduleComplete || isSubscribing"
                @click="handleSubscribe"
              />
              <PendoButton
                v-else
                type="primary"
                label="Save preferences"
                @click="savePreferences"
              />
            </div>
          </template>
        </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Chart as highcharts } from 'highcharts-vue'
import { PendoButton, PendoCard, PendoIcon, PendoIconButton, PendoInput, PendoSelect, PendoTag } from '../pendo'
import {
  SEGMENTS, DETAIL_LEVELS, WIDGETS, FREQUENCIES, DAYS, TIMES, TIMEZONES, DESTINATIONS, CHANNELS,
  createMockSubscriptions, createBlankSubscription, formatScheduleSummary, getSegmentLabel, getDetailLabel
} from './shared'

const props = defineProps({
  fullScrollPreferences: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const sharedChartConfig = {
  chart: {
    type: 'line',
    height: 400,
    backgroundColor: 'transparent',
    style: { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' },
    events: {
      load () { this.series.forEach(s => { if (s.graph) s.graph.attr({ 'stroke-linecap': 'round' }) }) },
      redraw () { this.series.forEach(s => { if (s.graph) s.graph.attr({ 'stroke-linecap': 'round' }) }) }
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
    symbolWidth: 0, symbolHeight: 0, symbolPadding: 0,
    useHTML: true,
    labelFormatter () {
      const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${this.color};margin-right:8px;vertical-align:middle;"></span>`
      return `${dot}<span style="vertical-align:middle;">${this.name}</span>`
    }
  },
  plotOptions: {
    line: {
      lineWidth: 2,
      marker: { enabled: false, symbol: 'circle', radius: 5, lineWidth: 2, lineColor: '#FFFFFF', states: { hover: { enabled: true, radius: 6, lineWidth: 2, lineColor: '#FFFFFF' } } }
    },
    series: { linecap: 'round', states: { hover: { lineWidthPlus: 0 } } }
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
    min: 0, max: 11000
  },
  series: [
    { name: 'Visitors', data: [7500, 8800, 9400, 9856], color: '#128297', marker: { enabled: false } },
    { name: 'Accounts', data: [3200, 3600, 3800, 3892], color: '#DA1010', marker: { enabled: false } }
  ]
}

const conversionChartOptions = {
  ...sharedChartConfig,
  chart: { ...sharedChartConfig.chart, spacingBottom: 25 },
  legend: { ...sharedChartConfig.legend, itemStyle: { ...sharedChartConfig.legend.itemStyle, textOverflow: 'none' }, itemWidth: undefined },
  yAxis: {
    title: { text: 'Minutes', style: { color: '#6A6C75', fontSize: '12px' } },
    gridLineColor: '#EAECF1',
    labels: { style: { color: '#6A6C75', fontSize: '12px' } },
    min: 0, max: 8
  },
  series: [
    { name: 'Avg. time to complete', data: [5.2, 4.5, 3.8, 3.2], color: '#128297', marker: { enabled: false } },
    { name: 'Target', data: [3, 3, 3, 3], color: '#DA1010', dashStyle: 'Dash', marker: { enabled: false } }
  ],
  tooltip: { ...sharedChartConfig.tooltip, valueSuffix: ' min' }
}

const WEBHOOK_URL = 'https://pendoio.app.n8n.cloud/webhook/de76148d-95ee-42cb-b61e-7ab44b020f44'
const STORAGE_KEY = 'pndm-demo-digests'

function saveDigestsToStorage () {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions))
  } catch (e) {
    console.warn('Failed to save digests to localStorage:', e)
  }
}

function loadDigestsFromStorage () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load digests from localStorage:', e)
    return null
  }
}

function buildDigestUrl (sub) {
  const config = btoa(JSON.stringify(sub))
  return `${window.location.origin}/pndm-demo?digest=${sub.id}&config=${encodeURIComponent(config)}`
}

const lastDigestUrl = ref('')

const bladeOpen = ref(false)
const view = ref('list')
const prefsTab = ref('delivery')
const showChMenu = ref(false)
const showChMenuPrefs = ref(false)
const showWidgetMenu = ref(false)
const showSegmentMenu = ref(false)
const isSubscribing = ref(false)

function closeAllDropdowns () {
  showChMenu.value = false
  showChMenuPrefs.value = false
  showWidgetMenu.value = false
  showSegmentMenu.value = false
}

function handleClickOutside (e) {
  const el = e.target
  if (
    !el.closest('.channel-wrapper') &&
    !el.closest('.widget-tag-wrapper') &&
    !el.closest('.filter-pill') &&
    !el.closest('.channel-dropdown') &&
    !el.closest('.filter-pill__dropdown')
  ) {
    closeAllDropdowns()
  }
}

function openDigestFromQuery () {
  const digestId = route.query.digest
  if (!digestId) return

  let targetSub

  if (digestId === 'latest') {
    targetSub = [...subscriptions].sort((a, b) => (b.lastModifiedAt || 0) - (a.lastModifiedAt || 0))[0]
  } else {
    targetSub = subscriptions.find(s => s.id === digestId)
  }

  if (!targetSub && digestId !== 'latest' && route.query.config) {
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(route.query.config)))
      decoded.lastModifiedAt = Date.now()
      subscriptions.push(decoded)
      saveDigestsToStorage()
      targetSub = decoded
    } catch (e) {
      console.warn('Failed to decode digest config from URL:', e)
    }
  }

  if (targetSub) {
    Object.assign(form, JSON.parse(JSON.stringify(targetSub)))
    if (!form.goalDescription) form.goalDescription = ''
    editingId.value = targetSub.id
    prefsTab.value = 'delivery'
    bladeOpen.value = true
    view.value = 'preferences'
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  const stored = loadDigestsFromStorage()
  if (stored && stored.length > 0) {
    const now = Date.now()
    let dirty = false
    stored.forEach((item, i) => {
      if (!item.lastModifiedAt) {
        item.lastModifiedAt = now - (stored.length - i) * 60000
        dirty = true
      }
    })
    subscriptions.push(...stored)
    if (dirty) saveDigestsToStorage()
  } else {
    const mocks = createMockSubscriptions()
    const now = Date.now()
    mocks.forEach((m, i) => { m.lastModifiedAt = now - (mocks.length - i) * 60000 })
    subscriptions.push(...mocks)
    saveDigestsToStorage()
  }

  openDigestFromQuery()
})

watch(() => route.query.digest, (newVal) => {
  if (newVal) openDigestFromQuery()
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
const editingId = ref(null)
const openMenuId = ref(null)
const subscriptions = reactive([])

const DASHBOARD_NAME = 'AcmeTravel - Credit Card Feature Launch'
const dashboardSegment = ref('enterprise')
const dashboardSegmentLabel = computed(() => getSegmentLabel(dashboardSegment.value))

const form = reactive({
  ...createBlankSubscription(),
  name: DASHBOARD_NAME,
  segment: dashboardSegment.value,
  goalDescription: ''
})

const availableChannels = computed(() =>
  CHANNELS.filter(ch => !form.channels.includes(ch))
)

const nextDeliveryLabel = computed(() => {
  if (form.frequency === 'Weekly') return `${form.day} at ${form.time} ${form.timezone}`
  if (form.frequency === 'Bi-weekly') return `${form.day} at ${form.time} ${form.timezone}`
  return `the 1st of next month at ${form.time} ${form.timezone}`
})

const isScheduleComplete = computed(() => {
  return form.frequency && form.time && form.timezone && form.name.trim() && form.destination && form.channels.length > 0
})

const isNewDigest = computed(() => editingId.value === null)
const showDeliverySection = computed(() => props.fullScrollPreferences || prefsTab.value === 'delivery')
const showContentSection = computed(() => props.fullScrollPreferences || prefsTab.value === 'content')

const MAX_VISIBLE_TAGS = 2

const visibleWidgets = computed(() => {
  return form.selectedWidgets
    .slice(0, MAX_VISIBLE_TAGS)
    .map(id => WIDGETS.find(w => w.id === id))
    .filter(Boolean)
})

const overflowCount = computed(() => {
  return Math.max(0, form.selectedWidgets.length - MAX_VISIBLE_TAGS)
})

const segmentDisplayLabel = computed(() => {
  if (form.segment === null) return ''
  return SEGMENTS.find(s => s.value === form.segment)?.label ?? form.segment
})

function selectAllWidgets () {
  form.selectedWidgets = WIDGETS.map(w => w.id)
}

function deselectAllWidgets () {
  form.selectedWidgets = []
}

function toggleMenu (id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function handleDuplicate (sub) {
  openMenuId.value = null
  const clone = {
    ...JSON.parse(JSON.stringify(sub)),
    id: `sub-${Date.now()}`,
    name: `${sub.name} (copy)`,
    lastModifiedAt: Date.now()
  }
  subscriptions.push(clone)
  saveDigestsToStorage()
}

function closeBlade () {
  bladeOpen.value = false
  view.value = 'list'
}

function startCreate () {
  Object.assign(form, {
    ...createBlankSubscription(),
    name: DASHBOARD_NAME,
    goalDescription: '',
    selectedWidgets: WIDGETS.map(w => w.id),
    segment: dashboardSegment.value
  })
  editingId.value = null
  prefsTab.value = 'delivery'
  showChMenuPrefs.value = false
  view.value = 'preferences'
}

function startEdit (sub) {
  openMenuId.value = null
  Object.assign(form, JSON.parse(JSON.stringify(sub)))
  if (!form.goalDescription) form.goalDescription = ''
  editingId.value = sub.id
  prefsTab.value = 'delivery'
  showChMenuPrefs.value = false
  view.value = 'preferences'
}

function toggleChannel (ch) {
  const idx = form.channels.indexOf(ch)
  if (idx > -1) form.channels.splice(idx, 1)
  else form.channels.push(ch)
}

async function handleSubscribe () {
  if (isSubscribing.value) return

  const newSub = JSON.parse(JSON.stringify(form))
  newSub.lastModifiedAt = Date.now()

  const digestUrl = buildDigestUrl(newSub)
  const latestUrl = `${window.location.origin}/pndm-demo?digest=latest`

  isSubscribing.value = true
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Tiffany Kitchen',
        dashboardName: DASHBOARD_NAME,
        dashboardUrl: `${window.location.origin}/pndm-demo`,
        digestSettingsUrl: digestUrl,
        digestLatestUrl: latestUrl,
        prototypeUrl: window.location.origin,
        settingsUrl: `${window.location.origin}/settings`,
        name: form.name,
        frequency: form.frequency,
        day: form.day,
        time: form.time,
        timezone: form.timezone
      })
    })
    if (!response.ok) throw new Error(`Webhook failed: ${response.status}`)
    console.log('Webhook sent successfully')
  } catch (err) {
    console.error('Webhook error:', err)
  } finally {
    isSubscribing.value = false
  }

  subscriptions.push(newSub)
  editingId.value = newSub.id
  saveDigestsToStorage()
  lastDigestUrl.value = digestUrl
  view.value = 'confirmation'
}

function openPreferences () {
  prefsTab.value = 'content'
  showChMenuPrefs.value = false
  view.value = 'preferences'
}

function scrollToAndHighlightWidget (widgetName) {
  nextTick(() => {
    const safeName = window.CSS?.escape ? window.CSS.escape(widgetName) : widgetName.replaceAll('"', '\\"')
    const el = document.querySelector(`.widget-anchor[data-widget="${safeName}"]`)
    if (!el) return

    const scrollContainer = el.closest('.dashboard-scroll')
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const offset = elRect.top - containerRect.top + scrollContainer.scrollTop - 80
      scrollContainer.scrollTo({ top: offset, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    el.classList.remove('widget-highlight')
    void el.offsetWidth
    el.classList.add('widget-highlight')
    el.addEventListener('animationend', () => el.classList.remove('widget-highlight'), { once: true })
  })
}

function toggleWidget (id, focusWidget = false) {
  const idx = form.selectedWidgets.indexOf(id)
  const isSelected = idx === -1
  if (!isSelected) form.selectedWidgets.splice(idx, 1)
  else form.selectedWidgets.push(id)

  if (focusWidget && isSelected) {
    const widget = WIDGETS.find(w => w.id === id)
    if (widget) scrollToAndHighlightWidget(widget.name)
  }
}

function savePreferences () {
  if (editingId.value) {
    const idx = subscriptions.findIndex(s => s.id === editingId.value)
    if (idx > -1) {
      Object.assign(subscriptions[idx], JSON.parse(JSON.stringify(form)), { lastModifiedAt: Date.now() })
      saveDigestsToStorage()
      lastDigestUrl.value = buildDigestUrl(subscriptions[idx])
    }
  }
  view.value = 'list'
}

function deleteSub (id) {
  openMenuId.value = null
  const idx = subscriptions.findIndex(s => s.id === id)
  if (idx > -1) {
    subscriptions.splice(idx, 1)
    saveDigestsToStorage()
  }
}
</script>

<style scoped>
/* ── Page layout ── */
.option-e {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.dashboard-main {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--gray-0);
}

.dashboard-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.dashboard-main--with-blade .metric-cards-grid,
.dashboard-main--with-blade .info-grid {
  grid-template-columns: 1fr;
}

.dashboard-main--with-blade .metric-values-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

@media (min-width: 1025px) and (max-width: 1440px) {
  .dashboard-main--with-blade .metric-cards-grid,
  .dashboard-main--with-blade .info-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════
   BLADE SHELL (side panel, no overlay)
   ═══════════════════════════════════════ */
.blade-panel {
  width: 500px;
  flex-shrink: 0;
  background: white;
  border-left: 1px solid var(--gray-40, #dadce5);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blade-slide-enter-active, .blade-slide-leave-active { transition: none; }
.blade-slide-enter-from, .blade-slide-leave-to { }

/* ── Digest name header ── */
.blade-digest-name {
  padding: 24px 24px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--gray-100, #2a2c35);
  flex-shrink: 0;
}

.blade-digest-name--with-subheader {
  padding-bottom: 8px;
}

.blade-digest-subheader {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 24px 16px;
}

.blade-digest-subheader__line {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-80, #4a4c55);
}

.full-scroll-divider {
  width: 100%;
  border-top: 1px solid var(--gray-30, #eaecf1);
}

/* ── Masthead ── */
.blade-masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 16px 24px;
  border-bottom: 1px solid var(--gray-40, #dadce5);
  flex-shrink: 0;
}

.blade-masthead__title {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-90, #3a3c45);
}

.blade-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--gray-80, #4a4c55);
}
.blade-close-btn:hover { background: var(--gray-20, #f0f1f4); }

/* ── Blade body ── */
.blade-body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 24px;
}

.blade-body--form { padding-top: 0; }
.blade-body--centered { display: flex; justify-content: center; align-items: center; padding-top: 0; padding-bottom: 64px; box-sizing: border-box; }

/* ── Blade footer ── */
.blade-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px 16px 24px;
  border-top: 1px solid var(--gray-40, #dadce5);
  flex-shrink: 0;
}

.blade-footer :deep(.pendo-button) { flex: 1; }

/* ═══════════════════════════════════════
   LIST VIEW (matches M3)
   ═══════════════════════════════════════ */
.blade-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px;
  min-height: 100%;
}

.blade-description { display: flex; flex-direction: column; gap: 8px; }

.blade-description__heading {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.blade-description__text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  margin: 0;
}

.digest-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px dashed var(--gray-30, #eaecf1);
  border-radius: 3px;
  height: 105px;
  box-sizing: border-box;
}

.digest-list { display: flex; flex-direction: column; gap: 16px; }

.digest-card {
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.digest-card:hover { border-color: var(--gray-50, #babcc5); background: var(--gray-10, #f5f6f8); }

.digest-card__info { display: flex; flex-direction: column; gap: 4px; }
.digest-card__header { display: flex; align-items: center; justify-content: space-between; position: relative; }

.digest-card__name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--gray-100, #2a2c35);
}

.digest-card__schedule {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
}

.digest-card__status { display: flex; align-items: center; gap: 8px; }

.digest-card__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.digest-card__dot--active { background-color: var(--green-90, #008648); }
.digest-card__dot--disabled { background-color: var(--gray-50, #babcc5); }

.digest-card__status-label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
}

.digest-card__menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 160px;
  z-index: 10;
  overflow: hidden;
}

.digest-card__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
  transition: background 0.1s;
}
.digest-card__menu-item:hover { background: var(--gray-10, #f5f6f8); }
.digest-card__menu-item--danger { color: #db2547; }

/* ═══════════════════════════════════════
   FORM FIELDS
   ═══════════════════════════════════════ */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.form-fields--no-top { padding-top: 0; }

.field { display: flex; flex-direction: column; gap: 4px; }

.field__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.field__label--required::after {
  content: ' *';
  color: #db2547;
}

.field__helper {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.field__hint {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-60, #9a9ca5);
  margin: 4px 0 0;
}

.field-desc {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--gray-50, #9a9da5);
  margin: 0;
  line-height: 1.4;
}

.field :deep(.pendo-select) { width: 100% !important; display: block !important; min-width: 0 !important; }
.field :deep(.pendo-select__trigger) { width: 100% !important; min-width: 0 !important; }

/* ── Frequency ── */
.freq-group { display: flex; height: 36px; width: 100%; }

.freq-btn {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  cursor: pointer;
  transition: all 0.2s;
}
.freq-btn:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
.freq-btn:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
.freq-btn:not(:first-child) { border-left: none; }
.freq-btn--active { background: rgba(18, 130, 151, 0.08); font-weight: 600; color: var(--teal-90, #01586a); z-index: 1; }

.schedule-row { display: flex; gap: 8px; width: 100%; margin-top: 8px; }

.schedule-field { flex: 1 1 0%; display: flex; flex-direction: column; gap: 4px; min-width: 0; }

.schedule-field__label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
}

.schedule-field :deep(.pendo-select) { width: 100% !important; display: block !important; min-width: 0 !important; }
.schedule-field :deep(.pendo-select__trigger) { width: 100% !important; min-width: 0 !important; }

/* ── Channel select ── */
.channel-wrapper { position: relative; width: 100%; }

.channel-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 36px;
  padding: 8px 12px;
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s;
  outline: none;
}
.channel-select:has(.channel-tags) { padding: 4px 12px 4px 8px; }
.channel-select:not(:has(.channel-tags)) { height: 36px; padding: 0 12px; }
.channel-select:hover { border-color: var(--gray-100, #2a2c35); }

.channel-select__placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-60, #9a9ca5);
}

.channel-tags { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }

.channel-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30, #eaecf1);
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
}

.channel-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110, #1a1c25);
  font-weight: 600;
}

.channel-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100, #2a2c35);
}

.channel-select__chevron {
  display: flex;
  align-items: center;
  color: var(--gray-70, #6a6c75);
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s;
}
.channel-select__chevron--open { transform: rotate(180deg); }

.channel-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  max-height: 220px;
  overflow-y: auto;
  z-index: 100;
}

.channel-dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  transition: background-color 0.1s;
}
.channel-dropdown__item:hover { background-color: var(--gray-10, #f5f6f8); }

.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Blade tabs ── */
.blade-tabs {
  display: flex;
  gap: 24px;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-40, #dadce5);
  flex-shrink: 0;
}

.blade-tab {
  padding: 10px 0 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.35;
  color: var(--gray-110, #1a1c25);
  position: relative;
  transition: color 0.15s;
}

.blade-tab--active { font-weight: 600; }

.blade-tab--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gray-110, #1a1c25);
}

.full-scroll-section-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--gray-100, #2a2c35);
}

/* ── Confirmation ── */
.confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 24px;
  gap: 10px;
}

.confirmation__icon { color: #B4E0CD; margin-bottom: 4px; }

.confirmation__title {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--gray-100, #2a2c35);
  margin: 0;
}

.confirmation__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: var(--gray-80, #4a4c55);
  margin: 0;
  line-height: 1.5;
}
.confirmation__subtitle strong { color: var(--gray-100, #2a2c35); }

.confirmation__details {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--gray-70, #6a6c75);
  margin: 0;
  line-height: 1.6;
  max-width: 380px;
}
.confirmation__details strong { font-weight: 600; color: var(--gray-90, #3a3c45); }

.confirmation__actions { display: flex; gap: 8px; margin-top: 16px; }

/* ── Widget tag selector (matches Milestone 3) ── */
.widget-tag-wrapper { position: relative; width: 100%; }

.widget-tag-select {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 36px;
  padding: 8px 12px;
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s;
  outline: none;
}
.widget-tag-select:has(.widget-tags) { padding: 4px 12px 4px 8px; }
.widget-tag-select:not(:has(.widget-tags)) { height: 36px; padding: 0 12px; }
.widget-tag-select:hover { border-color: var(--gray-100, #2a2c35); }

.widget-tag-select__placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
}

.widget-tags {
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

.widget-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--gray-30, #eaecf1);
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 3px;
  flex-shrink: 0;
  max-width: 220px;
  min-width: 0;
  overflow: hidden;
}

.widget-tag--overflow { cursor: default; }

.widget-tag__text {
  font-family: 'Inter', sans-serif;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--gray-110, #1a1c25);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.widget-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-100, #2a2c35);
}

.widget-select__chevron {
  display: flex;
  align-items: center;
  color: var(--gray-70, #6a6c75);
  flex-shrink: 0;
  margin-left: 8px;
  transition: transform 0.2s;
}

.widget-select__chevron--open { transform: rotate(180deg); }

.widget-dropdown-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--gray-30, #eaecf1);
}

.widget-dropdown-action {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--teal-90, #006a80);
  cursor: pointer;
  padding: 0;
}
.widget-dropdown-action:hover { text-decoration: underline; }

.widget-dropdown-divider {
  color: var(--gray-40, #dadce5);
  font-size: 13px;
}

/* ── Filter pills (matches Option D) ── */
.filter-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  height: 28px;
  border: 1px solid var(--gray-30, #eaecf1);
  border-radius: 6px;
  background: white;
  overflow: visible;
  position: relative;
}

.filter-pill__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-60, #9a9ca5);
  flex-shrink: 0;
}
.filter-pill__remove:hover { color: var(--gray-100, #2a2c35); }

.filter-pill__label {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70, #6a6c75);
  padding: 0 0 0 4px;
  white-space: nowrap;
}

.filter-pill__value-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
  height: 100%;
}
.filter-pill__value-wrap:hover { background: var(--gray-10, #f5f6f8); }

.filter-pill__value {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--teal-80, #01697e);
  white-space: nowrap;
}

.filter-pill__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 81, 100, 0.08);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
}

.filter-pill__dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--gray-100, #2a2c35);
  transition: background-color 0.1s;
}
.filter-pill__dropdown-item:hover { background-color: var(--gray-10, #f5f6f8); }

.filter-add-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  border-radius: 3px;
  transition: text-decoration 0.15s;
}
.filter-add-btn:hover { text-decoration: underline; }

/* ── Goal textarea (matches Option D) ── */
.goal-textarea {
  width: 100%;
  height: 120px;
  padding: 8px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2a2c35);
  background: white;
  border: 1px solid var(--gray-40, #dadce5);
  border-radius: 6px;
  resize: none;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  margin-top: 4px;
}

.goal-textarea::placeholder { color: var(--gray-60, #9a9ca5); }
.goal-textarea:focus { border-color: var(--teal-90, #01586a); }

.widget-anchor {
  border-radius: 6px;
}

.widget-anchor.widget-highlight {
  animation: widget-highlight-pulse 1.5s ease-out forwards;
}

@keyframes widget-highlight-pulse {
  0% {
    box-shadow: 0 0 0 2px rgba(18, 130, 151, 0.9), 0 0 0 6px rgba(18, 130, 151, 0.15);
  }
  60% {
    box-shadow: 0 0 0 2px rgba(18, 130, 151, 0.6), 0 0 0 6px rgba(18, 130, 151, 0.08);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(18, 130, 151, 0), 0 0 0 6px rgba(18, 130, 151, 0);
  }
}
</style>
