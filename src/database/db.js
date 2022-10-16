import pg from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

const { Pool } = pg;

export const connection = new Pool({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
