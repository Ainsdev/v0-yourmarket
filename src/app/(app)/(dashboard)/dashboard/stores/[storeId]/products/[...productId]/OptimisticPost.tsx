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
import DefaultPostView from "@/components/posts/DefaultViewPost";

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
        <DefaultPostView post={optimisticPost} />
      </div>
    </div>
  );
}


