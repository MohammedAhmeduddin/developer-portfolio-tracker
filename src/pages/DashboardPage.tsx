// src/pages/DashboardPage.tsx
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { getDevelopersMock, getSkillCounts } from "../mockApi";
import type { Developer, Skill } from "../types";

type StatCard = {
  label: string;
  value: number;
  icon: string;
};

function DashboardPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [skillCounts, setSkillCounts] = useState<Record<Skill, number> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false;
  });


  // 👇 add these two lines
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn"); // or set to "false"
    navigate("/login", { replace: true });
  }


  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const devs = await getDevelopersMock();
      setDevelopers(devs);
      setSkillCounts(getSkillCounts(devs));
      setIsLoading(false);
    }
    load();
  }, []);

  const totalDevs = developers.length;
  const proDevs = developers.filter((d) => d.isProfessional).length;
  const totalSkills = skillCounts
    ? Object.values(skillCounts).reduce((a, b) => a + b, 0)
    : 0;
  const uniqueSkills = skillCounts ? Object.keys(skillCounts).length : 0;

  // Pie chart: Pro vs Non-Pro
  const pieData = useMemo(
    () => [
      { name: "Professional", value: proDevs },
      { name: "Non-professional", value: Math.max(totalDevs - proDevs, 0) },
    ],
    [totalDevs, proDevs]
  );

  // Bar chart: skills vs dev count
  const barData = useMemo(
    () =>
      skillCounts
        ? Object.entries(skillCounts).map(([skill, count]) => ({
            name: skill,
            value: count,
          }))
        : [],
    [skillCounts]
  );

  const styles = getStyles(isDark);

  const STAT_CARDS: StatCard[] = [
    {
      label: "Total Developers",
      value: totalDevs,
      icon: "👥",
    },
    {
      label: "Professional Developers",
      value: proDevs,
      icon: "💼",
    },
    {
      label: "Total Skill Tags",
      value: totalSkills,
      icon: "🧠",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoCircle}>💻</div>
          <div>
            <div style={styles.appName}>Dev Portfolio</div>
            <div style={styles.appSubtitle}>Internal dashboard</div>
          </div>
        </div>

        <nav style={styles.navSection}>
          <div style={styles.navLabel}>Overview</div>
          <Link to="/dashboard" style={styles.navItemActive}>
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/developers" style={styles.navItem}>
            <span>👥</span>
            <span>Developers</span>
          </Link>
          <Link to="/developers/new" style={styles.navItem}>
            <span>➕</span>
            <span>Add Developer</span>
          </Link>
        </nav>

        <div style={styles.sidebarFooter}>
          <span style={styles.footerText}>Signed in as</span>
          <span style={styles.footerEmail}>admin@example.com</span>
        </div>
      </aside>

      {/* Main content */}
      <div style={styles.mainOuter}>
        <div style={styles.mainInner}>
          {/* Top bar */}
          <header style={styles.topBar}>
            <div>
              <h1 style={styles.heading}>Dashboard</h1>
              <p style={styles.headingSub}>
                High-level overview of your developer portfolio.
              </p>
            </div>

            <div style={styles.topBarRight}>
              <button
                type="button"
                style={styles.toggleBtn}
                onClick={() => setIsDark((v) => !v)}
              >
                {isDark ? "🌙 Dark" : "☀️ Light"}
              </button>
               {/* 👇 new logout button */}
              <button
                type="button"
                 style={styles.logoutBtn}
                onClick={handleLogout}
               >
                   Logout
               </button>
            </div>
          </header>

          {/* Stat cards */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Overview</h2>
              {!isLoading && (
                <span style={styles.sectionHint}>
                  {totalDevs} developers • {uniqueSkills} unique skills
                </span>
              )}
            </div>

            {isLoading ? (
              <div style={styles.statsGrid}>
                {[1, 2, 3].map((key) => (
                  <div key={key} style={styles.statCard}>
                    <div style={styles.skeletonBlock} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.statsGrid}>
                {STAT_CARDS.map((card) => (
                  <div key={card.label} style={styles.statCard}>
                    <div style={styles.statIcon}>{card.icon}</div>
                    <div style={styles.statLabel}>{card.label}</div>
                    <div style={styles.statValue}>{card.value}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Charts */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Insights</h2>
              {!isLoading && (
                <span style={styles.sectionHint}>
                  Professional vs non-professional & skill distribution.
                </span>
              )}
            </div>

            <div style={styles.chartsGrid}>
              {/* Pie chart */}
              <div style={styles.chartCard}>
                <div style={styles.chartTitleRow}>
                  <h3 style={styles.chartTitle}>Professional Mix</h3>
                  <span style={styles.chartBadge}>Pie</span>
                </div>
                {isLoading ? (
                  <div style={styles.chartSkeleton} />
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                        isAnimationActive
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={
                              index === 0
                                ? isDark
                                  ? "#22c55e"
                                  : "#16a34a"
                                : isDark
                                ? "#4b5563"
                                : "#9ca3af"
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={styles.tooltip}
                        labelStyle={styles.tooltipLabel}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Bar chart */}
              <div style={styles.chartCard}>
                <div style={styles.chartTitleRow}>
                  <h3 style={styles.chartTitle}>Skills per Developer</h3>
                  <span style={styles.chartBadge}>Bar</span>
                </div>
                {isLoading ? (
                  <div style={styles.chartSkeleton} />
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={barData} margin={{ left: -20 }}>
                      <CartesianGrid
                        stroke={isDark ? "#1f2937" : "#e5e7eb"}
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: styles.axisColor.color }}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: styles.axisColor.color }}
                      />
                      <Tooltip
                        contentStyle={styles.tooltip}
                        labelStyle={styles.tooltipLabel}
                      />
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                        fill={isDark ? "#60a5fa" : "#2563eb"}
                        isAnimationActive
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </section>

          {/* Call-to-action */}
          <section style={styles.section}>
            <div style={styles.bottomCta}>
              <div>
                <h3 style={styles.bottomTitle}>Grow your portfolio</h3>
                <p style={styles.bottomText}>
                  Keep this dashboard up to date by adding new developers and
                  tracking professional status over time.
                </p>
              </div>
              <Link to="/developers/new" style={styles.linkBtn}>
                + Add Developer
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function getStyles(isDark: boolean): Record<string, React.CSSProperties> {
  const bg = isDark ? "#020617" : "#f3f4f6";
  const sidebarBg = isDark ? "#020617" : "#ffffff";
  const sidebarBorder = isDark ? "#111827" : "#e5e7eb";
  const mainBg = isDark ? "#020617" : "#f9fafb";
  const cardBg = isDark ? "#020617" : "#ffffff";
  const textPrimary = isDark ? "#f9fafb" : "#111827";
  const textSecondary = isDark ? "#9ca3af" : "#4b5563";

  return {
    page: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      backgroundColor: bg,
      color: textPrimary,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, system-ui, -apple-system, Helvetica, Arial, sans-serif",
      overflowX: "hidden",
    },


    // Sidebar
    sidebar: {
      width: "240px",
      minHeight: "100vh",
      padding: "20px 18px",
      backgroundColor: sidebarBg,
      borderRight: `1px solid ${sidebarBorder}`,
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      position: "sticky",
      top: 0,
    },
    sidebarHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "8px",
    },
    logoCircle: {
      width: "34px",
      height: "34px",
      borderRadius: "999px",
      background:
        "linear-gradient(135deg, #2563eb 0%, #22c55e 50%, #a855f7 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
    },
    appName: {
      fontSize: "16px",
      fontWeight: 600,
    },
    appSubtitle: {
      fontSize: "11px",
      color: textSecondary,
    },
    navSection: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    navLabel: {
      fontSize: "11px",
      textTransform: "uppercase",
      color: textSecondary,
      letterSpacing: "0.06em",
      marginBottom: "4px",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "13px",
      textDecoration: "none",
      color: textSecondary,
      cursor: "pointer",
      border: "1px solid transparent",
      transition: "0.15s ease",
    },
    navItemActive: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 10px",
      borderRadius: "999px",
      fontSize: "13px",
      textDecoration: "none",
      cursor: "pointer",
      border: "1px solid rgba(37,99,235,0.5)",
      backgroundColor: isDark ? "rgba(37,99,235,0.18)" : "#dbeafe",
      color: isDark ? "#e5e7eb" : "#111827",
    },
    sidebarFooter: {
      marginTop: "auto",
      fontSize: "11px",
      color: textSecondary,
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    footerText: {},
    footerEmail: {
      fontFamily: "monospace",
      fontSize: "11px",
    },

    // Main outer (fills rest of screen)
    mainOuter: {
      flex: 1,
      backgroundColor: mainBg,
      display: "flex",
      justifyContent: "center",
    },

    // Main inner (max-width container)
    mainInner: {
      width: "100%",
      maxWidth: "1200px",
      padding: "24px 32px 32px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },

    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "4px",
      gap: "16px",
    },
    heading: {
      fontSize: "26px",
      margin: 0,
    },
    headingSub: {
      margin: 0,
      marginTop: "4px",
      fontSize: "13px",
      color: textSecondary,
    },
    topBarRight: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    toggleBtn: {
      padding: "6px 12px",
      borderRadius: "999px",
      border: `1px solid ${sidebarBorder}`,
      backgroundColor: cardBg,
      color: textPrimary,
      fontSize: "12px",
      cursor: "pointer",
    },
    logoutBtn: {
      padding: "6px 12px",
      borderRadius: "999px",
      border: "none",
      backgroundColor: "#dc2626",
      color: "#ffffff",
      fontSize: "12px",
      cursor: "pointer",
    },

    // Sections
    section: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
      justifyContent: "space-between",
    },
    sectionTitle: {
      margin: 0,
      fontSize: "18px",
    },
    sectionHint: {
      fontSize: "12px",
      color: textSecondary,
    },

    // Stats
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "14px",
    },
    statCard: {
      backgroundColor: cardBg,
      borderRadius: "14px",
      padding: "16px 16px 14px",
      border: `1px solid ${sidebarBorder}`,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    statIcon: {
      fontSize: "20px",
    },
    statLabel: {
      fontSize: "13px",
      color: textSecondary,
    },
    statValue: {
      fontSize: "26px",
      fontWeight: 600,
    },
    skeletonBlock: {
      height: "52px",
      borderRadius: "10px",
      background: isDark
        ? "linear-gradient(90deg,#111827,#1f2937,#111827)"
        : "linear-gradient(90deg,#e5e7eb,#f3f4f6,#e5e7eb)",
      animation: "pulse 1.3s ease-in-out infinite",
    },

    // Charts
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "16px",
    },
    chartCard: {
      backgroundColor: cardBg,
      borderRadius: "14px",
      padding: "16px",
      border: `1px solid ${sidebarBorder}`,
      minHeight: "260px",
      display: "flex",
      flexDirection: "column",
    },
    chartTitleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    chartTitle: {
      fontSize: "15px",
      margin: 0,
    },
    chartBadge: {
      fontSize: "11px",
      padding: "3px 8px",
      borderRadius: "999px",
      backgroundColor: isDark ? "#111827" : "#e5e7eb",
      color: textSecondary,
    },
    chartSkeleton: {
      flex: 1,
      borderRadius: "10px",
      background: isDark
        ? "linear-gradient(90deg,#111827,#1f2937,#111827)"
        : "linear-gradient(90deg,#e5e7eb,#f3f4f6,#e5e7eb)",
      animation: "pulse 1.3s ease-in-out infinite",
    },
    tooltip: {
      backgroundColor: cardBg,
      border: `1px solid ${sidebarBorder}`,
      fontSize: "11px",
    },
    tooltipLabel: {
      fontSize: "11px",
      color: textSecondary,
    },
    axisColor: {
      color: textSecondary,
    },

    // Bottom CTA
    bottomCta: {
      backgroundColor: cardBg,
      borderRadius: "14px",
      padding: "18px 18px",
      border: `1px solid ${sidebarBorder}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap",
    },
    bottomTitle: {
      margin: 0,
      fontSize: "16px",
    },
    bottomText: {
      margin: "6px 0 0 0",
      fontSize: "13px",
      color: textSecondary,
      maxWidth: "420px",
    },
    linkBtn: {
      padding: "10px 16px",
      borderRadius: "999px",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 500,
      whiteSpace: "nowrap",
    },
  };
}

export default DashboardPage;
