import { createRouter, createWebHistory } from 'vue-router'
import FeatureLaunchDashboard from '../components/FeatureLaunchDashboard.vue'
import NotesSubmitInsightPage from '../components/NotesSubmitInsightPage.vue'
import InsightsHome from '../components/InsightsHome.vue'
import GenerativeInsightsPage from '../components/GenerativeInsightsPage.vue'
import InsightsInPendoDashboard from '../components/InsightsInPendoDashboard.vue'
import InsightsInPendoDashboardV2 from '../components/InsightsInPendoDashboardV2.vue'
import Milestone3Dashboard from '../components/Milestone3Dashboard.vue'
import SubscriptionOptionA from '../components/subscriptions/SubscriptionOptionA.vue'
import SubscriptionOptionB from '../components/subscriptions/SubscriptionOptionB.vue'
import SubscriptionOptionC from '../components/subscriptions/SubscriptionOptionC.vue'
import SubscriptionOptionD from '../components/subscriptions/SubscriptionOptionD.vue'
import SubscriptionOptionE from '../components/subscriptions/SubscriptionOptionE.vue'
import SignalsDashboardInsightsHost from '../components/SignalsDashboardInsightsHost.vue'
import AgentHomepage from '../components/AgentHomepage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/insights/feature-launch',
    name: 'Dashboard',
    component: FeatureLaunchDashboard,
    meta: { layout: 'default' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: FeatureLaunchDashboard,
    meta: { layout: 'default', openBlade: true }
  },
  {
    path: '/insights/static-url',
    name: 'NotesSubmitInsight',
    component: NotesSubmitInsightPage,
    meta: { layout: 'standalone' }
  },
  {
    path: '/home',
    name: 'Home',
    component: InsightsHome,
    meta: { layout: 'default' }
  },
  {
    path: '/insights/generative',
    name: 'GenerativeInsights',
    component: GenerativeInsightsPage,
    meta: { layout: 'standalone' }
  },
  {
    path: '/insights/in-pendo-v1',
    name: 'InsightsInPendoV1',
    component: InsightsInPendoDashboard,
    meta: { layout: 'default' }
  },
  {
    path: '/insights/in-pendo-v2',
    name: 'InsightsInPendoV2',
    component: InsightsInPendoDashboardV2,
    meta: { layout: 'default' }
  },
  {
    path: '/insights/milestone-3',
    name: 'Milestone3',
    component: Milestone3Dashboard,
    meta: { layout: 'default' }
  },
  {
    path: '/insights/milestone-3/blade',
    name: 'Milestone3Blade',
    component: Milestone3Dashboard,
    meta: { layout: 'default', openBlade: true }
  },
  {
    path: '/subscriptions/option-a',
    name: 'SubscriptionOptionA',
    component: SubscriptionOptionA,
    meta: { layout: 'default' }
  },
  {
    path: '/subscriptions/option-b',
    name: 'SubscriptionOptionB',
    component: SubscriptionOptionB,
    meta: { layout: 'default' }
  },
  {
    path: '/subscriptions/option-c',
    name: 'SubscriptionOptionC',
    component: SubscriptionOptionC,
    meta: { layout: 'default' }
  },
  {
    path: '/subscriptions/option-d',
    name: 'SubscriptionOptionD',
    component: SubscriptionOptionD,
    meta: { layout: 'default' }
  },
  {
    path: '/pndm-demo',
    name: 'SubscriptionOptionE',
    component: SubscriptionOptionE,
    meta: { layout: 'default' }
  },
  {
    path: '/insights/signals-dashboard',
    name: 'SignalsDashboardInsights',
    component: SignalsDashboardInsightsHost,
    meta: { layout: 'default' }
  },
  {
    path: '/agent-homepage',
    name: 'AgentHomepage',
    component: AgentHomepage,
    meta: { layout: 'fy27' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
