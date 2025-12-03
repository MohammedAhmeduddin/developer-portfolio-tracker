// src/pages/NewDeveloperPage.tsx
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeveloperMock } from "../mockApi";
import type { Developer, Skill } from "../types";

const ALL_SKILLS: Skill[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "SQL",
  "Docker",
];

const emptyDev: Developer = {
  id: -1, // will be replaced in createDeveloperMock
  name: "",
  email: "",
  title: "",
  bio: "",
  location: "",
  skills: [],
  yearsExperience: 0,
  githubUrl: "",
  linkedinUrl: "",
  isProfessional: false,
};

function NewDeveloperPage() {
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState<Developer>(emptyDev);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toggleSkill(skill: Skill) {
    const hasSkill = developer.skills.includes(skill);
    const updatedSkills = hasSkill
      ? developer.skills.filter((s) => s !== skill)
      : [...developer.skills, skill];

    setDeveloper({ ...developer, skills: updatedSkills });
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // ignore id, backend assigns new one
      const { id, ...rest } = developer;
      await createDeveloperMock(rest);
      navigate("/developers");
    } catch (err: any) {
      setError(err?.message ?? "Failed to create developer");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        {/* Back */}
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.heading}>Add New Developer</h1>
            <p style={styles.subtitle}>
              Create a profile with core details, links, and skills so this
              developer appears in your portfolio.
            </p>
          </div>
        </header>

        {/* Card with form */}
        <div style={styles.card}>
          <form onSubmit={handleSave} style={styles.form}>
            {/* Basic info grid */}
            <div style={styles.fieldGrid}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Name <span style={styles.required}>*</span>
                </label>
                <input
                  style={styles.input}
                  value={developer.name}
                  onChange={(e) =>
                    setDeveloper({ ...developer, name: e.target.value })
                  }
                  required
                  placeholder="Jane Doe"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Email <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  style={styles.input}
                  value={developer.email}
                  onChange={(e) =>
                    setDeveloper({ ...developer, email: e.target.value })
                  }
                  required
                  placeholder="jane@example.com"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Title</label>
                <input
                  style={styles.input}
                  value={developer.title}
                  onChange={(e) =>
                    setDeveloper({ ...developer, title: e.target.value })
                  }
                  placeholder="Full-Stack Engineer"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Location</label>
                <input
                  style={styles.input}
                  value={developer.location ?? ""}
                  onChange={(e) =>
                    setDeveloper({ ...developer, location: e.target.value })
                  }
                  placeholder="New York, NY"
                  disabled={saving}
                />
              </div>
            </div>

            {/* Bio */}
            <div style={styles.field}>
              <label style={styles.label}>Bio</label>
              <textarea
                style={styles.textarea}
                value={developer.bio ?? ""}
                onChange={(e) =>
                  setDeveloper({ ...developer, bio: e.target.value })
                }
                placeholder="Short summary of experience, domains, and key achievements..."
                rows={4}
                disabled={saving}
              />
            </div>

            {/* Links & experience */}
            <div style={styles.fieldGrid}>
              <div style={styles.field}>
                <label style={styles.label}>GitHub URL</label>
                <input
                  style={styles.input}
                  value={developer.githubUrl ?? ""}
                  onChange={(e) =>
                    setDeveloper({ ...developer, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/username"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>LinkedIn URL</label>
                <input
                  style={styles.input}
                  value={developer.linkedinUrl ?? ""}
                  onChange={(e) =>
                    setDeveloper({ ...developer, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Years of Experience</label>
                <input
                  type="number"
                  min={0}
                  style={styles.input}
                  value={developer.yearsExperience}
                  onChange={(e) =>
                    setDeveloper({
                      ...developer,
                      yearsExperience: Number(e.target.value),
                    })
                  }
                  placeholder="3"
                  disabled={saving}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Professional Status</label>
                <label style={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={developer.isProfessional ?? false}
                    onChange={(e) =>
                      setDeveloper({
                        ...developer,
                        isProfessional: e.target.checked,
                      })
                    }
                    disabled={saving}
                    style={styles.checkbox}
                  />
                  <span>Mark as professional developer</span>
                </label>
              </div>
            </div>

            {/* Skills chips */}
            <div style={styles.field}>
              <label style={styles.label}>Skills</label>
              <p style={styles.helperText}>
                Click to toggle skills that best represent this developer.
              </p>
              <div style={styles.skillsGrid}>
                {ALL_SKILLS.map((skill) => {
                  const selected = developer.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      style={{
                        ...styles.skillChip,
                        backgroundColor: selected ? "#2563eb" : "#111827",
                        borderColor: selected ? "#2563eb" : "#1f2937",
                        color: selected ? "#ffffff" : "#e5e7eb",
                      }}
                      disabled={saving}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            {/* Footer actions */}
            <div style={styles.footerRow}>
              <p style={styles.footerHint}>
                <span style={styles.required}>*</span> Required fields
              </p>
              <button
                type="submit"
                style={{
                  ...styles.saveBtn,
                  opacity: saving ? 0.85 : 1,
                  cursor: saving ? "default" : "pointer",
                }}
                disabled={saving}
              >
                {saving ? "Creating..." : "Create Developer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#111827",
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
    maxWidth: "960px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  backBtn: {
    marginBottom: "6px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: "13px",
    padding: 0,
    alignSelf: "flex-start",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  heading: {
    fontSize: "26px",
    margin: 0,
    fontWeight: 600,
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#9ca3af",
    maxWidth: "520px",
  },

  card: {
    marginTop: "8px",
    backgroundColor: "#020617",
    borderRadius: "18px",
    padding: "22px 20px 20px",
    border: "1px solid #1f2937",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px 18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
  },
  required: {
    color: "#f97316",
    fontSize: "13px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#f9fafb",
    fontSize: "13px",
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#f9fafb",
    fontSize: "13px",
    outline: "none",
    resize: "vertical",
    minHeight: 80,
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: "13px",
    color: "#e5e7eb",
  },
  checkbox: {
    width: "16px",
    height: "16px",
  },

  helperText: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
  },

  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  skillChip: {
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid #1f2937",
    cursor: "pointer",
    fontSize: "12px",
    backgroundColor: "#111827",
  },

  error: {
    color: "#fca5a5",
    fontSize: "13px",
  },

  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "6px",
  },
  footerHint: {
    margin: 0,
    fontSize: "12px",
    color: "#9ca3af",
  },
  saveBtn: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#22c55e",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
};

export default NewDeveloperPage;
