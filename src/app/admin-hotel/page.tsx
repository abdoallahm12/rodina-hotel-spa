"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, ShieldAlert, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [blocked, setBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/admin-hotel/dashboard";
      } else if (res.status === 429) {
        setBlocked(true);
        setError(data.error);
      } else {
        setError(data.error || "Erreur de connexion");
        setRemainingAttempts(data.remainingAttempts ?? null);
        setPassword("");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold/10 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-16 w-24 h-24 border border-gold/10 rounded-full animate-pulse delay-1000" />

        <div className="relative bg-gradient-to-b from-charcoal/80 to-charcoal border border-gold/20 rounded-2xl p-8 luxury-shadow backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-charcoal" />
            </div>
            <h1 className="text-2xl font-[var(--font-playfair)] font-bold text-gold mb-2">
              Administration
            </h1>
            <p className="text-white/50 font-[var(--font-lato)] text-sm">
              Accès réservé aux administrateurs
            </p>
          </div>

          {blocked ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-red-400 font-[var(--font-playfair)] font-bold mb-2">
                Accès bloqué
              </h3>
              <p className="text-white/60 font-[var(--font-lato)] text-sm">
                {error || "Trop de tentatives échouées. Veuillez réessayer dans 15 minutes."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gold-light text-xs tracking-widest uppercase font-[var(--font-lato)]">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez le mot de passe"
                    className="pl-10 pr-10 bg-white/5 border-gold/20 text-white hover:bg-white/10 hover:border-gold/40 font-[var(--font-lato)] focus:border-gold/60 focus:ring-gold/20"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gold/50 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm font-[var(--font-lato)]">{error}</p>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <p className="text-red-400/70 text-xs font-[var(--font-lato)] mt-1">
                      Tentatives restantes : {remainingAttempts}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity font-[var(--font-lato)] h-11"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </Button>

              <p className="text-center text-white/30 text-xs font-[var(--font-lato)]">
                Mot de passe par défaut : admin2024
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs font-[var(--font-lato)] mt-6">
          MH Hotel &mdash; Panneau d&apos;administration
        </p>
      </div>
    </div>
  );
}
