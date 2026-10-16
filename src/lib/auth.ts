import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type RolUsuario = "admin" | "editor" | "visitante";

export interface Usuario {
  id: string;
  email: string;
  nombre: string | null;
  rol: RolUsuario;
  activo: boolean;
  created_at: string;
}

// Devuelve el usuario de la tabla `usuarios` si la sesión es válida; cacheado por request.
export const getUsuarioActual = cache(async (): Promise<Usuario | null> => {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;
  if (!userId) return null;

  const { data } = await supabase
    .from("usuarios")
    .select("id, email, nombre, rol, activo, created_at")
    .eq("id", userId)
    .maybeSingle<Usuario>();
  return data;
});

export const esAdmin = (usuario: Usuario | null): usuario is Usuario =>
  usuario !== null && usuario.rol === "admin" && usuario.activo;

export const requireAdmin = async (): Promise<Usuario> => {
  const usuario = await getUsuarioActual();
  if (!esAdmin(usuario)) redirect("/admin/login");
  return usuario;
};
