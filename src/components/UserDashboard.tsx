import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  FREE_SERVER,
  claimServer,
  isServerClaimed,
  getUserServer,
  type Session,
} from "@/lib/hostingStore";

interface Props {
  session: Session;
  onLogout: () => void;
}

const inputStyle: React.CSSProperties = {
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
};

export default function UserDashboard({ session, onLogout }: Props) {
  const login = session?.login || "user";
  const userId = `#${Math.abs(login.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 900000 + 100000)}`;

  const [serverState, setServerState] = useState<typeof FREE_SERVER | null>(() => getUserServer(login));
  const [claimed, setClaimed] = useState<boolean>(() => isServerClaimed());
  const [pulse, setPulse] = useState(false);

  const handleOrder = () => {
    if (isServerClaimed()) return;
    claimServer(login);
    setServerState({ ...FREE_SERVER });
    setClaimed(true);
    setPulse(true);
    setTimeout(() => setPulse(false), 1000);
  };

  const serverAvailable = !claimed;
  const hasMyServer = serverState !== null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--cyber-bg)", color: "#e2e8f0", fontFamily: "Golos Text, sans-serif" }}
    >
      {/* Header */}
      <header
        style={{
          background: "rgba(13,13,17,0.95)",
          borderBottom: "1px solid rgba(147,51,234,0.2)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", fontFamily: "Rajdhani" }}
            >
              CH
            </div>
            <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9" }}>
              Cyber<span style={{ color: "var(--cyber-purple)" }}>Host</span>
            </span>
            <span
              style={{
                marginLeft: 8,
                background: "rgba(34,211,238,0.1)",
                border: "1px solid rgba(34,211,238,0.25)",
                color: "var(--cyber-cyan)",
                fontFamily: "Rajdhani",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Личный кабинет
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Привет, <span style={{ color: "#c084fc" }}>{login}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#64748b",
                fontFamily: "Rajdhani",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
              onMouseOver={(e) => { (e.currentTarget).style.color = "#f1f5f9"; }}
              onMouseOut={(e) => { (e.currentTarget).style.color = "#64748b"; }}
            >
              <Icon name="LogOut" size={14} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Account info */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Icon name="User" size={16} style={{ color: "var(--cyber-cyan)" }} />
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Информация об аккаунте
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "ID аккаунта", value: userId, icon: "Hash" },
              { label: "Имя", value: "Никита", icon: "User" },
              { label: "Баланс", value: "4.00 ₽", icon: "Wallet", accent: "#10b981" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(147,51,234,0.1)" }}
              >
                <div style={{ color: "#475569", fontSize: "0.75rem", marginBottom: 6, fontFamily: "Rajdhani", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.3rem", color: item.accent || "#f1f5f9" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My servers */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Icon name="Server" size={16} style={{ color: "var(--cyber-cyan)" }} />
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Мои серверы
            </h2>
          </div>

          {hasMyServer ? (
            <div className="overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(147,51,234,0.15)" }}>
                    {["ID", "Тариф", "IP-адрес", "Статус", ""].map((h, i) => (
                      <th
                        key={i}
                        style={{
                          textAlign: "left",
                          padding: "0.6rem 1rem",
                          color: "#475569",
                          fontFamily: "Rajdhani",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      background: pulse ? "rgba(16,185,129,0.05)" : "transparent",
                      transition: "background 0.5s",
                    }}
                  >
                    <td style={{ padding: "1rem", fontFamily: "Rajdhani", fontWeight: 700, color: "#c084fc", fontSize: "0.95rem" }}>
                      {serverState!.id}
                    </td>
                    <td style={{ padding: "1rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                      {serverState!.tariff}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: "var(--cyber-cyan)",
                          background: "rgba(34,211,238,0.08)",
                          padding: "3px 8px",
                          borderRadius: 4,
                          fontSize: "0.875rem",
                          border: "1px solid rgba(34,211,238,0.15)",
                        }}
                      >
                        {serverState!.ip}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        className="flex items-center gap-1.5"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#10b981",
                            boxShadow: "0 0 8px #10b981",
                            display: "inline-block",
                            animation: "pulse-glow 2s infinite",
                          }}
                        />
                        <span style={{ color: "#10b981", fontFamily: "Rajdhani", fontWeight: 700, fontSize: "0.875rem" }}>
                          ВКЛЮЧЕН
                        </span>
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button
                        style={{
                          background: "rgba(147,51,234,0.12)",
                          border: "1px solid rgba(147,51,234,0.3)",
                          color: "#c084fc",
                          fontFamily: "Rajdhani",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          letterSpacing: "0.08em",
                          padding: "6px 14px",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        УПРАВЛЯТЬ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="text-center py-10"
              style={{ color: "#334155", borderRadius: "1rem", border: "1px dashed rgba(147,51,234,0.12)", background: "rgba(147,51,234,0.02)" }}
            >
              <Icon name="ServerOff" size={32} style={{ color: "#334155", margin: "0 auto 12px" }} />
              <p style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.95rem" }}>У вас пока нет активных серверов</p>
            </div>
          )}
        </div>

        {/* Order button */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Icon name="PlusCircle" size={16} style={{ color: "var(--cyber-cyan)" }} />
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Заказать новый сервер
            </h2>
          </div>

          {serverAvailable && !hasMyServer ? (
            <div>
              <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: 16, lineHeight: 1.6 }}>
                Доступен <span style={{ color: "#10b981", fontWeight: 600 }}>1 бесплатный сервер</span>: GTA SAMP/CRMP — 1000 слотов, IP: 188.127.241.8:1311
              </p>
              <button
                onClick={handleOrder}
                className="btn-primary px-7 py-3 rounded-xl"
                style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", cursor: "pointer", position: "relative", zIndex: 1 }}
              >
                <span className="flex items-center gap-2" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Icon name="Zap" size={16} />
                  ЗАКАЗАТЬ СЕРВЕР
                </span>
              </button>
            </div>
          ) : (
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <Icon name="Ban" size={18} style={{ color: "#ef4444", flexShrink: 0 }} />
              <p style={{ color: "#ef4444", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                Достигнут общий лимит хостинга. Свободных бесплатных серверов нет.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
