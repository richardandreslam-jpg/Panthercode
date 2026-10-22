/** Nombres de los proyectos del portafolio (deben coincidir con los slug de PROJECTS en public/js/main.js). */
export const PROYECTOS: Record<string, string> = {
  "visual-text-assist": "Visual Text Assist",
  "baseball-nation": "Baseball Nation",
  "siu-setp": "SIU – SETP Santa Marta",
};

export const nombreProyecto = (slug: string): string => PROYECTOS[slug] ?? slug;
