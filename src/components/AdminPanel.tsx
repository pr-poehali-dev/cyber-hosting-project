import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  FREE_SERVER,
  isServerClaimed,
  getServerOwner,
  releaseServer,
  type Session,
} from "@/lib/hostingStore";

interface Props {
  session: Session;
  onLogout: () => void;
}

export default function AdminPanel({ session, onLogout }: Props) {
  const [claimed, setClaimed] = useState<boolean>(() => isServerClaimed());
  const [owner, setOwner] = useState<string | null>(() => getServerOwner());
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      releaseServer();
      setClaimed(false);
      setOwner(null);
      setDeleting(false);
      setDeleted(true);
      setTimeout(() => setDeleted(false), 3000);
    }, 600);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--cyber-bg)", color: "#e2e8f0", fontFamily: "Golos Text, sans-serif" }}
    >
      {/* Header */}
      <header
        style={{
          background: "rgba(13,13,17,0.95)",
          borderBottom: "1px solid rgba(239,68,68,0.2)",
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
              style={{ background: "linear-gradient(135deg, #dc2626, #9333ea)", fontFamily: "Rajdhani" }}
            >
              CH
            </div>
            <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9" }}>
              Cyber<span style={{ color: "#ef4444" }}>Host</span>
            </span>
            <span
              style={{
                marginLeft: 8,
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                fontFamily: "Rajdhani",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              Админ-панель
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ color: "#64748b", fontSize: "0.875rem" }}>
              <span style={{ color: "#ef4444" }}>{session?.login}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
                fontFamily: "Rajdhani",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              <Icon name="LogOut" size={14} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: "Всего пользователей",
              value: "1",
              icon: "Users",
              color: "var(--cyber-cyan)",
              glow: "rgba(34,211,238,0.15)",
            },
            {
              label: "Активных серверов",
              value: claimed ? "1" : "0",
              icon: "Server",
              color: claimed ? "#10b981" : "#ef4444",
              glow: claimed ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            },
            {
              label: "Свободных серверов",
              value: claimed ? "0" : "1",
              icon: "HardDrive",
              color: claimed ? "#ef4444" : "#10b981",
              glow: claimed ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ background: "var(--cyber-bg-card)", border: `1px solid ${stat.glow}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: stat.glow, border: `1px solid ${stat.color}30` }}
                >
                  <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
                </div>
                <span style={{ color: "#475569", fontSize: "0.8rem", fontFamily: "Rajdhani", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {stat.label}
                </span>
              </div>
              <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "2rem", color: stat.color, textShadow: `0 0 20px ${stat.glow}` }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Servers table */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Settings" size={16} style={{ color: "#ef4444" }} />
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Управление серверами
            </h2>
          </div>

          {deleted && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl mb-4"
              style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <Icon name="CheckCircle" size={16} style={{ color: "#10b981" }} />
              <span style={{ color: "#10b981", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.9rem" }}>
                Сервер удалён. Лимит сброшен — бесплатный сервер снова доступен для заказа.
              </span>
            </div>
          )}

          {claimed ? (
            <div className="overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(147,51,234,0.15)" }}>
                    {["ID", "Тариф", "IP-адрес", "Владелец", "Статус", "Действие"].map((h, i) => (
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
                  <tr>
                    <td style={{ padding: "1rem", fontFamily: "Rajdhani", fontWeight: 700, color: "#c084fc" }}>
                      {FREE_SERVER.id}
                    </td>
                    <td style={{ padding: "1rem", color: "#94a3b8", fontSize: "0.875rem" }}>
                      {FREE_SERVER.tariff}
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
                        {FREE_SERVER.ip}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ color: "#a78bfa", fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.875rem" }}>
                        {owner || "—"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#10b981",
                            boxShadow: "0 0 8px #10b981",
                            display: "inline-block",
                          }}
                        />
                        <span style={{ color: "#10b981", fontFamily: "Rajdhani", fontWeight: 700, fontSize: "0.875rem" }}>
                          ВКЛЮЧЕН
                        </span>
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        style={{
                          background: deleting ? "rgba(239,68,68,0.05)" : "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.35)",
                          color: "#ef4444",
                          fontFamily: "Rajdhani",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          letterSpacing: "0.08em",
                          padding: "6px 14px",
                          borderRadius: 6,
                          cursor: deleting ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                          opacity: deleting ? 0.6 : 1,
                        }}
                        onMouseOver={(e) => { if (!deleting) (e.currentTarget).style.background = "rgba(239,68,68,0.2)"; }}
                        onMouseOut={(e) => { (e.currentTarget).style.background = "rgba(239,68,68,0.1)"; }}
                      >
                        {deleting ? "Удаление..." : "🗑 УДАЛИТЬ СЕРВЕР"}
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
              <p style={{ fontFamily: "Rajdhani", fontWeight: 600, fontSize: "0.95rem" }}>
                Активных серверов нет
              </p>
              <p style={{ color: "#1e293b", fontSize: "0.8rem", marginTop: 4 }}>
                Бесплатный сервер доступен для заказа пользователями
              </p>
            </div>
          )}
        </div>

        {/* Info block */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(147,51,234,0.05)",
            border: "1px solid rgba(147,51,234,0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            <Icon name="Info" size={16} style={{ color: "#a78bfa", marginTop: 2, flexShrink: 0 }} />
            <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, fontFamily: "Golos Text" }}>
              В системе действует ограничение: <strong style={{ color: "#a78bfa" }}>1 бесплатный сервер</strong> на всю платформу.
              Когда пользователь заказывает сервер, он становится недоступным для других.
              Нажмите <strong style={{ color: "#ef4444" }}>«Удалить сервер»</strong>, чтобы освободить лимит и снова сделать его доступным.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
