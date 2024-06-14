"use client";

import CustomButton from "../ui/button-1";

export default function MainTitle() {
  return (
    <div className="relative flex h-[70vh] w-full flex-col items-center gap-8 sm:h-[80vh] ">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-9xl xl:text-[180px] 2xl:text-[200px]">
          Ropa y Sneakers
        </h1>
        <h1 className="px-5 text-5xl font-extrabold leading-tight tracking-tighter md:text-9xl xl:text-[180px] 2xl:text-[200px]">
          <span className="bg-secondary">100%</span>
          Exclusivos
        </h1>
      </div>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-2xl">
        El Lugar donde puedes comprar y vender Prendas unicas, exclusivas y de
        la marca que quieras.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4 ">
        <CustomButton title="Crea tu tienda" url="/signup/business" />
        <CustomButton title="Ir a Comprar" url="/signup/client" />
      </div>

      <div
        className="pattern-dots absolute top-0 -z-10 h-full w-full pattern-bg-transparent 
  pattern-orange-500 pattern-opacity-10 pattern-size-4 dark:pattern-white dark:pattern-opacity-10 dark:pattern-size-4"
        style={{
          clipPath: "ellipse(57% 69% at 38% 97%)",
        }}
      />
    </div>
  );
}
