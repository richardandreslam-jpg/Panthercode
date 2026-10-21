"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { esAdmin, requireAdmin, type Usuario } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export interface FormState {
  error?: string;
  ok?: string;
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export async function iniciarSesion(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Escribe un correo y una contraseña válidos." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Correo o contraseña incorrectos." };

  // Autenticado no basta: debe ser admin activo en la tabla usuarios.
  const { data: usuario } = await supabase
    .from("usuarios")
    .select("id, email, nombre, rol, activo, created_at")
    .eq("id", data.user.id)
    .maybeSingle<Usuario>();
  if (!esAdmin(usuario)) {
    await supabase.auth.signOut();
    return { error: "Tu usuario no tiene acceso al panel." };
  }

  redirect("/admin");
}

export async function cerrarSesion(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const passwordSchema = z
  .object({
    password: z.string().min(10, "La contraseña debe tener al menos 10 caracteres."),
    confirmacion: z.string(),
  })
  .refine((data) => data.password === data.confirmacion, { message: "Las contraseñas no coinciden." });

export async function cambiarPassword(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmacion: formData.get("confirmacion"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { error: "No se pudo cambiar la contraseña." };
  return { ok: "Contraseña actualizada." };
}

/* Configuración del portafolio: interruptor de animaciones */
export async function guardarAnimaciones(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const respetar = formData.get("respetar") === "on";
  const supabase = await createClient();
  // RLS: solo un admin puede insertar o actualizar la configuración
  const { error } = await supabase
    .from("configuracion")
    .upsert({ clave: "respetar_reducir_animaciones", valor: respetar }, { onConflict: "clave" });
  if (error) return { error: "No se pudo guardar la configuración." };
  revalidateTag("configuracion");
  revalidatePath("/");
  return {
    ok: respetar
      ? "Guardado: se respetará “reducir animaciones” de cada visitante."
      : "Guardado: el portafolio mostrará siempre la intro, los efectos y el 3D.",
  };
}
