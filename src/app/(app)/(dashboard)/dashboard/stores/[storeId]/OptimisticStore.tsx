"use client";

import { useOptimistic, useState } from "react";

import { type Store } from "@/lib/db/schema/stores";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import StoreForm from "@/components/stores/StoreForm";
import { TAddOptimistic } from "../useOptimisticStores";
import { DrawerDialog } from "@/components/DrawerDialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl mx-auto px-4 py-6 w-full">
        <Card
          id="connect-to-stripe"
          aria-labelledby="connect-to-stripe-heading"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              {optimisticStore.name}
            </CardTitle>
            <CardDescription>
              {optimisticStore.description || "Sin descripción"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between items-center gap-4 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button
                onClick={() => setOpen(true)}
                className="drop-shadow-[0_20px_50px_rgba(266,_120,_81,_0.1)] hover:drop-shadow-[0_20px_15px_rgba(266,_120,_81,_0.2)]"
              >
                Editar Tienda
              </Button>
              <Button variant="secondary"> Ver Tienda </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
