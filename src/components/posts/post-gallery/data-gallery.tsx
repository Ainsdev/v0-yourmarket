"use client";

import { Post } from "@/lib/db/schema/posts";
import React from "react";
import { DataGalleryPagination } from "./data-gallery-pagination";
import { DataGalleryPost } from "./data-gallery-post";
import { GalleryFilters } from "./data-gallery-filters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GalleryImagePost } from "./data-gallery-image-post";

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
  | "size"
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

  React.useEffect(() => {
    setPosts(data);
  }, [data]);

  return (
    <div className="w-full mx-auto py-8 px-4 md:px-6 overflow-auto">
      {admin ? (
        <GalleryFilters />
      ) : (
        <Accordion type="single" collapsible className="pb-4" >
          <AccordionItem value="item-1">
            <AccordionTrigger className="w-48">Filtros</AccordionTrigger>
            <AccordionContent className="w-full">
              <GalleryFilters />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin
          ? // For admin dashboard
            posts.length > 0
            ? posts.map((product) => (
                <DataGalleryPost key={product.id} data={product} />
              ))
            : "No hay resultados"
          : // For store view page
          posts.length > 0
          ? posts.map((product) => (
              <GalleryImagePost
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.mainImage}
                size={product.size}
              />
            ))
          : "No hay publicaciones aun"}
      </div>
      <div className="flex justify-center mt-8 w-full">
        <DataGalleryPagination maxPage={pageCount} />
      </div>
    </div>
  );
}
