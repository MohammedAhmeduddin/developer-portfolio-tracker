// src/pages/DeveloperListPage.tsx
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDevelopersMock, deleteDeveloperMock } from "../mockApi";
import type { Developer, Skill } from "../types";
import Toast from "../components/Toast";

const ALL_SKILLS: (Skill | "All")[] = [
  "All",
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "SQL",
  "Docker",
];

function DeveloperListPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState<Skill | "All">("All");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getDevelopersMock();

        // Artificial delay so skeletons are visible
        await new Promise((resolve) => setTimeout(resolve, 700));

        setDevelopers(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const totalDevs = developers.length;
  const proDevs = developers.filter((d) => d.isProfessional).length;

  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev) => {
      const q = search.toLowerCase();

      const matchesSearch =
        dev.name.toLowerCase().includes(q) ||
        dev.title.toLowerCase().includes(q) ||
        dev.email.toLowerCase().includes(q);

      const matchesSkill =
        skillFilter === "All" || dev.skills.includes(skillFilter);

      return matchesSearch && matchesSkill;
    });
  }, [developers, search, skillFilter]);

  async function handleDelete(id: number, name: string) {
    const ok = window.confirm(`Delete developer "${name}"?`);
    if (!ok) return;

    await deleteDeveloperMock(id);
    setDevelopers((prev) => prev.filter((d) => d.id !== id));
    setToast(`Deleted developer "${name}"`);
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        {/* Back to dashboard */}
        <button
          type="button"
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* Header row */}
        <header style={styles.headerRow}>
          <div>
            <h1 style={styles.heading}>Developers</h1>
            <p style={styles.subtitle}>
              Browse, search, and manage your developer portfolio.
            </p>
          </div>

          <Link to="/developers/new" style={styles.addButton}>
            + Add Developer
          </Link>
        </header>

        {/* Tiny summary row */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Total developers</span>
            <span style={styles.summaryValue}>{totalDevs}</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Professional</span>
            <span style={styles.summaryValue}>{proDevs}</span>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filtersRow}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, title, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.selectWrapper}>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value as Skill | "All")}
              style={styles.select}
            >
              {ALL_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill === "All" ? "All skills" : skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List + Skeletons */}
        <div style={styles.list}>
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} style={styles.cardSkeleton} />
              ))}
            </>
          ) : filteredDevelopers.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyTitle}>No developers match your filters.</p>
              <p style={styles.emptyText}>
                Try adjusting your search or skill filter, or add a new
                developer.
              </p>
            </div>
          ) : (
            filteredDevelopers.map((dev) => (
              <article key={dev.id} style={styles.card}>
                <Link to={`/developers/${dev.id}`} style={styles.cardMain}>
                  <div style={styles.cardTopRow}>
                    <h2 style={styles.name}>
                      {dev.name || dev.title || "Developer"}
                    </h2>
                    {dev.isProfessional && (
                      <span style={styles.badge}>Pro</span>
                    )}
                  </div>

                  <div style={styles.metaRow}>
                    <span style={styles.metaText}>{dev.title}</span>
                    {dev.location && (
                      <span style={styles.metaMuted}>{dev.location}</span>
                    )}
                    <span style={styles.metaMuted}>{dev.email}</span>
                  </div>

                  <div style={styles.skillsRow}>
                    {dev.skills.map((skill) => (
                      <span key={skill} style={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Link>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(dev.id, dev.name)}
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>

        <Toast message={toast} onClose={() => setToast("")} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#111827", // dark gray (matches dashboard feel)
    display: "flex",
    justifyContent: "center",
    padding: "32px 24px",
    boxSizing: "border-box",
    color: "#f9fafb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, system-ui, -apple-system, Helvetica, Arial, sans-serif",
  },
  inner: {
    width: "100%",
    maxWidth: "1100px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  backBtn: {
    alignSelf: "flex-start",
    padding: "6px 14px",
    borderRadius: "999px",
    backgroundColor: "transparent",
    border: "1px solid #1f2937",
    color: "#9ca3af",
    fontSize: "13px",
    cursor: "pointer",
    marginBottom: "4px",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  },
  heading: {
    fontSize: "28px",
    margin: 0,
    fontWeight: 600,
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#9ca3af",
  },
  addButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },

  summaryRow: {
    display: "flex",
    gap: "12px",
  },
  summaryItem: {
    backgroundColor: "#020617",
    borderRadius: "999px",
    padding: "6px 12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid #1f2937",
  },
  summaryLabel: {
    fontSize: "11px",
    color: "#9ca3af",
  },
  summaryValue: {
    fontSize: "13px",
    fontWeight: 600,
  },

  filtersRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "4px",
  },
  searchWrapper: {
    flex: 1,
    minWidth: "220px",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
    opacity: 0.6,
  },
  searchInput: {
    width: "100%",
    padding: "9px 10px 9px 30px",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#f9fafb",
    fontSize: "13px",
    outline: "none",
  },
  selectWrapper: {
    width: "180px",
  },
  select: {
    width: "100%",
    padding: "9px 10px",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#f9fafb",
    fontSize: "13px",
    outline: "none",
    appearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #9ca3af 50%), linear-gradient(135deg, #9ca3af 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 14px) 11px, calc(100% - 9px) 11px",
    backgroundSize: "5px 5px, 5px 5px",
    backgroundRepeat: "no-repeat",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "8px",
  },

  card: {
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "#020617",
    borderRadius: "14px",
    border: "1px solid #1f2937",
    overflow: "hidden",
  },
  cardMain: {
    flex: 1,
    padding: "14px 16px",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
  },
  badge: {
    padding: "2px 8px",
    borderRadius: "999px",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontSize: "11px",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    fontSize: "12px",
    marginTop: "2px",
  },
  metaText: {
    color: "#e5e7eb",
  },
  metaMuted: {
    color: "#9ca3af",
  },
  skillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "6px",
  },
  skillChip: {
    padding: "3px 8px",
    borderRadius: "999px",
    backgroundColor: "#111827",
    fontSize: "11px",
    color: "#e5e7eb",
  },

  deleteBtn: {
    border: "none",
    backgroundColor: "#dc2626",
    color: "white",
    padding: "0 18px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  },

  cardSkeleton: {
    height: "82px",
    borderRadius: "14px",
    background: "linear-gradient(90deg,#111827,#1f2937,#111827)",
  },

  emptyState: {
    padding: "32px 16px",
    textAlign: "center",
    borderRadius: "14px",
    border: "1px dashed #1f2937",
    backgroundColor: "#020617",
    marginTop: "8px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 500,
  },
  emptyText: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "#9ca3af",
  },
};

export default DeveloperListPage;
