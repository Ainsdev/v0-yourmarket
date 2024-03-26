"use server";
import { db } from "@/lib/db/index";
import { eq, and, exists } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type StoreId, storeIdSchema, stores } from "@/lib/db/schema/stores";
import { posts, type CompletePost } from "@/lib/db/schema/posts";

export const getStores = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(stores)
    .where(eq(stores.userId, session?.user.id!));
  const s = rows;
  return { stores: s };
};

export const getStoreById = async (id: StoreId) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(stores)
    .where(and(eq(stores.id, storeId), eq(stores.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { store: s };
};

export const getStoreByIdWithPosts = async (id: StoreId) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  const rows = await db
    .select({ store: stores, post: posts })
    .from(stores)
    .where(and(eq(stores.id, storeId), eq(stores.userId, session?.user.id!)))
    .leftJoin(posts, eq(stores.id, posts.storeId));
  if (rows.length === 0) return {};
  const s = rows[0].store;
  const sp = rows
    .filter((r) => r.post !== null)
    .map((p) => p.post) as CompletePost[];

  return { store: s, posts: sp };
};

export const checkNameExists = async (name: string) => {
  const query = db.select().from(stores).where(eq(stores.name, name));
  const rows =  await db.select().from(stores).where(exists(query))
  return { exists: rows.length > 0 };
};
