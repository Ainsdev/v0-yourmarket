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
    <div>
      <Card className={cn("h-full overflow-hidden border-none bg-secondary/20 rounded-sm", className)} {...props}>
        <Link href={`/posts/${product.id}`}>
          <CardHeader className="p-0 relative space-y-0">
            {/* Mobile */}
            <div className="w-full px-2 py-1 bg-white/20 rounded-t-md bg-clip-padding backdrop-blur-sm z-50 flex items-center justify-start gap-2 sm:hidden">
              <Avatar>
                <AvatarImage
                  src={product.storeImage ?? "/images/store-placeholder.webp"} //TODO: Change to store placeholder and add a link to the store
                  alt={product.storeName ?? "storename"} //TODO: Add Location in a paragraph?
                />
                <AvatarFallback>{product.storeName}</AvatarFallback>
              </Avatar>
              <p className="text-xs text-white font-semibold">
                @{product.storeName}
              </p>
            </div>
            {/* Mobile */}
            {/* Desktop */}
            <div className="hidden absolute top-3 left-3 w-max p-2 bg-white/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm z-50 sm:flex items-center justify-start gap-2">
              <Avatar>
                <AvatarImage
                  src={product.storeImage ?? "/images/store-placeholder.webp"} //TODO: Change to store placeholder
                  alt={product.storeName ?? "storename"}
                />
                <AvatarFallback>{product.storeName}</AvatarFallback>
              </Avatar>
              <p className="text-xs text-white font-semibold">
                @{product.storeName}
              </p>
            </div>
            {/* Desktop */}
            <AspectRatio ratio={1}>
              <Image
                src={product.mainImage ?? "/images/product-placeholder.webp"}
                alt={product.name}
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              />
            </AspectRatio>
          </CardHeader>
          <span className="sr-only">{product.name}</span>
        </Link>
        <Link href={`/posts/${product.id}`} tabIndex={-1}>
          <CardContent className="flex flex-col justify-center items-start sm:gap-2 p-4 pb-0">
            <CardDescription className="line-clamp-2">
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </CardDescription>
            <CardTitle className="line-clamp-1 text-lg">
              {product.name}
            </CardTitle>
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
  );
}
