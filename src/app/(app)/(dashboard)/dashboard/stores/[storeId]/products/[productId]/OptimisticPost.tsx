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
      <div className="flex justify-center items-center mb-4">
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
                <span className="hidden group-hover/analytcs:flex group-hover/analytcs:animate-tracking-in-expand ease-in-out transition-all">
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
      </div>
    </div>
  );
}
