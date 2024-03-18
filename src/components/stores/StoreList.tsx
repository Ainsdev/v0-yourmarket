"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Store, CompleteStore } from "@/lib/db/schema/stores";
import Modal from "@/components/shared/Modal";


import { Button } from "@/components/ui/button";
import StoreForm from "./StoreForm";
import { PlusIcon } from "lucide-react";
import { useOptimisticStores } from "@/app/(app)/(lobby)/stores/useOptimisticStores";

type TOpenModal = (store?: Store) => void;

export default function StoreList({
  stores,
   
}: {
  stores: CompleteStore[];
   
}) {
  const { optimisticStores, addOptimisticStore } = useOptimisticStores(
    stores,
     
  );
  const [open, setOpen] = useState(false);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const openModal = (store?: Store) => {
    setOpen(true);
    store ? setActiveStore(store) : setActiveStore(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeStore ? "Edit Store" : "Create Store"}
      >
        <StoreForm
          store={activeStore}
          addOptimistic={addOptimisticStore}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticStores.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticStores.map((store) => (
            <Store
              store={store}
              key={store.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Store = ({
  store,
  openModal,
}: {
  store: CompleteStore;
  openModal: TOpenModal;
}) => {
  const optimistic = store.id === "optimistic";
  const deleting = store.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("stores")
    ? pathname
    : pathname + "/stores/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{store.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + store.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No stores
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new store.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Stores </Button>
      </div>
    </div>
  );
};
