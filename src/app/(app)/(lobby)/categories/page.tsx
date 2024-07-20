"use client";

import Image from "next/image";
import Link from "next/link";

import { productCategories } from "@/config/categories";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";

export default function CategoriesPage() {
  //TODO : ADD IMAGES TO CATEGORIES
  return (
    <Shell>
      <PageHeader
        id="categories-page-header"
        aria-labelledby="categories-page-header-heading"
      >
        <PageHeaderHeading size="sm">Categorias</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Encuentra lo que estas Buscando
        </PageHeaderDescription>
      </PageHeader>
      <div
        id="categories"
        className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden p-6"
      >
        <div
          id="main-categories"
          className="grid h-max w-full grid-cols-2 items-center justify-center gap-4 sm:flex"
        >
          {productCategories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="card group relative m-4 h-full w-full cursor-pointer overflow-hidden rounded-lg border-r-2 border-t-2 border-border bg-gradient-to-tl from-card to-secondary text-gray-300 transition-all hover:from-secondary/50 hover:to-card hover:brightness-90 sm:h-max  sm:w-[20vh] lg:w-[24vh]">
                <AspectRatio ratio={3 / 4}>
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src={category.image}
                    alt="sneakers"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-xl font-medium capitalize text-slate-100 md:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* <Tabs defaultValue="unisex" className="w-[400px] text-center">
          <TabsList>
            <TabsTrigger value="unisex">Todo</TabsTrigger>
            <TabsTrigger value="women">Mujer</TabsTrigger>
            <TabsTrigger value="kids">Niños</TabsTrigger>
          </TabsList>
          <TabsContent value="unisex">
            {productCategories.map((category) => (
              
            ))}
          </TabsContent>
          <TabsContent value="women">Para mujer</TabsContent>
          <TabsContent value="kids">Para kids</TabsContent>
        </Tabs> */}
        <Separator />
        <div className="flex flex-col gap-6">
          {productCategories.map((category) => (
            // Title of the category / subcategories cards
            <div key={category.id} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tight capitalize">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.subcategories.map((subcategory) => (
                  // Subcategories cards
                  <div
                    key={subcategory.slug}
                    className="card group relative m-4 h-36 w-36 cursor-pointer overflow-hidden rounded-lg border-r-2 border-t-2 border-border bg-gradient-to-tl from-card to-secondary text-gray-300 transition-all hover:from-secondary/50 hover:to-card hover:brightness-90 sm:h-max sm:w-[20vh]"
                  >
                    <AspectRatio ratio={3 / 4}>
                      <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                      <Image
                        src={subcategory.image}
                        alt="sneakers"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        priority
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <h3 className="text-xl font-medium capitalize text-slate-100 md:text-2xl">
                        {subcategory.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
