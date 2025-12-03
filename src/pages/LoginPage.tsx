// src/pages/LoginPage.tsx
import type React from "react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔁 If already logged in, don't show login again
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const validEmail = "admin@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      // ✅ mark as logged in
      localStorage.setItem("isLoggedIn", "true");

      setToast("Logged in successfully (demo login)");
      setIsSubmitting(false);

      // small delay so toast appears briefly
      setTimeout(() => navigate("/dashboard"), 400);
    } else {
      setError("Invalid credentials. Try admin@example.com / password123.");
      setIsSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
          alt="App logo"
          style={styles.logo}
        />

        <h1 style={styles.title}>Developer Portfolio Tracker</h1>
        <p style={styles.subtitle}>
          Sign in to manage developers, skills, and professional status.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input */}
          <label style={styles.label}>
            Email
            <input
              type="email"
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </label>

          {/* Password Input */}
          <label style={styles.label}>
            Password
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                style={{ ...styles.input, paddingRight: "40px" }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeButton}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isSubmitting ? 0.7 : 1,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p style={styles.hint}>
            Demo credentials: <strong>admin@example.com</strong> /{" "}
            <strong>password123</strong>
          </p>
        </form>
      </div>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    zIndex: 9999,
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "rgba(30, 41, 59, 0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: "18px",
    padding: "36px 30px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    color: "white",
    animation: "fadeIn 0.5s ease-out",
  },

  logo: {
    width: "64px",
    height: "64px",
    display: "block",
    margin: "0 auto 18px auto",
    opacity: 0.95,
  },

  title: {
    fontSize: "26px",
    fontWeight: 600,
    marginBottom: "6px",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "24px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "13px",
    gap: "6px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
  },

  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#9ca3af",
    fontSize: "18px",
    cursor: "pointer",
  },

  error: {
    fontSize: "13px",
    color: "#fca5a5",
    marginTop: "-4px",
  },

  button: {
    marginTop: "6px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
  },

  hint: {
    marginTop: "12px",
    fontSize: "11px",
    color: "#9ca3af",
    textAlign: "center",
  },
};

export default LoginPage;
