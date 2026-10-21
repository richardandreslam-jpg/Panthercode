import { AnimationsForm } from "@/components/admin/AnimationsForm";
import { PasswordForm } from "@/components/admin/PasswordForm";
import { requireAdmin, type Usuario } from "@/lib/auth";
import { getPortfolioConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

const fechaCorta = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" });
const fechaHora = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" });

interface Mensaje {
  id: string;
  nombre: string;
  correo: string;
  tipo: string;
  mensaje: string;
  created_at: string;
}

export default async function AdminPage() {
  const usuario = await requireAdmin();
  const supabase = await createClient();
  // RLS: un admin ve todas las filas de usuarios y de mensajes.
  const [{ data: usuarios }, { data: mensajes }, config] = await Promise.all([
    supabase
      .from("usuarios")
      .select("id, email, nombre, rol, activo, created_at")
      .order("created_at", { ascending: true })
      .returns<Usuario[]>(),
    supabase
      .from("mensajes")
      .select("id, nombre, correo, tipo, mensaje, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
      .returns<Mensaje[]>(),
    getPortfolioConfig(),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <p className="mb-2 font-sans text-xs uppercase tracking-[0.28em] text-[var(--green)]">Bienvenido</p>
        <h1 className="text-4xl font-semibold tracking-tight">{usuario.nombre ?? usuario.email}</h1>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-1 text-2xl font-semibold">Animaciones del portafolio</h2>
        <p className="mb-5 font-sans text-sm text-[var(--muted)]">
          Algunos equipos tienen activada la opción “reducir animaciones”. Aquí decides si el portafolio la respeta.
        </p>
        <AnimationsForm respetar={config.respetarReducirAnimaciones} />
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Mensajes del portafolio</h2>
        {(mensajes ?? []).length === 0 ? (
          <p className="font-sans text-sm text-[var(--muted)]">Todavía no hay mensajes.</p>
        ) : (
          <ul className="space-y-4 font-sans text-sm">
            {(mensajes ?? []).map((m) => (
              <li key={m.id} className="rounded-xl border border-[var(--line)] bg-white/60 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {m.nombre} ·{" "}
                    <a className="text-[var(--green)] underline" href={`mailto:${m.correo}`}>
                      {m.correo}
                    </a>
                  </p>
                  <span className="text-xs text-[var(--muted)]">{fechaHora.format(new Date(m.created_at))}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--green)]">{m.tipo}</p>
                <p className="mt-2 whitespace-pre-line">{m.mensaje}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                <th className="py-2 pr-4 font-semibold">Correo</th>
                <th className="py-2 pr-4 font-semibold">Rol</th>
                <th className="py-2 pr-4 font-semibold">Estado</th>
                <th className="py-2 font-semibold">Alta</th>
              </tr>
            </thead>
            <tbody>
              {(usuarios ?? []).map((fila) => (
                <tr key={fila.id} className="border-b border-[var(--line)] last:border-0">
                  <td className="py-3 pr-4">{fila.email}</td>
                  <td className="py-3 pr-4 capitalize">{fila.rol}</td>
                  <td className="py-3 pr-4">{fila.activo ? "Activo" : "Inactivo"}</td>
                  <td className="py-3 text-[var(--muted)]">{fechaCorta.format(new Date(fila.created_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-sm rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Seguridad</h2>
        <PasswordForm />
      </section>
    </div>
  );
}
