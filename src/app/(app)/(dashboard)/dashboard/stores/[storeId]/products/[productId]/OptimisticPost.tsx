"use client";

import { useOptimistic, useState } from "react";
// import { TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";
import { type Post } from "@/lib/db/schema/posts";
import { cn, numberToClp } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PostForm from "@/components/posts/PostForm";
import { type Store, type StoreId } from "@/lib/db/schema/stores";
import { DrawerDialog } from "@/components/DrawerDialog";
import {
  Pencil1Icon,
  PieChartIcon,
  RocketIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import { genders, productCategories } from "@/config/categories";
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
import { deletePostAction } from "@/lib/actions/posts";

export default function OptimisticPost({
  post,
  store,
  storeId,
  startOpen,
}: {
  post: Post;
  store: Store;
  storeId?: StoreId;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen || false);
  const openModal = (_?: Post) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);
  const arrImages = post.images.split(",");

  return (
    <div className="m-2">
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        dialogTitle="Edita tu Post"
        dialogDescription="Es facil y rapido"
      >
        <PostForm
          post={post}
          openModal={openModal}
          closeModal={closeModal}
          store={store}
          storeId={storeId}
        />
      </DrawerDialog>
      <div className="flex justify-center flex-col items-center">
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-1 group/discount">
            <RocketIcon />
            <span className="hidden sm:group-hover/discount:flex sm:group-hover/discount:animate-tracking-in-expand ease-in-out transition-all">
              Agregar Descuento
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-1 group/analytcs">
                <PieChartIcon />
                <span className="hidden sm:group-hover/analytcs:flex sm:group-hover/analytcs:animate-tracking-in-expand transition-all">
                  Analytics
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>Ver Analytics</DropdownMenuItem>
              <DropdownMenuItem disabled>Compartir Analytics</DropdownMenuItem>
              <DropdownMenuItem disabled>Ajustes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog>
            <AlertDialogTrigger className="flex gap-1 group/eliminate">
              <Button
                variant="destructive"
                className="flex gap-1 group/eliminate"
              >
                <TrashIcon />
                <span className="hidden sm:group-hover/eliminate:flex sm:group-hover/eliminate:animate-tracking-in-expand ease-in-out transition-all">
                  Eliminar
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Estas 100% seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Al eliminar este post no podras recuperarlo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    deletePostAction(post.id); //TODO send to other url and dont revaildate path
                  }}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={() => openModal(post)}
            variant="default"
            className="flex gap-1"
          >
            <Pencil1Icon />
            Editar
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-8 mt-4 sm:py-12 sm:border sm:border-muted rounded-md sm:px-2">
          <div className="p-10 w-full">
            <Carousel>
              <CarouselContent>
                {arrImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={optimisticPost.name + ` image ${index}`}
                      width={600}
                      height={600}
                      className={cn("rounded-md")}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="grid gap-1">
            <div>
              <h2 className="text-xl font-bold">{optimisticPost.name}</h2>
              <p className="text-muted-foreground">
                {productCategories[optimisticPost.categoryId].title +
                  " - " +
                  optimisticPost.subcategory}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Precio
                </span>
                <span className="text-lg font-bold">
                  {numberToClp(`${optimisticPost.price}`)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Marca
                </span>
                <span className="text-lg font-bold">
                  {optimisticPost.brand}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Talla
                </span>
                <span className="text-lg font-bold">{optimisticPost.size}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Detalles
                </span>
                <ul className="text-sm font-semibold text-secondary-foreground">
                  <li className="list-disc">
                    Condicion: {optimisticPost.condition}
                  </li>
                  <li className="list-disc">
                    Genero: {genders[optimisticPost.gender as number]}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Descripcion
              </span>
              <p className="text-base leading-relaxed text-secondary-foreground">
                {optimisticPost.description}
              </p>
            </div>
            <div className="flex flex-col gap-1 pt-20">
              <span className="text-xs font-medium text-muted-foreground">
                Creado: {optimisticPost.createdAt}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Actualizado: {optimisticPost.updatedAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
