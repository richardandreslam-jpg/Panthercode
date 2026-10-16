// Aplica en orden los archivos de supabase/migrations que aún no se han aplicado.
// Uso: npm run db:migrate   (lee POSTGRES_URL_NON_POOLING de .env.local)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const connectionString = process.env.POSTGRES_URL_NON_POOLING;
if (!connectionString) {
  console.error("Falta POSTGRES_URL_NON_POOLING en .env.local");
  process.exit(1);
}

const migrationsDir = path.resolve("supabase/migrations");
const client = new pg.Client({
  connectionString: connectionString.replace(/[?&]sslmode=[^&]*/, ""),
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query(`
    create schema if not exists private;
    create table if not exists private.migraciones (
      nombre text primary key,
      aplicada_en timestamptz not null default now()
    );
  `);
  const { rows } = await client.query("select nombre from private.migraciones");
  const aplicadas = new Set(rows.map((row) => row.nombre));
  const archivos = (await readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

  for (const archivo of archivos) {
    if (aplicadas.has(archivo)) continue;
    const sql = await readFile(path.join(migrationsDir, archivo), "utf8");
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into private.migraciones (nombre) values ($1)", [archivo]);
      await client.query("commit");
      console.log(`✓ ${archivo}`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  }
  console.log("Migraciones al día.");
} finally {
  await client.end();
}
