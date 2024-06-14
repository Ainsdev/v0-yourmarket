import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../ui/button"

function Categories() {
  return (
    <section id="categories" className="-mt-10 flex w-full flex-col-reverse gap-6 space-y-6 p-6 sm:gap-2 md:flex-col">
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4">
        <Link  href="/">
          <div className="group relative overflow-hidden rounded-md">
            <AspectRatio ratio={4 / 5}>
              <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
              <Image
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="sneakers"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
            </AspectRatio>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                Sneakers
              </h3>
            </div>
          </div>
        </Link>
        <Link  href="/">
          <div className="group relative overflow-hidden rounded-md">
            <AspectRatio ratio={4 / 5}>
              <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
              <Image
                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0d2VhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="sneakers"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
            </AspectRatio>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                Ropa
              </h3>
            </div>
          </div>
        </Link>
        <Link  href="/">
          <div className="group relative overflow-hidden rounded-md">
            <AspectRatio ratio={4 / 5}>
              <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
              <Image
                src="https://images.unsplash.com/photo-1588117260148-b47818741c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="sneakers"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
            </AspectRatio>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                Nike
              </h3>
            </div>
          </div>
        </Link>
        <Link  href="/">
          <div className="group relative overflow-hidden rounded-md">
            <AspectRatio ratio={4 / 5}>
              <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
              <Image
                src="https://images.unsplash.com/photo-1416339698674-4f118dd3388b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="sneakers"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
            </AspectRatio>
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                Marcas Chilenas
              </h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Categorias
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explora las categorias y marcas de productos que te estan esperando.
        </Balancer>
        <Button variant='secondary' asChild size='lg' className="border-2">
          <Link href="/">
            Explorar categorias
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default Categories
