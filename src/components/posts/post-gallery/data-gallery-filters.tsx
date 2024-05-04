import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/date-range-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

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

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Buscar nombre..."
            type="search"
            onChange={() => {
              // Update query string "name"
            }}
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
      <DateRangePicker hideText align="end" />
    </div>
  );
}
