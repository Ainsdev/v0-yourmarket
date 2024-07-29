"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckIcon,
  ComponentPlaceholderIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

import { catchError, cn, numberToClp } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedSpinner } from "@/components/icons";
import { Post } from "@/lib/db/schema/posts";
import { ProductWithStore } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductWithStore;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Card
      className={cn(
        "h-full overflow-hidden border-none bg-secondary/20 p-2",
        className
      )}
      {...props}
    >
      <Link href={`/posts/${product.id}`}>
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 left-2 w-3/4 h-16 bg-white/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg z-50 flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src={product.storeImage ?? "/images/store-placeholder.webp"}
                alt={product.storeName ?? "storename"}
              />
              <AvatarFallback>{product.storeName}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-white font-semibold">
              {product.storeName}
            </p>
          </div>
          <AspectRatio ratio={3 / 4}>
            <Image
              src={product.mainImage ?? "/images/product-placeholder.webp"}
              alt={product.name}
              className="object-cover rounded-md"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.name}</span>
      </Link>
      <Link href={`/posts/${product.id}`} tabIndex={-1}>
        <CardContent className="flex flex-col justify-center items-start gap-2 p-4 ">
          <CardDescription className="line-clamp-2">
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </CardDescription>
          <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between">
        {numberToClp(`${product.price}`)}
        <Button size="sm">Comprar</Button>
      </CardFooter>
    </Card>
  );
}
