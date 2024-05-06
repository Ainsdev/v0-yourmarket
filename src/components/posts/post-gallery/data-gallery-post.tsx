import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { productCategories } from "@/config/categories";
import { Post } from "@/lib/db/schema/posts";
import { cn, numberToClp } from "@/lib/utils";
import { CalendarIcon, PauseIcon, Share1Icon } from "@radix-ui/react-icons";
import { BuildingIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface DataTableProps<TData, TValue> {
  data: AwaitedProduct;
}

export function DataGalleryPost<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  return (
    <Card
      className={cn(
        "w-full max-w-md group hover:scale-[1.008]",
        "transition-transform ease-in-out",
        data.sold && "border-2 border-destructive",
        !data.sold && !data.active && "ring-1 ring-muted-foreground"
      )}
    >
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <Image
          src={data.mainImage}
          alt="Product image"
          layout="fill"
          objectFit="cover"
          className="bg-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-transparent" />
        {data.active && !data.sold && (
          <Badge
            className={cn(
              "absolute top-4 right-4",
              data.active ? "bg-green-500/80" : "bg-muted"
            )}
          >
            {data.active ? "Activa" : "Inactiva"}
          </Badge>
        )}
        {data.sold && (
          <Badge variant="destructive" className="absolute top-4 right-4">
            Vendido
          </Badge>
        )}
      </div>
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-medium">{data.name}</h3>
            <p className="text-lg font-semibold">
              {numberToClp(`${data.price}`)}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 " />
            <span className="text-sm">
              {productCategories.find(
                (category) => category.id === data.categoryId
              )?.title +
                "/" +
                data.subcategory}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BuildingIcon className="h-5 w-5" />
            <span className="text-sm ">
              {data.brand.charAt(0).toUpperCase() + data.brand.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon />
            <span className="text-xs">
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger disabled={data.sold as boolean}>
                <PauseIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Pausar Publicacion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger disabled={data.sold as boolean}>
                <Share1Icon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartir Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Ver</Button>
          <Button>Editar</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
