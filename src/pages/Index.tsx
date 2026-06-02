import { useState } from "react";
import Icon from "@/components/ui/icon";
import AuthModal from "@/components/AuthModal";
import UserDashboard from "@/components/UserDashboard";
import AdminPanel from "@/components/AdminPanel";
import { type Session } from "@/lib/hostingStore";

const Index = () => {
  const [session, setSession] = useState<Session>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openLogin = () => setModalOpen(true);
  const openRegister = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleLoginSuccess = (s: Session) => {
    setSession(s);
    setModalOpen(false);
  };

  const handleLogout = () => setSession(null);

  // Роутинг по сессии
  if (session?.role === "admin") {
    return <AdminPanel session={session} onLogout={handleLogout} />;
  }
  if (session) {
    return <UserDashboard session={session} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cyber-bg)", color: "#e2e8f0" }}>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(13, 13, 17, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(147, 51, 234, 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                fontFamily: "Rajdhani, sans-serif",
                boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)",
              }}
            >
              CH
            </div>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "0.05em",
                color: "#e2e8f0",
              }}
            >
              Cyber<span style={{ color: "var(--cyber-purple)" }}>Host</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Главная", "Тарифы", "О нас", "Отзывы"].map((item, i) => (
              <a
                key={i}
                href={`#${["hero", "pricing", "about", "reviews"][i]}`}
                className="nav-link text-sm"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "#94a3b8",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            onClick={openLogin}
            className="btn-primary px-5 py-2 rounded-lg text-sm relative z-10"
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}
          >
            Личный кабинет
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        <div
          className="hero-orb"
          style={{ width: 600, height: 600, background: "rgba(147, 51, 234, 0.12)", top: "10%", left: "-10%" }}
        />
        <div
          className="hero-orb"
          style={{ width: 500, height: 500, background: "rgba(34, 211, 238, 0.08)", bottom: "5%", right: "-8%" }}
        />
        <div
          className="hero-orb animate-float"
          style={{ width: 300, height: 300, background: "rgba(147, 51, 234, 0.07)", top: "40%", right: "15%" }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-block animate-fade-up mb-6">
            <span className="cyber-tag">⚡ Новый сезон 2025 — скорость до 10 Гбит/с</span>
          </div>

          <h1
            className="animate-fade-up-delay-1 mb-6 leading-none"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "#f1f5f9" }}>Мощный игровой хостинг</span>
            <br />
            <span className="shimmer-text">с защитой от DDoS</span>
          </h1>

          <p
            className="animate-fade-up-delay-2 mb-10 max-w-2xl mx-auto"
            style={{
              fontSize: "1.125rem",
              color: "#94a3b8",
              fontFamily: "Golos Text, sans-serif",
              lineHeight: 1.7,
            }}
          >
            Запусти свой сервер{" "}
            <span style={{ color: "var(--cyber-cyan)" }}>Minecraft, SAMP, MTA</span> или{" "}
            <span style={{ color: "var(--cyber-cyan)" }}>CRMP</span> за 1 минуту бесплатно.
            Моментальная активация без технических знаний.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#pricing"
              className="btn-primary px-8 py-3.5 rounded-xl text-base relative z-10"
              style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}
            >
              Выбрать тариф
            </a>
            <button
              onClick={() => openRegister()}
              className="btn-outline px-8 py-3.5 rounded-xl text-base"
              style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}
            >
              Тестовый период
            </button>
          </div>

          <div
            className="animate-fade-up-delay-4 mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            style={{ borderTop: "1px solid rgba(147, 51, 234, 0.15)", paddingTop: "2rem" }}
          >
            {[
              { value: "2 Тбит/с", label: "Защита DDoS" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "< 5мс", label: "Пинг в России" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.75rem",
                    color: "var(--cyber-cyan)",
                    textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "2px", fontFamily: "Golos Text" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className="py-24 relative overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="cyber-tag mb-4 inline-block">Почему мы</span>
            <h2
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#f1f5f9",
                marginTop: "1rem",
              }}
            >
              Преимущества <span style={{ color: "var(--cyber-purple)" }}>CyberHost</span>
            </h2>
            <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "1rem" }}>
              Всё что нужно для стабильного игрового сервера
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "Zap",
                title: "Низкий пинг",
                desc: "Локации в России и Европе. Стабильный FPS без лагов и фризов.",
                color: "var(--cyber-cyan)",
                glow: "rgba(34, 211, 238, 0.15)",
              },
              {
                icon: "Shield",
                title: "Защита от DDoS",
                desc: "Мощная фильтрация атак до 2 Тбит/с. Сервер всегда онлайн.",
                color: "var(--cyber-purple)",
                glow: "rgba(147, 51, 234, 0.15)",
              },
              {
                icon: "LayoutDashboard",
                title: "Удобная панель",
                desc: "Управление Pterodactyl. Автоустановка плагинов и модов в 1 клик.",
                color: "#f59e0b",
                glow: "rgba(245, 158, 11, 0.15)",
              },
              {
                icon: "Headphones",
                title: "Поддержка 24/7",
                desc: "Помогаем с настройкой сервера в любое время суток.",
                color: "#10b981",
                glow: "rgba(16, 185, 129, 0.15)",
              },
            ].map((adv, i) => (
              <div key={i} className="advantage-card rounded-2xl p-7 relative overflow-hidden">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: adv.glow, border: `1px solid ${adv.color}30` }}
                >
                  <Icon name={adv.icon} fallback="Zap" size={22} style={{ color: adv.color }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#f1f5f9",
                    marginBottom: "0.5rem",
                  }}
                >
                  {adv.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6 }}>{adv.desc}</p>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle at top right, ${adv.color}15, transparent 70%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES ROW */}
      <section className="py-12 relative">
        <div className="cyber-separator mx-6 mb-12" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "Download",
                title: "Автоустановка",
                desc: "Моды, плагины и готовые сборки устанавливаются в 1 клик прямо из панели управления.",
              },
              {
                icon: "Server",
                title: "Pterodactyl панель",
                desc: "Профессиональная панель управления. Консоль, файлы, расписание, бэкапы — всё в одном месте.",
              },
              {
                icon: "Globe",
                title: "Локации RU / EU",
                desc: "Дата-центры в Москве и Европе. Минимальный пинг для игроков из любой точки.",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex gap-5 items-start"
                style={{ background: "var(--cyber-bg-card2)", border: "1px solid rgba(147,51,234,0.12)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(147, 51, 234, 0.12)", border: "1px solid rgba(147, 51, 234, 0.25)" }}
                >
                  <Icon name={feat.icon} fallback="Server" size={18} style={{ color: "var(--cyber-purple)" }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9", marginBottom: 4 }}>
                    {feat.title}
                  </h4>
                  <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cyber-separator mx-6 mt-12" />
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div
          className="hero-orb"
          style={{ width: 700, height: 700, background: "rgba(147, 51, 234, 0.05)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="cyber-tag mb-4 inline-block">Тарифы</span>
            <h2
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#f1f5f9",
                marginTop: "1rem",
              }}
            >
              Выбери свою <span style={{ color: "var(--cyber-cyan)" }}>игру</span>
            </h2>
            <p style={{ color: "#64748b", marginTop: "0.75rem", fontSize: "1rem" }}>
              Гибкие тарифы для любого проекта — от личного до публичного сервера
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Minecraft",
                emoji: "⛏️",
                badge: "Бесплатно",
                badgeColor: "#10b981",
                price: "0",
                unit: "руб/мес",
                features: [
                  "4 ГГц CPU (выделенный)",
                  "DDR5 RAM оперативка",
                  "Автоустановка плагинов",
                  "Pterodactyl панель",
                  "Защита от DDoS",
                ],
                featured: true,
              },
              {
                name: "SAMP",
                emoji: "🏎️",
                badge: null,
                badgeColor: "",
                price: "1",
                unit: "руб/слот",
                features: [
                  "Автоустановка модов",
                  "NVMe SSD диск",
                  "Защита от DDoS",
                  "Готовые сборки",
                  "Поддержка 24/7",
                ],
                featured: false,
              },
              {
                name: "MTA:SA",
                emoji: "🚗",
                badge: null,
                badgeColor: "",
                price: "1.2",
                unit: "руб/слот",
                features: [
                  "Высокий FPS гарантирован",
                  "NVMe SSD диск",
                  "Lua-скрипты из коробки",
                  "Защита от DDoS",
                  "Поддержка 24/7",
                ],
                featured: false,
              },
              {
                name: "CRMP",
                emoji: "🔫",
                badge: "Хит",
                badgeColor: "var(--cyber-purple)",
                price: "1",
                unit: "руб/слот",
                features: [
                  "Готовые сборки серверов",
                  "NVMe SSD диск",
                  "Автоустановка гейммодов",
                  "Защита от DDoS",
                  "Поддержка 24/7",
                ],
                featured: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`pricing-card rounded-2xl p-7 flex flex-col relative overflow-hidden ${plan.featured ? "featured" : ""}`}
              >
                {plan.badge && (
                  <div
                    className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${plan.badgeColor}20`,
                      border: `1px solid ${plan.badgeColor}50`,
                      color: plan.badgeColor,
                      fontFamily: "Rajdhani",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-3xl mb-3">{plan.emoji}</div>
                  <h3
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "#f1f5f9",
                    }}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontWeight: 700,
                      fontSize: "2.5rem",
                      color: plan.featured ? "#10b981" : "var(--cyber-cyan)",
                      textShadow: plan.featured
                        ? "0 0 20px rgba(16,185,129,0.5)"
                        : "0 0 20px rgba(34,211,238,0.4)",
                    }}
                  >
                    От {plan.price}
                  </span>
                  <span style={{ color: "#64748b", fontSize: "0.875rem", marginLeft: 6 }}>{plan.unit}</span>
                </div>

                <ul className="flex-1 space-y-3 mb-7">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2.5" style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
                      <Icon name="Check" size={14} style={{ color: "var(--cyber-cyan)", flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openRegister()}
                  className={plan.featured ? "btn-primary" : "btn-outline"}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.08em",
                    position: "relative",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                >
                  Заказать
                </button>

                {plan.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, var(--cyber-purple), transparent)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="cyber-tag mb-4 inline-block">Отзывы</span>
            <h2
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#f1f5f9",
                marginTop: "1rem",
              }}
            >
              Что говорят <span style={{ color: "var(--cyber-purple)" }}>игроки</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Никита К.",
                server: "Minecraft сервер",
                avatar: "NK",
                text: "Запустил сервер за 2 минуты. Пинг у всех игроков не превышает 10мс. DDoS был один раз — даже не почувствовали, атаку заблокировали моментально.",
                stars: 5,
              },
              {
                name: "Артём В.",
                server: "SAMP сервер",
                avatar: "АВ",
                text: "Перешёл с другого хостинга — разница огромная. Автоустановка модов реально работает, поддержка отвечает в течение 10 минут. Рекомендую всем!",
                stars: 5,
              },
              {
                name: "Максим Д.",
                server: "CRMP сервер",
                avatar: "МД",
                text: "Взял готовую сборку для CRMP, поднял сервер в 1 клик. Pterodactyl панель удобная, даже новичок разберётся. Цена за слот очень приятная.",
                stars: 5,
              },
            ].map((review, i) => (
              <div key={i} className="review-card rounded-2xl p-6 relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <span key={s} style={{ color: "#f59e0b", fontSize: "0.875rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(34,211,238,0.2))",
                      border: "1px solid rgba(147,51,234,0.3)",
                      fontFamily: "Rajdhani",
                      color: "#c084fc",
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9" }}>
                      {review.name}
                    </div>
                    <div style={{ color: "#475569", fontSize: "0.8rem" }}>{review.server}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="rounded-3xl p-14 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(34,211,238,0.08))",
              border: "1px solid rgba(147,51,234,0.3)",
              boxShadow: "0 0 60px rgba(147,51,234,0.1)",
            }}
          >
            <div
              className="hero-orb"
              style={{ width: 400, height: 400, background: "rgba(147, 51, 234, 0.1)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            <div className="relative z-10">
              <h2
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "#f1f5f9",
                  marginBottom: "1rem",
                }}
              >
                Готов запустить свой сервер?
              </h2>
              <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "1.05rem" }}>
                Начни бесплатно — никаких скрытых платежей
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#pricing"
                  className="btn-primary px-8 py-3.5 rounded-xl text-base relative z-10"
                  style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}
                >
                  Выбрать тариф
                </a>
                <button
                  onClick={() => openRegister()}
                  className="btn-outline px-8 py-3.5 rounded-xl text-base"
                  style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer" }}
                >
                  Тестовый период
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(147, 51, 234, 0.12)", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", fontFamily: "Rajdhani, sans-serif" }}
              >
                CH
              </div>
              <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#64748b" }}>
                Cyber<span style={{ color: "var(--cyber-purple)" }}>Host</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: "Политика конфиденциальности", href: "#" },
                { label: "Пользовательское соглашение", href: "#" },
                { label: "Правила сервиса", href: "#" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{ color: "#475569", fontSize: "0.8rem", textDecoration: "none", fontFamily: "Golos Text", transition: "color 0.2s" }}
                  onMouseOver={(e) => ((e.target as HTMLAnchorElement).style.color = "#94a3b8")}
                  onMouseOut={(e) => ((e.target as HTMLAnchorElement).style.color = "#475569")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <div style={{ color: "#334155", fontSize: "0.8rem", fontFamily: "Golos Text" }}>
                © 2025 CyberHost. Все права защищены.
              </div>
              <div style={{ color: "#1e293b", fontSize: "0.7rem", marginTop: "2px", fontFamily: "Golos Text" }}>
                Работает на базе ИИ
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;