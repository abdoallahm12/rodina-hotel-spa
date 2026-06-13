"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import type { AdminSettings } from "@/lib/admin-settings";
import {
  Hotel,
  BedDouble,
  Coins,
  Share2,
  Phone,
  Image,
  FileText,
  KeyRound,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminTab =
  | "hotel"
  | "rooms"
  | "currency"
  | "social"
  | "contact"
  | "images"
  | "content"
  | "password";

interface AdminContextType {
  settings: AdminSettings;
  setSettings: (s: AdminSettings) => void;
  refreshSettings: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType>({
  settings: {} as AdminSettings,
  setSettings: () => {},
  refreshSettings: async () => {},
});

export const useAdmin = () => useContext(AdminContext);

const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "hotel", label: "Hôtel", icon: Hotel },
  { id: "rooms", label: "Chambres", icon: BedDouble },
  { id: "currency", label: "Devise", icon: Coins },
  { id: "social", label: "Réseaux Sociaux", icon: Share2 },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "images", label: "Images", icon: Image },
  { id: "content", label: "Contenu", icon: FileText },
  { id: "password", label: "Mot de Passe", icon: KeyRound },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [settings, setSettings] = useState<AdminSettings>({} as AdminSettings);
  const [activeTab, setActiveTab] = useState<AdminTab>("hotel");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        router.push("/admin-hotel");
      }
    } catch {
      router.push("/admin-hotel");
    }
  };

  useEffect(() => {
    const init = async () => {
      await refreshSettings();
      setLoading(false);
    };
    init();
  }, []);

  const handleSave = async (partial: Partial<AdminSettings>) => {
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setSaveMessage("Enregistré avec succès !");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch {
      setSaveMessage("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      router.push("/admin-hotel");
    } catch {
      router.push("/admin-hotel");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Hotel className="w-6 h-6 text-charcoal" />
          </div>
          <p className="text-white/50 font-[var(--font-lato)]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ settings, setSettings, refreshSettings }}>
      <div className="min-h-screen bg-[#0f1117] flex">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#161822] border-r border-gold/10 z-50 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-5 border-b border-gold/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center">
                  <span className="text-charcoal font-bold text-sm font-[var(--font-playfair)]">
                    {settings.hotel?.logoLetter || "M"}
                  </span>
                </div>
                <div>
                  <p className="text-gold font-[var(--font-playfair)] font-bold text-sm">
                    Admin
                  </p>
                  <p className="text-white/30 text-[10px] font-[var(--font-lato)]">
                    Panneau de contrôle
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all font-[var(--font-lato)] ${
                  activeTab === tab.id
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{tab.label}</span>
                {activeTab === tab.id && (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gold/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all font-[var(--font-lato)]"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-[#161822]/90 backdrop-blur-md border-b border-gold/10 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-white/60 hover:text-white"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h2 className="text-white font-[var(--font-playfair)] font-bold">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {saveMessage && (
                  <span className="text-green-400 text-xs font-[var(--font-lato)] animate-pulse">
                    {saveMessage}
                  </span>
                )}
                <a
                  href="/"
                  target="_blank"
                  className="text-white/40 hover:text-gold text-xs font-[var(--font-lato)] transition-colors"
                >
                  Voir le site →
                </a>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 sm:p-6 max-w-5xl">
            <AdminPanelRouter
              activeTab={activeTab}
              saving={saving}
              onSave={handleSave}
            />
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

// Router that renders the correct tab
function AdminPanelRouter({
  activeTab,
  saving,
  onSave,
}: {
  activeTab: AdminTab;
  saving: boolean;
  onSave: (partial: Partial<AdminSettings>) => Promise<void>;
}) {
  const { settings } = useAdmin();

  const props = { settings, saving, onSave };

  switch (activeTab) {
    case "hotel":
      return <HotelPanel {...props} />;
    case "rooms":
      return <RoomsPanel {...props} />;
    case "currency":
      return <CurrencyPanel {...props} />;
    case "social":
      return <SocialPanel {...props} />;
    case "contact":
      return <ContactPanel {...props} />;
    case "images":
      return <ImagesPanel {...props} />;
    case "content":
      return <ContentPanel {...props} />;
    case "password":
      return <PasswordPanel />;
    default:
      return <HotelPanel {...props} />;
  }
}

// ============ PANEL COMPONENTS ============

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      disabled={saving}
      className="gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90 font-[var(--font-lato)] text-sm"
    >
      {saving ? "Enregistrement..." : "Enregistrer"}
    </Button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1d2e] border border-gold/10 rounded-xl p-5 mb-6">
      <h3 className="text-gold font-[var(--font-playfair)] font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/50 text-xs tracking-wider uppercase font-[var(--font-lato)]">
        {label}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/5 border-gold/15 text-white hover:border-gold/30 focus:border-gold/50 font-[var(--font-lato)] text-sm"
      />
    </div>
  );
}

// --- HOTEL PANEL ---
function HotelPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.hotel || {});

  useEffect(() => {
    setForm(settings.hotel || {});
  }, [settings.hotel]);

  const handleSave = () => onSave({ hotel: form });

  return (
    <>
      <SectionCard title="Informations de l'Hôtel">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nom de l'hôtel" value={form.name || ""} onChange={(v) => setForm({ ...form, name: v })} placeholder="MH HOTEL" />
          <FormField label="Slogan" value={form.tagline || ""} onChange={(v) => setForm({ ...form, tagline: v })} placeholder="Luxury Redefined" />
          <FormField label="Lettre du logo" value={form.logoLetter || ""} onChange={(v) => setForm({ ...form, logoLetter: v })} placeholder="M" />
        </div>
        <div className="mt-4">
          <FormField label="Description" value={form.description || ""} onChange={(v) => setForm({ ...form, description: v })} placeholder="Description de l'hôtel..." />
        </div>
      </SectionCard>
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- ROOMS PANEL ---
function RoomsPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [rooms, setRooms] = useState(settings.rooms || []);

  useEffect(() => {
    setRooms(settings.rooms || []);
  }, [settings.rooms]);

  const updateRoom = (index: number, field: string, value: string | number) => {
    const updated = [...rooms];
    updated[index] = { ...updated[index], [field]: value };
    setRooms(updated);
  };

  const handleSave = () => onSave({ rooms });

  return (
    <>
      {rooms.map((room, i) => (
        <SectionCard key={room.id} title={`${room.name} (${room.id})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField label="Nom" value={room.name} onChange={(v) => updateRoom(i, "name", v)} />
            <FormField
              label={`Prix/nuit (${settings.currency?.symbol || "$"})`}
              value={room.price}
              type="number"
              onChange={(v) => updateRoom(i, "price", Number(v))}
            />
            {room.priceSingle !== undefined && (
              <FormField
                label="Prix 1 pers."
                value={room.priceSingle}
                type="number"
                onChange={(v) => updateRoom(i, "priceSingle", Number(v))}
              />
            )}
            {room.priceTriple !== undefined && (
              <FormField
                label="Prix 3 pers."
                value={room.priceTriple}
                type="number"
                onChange={(v) => updateRoom(i, "priceTriple", Number(v))}
              />
            )}
            <FormField
              label="Nombre de chambres"
              value={room.totalRooms}
              type="number"
              onChange={(v) => updateRoom(i, "totalRooms", Number(v))}
            />
          </div>
        </SectionCard>
      ))}
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- CURRENCY PANEL ---
function CurrencyPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.currency || { code: "USD", symbol: "$", taxRate: 9 });

  useEffect(() => {
    setForm(settings.currency || { code: "USD", symbol: "$", taxRate: 9 });
  }, [settings.currency]);

  const handleSave = () => onSave({ currency: form });

  return (
    <>
      <SectionCard title="Devise & Taxes">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Code devise" value={form.code} onChange={(v) => setForm({ ...form, code: v })} placeholder="USD" />
          <FormField label="Symbole" value={form.symbol} onChange={(v) => setForm({ ...form, symbol: v })} placeholder="$" />
          <FormField label="Taux de taxe (%)" value={form.taxRate} type="number" onChange={(v) => setForm({ ...form, taxRate: Number(v) })} />
        </div>
      </SectionCard>
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- SOCIAL PANEL ---
function SocialPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.social || {});

  useEffect(() => {
    setForm(settings.social || {});
  }, [settings.social]);

  const handleSave = () => onSave({ social: form });

  return (
    <>
      <SectionCard title="Réseaux Sociaux">
        <div className="space-y-4">
          <FormField label="Facebook" value={form.facebook || ""} onChange={(v) => setForm({ ...form, facebook: v })} placeholder="https://facebook.com/..." />
          <FormField label="Instagram" value={form.instagram || ""} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="https://instagram.com/..." />
          <FormField label="WhatsApp" value={form.whatsapp || ""} onChange={(v) => setForm({ ...form, whatsapp: v })} placeholder="https://wa.me/..." />
          <FormField label="TikTok" value={form.tiktok || ""} onChange={(v) => setForm({ ...form, tiktok: v })} placeholder="https://tiktok.com/..." />
          <FormField label="YouTube" value={form.youtube || ""} onChange={(v) => setForm({ ...form, youtube: v })} placeholder="https://youtube.com/..." />
        </div>
      </SectionCard>
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- CONTACT PANEL ---
function ContactPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.contact || {});

  useEffect(() => {
    setForm(settings.contact || {});
  }, [settings.contact]);

  const handleSave = () => onSave({ contact: form });

  return (
    <>
      <SectionCard title="Informations de Contact">
        <div className="space-y-4">
          <FormField label="Téléphone" value={form.phone || ""} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+1 (234) 567-890" />
          <FormField label="Email" value={form.email || ""} onChange={(v) => setForm({ ...form, email: v })} placeholder="info@mhhotel.com" />
          <FormField label="Adresse" value={form.address || ""} onChange={(v) => setForm({ ...form, address: v })} placeholder="City Center, Main Boulevard" />
        </div>
      </SectionCard>
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- IMAGES PANEL ---
function ImagesPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.images || {});

  useEffect(() => {
    setForm(settings.images || {});
  }, [settings.images]);

  const handleSave = () => onSave({ images: form });

  const imageFields = [
    { key: "heroBg", label: "Image Hero (arrière-plan)" },
    { key: "aboutMain", label: "Image principale (À propos)" },
    { key: "aboutInset", label: "Image secondaire (À propos)" },
    { key: "spaMain", label: "Image Spa" },
  ];

  return (
    <>
      <SectionCard title="Images Principales">
        <div className="space-y-4">
          {imageFields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-white/50 text-xs tracking-wider uppercase font-[var(--font-lato)]">
                {field.label}
              </label>
              <div className="flex items-center gap-3">
                {form[field.key as keyof typeof form] && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gold/10">
                    <img
                      src={form[field.key as keyof typeof form] as string}
                      alt={field.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Input
                  value={(form[field.key as keyof typeof form] as string) || ""}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder="/images/example.png"
                  className="bg-white/5 border-gold/15 text-white hover:border-gold/30 focus:border-gold/50 font-[var(--font-lato)] text-sm flex-1"
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- CONTENT PANEL ---
function ContentPanel({
  settings,
  saving,
  onSave,
}: {
  settings: AdminSettings;
  saving: boolean;
  onSave: (p: Partial<AdminSettings>) => Promise<void>;
}) {
  const [form, setForm] = useState(settings.content || {});

  useEffect(() => {
    setForm(settings.content || {});
  }, [settings.content]);

  const handleSave = () => onSave({ content: form });

  const sections = [
    {
      title: "Section Hero",
      fields: [
        { key: "heroWelcome", label: "Texte de bienvenue" },
        { key: "heroTitle1", label: "Titre partie 1" },
        { key: "heroTitle2", label: "Titre partie 2" },
        { key: "heroSubtitle", label: "Sous-titre" },
      ],
    },
    {
      title: "Section À Propos",
      fields: [
        { key: "aboutLabel", label: "Label" },
        { key: "aboutTitle1", label: "Titre partie 1" },
        { key: "aboutTitle2", label: "Titre partie 2" },
        { key: "aboutP1", label: "Paragraphe 1" },
        { key: "aboutP2", label: "Paragraphe 2" },
      ],
    },
    {
      title: "Section Chambres",
      fields: [
        { key: "roomsLabel", label: "Label" },
        { key: "roomsTitle1", label: "Titre partie 1" },
        { key: "roomsTitle2", label: "Titre partie 2" },
        { key: "roomsSubtitle", label: "Sous-titre" },
      ],
    },
    {
      title: "Footer",
      fields: [
        { key: "footerCtaTitle", label: "Titre CTA" },
        { key: "footerCtaText", label: "Texte CTA" },
        { key: "footerCtaButton", label: "Bouton CTA" },
        { key: "footerDescription", label: "Description" },
      ],
    },
  ];

  return (
    <>
      {sections.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <FormField
                key={field.key}
                label={field.label}
                value={(form[field.key as keyof typeof form] as string) || ""}
                onChange={(v) => setForm({ ...form, [field.key]: v })}
              />
            ))}
          </div>
        </SectionCard>
      ))}
      <div className="flex justify-end">
        <SaveButton saving={saving} onClick={handleSave} />
      </div>
    </>
  );
}

// --- PASSWORD PANEL ---
function PasswordPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Mot de passe changé avec succès !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "Erreur");
      }
    } catch {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Changer le mot de passe">
      <div className="space-y-4 max-w-md">
        <FormField
          label="Mot de passe actuel"
          value={currentPassword}
          onChange={setCurrentPassword}
          type="password"
          placeholder="••••••••"
        />
        <FormField
          label="Nouveau mot de passe"
          value={newPassword}
          onChange={setNewPassword}
          type="password"
          placeholder="Min. 6 caractères"
        />
        <FormField
          label="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
          placeholder="••••••••"
        />

        {error && (
          <p className="text-red-400 text-sm font-[var(--font-lato)]">{error}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm font-[var(--font-lato)]">{message}</p>
        )}

        <SaveButton
          saving={loading}
          onClick={handleChangePassword}
        />
      </div>
    </SectionCard>
  );
}
