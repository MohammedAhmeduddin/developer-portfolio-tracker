import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeveloperMock, updateDeveloperMock } from "../mockApi";
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

function DeveloperProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      const dev = await getDeveloperMock(Number(id));
      if (!dev) {
        setError("Developer not found");
      } else {
        setDeveloper(dev);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  function toggleSkill(skill: Skill) {
    if (!developer) return;
    const hasSkill = developer.skills.includes(skill);
    const updatedSkills = hasSkill
      ? developer.skills.filter((s) => s !== skill)
      : [...developer.skills, skill];

    setDeveloper({ ...developer, skills: updatedSkills });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!developer) return;
    setSaving(true);
    setError("");

    try {
      const updated = await updateDeveloperMock(developer);
      setDeveloper(updated);
      // after save, go back to list
      navigate("/developers");
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p style={{ padding: 40 }}>Loading…</p>;
  }

  if (!developer) {
    return <p style={{ padding: 40 }}>Developer not found.</p>;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 style={styles.heading}>Developer Profile</h1>

      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.row}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            value={developer.name}
            onChange={(e) =>
              setDeveloper({ ...developer, name: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            value={developer.title}
            onChange={(e) =>
              setDeveloper({ ...developer, title: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            value={developer.location ?? ""}
            onChange={(e) =>
              setDeveloper({ ...developer, location: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Bio</label>
          <textarea
            style={{ ...styles.input, minHeight: 80 }}
            value={developer.bio ?? ""}
            onChange={(e) =>
              setDeveloper({ ...developer, bio: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>GitHub URL</label>
          <input
            style={styles.input}
            value={developer.githubUrl ?? ""}
            onChange={(e) =>
              setDeveloper({ ...developer, githubUrl: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>LinkedIn URL</label>
          <input
            style={styles.input}
            value={developer.linkedinUrl ?? ""}
            onChange={(e) =>
              setDeveloper({ ...developer, linkedinUrl: e.target.value })
            }
          />
        </div>

        <div style={styles.row}>
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
          />
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Professional Status</label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={developer.isProfessional ?? false}
              onChange={(e) =>
                setDeveloper({ ...developer, isProfessional: e.target.checked })
              }
            />
            <span>Mark as Professional</span>
          </label>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Skills</label>
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
                    backgroundColor: selected ? "#2563eb" : "#e5e7eb",
                    color: selected ? "white" : "black",
                  }}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.saveBtn} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  backBtn: {
    marginBottom: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#2563eb",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontWeight: 500,
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  skillChip: {
    padding: "6px 10px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
  },
  saveBtn: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: "15px",
    fontWeight: 600,
  },
  error: {
    color: "red",
  },
};

export default DeveloperProfilePage;
