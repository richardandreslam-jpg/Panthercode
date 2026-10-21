-- Configuración pública del portafolio, editable desde el panel /admin.
-- Cualquiera puede leerla (la usa la página pública); solo los admins pueden cambiarla.

create table if not exists public.configuracion (
  clave text primary key check (clave ~ '^[a-z0-9_]{1,64}$'),
  valor jsonb not null,
  descripcion text,
  updated_at timestamptz not null default now()
);

alter table public.configuracion enable row level security;

drop policy if exists "configuracion: lectura pública" on public.configuracion;
create policy "configuracion: lectura pública" on public.configuracion
  for select to anon, authenticated
  using (true);

drop policy if exists "configuracion: admin inserta" on public.configuracion;
create policy "configuracion: admin inserta" on public.configuracion
  for insert to authenticated
  with check ((select private.es_admin()));

drop policy if exists "configuracion: admin actualiza" on public.configuracion;
create policy "configuracion: admin actualiza" on public.configuracion
  for update to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

drop trigger if exists configuracion_updated_at on public.configuracion;
create trigger configuracion_updated_at
  before update on public.configuracion
  for each row execute function private.tocar_updated_at();

-- Permisos explícitos (las tablas nuevas ya no se exponen solas a la Data API)
revoke all on public.configuracion from anon, authenticated;
grant select on public.configuracion to anon, authenticated;
grant insert, update on public.configuracion to authenticated;
grant select, insert, update, delete on public.configuracion to service_role;

-- Valor inicial: el portafolio muestra siempre sus animaciones
insert into public.configuracion (clave, valor, descripcion)
values ('respetar_reducir_animaciones', 'false'::jsonb,
        'Si es true, el portafolio respeta la opción "reducir animaciones" del sistema del visitante (oculta intro, efectos y 3D).')
on conflict (clave) do nothing;
