"use client";

import { useOptimistic, useState } from "react";
// import { TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";
import { type Post } from "@/lib/db/schema/posts";
import { cn } from "@/lib/utils";

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
  // pass imgs from : https://utfs.io/f/3af5cd21-6226-499f-95aa-13c7c9fc5410-3864fs.webp,https://utfs.io/f/2a19b19f-81cb-4b51-ac36-335fa66d6203-htox1b.webp,https://utfs.io/f/09ba8668-bc0e-407d-8743-b3c6251d0c09-kads82.webp to array

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
      <div className="flex justify-center flex-col items-center mb-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex gap-1 group/discount"
          >
            <RocketIcon />
            <span className="hidden group-hover/discount:flex group-hover/discount:animate-tracking-in-expand ease-in-out transition-all">
              Agregar Descuento
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex gap-1 group/analytcs"
              >
                <PieChartIcon />
                <span className="hidden group-hover/analytcs:flex group-hover/analytcs:animate-tracking-in-expand transition-all">
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
          <Button
            size="sm"
            variant="destructive"
            className="flex gap-1 group/eliminate"
          >
            <TrashIcon />
            <span className="hidden group-hover/eliminate:flex group-hover/eliminate:animate-tracking-in-expand ease-in-out transition-all">
              Eliminar
            </span>
          </Button>
          <Button size="sm" variant="default" className="flex gap-1">
            <Pencil1Icon />
            Editar
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-8 mt-4 sm:py-12">
          <div className="p-2">
            <Carousel className="p-2">
              <CarouselContent>
                {arrImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={optimisticPost.name + ` image ${index}`}
                      width={500}
                      height={500}
                      className={cn("rounded-lg")}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-red-500" />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h2 className="text-xl font-bold">Acme Wireless Headphones</h2>
              <p className="text-gray-500 dark:text-gray-400">
                High-quality wireless headphones with advanced noise
                cancellation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </span>
                <span className="text-lg font-bold">$99.99</span>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Brand
                </span>
                <span className="text-lg font-bold">Acme</span>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  SKU
                </span>
                <span className="text-lg font-bold">WH-1000XM4</span>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  In Stock
                </span>
                <span className="text-lg font-bold">50</span>
              </div>
            </div>
            <div className="grid gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Description
              </span>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                The Acme Wireless Headphones are the ultimate audio companion
                for your daily life. With advanced noise cancellation
                technology, you can enjoy your music, podcasts, or calls in
                peace, even in the noisiest environments. The sleek and
                comfortable design, combined with long-lasting battery life,
                makes these headphones the perfect choice for both work and
                leisure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
