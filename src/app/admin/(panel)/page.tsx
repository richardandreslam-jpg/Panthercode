import { PasswordForm } from "@/components/admin/PasswordForm";
import { requireAdmin, type Usuario } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const fechaCorta = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" });

export default async function AdminPage() {
  const usuario = await requireAdmin();
  const supabase = await createClient();
  // RLS: un admin ve todas las filas de usuarios.
  const { data: usuarios } = await supabase
    .from("usuarios")
    .select("id, email, nombre, rol, activo, created_at")
    .order("created_at", { ascending: true })
    .returns<Usuario[]>();

  return (
    <div className="space-y-10">
      <section>
        <p className="mb-2 font-sans text-xs uppercase tracking-[0.28em] text-[var(--green)]">Bienvenido</p>
        <h1 className="text-4xl font-semibold tracking-tight">{usuario.nombre ?? usuario.email}</h1>
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
