<template>
  <div class="insight-page">
    <div class="insight-page-wrapper">
    <section class="insight-hero">
      <h1 class="insight-hero__title">Autonomous Insights Dashboard | Weekly Insights</h1>
      <p class="insight-hero__lead">
        Trends is seeing strong engagement with consistent weekday usage. Visitors are exploring deeper insights, but feedback remains minimal—an opportunity to improve discoverability and gather more input.
      </p>
      <div class="insight-hero__meta">
        <PendoTag type="filter" label="Jan 26 – Feb 2" size="regular" />
      </div>
    </section>

    <section class="insight-key-metrics-section">
      <h2 class="insight-section-title">Key metrics to watch (last 30 days)</h2>
      <div class="insight-hero-card">
        <div class="insight-key-stat__content">
          <div class="insight-key-stat__label">Daily events</div>
          <div class="insight-key-stat__value-row">
            <div class="insight-key-stat__value">25k–29k</div>
            <div class="insight-key-stat__change">2.5k+ accounts daily</div>
          </div>
          <p class="insight-key-stat__primary-context">
            Trends maintains strong daily engagement with 25k–29k events per weekday, reaching 2.5k+ unique accounts daily.
          </p>
          <p class="insight-key-stat__context">
            Peak usage occurs Tuesday and Wednesday (~29k events). The feature reached 5.1k unique accounts and 41.2k unique visitors over the past 30 days, but retention drops significantly after the first week.
          </p>
        </div>
        <div class="insight-key-stat__charts-wrapper">
          <div class="insight-key-stat__charts">
            <div class="insight-key-stat__chart-container">
              <div class="insight-key-stat__chart">
                <div class="insight-chart__label">
                  <div class="insight-chart__metric-title">Daily engagement</div>
                  <div class="insight-chart__metric-value">25k–29k</div>
                </div>
                <div class="insight-chart__frame">
                  <highcharts :options="adoptionMiniChartOptions" />
                </div>
                <div class="insight-chart__scale">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </div>
              </div>
            </div>
            <div class="insight-key-stat__chart-container">
              <div class="insight-key-stat__chart">
                <div class="insight-chart__label">
                  <div class="insight-chart__metric-title">Visitor retention</div>
                  <div class="insight-chart__metric-value">36%</div>
                </div>
                <div class="insight-chart__frame">
                  <highcharts :options="retentionChallengeChartOptions" />
                </div>
                <div class="insight-chart__scale">
                  <span>Week 0</span>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="insight-observations-section">
      <h2 class="insight-section-title">What we've observed</h2>
      <div class="observation-grid">
        <div class="observation-stat">
          <div class="observation-stat__label">Unique accounts</div>
          <div class="observation-stat__metric-row">
            <div class="observation-stat__number">5.1k</div>
            <div class="observation-stat__change observation-stat__change--positive">+42%</div>
          </div>
          <p class="observation-stat__description">Accessed Trends in the last 30 days, showing strong adoption.</p>
        </div>
        <div class="observation-stat">
          <div class="observation-stat__label">Unique visitors</div>
          <div class="observation-stat__metric-row">
            <div class="observation-stat__number">41.2k</div>
            <div class="observation-stat__change observation-stat__change--positive">+28%</div>
          </div>
          <p class="observation-stat__description">Engaged with Trends in the last 30 days, showing healthy reach.</p>
        </div>
        <div class="observation-stat">
          <div class="observation-stat__label">Daily engagement</div>
          <div class="observation-stat__metric-row">
            <div class="observation-stat__number">2.5k+</div>
            <div class="observation-stat__change observation-stat__change--positive">+12%</div>
          </div>
          <p class="observation-stat__description">Unique accounts engage daily, with peak activity Tuesday and Wednesday.</p>
        </div>
        <div class="observation-stat">
          <div class="observation-stat__label">Retention drop</div>
          <div class="observation-stat__metric-row">
            <div class="observation-stat__number">36%</div>
            <div class="observation-stat__change observation-stat__change--negative">-28%</div>
          </div>
          <p class="observation-stat__description">Only 1.9k accounts (36%) take Level 1 actions monthly. Week 1 is critical—visitors try the feature but don't consistently return.</p>
        </div>
      </div>
    </section>

    <PendoCard :bordered="true" :shadow="false" body-padding="0" class="insight-card">
      <template #header>
        <div class="insight-card__header">
          <span class="insight-card__title">Visitor engagement comparison</span>
        </div>
      </template>
      <div class="insight-card__body">
        <p class="insight-card__subtitle">Card insights clicked vs. trendsLoaded</p>
        <div class="insight-chart__frame insight-chart__frame--large">
          <highcharts :options="engagementComparisonChartOptions" />
        </div>
        <p class="insight-chart__caption">
          64% of visitors browse Trends without clicking through to deeper insights—an opportunity to improve discoverability.
        </p>
      </div>
      <div class="insight-frame">
        <div class="insight-frame__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 2v6h-6" stroke="#DD4600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#DD4600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 22v-6h6" stroke="#DD4600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" stroke="#DD4600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="insight-frame__content">
          <div class="insight-frame__title">Conversion challenge</div>
          <p class="insight-frame__description">
            Out of 5.1k accounts that load Trends, 1.9k (36%) click through to view card insights. The first week is critical for forming habits—focus retention efforts here.
          </p>
        </div>
      </div>
    </PendoCard>

    <section class="insight-feedback-section">
      <h2 class="insight-section-title">What people are saying</h2>
      <PendoCard :bordered="true" :shadow="false" body-padding="0" class="insight-card">
      <template #header>
        <div class="insight-card__header">
          <span class="insight-card__title">Visitor feedback | Trends feature</span>
        </div>
      </template>
      <div class="insight-card__body">
        <div class="insight-feedback__header">
          <h3 class="insight-feedback__question">What's your experience with the Trends feature?</h3>
          <div class="insight-feedback__stats">
            <span class="insight-feedback__stat--strong">52 responses</span> · 
            <span>68 visitors seen</span> · 
            <span class="insight-feedback__stat--strong">41 unique responses</span> · 
            <span>76% response rate</span>
          </div>
        </div>

        <div class="insight-feedback__list">
          <div class="insight-feedback__item">
            <p class="insight-feedback__text">
              Trends has become my go-to for understanding what's happening across our product. The AI-generated insights save me hours of manual analysis each week.
            </p>
            <div class="insight-feedback__meta">
              Enterprise Account • February 1, 2026 · 10:15:42 AM EST
            </div>
          </div>

          <div class="insight-feedback__item">
            <p class="insight-feedback__text">
              Love the concept but I wish I could customize which metrics show up in my Trends view. Sometimes I'm drowning in data that isn't relevant to my role.
            </p>
            <div class="insight-feedback__meta">
              Mid-Market Account • January 31, 2026 · 2:33:18 PM EST
            </div>
          </div>

          <div class="insight-feedback__item">
            <p class="insight-feedback__text">
              The insights are helpful, but I find myself wanting more context. Would be great if clicking on a trend showed me session replays or specific user examples.
            </p>
            <div class="insight-feedback__meta">
              Enterprise Account • January 30, 2026 · 9:45:55 AM EST
            </div>
          </div>

          <div class="insight-feedback__item">
            <p class="insight-feedback__text">
              This feature is a game changer for our weekly standups. We can quickly see what's trending without having to build custom reports.
            </p>
            <div class="insight-feedback__meta">
              SMB Account • January 29, 2026 · 4:22:11 PM EST
            </div>
          </div>

          <div class="insight-feedback__item insight-feedback__item--last">
            <p class="insight-feedback__text">
              I check Trends every morning now. It's become part of my routine. My only request is to add a way to share specific insights directly to Slack.
            </p>
            <div class="insight-feedback__meta">
              Enterprise Account • January 28, 2026 · 8:10:33 AM EST
            </div>
          </div>
        </div>
      </div>
    </PendoCard>
    </section>

    <section class="insight-recommendations">
      <div class="insight-recommendations__header">
        <h2 class="insight-recommendations__title">What we suggest</h2>
        <p class="insight-recommendations__subtitle">Recommended actions based on these insights</p>
      </div>
      <div class="insight-recommendations__list">
        <div class="insight-recommendation-item">
          <h3 class="insight-recommendation-item__title">Create a week 1 re-engagement campaign</h3>
          <p class="insight-recommendation-item__description">Retention drops significantly after the first week. Build a "here's what you missed" digest or in-app notification that appears after 3 to 5 days of inactivity to encourage return visits.</p>
        </div>
        <div class="insight-recommendation-item">
          <h3 class="insight-recommendation-item__title">A/B test card insights prominence</h3>
          <p class="insight-recommendation-item__description">36% click-through rate shows room for improvement. Test different ways to highlight top insights more prominently—consider visual treatments, placement, or personalized recommendations.</p>
        </div>
        <div class="insight-recommendation-item insight-recommendation-item--last">
          <h3 class="insight-recommendation-item__title">Implement proactive feedback prompts</h3>
          <p class="insight-recommendation-item__description">Add a feedback prompt that appears after visitors view 3 to 5 insights, rather than relying on passive discovery. Test different moments to find the optimal time for feedback collection.</p>
        </div>
      </div>
    </section>

    <section class="insight-next-steps">
      <div class="insight-next-steps__header">
        <h2 class="insight-next-steps__title">What happens next</h2>
        <p class="insight-next-steps__subtitle">Take action to improve feedback discoverability and deepen visitor engagement with Trends insights.</p>
      </div>
      <div class="insight-next-steps__grid">
        <div class="insight-action-card">
          <div class="insight-action-card__content">
            <div class="insight-action-card__header">
              <div class="insight-action-card__icon-container insight-action-card__icon-container--magenta">
                <svg width="16" height="16" viewBox="0 0 164 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M82 18.6L0 100.7H82V182.8L164.1 100.7V18.6H82Z" stroke="#BB1F52" stroke-width="14" stroke-linejoin="round" fill="none"/>
                </svg>
              </div>
              <h3 class="insight-action-card__title">See Pendo in action</h3>
            </div>
            <div class="insight-action-card__description">
              <p>Learn more about Pendo's AI-powered Software Experience Platform in a series of short, interactive demos.</p>
            </div>
          </div>
          <div class="insight-action-card__button-wrapper">
            <PendoButton type="tertiary" label="Take a tour" size="small" suffix-icon="arrow-up-right" />
          </div>
        </div>
        <div class="insight-action-card">
          <div class="insight-action-card__content">
            <div class="insight-action-card__header">
              <div class="insight-action-card__icon-container insight-action-card__icon-container--teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3H3V12H10V3Z" stroke="#128297" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 3H14V8H21V3Z" stroke="#128297" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12H14V21H21V12Z" stroke="#128297" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 16H3V21H10V16Z" stroke="#128297" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="insight-action-card__title">View dashboard in Pendo</h3>
            </div>
            <div class="insight-action-card__description">
              <p>See the full Trends dashboard with real-time data and additional metrics.</p>
            </div>
          </div>
          <div class="insight-action-card__button-wrapper">
            <PendoButton type="tertiary" label="Open dashboard" size="small" suffix-icon="arrow-up-right" />
          </div>
        </div>
        <div class="insight-action-card">
          <div class="insight-action-card__content">
            <div class="insight-action-card__header">
              <div class="insight-action-card__icon-container insight-action-card__icon-container--blue">
                <svg width="16" height="16" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83331 5.15014C5.83331 4.9129 6.10146 4.77491 6.29451 4.9128L9.58437 7.2627C9.74722 7.37902 9.74722 7.62106 9.58437 7.73738L6.29451 10.0873C6.10146 10.2252 5.83331 10.0872 5.83331 9.84994V5.15014Z" stroke="#4570E0" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.00002 13.3333C10.2217 13.3333 12.8334 10.7216 12.8334 7.49996C12.8334 4.2783 10.2217 1.66663 7.00002 1.66663C6.1704 1.66663 5.38123 1.83981 4.66669 2.15201M1.16669 7.49996C1.16669 8.21823 1.29651 8.90618 1.53396 9.54163M2.75485 3.49914C2.22687 4.05916 1.80848 4.72364 1.53396 5.45829M2.75485 11.5008C3.29107 12.0695 3.94032 12.5305 4.66669 12.8479" stroke="#4570E0" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="insight-action-card__title">Watch session replays</h3>
            </div>
            <div class="insight-action-card__description">
              <p>Watch recordings of visitors exploring Trends to understand where they get stuck or confused.</p>
            </div>
          </div>
          <div class="insight-action-card__button-wrapper">
            <PendoButton type="tertiary" label="Go to replay view" size="small" suffix-icon="arrow-up-right" />
          </div>
        </div>
        <div class="insight-action-card">
          <div class="insight-action-card__content">
            <div class="insight-action-card__header">
              <div class="insight-action-card__icon-container insight-action-card__icon-container--green">
                <svg width="16" height="16" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.929688 3.77237C0.929688 3.12804 1.45202 2.60571 2.09635 2.60571H11.9036C12.548 2.60571 13.0703 3.12805 13.0703 3.77238V9.33044C13.0703 9.97479 12.548 10.4971 11.9036 10.4971H9.42813L6.92411 12.3941L4.57188 10.4971H2.09635C1.45202 10.4971 0.929688 9.97479 0.929688 9.33044V3.77237Z" stroke="#008648" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="insight-action-card__title">Deploy a guide</h3>
            </div>
            <div class="insight-action-card__description">
              <p>Create a targeted walkthrough for Trends visitors highlighting key insights they might have missed.</p>
            </div>
          </div>
          <div class="insight-action-card__button-wrapper">
            <PendoButton type="tertiary" label="Open the guide builder" size="small" suffix-icon="arrow-up-right" />
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { PendoCard, PendoTag, PendoButton, PendoIcon } from './pendo'

const adoptionMiniChartOptions = {
  chart: {
    type: 'area',
    height: 160,
    backgroundColor: 'transparent',
    spacing: [8, 12, 8, 12],
    margin: [8, 12, 8, 12],
    marginLeft: 12,
    marginRight: 12,
    spacingLeft: 12,
    spacingRight: 12
  },
  title: { text: null },
  credits: { enabled: false },
  legend: { enabled: false },
  xAxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    visible: false,
    tickLength: 0,
    lineWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    tickmarkPlacement: 'on',
    startOnTick: true,
    endOnTick: true
  },
  yAxis: {
    title: { text: null },
    labels: { enabled: false },
    gridLineWidth: 0,
    minPadding: 0.15,
    maxPadding: 0.15,
    min: 20000,
    max: 32000
  },
  tooltip: {
    shared: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE5',
    borderWidth: 1,
    borderRadius: 6,
    shadow: false,
    useHTML: false,
    shape: 'square',
    style: {
      color: '#2A2C35',
      fontSize: '12px'
    }
  },
  plotOptions: {
    area: {
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
      },
      pointPlacement: 'on',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(1, 105, 126, 0.25)'],
          [1, 'rgba(1, 105, 126, 0)']
        ]
      }
    }
  },
  series: [
    {
      name: 'Daily events',
      data: [25200, 29100, 28800, 27400, 26500],
      color: '#01697E'
    }
  ]
}

const retentionChallengeChartOptions = {
  chart: {
    type: 'area',
    height: 160,
    backgroundColor: 'transparent',
    spacing: [8, 12, 8, 12],
    margin: [8, 12, 8, 12],
    marginLeft: 12,
    marginRight: 12,
    spacingLeft: 12,
    spacingRight: 12
  },
  title: { text: null },
  credits: { enabled: false },
  legend: { enabled: false },
  xAxis: {
    categories: ['Week 0', 'Week 1', 'Week 2', 'Week 3'],
    visible: false,
    tickLength: 0,
    lineWidth: 0,
    minPadding: 0,
    maxPadding: 0,
    startOnTick: false,
    endOnTick: false
  },
  yAxis: {
    title: { text: null },
    labels: { enabled: false },
    gridLineWidth: 0,
    minPadding: 0.15,
    maxPadding: 0.15,
    min: 0,
    max: 100
  },
  tooltip: {
    shared: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE5',
    borderWidth: 1,
    borderRadius: 6,
    shadow: false,
    useHTML: false,
    shape: 'square',
    style: {
      color: '#2A2C35',
      fontSize: '12px'
    }
  },
  plotOptions: {
    area: {
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
      },
      pointPlacement: 'on',
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'rgba(121, 30, 119, 0.25)'],
          [1, 'rgba(121, 30, 119, 0)']
        ]
      }
    }
  },
  series: [
    {
      name: 'Visitor retention',
      data: [72, 48, 41, 36],
      color: '#791e77'
    }
  ]
}

const engagementComparisonChartOptions = {
  chart: {
    type: 'column',
    height: 400,
    backgroundColor: 'transparent',
    marginBottom: 60,
    style: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
  },
  title: { text: null },
  credits: { enabled: false },
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
    symbolWidth: 0,
    symbolHeight: 0,
    symbolPadding: 0,
    useHTML: true,
    labelFormatter: function () {
      const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${this.color};margin-right:8px;vertical-align:middle;"></span>`
      return `${dot}<span style="vertical-align:middle;">${this.name}</span>`
    }
  },
  xAxis: {
    categories: ['trendsLoaded', 'Card insights clicked'],
    lineColor: '#EAECF1',
    tickColor: '#EAECF1',
    labels: {
      enabled: true,
      y: 20,
      style: {
        color: '#6A6C75',
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    title: { text: null },
    max: 3500,
    gridLineColor: '#EAECF1',
    labels: {
      format: '{value}',
      style: {
        color: '#6A6C75',
        fontSize: '12px'
      }
    }
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      borderRadius: 4,
      pointPadding: 0.2,
      groupPadding: 0.1,
      colorByPoint: true
    }
  },
  tooltip: {
    shared: false,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE5',
    borderWidth: 1,
    borderRadius: 6,
    shadow: false,
    useHTML: false,
    shape: 'square',
    style: {
      color: '#2A2C35',
      fontSize: '12px'
    }
  },
  series: [
    {
      name: 'Accounts',
      showInLegend: false,
      data: [
        { y: 3290, color: '#7494e8', name: 'trendsLoaded' },
        { y: 1866, color: '#135a71', name: 'Card insights clicked' }
      ]
    }
  ]
}
</script>

<style scoped>
.insight-page {
  padding: 16px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  background: var(--gray-0);
}

.insight-page-wrapper {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Constrain content width at larger breakpoints */
@media (min-width: 1536px) {
  .insight-page-wrapper {
    max-width: 1600px;
  }
}

@media (min-width: 640px) {
  .insight-page {
    padding: 24px;
    padding-bottom: 48px;
  }
}

@media (min-width: 1024px) {
  .insight-page {
    padding: 32px;
    padding-bottom: 64px;
  }
}

.insight-hero__title {
  font-family: var(--font-family-headings);
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-100);
  margin-bottom: 8px;
}

.insight-hero__lead {
  font-size: 14px;
  color: var(--gray-70);
  max-width: 720px;
  margin-bottom: 16px;
}

@media (min-width: 640px) {
  .insight-hero__title {
    font-size: 28px;
  }
  
  .insight-hero__lead {
    font-size: 15px;
  }
}

@media (min-width: 1024px) {
  .insight-hero__title {
    font-size: 32px;
  }
  
  .insight-hero__lead {
    font-size: 14px;
  }
}

.insight-hero__meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.insight-key-metrics-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.insight-section-title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-100);
  line-height: 1.35;
  margin: 0;
}

.insight-feedback-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
}

@media (min-width: 640px) {
  .insight-feedback-section {
    gap: 16px;
    padding-top: 20px;
  }
}

@media (min-width: 1024px) {
  .insight-feedback-section {
    padding-top: 24px;
  }
}

.insight-hero-card {
  border: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 6px;
  padding: 16px;
  background: linear-gradient(229.089deg, rgb(255, 255, 255) 50.514%, rgba(235, 250, 253, 0.2) 94.799%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  box-shadow: 0px 1.806px 18.06px 0px rgba(1, 100, 121, 0.1);
  overflow: hidden;
  max-width: 100%;
}

@media (min-width: 640px) {
  .insight-hero-card {
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .insight-hero-card {
    padding: 24px;
    flex-direction: row;
    gap: 48px;
  }
}

.insight-card {
  border-radius: 12px;
  overflow: hidden;
}

.insight-card__header {
  padding: 12px 16px;
}

@media (min-width: 640px) {
  .insight-card__header {
    padding: 14px 18px;
  }
}

@media (min-width: 1024px) {
  .insight-card__header {
    padding: 16px 20px;
  }
}

.insight-card__title {
  font-size: 18px;
  color: var(--gray-100);
}

.insight-card__body {
  padding: 16px;
}

@media (min-width: 640px) {
  .insight-card__body {
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .insight-card__body {
    padding: 24px;
  }
}

.insight-key-stat__content {
  flex: 1 1 auto;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .insight-key-stat__content {
    flex: 0 0 auto;
    max-width: 450px;
  }
}

.insight-key-stat__charts-wrapper {
  background: rgba(1, 105, 126, 0.05);
  border-radius: 7px;
  padding: 16px 12px;
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
}

@media (min-width: 640px) {
  .insight-key-stat__charts-wrapper {
    padding: 19px 16px;
  }
}

@media (min-width: 1024px) {
  .insight-key-stat__charts-wrapper {
    padding: 21px 19px;
  }
}

.insight-key-stat__charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  align-items: stretch;
}

@media (min-width: 640px) {
  .insight-key-stat__charts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

.insight-key-stat__chart-container {
  width: 100%;
  min-width: 0;
  padding: 12px 0;
  border: 1px solid var(--gray-30);
  border-radius: 10px;
  background: var(--gray-0);
  overflow: hidden;
}

.insight-key-stat__charts .insight-key-stat__chart {
  min-width: 0;
  width: 100%;
  overflow: hidden;
}

.insight-key-stat__label {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100);
  margin: 0 0 4px;
  line-height: 1.5;
}

.insight-key-stat__value-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.insight-key-stat__value {
  font-family: 'Inter', var(--font-family-base);
  font-size: 32px;
  font-weight: 700;
  color: #1A1C25;
  line-height: 1;
  margin: 0;
}

@media (min-width: 640px) {
  .insight-key-stat__value {
    font-size: 36px;
  }
}

@media (min-width: 1024px) {
  .insight-key-stat__value {
    font-size: 40px;
  }
}

.insight-key-stat__change {
  background: #E3F7ED;
  color: #005027;
  font-family: 'Inter', var(--font-family-base);
  font-size: 12.6px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 3px;
  line-height: 1.5;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.insight-key-stat__primary-context {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 400;
  color: #1C1D23;
  line-height: 1.5;
  margin: 0 0 4px;
}

.insight-key-stat__context {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-70);
  margin: 0;
  line-height: 1.5;
}

.insight-chart__frame {
  height: 160px;
  padding: 0 0 4px 0;
  overflow: visible;
  width: 100%;
}

.insight-chart__frame :deep(.highcharts-container),
.insight-chart__frame :deep(svg) {
  max-width: 100%;
  overflow: visible;
}

.insight-chart__frame--large {
  height: 280px;
  margin-top: 12px;
  padding-bottom: 6px;
}

@media (min-width: 640px) {
  .insight-chart__frame--large {
    height: 320px;
    margin-top: 14px;
  }
}

@media (min-width: 1024px) {
  .insight-chart__frame--large {
    height: 360px;
    margin-top: 16px;
  }
}

.insight-chart__label {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 12px;
}

.insight-chart__metric-title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-80);
}

.insight-chart__metric-value {
  font-family: 'Inter', var(--font-family-base);
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-100);
}

.insight-chart__scale {
  font-size: 12px;
  color: var(--gray-70);
  display: flex;
  justify-content: space-between;
  margin: 0 12px;
  padding-top: 6px;
  border-top: 1px solid var(--gray-30);
}

.insight-chart__caption {
  font-size: 13px;
  color: var(--gray-70);
  margin-top: 12px;
}

.insight-observations-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.observation-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .observation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .observation-grid {
    gap: 20px;
  }
}

.observation-stat {
  background: white;
  border: 1px solid #DADCE5;
  border-radius: 5px;
  padding: 12px 16px 12px 12px;
}

@media (min-width: 640px) {
  .observation-stat {
    padding: 14px 20px 14px 14px;
  }
}

.observation-stat__label {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-100);
  line-height: 1.5;
  margin-bottom: 0;
}

.observation-stat__metric-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
}

.observation-stat__number {
  font-family: 'Inter', var(--font-family-base);
  font-size: 28px;
  font-weight: 700;
  color: #1C1D23;
  line-height: 1.2;
  margin: 0;
}

@media (min-width: 640px) {
  .observation-stat__number {
    font-size: 32px;
  }
}

.observation-stat__change {
  font-family: 'Inter', var(--font-family-base);
  font-size: 12.6px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 3px;
  line-height: 1.5;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.observation-stat__change--positive {
  background: #E3F7ED;
  color: #005027;
}

.observation-stat__change--negative {
  background: #FFE8D2;
  color: #8E0B00;
}

.observation-stat__description {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 400;
  color: #6A6C75;
  line-height: 1.5;
  margin: 0;
}

.insight-frame {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px dashed #DADCE5;
}

@media (min-width: 640px) {
  .insight-frame {
    padding: 14px 20px;
  }
}

@media (min-width: 1024px) {
  .insight-frame {
    padding: 16px 24px;
  }
}

.insight-frame__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(221, 70, 0, 0.1);
  border-radius: 3px;
  padding: 4px;
}

.insight-frame__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.insight-frame__title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: #2A2C35;
  margin: 0;
}

.insight-frame__description {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
  white-space: normal;
  word-wrap: break-word;
}

.insight-recommendations {
  padding: 16px 0;
}

@media (min-width: 640px) {
  .insight-recommendations {
    padding: 20px 0;
  }
}

@media (min-width: 1024px) {
  .insight-recommendations {
    padding: 24px 0;
  }
}

.insight-recommendations__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.insight-recommendations__title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: #2A2C35;
  margin: 0;
}

.insight-recommendations__subtitle {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #6A6C75;
  margin: 0;
}

.insight-recommendations__list {
  display: flex;
  flex-direction: column;
  background: linear-gradient(219.844deg, rgb(255, 255, 255) 50.514%, rgba(235, 250, 253, 0.2) 94.799%);
  border: 1px solid rgba(0, 81, 100, 0.1);
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0px 1.806px 18.06px 0px rgba(1, 100, 121, 0.1);
}

@media (min-width: 640px) {
  .insight-recommendations__list {
    padding: 16px;
  }
}

.insight-recommendation-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 81, 100, 0.1);
}

.insight-recommendation-item:first-child {
  padding-top: 0;
}

.insight-recommendation-item:not(:first-child) {
  padding-top: 12px;
}

.insight-recommendation-item--last {
  border-bottom: none;
  padding-top: 12px;
  padding-bottom: 0;
}

@media (min-width: 640px) {
  .insight-recommendation-item {
    padding-bottom: 16px;
  }
  
  .insight-recommendation-item:not(:first-child) {
    padding-top: 16px;
  }
  
  .insight-recommendation-item--last {
    padding-top: 16px;
    padding-bottom: 0;
  }
}

.insight-recommendation-item__title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
}

.insight-recommendation-item__description {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.222px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
}

.insight-next-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.insight-next-steps__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.insight-next-steps__title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: #2A2C35;
  margin: 0;
}

.insight-next-steps__subtitle {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.2px;
  font-weight: 400;
  line-height: 1.5;
  color: #6A6C75;
  margin: 0;
}

.insight-next-steps__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .insight-next-steps__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .insight-next-steps__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
}

.insight-action-card {
  background: white;
  border: 1px solid #DADCE5;
  border-radius: 6px;
  padding: 12px 12px 8px 12px;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (min-width: 640px) {
  .insight-action-card {
    padding: 16px 16px 8px 16px;
  }
}

.insight-action-card__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}

.insight-action-card__header {
  display: flex;
  gap: 6px;
  align-items: center;
}

.insight-action-card__icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 3px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.insight-action-card__icon-container--green {
  background: rgba(0, 134, 72, 0.1);
}

.insight-action-card__icon-container--blue {
  background: rgba(69, 112, 224, 0.1);
}

.insight-action-card__icon-container--magenta {
  background: rgba(187, 31, 82, 0.1);
}

.insight-action-card__icon-container--teal {
  background: rgba(18, 130, 151, 0.1);
}

.insight-action-card__title {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.222px;
  font-weight: 600;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
}

.insight-action-card__description {
  padding-left: 0;
  padding-top: 4px;
}

@media (min-width: 640px) {
  .insight-action-card__description {
    padding-left: 38px;
    padding-top: 0;
  }
}

.insight-action-card__description p {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14.2px;
  font-weight: 400;
  line-height: 1.5;
  color: #2A2C35;
  margin: 0;
}

.insight-action-card__button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.insight-feedback__header {
  margin-bottom: 20px;
}

.insight-feedback__question {
  font-family: 'Inter', var(--font-family-base);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--gray-100);
  margin: 0 0 8px;
}

.insight-feedback__stats {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70);
}

.insight-feedback__stat--strong {
  font-weight: 600;
}

.insight-feedback__list {
  display: flex;
  flex-direction: column;
}

.insight-feedback__item {
  padding: 16px 0;
  border-top: 1px solid var(--gray-30);
}

.insight-feedback__item--last {
  padding-bottom: 0;
}

.insight-feedback__text {
  font-family: 'Inter', var(--font-family-base);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-100);
  margin: 0 0 8px;
}

.insight-feedback__meta {
  font-family: 'Inter', var(--font-family-base);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray-70);
}

</style>
