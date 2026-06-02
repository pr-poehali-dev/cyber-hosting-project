import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
  planName?: string;
  registerUrl: string;
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login", planName, registerUrl }: AuthModalProps) => {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telegram: "",
    game: planName || "",
  });

  useEffect(() => {
    setTab(defaultTab);
    setSuccess(false);
    setError("");
    setForm({ name: "", email: "", password: "", telegram: "", game: planName || "" });
  }, [isOpen, defaultTab, planName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Заполните все обязательные поля");
      return;
    }
    if (form.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Ошибка отправки, попробуйте ещё раз");
      }
    } catch {
      setError("Ошибка сети, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Личный кабинет скоро откроется — заявка отправлена!");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
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
            <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", letterSpacing: "0.03em" }}>
              Cyber<span style={{ color: "var(--cyber-purple)" }}>Host</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f1f5f9"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-7 mb-6">
          <div
            className="flex rounded-xl p-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(147,51,234,0.12)" }}
          >
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(false); }}
                className="flex-1 py-2.5 rounded-lg transition-all text-sm font-semibold"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  letterSpacing: "0.05em",
                  fontWeight: 700,
                  background: tab === t ? "linear-gradient(135deg, #7c3aed, #9333ea)" : "transparent",
                  color: tab === t ? "#fff" : "#64748b",
                  boxShadow: tab === t ? "0 0 15px rgba(147,51,234,0.3)" : "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-7">
          {success ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)" }}
              >
                <Icon name="Check" size={28} style={{ color: "#10b981" }} />
              </div>
              <h3 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.4rem", color: "#f1f5f9", marginBottom: 8 }}>
                Заявка отправлена!
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Мы свяжемся с тобой в ближайшее время.<br />
                Проверь Telegram или почту.
              </p>
              <button
                onClick={onClose}
                className="btn-primary mt-6 px-6 py-2.5 rounded-xl text-sm relative z-10"
                style={{ fontFamily: "Rajdhani", fontWeight: 700, letterSpacing: "0.08em" }}
              >
                Отлично!
              </button>
            </div>
          ) : tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(147,51,234,0.2)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: "#f1f5f9",
                    fontSize: "0.925rem",
                    outline: "none",
                    fontFamily: "Golos Text",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(147,51,234,0.2)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: "#f1f5f9",
                    fontSize: "0.925rem",
                    outline: "none",
                    fontFamily: "Golos Text",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
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
                className="btn-primary w-full py-3 rounded-xl relative z-10 mt-2"
                style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em" }}
              >
                Войти в кабинет
              </button>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#475569", fontFamily: "Golos Text", marginTop: 8 }}>
                Нет аккаунта?{" "}
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  style={{ color: "var(--cyber-cyan)", background: "none", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  Зарегистрироваться
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Имя *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Твоё имя или никнейм"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{
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
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
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
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Пароль *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Минимум 6 символов"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{
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
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Telegram (необязательно)
                </label>
                <input
                  type="text"
                  name="telegram"
                  placeholder="@username"
                  value={form.telegram}
                  onChange={handleChange}
                  style={{
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
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(147,51,234,0.08)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.8rem", color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Тип сервера
                </label>
                <select
                  name="game"
                  value={form.game}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    background: "#111118",
                    border: "1px solid rgba(147,51,234,0.2)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: form.game ? "#f1f5f9" : "#64748b",
                    fontSize: "0.925rem",
                    outline: "none",
                    fontFamily: "Golos Text",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.6)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(147,51,234,0.2)"; }}
                >
                  <option value="">Выбери тариф</option>
                  <option value="Minecraft">⛏️ Minecraft</option>
                  <option value="SAMP">🏎️ SAMP</option>
                  <option value="MTA:SA">🚗 MTA:SA</option>
                  <option value="CRMP">🔫 CRMP</option>
                </select>
              </div>
              {error && (
                <div style={{ color: "#f87171", fontSize: "0.85rem", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "0.5rem", padding: "0.6rem 0.8rem", fontFamily: "Golos Text" }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 rounded-xl relative z-10 mt-2"
                style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Отправляем..." : "Зарегистрироваться"}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#475569", fontFamily: "Golos Text", marginTop: 8 }}>
                Уже есть аккаунт?{" "}
                <button
                  type="button"
                  onClick={() => setTab("login")}
                  style={{ color: "var(--cyber-cyan)", background: "none", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  Войти
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;