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
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Share1Icon } from "@radix-ui/react-icons";
import { Progress } from "@radix-ui/react-progress";

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
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-3xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
        <Card
          id="connect-to-stripe"
          aria-labelledby="connect-to-stripe-heading"
          className="w-full relative max-w-3xl"
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
            <Button asChild variant="ghost" size="icon" className="absolute top-4 right-4">
              <Link href={`/dashboard/stores/${optimisticStore.id}/products`}>
                <Share1Icon className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex justify-start items-start gap-4 w-full">
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
