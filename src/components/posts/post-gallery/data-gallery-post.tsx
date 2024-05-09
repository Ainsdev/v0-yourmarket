import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { productCategories } from "@/config/categories";
import { Post } from "@/lib/db/schema/posts";
import { cn, numberToClp } from "@/lib/utils";
import {
  CalendarIcon,
  EyeOpenIcon,
  PauseIcon,
  Pencil2Icon,
  Share1Icon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { BuildingIcon, MoreHorizontal, TagIcon } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateStatusPostAction, deletePostAction } from "@/lib/actions/posts";
import { toast } from "sonner";
import Link from "next/link";

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
        "w-full group hover:scale-[1.008]",
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
        {!data.sold && !data.active && (
          <Badge
            variant="secondary"
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
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 gap-4">
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
      <CardFooter className="flex justify-between sm:justify-center xl:justify-between items-start p-4 gap-2 sm:flex-col 2xl:flex-row">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="border p-2 border-muted rounded-xl"
                disabled={data.sold as boolean}
              >
                {data.active ? <PauseIcon /> : <PlayIcon />}
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.active ? "Pausar" : "Activar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="border p-2 border-muted rounded-xl z-50"
                disabled={data.sold as boolean}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard
                    .writeText(`http://localhost:3000/posts/${data.id}`)
                    .then(() => {
                      toast.info("Link copiado", {
                        position: "top-center",
                        duration: 3000,
                      });
                    });
                }}
              >
                <Share1Icon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartir Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  // post.sold
                  //   ? toast.error("Este producto ya fue vendido")
                  //   : updateStatusPostAction(post.id, !post.sold, "SOLD");
                  updateStatusPostAction(data.id, !data.sold, "SOLD");
                }}
                className="flex gap-1 cursor-pointer"
              >
                Vendido:
                <Badge variant="outline" className="capitalize ">
                  {data.sold ? "Si" : "No"}
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-1 cursor-pointer"
                // onClick={() => openModal(data)}
              >
                <Pencil2Icon /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-1 cursor-pointer"
                onClick={() =>
                  updateStatusPostAction(data.id, !data.active, "ACTIVE")
                }
              >
                {data.active ? <PauseIcon /> : <PlayIcon />}
                {data.active ? "Pausar" : "Activar"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-1 "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <AlertDialog>
                  <AlertDialogTrigger className="text-destructive">
                    Eliminar
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Estas 100% segur@?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Al eliminar este post no podras recuperarlo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          deletePostAction(data.id);
                        }}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 self-end  ">
          <Button size="sm" variant="outline">
            Vista previa
          </Button>
          <Button>Editar</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
