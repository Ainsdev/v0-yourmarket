import { Suspense } from "react";
import Loading from "@/app/loading";
import { SearchParams } from "@/lib/types";
import { searchParamsSchema } from "@/lib/validations/params";
import { z } from "zod";
import * as React from "react";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";
import { and, asc, count, desc, eq, gte, like, lte } from "drizzle-orm";
import { SkeletonCard } from "@/components/posts/post-gallery/data-gallery-skeleton";
import { ProductsGalleryView } from "@/components/posts/post-gallery/data-gallery";

export const revalidate = 0;

interface StoreProductsPageProps {
  params: {
    storeId: string;
  };
  searchParams: SearchParams;
}
const storesProductsSearchParamsSchema = searchParamsSchema.extend({
  name: z.string().optional(),
  categoryId: z.string().optional(),
  subcategory: z.string().optional(),
  size: z.string().optional(),
  gender: z.string().optional(),
});

export default async function StorePage({
  params,
  searchParams,
}: StoreProductsPageProps) {
  const storeId = Number(params.storeId);
  const { page, per_page, sort, name, categoryId, subcategory, size, gender } =
    storesProductsSearchParamsSchema.parse(searchParams);
  // Fallback page for invalid page numbers
  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  // Number of items per page
  const limit = isNaN(per_page) ? 10 : per_page;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  const productsPromise = getProductsTable(
    limit,
    offset,
    storeId,
    name,
    categoryId,
    subcategory,
    size,
    gender,
    sort
  );
  return (
    <main className="w-full">
      <Suspense fallback={<SkeletonCard />}>
        <ProductsGalleryView
          promise={productsPromise}
          storeId={storeId}
          admin={false}
        />
      </Suspense>
    </main>
  );
}

function getProductsTable(
  limit: number,
  offset: number,
  storeId: number,
  name: string | undefined,
  categoryId: string | undefined,
  subcategory: string | undefined,
  size: string | undefined,
  gender: string | undefined,
  order: string | undefined
) {
  return db.transaction(async (tx) => {
    try {
      console.log("storeId", storeId);

      const data = await tx
        .select()
        .from(posts)
        .limit(limit)
        .offset(offset)
        .where(
          and(
            eq(posts.storeId, storeId),
            //Filter by name
            name ? like(posts.name, `%${name}%`) : undefined,
            //Filter by category
            categoryId ? eq(posts.categoryId, parseInt(categoryId)) : undefined,
            //Filter by subcategory
            subcategory ? eq(posts.subcategory, subcategory) : undefined,
            //Filter by size
            size ? eq(posts.size, size) : undefined,
            //Filter by gender
            gender ? eq(posts.gender, parseInt(gender)) : undefined
          )
        )
        .orderBy(
          order === "asc" ? asc(posts.createdAt) : desc(posts.createdAt)
        );
      console.log("data", data);
      const countNum = await tx
        .select({
          count: count(),
        })
        .from(posts)
        .where(
          and(
            eq(posts.storeId, storeId),
            //Filter by name
            name ? like(posts.name, `%${name}%`) : undefined,
            //Filter by category
            categoryId ? eq(posts.categoryId, parseInt(categoryId)) : undefined,
            //Filter by subcategory
            subcategory ? eq(posts.subcategory, subcategory) : undefined,
            //Filter by size
            size ? eq(posts.size, size) : undefined,
            //Filter by gender
            gender ? eq(posts.gender, parseInt(gender)) : undefined
          )
        )
        .then((res) => res[0]?.count ?? 0);

      const pageCount = Math.ceil(countNum / limit);
      return {
        data,
        pageCount,
      };
    } catch (error) {
      console.error(error);
      return {
        data: [],
        pageCount: 0,
      };
    }
  });
}
