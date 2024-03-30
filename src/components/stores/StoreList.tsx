"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Store, CompleteStore } from "@/lib/db/schema/stores";

import { Button } from "@/components/ui/button";
import StoreForm from "./StoreForm";
import { CheckCircleIcon, LinkIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { useOptimisticStores } from "@/app/(app)/(dashboard)/dashboard/stores/useOptimisticStores";
import { DrawerDialog } from "../DrawerDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Share1Icon } from "@radix-ui/react-icons";

type TOpenModal = (store?: Store) => void;

export default function StoreList({ stores }: { stores: CompleteStore[] }) {
  const { optimisticStores, addOptimisticStore } = useOptimisticStores(stores);
  const [open, setOpen] = useState(false);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const openModal = (store?: Store) => {
    setOpen(true);
    store ? setActiveStore(store) : setActiveStore(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div className="w-full">
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={activeStore ? "Edita tu Tienda" : "Crea tu tienda"}
        dialogDescription="Es facil y rapido"
      >
        <StoreForm
          store={activeStore}
          // addOptimistic={addOptimisticStore}
          openModal={openModal}
          closeModal={closeModal}
        />
      </DrawerDialog>
      {optimisticStores.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <section className="flex flex-col justify-center items-start gap-4">
          <Button
          disabled={optimisticStores.length >= 2}
          onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Crear Tienda{" "}
        </Button>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {optimisticStores.map((store) => (
              <Store store={store} key={store.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const Store = ({ store }: { store: CompleteStore }) => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 grid gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border">
            <AvatarImage
              alt="@jaredpalmer"
              className="w-16 h-16 rounded-full object-cover"
              src={store.image || "/placeholder.svg"}
            />
            <AvatarFallback>{store.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <h2 className="text-sm font-bold leading-none">{store.name}</h2>
            <p className="text-xs ">@{store.slug}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="w-4 h-4 opacity-70" />
          <span
            className={cn(
              "text-xs",
              store.active ? "text-green-500" : "text-red-500"
            )}
          >
            {store.active ? "Activa" : "Inactiva"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-4 h-4 opacity-70" />
          <span className="text-xs text-muted-foreground">
            {store.city}, {store.region}
          </span>
        </div>
        <div className="flex gap-4 justify-end items-center sm:flex-col lg:flex-row">
          <Button variant="link" asChild>
            <Link
              href={"/stores/" + store.slug}
              className="flex items-center space-x-1"
            >
              <span className="text-xs flex gap-2">
                <Share1Icon className="h-4" />
                Compartir tienda
              </span>
            </Link>
          </Button>
          <Button asChild>
            <Link
              href={"/stores/" + store.id}
              className="flex items-center space-x-1"
            >
              <span className="text-xs">Administrar tienda</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tienes tiendas
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Empieza creando una tienda
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Crear Tienda{" "}
        </Button>
      </div>
    </div>
  );
};
