import crypto from "crypto";
import db from "./db";

// ============ Types ============
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

const DEFAULT_SETTINGS: AdminSettings = {
  hotel: {
    name: "RODINA Hotel & SPA",
    tagline: "L'Art de Vivre",
    description:
      "Where timeless elegance meets modern luxury. Experience a world of refined comfort, impeccable service, and unforgettable moments.",
    logoLetter: "R",
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
    email: "info@rodinahotel.com",
    address: "City Center, Main Boulevard",
  },
  images: {
    heroBg: "/images/hotel-exterior.png",
    aboutMain: "/images/lobby.png",
    aboutInset: "/images/room-classic.png",
    spaMain: "/images/spa-treatment.png",
  },
  content: {
    heroWelcome: "Bienvenue à",
    heroTitle1: "RODINA",
    heroTitle2: "Hotel & SPA",
    heroSubtitle:
      "Là où l'élégance intemporelle rencontre le luxe moderne. Vivez un monde de confort raffiné, de service irréprochable et de moments inoubliables.",
    aboutLabel: "Notre Histoire",
    aboutTitle1: "Un Héritage de",
    aboutTitle2: "Luxe",
    aboutP1:
      "Depuis sa création, RODINA Hotel & SPA est un phare de sophistication et de chaleur au cœur de la ville. Notre engagement envers l'excellence transcende l'hospitalité ordinaire, offrant à chaque invité une expérience sur mesure qui mêle élégance intemporelle et confort contemporain.",
    aboutP2:
      "Chaque détail au RODINA Hotel & SPA a été pensé avec soin, des mobiliers sélectionnés avec goût dans nos suites aux ingrédients locaux de nos restaurants. Nous croyons que le véritable luxe réside dans l'art de l'anticipation, où chaque besoin est comblé avant même d'être exprimé, et chaque instant devient un souvenir précieux.",
    roomsLabel: "Hébergement",
    roomsTitle1: "Chambres &",
    roomsTitle2: "Suites",
    roomsSubtitle:
      "Chaque chambre et suite est un sanctuaire de confort, conçu avec une attention minutieuse aux détails et orné des plus beaux matériaux.",
    footerCtaTitle: "Prêt à Vivre le Luxe ?",
    footerCtaText:
      "Réservez votre séjour aujourd'hui et découvrez pourquoi RODINA Hotel & SPA est la destination de choix pour les voyageurs exigeants du monde entier.",
    footerCtaButton: "Réservez Votre Chambre",
    footerDescription:
      "Là où l'élégance intemporelle rencontre le luxe moderne. RODINA Hotel & SPA est le sommet de l'hospitalité sophistiquée, offrant des expériences inégalées au cœur de la ville.",
  },
};

// ============ Settings Management (PostgreSQL via Prisma) ============

export async function getSettings(): Promise<AdminSettings> {
  try {
    const settingsRows = await db.adminSetting.findMany();

    if (settingsRows.length === 0) {
      // Initialize default settings in database
      await initializeDefaultSettings();
      return DEFAULT_SETTINGS;
    }

    const settingsMap: Record<string, string> = {};
    for (const row of settingsRows) {
      settingsMap[row.key] = row.value;
    }

    // Parse each section from stored JSON
    const settings = { ...DEFAULT_SETTINGS };

    if (settingsMap.hotel) {
      try { settings.hotel = { ...DEFAULT_SETTINGS.hotel, ...JSON.parse(settingsMap.hotel) }; } catch { /* keep default */ }
    }
    if (settingsMap.currency) {
      try { settings.currency = { ...DEFAULT_SETTINGS.currency, ...JSON.parse(settingsMap.currency) }; } catch { /* keep default */ }
    }
    if (settingsMap.rooms) {
      try { settings.rooms = JSON.parse(settingsMap.rooms); } catch { /* keep default */ }
    }
    if (settingsMap.social) {
      try { settings.social = { ...DEFAULT_SETTINGS.social, ...JSON.parse(settingsMap.social) }; } catch { /* keep default */ }
    }
    if (settingsMap.contact) {
      try { settings.contact = { ...DEFAULT_SETTINGS.contact, ...JSON.parse(settingsMap.contact) }; } catch { /* keep default */ }
    }
    if (settingsMap.images) {
      try { settings.images = { ...DEFAULT_SETTINGS.images, ...JSON.parse(settingsMap.images) }; } catch { /* keep default */ }
    }
    if (settingsMap.content) {
      try { settings.content = { ...DEFAULT_SETTINGS.content, ...JSON.parse(settingsMap.content) }; } catch { /* keep default */ }
    }

    return settings;
  } catch (error) {
    // If database is not available, fall back to defaults
    console.error("Failed to get settings from database:", error);
    return DEFAULT_SETTINGS;
  }
}

async function initializeDefaultSettings(): Promise<void> {
  const sections = {
    hotel: JSON.stringify(DEFAULT_SETTINGS.hotel),
    currency: JSON.stringify(DEFAULT_SETTINGS.currency),
    rooms: JSON.stringify(DEFAULT_SETTINGS.rooms),
    social: JSON.stringify(DEFAULT_SETTINGS.social),
    contact: JSON.stringify(DEFAULT_SETTINGS.contact),
    images: JSON.stringify(DEFAULT_SETTINGS.images),
    content: JSON.stringify(DEFAULT_SETTINGS.content),
  };

  for (const [key, value] of Object.entries(sections)) {
    await db.adminSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

export async function saveSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  const current = await getSettings();
  const merged = { ...current, ...settings };

  // Deep merge nested objects
  if (settings.hotel) merged.hotel = { ...current.hotel, ...settings.hotel };
  if (settings.currency) merged.currency = { ...current.currency, ...settings.currency };
  if (settings.social) merged.social = { ...current.social, ...settings.social };
  if (settings.contact) merged.contact = { ...current.contact, ...settings.contact };
  if (settings.images) merged.images = { ...current.images, ...settings.images };
  if (settings.content) merged.content = { ...current.content, ...settings.content };
  if (settings.rooms) merged.rooms = settings.rooms;

  // Save each section to database
  const sections: Record<string, string> = {
    hotel: JSON.stringify(merged.hotel),
    currency: JSON.stringify(merged.currency),
    rooms: JSON.stringify(merged.rooms),
    social: JSON.stringify(merged.social),
    contact: JSON.stringify(merged.contact),
    images: JSON.stringify(merged.images),
    content: JSON.stringify(merged.content),
  };

  for (const [key, value] of Object.entries(sections)) {
    if (settings[key as keyof Partial<AdminSettings>] !== undefined) {
      await db.adminSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  return merged;
}

// ============ Password Management (PostgreSQL) ============

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const DEFAULT_PASSWORD_HASH = hashPassword("admin2024");

export async function getPasswordHash(): Promise<string> {
  try {
    const record = await db.adminPassword.findFirst();
    if (!record) {
      // Initialize default password
      const created = await db.adminPassword.create({
        data: { hash: DEFAULT_PASSWORD_HASH },
      });
      return created.hash;
    }
    return record.hash;
  } catch (error) {
    console.error("Failed to get password hash:", error);
    return DEFAULT_PASSWORD_HASH;
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = await getPasswordHash();
  return hashPassword(password) === hash;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
  const valid = await verifyPassword(currentPassword);
  if (!valid) return false;

  const newHash = hashPassword(newPassword);

  // Delete existing passwords and create new one
  await db.adminPassword.deleteMany({});
  await db.adminPassword.create({
    data: { hash: newHash },
  });

  return true;
}

// ============ Session Management (PostgreSQL) ============

export async function createSession(): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Clean expired sessions
  await db.adminSession.deleteMany({
    where: { expires: { lt: new Date() } },
  });

  await db.adminSession.create({
    data: { token, expires },
  });

  return token;
}

export async function verifySession(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const session = await db.adminSession.findUnique({
      where: { token },
    });

    if (!session) return false;
    if (session.expires < new Date()) {
      // Delete expired session
      await db.adminSession.delete({ where: { token } });
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function destroySession(token: string): Promise<void> {
  try {
    await db.adminSession.delete({ where: { token } });
  } catch {
    // Session may not exist
  }
}

// ============ Rate Limiting (in-memory, resets on server restart) ============

const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const attempt = loginAttempts.get(ip);
  if (!attempt) {
    return { allowed: true, remainingAttempts: 3 };
  }

  if (attempt.blockedUntil > Date.now()) {
    return { allowed: false, remainingAttempts: 0 };
  }

  if (attempt.count >= 3) {
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: 3 };
  }

  return { allowed: true, remainingAttempts: 3 - attempt.count };
}

export function recordFailedAttempt(ip: string): void {
  const attempt = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
  attempt.count += 1;

  if (attempt.count >= 3) {
    attempt.blockedUntil = Date.now() + 15 * 60 * 1000;
  }

  loginAttempts.set(ip, attempt);
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}
