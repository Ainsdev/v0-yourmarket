import { db } from "@/lib/db/index";
import { Post, type PostId, postIdSchema, posts } from "@/lib/db/schema/posts";
import { stores } from "@/lib/db/schema/stores";
import type { SearchParams } from "@/lib/types";
import { getProductsSchema } from "@/lib/validations/products";
import { and, asc, count, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache";

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
    .select({
      post: posts,
      //  store: stores
    })
    .from(posts)
    .where(eq(posts.id, postId));
  // .leftJoin(stores, eq(posts.storeId, stores.id)); TODO: add store to post
  if (row === undefined) return {};
  const p = {
    ...row.post,
    //  store: row.store
  };
  return { post: p };
};

export async function getFeaturedPosts() {
  return await cache(
    async () => {
      return db
        .select({
          id: posts.id,
          name: posts.name,
          price: posts.price,
          mainImage: posts.mainImage,
          categoryId: posts.categoryId,
          subcategory: posts.subcategory,
        })
        .from(posts)
        .limit(10)
        .leftJoin(stores, eq(posts.storeId, stores.id))
        .groupBy(posts.id)
        .orderBy(desc(count(stores.id)), desc(posts.createdAt));
    },
    ["featured-products"],
    {
      revalidate: 3600, // every hour
      tags: ["featured-products"],
    }
  )();
}

export async function getProducts(input: SearchParams) {
  noStore();

  try {
    const search = getProductsSchema.parse(input);

    const limit = search.per_page;
    const offset = (search.page - 1) * limit;

    const [column, order] = (search.sort.split(".") as [
      keyof Post | undefined,
      "asc" | "desc" | undefined
    ]) ?? ["createdAt", "desc"];
    const minPrice = Number(search.price_min) ?? undefined;
    const maxPrice = Number(search.price_max) ?? undefined;
    const categoryIds = search.categories?.split(",").map(Number) ?? [];
    const region = search.region;

    const transaction = await db.transaction(async (tx) => {
      const data = await tx
        .select({
          id: posts.id,
          name: posts.name,
          brand: posts.brand,
          price: posts.price,
          size: posts.size,
          mainImage: posts.mainImage, //TODO: get all the images?
          storeId: posts.storeId,
          storeName: stores.name,
          storeImage: stores.image,
          categoryId: posts.categoryId,
          subcategory: posts.subcategory,
          //discounts
        })
        .from(posts)
        .limit(limit)
        .offset(offset)
        .leftJoin(stores, eq(posts.storeId, stores.id))
        .where(
          and(
            categoryIds.length > 0
              ? inArray(posts.categoryId, categoryIds)
              : undefined,
            search.subcategory
              ? eq(posts.subcategory, search.subcategory)
              : undefined,
            minPrice ? gte(posts.price, minPrice) : undefined,
            maxPrice ? lte(posts.price, maxPrice) : undefined,
            region ? eq(stores.region, region) : undefined,
            //IMPORTANT: only show active and not sold posts always
            eq(posts.active, true),
            eq(posts.sold, false)
          )
        )
        .groupBy(posts.id)
        .orderBy(
          column && column in posts
            ? order === "asc"
              ? asc(posts[column])
              : desc(posts[column])
            : desc(posts.createdAt)
        );

      const total = await tx
        .select({
          count: count(posts.id),
        })
        .from(posts)
        .where(
          and(
            categoryIds.length > 0
              ? inArray(posts.categoryId, categoryIds)
              : undefined,
            search.subcategory
              ? eq(posts.subcategory, search.subcategory)
              : undefined,
            minPrice ? gte(posts.price, minPrice) : undefined,
            maxPrice ? lte(posts.price, maxPrice) : undefined,
            region ? eq(stores.region, region) : undefined,
            //IMPORTANT: only show active and not sold posts always
            eq(posts.active, true),
            eq(posts.sold, false)
          )
        )
        .execute()
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(total / limit);

      return {
        data,
        pageCount,
      };
    });

    return transaction;
  } catch (err) {
    return {
      data: [],
      pageCount: 0,
    };
  }
}
