<template>
  <div class="account-retention-response">
    <div class="account-retention-response__header">
      <p class="account-retention-response__header-text">
        Accounts that adopt Create Dashboard within 14 days retain at 89% vs. 38% for non-creators.
      </p>
    </div>

    <div class="account-retention-response__insight-summary">
      <p class="account-retention-response__insight-title">Insight summary</p>
      <div class="account-retention-response__insight-body">
        <p class="account-retention-response__insight-text">
          Accounts that adopt <strong>Create Dashboard</strong> in their first 14 days retain at <strong>89%.</strong>
          Accounts that don't retain at only <strong>38%</strong>—even with high usage.
        </p>
        <p class="account-retention-response__insight-text">
          <strong>The Problem:</strong> Currently only <strong>34%</strong> of accounts adopt dashboard creation early enough.
        </p>
      </div>
    </div>

    <div class="account-retention-response__events-table">
      <div class="account-retention-response__events-table-header">
        <div class="account-retention-response__events-table-header-left">
          <PendoIcon type="table" :size="16" />
          <span>Top events driving retention</span>
        </div>
      </div>

      <div class="account-retention-response__events-table-grid">
        <div class="account-retention-response__events-row account-retention-response__events-row--head">
          <div class="account-retention-response__events-cell account-retention-response__events-cell--head">
            <span>Event name</span>
          </div>
          <div class="account-retention-response__events-cell account-retention-response__events-cell--head">
            <div class="account-retention-response__events-head-right">
              <span>Retention when completed</span>
            </div>
          </div>
        </div>

        <div class="account-retention-response__events-row">
          <div class="account-retention-response__events-cell">
            <PendoIcon type="mouse-pointer" :size="16" />
            <span>View template</span>
          </div>
          <div class="account-retention-response__events-cell account-retention-response__events-cell--time">
            <span>62%</span>
          </div>
        </div>

        <div class="account-retention-response__events-row">
          <div class="account-retention-response__events-cell">
            <PendoIcon type="mouse-pointer" :size="16" />
            <span>Clone and customize</span>
          </div>
          <div class="account-retention-response__events-cell account-retention-response__events-cell--time">
            <span>74%</span>
          </div>
        </div>

        <div class="account-retention-response__events-row">
          <div class="account-retention-response__events-cell">
            <PendoIcon type="mouse-pointer" :size="16" />
            <span>Save dashboard</span>
          </div>
          <div class="account-retention-response__events-cell account-retention-response__events-cell--time">
            <span>83%</span>
          </div>
        </div>

        <div class="account-retention-response__events-row account-retention-response__events-row--last">
          <div class="account-retention-response__events-cell">
            <PendoIcon type="mouse-pointer" :size="16" />
            <span>Share with team</span>
          </div>
          <div class="account-retention-response__events-cell account-retention-response__events-cell--time">
            <span>91%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="account-retention-response__section">
      <p class="account-retention-response__section-title">Three friction patterns blocking adoption</p>
      <div class="account-retention-response__section-body">
        <div class="account-retention-response__pattern">
          <p class="account-retention-response__pattern-title">Pattern A: Template browsers (31%)</p>
          <ul class="account-retention-response__list">
            <li>View 5+ dashboard examples but never start their own</li>
            <li><strong>Gap:</strong> Inspiration without scaffolding</li>
          </ul>
        </div>

        <div class="account-retention-response__pattern">
          <p class="account-retention-response__pattern-title">Pattern B: Report-only users (48%)</p>
          <ul class="account-retention-response__list">
            <li>High session frequency, but zero dashboard builder visits</li>
            <li><strong>Gap:</strong> Don’t realize they can create</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="account-retention-response__section">
      <p class="account-retention-response__section-title">Key accounts to watch</p>
      <div class="account-retention-response__section-body">
        <div class="account-retention-response__account">
          <p class="account-retention-response__account-title">Acme $45K ARR | Pattern B</p>
          <p class="account-retention-response__account-text">
            Shows heavy analytics usage—15 report runs, 20 segment interactions—but zero custom dashboard creation.
          </p>
        </div>

        <div class="account-retention-response__account">
          <p class="account-retention-response__account-title">TechFlow $38K ARR | Pattern C</p>
          <p class="account-retention-response__account-text">
            Started 3 dashboard builder sessions but abandoned all at the data source configuration step—no completed dashboards yet.
          </p>
        </div>

        <div class="account-retention-response__account">
          <p class="account-retention-response__account-title">Valorium $52K ARR | Pattern B</p>
          <p class="account-retention-response__account-text">
            Logged 67 sessions across 28 users with 99 guide interactions—zero creation events despite high training consumption.
          </p>
        </div>
      </div>
    </div>

    <div class="account-retention-response__section">
      <p class="account-retention-response__section-title">Recommended actions</p>
      <ol class="account-retention-response__actions">
        <li class="account-retention-response__action-item">
          <a
            class="account-retention-response__action-link"
            :href="cin7DeepDiveUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Deep dive into accounts like Acme to understand barriers and opportunities</span>
            <PendoIcon type="arrow-right" :size="16" />
          </a>
        </li>
        <li class="account-retention-response__action-item">
          <span>Build targeted guides to drive dashboard adoption by segment</span>
          <PendoIcon type="arrow-right" :size="16" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import PendoIcon from '../pendo/PendoIconLucide.vue'

const cin7DeepDiveUrl =
  'https://app.pendo.io/s/6591622502678528/agent-mode?text=/account-health%20@{{%22id%22:%22Acme%22,%22type%22:%22account%22,%22text%22:%22Acme%22}}&autosend'
</script>

<style scoped>
.account-retention-response {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

.account-retention-response__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
  color: #2a2c35;
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  line-height: 0; /* matches Figma wrapper leading-[0] */
}

.account-retention-response__header-text {
  margin: 0;
  line-height: 1.5;
}

.account-retention-response__insight-summary {
  width: 100%;
  background: #f8f8f9;
  border: 1px solid #eaecf1;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #2a2c35;
  box-sizing: border-box;
}

.account-retention-response__insight-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
}

.account-retention-response__insight-body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
}

.account-retention-response__insight-text {
  margin: 0;
}

.account-retention-response__insight-text + .account-retention-response__insight-text {
  margin-top: 8px;
}

.account-retention-response__insight-body strong {
  font-weight: 600;
}

.account-retention-response__events-table {
  width: 100%;
  border: 1px solid #eaecf1;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
}

.account-retention-response__events-table-header {
  background: #ffffff;
  border-bottom: 1px solid #eaecf1;
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.account-retention-response__events-table-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
  color: #2a2c35;
}

.account-retention-response__events-table-grid {
  display: flex;
  flex-direction: column;
}

.account-retention-response__events-row {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  border-bottom: 1px solid #eaecf1;
}

.account-retention-response__events-row--head {
  background: #f8f8f9;
}

.account-retention-response__events-row--last {
  border-bottom: none;
}

.account-retention-response__events-cell {
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: #2a2c35;
}

.account-retention-response__events-cell--head {
  background: #f8f8f9;
  font-weight: 600;
}

.account-retention-response__events-head-right {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: nowrap;
}

.account-retention-response__events-head-right span {
  white-space: nowrap;
}

.account-retention-response__events-cell--time {
  color: #3a3c45;
}

.account-retention-response__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  color: #2a2c35;
}

.account-retention-response__section-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.222px;
  line-height: 1.5;
}

.account-retention-response__section-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-retention-response__pattern-title {
  margin: 0 0 6px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
}

.account-retention-response__list {
  margin: 0;
  padding-left: 20px;
  list-style: disc;
}

.account-retention-response__list li {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
  color: #2a2c35;
}

.account-retention-response__list strong {
  font-weight: 600;
}

.account-retention-response__account-title {
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
}

.account-retention-response__account-text {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12.642px;
  line-height: 1.5;
}

.account-retention-response__actions {
  margin: 0;
  padding-left: 0;
  list-style-position: inside;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12.642px;
  line-height: 1.5;
  color: #1a7f93;
}

.account-retention-response__action-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.account-retention-response__action-item:last-child {
  margin-bottom: 0;
}

.account-retention-response__action-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: inherit;
  text-decoration: none;
}

.account-retention-response__action-link:hover {
  color: #016479;
  text-decoration: underline;
}

.account-retention-response__action-item :deep(.pendo-icon) {
  flex-shrink: 0;
}
</style>
