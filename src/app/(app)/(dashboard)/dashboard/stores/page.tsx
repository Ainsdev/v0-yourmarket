import { Link, RocketIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/app/loading";
import StoreList from "@/components/stores/StoreList";
import { getStores } from "@/lib/api/stores/queries";

const Stores = async () => {
  const { stores } = await getStores();

  return (
    <Suspense fallback={<Loading />}>
      <StoreList stores={stores} />
    </Suspense>
  );
};

export default function StorePage() {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-stores-page-header"
        aria-labelledby="dashboard-stores-page-header-heading"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="">
            Tiendas
          </PageHeaderHeading>
        </div>

        <PageHeaderDescription size="sm">
          Administra tus tiendas
        </PageHeaderDescription>
      </PageHeader>
      <Alert
        id="dashboard-stores-page-alert"
        aria-labelledby="dashboard-stores-page-alert-heading"
      >
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Cambiate a Premium!</AlertTitle>
        <AlertDescription>
          Actualmente estas en el plan{" "}
          <span className="font-semibold">Basico</span> . Puedes crear un maximo
          de <span className="font-semibold">2</span> Tiendas y{" "}
          <span className="font-semibold">25</span> productos
        </AlertDescription>
        <Button size="sm" variant="link" disabled>
          Proximamente
        </Button>
      </Alert>
      {/* <DrawerDialog
        button={<Button>Crear Tienda</Button>}
        dialogTitle={"Crea tu tienda"}
        dialogDescription={"Es sencillo"}
      >
        <div className="p-4">
          <p>asd</p>
        </div>
      </DrawerDialog> */}
      <section
        id="dashboard-stores-page-stores"
        aria-labelledby="dashboard-stores-page-stores-heading"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Stores />
        {/* <Card>
          <div className="flex items-center p-4 gap-4">
            <Image
              alt="Image"
              className="rounded-lg"
              height="64"
              src="/placeholder.svg"
              style={{
                aspectRatio: "64/64",
                objectFit: "cover",
              }}
              width="64"
            />
            <CardContent className="space-y-2">
              <h3 className="text-lg font-bold">Sneaker Emporium</h3>
              <p className="text-sm text-foregournd">
                Your one-stop shop for the freshest kicks.
              </p>
            </CardContent>
          </div>
          <CardFooter>
            <Button size="sm">Manage</Button>
          </CardFooter>
        </Card> */}
      </section>
    </Shell>
  );
}
