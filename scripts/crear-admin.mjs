// Crea (o promueve) un usuario administrador del panel.
// Uso: npm run admin:crear -- correo@ejemplo.com
// Si el usuario no existe, se crea con una contraseña temporal que se imprime una sola vez.
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const email = process.argv[2]?.trim().toLowerCase();
const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email) {
  console.error("Uso: npm run admin:crear -- correo@ejemplo.com");
  process.exit(1);
}
if (!url || !secretKey) {
  console.error("Faltan SUPABASE_URL y SUPABASE_SECRET_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const buscarUsuario = async () => {
  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    const encontrado = data.users.find((user) => user.email?.toLowerCase() === email);
    if (encontrado || data.users.length < 1000) return encontrado ?? null;
  }
};

let usuario = await buscarUsuario();
let passwordTemporal = null;

if (!usuario) {
  passwordTemporal = randomBytes(12).toString("base64url");
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: passwordTemporal,
    email_confirm: true,
  });
  if (error) throw error;
  usuario = data.user;
}

const { error } = await supabase
  .from("usuarios")
  .upsert({ id: usuario.id, email, rol: "admin", activo: true }, { onConflict: "id" });
if (error) throw error;

console.log(`✓ ${email} es administrador.`);
if (passwordTemporal) {
  console.log(`Contraseña temporal: ${passwordTemporal}`);
  console.log("Cámbiala después de tu primer inicio de sesión.");
}
