"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Post, CompletePost } from "@/lib/db/schema/posts";
import Modal from "@/components/shared/Modal";
import { type Store, type StoreId } from "@/lib/db/schema/stores";

import { Button } from "@/components/ui/button";
import PostForm from "./PostForm";
import { PlusIcon } from "lucide-react";
import { useOptimisticPosts } from "@/app/(app)/(lobby)/posts/useOptimisticPosts";
import { DrawerDialog } from "../DrawerDialog";

type TOpenModal = (post?: Post) => void;

export default function PostList({
  posts,
  stores,
  storeId,
}: {
  posts: CompletePost[];
  stores: Store[];
  storeId?: StoreId;
}) {
  const { optimisticPosts } = useOptimisticPosts(posts, stores);
  const [open, setOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const openModal = (post?: Post) => {
    setOpen(true);
    post ? setActivePost(post) : setActivePost(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div className="w-full">
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={activePost ? "Edita tu Post" : "Crea tu Post"}
        dialogDescription="Es facil y rapido"
      >
        <PostForm
          post={activePost}
          openModal={openModal}
          closeModal={closeModal}
          stores={stores}
          storeId={storeId}
        />
      </DrawerDialog>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPosts.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPosts.map((post) => (
            <Post post={post} key={post.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}

const Post = ({
  post,
  openModal,
}: {
  post: CompletePost;
  openModal: TOpenModal;
}) => {
  const optimistic = post.id === "optimistic";
  const deleting = post.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("posts") ? pathname : pathname + "/posts/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{post.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + post.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No hay publicaciones
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Crea una publicacion para que tus clientes se enteren de tus novedades.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Comenzar{" "}
        </Button>
      </div>
    </div>
  );
};
