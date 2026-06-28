<template>
  <div class="insights-home">
    <!-- Page Header -->
    <div class="insights-home__header">
      <div class="insights-home__title-group">
        <h1 class="insights-home__title">Tiffany's home</h1>
      </div>
      
      <!-- Tab Navigation -->
      <div class="insights-home__tabs-container">
        <div class="insights-home__tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['insights-home__tab', { 'insights-home__tab--active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div class="insights-home__content">
      <!-- Your Favorites Section -->
      <section class="insights-home__section">
        <div class="insights-home__section-header">
          <div class="insights-home__section-info">
            <h2 class="insights-home__section-title">Your insights</h2>
            <p class="insights-home__section-description">
              A snapshot of what's changed in the areas you've been working in — based on your recent activity across Pendo.
            </p>
            <div class="insights-home__filters">
              <span class="insights-home__filter-label">Filtered by:</span>
              <PendoFilterTag label="acme-internal" icon="monitor" />
              <PendoFilterTag label="Last 30 days" icon="clock" />
              <PendoFilterTag label="6 events selected" />
            </div>
          </div>
          <PendoButton 
            type="tertiary-link" 
            label="Manage preferences" 
            prefix-icon="settings"
            size="regular"
            class="insights-home__preferences-btn"
          />
        </div>

        <!-- Grouped Insight Cards (v3) -->
        <template v-if="variant === 'grouped'">
          <div class="insights-home__cards insights-home__cards--two-col">
            <GroupedInsightCard
              v-for="group in groupedInsights.slice(0, 2)"
              :key="group.title"
              :title="group.title"
              :items="group.items"
              :summary="group.summary"
              @open-agent-mode="handleOpenAgentMode"
            />
          </div>

          <div v-if="showAllInsights" class="insights-home__cards insights-home__cards--two-col">
            <GroupedInsightCard
              v-for="group in groupedInsights.slice(2)"
              :key="group.title"
              :title="group.title"
              :items="group.items"
              :summary="group.summary"
              @open-agent-mode="handleOpenAgentMode"
            />
          </div>

          <!-- See All Divider -->
          <div class="insights-home__see-all">
            <div class="insights-home__divider-line"></div>
            <button 
              class="insights-home__see-all-btn"
              @click="showAllInsights = !showAllInsights"
            >
              <span>{{ showAllInsights ? 'Show less' : 'See all' }}</span>
              <PendoIcon :type="showAllInsights ? 'chevron-up' : 'chevron-down'" :size="16" />
            </button>
            <div class="insights-home__divider-line"></div>
          </div>
        </template>

        <!-- Regular Insight Cards (v1, v2 & v4) -->
        <div v-else class="insights-home__cards" :class="{ 'insights-home__cards--two-col': variant === 'default', 'insights-home__cards--three-col': variant === 'hidden-summary' || variant === 'menu' }">
          <InsightCard
            title="Account retention"
            primary-label="Overall retention"
            primary-value="55%"
            :primary-trend="10"
            range="(50% → 55%)"
            :secondary-metrics="accountRetentionMetrics"
            :summary="accountRetentionSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              Accounts that adopt 
              <PendoAppTag label="Create Dashboard" icon="mouse-pointer" />
              within 14 days retain at 89% vs. 38% for non-creators.
            </template>
          </InsightCard>

          <InsightCard
            title="Agent retention"
            primary-label="Overall retention"
            primary-value="15%"
            :primary-trend="12"
            range="(3% → 15%)"
            :secondary-metrics="agentRetentionMetrics"
            :summary="agentRetentionSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              In the last 30 days, 
              <PendoAppTag label="AcmeAgent" icon="box" />
              has seen a 12% increase in retention.
            </template>
          </InsightCard>

          <InsightCard
            v-if="variant === 'hidden-summary' || variant === 'menu'"
            title="Feature adoption"
            primary-label="Active users"
            primary-value="7.5K"
            :primary-trend="8"
            range="(6.9K → 7.5K)"
            :secondary-metrics="featureAdoptionMetrics"
            :summary="featureAdoptionSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              7.5K users actively engaged with 
              <PendoAppTag label="New Dashboard" icon="monitor" />
              this month, an 8% increase in adoption.
            </template>
          </InsightCard>
        </div>

        <!-- Additional Insights (Expandable - v1, v2 & v4) -->
        <div v-if="showAllInsights && variant !== 'grouped'" class="insights-home__cards" :class="{ 'insights-home__cards--two-col': variant === 'default', 'insights-home__cards--three-col': variant === 'hidden-summary' || variant === 'menu' }">
          <InsightCard
            v-if="variant === 'default'"
            title="Feature adoption"
            primary-label="Active users"
            primary-value="7.5K"
            :primary-trend="8"
            range="(6.9K → 7.5K)"
            :secondary-metrics="featureAdoptionMetrics"
            :summary="featureAdoptionSummary"
            cta-variant="floating-chip"
            :hide-summary-preview="hideSummaryPreview"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              7.5K users actively engaged with 
              <PendoAppTag label="New Dashboard" icon="monitor" />
              this month, an 8% increase in adoption.
            </template>
          </InsightCard>

          <InsightCard
            title="User engagement"
            primary-label="Daily active users"
            primary-value="12.3K"
            :primary-trend="15"
            range="(10.7K → 12.3K)"
            :secondary-metrics="engagementMetrics"
            :summary="engagementSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              12.3K users actively used 
              <PendoAppTag label="AcmeApp" icon="monitor" />
              daily this month, a 15% increase.
            </template>
          </InsightCard>

          <InsightCard
            title="Session duration"
            primary-label="Average time"
            primary-value="8.5m"
            :primary-trend="-5"
            range="(9.0m → 8.5m)"
            :secondary-metrics="sessionMetrics"
            :summary="sessionDurationSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              Users spent an average of 8.5 minutes per session in 
              <PendoAppTag label="AcmeApp" icon="monitor" />
              this month.
            </template>
          </InsightCard>

          <InsightCard
            title="Conversion rate"
            primary-label="Overall conversion"
            primary-value="24%"
            :primary-trend="6"
            range="(22.6% → 24%)"
            :secondary-metrics="conversionMetrics"
            :summary="conversionSummary"
            :cta-variant="variant === 'hidden-summary' || variant === 'menu' ? 'simple-cta' : 'floating-chip'"
            :hide-summary-preview="hideSummaryPreview"
            :show-menu="showMenu"
            expand-label="Show more"
            collapse-label="Show less"
            @open-agent-mode="handleOpenAgentMode"
          >
            <template #description>
              24% of trial users converted to paid accounts, a 6% increase from last month.
            </template>
          </InsightCard>
        </div>

        <!-- See All Divider (v1 & v2 only) -->
        <div v-if="variant !== 'grouped'" class="insights-home__see-all">
          <div class="insights-home__divider-line"></div>
          <button 
            class="insights-home__see-all-btn"
            @click="showAllInsights = !showAllInsights"
          >
            <span>{{ showAllInsights ? 'Show less' : 'See all' }}</span>
            <PendoIcon :type="showAllInsights ? 'chevron-up' : 'chevron-down'" :size="16" />
          </button>
          <div class="insights-home__divider-line"></div>
        </div>
      </section>

      <!-- Key Highlights Section -->
      <section class="insights-home__section">
        <div class="insights-home__section-header">
          <div class="insights-home__section-info">
            <h2 class="insights-home__section-title">Beyond your focus</h2>
            <p class="insights-home__section-description">
              Notable trends in other parts of your product.
            </p>
          </div>
          <PendoButton 
            type="tertiary-link" 
            label="View on a dashboard" 
            prefix-icon="dashboard"
            size="regular"
            class="insights-home__dashboard-btn"
          />
        </div>

        <!-- Across Your Apps -->
        <div class="insights-home__subsection">
          <h3 class="insights-home__subsection-title">Across your apps</h3>
          <div class="insights-home__highlights-grid">
            <div class="insights-home__highlight-card">
              <div class="insights-home__highlight-body">
                <div class="insights-home__highlight-tag">
                  <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                    <PendoIcon type="trending-up" :size="12" />
                  </div>
                  <span class="insights-home__highlight-tag-label">Active users</span>
                </div>
                <div class="insights-home__highlight-description">
                  <div class="insights-home__highlight-description-line">
                    <PendoAppTag label="Desktop App" icon="monitor" />
                    <span class="insights-home__highlight-text">saw a 25% increase</span>
                  </div>
                  <p class="insights-home__highlight-text">in daily active users this week. Now at 12,300 users, up from 9,840.</p>
                </div>
              </div>
              <div class="insights-home__highlight-footer">
                <div class="insights-home__highlight-actions">
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Active users', 'up', 'Desktop App', 'Across your apps')">
                    <PendoIcon type="thumbs-up" :size="16" />
                  </button>
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Active users', 'up', 'Desktop App', 'Across your apps')">
                    <PendoIcon type="thumbs-down" :size="16" />
                  </button>
                </div>
                <button class="insights-home__highlight-cta">
                  <PendoIcon type="chart-no-axes-combined" :size="16" />
                  <span>Run a report</span>
                </button>
              </div>
            </div>

            <div class="insights-home__highlight-card">
              <div class="insights-home__highlight-body">
                <div class="insights-home__highlight-tag">
                  <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--warning">
                    <PendoIcon type="trending-down" :size="12" />
                  </div>
                  <span class="insights-home__highlight-tag-label">Session duration</span>
                </div>
                <div class="insights-home__highlight-description">
                  <div class="insights-home__highlight-description-line">
                    <PendoAppTag label="Mobile App" icon="smartphone" />
                    <span class="insights-home__highlight-text">average session time</span>
                  </div>
                  <p class="insights-home__highlight-text">decreased by 8% to 7.2 minutes. Consider reviewing user flow friction points.</p>
                </div>
              </div>
              <div class="insights-home__highlight-footer">
                <div class="insights-home__highlight-actions">
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Session duration', 'down', 'Mobile App', 'Across your apps')">
                    <PendoIcon type="thumbs-up" :size="16" />
                  </button>
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Session duration', 'down', 'Mobile App', 'Across your apps')">
                    <PendoIcon type="thumbs-down" :size="16" />
                  </button>
                </div>
                <button class="insights-home__highlight-cta">
                  <PendoIcon type="layout-dashboard" :size="16" />
                  <span>Monitor on a dashboard</span>
                </button>
              </div>
            </div>

            <div class="insights-home__highlight-card">
              <div class="insights-home__highlight-body">
                <div class="insights-home__highlight-tag">
                  <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                    <PendoIcon type="trending-up" :size="12" />
                  </div>
                  <span class="insights-home__highlight-tag-label">Retention rate</span>
                </div>
                <div class="insights-home__highlight-description">
                  <p class="insights-home__highlight-text">
                    <PendoAppTag label="Browser Extension" icon="puzzle" /> 7-day retention improved to 68%, up 5% from last month. Strong indicator of product-market fit.
                  </p>
                </div>
              </div>
              <div class="insights-home__highlight-footer">
                <div class="insights-home__highlight-actions">
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Retention rate', 'up', 'Browser Extension', 'Across your apps')">
                    <PendoIcon type="thumbs-up" :size="16" />
                  </button>
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Retention rate', 'up', 'Browser Extension', 'Across your apps')">
                    <PendoIcon type="thumbs-down" :size="16" />
                  </button>
                </div>
                <button class="insights-home__highlight-cta">
                  <PendoIcon type="chart-no-axes-combined" :size="16" />
                  <span>Run a report</span>
                </button>
              </div>
            </div>

            <div class="insights-home__highlight-card">
              <div class="insights-home__highlight-body">
                <div class="insights-home__highlight-tag">
                  <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                    <PendoIcon type="trending-up" :size="12" />
                  </div>
                  <span class="insights-home__highlight-tag-label">Conversion rate</span>
                </div>
                <div class="insights-home__highlight-description">
                  <div class="insights-home__highlight-description-line">
                    <PendoAppTag label="Desktop App" icon="monitor" />
                    <span class="insights-home__highlight-text">trial-to-paid conversion</span>
                  </div>
                  <p class="insights-home__highlight-text">increased to 32%, up 6% this quarter. Onboarding improvements are paying off.</p>
                </div>
              </div>
              <div class="insights-home__highlight-footer">
                <div class="insights-home__highlight-actions">
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Conversion rate', 'up', 'Desktop App', 'Across your apps')">
                    <PendoIcon type="thumbs-up" :size="16" />
                  </button>
                  <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Conversion rate', 'up', 'Desktop App', 'Across your apps')">
                    <PendoIcon type="thumbs-down" :size="16" />
                  </button>
                </div>
                <button class="insights-home__highlight-cta">
                  <PendoIcon type="chart-no-axes-combined" :size="16" />
                  <span>Run a report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- By Your Events -->
        <div class="insights-home__subsection">
          <h3 class="insights-home__subsection-title">By your events</h3>
          <div class="insights-home__highlights-grid">
            <div class="insights-home__highlight-card">
            <div class="insights-home__highlight-body">
              <div class="insights-home__highlight-tag">
                <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                  <PendoIcon type="trending-up" :size="12" />
                </div>
                <span class="insights-home__highlight-tag-label">Dashboard views</span>
              </div>
              <div class="insights-home__highlight-description">
                <div class="insights-home__highlight-description-line">
                  <PendoAppTag label="Analytics Dashboard" icon="monitor" />
                  <span class="insights-home__highlight-text">you edited last</span>
                </div>
                <p class="insights-home__highlight-text">week is seeing 45% increased engagement. Users are spending 3.2 minutes on average.</p>
              </div>
            </div>
            <div class="insights-home__highlight-footer">
              <div class="insights-home__highlight-actions">
                <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Dashboard views', 'up', 'Analytics Dashboard', 'By your events')">
                  <PendoIcon type="thumbs-up" :size="16" />
                </button>
                <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Dashboard views', 'up', 'Analytics Dashboard', 'By your events')">
                  <PendoIcon type="thumbs-down" :size="16" />
                </button>
              </div>
              <button class="insights-home__highlight-cta">
                <PendoIcon type="layout-dashboard" :size="16" />
                <span>Monitor on a dashboard</span>
              </button>
            </div>
          </div>

          <div class="insights-home__highlight-card">
            <div class="insights-home__highlight-body">
              <div class="insights-home__highlight-tag">
                <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--warning">
                  <PendoIcon type="trending-down" :size="12" />
                </div>
                <span class="insights-home__highlight-tag-label">Guide completion</span>
              </div>
              <div class="insights-home__highlight-description">
                <div class="insights-home__highlight-description-line">
                  <PendoAppTag label="Getting Started" icon="message-square" />
                  <span class="insights-home__highlight-text">guide you published</span>
                </div>
                <p class="insights-home__highlight-text">2 weeks ago has seen a 12% decline in completion rate from 68% to 56%.</p>
              </div>
            </div>
            <div class="insights-home__highlight-footer">
              <div class="insights-home__highlight-actions">
                <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Guide completion', 'down', 'Getting Started', 'By your events')">
                  <PendoIcon type="thumbs-up" :size="16" />
                </button>
                <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Guide completion', 'down', 'Getting Started', 'By your events')">
                  <PendoIcon type="thumbs-down" :size="16" />
                </button>
              </div>
              <button class="insights-home__highlight-cta">
                <PendoIcon type="message-square" :size="16" />
                <span>Review guide</span>
              </button>
            </div>
          </div>

          <div class="insights-home__highlight-card">
            <div class="insights-home__highlight-body">
              <div class="insights-home__highlight-tag">
                <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                  <PendoIcon type="trending-up" :size="12" />
                </div>
                <span class="insights-home__highlight-tag-label">Feature adoption</span>
              </div>
              <div class="insights-home__highlight-description">
                <div class="insights-home__highlight-description-line">
                  <PendoAppTag label="Dark Mode" icon="mouse-pointer" />
                  <span class="insights-home__highlight-text">feature flag you enabled</span>
                </div>
                <p class="insights-home__highlight-text">is now active for 2,400 users, up 180% from last week.</p>
              </div>
            </div>
            <div class="insights-home__highlight-footer">
              <div class="insights-home__highlight-actions">
                <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Feature adoption', 'up', 'Dark Mode', 'By your events')">
                  <PendoIcon type="thumbs-up" :size="16" />
                </button>
                <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Feature adoption', 'up', 'Dark Mode', 'By your events')">
                  <PendoIcon type="thumbs-down" :size="16" />
                </button>
              </div>
              <button class="insights-home__highlight-cta">
                <PendoIcon type="mouse-pointer" :size="16" />
                <span>View feature</span>
              </button>
            </div>
          </div>

          <div class="insights-home__highlight-card">
            <div class="insights-home__highlight-body">
              <div class="insights-home__highlight-tag">
                <div class="insights-home__highlight-tag-icon insights-home__highlight-tag-icon--success">
                  <PendoIcon type="trending-up" :size="12" />
                </div>
                <span class="insights-home__highlight-tag-label">Performance</span>
              </div>
              <div class="insights-home__highlight-description">
                <div class="insights-home__highlight-description-line">
                  <PendoAppTag label="Settings page" icon="monitor" />
                  <span class="insights-home__highlight-text">you optimized last</span>
                </div>
                <p class="insights-home__highlight-text">sprint now loads 2.1 seconds faster, reducing bounce rate by 8%.</p>
              </div>
            </div>
            <div class="insights-home__highlight-footer">
              <div class="insights-home__highlight-actions">
                <button class="insights-home__highlight-thumb" aria-label="Thumbs up" @click="handleInsightFeedback('positive', 'Performance', 'up', 'Settings page', 'By your events')">
                  <PendoIcon type="thumbs-up" :size="16" />
                </button>
                <button class="insights-home__highlight-thumb" aria-label="Thumbs down" @click="handleInsightFeedback('negative', 'Performance', 'up', 'Settings page', 'By your events')">
                  <PendoIcon type="thumbs-down" :size="16" />
                </button>
              </div>
              <button class="insights-home__highlight-cta">
                <PendoIcon type="chart-no-axes-combined" :size="16" />
                <span>Run a report</span>
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PendoButton from './pendo/PendoButton.vue'
import PendoIcon from './pendo/PendoIconLucide.vue'
import PendoAppTag from './pendo/PendoAppTag.vue'
import PendoFilterTag from './pendo/PendoFilterTag.vue'
import InsightCard from './InsightCard.vue'
import GroupedInsightCard from './GroupedInsightCard.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  isGlobalAgentModeOpen: {
    type: Boolean,
    default: false
  },
  agentModeContext: {
    type: Object,
    default: () => ({ title: 'Agent mode', context: 'How can I help you today?' })
  }
})

const emit = defineEmits(['open-global-agent-mode', 'close-global-agent-mode'])

const handleOpenAgentMode = (data) => {
  emit('open-global-agent-mode', data)
}

const handleInsightFeedback = (feedbackType, category, trend, app, section) => {
  if (typeof pendo !== 'undefined') {
    pendo.track('insight_feedback_submitted', {
      feedbackType,
      insightCategory: category,
      insightTrend: trend,
      insightApp: app,
      sectionName: section
    })
  }
}

const activeTab = ref('insights')
const showAllInsights = ref(false)

// Compute whether to hide summary preview based on variant
const hideSummaryPreview = computed(() => props.variant === 'hidden-summary' || props.variant === 'menu')

// Compute whether to show menu dropdown
const showMenu = computed(() => props.variant === 'menu')

// Computed summaries that change based on variant
const accountRetentionSummary = computed(() => {
  return "Accounts that adopt *Create Dashboard* in their first 14 days retain at *89%.* Accounts that don't retain at only *38%*—even with high usage.\n\n*The Problem:* Currently only *34%* of accounts adopt dashboard creation early enough."
})

const agentRetentionSummary = computed(() => {
  return hideSummaryPreview.value
    ? "Users engaging with the *Code Generation* feature show *3x* higher retention. Promote this capability in onboarding to accelerate adoption across your user base."
    : "*AcmeAgent* engagement and retention are both climbing. Retention jumped from *3%* to *15%* over the last 30 days, while conversation volume increased *10%* and prompt usage grew *5%*.\n\nUsers are finding more value in *AcmeAgent* and coming back more often."
})

const featureAdoptionSummary = computed(() => {
  return hideSummaryPreview.value
    ? "The *Analytics Tab* is your fastest-growing feature, with adoption up *45%* among data teams. Consider creating a dedicated guide to capture broader interest."
    : "*Mobile* adoption is accelerating while *desktop* usage shows a slight decline. Mobile users grew *18%* to *2.4K* active users, while desktop dropped *3%* to *5.1K*. Overall feature adoption increased *8%* this month."
})

const engagementSummary = computed(() => {
  return hideSummaryPreview.value
    ? "Users who complete the *interactive tutorial* in their first session are *4x* more likely to become daily active users. Prioritize this onboarding step to drive engagement."
    : "User engagement is trending upward across all segments. Daily active users increased *15%* to *12.3K*, with new users contributing *22%* growth and returning users adding *9%*. Strong momentum in user acquisition."
})

const sessionDurationSummary = computed(() => {
  return hideSummaryPreview.value
    ? "The *Settings page* accounts for *40%* of session time drops. Users are abandoning after *2-3 clicks*—investigate navigation friction and form complexity."
    : "Session duration decreased slightly this month. Average session time dropped *5%* to *8.5 minutes*. Power users maintained *12-minute* sessions, but casual users decreased to *5 minutes*, suggesting potential friction points."
})

const conversionSummary = computed(() => {
  return hideSummaryPreview.value
    ? "Users who activate the *Collaboration* feature during trial convert at *38%* vs. *18%* baseline. Highlight team features earlier in the trial experience."
    : "Conversion rates improved across the funnel. Overall conversion increased *6%* to *24%*, with trial-to-paid conversions up *8%* and free-to-trial up *4%*. Onboarding improvements are showing positive impact."
})

const tabs = [
  { id: 'insights', label: 'Insights' },
  { id: 'quick-access', label: 'Quick access' },
  { id: 'get-started', label: 'Get started' }
]

const accountRetentionMetrics = [
  { label: 'Dashboard creators', value: '89%', trend: 24 },
  { label: 'Non-creators', value: '38%', trend: 8 }
]

const agentRetentionMetrics = [
  { label: 'Conversations', value: '200', trend: 10 },
  { label: 'Prompts', value: '650', trend: 5 }
]

const featureAdoptionMetrics = [
  { label: 'Mobile', value: '2.4K', trend: 18 },
  { label: 'Desktop', value: '5.1K', trend: -3 }
]

const engagementMetrics = [
  { label: 'New users', value: '4.2K', trend: 22 },
  { label: 'Returning', value: '8.1K', trend: 9 }
]

const sessionMetrics = [
  { label: 'Power users', value: '12m', trend: 0 },
  { label: 'Casual users', value: '5m', trend: -10 }
]

const conversionMetrics = [
  { label: 'Trial to paid', value: '32%', trend: 8 },
  { label: 'Free to trial', value: '18%', trend: 4 }
]

// Grouped insights data for v3
const groupedInsights = [
  {
    title: 'Retention by application',
    summary: 'AcmeFinance is driving retention growth with an 11% increase, while AcmeHealth shows a 4% decline. Consider investigating user experience differences between these applications to replicate success patterns.',
    items: [
      {
        value: '60%',
        trend: 11,
        descriptionPrefix: '60% of accounts who used',
        appLabel: 'AcmeFinance',
        appIcon: 'monitor',
        descriptionSuffix: 'last month returned this',
        descriptionContinued: 'month, an 11% increase in retention.',
        range: '(54% → 60%)'
      },
      {
        value: '68%',
        trend: -4,
        descriptionPrefix: '68% of accounts who used',
        appLabel: 'AcmeHealth',
        appIcon: 'monitor',
        descriptionSuffix: 'last month returned this',
        descriptionContinued: 'month, a 4% decrease in retention.',
        range: '(71% → 68%)'
      }
    ]
  },
  {
    title: 'Adoption by feature',
    summary: 'The New Dashboard leads adoption with 7.5K users (+8%), while the Analytics Tab shows strong momentum at 4.2K users (+15%). Focus on promoting Analytics Tab to capitalize on its rapid growth trajectory.',
    items: [
      {
        value: '7.5K',
        trend: 8,
        descriptionPrefix: '7.5K users actively engaged with',
        appLabel: 'New Dashboard',
        appIcon: 'monitor',
        descriptionSuffix: 'this month,',
        descriptionContinued: 'an 8% increase in adoption.',
        range: '(6.9K → 7.5K)'
      },
      {
        value: '4.2K',
        trend: 15,
        descriptionPrefix: '4.2K users adopted',
        appLabel: 'Analytics Tab',
        appIcon: 'monitor',
        descriptionSuffix: 'this month,',
        descriptionContinued: 'a 15% increase in feature usage.',
        range: '(3.7K → 4.2K)'
      }
    ]
  },
  {
    title: 'Engagement by segment',
    summary: 'Enterprise tier dominates engagement with 12.3K daily active users (+15%), while Pro tier shows healthy growth at 8.1K users (+9%). Enterprise users are your power users—prioritize features that serve their needs.',
    items: [
      {
        value: '12.3K',
        trend: 15,
        descriptionPrefix: '12.3K users in',
        appLabel: 'Enterprise',
        appIcon: 'monitor',
        descriptionSuffix: 'tier are daily active,',
        descriptionContinued: 'a 15% increase this month.',
        range: '(10.7K → 12.3K)'
      },
      {
        value: '8.1K',
        trend: 9,
        descriptionPrefix: '8.1K users in',
        appLabel: 'Pro',
        appIcon: 'monitor',
        descriptionSuffix: 'tier are daily active,',
        descriptionContinued: 'a 9% increase this month.',
        range: '(7.4K → 8.1K)'
      }
    ]
  },
  {
    title: 'Conversion by funnel stage',
    summary: 'Trial-to-paid conversion is strong at 32% (+8%), outpacing free-to-trial at 18% (+4%). The trial experience is working—focus on driving more users into trial to maximize overall conversion.',
    items: [
      {
        value: '32%',
        trend: 8,
        descriptionPrefix: '32% of trial users in',
        appLabel: 'Trial to Paid',
        appIcon: 'monitor',
        descriptionSuffix: 'converted,',
        descriptionContinued: 'an 8% increase in conversion rate.',
        range: '(29.6% → 32%)'
      },
      {
        value: '18%',
        trend: 4,
        descriptionPrefix: '18% of free users in',
        appLabel: 'Free to Trial',
        appIcon: 'monitor',
        descriptionSuffix: 'upgraded,',
        descriptionContinued: 'a 4% increase in upgrade rate.',
        range: '(17.3% → 18%)'
      }
    ]
  },
  {
    title: 'Session duration by device',
    summary: 'Desktop power users maintain strong 12-minute sessions, but mobile casual users dropped 10% to 5 minutes. Investigate mobile experience friction points to improve engagement on smaller screens.',
    items: [
      {
        value: '12m',
        trend: 0,
        descriptionPrefix: 'Power users spend',
        appLabel: 'Desktop',
        appIcon: 'monitor',
        descriptionSuffix: 'on average,',
        descriptionContinued: 'maintaining 12-minute sessions.',
        range: '(12m → 12m)'
      },
      {
        value: '5m',
        trend: -10,
        descriptionPrefix: 'Casual users spend',
        appLabel: 'Mobile',
        appIcon: 'smartphone',
        descriptionSuffix: 'on average,',
        descriptionContinued: 'a 10% decrease in session time.',
        range: '(5.6m → 5m)'
      }
    ]
  },
  {
    title: 'Agent usage by feature',
    summary: 'AcmeAgent shows balanced growth with conversations up 10% to 200 and prompts up 5% to 650. Users are engaging more frequently—consider adding advanced prompt templates to accelerate usage.',
    items: [
      {
        value: '200',
        trend: 10,
        descriptionPrefix: '200 conversations using',
        appLabel: 'AcmeAgent',
        appIcon: 'box',
        descriptionSuffix: 'this month,',
        descriptionContinued: 'a 10% increase in conversation volume.',
        range: '(182 → 200)'
      },
      {
        value: '650',
        trend: 5,
        descriptionPrefix: '650 prompts submitted to',
        appLabel: 'AcmeAgent',
        appIcon: 'box',
        descriptionSuffix: 'this month,',
        descriptionContinued: 'a 5% increase in prompt usage.',
        range: '(619 → 650)'
      }
    ]
  }
]
</script>

<style scoped>
.insights-home {
  display: flex;
  flex-direction: column;
  background-color: var(--gray-0, #FFFFFF);
  min-height: 100%;
}

.insights-home :deep(.pendo-button--tertiary-link) {
  color: var(--teal-90, #005164);
}

/* Header */
.insights-home__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 32px;
}

.insights-home__title-group {
  padding: 0 32px;
}

.insights-home__title {
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 1.2;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

/* Tabs */
.insights-home__tabs-container {
  padding: 16px 32px 0 32px;
}

.insights-home__tabs {
  display: flex;
  background-color: var(--gray-10, #F8F8F9);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 8px;
  padding: 1px;
  overflow: hidden;
  width: fit-content;
}

.insights-home__tab {
  padding: 4px 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.22px;
  line-height: 1.5;
  color: var(--gray-70, #6A6C75);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.insights-home__tab:hover {
  color: var(--gray-90, #3A3C45);
}

.insights-home__tab--active {
  background-color: var(--gray-0, #FFFFFF);
  color: var(--gray-90, #3A3C45);
  font-weight: 600;
  box-shadow: 2px 0px 4px 0px rgba(116, 117, 120, 0.17);
}

/* Content */
.insights-home__content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
}

/* Sections */
.insights-home__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.insights-home__section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.insights-home__section-info {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.insights-home__section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.insights-home__section-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

/* Dashboard Button */
.insights-home__dashboard-btn {
  background-color: transparent;
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 6px;
  padding: 10px 12px;
  height: 36px;
  transition: background-color 0.15s ease;
  text-decoration: none !important;
}

.insights-home__dashboard-btn:hover {
  background-color: var(--gray-10, #F8F8F9);
  text-decoration: none !important;
}

/* Preferences Button */
.insights-home__preferences-btn {
  background-color: transparent;
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 6px;
  padding: 10px 12px;
  height: 36px;
  transition: background-color 0.15s ease;
  text-decoration: none !important;
}

.insights-home__preferences-btn:hover {
  background-color: var(--gray-10, #F8F8F9);
  text-decoration: none !important;
}

/* Cards */
.insights-home__cards {
  display: flex;
  align-items: stretch;
  gap: 32px;
}

.insights-home__cards--two-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  align-items: start;
}

.insights-home__cards--two-col :deep(.insight-card) {
  width: 100%;
  max-width: none;
}

.insights-home__cards--two-col :deep(.grouped-insight-card) {
  width: 100%;
  max-width: none;
}

.insights-home__cards--three-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  align-items: start;
}

/* Responsive breakpoints (Tailwind defaults) */
@media (max-width: 1279px) {
  .insights-home__cards--three-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1023px) {
  .insights-home__cards--two-col,
  .insights-home__cards--three-col {
    grid-template-columns: 1fr;
  }

  .insights-home__content {
    padding: 24px;
  }

  .insights-home__title-group,
  .insights-home__tabs-container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 639px) {
  .insights-home__content {
    padding: 16px;
    gap: 24px;
  }

  .insights-home__title-group,
  .insights-home__tabs-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .insights-home__section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

.insights-home__cards--three-col :deep(.insight-card) {
  width: 100%;
  max-width: none;
}

/* See All Divider */
.insights-home__see-all {
  display: flex;
  align-items: center;
  gap: 12px;
}

.insights-home__divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--gray-30, #EAECF1);
}

.insights-home__see-all-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 24px;
  background-color: var(--gray-5, #FCFCFD);
  border: 1px solid var(--gray-30, #EAECF1);
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--teal-90, #01586A);
  cursor: pointer;
  transition: all 0.2s ease;
}

.insights-home__see-all-btn:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

/* Filters */
.insights-home__filters {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.insights-home__filter-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-80, #4A4C55);
}

/* Key Highlights Grid */
.insights-home__highlights-grid {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

/* Medium breakpoint - tighter gap for more width */
@media (max-width: 1279px) and (min-width: 768px) {
  .insights-home__highlights-grid {
    gap: 16px;
  }
}

.insights-home__highlight-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid var(--gray-40, #DADCE5);
  border-radius: 8px;
  overflow: hidden;
}

.insights-home__highlight-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: var(--gray-0, #FFFFFF);
  flex: 1;
}

.insights-home__highlight-tag {
  display: flex;
  align-items: center;
  gap: 6px;
}

.insights-home__highlight-tag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 3px;
}

.insights-home__highlight-tag-icon--error {
  background-color: var(--red-10, #FFF5F5);
  color: var(--red-80, #BD0000);
}

.insights-home__highlight-tag-icon--warning {
  background-color: var(--yellow-10, #FFFAF2);
  color: var(--yellow-90, #C28E00);
}

.insights-home__highlight-tag-icon--success {
  background-color: var(--green-5, #F3FCF7);
  color: var(--green-90, #008648);
}

.insights-home__highlight-tag-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.2;
  color: var(--gray-100, #2A2C35);
}

.insights-home__highlight-description {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.insights-home__highlight-description-line {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.insights-home__highlight-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14.222px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}

.insights-home__highlight-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: var(--gray-0, #FFFFFF);
  border-top: 1px solid var(--gray-30, #EAECF1);
  gap: 16px;
}

.insights-home__highlight-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.insights-home__highlight-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  color: var(--gray-70, #6A6C75);
  cursor: pointer;
  transition: color 0.15s ease;
}

.insights-home__highlight-thumb:hover {
  color: var(--gray-100, #2A2C35);
}

.insights-home__highlight-cta {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  height: 26px;
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: var(--teal-90, #005164);
  cursor: pointer;
  transition: color 0.15s ease;
  flex: 0 1 auto;
  min-width: 0;
  max-width: 70%;
}

.insights-home__highlight-cta :deep(.pendo-icon),
.insights-home__highlight-cta svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.insights-home__highlight-cta span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.insights-home__highlight-cta:hover {
  text-decoration: underline;
}

/* Subsections */
.insights-home__subsection {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.insights-home__subsection + .insights-home__subsection {
  margin-top: 16px;
}

.insights-home__subsection-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-100, #2A2C35);
  margin: 0;
}
</style>


