"use client";

import { useOptimistic, useState } from "react";

import { type Store } from "@/lib/db/schema/stores";
import { cn, numberToClp } from "@/lib/utils";

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

type Analytics = {
  revenue: string | null;
  count: number | null;
};

export default function OptimisticStore({
  store,
  analytics,
}: {
  store: Store;
  analytics: Analytics;
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
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card
            id="connect-to-stripe"
            aria-labelledby="connect-to-stripe-heading"
            className="w-full relative max-w-7xl col-span-full"
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
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
              >
                <Link href={`/stores/${optimisticStore.id}`}>
                  <Share1Icon className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex justify-start items-start gap-4 w-full">
                <Button
                  onClick={() => setOpen(true)}
                  className="drop-shadow-[0_20px_50px_rgba(266,_120,_81,_0.1)] hover:drop-shadow-[0_20px_15px_rgba(266,_120,_81,_0.2)]"
                >
                  Editar Tiend
                </Button>
                <Button variant="secondary"> Ver Tienda </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="h-36">
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-2xl">
                {numberToClp(`${analytics.revenue}`) || "$0.00"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">En Ventas</div>
            </CardContent>
            <CardFooter>
              <Progress value={25} max={100} />
            </CardFooter>
          </Card>
          <Card className="h-36">
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-2xl">{analytics.count || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Vendidos</div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
