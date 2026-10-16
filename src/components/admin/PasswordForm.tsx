"use client";

import { useActionState } from "react";
import { cambiarPassword, type FormState } from "@/app/admin/actions";

const inputClass =
  "w-full rounded-lg border border-[var(--line)] bg-white/70 px-4 py-2.5 text-sm outline-none transition focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/20";

export const PasswordForm = () => {
  const [state, formAction, pending] = useActionState<FormState, FormData>(cambiarPassword, {});

  return (
    <form action={formAction} className="space-y-4 font-sans">
      <input name="password" type="password" autoComplete="new-password" placeholder="Nueva contraseña" required className={inputClass} />
      <input name="confirmacion" type="password" autoComplete="new-password" placeholder="Confirmar contraseña" required className={inputClass} />
      {state.error && <p role="alert" className="text-sm text-red-800">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-[var(--green)]">{state.ok}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--green)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--ink)] disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
};
