import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getStores } from "@/lib/api/stores/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const stores = sqliteTable('stores', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull().unique(),
  description: text("description"),
  active: integer("active", { mode: "boolean" }).notNull(),
  image: text("image"),
  region: text("region").notNull(),
  city: text("city").notNull(),
  slug: text("slug").notNull(),
  mainCategories: integer("main_categories"),
  userId: text("user_id").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

}, (stores) => {
  return {
    cityIndex: uniqueIndex('city_idx').on(stores.city),
  }
});


// Schema for stores - used to validate API requests
const baseSchema = createSelectSchema(stores).omit(timestamps)

export const insertStoreSchema = createInsertSchema(stores).omit(timestamps);
export const insertStoreParams = baseSchema.extend({
  active: z.coerce.boolean(),
  mainCategories: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateStoreSchema = baseSchema;
export const updateStoreParams = baseSchema.extend({
  active: z.coerce.boolean(),
  mainCategories: z.coerce.number()
}).omit({ 
  userId: true
});
export const storeIdSchema = baseSchema.pick({ id: true });

// Types for stores - used to type API request params and within Components
export type Store = typeof stores.$inferSelect;
export type NewStore = z.infer<typeof insertStoreSchema>;
export type NewStoreParams = z.infer<typeof insertStoreParams>;
export type UpdateStoreParams = z.infer<typeof updateStoreParams>;
export type StoreId = z.infer<typeof storeIdSchema>["id"];
    
// this type infers the return from getStores() - meaning it will include any joins
export type CompleteStore = Awaited<ReturnType<typeof getStores>>["stores"][number];

