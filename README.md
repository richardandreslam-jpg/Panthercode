# Panthercode

Base fullstack en TypeScript siguiendo el plan de infraestructura del proyecto. Incluye Next.js App Router, Tailwind CSS, Framer Motion, API Routes y una capa de persistencia JSON local.

## Requisitos

- Node.js 20 LTS
- npm 10+

## Inicio

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Comandos

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

## API

- `GET /api/health`
- `GET /api/data/example`
- `GET /api/data/example?id=...`
- `POST /api/data/example`
- `PUT /api/data/example?id=...`
- `DELETE /api/data/example?id=...`

La escritura JSON está pensada para desarrollo local. El filesystem de Vercel es efímero, por lo que producción debe migrar a un store persistente cuando la aplicación lo requiera, conservando la interfaz de `jsonDb`.
