import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PostId, postIdSchema, posts } from "@/lib/db/schema/posts";
import { stores } from "@/lib/db/schema/stores";

export const getPosts = async () => {
  const rows = await db
    .select({ post: posts, store: stores })
    .from(posts)
    .leftJoin(stores, eq(posts.storeId, stores.id));
  const p = rows.map((r) => ({ ...r.post, store: r.store }));
  return { posts: p };
};

export const getPostById = async (id: PostId) => {
  console.log("getPostById", id);
  const { id: postId } = postIdSchema.parse({ id });
  const [row] = await db
    .select({ post: posts, store: stores })
    .from(posts)
    .where(eq(posts.id, postId))
    .leftJoin(stores, eq(posts.storeId, stores.id));
  if (row === undefined) return {};
  const p = { ...row.post, store: row.store };
  return { post: p };
};
