import { env } from "@/lib/env.mjs";

import { migrate } from "drizzle-orm/libsql/migrator";
import { db, sqlite } from ".";

const runMigrate = async () => {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "src/lib/db/migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  sqlite.close();
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error("Message", err.message);
  console.error("Complete Error", err);
  process.exit(1);
});
