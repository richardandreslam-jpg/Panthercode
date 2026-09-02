# Capa de datos JSON

Cada colección vive en un archivo `.json` con un objeto `_meta` y un arreglo `records`.

El motor en `src/lib/json-db.ts` valida la forma del archivo, serializa escrituras por colección y crea snapshots previos en `_backups/`. En Vercel, el filesystem es efímero: las escrituras sirven para desarrollo local y las lecturas de archivos empaquetados sirven como seed de preview/producción.

Las colecciones nuevas deben registrar su esquema en `src/lib/json-db.ts` o exportar un esquema desde `data/_schema/`.
