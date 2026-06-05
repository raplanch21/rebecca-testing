import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Lightbulb, RefreshCw, Zap, AlertCircle, ArrowRight, Users, Activity, Settings, MessageSquare, AlertTriangle, BookOpen, FileText, MousePointer2, ChevronDown, ChevronUp } from 'lucide-react';

// Shared style constants
const COLORS = {
  primary: '#2A2C35',
  secondary: '#6A6C75',
  border: '#DADCE5',
  background: '#FFFFFF',
  backgroundAlt: '#F0F1F5',
  warning: '#DD4600',
  error: '#8E0B00',
  success: '#005027',
  info: '#128297'
};

const FONTS = {
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'DM Mono', monospace"
};

const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '32px',
  xxxl: '40px'
};

// Reusable style objects
const styles = {
  heading: {
    fontFamily: FONTS.primary,
    fontWeight: '600',
    color: COLORS.primary,
    lineHeight: '1.35'
  },
  text: {
    fontFamily: FONTS.primary,
    fontWeight: '400',
    color: COLORS.secondary,
    lineHeight: '1.5'
  },
  dropdownButton: {
    width: '100%',
    padding: '0',
    paddingLeft: SPACING.lg,
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: FONTS.primary,
    fontSize: '16px',
    fontWeight: '600',
    color: COLORS.primary,
    lineHeight: '1.35',
    textAlign: 'left'
  },
  chevronWrapper: {
    marginLeft: '-30px',
    marginRight: SPACING.md,
    flexShrink: 0
  },
  subText: {
    fontFamily: FONTS.primary,
    fontSize: '14.222px',
    fontWeight: '400',
    color: COLORS.secondary,
    lineHeight: '1.5',
    margin: '0',
    paddingLeft: SPACING.lg
  }
};

// Reusable Dropdown Section Component
const DropdownSection = ({ 
  isOpen, 
  onToggle, 
  title, 
  subText, 
  children, 
  paddingTop = SPACING.lg,
  paddingBottom 
}) => (
  <section style={{
    display: 'flex',
    flexDirection: 'column',
    paddingTop,
    paddingBottom: paddingBottom || (isOpen ? SPACING.xxxl : SPACING.lg),
    gap: isOpen ? SPACING.lg : '0'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isOpen ? SPACING.xs : '0'
    }}>
      <button onClick={onToggle} style={styles.dropdownButton}>
        <span style={styles.chevronWrapper}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
        <span>{title}</span>
      </button>

      {isOpen && subText && (
        <p style={styles.subText}>{subText}</p>
      )}
    </div>

    {isOpen && children}
  </section>
);

// Metric Card Component
const MetricCard = ({ title, value, badge, description }) => (
  <div style={{
    backgroundColor: COLORS.background,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '5px',
    padding: SPACING.lg
  }}>
    <div style={{
      ...styles.heading,
      fontSize: '14px',
      marginBottom: SPACING.xs
    }}>
      {title}
    </div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md,
      marginBottom: SPACING.xs
    }}>
      <div style={{
        ...styles.heading,
        fontSize: '28px',
        fontWeight: '700',
        color: '#1C1D23',
        lineHeight: '1.2'
      }}>
        {value}
      </div>
      {badge}
    </div>
    <p style={{
      ...styles.text,
      fontSize: '14px',
      margin: '0'
    }}>
      {description}
    </p>
  </div>
);

// Badge Component
const Badge = ({ children, type = 'neutral' }) => {
  const bgColors = {
    warning: '#FFE8D2',
    success: '#E3F7ED',
    neutral: COLORS.backgroundAlt
  };
  const textColors = {
    warning: COLORS.error,
    success: COLORS.success,
    neutral: COLORS.primary
  };

  return (
    <div style={{
      ...styles.heading,
      fontSize: '12.6px',
      padding: '4px 8px',
      borderRadius: '3px',
      lineHeight: '1.5',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      background: bgColors[type],
      color: textColors[type]
    }}>
      {children}
    </div>
  );
};

// Entity Icon Helper
const entityIcon = (type) => {
  const iconProps = { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  
  if (type === 'feature') {
    return (
      <svg {...iconProps}>
        <path d="M12.586 12.586 19 19"/>
        <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"/>
      </svg>
    );
  }
  
  if (type === 'page') {
    return (
      <svg {...iconProps}>
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
      </svg>
    );
  }
  
  return null;
};

// Event Tag Helper
const eventTag = (name, type = 'feature') => (
  <code style={{
    fontFamily: FONTS.mono,
    fontSize: '12.5px',
    fontWeight: '300',
    backgroundColor: COLORS.backgroundAlt,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '3px',
    padding: '2px 6px',
    whiteSpace: 'nowrap',
    color: COLORS.primary,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    verticalAlign: 'baseline'
  }}>
    {entityIcon(type)}
    <span>{name}</span>
  </code>
);

function AgentAnalyticsInsights() {
  const [showFeatureUsage, setShowFeatureUsage] = useState(false);
  const [showKeyInsights, setShowKeyInsights] = useState(false);
  const [showFeedbackThemes, setShowFeedbackThemes] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSupportingData, setShowSupportingData] = useState(false);

  const featureUsageData = [
    { name: 'Use Cases Tab', events: 1725, accounts: 172, visitors: 377, color: '#4570E0' },
    { name: 'Clickable Table Cells', events: 1691, accounts: 99, visitors: 206, color: '#128297' },
    { name: 'Conversations Tab', events: 1456, accounts: 86, visitors: 259, color: '#00B87C' },
    { name: 'Add an Agent', events: 1152, accounts: 531, visitors: 649, color: '#DD4600' },
    { name: 'Agent Settings', events: 735, accounts: 135, visitors: 206, color: '#791e77' }
  ];

  const keyInsights = [
    {
      title: 'Use Cases Tab leads feature engagement with 1,725 events from 172 accounts',
      description: <>The {eventTag('Use Cases Tab', 'feature')} shows the highest feature-level engagement, indicating customers are actively leveraging tracked use cases to understand AI agent interactions. However, feedback reveals customers find the grouping "random and not very helpful," suggesting the AI-powered clustering needs accuracy improvements.</>
    },
    {
      title: 'Conversations Tab engagement shows 1,456 events but faces UX challenges',
      description: <>The {eventTag('Conversations Tab', 'feature')} has 1,456 events from 86 accounts, but customers report significant challenges with multi-turn conversation monitoring. Users explicitly request better tools to annotate, export, and share conversations with their teams, particularly for communicating findings to engineers who lack Pendo access.</>
    },
    {
      title: 'Add an Agent feature has broadest reach with 649 unique visitors but data collection failures are blocking adoption',
      description: <>The {eventTag('Add an Agent', 'feature')} shows the widest reach (649 visitors from 531 accounts), indicating strong interest in agent analytics setup. However, multiple customers report critical data collection failures: "data is not collected despite multiple attempts to tag the agent" and "agent analytics show no activity since mid-December, but this is not the case."</>
    },
    {
      title: 'Low Activate Conversations adoption (16 events from 11 accounts) suggests barriers to full conversation capture',
      description: <>Only 16 events for {eventTag('Activate Conversations', 'feature')} from 11 accounts, compared to 735 events for Agent Settings, suggests most customers remain in prompts-only mode. This could indicate setup complexity, lack of awareness, or concerns about sensitive data collection.</>
    },
    {
      title: 'Save Report feature shows minimal usage (67 events from 28 accounts)',
      description: <>The {eventTag('Save a Report', 'feature')} has only 67 events from 28 accounts, suggesting reports either meet immediate needs without saving, or lack features that would make them worth saving for ongoing monitoring.</>
    },
    {
      title: 'Agent Analytics API access is a critical unmet need for data warehouse integration',
      description: <>Customers explicitly request "Add Agent Analytics metrics into the Pendo API please" to enable merging AI agent analytics with external data warehouses. This is described as urgent and will "determine whether or not they renew" as they currently supplement Pendo with tools like DataDog for this functionality.</>
    }
  ];

  return (
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '32px 48px',
      paddingBottom: SPACING.xxl,
      fontFamily: FONTS.primary,
      backgroundColor: COLORS.background,
      minHeight: '100vh'
    }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        
        {/* Hero Section */}
        <section style={{ paddingLeft: SPACING.lg, marginBottom: SPACING.xxxl }}>
          <h1 style={{
            ...styles.heading,
            fontSize: '24px',
            marginBottom: SPACING.md
          }}>
            Agent Analytics - Product performance dashboard
          </h1>
          <p style={{
            ...styles.text,
            fontSize: '14px',
            maxWidth: '720px',
            marginBottom: SPACING.lg
          }}>
            Agent Analytics shows strong adoption with 18,347 page events from 2,262 unique accounts in the last 30 days. The Conversations Tab and Use Cases Tab are seeing healthy engagement (1,456 and 1,725 events respectively), though critical feedback reveals significant opportunities to improve data collection reliability, use case clustering accuracy, and conversation management tools.
          </p>
          <div style={{
            display: 'inline-flex',
            padding: '6px 12px',
            backgroundColor: COLORS.backgroundAlt,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '4px',
            fontSize: '13px',
            color: COLORS.primary
          }}>
            Jan 18 – Feb 17, 2026
          </div>
        </section>

        {/* Key Metrics Grid */}
        <section style={{ marginBottom: SPACING.xxxl }}>
          <h2 style={{
            ...styles.heading,
            fontSize: '16px',
            margin: `0 0 ${SPACING.xl} 0`,
            paddingLeft: SPACING.lg
          }}>
            Adoption overview
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.lg
          }}>
            <MetricCard
              title="Total page events"
              value="18,347"
              badge={<Badge type="success">+35%</Badge>}
              description="Events across all Agent Analytics pages, showing strong and growing adoption"
            />

            <MetricCard
              title="Unique accounts"
              value="2,262"
              badge={<Badge type="success">+28%</Badge>}
              description="Accounts actively using Agent Analytics in the last 30 days"
            />

            <MetricCard
              title="Feature engagement"
              value="6,911"
              badge={<Badge type="success">+22%</Badge>}
              description={<>Combined events across {eventTag('Conversations Tab', 'feature')}, {eventTag('Use Cases Tab', 'feature')}, and other key features</>}
            />

            <MetricCard
              title="Agent setup activity"
              value="221"
              badge={<Badge type="success">+18%</Badge>}
              description="AI agent setup events, indicating growing interest in deploying conversational agents"
            />
          </div>
        </section>

        {/* Feature Usage Chart */}
        <DropdownSection
          isOpen={showFeatureUsage}
          onToggle={() => setShowFeatureUsage(!showFeatureUsage)}
          title="Feature usage breakdown"
          subText="Top 5 agent analytics features by event volume (last 30 days)"
          paddingTop="0px"
        >
          <div style={{
            backgroundColor: COLORS.background,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: SPACING.lg }}>
              {featureUsageData.map((item, idx) => {
                const maxEvents = Math.max(...featureUsageData.map(d => d.events));
                const widthPercent = (item.events / maxEvents) * 100;
                
                return (
                  <div key={idx} style={{ marginBottom: idx === featureUsageData.length - 1 ? SPACING.md : SPACING.lg }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: SPACING.xs
                    }}>
                      <span style={{
                        ...styles.text,
                        fontSize: '13px',
                        fontWeight: '600',
                        color: COLORS.primary
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        ...styles.text,
                        fontSize: '13px',
                        fontWeight: '600',
                        color: COLORS.primary
                      }}>
                        {item.events.toLocaleString()} events
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: COLORS.backgroundAlt,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: SPACING.xs
                    }}>
                      <div style={{
                        width: `${widthPercent}%`,
                        height: '100%',
                        backgroundColor: item.color,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{
                      ...styles.text,
                      fontSize: '12px'
                    }}>
                      {item.accounts.toLocaleString()} accounts • {item.visitors.toLocaleString()} visitors
                    </div>
                  </div>
                );
              })}
              <p style={{
                ...styles.text,
                fontSize: '13px',
                marginTop: SPACING.xs
              }}>
                Use Cases Tab leads with 1,725 events, followed closely by Clickable Table Cells (1,691) and Conversations Tab (1,456). Add an Agent shows the broadest reach with 649 unique visitors, while Conversations Tab has the highest visitor-to-account ratio (3:1), suggesting individual users are exploring conversations multiple times.
              </p>
            </div>
            
            {/* Insight Frame */}
            <div style={{
              display: 'flex',
              gap: SPACING.md,
              alignItems: 'flex-start',
              padding: SPACING.lg,
              borderTop: `1px dashed ${COLORS.border}`
            }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                <AlertCircle size={16} color={COLORS.warning} />
              </div>
              <div>
                <div style={{
                  ...styles.heading,
                  fontSize: '14px',
                  marginBottom: SPACING.xs
                }}>
                  Conversation activation remains low despite high setup interest
                </div>
                <p style={{
                  ...styles.text,
                  fontSize: '14px',
                  margin: '0'
                }}>
                  While 1,152 events show users adding agents and 735 events show settings access, only 16 events for "Activate Conversations" suggests a significant drop-off. This 1.4% activation rate indicates either setup complexity, lack of awareness about conversation capture benefits, or concerns about collecting sensitive data.
                </p>
              </div>
            </div>
          </div>
        </DropdownSection>

        {/* Key Insights */}
        <DropdownSection
          isOpen={showKeyInsights}
          onToggle={() => setShowKeyInsights(!showKeyInsights)}
          title="Key insights"
          subText="Here are some key insights based on your data"
        >
          <div style={{
            background: 'linear-gradient(221deg, rgb(255, 255, 255) 50.5%, rgba(235, 250, 253, 0.2) 94.8%)',
            border: '1px solid rgba(0, 81, 100, 0.1)',
            borderRadius: '6px',
            padding: SPACING.lg,
            boxShadow: '0px 1.806px 18.06px 0px rgba(1, 100, 121, 0.1)'
          }}>
            {keyInsights.map((insight, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  paddingTop: idx === 0 ? '0' : SPACING.lg,
                  paddingBottom: idx === keyInsights.length - 1 ? '0' : SPACING.lg,
                  borderBottom: idx === keyInsights.length - 1 ? 'none' : '1px solid #EAECF1'
                }}
              >
                <div style={{
                  ...styles.heading,
                  fontSize: '14.222px'
                }}>
                  {insight.title}
                </div>
                <div style={{
                  ...styles.text,
                  fontSize: '14.222px',
                  color: COLORS.primary
                }}>
                  {insight.description}
                </div>
              </div>
            ))}
          </div>
        </DropdownSection>

        {/* Critical Feedback Themes */}
        <DropdownSection
          isOpen={showFeedbackThemes}
          onToggle={() => setShowFeedbackThemes(!showFeedbackThemes)}
          title="Critical feedback themes"
          subText="Top user friction points from feedback analysis"
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: SPACING.lg
          }}>
            {[
              {
                icon: <AlertTriangle size={16} color={COLORS.error} />,
                title: 'Data collection reliability failures',
                description: 'Multiple customers report "data is not collected, tried several times to tag the agent" and "agent analytics show no activity since mid-December, but this is not the case." This critical issue is blocking adoption and causing data discrepancies, including inaccurate conversation counts due to conversation IDs not changing between sessions.'
              },
              {
                icon: <Activity size={16} color={COLORS.warning} />,
                title: 'Use case grouping accuracy issues',
                description: 'Customers find the AI-powered use case clustering "random and not very helpful," requesting more granular and accurate categorization of prompts. The current grouping doesn\'t accurately reflect actual conversation topics, reducing the value of the Use Cases Tab despite its high engagement (1,725 events).'
              },
              {
                icon: <MessageSquare size={16} color={COLORS.warning} />,
                title: 'Conversation management and collaboration gaps',
                description: 'Users struggle with multi-turn conversation monitoring and explicitly request tools to annotate, highlight, export, and share conversations with team members. Current tools don\'t provide good UX for monitoring conversations, and customers need to communicate findings to engineers who lack Pendo access.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                padding: SPACING.lg
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.sm,
                  marginBottom: SPACING.sm
                }}>
                  {item.icon}
                  <span style={{
                    ...styles.heading,
                    fontSize: '14px'
                  }}>
                    {item.title}
                  </span>
                </div>
                <p style={{
                  ...styles.text,
                  fontSize: '14px',
                  margin: '0'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </DropdownSection>

        {/* Recommendations */}
        <DropdownSection
          isOpen={showSuggestions}
          onToggle={() => setShowSuggestions(!showSuggestions)}
          title="What we suggest..."
          subText="Here are some recommended actions based on your insights"
        >
          <div style={{
            background: 'linear-gradient(221deg, rgb(255, 255, 255) 50.5%, rgba(235, 250, 253, 0.2) 94.8%)',
            border: '1px solid rgba(0, 81, 100, 0.1)',
            borderRadius: '6px',
            padding: SPACING.lg,
            boxShadow: '0px 1.806px 18.06px 0px rgba(1, 100, 121, 0.1)'
          }}>
            {[
              {
                title: 'Fix data collection reliability and implement proactive monitoring',
                description: 'Address the critical "data not collected" issue blocking multiple customers. Implement better error messaging during agent setup, add validation checks to detect collection failures early, and provide proactive monitoring alerts when data stops flowing. This is the highest priority issue impacting customer trust and adoption.'
              },
              {
                title: 'Improve use case clustering accuracy and allow manual customization',
                description: 'Enhance the AI-powered use case grouping algorithm to provide more meaningful, accurate categorization of prompts. Consider allowing customers to manually adjust or create custom use case categories, and provide transparency into how prompts are being grouped so users can understand and trust the clustering.'
              },
              {
                title: 'Build conversation management and collaboration tools',
                description: 'Add annotation, highlighting, and export capabilities for conversations. Enable team collaboration by allowing users to share specific conversations with context notes, improve the multi-turn conversation viewing experience, and provide better tools for communicating findings to stakeholders who don\'t have direct Pendo access.'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  paddingTop: idx === 0 ? '0' : SPACING.lg,
                  paddingBottom: idx === 2 ? '0' : SPACING.lg,
                  borderBottom: idx === 2 ? 'none' : '1px solid #EAECF1'
                }}
              >
                <div style={{
                  ...styles.heading,
                  fontSize: '14.222px'
                }}>
                  {item.title}
                </div>
                <div style={{
                  ...styles.text,
                  fontSize: '14.222px',
                  color: COLORS.primary
                }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </DropdownSection>

        {/* Supporting Data (Optional) */}
        <DropdownSection
          isOpen={showSupportingData}
          onToggle={() => setShowSupportingData(!showSupportingData)}
          title="Supporting data"
          subText="Session replays and feedback showing user friction"
        >
          <>
            <div style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: SPACING.lg,
              marginBottom: SPACING.xl
            }}>
              <h3 style={{
                ...styles.heading,
                fontSize: '14px',
                margin: `0 0 ${SPACING.lg} 0`,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.sm
              }}>
                <BookOpen size={16} color={COLORS.info} />
                Target Events in Pendo
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  { url: 'https://app.pendo.io/s/5668600916475904/features/6uTCXRKFhqYka_gTaHv5zytCMkA', text: 'View Conversations Tab in Pendo' },
                  { url: 'https://app.pendo.io/s/5668600916475904/features/kt-CzqT42bo8zws_6oh5fjLNyXg', text: 'View Use Cases Tab in Pendo' },
                  { url: 'https://app.pendo.io/s/5668600916475904/pages/1_wmJXcPuVS7xZZkXxIHhtGhYEc', text: 'View Agent Analytics List Page in Pendo' },
                  { url: 'https://app.pendo.io/s/5668600916475904/pages/8W91uPVtQnFONEjOpHtXQziS6k4', text: 'View Analyze Report Page in Pendo' },
                  { url: 'https://app.pendo.io/s/5668600916475904/features/4oOXT6-vtWW-gB6s5jmnVmrlLuw', text: 'View Add an Agent in Pendo' }
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: idx === 4 ? SPACING.sm : SPACING.md }}>
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        color: COLORS.info,
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        lineHeight: '1'
                      }}
                    >
                      <span style={{ lineHeight: '1' }}>•</span>
                      <span style={{ lineHeight: '1.5' }}>{item.text}</span>
                      <ArrowRight size={14} style={{ flexShrink: 0 }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: SPACING.lg,
              marginBottom: SPACING.xl
            }}>
              <h3 style={{
                ...styles.heading,
                fontSize: '14px',
                margin: `0 0 ${SPACING.lg} 0`,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.sm
              }}>
                <Activity size={16} color={COLORS.info} />
                Session replays with frustration
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/PZEH5NeLACLG3WOY', text: 'pendo-internal - 3 rage clicks, 1 dead click (1m 28s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/95g9kkjXhcVxj0wH', text: 'ServiceTrade - 1 rage click, 1 u-turn (1m 38s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/kx5IsfErKzVPYvzL', text: 'LexisNexis_PS_Plus - 1 u-turn (2m 40s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/tB2vUygsc8c91jYZ', text: 'ChannelAdvisor_Corporati - 1 dead click (1m 13s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/7yXqDHUlGLGhcvq0', text: 'Curriculum_Associates - 1 dead click (1m 13s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/YKyqM2K4hpvkaWmx', text: 'Palo_Alto_Networks2 - 1 dead click (3m 17s)' },
                  { url: 'https://app.pendo.io/s/5668600916475904/replay/player/jYTemjf7WM6IegMz', text: 'BillSpring - 1 rage click (3m 20s)' }
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: idx === 2 ? SPACING.sm : SPACING.md }}>
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        color: COLORS.info,
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        lineHeight: '1'
                      }}
                    >
                      <span style={{ lineHeight: '1' }}>•</span>
                      <span style={{ lineHeight: '1.5' }}>{item.text}</span>
                      <ArrowRight size={14} style={{ flexShrink: 0 }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              backgroundColor: COLORS.background,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '8px',
              padding: SPACING.lg
            }}>
              <h3 style={{
                ...styles.heading,
                fontSize: '14px',
                margin: `0 0 ${SPACING.lg} 0`,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.sm
              }}>
                <MessageSquare size={16} color={COLORS.info} />
                Qualitative feedback items
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Difficulty setting up agent analytics - Data not collected despite multiple tagging attempts' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Agent analytics data discrepancy - Shows no activity since mid-December but data exists' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Use case grouping seems random - Need more granular categorization' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Need to annotate conversations - Want to highlight and share with team' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Add Agent Analytics to Pendo API - Critical for data warehouse integration' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Inaccurate conversation count - Conversation IDs not changing properly' },
                  { url: 'https://app.pendo.io/s/5668600916475904/listen/feedback', text: 'Separate roles for agent analytics - Manage agents vs view raw data permissions' }
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: idx === 6 ? '0' : SPACING.sm }}>
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        color: COLORS.info,
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        lineHeight: '1'
                      }}
                    >
                      <span style={{ lineHeight: '1' }}>•</span>
                      <span style={{ lineHeight: '1.5' }}>{item.text}</span>
                      <ArrowRight size={14} style={{ flexShrink: 0 }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        </DropdownSection>
        
      </div>
    </div>
  );
}

export default AgentAnalyticsInsights;
