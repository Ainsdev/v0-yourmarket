"use client";
import React from "react";
import { MotionProps, motion } from "framer-motion";
import Link from "next/link";
import { cn, numberToClp } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2Icon } from "@radix-ui/react-icons";

type GalleryImagePostProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  scale?: number;
  rotate?: string;
};

export const GalleryImagePost = (props: GalleryImagePostProps) => {
  return (
    <Block
      whileHover={{
        rotate: props.rotate || "3.5deg",
        scale: props.scale || 1.05,
      }}
      className="w-56 h-56 group"
    >
      <Link href="#" className=" h-full text-3xl text-white bg-black w-full">
        <div>
          <Image
            src={
              props.image ||
              "https://images.unsplash.com/photo-1612838551443-1e0f5d2a1a6f"
            }
            alt="Product image"
            layout="fill"
            objectFit="cover"
            className="bg-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/90" />
          <div className="flex flex-col gap-1 justify-center items-start p-1 w-full absolute bottom-0 invisible group-hover:visible backdrop-blur-sm">
            <Badge variant="outline">{props.size}</Badge>
            <h3 className="text-base">{props.name}</h3>
          </div>
          <Badge variant="secondary" className="absolute top-2 right-2">
            ${numberToClp(`${props.price}`)}
          </Badge>
        </div>
      </Link>
      <Button size="icon" variant="ghost" className="absolute top-2 left-2">
        <Share2Icon />
      </Button>
    </Block>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={cn("p-0 w-max max-w-xl", className)}
      {...rest}
    />
  );
};
