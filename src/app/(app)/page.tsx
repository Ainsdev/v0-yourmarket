"use client";

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

export default function IndexPage() {
  const [nameStore, setNameStore] = useState("");
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
        {/* <div className="z-30 grid h-max w-full sm:grid-cols-2">
          <AnimatedTitle
            title="Sube"
            subtitle="Sube tus prendas, zapatillas y da vida a tu tienda en segundos."
            image="https://assets.vogue.com/photos/60d88c184b12a701e3d2f114/16:9/w_2991,h_1682,c_limit/Paris%20Mens%20SS22%20day%205%20by%20STYLEDUMONDE%20Street%20Style%20Fashion%20Photography_95A0608FullRes.jpg"
            side="left"
            position="bg-top"
          />
          <AnimatedTitle
            title="Comparte"
            subtitle="Comparte tus tesoros en redes sociales y con una audiencia lista para descubrir nuevas cosas."
            image="https://media.vogue.es/photos/5d3efffb90d7160008c443d2/16:9/pass/005-The-Complex-Case-Streetwear-Vogueint-June14-Getty-Images.jpg"
            side="right"
            position="bg-center"
          />
          <AnimatedTitle
            title="Vende"
            subtitle="No te quitamos nada de tu venta. Crea una base de clientes apasionada por tus productos y llevate todo."
            image="https://hips.hearstapps.com/hmg-prod/images/0-copy-1653495593.jpg"
            side="left"
            position="bg-center"
          />
          <AnimatedTitle
            title="Feedback"
            subtitle="Obtén feedback valioso y construye tu reputación. Conquista el corazón de los aficionados con tus productos."
            image="https://views.fr/wp-content/uploads/2017/08/CxyHX17WgAEmlus.jpg"
            side="left"
            position="bg-center"
          />
        </div> */}
      </div>
      <div className="group relative flex h-max w-full items-center justify-center px-2 sm:justify-start">
        <section className=" flex h-96 w-full items-center justify-center gap-4 bg-secondary p-2 sm:mt-16 md:flex-row">
          <div className="relative flex h-full w-full flex-col items-center justify-center  border-2 border-dashed border-primary p-4 ">
            <h3 className="text-xl font-semibold">Productos</h3>
          </div>
        </section>
      </div>
      <div className="group-landing-group m-10 my-20 mb-48 flex w-full flex-col items-center justify-center gap-6 border-2 border-border py-5 sm:w-3/4 sm:py-10 px-4">
        {/*  ANIMATE THIS */}
        <p className="text-lg font-bold sm:text-2xl">
          Cambia la industria con nosotros, Registra tu tienda.
        </p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            onChange={(e) => {
              setNameStore(e.target.value);
            }}
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
      <footer className="w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            &copy; 2024 YourMarket - All rights reserved
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              Shop
            </Link>
            <Link
              href="#"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              <InstagramLogoIcon />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-gray-200 transition-colors"
              prefetch={false}
            >
              <TwitterLogoIcon />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
