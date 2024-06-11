"use client";

import { Post } from "@/lib/db/schema/posts";
import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";
import { DataGalleryPagination } from "./data-gallery-pagination";
import { DataGalleryPost } from "./data-gallery-post";
import { GalleryFilters } from "./data-gallery-filters";

//&per_page=n Means that the number of items per page is n

type AwaitedProduct = Pick<
  Post,
  | "id"
  | "name"
  | "active"
  | "categoryId"
  | "subcategory"
  | "price"
  | "sold"
  | "createdAt"
  | "brand"
  | "mainImage"
>;

interface ProductsGalleryShellProps {
  promise: Promise<{
    data: AwaitedProduct[];
    pageCount: number;
  }>;
  storeId: number;
  admin?: boolean;
}

export function ProductsGalleryView({
  promise,
  storeId,
  admin = false,
}: ProductsGalleryShellProps) {
  // const [isPending, startTransition] = React.useTransition();
  const { data, pageCount } = React.use(promise);
  const [posts, setPosts] = React.useState<AwaitedProduct[]>(data);
  //useeffect
  // React.useEffect(() => {
  //   setPosts(data);
  // }, [data]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const per_page = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(per_page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  //search by name (&name='name')
  const setNames = (name: string) => {
    const createNameURL = (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("name", name);
      return `${pathname}?${params.toString()}`;
    };
  };

  return (
    <div className="w-full mx-auto py-8 px-4 md:px-6 overflow-auto">
      <GalleryFilters />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin ? (
          data.length > 0 ? (
            data.map((product) => (
              <DataGalleryPost key={product.id} data={product} />
            ))
          ) : (
            "No hay resultados"
          )
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center mt-8 w-full">
        <DataGalleryPagination maxPage={pageCount} />
      </div>
    </div>
  );
}
