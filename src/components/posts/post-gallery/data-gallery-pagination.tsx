import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { PaginationState, type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface DataGalleryPaginationProps {
  pageSizeOptions?: number[];
  maxPage?: number;
}

export function DataGalleryPagination({
  pageSizeOptions = [10, 25],
  maxPage,
}: DataGalleryPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const sort = searchParams?.get("sort");
  const currentPage = Number(searchParams.get("page")) || 1;
  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });
  }, [fallbackPage, fallbackPerPage]);

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);
  //&per_page=n Means that the number of items per page is n
  //   const setItemsPerPage = (perPage: number) => {
  //     const createPerPageURL = (perPageNumber: number | string) => {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("per_page", perPageNumber.toString());
  //       return `${pathname}?${params.toString()}`;
  //     };
  //   };

  //   //?page=n Means that the current page is n
  //   const setPage = (page: number) => {
  //     const createPageURL = (pageNumber: number | string) => {
  //       const params = new URLSearchParams(searchParams);
  //       params.set("page", pageNumber.toString());
  //       return `${pathname}?${params.toString()}`;
  //     };
  //   };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Posts por pagina
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              router.push(
                `${pathname}?${createQueryString({
                  page: pageIndex,
                  per_page: value,
                })}`,
                {
                  scroll: false,
                }
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={
                  pageSizeOptions.includes(currentPage)
                    ? currentPage
                    : pageSizeOptions[0]
                }
              />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Pagina {currentPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => router.push(`${pathname}?page=1`, { scroll: false })}
            disabled={currentPage === 1}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              router.push(`${pathname}?page=${currentPage - 1}`, {
                scroll: false,
              })
            }
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              router.push(`${pathname}?page=${currentPage + 1}`, {
                scroll: false,
              });
            }}
            disabled={currentPage === maxPage}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => {
              router.push(`${pathname}?page=${maxPage}`, { scroll: false });
            }}
            disabled={currentPage === maxPage}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
