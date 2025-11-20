// config/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";   // <-- import schema anh define bằng drizzle
import dotenv from "dotenv";
dotenv.config();  // load biến môi trường từ .env

const sql = neon(process.env.DATABASE_URL!);

// ✅ Drizzle biết schema => query có type-safe
export const db = drizzle(sql, { schema });

