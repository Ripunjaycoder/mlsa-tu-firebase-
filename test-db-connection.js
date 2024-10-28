// test-db-connection.js
const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.SUPABASE_HOST,
  port: process.env.SUPABASE_PORT,
  database: process.env.SUPABASE_DATABASE,
  username: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  ssl: { rejectUnauthorized: false }, // Ensures SSL configuration
});

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Database connected successfully:", result);
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    sql.end();
  }
}

testConnection();
