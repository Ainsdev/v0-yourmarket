"use client";

import { Post } from "@/lib/db/schema/posts";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { PaginationState } from "@tanstack/react-table";
import { DataGalleryPagination } from "./data-gallery-pagination";
import { DataGalleryPost } from "./data-gallery-post";

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
}

export function ProductsGalleryView({
  promise,
  storeId,
}: ProductsGalleryShellProps) {
  const [isPending, startTransition] = React.useTransition();
  const { data, pageCount } = React.use(promise);
  const router = useRouter();
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search products..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <MixerHorizontalIcon className="h-5 w-5" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="space-y-2">
                    <Checkbox defaultChecked id="category-electronics">
                      Electronics
                    </Checkbox>
                    <Checkbox id="category-home">Home</Checkbox>
                    <Checkbox id="category-apparel">Apparel</Checkbox>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Price</h4>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Brand</h4>
                  <div className="space-y-2">
                    <Checkbox defaultChecked id="brand-acme">
                      Acme
                    </Checkbox>
                    <Checkbox id="brand-other">Other</Checkbox>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <DataGalleryPost key={product.id} data={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8 w-full">
        <DataGalleryPagination maxPage={pageCount} />
      </div>
    </div>
  );
}
