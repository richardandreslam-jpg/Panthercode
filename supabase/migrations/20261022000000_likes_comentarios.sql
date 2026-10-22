-- "Me gusta" y comentarios moderados de los proyectos del portafolio.

/* ---------- Me gusta ----------
   Cada visitante tiene un id anónimo (uuid guardado en su navegador): un "me gusta" por proyecto.
   La tabla no se expone directamente; se usa con dos funciones (dar/quitar y totales). */
create table if not exists public.proyecto_likes (
  proyecto text not null check (proyecto ~ '^[a-z0-9-]{1,60}$'),
  visitante uuid not null,
  created_at timestamptz not null default now(),
  primary key (proyecto, visitante)
);
alter table public.proyecto_likes enable row level security;
revoke all on public.proyecto_likes from anon, authenticated;

drop policy if exists "likes: admin lee" on public.proyecto_likes;
create policy "likes: admin lee" on public.proyecto_likes
  for select to authenticated
  using ((select private.es_admin()));
grant select on public.proyecto_likes to authenticated;
grant select, insert, delete on public.proyecto_likes to service_role;

-- Dar o quitar "me gusta"; devuelve el total del proyecto.
-- SECURITY DEFINER intencional: el visitante anónimo no tiene acceso directo a la tabla.
create or replace function public.like_proyecto(p_proyecto text, p_visitante uuid, p_like boolean)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_proyecto !~ '^[a-z0-9-]{1,60}$' or p_visitante is null then
    raise exception 'datos inválidos';
  end if;
  if p_like then
    insert into public.proyecto_likes (proyecto, visitante) values (p_proyecto, p_visitante)
    on conflict do nothing;
  else
    delete from public.proyecto_likes where proyecto = p_proyecto and visitante = p_visitante;
  end if;
  return (select count(*)::integer from public.proyecto_likes where proyecto = p_proyecto);
end;
$$;

-- Totales por proyecto (solo números; no expone visitantes).
create or replace function public.likes_totales()
returns table (proyecto text, total integer)
language sql
stable
security definer
set search_path = ''
as $$
  select l.proyecto, count(*)::integer from public.proyecto_likes l group by l.proyecto;
$$;

revoke execute on function public.like_proyecto(text, uuid, boolean) from public;
revoke execute on function public.likes_totales() from public;
grant execute on function public.like_proyecto(text, uuid, boolean) to anon, authenticated;
grant execute on function public.likes_totales() to anon, authenticated;

/* ---------- Comentarios ----------
   El visitante solo puede crear comentarios (quedan pendientes) y leer los aprobados.
   El correo es opcional y privado: solo lo ven los admins. */
create table if not exists public.comentarios (
  id uuid primary key default gen_random_uuid(),
  proyecto text not null check (proyecto ~ '^[a-z0-9-]{1,60}$'),
  nombre text not null check (char_length(btrim(nombre)) between 2 and 80),
  correo text check (correo is null or (char_length(correo) <= 200 and correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  comentario text not null check (char_length(btrim(comentario)) between 3 and 1000),
  aprobado boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists comentarios_proyecto_idx on public.comentarios (proyecto, aprobado, created_at desc);

alter table public.comentarios enable row level security;

drop policy if exists "comentarios: visitante envía" on public.comentarios;
create policy "comentarios: visitante envía" on public.comentarios
  for insert to anon, authenticated
  with check (aprobado = false);

drop policy if exists "comentarios: ver aprobados o admin" on public.comentarios;
create policy "comentarios: ver aprobados o admin" on public.comentarios
  for select to anon, authenticated
  using (aprobado or (select private.es_admin()));

drop policy if exists "comentarios: admin modera" on public.comentarios;
create policy "comentarios: admin modera" on public.comentarios
  for update to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

drop policy if exists "comentarios: admin borra" on public.comentarios;
create policy "comentarios: admin borra" on public.comentarios
  for delete to authenticated
  using ((select private.es_admin()));

revoke all on public.comentarios from anon, authenticated;
-- Visitantes: insertan sin poder fijar "aprobado" y leen sin ver el correo
grant insert (proyecto, nombre, correo, comentario) on public.comentarios to anon, authenticated;
grant select (id, proyecto, nombre, comentario, created_at) on public.comentarios to anon;
-- Admin (authenticated + RLS): lee todo, aprueba y borra
grant select, update (aprobado), delete on public.comentarios to authenticated;
grant select, insert, update, delete on public.comentarios to service_role;
