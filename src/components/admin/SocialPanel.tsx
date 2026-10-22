import { aprobarComentario, eliminarComentario, ocultarComentario } from "@/app/admin/actions";
import { PROYECTOS, nombreProyecto } from "@/lib/proyectos";

export interface Comentario {
  id: string;
  proyecto: string;
  nombre: string;
  correo: string | null;
  comentario: string;
  aprobado: boolean;
  created_at: string;
}

export interface LikeTotal {
  proyecto: string;
  total: number;
}

const fechaHora = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" });
const btn = "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition";

const ComentarioItem = ({ c }: { c: Comentario }) => (
  <li className="rounded-xl border border-[var(--line)] bg-white/60 p-4">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <p className="font-semibold">
        {c.nombre}
        {c.correo && (
          <>
            {" · "}
            <a className="text-[var(--green)] underline" href={`mailto:${c.correo}`}>
              {c.correo}
            </a>
          </>
        )}
      </p>
      <span className="text-xs text-[var(--muted)]">{fechaHora.format(new Date(c.created_at))}</span>
    </div>
    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--green)]">{nombreProyecto(c.proyecto)}</p>
    <p className="mt-2 whitespace-pre-line">{c.comentario}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {c.aprobado ? (
        <form action={ocultarComentario}>
          <input type="hidden" name="id" value={c.id} />
          <button type="submit" className={`${btn} border border-[var(--line)] hover:border-[var(--green)]`}>
            Ocultar
          </button>
        </form>
      ) : (
        <form action={aprobarComentario}>
          <input type="hidden" name="id" value={c.id} />
          <button type="submit" className={`${btn} bg-[var(--green)] text-white hover:bg-[var(--ink)]`}>
            Aprobar
          </button>
        </form>
      )}
      <form action={eliminarComentario}>
        <input type="hidden" name="id" value={c.id} />
        <button type="submit" className={`${btn} border border-red-300 text-red-800 hover:bg-red-50`}>
          Eliminar
        </button>
      </form>
    </div>
  </li>
);

export const SocialPanel = ({ comentarios, likes }: { comentarios: Comentario[]; likes: LikeTotal[] }) => {
  const pendientes = comentarios.filter((c) => !c.aprobado);
  const aprobados = comentarios.filter((c) => c.aprobado);
  const totalDe = (slug: string) => likes.find((l) => l.proyecto === slug)?.total ?? 0;
  const ranking = Object.keys(PROYECTOS).sort((a, b) => totalDe(b) - totalDe(a));

  return (
    <>
      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-1 text-2xl font-semibold">Me gusta por proyecto</h2>
        <p className="mb-5 font-sans text-sm text-[var(--muted)]">Cuántos visitantes marcaron cada proyecto.</p>
        <ul className="grid gap-3 font-sans text-sm sm:grid-cols-3">
          {ranking.map((slug) => (
            <li key={slug} className="rounded-xl border border-[var(--line)] bg-white/60 p-4">
              <p className="text-3xl font-semibold text-[var(--green)]">♥ {totalDe(slug)}</p>
              <p className="mt-1 font-semibold">{nombreProyecto(slug)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-1 text-2xl font-semibold">
          Comentarios pendientes{" "}
          {pendientes.length > 0 && (
            <span className="ml-1 rounded-full bg-[var(--green)] px-2.5 py-0.5 align-middle text-sm text-white">{pendientes.length}</span>
          )}
        </h2>
        <p className="mb-5 font-sans text-sm text-[var(--muted)]">Solo se publican en el portafolio los que apruebes.</p>
        {pendientes.length === 0 ? (
          <p className="font-sans text-sm text-[var(--muted)]">No hay comentarios por revisar.</p>
        ) : (
          <ul className="space-y-4 font-sans text-sm">{pendientes.map((c) => <ComentarioItem key={c.id} c={c} />)}</ul>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Comentarios publicados</h2>
        {aprobados.length === 0 ? (
          <p className="font-sans text-sm text-[var(--muted)]">Todavía no has aprobado comentarios.</p>
        ) : (
          <ul className="space-y-4 font-sans text-sm">{aprobados.map((c) => <ComentarioItem key={c.id} c={c} />)}</ul>
        )}
      </section>
    </>
  );
};
