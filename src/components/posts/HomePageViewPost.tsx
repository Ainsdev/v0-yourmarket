/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rzVoFfbmzMP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FeaturedPost } from "@/lib/api/posts/types";
import { numberToClp } from "@/lib/utils";
import Link from "next/link";

export default function HomePageViewPosts({
  products,
}: {
  products: FeaturedPost[];
}) {
  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
            >
              <div className="p-2">
                <Card className="relative">
                  <div className="absolute top-0 left-0 p-1 w-1/3 h-max bg-white/50  bg-clip-padding backdrop-filter backdrop-blur-sm z-10 rounded-br-md rounded-tl-md">
                    <Link href={`/stores/${product.storeId}`}>
                      <p className="text-sm text-black">@{product.storeName}</p>
                    </Link>
                  </div>
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-60 rounded-t-lg"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <Link href={`/posts/${product.id}`} tabIndex={-1}>
                    <CardContent className="flex flex-col justify-center items-start sm:gap-2 p-4 pb-0">
                      <CardTitle className="line-clamp-1 text-lg">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                        {product.brand}
                      </CardDescription>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-4 pt-0 flex items-start  flex-col sm:flex-row sm:justify-between sm:items-center">
                    {numberToClp(`${product.price}`)}
                    <Button className="self-end" size="sm">
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
