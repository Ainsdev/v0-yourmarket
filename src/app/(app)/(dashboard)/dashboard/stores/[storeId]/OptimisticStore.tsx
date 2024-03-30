"use client";

import { useOptimistic, useState } from "react";

import { type Store } from "@/lib/db/schema/stores";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import StoreForm from "@/components/stores/StoreForm";
import { TAddOptimistic } from "../useOptimisticStores";
import { DrawerDialog } from "@/components/DrawerDialog";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OptimisticStore({ store }: { store: Store }) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Store) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticStore, setOptimisticStore] = useOptimistic(store);
  const updateStore: TAddOptimistic = (input) =>
    setOptimisticStore({ ...input.data });

  return (
    <div className="m-4">
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        dialogTitle="Edita tu Tienda"
        dialogDescription="Es facil y rapido"
      >
        <StoreForm
          store={optimisticStore}
          // addOptimistic={addOptimisticStore}
          openModal={openModal}
          closeModal={closeModal}
        />
      </DrawerDialog>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticStore.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Editar
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl mx-auto px-4 py-6 w-full">
        <Card className="w-full">
          <CardHeader className="p-4">
          <CardTitle className="p-4">
            <h2 className="text-lg font-semibold">Informacion</h2>
          </CardTitle>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="grid items-start gap-1.5">
                <h3 className="text-sm font-bold tracking-wide">
                  Hola, Store 1
                </h3>
                <p className="text-sm text-gray-500 leading-none">
                  Tu tienda se ve genial!
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-5">
            <div className="flex items-center justify-between space-x-4">
              <div className="grid items-start gap-1.5">
                <h3 className="text-sm font-semibold tracking-wide">Ventas</h3>
                <h4 className="text-2xl font-extrabold tracking-tight leading-none">
                  $1,249.00
                </h4>
              </div>
              <Button disabled size="sm">
                Ver Ordenes
              </Button>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="grid items-start gap-1.5">
                <h3 className="text-sm font-semibold tracking-wide">Reviews</h3>
                <h4 className="text-2xl font-extrabold tracking-tight leading-none flex justify-center items-center gap-1">
                  <StarIcon className="h-6 w-6" />
                  4.5
                </h4>
              </div>
              <Button size="sm">Ver Reviews</Button>
            </div>
          </CardContent>
        </Card>
      
      </div>
    </div>
  );
}
