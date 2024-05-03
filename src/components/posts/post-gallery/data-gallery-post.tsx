import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/lib/db/schema/posts";
import { CheckIcon } from "@radix-ui/react-icons";
import { BuildingIcon, TagIcon } from "lucide-react";
import Image from "next/image";

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
    <Card className="w-full max-w-md">
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <Image
          src={data.mainImage}
          alt="Product image"
          layout="fill"
          objectFit="cover"
          className="bg-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <p className="text-2xl font-bold">{data.price}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-secondary" />
            <span className="text-sm">{data.subcategory}</span>
          </div>
          <div className="flex items-center gap-2">
            <BuildingIcon className="h-5 w-5" />
            <span className="text-sm ">{data.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-500">
              {data.active ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 " />
            <span className="text-sm">
              {data.sold ? "Vendido" : "No vendido"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
