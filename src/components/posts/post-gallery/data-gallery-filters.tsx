"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { DateRangePicker } from "@/components/date-range-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { productCategories } from "@/config/categories";

export function GalleryFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
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
  //states
  const [categories, setCategories] = React.useState<Array<number>>([]);
  const [status, setStatus] = React.useState<string | null>(null);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Buscar nombre..."
            type="search"
            onChange={(event) => {
              // Update query string "name"
              const name = event.target.value;
              //Only update the query string after 500ms
              setTimeout(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    name: name || null,
                  })}`
                );
              }, 500);
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2" variant="outline">
              <MixerHorizontalIcon className="h-5 w-5" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categorias</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {productCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={categories.includes(category.id)}
                onCheckedChange={(checked) => {
                  setCategories((prev) =>
                    checked
                      ? [...prev, category.id]
                      : prev.filter((id) => id !== category.id)
                  );
                  // Update query string "categories"
                  router.push(
                    `${pathname}?${createQueryString({
                      categories: categories.length
                        ? categories.join(",")
                        : null,
                    })}`
                  );
                }}
              >
                {category.title}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { id: "active", title: "Activo" },
              { id: "inactive", title: "Inactivo" },
              { id: "sold", title: "Vendido" },
            ].map((item) => (
              <DropdownMenuCheckboxItem
                key={item.id}
                checked={status === item.id}
                onCheckedChange={(checked) => {
                  setStatus(checked ? item.id : null);
                  if (item.id === "sold") {
                    // Update query string "sold"
                    router.push(
                      `${pathname}?${createQueryString({
                        sold: checked ? 1 : null,
                      })}`
                    );
                    return;
                  }
                  // Update query string "active"
                  else if (item.id === "active") {
                    router.push(
                      `${pathname}?${createQueryString({
                        active: checked ? 1 : null,
                      })}`
                    );
                    return;
                  }
                  // Update query string "inactive"
                  else {
                    router.push(
                      `${pathname}?${createQueryString({
                        inactive: checked ? 0 : null,
                      })}`
                    );
                  }
                }}
              >
                {item.title}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DateRangePicker hideText align="end" />
    </div>
  );
}
