"use client";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import {
  ChevronDownIcon,
  MixerHorizontalIcon,
  SewingPinFilledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCategories } from "@/config/categories";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { regions } from "@/config/regions";
import { SearchParams } from "@/lib/types";
import { Store } from "@/lib/db/schema/stores";
import Link from "next/link";

type StoreViewProps = {
  stores: { stores: Store[] };
  searchParams: SearchParams;
};

export default function StoreView({ stores, searchParams }: StoreViewProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(""); //TODO change this to the selected region
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <h3 className="text-2xl font-bold">Tiendas Recientes</h3>
      <div className="w-full flex gap-4 p-4" id="store-filters">
        <Select
          onValueChange={(value) => {
            router.push(
              `?${new URLSearchParams({
                ...searchParams,
                mainCategory: value,
              }).toString()}`
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por categoria"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Principal</SelectLabel>
              {productCategories.map((category) => (
                <SelectItem key={category.id} value={`${category.id}`}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger disabled>
            <Button disabled variant="outline">
              {value ? value : "Filtrar por region"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Command>
              <CommandInput placeholder="Buscar..." />
              <CommandEmpty> No hay resultados</CommandEmpty>
              {regions.map((region) => (
                <CommandGroup key={region.region} heading={region.region}>
                  {region.comunas.map((comuna) => (
                    <CommandItem
                      key={comuna}
                      value={comuna}
                      // onSelect={() => {
                      //   setValue(comuna);
                      //   setOpen(false);
                      // }}
                    >
                      {comuna}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            router.push(`?${new URLSearchParams("").toString()}`);
          }}
          size="icon"
          variant="outline"
        >
          <TrashIcon />
          <span className="sr-only">Limpiar Filtros</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {stores.stores.map((store) => (
          <DirectionAwareHover
            key={store.id}
            imageClassName="opacity-70 p-4"
            className="w-full"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={store.image as string}
          >
            <p className="font-bold text-xl">{store.name}</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              {store.city}
            </p>
            <Button asChild>
              <Link href={`/stores/${store.id}`}>Ver Tienda</Link>
            </Button>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
}
