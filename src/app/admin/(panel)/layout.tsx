import type { Metadata } from "next";
import Link from "next/link";
import { cerrarSesion } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Panthercode | Admin" };

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const usuario = await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-white/40">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4 font-sans text-sm">
          <Link href="/admin" className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--green)]">
            Panthercode · Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[var(--muted)]">{usuario.email}</span>
            <form action={cerrarSesion}>
              <button
                type="submit"
                className="rounded-full border border-[var(--line)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition hover:border-[var(--green)] hover:text-[var(--green)]"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
