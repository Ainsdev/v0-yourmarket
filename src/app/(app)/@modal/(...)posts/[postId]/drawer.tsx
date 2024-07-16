"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import DefaultPostView from "@/components/posts/DefaultViewPost";
import { type Post } from "@/lib/db/schema/posts";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, numberToClp } from "@/lib/utils";
import { genders, productCategories } from "@/config/categories";
import { Button } from "@/components/ui/button";

export default function DrawerPost({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <Drawer
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent className="max-h-[90vh] w-full">
        <DrawerHeader>
          <DrawerTitle>{post.name}</DrawerTitle>
          <DrawerDescription>
            {productCategories[post.categoryId].title +
              " - " +
              post.subcategory}
          </DrawerDescription>
          <DrawerClose />
        </DrawerHeader>
        <div className="grid grid-cols-1 px-4 gap-6 md:grid-cols-3 mt-4 sm:py-12 sm:border sm:border-muted rounded-md sm:px-2 overflow-auto">
          <div className="p-10 w-full">
            <Carousel>
              <CarouselContent>
                {post.images.split(",").map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={post.name + ` image ${index}`}
                      width={600}
                      height={600}
                      className={cn("rounded-md")}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-col pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Precio
              </span>
              <span className="text-lg font-bold">
                {numberToClp(`${post.price}`)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Marca
              </span>
              <span className="text-lg font-bold">{post.brand}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Talla
              </span>
              <span className="text-lg font-bold">{post.size}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                Detalles
              </span>
              <ul className="text-sm font-semibold text-secondary-foreground">
                <li className="list-inside">Condicion: {post.condition}</li>
                <li className="list-outside">
                  Genero: {genders[post.gender as number]}
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-1 pt-2">
              <span className="text-sm font-medium text-muted-foreground">
                Descripcion
              </span>
              <p className="text-base leading-relaxed text-secondary-foreground">
                {post.description}
              </p>
            </div>
          </div>
        </div>
        <DrawerFooter className="flex justify-center items-center gap-2 mt-4">
          <Button className="w-full sm:w-1/3">
            Comprar ( {numberToClp(`${post.price}`)})
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
