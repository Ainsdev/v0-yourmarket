import * as React from "react";
import { DateRangePicker } from "@/components/date-range-picker";
import { db } from "@/lib/db";
import { Post, posts } from "@/lib/db/schema/posts";
import { SearchParams } from "@/lib/types";
import { searchParamsSchema } from "@/lib/validations/params";
import { and, asc, count, desc, eq, gte, like, lte } from "drizzle-orm";
import { z } from "zod";
import { DataTableSkeleton } from "@/components/posts/data-table/data-table-skeleton";
import { ProductsTableShell } from "@/components/posts/data-table/products-table-shell";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
  searchParams: SearchParams;
}
const storesProductsSearchParamsSchema = searchParamsSchema.extend({
  name: z.string().optional(),
  categoryId: z.string().optional(),
  subcategory: z.string().optional(),
  active: z.string().optional(),
  sold: z.string().optional(),
});

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const storeId = Number(params.storeId);

  const {
    page,
    per_page,
    sort,
    name,
    categoryId,
    subcategory,
    active,
    sold,
    from,
    to,
  } = storesProductsSearchParamsSchema.parse(searchParams);
  // Fallback page for invalid page numbers
  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  // Number of items per page
  const limit = isNaN(per_page) ? 10 : per_page;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  // Column and order to sort by
  const [column, order] = (sort?.split(".") as [
    keyof Post | undefined,
    "asc" | "desc" | undefined
  ]) ?? ["createdAt", "desc"];

  // Strings of type: 2024-04-21 23:57:36
  const fromDay = from
    ? new Date(from).toISOString().slice(0, 19).replace("T", " ")
    : undefined;
  const toDay = to
    ? new Date(to).toISOString().slice(0, 19).replace("T", " ")
    : undefined;


  const productsPromise = db.transaction(async (tx) => {
    try {
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
            //Filter by active
            active ? eq(posts.active, active === "true") : undefined,
            //Filter by sold
            sold ? eq(posts.sold, sold === "true") : undefined,
            //Filter by createdAt and updatedAt
            fromDay && toDay
              ? and(gte(posts.createdAt, fromDay), lte(posts.createdAt, toDay))
              : undefined
          )
        )
        .orderBy(
          column && column in posts
            ? order === "asc"
              ? asc(posts[column])
              : desc(posts[column])
            : desc(posts.createdAt)
        );

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
            //Filter by active
            active ? eq(posts.active, active === "true") : undefined,
            //Filter by sold
            sold ? eq(posts.sold, sold === "true") : undefined,
            //Filter by createdAt and updatedAt
            fromDay && toDay
              ? and(gte(posts.createdAt, fromDay), lte(posts.createdAt, toDay))
              : undefined
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <DateRangePicker align="end" />
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            isNewRowCreatable={true}
            isRowsDeletable={true}
          />
        }
      >
        <ProductsTableShell promise={productsPromise} storeId={storeId} />
      </React.Suspense>
    </div>
  );
}
