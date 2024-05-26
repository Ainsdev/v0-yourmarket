"use server";
import { db } from "@/lib/db/index";
import { eq, and, exists, count, sum } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type StoreId, storeIdSchema, stores } from "@/lib/db/schema/stores";
import { posts, type CompletePost } from "@/lib/db/schema/posts";
import { asc, desc } from "drizzle-orm";

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

export const getStoreByIdWithPostsAnalytics = async (id: StoreId) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  const promise = db.transaction(async (trx) => {
    const rows = await trx
      .select({ store: stores, post: posts })
      .from(stores)
      .where(and(eq(stores.id, storeId), eq(stores.userId, session?.user.id!)))
      .leftJoin(posts, eq(stores.id, posts.storeId))
      .orderBy(desc(posts.createdAt))
      .limit(12);
    if (rows.length === 0) return {};
    const s = rows[0].store;
    const sp = rows
      .filter((r) => r.post !== null)
      .map((p) => p.post) as CompletePost[];

    const postsCountandSoldRevenue = await trx
      .select({
        count: count(),
        revenue: sum(posts.price),
      })
      .from(posts)
      .where(and(eq(posts.storeId, storeId), eq(posts.sold, true)));

    return { store: s, posts: sp, analytics: postsCountandSoldRevenue };
  });

  return promise;

  // return { store: s, posts: sp, analytics: postsCountandSoldRevenue };
};

export const checkNameExists = async (name: string) => {
  const query = db.select().from(stores).where(eq(stores.name, name));
  const rows = await db.select().from(stores).where(exists(query));
  return { exists: rows.length > 0 };
};


export const getStoresForLobby = async () => {
  const rows = await db.select().from(stores).limit(10).orderBy(desc(stores.createdAt));
  return { stores: rows };
}