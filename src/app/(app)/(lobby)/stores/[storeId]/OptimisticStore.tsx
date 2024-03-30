"use client";

import { useOptimistic, useState } from "react";

import { type Store } from "@/lib/db/schema/stores";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import StoreForm from "@/components/stores/StoreForm";
import { TAddOptimistic } from "../useOptimisticStores";
import { DrawerDialog } from "@/components/DrawerDialog";


export default function OptimisticStore({ 
  store,
   
}: { 
  store: Store; 
  
  
}) {
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
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticStore.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticStore, null, 2)}
      </pre>
    </div>
  );
}
