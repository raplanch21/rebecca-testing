export const figmaStateCards = [
  {
    id: 'tag-maintenance',
    tag: 'Journeys',
    tagTone: 'journeys',
    period: 'Last 30 days',
    headlineParts: [
      { text: '59%', strong: true },
      { text: ' of ' },
      { text: 'Tag Maintenance visitors', strong: true, dotted: true },
      { text: ' excluded a tag on ' },
      { text: 'Tag Maintenance', strong: true, accent: true },
      { text: ', but only ' },
      { text: '10%', strong: true },
      { text: ' of all visitors use Exclude, while Edit tag is used by ' },
      { text: '7x', strong: true },
      { text: ' as many people.' }
    ],
    metrics: [
      { value: '10', label: 'Completed' },
      { value: '59%', label: 'Completion rate' },
      { value: '1 in 10', label: 'reach Exclude' }
    ],
    breakdownTitle: 'Edit vs. Exclude trend',
    breakdown: [
      { label: 'Exclude tag', value: '10%', track: '#dfe8ec', fill: '#5bb1c8', dot: '#5bb1c8', width: 10, visitors: '14 visitors' },
      { label: 'Edit tag', value: '77%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 77, visitors: '106 visitors' }
    ],
    takeaway: '',
    additionalInfo: [
      'Across all 138 visitors who took any action on Tag Maintenance in the same period, 106 edited tags and only 14 excluded them. Exclude appears to be a rarely chosen path compared to Edit.',
      'The 59% completion metric tracks a self-selected group who already intended to exclude. The larger behavior signal is that only 1 in 10 Tag Maintenance visitors reaches Exclude at all, suggesting users may default to Edit or miss Exclude as a distinct option.'
    ],
    opportunity:
      'Watch session replays of Tag Maintenance visitors who only edited tags. Look for anyone modifying tags in ways that suggest they were trying to exclude but took the edit path instead.'
  },
  {
    id: 'path-report',
    tag: 'Adoption',
    tagTone: 'adoption',
    period: 'Last 30 days',
    headlineParts: [
      { text: 'Path report users ran the report an average of ' },
      { text: '12.8 times', strong: true },
      { text: ' each in March, but only ' },
      { text: '5%', strong: true },
      { text: ' ever downloaded results.' }
    ],
    metrics: [
      { value: '12.8x', label: 'Average runs per visitor' },
      { value: '5%', label: 'Export rate' },
      { value: '5.3k', label: 'Visitors' }
    ],
    breakdownTitle: 'Actions taken by path report users',
    breakdown: [
      { label: 'Save and run', value: '35%', track: '#dfe8ec', fill: '#5bb1c8', dot: '#5bb1c8', width: 35, visitors: '1,855 visitors' },
      { label: 'Advanced settings', value: '24%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 24, visitors: '1,272 visitors' },
      { label: 'Date range refinement', value: '21%', track: '#efe6f2', fill: '#ca58c7', dot: '#ca58c7', width: 21, visitors: '1,113 visitors' },
      { label: 'CSV export', value: '5%', track: '#e8f1ea', fill: '#56a667', dot: '#56a667', width: 5, visitors: '265 visitors' }
    ],
    takeaway:
      'The 12.8x run rate means users are treating paths as interactive exploration, not a one-shot report to share. The current UX is built around a run-and-read model. If users are looping 12+ times, the design question is: what are they trying to narrow down, and is the tool helping them get there faster?',
    opportunity:
      'Watch sessions of high-iteration users (10+ runs)-look for the moment they stop iterating. Are they finding the answer, getting frustrated, or running out of time?'
  },
  {
    id: 'ui-ux-sentiment',
    tag: 'Sentiment',
    tagTone: 'sentiment',
    period: 'Last 30 days',
    headlineParts: [
      { text: '"UI UX" is cited by ' },
      { text: 'Promoters', strong: true, dotted: true },
      { text: ' and ' },
      { text: 'Detractors', strong: true, dotted: true },
      { text: ', but with opposite meaning.' }
    ],
    metrics: [
      { value: '2,140', label: 'Responses analyzed' },
      { value: '54%', label: 'Promoter mentions' },
      { value: '46%', label: 'Detractor mentions' }
    ],
    breakdownTitle: 'UI UX mention split',
    breakdown: [
      { label: 'Promoters', value: '54%', track: '#efe6f2', fill: '#ca58c7', dot: '#ca58c7', width: 54, visitors: '1,156 responses' },
      { label: 'Detractors', value: '46%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 46, visitors: '984 responses' }
    ],
    takeaway:
      'The same topic can mean very different things. A shared label does not mean people are having the same experience.',
    opportunity:
      'Review comments from both groups and list the friction words that appear only in detractor feedback.'
  },
  {
    id: 'segments-usage',
    tag: 'Adoption',
    tagTone: 'adoption',
    period: 'Last 30 days',
    headlineParts: [
      { text: 'Segments was used less in the last 30 days, but the ' },
      { text: 'save step', strong: true, accent: true },
      { text: ' still performed about the same.' }
    ],
    metrics: [
      { value: '-10.5%', label: 'Segments Page events' },
      { value: '-8.0%', label: 'Segments visitors' },
      { value: '-3.7%', label: 'Save step events' }
    ],
    breakdownTitle: 'Current vs prior period change',
    breakdown: [
      { label: 'Segments Page', value: '-10.5%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 11, visitors: '174,845 vs 195,384 events' },
      { label: 'Save Custom Segment', value: '-3.7%', track: '#dfe8ec', fill: '#5bb1c8', dot: '#5bb1c8', width: 4, visitors: '7,963 vs 8,267 events' }
    ],
    takeaway:
      'The main issue is fewer people entering Segments. Once people are in the workflow, save behavior stays mostly stable.',
    opportunity:
      'Try a short prompt that directs users into Segments entry points, then check whether page activity rises while save behavior remains stable.'
  }
]

export const inboxSidebarCards = [
  {
    id: 'inbox-path',
    org: 'pendo-internal',
    headlineParts: [
      { text: 'Path report users ran the report an average of ' },
      { text: '12.8 times', strong: true },
      { text: ' each, but only ' },
      { text: '5%', strong: true },
      { text: ' export.' }
    ],
    tag: 'Adoption',
    tagTone: 'adoption',
    period: 'Last 30 days'
  },
  {
    id: 'inbox-exclude',
    org: 'pendo-internal',
    headlineParts: [
      { text: '59% of ' },
      { text: 'User who utilized exclude tag...', strong: true, dotted: true },
      { text: ' on ' },
      { text: 'Tag Maintenance', strong: true, accent: true },
      { text: ' excluded a tag, but only 1 in 10 visitors ever reach ' },
      { text: 'Exclude', strong: true, accent: true },
      { text: '.' }
    ],
    tag: 'Journeys',
    tagTone: 'journeys',
    period: 'Last 30 days'
  },
  {
    id: 'inbox-sentiment',
    org: 'pendo-internal',
    headlineParts: [
      { text: '"UI UX" is cited by ' },
      { text: 'Promoters', strong: true, dotted: true },
      { text: ' and ' },
      { text: 'Detractors', strong: true, dotted: true },
      { text: ' alike but with opposite meaning.' }
    ],
    tag: 'Sentiment',
    tagTone: 'sentiment',
    period: 'Last 30 days'
  },
  {
    id: 'inbox-segments',
    org: 'pendo-internal',
    headlineParts: [
      { text: 'Segments activity cooled ' },
      { text: '-10.5%', strong: true },
      { text: ' period over period, but ' },
      { text: 'Save Custom Segment', strong: true, accent: true },
      { text: ' stayed comparatively resilient.' }
    ],
    tag: 'Adoption',
    tagTone: 'adoption',
    period: 'Last 30 days'
  }
]

export const inboxMainContentById = {
  'inbox-path': {
    meta: 'Analytics | Paths · Last 30 days · Refiners vs. Exporters · 5,322 visitors',
    actionLabel: 'View path report',
    title: 'Path report users ran the report an average of 12.8 times each in March, but only 5% ever downloaded results.',
    narrativeParts: [
      { text: 'Step-by-step path data shows users running, navigating to dashboards, returning, and running again. Only ' },
      { text: '254 (5%)', strong: true },
      { text: ' ever exported results. The most common post-run action is ' },
      { text: 'Save and Run', strong: true, accent: true },
      { text: ' ' },
      { text: '(35%)', strong: true },
      { text: ', meaning most users are re-running saved configurations, not building new analyses. ' },
      { text: 'Advanced settings', strong: true, accent: true },
      { text: ' reached ' },
      { text: '24%', strong: true },
      { text: ' of runners, surprisingly high for a power-user feature.' }
    ],
    breakdownTitle: 'Actions taken by path report users',
    breakdown: [
      { label: 'Save and run', value: '35%', track: '#dfe8ec', fill: '#5bb1c8', dot: '#5bb1c8', width: 35, visitors: '1,855 visitors' },
      { label: 'Advanced settings', value: '24%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 24, visitors: '1,272 visitors' },
      { label: 'Date range refinement', value: '21%', track: '#efe6f2', fill: '#ca58c7', dot: '#ca58c7', width: 21, visitors: '1,113 visitors' },
      { label: 'CSV export', value: '5%', track: '#e8f1ea', fill: '#56a667', dot: '#56a667', width: 5, visitors: '265 visitors' }
    ],
    takeaway:
      'The 12.8x run rate means users are treating paths as interactive exploration, not a one-shot report to share. The current UX is built around a run-and-read model. If users are looping 12+ times, the design question is: what are they trying to narrow down, and is the tool helping them get there faster?',
    opportunity:
      'Watch sessions of high-iteration users (10+ runs)-look for the moment they stop iterating. Are they finding the answer, getting frustrated, or running out of time?'
  },
  'inbox-exclude': {
    meta: 'Journeys | Tag Maintenance · Last 30 days · Edit vs. Exclude · 138 visitors',
    actionLabel: 'View tag maintenance',
    title: '59% of users who utilized exclude tag on Tag Maintenance completed the flow, but only 1 in 10 visitors ever reach Exclude.',
    narrativeParts: [
      { text: 'Across all 138 visitors who took any action on Tag Maintenance in the same period, ' },
      { text: '106 edited tags', strong: true, accent: true },
      { text: ' and only ' },
      { text: '14 excluded tags', strong: true, accent: true },
      { text: '. Exclude appears to be a rarely chosen path compared to Edit.' }
    ],
    breakdownTitle: 'Edit vs. Exclude trend',
    breakdown: [
      { label: 'Exclude tag', value: '10%', track: '#dfe8ec', fill: '#5bb1c8', dot: '#5bb1c8', width: 10, visitors: '14 visitors' },
      { label: 'Edit tag', value: '77%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 77, visitors: '106 visitors' }
    ],
    takeaway:
      'The 59% completion metric tracks a self-selected group who already intended to exclude. The larger behavior signal is discoverability and route selection before users ever enter the exclude flow.',
    opportunity:
      'Watch session replays of visitors who only edited tags and look for patterns where users appear to be trying to exclude but complete an edit path instead.'
  },
  'inbox-sentiment': {
    meta: 'NPS | Sentiment · Last 30 days · UI UX mentions · 2,140 responses',
    actionLabel: 'View sentiment details',
    title: '"UI UX" is cited by Promoters and Detractors alike, but with opposite meaning.',
    narrativeParts: [
      { text: 'Theme overlap hides intent: both promoter and detractor comments mention UI UX, but context diverges. Promoters describe clarity and speed, while detractors describe friction and discoverability gaps.' }
    ],
    breakdownTitle: 'UI UX mention split',
    breakdown: [
      { label: 'Promoters', value: '54%', track: '#efe6f2', fill: '#ca58c7', dot: '#ca58c7', width: 54, visitors: '1,156 responses' },
      { label: 'Detractors', value: '46%', track: '#f3ecdf', fill: '#fbb866', dot: '#fbb866', width: 46, visitors: '984 responses' }
    ],
    takeaway:
      'The same theme can signal opposite outcomes. Topic-only grouping is not enough for action planning; sentiment context needs to be explicit in the workflow.',
    opportunity:
      'Review verbatim comments in both groups and isolate repeated friction terms that are absent in promoter language.'
  },
  'inbox-segments': {
    meta: 'Segments | Product area · Mar 7-Apr 5, 2026 vs Feb 5-Mar 6, 2026 · All users',
    actionLabel: 'View segments details',
    title: 'Segments was used less in the last 30 days, but the save step still performed about the same.',
    narrativeParts: [
      { text: 'Across all users, ' },
      { text: 'Segments Page', strong: true, accent: true },
      { text: ' activity declined from ' },
      { text: '195,384 to 174,845 events (-10.5%)', strong: true },
      { text: ', and visitors fell from ' },
      { text: '11,661 to 10,727 (-8.0%)', strong: true },
      { text: '. Meanwhile, ' },
      { text: 'Save Custom Segment', strong: true, accent: true },
      { text: ' changed only ' },
      { text: '-3.7% events', strong: true },
      { text: ' with visitors essentially flat. This suggests fewer people started in Segments, not that the save step is broken.' }
    ],
    breakdownTitle: 'Current vs prior period events',
    breakdownType: 'period-bars',
    periodComparison: [
      {
        label: 'Segments Page',
        currentEvents: 174845,
        priorEvents: 195384,
        change: '-10.5%',
        color: '#fbb866'
      },
      {
        label: 'Save Custom Segment',
        currentEvents: 7963,
        priorEvents: 8267,
        change: '-3.7%',
        color: '#5bb1c8'
      }
    ],
    takeaway:
      'The main issue is fewer people entering Segments. Once people are in the workflow, save behavior stays mostly stable.',
    opportunity:
      'Test a short activation push into Segments entry points, then monitor whether page and metadata-field volume rebounds while save behavior remains stable.'
  }
}
