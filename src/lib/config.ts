import { getSupabaseEnv } from "@/lib/supabase/env";

/** Configuración pública del portafolio (tabla public.configuracion, editable en /admin). */
export interface PortfolioConfig {
  /** true: respeta "reducir animaciones" del sistema del visitante. false: siempre muestra intro, efectos y 3D. */
  respetarReducirAnimaciones: boolean;
}

export const DEFAULT_CONFIG: PortfolioConfig = { respetarReducirAnimaciones: false };
export const CONFIG_REVALIDATE_SECONDS = 30;

interface ConfigRow {
  clave: string;
  valor: unknown;
}

/** Lee la configuración pública con la publishable key (lectura pública por RLS). Nunca lanza: ante error usa los valores por defecto. */
export const getPortfolioConfig = async (): Promise<PortfolioConfig> => {
  try {
    const { url, publishableKey } = getSupabaseEnv();
    const res = await fetch(`${url}/rest/v1/configuracion?select=clave,valor`, {
      headers: { apikey: publishableKey },
      next: { revalidate: CONFIG_REVALIDATE_SECONDS, tags: ["configuracion"] },
    });
    if (!res.ok) return DEFAULT_CONFIG;
    const rows = (await res.json()) as ConfigRow[];
    const respetar = rows.find((r) => r.clave === "respetar_reducir_animaciones")?.valor;
    return { respetarReducirAnimaciones: respetar === true };
  } catch {
    return DEFAULT_CONFIG;
  }
};
