import { productCategories, genders } from "@/config/categories";
import { type Post } from "@/lib/db/schema/posts";
import { cn, numberToClp } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function DefaultPostView(
    { post }: { post: Post }
) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-8 mt-4 sm:py-12 sm:border sm:border-muted rounded-md sm:px-2">
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
      <div className="grid gap-1">
        <div>
          <h2 className="text-xl font-bold">{post.name}</h2>
          <p className="text-muted-foreground">
            {productCategories[post.categoryId].title +
              " - " +
              post.subcategory}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1 pt-4">
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
              <li className="list-disc">
                Condicion: {post.condition}
              </li>
              <li className="list-disc">
                Genero: {genders[post.gender as number]}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            Descripcion
          </span>
          <p className="text-base leading-relaxed text-secondary-foreground">
            {post.description}
          </p>
        </div>
        <div className="flex flex-col gap-1 pt-20">
          <span className="text-xs font-medium text-muted-foreground">
            Creado: {post.createdAt}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Actualizado: {post.updatedAt}
          </span>
        </div>
      </div>
    </div>
  );
}
