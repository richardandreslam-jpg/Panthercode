-- Mensajes del formulario de contacto del portafolio.
-- Los visitantes (anon) solo pueden insertar; solo los admins pueden leer, marcar y borrar.

create table if not exists public.mensajes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 1 and 120),
  correo text not null check (char_length(correo) between 5 and 200 and correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  tipo text not null default 'Otro' check (tipo in ('Prácticas', 'Proyecto freelance', 'Colaboración', 'Otro')),
  mensaje text not null check (char_length(mensaje) between 10 and 4000),
  leido boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists mensajes_created_at_idx on public.mensajes (created_at desc);

alter table public.mensajes enable row level security;

drop policy if exists "mensajes: cualquiera envía" on public.mensajes;
create policy "mensajes: cualquiera envía" on public.mensajes
  for insert to anon, authenticated
  with check (leido = false);

drop policy if exists "mensajes: admin lee" on public.mensajes;
create policy "mensajes: admin lee" on public.mensajes
  for select to authenticated
  using ((select private.es_admin()));

drop policy if exists "mensajes: admin actualiza" on public.mensajes;
create policy "mensajes: admin actualiza" on public.mensajes
  for update to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

drop policy if exists "mensajes: admin borra" on public.mensajes;
create policy "mensajes: admin borra" on public.mensajes
  for delete to authenticated
  using ((select private.es_admin()));

-- Permisos explícitos (las tablas nuevas ya no se exponen solas a la Data API)
revoke all on public.mensajes from anon, authenticated;
grant insert (nombre, correo, tipo, mensaje) on public.mensajes to anon, authenticated;
grant select, update (leido), delete on public.mensajes to authenticated;
grant select, insert, update, delete on public.mensajes to service_role;
