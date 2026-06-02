import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { tryLogin, type Session } from "@/lib/hostingStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: Session) => void;
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(147,51,234,0.2)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  color: "#f1f5f9",
  fontSize: "0.925rem",
  outline: "none",
  fontFamily: "Golos Text",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setLogin("");
      setPassword("");
      setError("");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const session = tryLogin(login.trim(), password);
      if (!session) {
        setError("Неверный логин или пароль");
        setLoading(false);
        return;
      }
      setLoading(false);
      onLoginSuccess(session);
      onClose();
    }, 400);
  };

  const fill = (l: string, p: string) => { setLogin(l); setPassword(p); setError(""); };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "var(--cyber-bg-card)",
          border: "1px solid rgba(147,51,234,0.3)",
          boxShadow: "0 0 60px rgba(147,51,234,0.2), 0 0 120px rgba(34,211,238,0.05)",
          animation: "fade-up 0.25s ease both",
        }}
      >
        {/* Top glow line */}
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #9333ea, #22d3ee, #9333ea, transparent)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", fontFamily: "Rajdhani" }}
            >
              CH
            </div>
            <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.15rem", color: "#f1f5f9", letterSpacing: "0.03em" }}>
              Cyber<span style={{ color: "var(--cyber-purple)" }}>Host</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", cursor: "pointer" }}
            onMouseOver={(e) => { (e.currentTarget).style.color = "#f1f5f9"; }}
            onMouseOut={(e) => { (e.currentTarget).style.color = "#64748b"; }}
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        <div className="px-7 pb-7">
          <h3 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.3rem", color: "#f1f5f9", marginBottom: 4 }}>
            Вход в личный кабинет
          </h3>
          <p style={{ color: "#475569", fontSize: "0.8rem", marginBottom: 20, fontFamily: "Golos Text" }}>
            Введите свои данные для входа
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                Логин
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => { setLogin(e.target.value); setError(""); }}
                placeholder="Ваш логин"
                autoComplete="username"
                style={fieldStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
                style={fieldStyle}
                onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <div style={{ color: "#f87171", fontSize: "0.85rem", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "0.5rem", padding: "0.6rem 0.8rem", fontFamily: "Golos Text" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-xl relative z-10"
              style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          {/* Quick fill hints */}
          <div className="mt-5 space-y-2">
            <p style={{ color: "#334155", fontSize: "0.75rem", fontFamily: "Golos Text", marginBottom: 6 }}>Тестовые аккаунты:</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fill("user", "user123")}
                style={{
                  flex: 1,
                  background: "rgba(34,211,238,0.06)",
                  border: "1px solid rgba(34,211,238,0.15)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "var(--cyber-cyan)",
                  fontFamily: "Rajdhani",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => { (e.currentTarget).style.background = "rgba(34,211,238,0.12)"; }}
                onMouseOut={(e) => { (e.currentTarget).style.background = "rgba(34,211,238,0.06)"; }}
              >
                👤 Пользователь
              </button>
              <button
                type="button"
                onClick={() => fill("admin", "admin123")}
                style={{
                  flex: 1,
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#ef4444",
                  fontFamily: "Rajdhani",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => { (e.currentTarget).style.background = "rgba(239,68,68,0.12)"; }}
                onMouseOut={(e) => { (e.currentTarget).style.background = "rgba(239,68,68,0.06)"; }}
              >
                🛡 Администратор
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
