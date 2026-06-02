// Глобальное хранилище состояния хостинга (localStorage)

export const FREE_SERVER = {
  id: "#328676",
  tariff: "GTA SAMP/CRMP - FREE",
  gameVersion: "SAMP 0.3.7",
  ip: "188.127.241.8:1311",
  slots: 1000,
};

const KEY_SERVER = "ch_server_claimed";
const KEY_OWNER = "ch_server_owner";
const KEY_POWER = "ch_server_power"; // "on" | "off"

export type Session = { role: "user" | "admin"; login: string } | null;

const USERS: Record<string, { password: string; role: "user" | "admin" }> = {
  user:  { password: "user123",  role: "user"  },
  admin: { password: "admin123", role: "admin" },
};

// --- Auth ---
export function tryLogin(login: string, password: string): Session {
  const found = USERS[login.toLowerCase()];
  if (!found) return { role: "user", login };
  if (found.password !== password) return null;
  return { role: found.role, login };
}

// --- Global server state ---
export function isServerClaimed(): boolean {
  return localStorage.getItem(KEY_SERVER) === "1";
}

export function getServerOwner(): string | null {
  return localStorage.getItem(KEY_OWNER);
}

export function claimServer(login: string): void {
  localStorage.setItem(KEY_SERVER, "1");
  localStorage.setItem(KEY_OWNER, login);
  // Изначально сервер ВЫКЛЮЧЕН
  localStorage.setItem(KEY_POWER, "off");
}

export function releaseServer(): void {
  localStorage.removeItem(KEY_SERVER);
  localStorage.removeItem(KEY_OWNER);
  localStorage.removeItem(KEY_POWER);
}

export function getUserServer(login: string) {
  if (isServerClaimed() && getServerOwner() === login) {
    return FREE_SERVER;
  }
  return null;
}

// --- Power state (ВКЛ/ВЫКЛ) ---
export function isServerOnline(): boolean {
  return localStorage.getItem(KEY_POWER) === "on";
}

export function setServerPower(on: boolean): void {
  localStorage.setItem(KEY_POWER, on ? "on" : "off");
}
