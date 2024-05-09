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
    <div className="m-4">
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
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPost.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Editar
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticPost.id === "optimistic" ? "animate-pulse" : ""
        )}
      >
        {JSON.stringify(optimisticPost, null, 2)}
      </pre>
    </div>
  );
}
