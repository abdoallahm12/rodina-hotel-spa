import fs from "fs";
import path from "path";
import crypto from "crypto";

const SETTINGS_FILE = path.join(process.cwd(), "data", "admin-settings.json");
const SESSIONS_FILE = path.join(process.cwd(), "data", "admin-sessions.json");

const DEFAULT_SETTINGS: AdminSettings = {
  hotel: {
    name: "MH HOTEL",
    tagline: "Luxury Redefined",
    description:
      "Where timeless elegance meets modern luxury. Experience a world of refined comfort, impeccable service, and unforgettable moments.",
    logoLetter: "M",
  },
  currency: {
    code: "USD",
    symbol: "$",
    taxRate: 9,
  },
  rooms: [
    {
      id: "classique",
      name: "Chambre Classique",
      price: 166,
      priceSingle: 141,
      priceTriple: 202,
      totalRooms: 50,
    },
    {
      id: "superieure",
      name: "Chambre Supérieure",
      price: 198,
      priceSingle: 167,
      totalRooms: 10,
    },
    {
      id: "premium",
      name: "Chambre Premium",
      price: 224,
      priceSingle: 193,
      totalRooms: 10,
    },
    {
      id: "junior-suite",
      name: "Suite Junior",
      price: 251,
      priceSingle: 220,
      totalRooms: 10,
    },
    {
      id: "romantique",
      name: "Suite Romantique",
      price: 320,
      totalRooms: 5,
    },
    {
      id: "familiale",
      name: "Chambre Familiale",
      price: 280,
      totalRooms: 8,
    },
  ],
  social: {
    facebook: "",
    instagram: "",
    whatsapp: "",
    tiktok: "",
    youtube: "",
  },
  contact: {
    phone: "+1 (234) 567-890",
    email: "info@mhhotel.com",
    address: "City Center, Main Boulevard",
  },
  images: {
    heroBg: "/images/hotel-exterior.png",
    aboutMain: "/images/lobby.png",
    aboutInset: "/images/room-classic.png",
    spaMain: "/images/spa-treatment.png",
  },
  content: {
    heroWelcome: "Welcome to",
    heroTitle1: "MH",
    heroTitle2: "HOTEL",
    heroSubtitle:
      "Where timeless elegance meets modern luxury. Experience a world of refined comfort, impeccable service, and unforgettable moments.",
    aboutLabel: "Our Story",
    aboutTitle1: "A Legacy of",
    aboutTitle2: "Luxury",
    aboutP1:
      "Since its inception, MH Hotel has been a beacon of sophistication and warmth in the heart of the city. Our commitment to excellence transcends ordinary hospitality, offering each guest a curated experience that blends timeless elegance with contemporary comfort.",
    aboutP2:
      "Every detail at MH Hotel has been thoughtfully crafted, from the hand-selected furnishings in our suites to the locally sourced ingredients in our restaurants. We believe that true luxury lies in the art of anticipation, where every need is met before it is expressed, and every moment becomes a cherished memory.",
    roomsLabel: "Hébergement",
    roomsTitle1: "Chambres &",
    roomsTitle2: "Suites",
    roomsSubtitle:
      "Chaque chambre et suite est un sanctuaire de confort, conçu avec une attention minutieuse aux détails et orné des plus beaux matériaux.",
    footerCtaTitle: "Ready to Experience Luxury?",
    footerCtaText:
      "Book your stay today and discover why MH Hotel is the destination of choice for discerning travelers worldwide.",
    footerCtaButton: "Reserve Your Room",
    footerDescription:
      "Where timeless elegance meets modern luxury. Since 2009, MH Hotel has been the pinnacle of sophisticated hospitality, offering unparalleled experiences in the heart of the city.",
  },
};

// Types
export interface RoomSettings {
  id: string;
  name: string;
  price: number;
  priceSingle?: number;
  priceTriple?: number;
  totalRooms: number;
}

export interface AdminSettings {
  hotel: {
    name: string;
    tagline: string;
    description: string;
    logoLetter: string;
  };
  currency: {
    code: string;
    symbol: string;
    taxRate: number;
  };
  rooms: RoomSettings[];
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    tiktok: string;
    youtube: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  images: {
    heroBg: string;
    aboutMain: string;
    aboutInset: string;
    spaMain: string;
  };
  content: {
    heroWelcome: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    aboutLabel: string;
    aboutTitle1: string;
    aboutTitle2: string;
    aboutP1: string;
    aboutP2: string;
    roomsLabel: string;
    roomsTitle1: string;
    roomsTitle2: string;
    roomsSubtitle: string;
    footerCtaTitle: string;
    footerCtaText: string;
    footerCtaButton: string;
    footerDescription: string;
  };
}

// Password management
const PASSWORD_FILE = path.join(process.cwd(), "data", "admin-password.json");

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getPasswordHash(): string {
  ensureDataDir();
  if (!fs.existsSync(PASSWORD_FILE)) {
    // Default password: "admin2024"
    const defaultHash = hashPassword("admin2024");
    fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ hash: defaultHash }), "utf-8");
    return defaultHash;
  }
  const data = JSON.parse(fs.readFileSync(PASSWORD_FILE, "utf-8"));
  return data.hash;
}

export function verifyPassword(password: string): boolean {
  return hashPassword(password) === getPasswordHash();
}

export function changePassword(currentPassword: string, newPassword: string): boolean {
  if (!verifyPassword(currentPassword)) return false;
  ensureDataDir();
  const newHash = hashPassword(newPassword);
  fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ hash: newHash }), "utf-8");
  return true;
}

// Settings management
export function getSettings(): AdminSettings {
  ensureDataDir();
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
    return DEFAULT_SETTINGS;
  }
  try {
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
    return { ...DEFAULT_SETTINGS, ...data };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<AdminSettings>): AdminSettings {
  ensureDataDir();
  const current = getSettings();
  const merged = { ...current, ...settings };

  // Deep merge nested objects
  if (settings.hotel) merged.hotel = { ...current.hotel, ...settings.hotel };
  if (settings.currency) merged.currency = { ...current.currency, ...settings.currency };
  if (settings.social) merged.social = { ...current.social, ...settings.social };
  if (settings.contact) merged.contact = { ...current.contact, ...settings.contact };
  if (settings.images) merged.images = { ...current.images, ...settings.images };
  if (settings.content) merged.content = { ...current.content, ...settings.content };
  if (settings.rooms) merged.rooms = settings.rooms;

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}

// Session management (simple token-based)
interface Session {
  token: string;
  expires: number;
}

export function createSession(): string {
  ensureDataDir();
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  let sessions: Session[] = [];
  if (fs.existsSync(SESSIONS_FILE)) {
    try {
      sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    } catch {
      sessions = [];
    }
  }

  // Clean expired sessions
  sessions = sessions.filter((s) => s.expires > Date.now());
  sessions.push({ token, expires });

  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  return token;
}

export function verifySession(token: string): boolean {
  if (!token) return false;
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) return false;

  try {
    const sessions: Session[] = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    return sessions.some((s) => s.token === token && s.expires > Date.now());
  } catch {
    return false;
  }
}

export function destroySession(token: string): void {
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) return;
  try {
    let sessions: Session[] = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    sessions = sessions.filter((s) => s.token !== token);
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

// Rate limiting (in-memory, resets on server restart)
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const attempt = loginAttempts.get(ip);
  if (!attempt) {
    return { allowed: true, remainingAttempts: 3 };
  }

  if (attempt.blockedUntil > Date.now()) {
    const remainingMs = attempt.blockedUntil - Date.now();
    return { allowed: false, remainingAttempts: 0 };
  }

  if (attempt.count >= 3) {
    // Reset after block period expired
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: 3 };
  }

  return { allowed: true, remainingAttempts: 3 - attempt.count };
}

export function recordFailedAttempt(ip: string): void {
  const attempt = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
  attempt.count += 1;

  if (attempt.count >= 3) {
    // Block for 15 minutes
    attempt.blockedUntil = Date.now() + 15 * 60 * 1000;
  }

  loginAttempts.set(ip, attempt);
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}
