-- Lectura de comentarios: los visitantes (anon) solo ven aprobados, sin llamar a funciones de admin.
drop policy if exists "comentarios: ver aprobados o admin" on public.comentarios;

drop policy if exists "comentarios: visitante ve aprobados" on public.comentarios;
create policy "comentarios: visitante ve aprobados" on public.comentarios
  for select to anon
  using (aprobado);

drop policy if exists "comentarios: autenticado ve aprobados o admin" on public.comentarios;
create policy "comentarios: autenticado ve aprobados o admin" on public.comentarios
  for select to authenticated
  using (aprobado or (select private.es_admin()));
