import { Button } from "@/components/ui/button";
import { InstagramLogoIcon, Share1Icon, StarIcon } from "@radix-ui/react-icons";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StorePage({ params }: { params: { storeId: string } }) {
  return (
    <div className="xl:px-24 sm:px-10 px-4 py-4 bg-secondary rounded-lg max-w-4xl flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-4">
          <Image
            src="https://pbs.twimg.com/profile_images/1471121187552083970/gzXvrRJL_400x400.jpg"
            alt={"aa"}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">YourMarket</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <StarIcon className="w-5 h-5" />
                <StarIcon className="w-5 h-5" />
                <StarIcon className="w-5 h-5" />
                <StarIcon className="w-5 h-5" />
                <StarIcon className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              4.8 (123 Ventas)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="icon">
            <Link href='#'>
              <InstagramLogoIcon />
            </Link>
          </Button>
          <Button variant="outline" asChild size="icon">
            <Link href='#'>
              <Share1Icon />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-2">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          error iure perferendis adipisci minus quos in commodi, dignissimos
          omnis architecto earum nisi possimus quis iusto autem a, vel nemo
          dolorum.
        </p>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Maipu, Región Metropolitana
          </span>
        </div>
      </div>
    </div>
  );
}
