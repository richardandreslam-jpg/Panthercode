"use client";

import { useActionState } from "react";
import { iniciarSesion, type FormState } from "@/app/admin/actions";

const inputClass =
  "w-full rounded-lg border border-[var(--line)] bg-white/70 px-4 py-3 font-sans text-sm text-[var(--ink)] outline-none transition focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/20";

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState<FormState, FormData>(iniciarSesion, {});

  return (
    <form action={formAction} className="space-y-5 font-sans">
      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Correo</span>
        <input name="email" type="email" autoComplete="email" required className={inputClass} />
      </label>
      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Contraseña</span>
        <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </label>
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[var(--green)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--ink)] disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
};
