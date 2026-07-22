import { Pool } from "pg";
import { loadEnvFile } from "node:process";

if (!process.env.RENDER) {
  loadEnvFile();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.RENDER ? { rejectUnauthorized: false } : false,
});

export default pool;
