// La integración de Vercel nombra las variables con el prefijo del proyecto;
// se aceptan también los nombres estándar de Supabase.
// Cada process.env.NEXT_PUBLIC_* va escrito literal para que Next.js lo inyecte en el cliente.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_PanthercodeSUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_PanthercodeSUPABASE_PUBLISHABLE_KEY;

export const getSupabaseEnv = (): { url: string; publishableKey: string } => {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  return { url: supabaseUrl, publishableKey: supabasePublishableKey };
};
