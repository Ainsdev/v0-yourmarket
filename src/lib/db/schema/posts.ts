import { sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { type getPosts } from "@/lib/api/posts/queries";

import { nanoid, timestamps } from "@/lib/utils";
import { stores } from "./stores";

export const posts = sqliteTable(
  "posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: text("name").notNull(),
    description: text("description"),
    active: integer("active", { mode: "boolean" }),
    brand: text("brand").notNull(),
    condition: text("condition").notNull(),
    mainImage: text("main_image").notNull(),
    images: text("images").notNull(), // Array of strings
    price: integer("price").notNull(),
    // rangePrice: text("range_price"),
    gender: integer("gender"),
    size: text("size").notNull(),
    region: text("region").notNull(),
    contact: text("contact").notNull(),
    // stock: integer("stock").notNull().default(1),
    categoryId: integer("category_id").notNull(),
    subcategory: text("subcategory").notNull(),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (posts) => {
    return {
      brandIndex: uniqueIndex("brand_idx").on(posts.brand),
      sizeIndex: uniqueIndex("size_idx").on(posts.size),
      conditionIndex: uniqueIndex("condition_idx").on(posts.condition),
      categoryIndex: uniqueIndex("category_idx").on(posts.categoryId),
    };
  }
);

// Schema for posts - used to validate API requests
export const storeBaseSchema = createSelectSchema(posts).omit(timestamps);

export const insertPostSchema = createInsertSchema(posts).omit(timestamps);
export const insertPostParams = storeBaseSchema
  .extend({
    active: z.coerce.boolean(),
    price: z.coerce.number(),
    gender: z.coerce.number(),
    storeId: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updatePostSchema = storeBaseSchema;
export const updatePostParams = storeBaseSchema.extend({
  active: z.coerce.boolean(),
  price: z.coerce.number(),
  gender: z.coerce.number(),
  storeId: z.coerce.number(),
});
export const postIdSchema = storeBaseSchema.pick({ id: true });

// Types for posts - used to type API request params and within Components
export type Post = typeof posts.$inferSelect;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdSchema>["id"];

// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<
  ReturnType<typeof getPosts>
>["posts"][number];
