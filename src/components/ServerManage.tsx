import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FREE_SERVER, isServerOnline, setServerPower } from "@/lib/hostingStore";

interface Props {
  login: string;
  onBack: () => void;
}

const MENU_TILES = [
  { label: "СЕРВЕР", icon: "Server", color: "#f97316", glow: "rgba(249,115,22,0.5)", active: true },
  { label: "FTP", icon: "FolderOpen", color: "#a855f7", glow: "rgba(168,85,247,0.5)" },
  { label: "БАЗА ДАННЫХ", icon: "Database", color: "#eab308", glow: "rgba(234,179,8,0.5)" },
  { label: "КОНФИГ", icon: "Settings2", color: "#3b82f6", glow: "rgba(59,130,246,0.5)" },
  { label: "КОНСОЛЬ", icon: "Terminal", color: "#ef4444", glow: "rgba(239,68,68,0.5)" },
  { label: "АВТОУСТАНОВКА", icon: "Download", color: "#22c55e", glow: "rgba(34,197,94,0.5)" },
  { label: "ДОПОЛНЕНИЯ", icon: "Puzzle", color: "#06b6d4", glow: "rgba(6,182,212,0.5)" },
];

function CircularStat({ value, max, label, display, color }: { value: number; max: number; label: string; display: string; color: string }) {
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = circ - pct * circ;

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: "relative", width: 92, height: 92 }}>
        <svg width="92" height="92" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="46" cy="46" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="46" cy="46" r={radius} fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease", filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9" }}>{display}</span>
        </div>
      </div>
      <span style={{ color: "#64748b", fontSize: "0.75rem", marginTop: 8, fontFamily: "Rajdhani", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

export default function ServerManage({ login, onBack }: Props) {
  const [online, setOnline] = useState<boolean>(() => isServerOnline());
  const [history, setHistory] = useState<{ action: string; date: string }[]>([
    { action: `Перезапуск сервера пользователем ${login}`, date: "Вчера, 21:14" },
    { action: `Перезапуск сервера пользователем ${login}`, date: "3 дня назад, 18:02" },
    { action: `Запуск сервера пользователем ${login}`, date: "5 дней назад, 12:47" },
  ]);

  const togglePower = () => {
    const next = !online;
    setOnline(next);
    setServerPower(next);
    const now = new Date();
    const time = `Сегодня, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setHistory((h) => [
      { action: `${next ? "Запуск" : "Остановка"} сервера пользователем ${login}`, date: time },
      ...h,
    ]);
  };

  const restart = () => {
    setOnline(true);
    setServerPower(true);
    const now = new Date();
    const time = `Сегодня, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setHistory((h) => [
      { action: `Успешный перезапуск сервера пользователем ${login}`, date: time },
      ...h,
    ]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cyber-bg)", color: "#e2e8f0", fontFamily: "Golos Text, sans-serif", animation: "fade-up 0.4s ease both" }}>
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
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(147,51,234,0.2)",
                color: "#94a3b8",
                fontFamily: "Rajdhani",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) => { (e.currentTarget).style.color = "#f1f5f9"; }}
              onMouseOut={(e) => { (e.currentTarget).style.color = "#94a3b8"; }}
            >
              <Icon name="ChevronLeft" size={16} />
              Вернуться в личный кабинет
            </button>
          </div>
          <h1 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.15rem", color: "#f1f5f9", letterSpacing: "0.05em" }}>
            УПРАВЛЕНИЕ СЕРВЕРОМ <span style={{ color: "var(--cyber-purple)" }}>{FREE_SERVER.id}</span>
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Top menu tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {MENU_TILES.map((tile, i) => (
            <button
              key={i}
              className="rounded-xl p-4 flex flex-col items-center gap-2 transition-all"
              style={{
                background: tile.active ? `${tile.color}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${tile.active ? tile.color : "rgba(255,255,255,0.06)"}`,
                boxShadow: tile.active ? `0 0 20px ${tile.glow}` : "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                (e.currentTarget).style.background = `${tile.color}18`;
                (e.currentTarget).style.borderColor = tile.color;
                (e.currentTarget).style.boxShadow = `0 0 20px ${tile.glow}`;
              }}
              onMouseOut={(e) => {
                if (!tile.active) {
                  (e.currentTarget).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget).style.boxShadow = "none";
                }
              }}
            >
              <Icon name={tile.icon} size={22} style={{ color: tile.color }} />
              <span style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "0.7rem", color: "#cbd5e1", letterSpacing: "0.05em", textAlign: "center" }}>
                {tile.label}
              </span>
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Info + actions */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
          >
            <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Информация о сервере
            </h2>

            {/* Status */}
            <div
              className="flex items-center justify-between rounded-xl p-4 mb-4"
              style={{
                background: online ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${online ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
              }}
            >
              <span style={{ color: "#64748b", fontSize: "0.85rem", fontFamily: "Rajdhani", letterSpacing: "0.08em", textTransform: "uppercase" }}>Статус</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: online ? "#10b981" : "#ef4444",
                    boxShadow: `0 0 10px ${online ? "#10b981" : "#ef4444"}`,
                    animation: online ? "pulse-glow 2s infinite" : "none",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: online ? "#10b981" : "#ef4444", fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em" }}>
                  {online ? "ВКЛЮЧЕН" : "ВЫКЛЮЧЕН"}
                </span>
              </span>
            </div>

            {/* Info rows */}
            <div className="space-y-2 mb-6">
              {[
                { label: "ID сервера", value: FREE_SERVER.id, accent: "#c084fc" },
                { label: "Тариф", value: FREE_SERVER.tariff },
                { label: "Версия игры", value: FREE_SERVER.gameVersion },
                { label: "Адрес", value: FREE_SERVER.ip, mono: true },
                { label: "Слоты", value: FREE_SERVER.slots.toString() },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 px-1"
                  style={{ borderBottom: "1px solid rgba(147,51,234,0.08)" }}
                >
                  <span style={{ color: "#64748b", fontSize: "0.85rem", fontFamily: "Rajdhani", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      color: row.accent || "#e2e8f0",
                      fontFamily: row.mono ? "monospace" : "Rajdhani",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={togglePower}
                className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                style={{
                  background: online
                    ? "linear-gradient(135deg, #475569, #334155)"
                    : "linear-gradient(135deg, #dc2626, #ef4444)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "Rajdhani",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  boxShadow: online ? "none" : "0 0 25px rgba(239,68,68,0.4)",
                }}
              >
                <Icon name={online ? "Power" : "Play"} size={18} />
                {online ? "ВЫКЛЮЧИТЬ" : "ВКЛЮЧИТЬ"}
              </button>
              <button
                onClick={restart}
                className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "linear-gradient(135deg, #ea580c, #f97316)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "Rajdhani",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(249,115,22,0.3)",
                }}
              >
                <Icon name="RotateCw" size={18} />
                ПЕРЕЗАПУСТИТЬ
              </button>
            </div>
          </div>

          {/* RIGHT: stats + history */}
          <div className="space-y-6">
            {/* Load stats */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
            >
              <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Статистика нагрузки
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <CircularStat value={online ? 0 : 0} max={1000} label="Online" display={`0/${FREE_SERVER.slots}`} color="#22d3ee" />
                <CircularStat value={0} max={100} label="CPU" display="0%" color="#a855f7" />
                <CircularStat value={0} max={100} label="RAM" display="0%" color="#f59e0b" />
                <CircularStat value={66} max={1000} label="SSD" display="66MB" color="#10b981" />
              </div>
            </div>

            {/* History */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--cyber-bg-card)", border: "1px solid rgba(147,51,234,0.2)" }}
            >
              <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1rem", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                Действия за последнюю неделю
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(147,51,234,0.08)" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}
                    >
                      <Icon name="Check" size={12} style={{ color: "#10b981" }} />
                    </div>
                    <div>
                      <div style={{ color: "#cbd5e1", fontSize: "0.85rem", fontFamily: "Golos Text", lineHeight: 1.4 }}>
                        {item.action}
                      </div>
                      <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: 2, fontFamily: "Golos Text" }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
