import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

// Design system
const COLORS = {
  primary: "#4570E0",
  danger: "#E74C3C",
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1A202C",
  textSecondary: "#718096",
  accent1: "#4570E0",
  accent2: "#9B59B6",
  accent4: "#F39C12",
  accent5: "#1ABC9C",
};

const FONTS = {
  body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

const styles = {
  page: {
    fontFamily: FONTS.body,
    background: COLORS.bg,
    minHeight: "100vh",
    padding: SPACING.xl,
    color: COLORS.text,
    boxSizing: "border-box",
  },
  hero: {
    background: "linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #4570E0 100%)",
    borderRadius: 16,
    padding: SPACING.xl,
    color: "#fff",
    marginBottom: SPACING.lg,
    position: "relative",
    overflow: "hidden",
  },
  heroAccent: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "rgba(69,112,224,0.25)",
    pointerEvents: "none",
  },
  heroTitle: { fontSize: 26, fontWeight: 700, margin: 0, marginBottom: SPACING.sm },
  heroSub: { fontSize: 14, opacity: 0.85, lineHeight: 1.6, margin: 0, maxWidth: 680 },
  dateBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: SPACING.sm,
    letterSpacing: 0.4,
  },
  section: {
    background: COLORS.surface,
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
    marginBottom: SPACING.lg,
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    cursor: "pointer",
    userSelect: "none",
    borderBottom: `1px solid ${COLORS.border}`,
    background: "#FAFBFC",
  },
  sectionTitle: { fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0 },
  sectionSubText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  sectionBody: { padding: SPACING.lg },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: SPACING.md,
  },
  metricCard: {
    background: COLORS.bg,
    borderRadius: 10,
    padding: SPACING.md,
    border: `1px solid ${COLORS.border}`,
  },
  metricTitle: { fontSize: 12, color: COLORS.textSecondary, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 },
  metricValue: { fontSize: 32, fontWeight: 800, color: COLORS.text, margin: "6px 0 4px" },
  metricDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 },
  badge: { display: "inline-block", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, marginLeft: 8 },
  insightBox: {
    background: "linear-gradient(221deg, rgb(255,255,255) 50.5%, rgba(235,250,253,0.2) 94.8%)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  insightTitle: { fontWeight: 700, fontSize: 14, marginBottom: 4, color: COLORS.text },
  insightDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6, margin: 0 },
  insightFrame: {
    background: "#FFF9F0",
    border: "1px solid #F6C76A",
    borderRadius: 10,
    padding: SPACING.md,
    display: "flex",
    gap: SPACING.sm,
    alignItems: "flex-start",
    marginTop: SPACING.md,
  },
  linkList: { listStyle: "none", margin: 0, padding: 0 },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 0",
    borderBottom: `1px solid ${COLORS.border}`,
    fontSize: 13,
  },
  linkAnchor: { color: COLORS.primary, textDecoration: "none", fontWeight: 500 },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#EEF2FF",
    color: "#4570E0",
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 11,
    fontFamily: FONTS.mono,
    fontWeight: 600,
    maxWidth: 160,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "help",
  },
  subheading: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: COLORS.textSecondary, letterSpacing: 0.5, marginBottom: SPACING.sm, marginTop: SPACING.md },
  emptyState: { fontSize: 13, color: COLORS.textSecondary, fontStyle: "italic", padding: "8px 0" },
};

function Badge({ type = "neutral", children }) {
  const map = {
    warning: { bg: "#FFF7ED", color: "#D97706" },
    danger: { bg: "#FEF2F2", color: "#DC2626" },
    neutral: { bg: "#F1F5F9", color: "#64748B" },
    new: { bg: "#EEF2FF", color: "#4570E0" },
  };
  const s = map[type] || map.neutral;
  return <span style={{ ...styles.badge, background: s.bg, color: s.color }}>{children}</span>;
}

function eventTag(name, type = "feature") {
  return (
    <span style={styles.tag} title={name}>
      {type === "page" ? "📄" : "⚡"} {name}
    </span>
  );
}

function DropdownSection({ title, subText, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader} onClick={() => setOpen(!open)}>
        <div>
          <div style={styles.sectionTitle}>{title}</div>
          {subText && <div style={styles.sectionSubText}>{subText}</div>}
        </div>
        {open ? <ChevronUp size={18} color={COLORS.textSecondary} /> : <ChevronDown size={18} color={COLORS.textSecondary} />}
      </div>
      {open && <div style={styles.sectionBody}>{children}</div>}
    </div>
  );
}

function MetricCard({ title, value, badge, description }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricTitle}>{title}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={styles.metricValue}>{value}</span>
        {badge}
      </div>
      <div style={styles.metricDesc}>{description}</div>
    </div>
  );
}

const featureUsageData = [
  { name: "signalsLoaded", events: 942, accounts: 33, visitors: 240, color: COLORS.accent1 },
  { name: "signalsAction", events: 376, accounts: 6, visitors: 51, color: COLORS.accent2 },
  { name: "signalsFeedback", events: 13, accounts: 4, visitors: 7, color: COLORS.accent5 },
  { name: "signalsAgentMode", events: 0, accounts: 0, visitors: 0, color: COLORS.accent4 },
];

const dailyTrendData = [
  { day: "Mar 16", signalsLoaded: 33, signalsAction: 34 },
  { day: "Mar 17", signalsLoaded: 56, signalsAction: 79 },
  { day: "Mar 18", signalsLoaded: 164, signalsAction: 115 },
  { day: "Mar 19", signalsLoaded: 373, signalsAction: 66 },
  { day: "Mar 20", signalsLoaded: 297, signalsAction: 81 },
  { day: "Mar 21", signalsLoaded: 4, signalsAction: 0 },
  { day: "Mar 22", signalsLoaded: 15, signalsAction: 1 },
];

const keyInsights = [
  {
    title: "signalsLoaded dominates — 71% of all Signals activity",
    description: (
      <>
        {eventTag("signalsLoaded", "track")} fired 942 times across 240 visitors and 33 accounts — more than double the combined volume of all other Signals events (389 total). This is the entry point for the entire Signals funnel.
      </>
    ),
  },
  {
    title: "Only 40% of loads lead to action — a 60% drop-off",
    description: (
      <>
        {eventTag("signalsAction", "track")} fired 376 times vs. {eventTag("signalsLoaded", "track")}'s 942. This 40% conversion rate means the majority of users who load Signals don't engage further — indicating the initial Signals experience may not be compelling enough to drive immediate action.
      </>
    ),
  },
  {
    title: "signalsFeedback is nearly unused — only 1.4% of loads",
    description: (
      <>
        {eventTag("signalsFeedback", "track")} recorded just 13 events across 7 visitors and 4 accounts — representing only 1.4% of signalsLoaded volume. The feedback pathway is almost completely undiscovered or dismissed by users.
      </>
    ),
  },
  {
    title: "signalsAgentModeButton dropped from 50 to 0 this week",
    description: (
      <>
        {eventTag("signalsAgentModeButton", "track")} had 50 events across 9 visitors and 2 accounts in the prior week (Mar 9–15), but recorded zero events this week. This sharp decline needs investigation — a possible regression, visibility issue, or the button was removed/moved.
      </>
    ),
  },
];

const recommendations = [
  {
    title: "Investigate and fix the signalsAgentModeButton drop-off",
    description:
      "The complete absence of signalsAgentModeButton events this week (vs. 50 last week) is a significant signal of a potential regression or UX change. Audit recent deploys for changes to the Agent Mode button visibility or functionality. Restore access and monitor for recovery.",
  },
  {
    title: "Reduce the 60% load-to-action drop-off with guided prompts",
    description:
      "Only 40% of Signals loads convert to an action. Add contextual in-app guidance or tooltips immediately after signalsLoaded fires to surface what actions are available and why they're valuable. A short onboarding tooltip at first load could meaningfully improve action conversion.",
  },
  {
    title: "Surface the signalsFeedback pathway more prominently",
    description:
      "With only 13 feedback events (1.4% of loads) across 7 visitors, the feedback mechanism is essentially invisible. Consider surfacing a feedback prompt or CTA directly within the Signals surface after action — this is a missed opportunity to capture real-time user sentiment at peak engagement.",
  },
];

export default function SignalsDashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={styles.dateBadge}>Mar 16 – Mar 22, 2026 · Last 7 Days</div>
        <h1 style={styles.heroTitle}>Signals — Product Performance Dashboard</h1>
        <p style={styles.heroSub}>
          Signals saw 942 loads and 376 actions across 33 accounts and 240 visitors this week. The load-to-action conversion rate sits at 40%, signalsFeedback is critically underutilized at 1.4% of loads, and signalsAgentModeButton recorded zero events after 50 the prior week — warranting immediate investigation.
        </p>
      </div>

      <DropdownSection title="Adoption Overview" subText="Core engagement metrics for Signals track events · Mar 16–22, 2026" defaultOpen>
        <div style={styles.metricGrid}>
          <MetricCard title="signalsLoaded Events" value="942" badge={<Badge type="new">New Data</Badge>} description={<>Entry-point fires across {eventTag("signalsLoaded", "track")} · 33 accounts, 240 visitors · 7/7 days active</>} />
          <MetricCard title="signalsAction Events" value="376" badge={<Badge type="warning">40% of Loads</Badge>} description={<>User actions on {eventTag("signalsAction", "track")} · 6 accounts · 60% of loaded sessions went inactive</>} />
          <MetricCard title="signalsFeedback Events" value="13" badge={<Badge type="danger">1.4% of Loads</Badge>} description={<>Feedback fires on {eventTag("signalsFeedback", "track")} · Only 4 accounts, 7 visitors · Nearly invisible</>} />
          <MetricCard title="signalsAgentModeButton" value="0" badge={<Badge type="danger">↓ from 50</Badge>} description={<>{eventTag("signalsAgentModeButton", "track")} had 50 events last week · Zero this week · Requires investigation</>} />
        </div>
      </DropdownSection>

      <DropdownSection title="Signals Event Volume Breakdown" subText="Total events per track type · Mar 16–22 · Sorted by volume" defaultOpen>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={featureUsageData} layout="vertical" margin={{ left: 20, right: 30, top: 4, bottom: 4 }}>
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="name" type="category" width={160} tick={{ fontSize: 12, fontFamily: FONTS.mono }} />
            <Tooltip formatter={(v, n) => [v.toLocaleString(), n]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="events" radius={[0, 6, 6, 0]}>
              {featureUsageData.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div style={{ marginTop: SPACING.lg }}>
          <div style={styles.subheading}>Daily Trend — signalsLoaded vs signalsAction</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dailyTrendData} margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="signalsLoaded" fill={COLORS.accent1} radius={[4, 4, 0, 0]} />
              <Bar dataKey="signalsAction" fill={COLORS.accent2} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.insightFrame}>
          <AlertCircle size={18} color="#E67E22" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#92400E", marginBottom: 4 }}>
              Conversion Bottleneck: 60% of loads never reach action
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>
              signalsLoaded fired 942 times but signalsAction only reached 376 — a 60% drop-off. Peak load on Mar 19 (373 events) did not translate proportionally into actions (66 events that day), suggesting engagement quality declines as volume scales.
            </p>
          </div>
        </div>
      </DropdownSection>

      <DropdownSection title="Key Insights" subText="Data-driven findings for signalsLoaded, signalsAction, signalsFeedback, signalsAgentModeButton" defaultOpen>
        {keyInsights.map((insight, idx) => (
          <div key={idx} style={styles.insightBox}>
            <div style={styles.insightTitle}>{insight.title}</div>
            <p style={styles.insightDesc}>{insight.description}</p>
          </div>
        ))}
      </DropdownSection>

      <DropdownSection title="What We Suggest" subText="Actionable recommendations based on Signals data" defaultOpen>
        {recommendations.map((rec, idx) => (
          <div key={idx} style={{ ...styles.insightBox, background: "linear-gradient(221deg, #fff 50%, rgba(235,250,253,0.2) 95%)" }}>
            <div style={styles.insightTitle}>
              <span style={{ color: COLORS.primary, marginRight: 6 }}>→</span>
              {rec.title}
            </div>
            <p style={styles.insightDesc}>{rec.description}</p>
          </div>
        ))}
      </DropdownSection>

      <DropdownSection title="Supporting Data" subText="Direct links to target events in Pendo · Session replay & feedback notes" defaultOpen={false}>
        <div style={styles.subheading}>Target Events in Pendo</div>
        <ul style={styles.linkList}>
          {[
            { url: "https://app.pendo.io/s/5668600916475904/events/0jSRwCDMf7iYrT8-V_ksDPzZ1HA", text: "View signalsLoaded in Pendo →" },
            { url: "https://app.pendo.io/s/5668600916475904/events/mZrHYNEr8wK_xxwf-grZW2-XoIo", text: "View signalsAction in Pendo →" },
            { url: "https://app.pendo.io/s/5668600916475904/events/tI8E1c68zzWugu6ifE6NiT5dtYM", text: "View signalsFeedback in Pendo →" },
            { url: "https://app.pendo.io/s/5668600916475904/events/qmfKHfMMVMgmL4e13hHl96SLlT0", text: "View signalsAgentModeButton in Pendo →" },
          ].map((item, idx) => (
            <li key={idx} style={styles.linkItem}>
              <ArrowRight size={13} color={COLORS.primary} />
              <a href={item.url} target="_blank" rel="noreferrer" style={styles.linkAnchor}>{item.text}</a>
            </li>
          ))}
        </ul>

        <div style={{ ...styles.subheading, marginTop: SPACING.lg }}>Session Replays</div>
        <p style={styles.emptyState}>
          No session replays with frustration signals directly on signalsLoaded, signalsAction, signalsFeedback, or signalsAgentModeButton were found for this period.
        </p>

        <div style={{ ...styles.subheading, marginTop: SPACING.md }}>Feedback Items</div>
        <p style={styles.emptyState}>
          No feedback items in Pendo Listen directly mentioning signalsLoaded, signalsAction, signalsFeedback, or signalsAgentModeButton were found for Mar 16–22, 2026.
        </p>
      </DropdownSection>
    </div>
  );
}
