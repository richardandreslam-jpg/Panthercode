import { CONFIG_REVALIDATE_SECONDS, getPortfolioConfig } from "@/lib/config";

/**
 * "/" entrega el portafolio (public/index.html) con la configuración del panel /admin aplicada.
 * El HTML estático trae `window.PC_REDUCE_MOTION = false;` y aquí se reemplaza por el valor guardado.
 */
const FLAG = /window\.PC_REDUCE_MOTION = (true|false);/;

export async function GET(request: Request): Promise<Response> {
  const [htmlRes, config] = await Promise.all([
    fetch(new URL("/index.html", request.url), { next: { revalidate: CONFIG_REVALIDATE_SECONDS } }),
    getPortfolioConfig(),
  ]);
  if (!htmlRes.ok) return new Response("Portafolio no disponible", { status: 502 });

  const html = (await htmlRes.text()).replace(FLAG, `window.PC_REDUCE_MOTION = ${config.respetarReducirAnimaciones};`);
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // La CDN guarda la página unos segundos; un cambio en /admin se ve en ~30 s
      "Cache-Control": `public, s-maxage=${CONFIG_REVALIDATE_SECONDS}, stale-while-revalidate=60`,
    },
  });
}
