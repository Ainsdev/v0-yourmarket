import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/button-1";
import { Input } from "@/components/ui/input";
import AnimatedTitle from "@/components/landing/animated-title";
import Categories from "@/components/landing/categories";
// import PremiumComponent from "@/components/landing/feature-premium"
// import FeatureVarity from "@/components/landing/feature-varied"
import MainTitle from "@/components/landing/main-title";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { getFeaturedPosts } from "@/lib/api/posts/queries";
import HomePageViewPosts from "@/components/posts/HomePageViewPost";

export default async function IndexPage() {
  const featuredProducts = await getFeaturedPosts();
  return (
    <main className="flex h-max w-full flex-1 flex-col items-center justify-start pt-20 text-center">
      <MainTitle />
      <Categories />
      <div className="relative mt-16 flex flex-col items-center justify-center gap-4">
        <div className="sticky top-0 z-0 w-screen">
          {/* <video
            className="aspect-auto h-full w-full"
            autoPlay={true}
            loop
            muted
          >
            <source
              src="https://res.cloudinary.com/doacxwg1x/video/upload/v1685811508/STG_flash_zklobe.mp4"
              type="video/mp4"
            />
          </video> */}
        </div>
      </div>
      <section className=" flex h-max w-full items-center justify-center gap-2 bg-secondary p-2 sm:mt-16  flex-col rounded-md">
        <h2 className="text-xl font-semibold sm:text-3xl">
          Productos destacados
        </h2>
        <Button size="lg" variant="link">
          <Link href="/products">Ver todos</Link>
        </Button>
        <div className="relative flex h-full w-full items-center justify-center  border-2 border-dashed border-primary p-4 ">
          <HomePageViewPosts products={featuredProducts} />
        </div>
      </section>

      <div className="group-landing-group m-10 my-20 mb-48 flex w-full flex-col items-center justify-center gap-6 border-2 border-border py-5 sm:w-3/4 sm:py-10 px-4">
        {/*  ANIMATE THIS */}
        <p className="text-lg font-bold sm:text-2xl">
          Cambia la industria con nosotros, Registra tu tienda.
        </p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            // onChange={(e) => {
            //   setNameStore(e.target.value);
            // }}
            type="text"
            id="name"
            placeholder="YourMarket.cl"
            className="group-landing-group-hover:drop-shadow-[0_20px_50px_rgba(266,_120,_81,_0.4)]"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <CustomButton
            title="Empezar"
            url="/add-quote"
            color="bg-secondary"
            textColor="text-default"
          />
          {/* <Button asChild variant="link" className="underline sm:no-underline">
            <Link href={"/signup/" + nameStore}>Tengo mi marca propia</Link>
          </Button> */}
        </div>
      </div>
      {/* <PremiumComponent /> */}

      {/* <FeatureVarity /> */}
    </main>
  );
}
