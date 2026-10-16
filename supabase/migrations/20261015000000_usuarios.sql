-- Tabla de usuarios del panel, vinculada 1:1 con auth.users.
-- El rol vive aquí (no en user_metadata, que el propio usuario puede editar).

create schema if not exists private;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'rol_usuario' and typnamespace = 'public'::regnamespace) then
    create type public.rol_usuario as enum ('admin', 'editor', 'visitante');
  end if;
end
$$;

create table if not exists public.usuarios (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  nombre text,
  rol public.rol_usuario not null default 'visitante',
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.usuarios enable row level security;

-- Helper para políticas RLS. SECURITY DEFINER para poder leer usuarios sin
-- recursión de RLS; vive en un schema no expuesto y siempre filtra por auth.uid().
create or replace function private.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.usuarios
    where id = (select auth.uid()) and rol = 'admin' and activo
  );
$$;

revoke execute on function private.es_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.es_admin() to authenticated;

-- Cada usuario nuevo de Supabase Auth obtiene su fila con rol 'visitante'.
create or replace function private.crear_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.usuarios (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function private.crear_usuario() from public, anon, authenticated;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function private.crear_usuario();

create or replace function private.tocar_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists usuarios_updated_at on public.usuarios;
create trigger usuarios_updated_at
  before update on public.usuarios
  for each row execute function private.tocar_updated_at();

-- Políticas: cada usuario ve su propia fila; los admins ven y editan todas.
drop policy if exists "usuarios: leer propia fila o admin" on public.usuarios;
create policy "usuarios: leer propia fila o admin" on public.usuarios
  for select to authenticated
  using ((select auth.uid()) = id or (select private.es_admin()));

drop policy if exists "usuarios: admin actualiza" on public.usuarios;
create policy "usuarios: admin actualiza" on public.usuarios
  for update to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

-- Las tablas nuevas ya no se exponen solas a la Data API: permisos explícitos.
revoke all on public.usuarios from anon;
grant select, update on public.usuarios to authenticated;
grant select, insert, update, delete on public.usuarios to service_role;
