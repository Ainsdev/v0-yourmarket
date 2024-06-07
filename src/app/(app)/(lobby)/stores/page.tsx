import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { getStoresForLobby } from "@/lib/api/stores/queries";
import { cache } from "@/lib/cache";
import { SearchParams } from "@/lib/types";
import { ChevronDownIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
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

interface StorePageParams {
  searchParams: SearchParams;
}
//TODO: Make a button ("Upload More") for change the limit and the offset of the shown stores. ANd make the query for that.
const getProducts = cache(
  (params) => {
    return getStoresForLobby(
      params?.region ?? null,
      params?.mainCategory ?? null
    );
  },
  ["/", "getStoresForLobby"],
  { revalidate: 60 * 60 * 24 }
);

// eslint-disable-next-line @next/next/no-async-client-component
export default async function StoresPage({ searchParams }: StorePageParams) {
  const router = useRouter();
  const [value, setValue] = React.useState(""); //TODO change this to the selected region
  const stores = await getProducts({
    region: searchParams.region,
    mainCategories: searchParams.mainCategory,
  });
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Tiendas</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Las mejores tiendas
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 w-full overflow-hidden">
        {/* <h3 className="text-2xl font-bold">Tiendas Destacadas</h3>
        <div className="w-full flex flex-col gap-4 overflow-x-scroll py-6">
          <div className="w-max flex gap-10">
            <DirectionAwareHover
              className="w-56 md:w-72"
              imageClassName="opacity-70"
              childrenClassName="flex flex-col items-start justify-center gap-2"
              imageUrl={
                "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
              }
            >
              <p className="font-bold text-xl">YourMarket</p>
              <p className="font-normal text-sm flex">
                <SewingPinFilledIcon />
                Maipu
              </p>
              <Button>Ver Tienda</Button>
            </DirectionAwareHover>
            <DirectionAwareHover
              className="w-56 md:w-72"
              imageClassName="opacity-70"
              childrenClassName="flex flex-col items-start justify-center gap-2"
              imageUrl={
                "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
              }
            >
              <p className="font-bold text-xl">YourMarket</p>
              <p className="font-normal text-sm flex">
                <SewingPinFilledIcon />
                Maipu
              </p>
              <Button>Ver Tienda</Button>
            </DirectionAwareHover>
          </div>
        </div> */}
        <h3 className="text-2xl font-bold">Tiendas Recientes</h3>
        <div className="w-full flex gap-4 p-4">
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
              <Button>Ver Tienda</Button>
            </DirectionAwareHover>
          ))}
          <DirectionAwareHover
            imageClassName="opacity-70 p-4"
            className="w-full"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={
              "https://pbs.twimg.com/profile_images/1471121187552083970/gzXvrRJL_400x400.jpg"
            }
          >
            <p className="font-bold text-xl">YourMarket</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              Maipu
            </p>
            <Button>Ver Tienda</Button>
          </DirectionAwareHover>
          <DirectionAwareHover
            imageClassName="opacity-70 p-4"
            className="w-full"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={
              "https://pbs.twimg.com/profile_images/1796324448666013696/m90MLYNJ_400x400.jpg"
            }
          >
            <p className="font-bold text-xl">YourMarket</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              Maipu
            </p>
            <Button>Ver Tienda</Button>
          </DirectionAwareHover>
        </div>
      </div>
    </Shell>
  );
}
