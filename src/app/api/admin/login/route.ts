import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  createSession,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
} from "@/lib/admin-settings";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Votre accès a été temporairement bloqué suite à 3 tentatives échouées. Veuillez réessayer dans 15 minutes." },
        { status: 429 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Mot de passe requis" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(password);
    if (isValid) {
      resetRateLimit(ip);
      const token = await createSession();
      const response = NextResponse.json({ success: true, token });
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return response;
    } else {
      recordFailedAttempt(ip);
      const remaining = checkRateLimit(ip);
      return NextResponse.json(
        {
          error: "Mot de passe incorrect",
          remainingAttempts: remaining.allowed ? remaining.remainingAttempts : 0,
        },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
