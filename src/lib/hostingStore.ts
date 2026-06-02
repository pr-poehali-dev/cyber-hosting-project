// Глобальное хранилище состояния хостинга (localStorage)

export const FREE_SERVER = {
  id: "#328070",
  status: "ВКЛЮЧЕН" as const,
  tariff: "GTA SAMP/CRMP - FREE (1000 слотов)",
  ip: "188.127.241.8:1311",
};

const KEY_SERVER = "ch_server_claimed";
const KEY_OWNER = "ch_server_owner";

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
}

export function releaseServer(): void {
  localStorage.removeItem(KEY_SERVER);
  localStorage.removeItem(KEY_OWNER);
}

export function getUserServer(login: string) {
  if (isServerClaimed() && getServerOwner() === login) {
    return FREE_SERVER;
  }
  return null;
}
