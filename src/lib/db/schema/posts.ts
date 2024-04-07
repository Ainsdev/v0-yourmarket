import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { stores } from "./stores"
import { type getPosts } from "@/lib/api/posts/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const posts = sqliteTable('posts', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  description: text("description"),
  active: integer("active", { mode: "boolean" }),
  brand: text("brand").notNull(),
  images: text("images").notNull(), // Array of strings
  price: integer("price").notNull(),
  // rangePrice: text("range_price"),
  gender: integer("gender").notNull(),
  size: text("size").notNull(),
  categoryId: integer("category_id").notNull(),
  subcategory: text("subcategory").notNull(),
  storeId: text("store_id").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

}, (posts) => {
  return {
    brandIndex: uniqueIndex('brand_idx').on(posts.brand),
    sizeIndex: uniqueIndex('size_idx').on(posts.size),

  }
});


// Schema for posts - used to validate API requests
const baseSchema = createSelectSchema(posts).omit(timestamps)

export const insertPostSchema = createInsertSchema(posts).omit(timestamps);
export const insertPostParams = baseSchema.extend({
  active: z.coerce.boolean(),
  price: z.coerce.number(),
  gender: z.coerce.number(),
  storeId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updatePostSchema = baseSchema;
export const updatePostParams = baseSchema.extend({
  active: z.coerce.boolean(),
  price: z.coerce.number(),
  gender: z.coerce.number(),
  storeId: z.coerce.string().min(1)
})
export const postIdSchema = baseSchema.pick({ id: true });

// Types for posts - used to type API request params and within Components
export type Post = typeof posts.$inferSelect;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdSchema>["id"];
    
// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<ReturnType<typeof getPosts>>["posts"][number];

