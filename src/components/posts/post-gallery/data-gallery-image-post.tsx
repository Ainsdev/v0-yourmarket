"use client";
import React from "react";
import { MotionProps, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share1Icon, Share2Icon } from "@radix-ui/react-icons";

type GalleryImagePostProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
};

export const GalleryImagePost = () => {
  return (
    <Block
      whileHover={{
        rotate: "3.5deg",
        scale: 1.05,
      }}
      className="w-56 h-56 group"
    >
      <Link href="#" className=" h-full text-3xl text-white bg-black w-full">
        <div>
          <Image
            src={
              "https://pbs.twimg.com/profile_images/1471121187552083970/gzXvrRJL_400x400.jpg"
            }
            alt="Product image"
            layout="fill"
            objectFit="cover"
            className="bg-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/90" />
          <div className="flex flex-col gap-1 justify-center items-start p-1 w-full absolute bottom-0 invisible group-hover:visible backdrop-blur-sm">
            <Badge variant="outline">3XL</Badge>
            <h3 className="text-base">Nike Air Max 90 Recraft InfraRed</h3>
          </div>
          <Badge variant="secondary" className="absolute top-2 right-2">
            $100
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