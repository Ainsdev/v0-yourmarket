"use client";

import { useOptimistic, useState } from "react";
// import { TAddOptimistic } from "@/app/(app)/posts/useOptimisticPosts";
import { type Post } from "@/lib/db/schema/posts";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PostForm from "@/components/posts/PostForm";
import { type Store, type StoreId } from "@/lib/db/schema/stores";

export default function OptimisticPost({ 
  post,
  stores,
  storeId 
}: { 
  post: Post; 
  
  stores: Store;
  storeId?: StoreId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Post) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPost, setOptimisticPost] = useOptimistic(post);
  // const updatePost: TAddOptimistic = (input) =>
  //   setOptimisticPost({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <PostForm
          post={optimisticPost}
          store={stores}
        storeId={storeId}
          closeModal={closeModal}
          openModal={openModal}
          // addOptimistic={updatePost}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPost.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticPost.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticPost, null, 2)}
      </pre>
    </div>
  );
}
