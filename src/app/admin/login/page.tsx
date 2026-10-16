import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { esAdmin, getUsuarioActual } from "@/lib/auth";

export const metadata: Metadata = { title: "Panthercode | Acceso" };

export default async function LoginPage() {
  if (esAdmin(await getUsuarioActual())) redirect("/admin");

  return (
    <main className="hero-surface flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--paper)]/85 p-8 shadow-xl backdrop-blur">
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.32em] text-[var(--green)]">Panthercode</p>
        <h1 className="mb-8 text-4xl font-semibold tracking-tight">Panel de administración</h1>
        <LoginForm />
      </section>
    </main>
  );
}
