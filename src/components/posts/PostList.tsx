"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, numberToClp } from "@/lib/utils";
import { type Post, CompletePost } from "@/lib/db/schema/posts";
import Modal from "@/components/shared/Modal";
import { type Store, type StoreId } from "@/lib/db/schema/stores";

import { Button } from "@/components/ui/button";
import PostForm from "./PostForm";
import { useOptimisticPosts } from "@/app/(app)/(lobby)/posts/useOptimisticPosts";
import { DrawerDialog } from "../DrawerDialog";
import {
  CopyIcon,
  EyeOpenIcon,
  LockClosedIcon,
  LockOpen1Icon,
  Pencil2Icon,
  PlusCircledIcon,
  PlusIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePostAction, updateStatusPostAction } from "@/lib/actions/posts";
import { toast } from "sonner";

type TOpenModal = (post?: Post) => void;

export default function PostList({
  posts,
  store,
  storeId,
}: {
  posts: CompletePost[];
  store: Store;
  storeId?: StoreId;
}) {
  const { optimisticPosts } = useOptimisticPosts(posts, store);
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
          store={store}
          storeId={storeId}
        />
      </DrawerDialog>
      {optimisticPosts.length === 0 ? (
        <></>
      ) : (
        <div className="absolute right-0 top-0 ">
          <Button
            className="flex gap-1 justify-center items-center"
            onClick={() => openModal()}
            variant={"outline"}
          >
            <PlusCircledIcon /> Agregar Producto
          </Button>
        </div>
      )}
      {optimisticPosts.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <section className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Estatus</TableHead>
                <TableHead className="hidden md:table-cell">Precio</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="hidden md:table-cell"></TableHead>
                <TableHead>
                  <span className="sr-only">acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optimisticPosts.map((post) => (
                <Post post={post} key={post.id} openModal={openModal} />
              ))}
            </TableBody>
          </Table>
        </section>
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
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={post.mainImage}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{post.name}</TableCell>
      <TableCell>
        {post.sold ? (
          <Badge variant="destructive" className="capitalize ">
            Vendido
          </Badge>
        ) : (
          <Badge variant={post.active ? "outline" : "secondary"}>
            {post.active ? "Activo" : "Inactivo"}
          </Badge>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {numberToClp(`${post?.price}`)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(post.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Button
          onClick={() => updateStatusPostAction(post.id, !post.sold, "SOLD")}
          variant="secondary"
          className="text-default"
          disabled={post.sold as boolean}
        >
          Marcar como vendido
        </Button>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem className="flex gap-1">
              <EyeOpenIcon />
              <Link href={`${basePath}${post.id}`}>Ver</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard
                  .writeText(`http://localhost:3000//posts/${post.id}`)
                  .then(() => {
                    toast.info("Link copiado", {
                      position: "top-center",
                      duration: 3000,
                    });
                  });
              }}
              className="flex gap-1 cursor-pointer"
            >
              <Share1Icon />
              Compartir
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // post.sold
                //   ? toast.error("Este producto ya fue vendido")
                //   : updateStatusPostAction(post.id, !post.sold, "SOLD");
                updateStatusPostAction(post.id, !post.sold, "SOLD");
              }}
              className="flex gap-1 cursor-pointer"
            >
              Vendido:
              <Badge variant="outline" className="capitalize ">
                {post.sold ? "Si" : "No"}
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-1 cursor-pointer"
              onClick={() => openModal(post)}
            >
              <Pencil2Icon /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-1 cursor-pointer"
              onClick={() =>
                updateStatusPostAction(post.id, !post.active, "ACTIVE")
              }
            >
              {post.active ? <LockOpen1Icon /> : <LockClosedIcon />}
              {post.active ? "Desactivar" : "Activar"}
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
                        deletePostAction(post.id);
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
      </TableCell>
    </TableRow>
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
