import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { getStoreForLobby } from "@/lib/api/stores/queries";
import { InstagramLogoIcon, Share1Icon, StarIcon } from "@radix-ui/react-icons";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 0;

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const { store } = await getStoreForLobby(Number(params.storeId));
  if (!store) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <div className="xl:px-12 sm:px-10 px-4 py-4 bg-secondary rounded-lg w-full max-w-4xl flex flex-col gap-4">
        <div className="flex items-start justify-between w-full gap-2">
          <div className="flex items-center justify-start gap-4">
            <Image
              src={store.image || "/images/placeholder.jpg"}
              alt={store.slug}
              width={90}
              height={90}
              className="rounded-2xl"
            />
            <div className="grid gap-1">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl font-bold">{store.name}</h2>
                <span className="text-sm text-muted-foreground">
                  @{store.slug}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-yellow-500">
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5" />
                  <StarIcon className="w-5 h-5 text-gray-300" />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                4.8 (125 Ventas)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-col-reverse sm:flex-row px-2">
            <Button variant="outline" asChild size="icon">
              <Link href="#">
                <InstagramLogoIcon />
              </Link>
            </Button>
            <Button variant="outline" asChild size="icon">
              <Link href="#">
                <Share1Icon />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <p>{store.description || "Una tienda especial."}</p>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {store.city || "Ciudad"}
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
