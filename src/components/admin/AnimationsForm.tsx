"use client";

import { useActionState, useState } from "react";
import { guardarAnimaciones, type FormState } from "@/app/admin/actions";

export const AnimationsForm = ({ respetar }: { respetar: boolean }) => {
  const [state, formAction, pending] = useActionState<FormState, FormData>(guardarAnimaciones, {});
  const [checked, setChecked] = useState(respetar);

  return (
    <form action={formAction} className="space-y-4 font-sans text-sm">
      <label className="flex cursor-pointer items-start gap-4">
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            type="checkbox"
            name="respetar"
            className="peer sr-only"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span className="h-6 w-11 rounded-full bg-[var(--line)] transition peer-checked:bg-[var(--green)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--green)]/40" />
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
        </span>
        <span>
          <span className="block font-semibold">Respetar “reducir animaciones” del visitante</span>
          <span className="block text-[var(--muted)]">
            {checked
              ? "Encendido: si el equipo del visitante pide menos movimiento, se ocultan la intro, los efectos y el 3D."
              : "Apagado (recomendado): todos ven siempre la intro de la pantera, los efectos de proyectos y el 3D."}
          </span>
        </span>
      </label>
      {state.error && <p role="alert" className="text-red-800">{state.error}</p>}
      {state.ok && <p role="status" className="text-[var(--green)]">{state.ok} Se verá en el sitio en unos 30 segundos.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--green)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--ink)] disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
};
