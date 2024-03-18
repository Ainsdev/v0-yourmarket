"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, StarIcon } from "@radix-ui/react-icons";
import { Link } from "lucide-react";
import Image from "next/image";

export default function NamePage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 items-start gap-4 max-w-7xl mx-auto px-4 py-6 w-full">
      <Card className="w-full">
        <CardHeader className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="grid items-start gap-1.5">
              <h3 className="text-sm font-bold tracking-wide">Hola, Store 1</h3>
              <p className="text-sm text-gray-500 leading-none">
                Tu tienda se ve genial!
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-5">
          <div className="flex items-center justify-between space-x-4">
            <div className="grid items-start gap-1.5">
              <h3 className="text-sm font-semibold tracking-wide">Ventas</h3>
              <h4 className="text-2xl font-extrabold tracking-tight leading-none">
                $1,249.00
              </h4>
            </div>
            <Button disabled size="sm">
              Ver Ordenes
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="grid items-start gap-1.5">
              <h3 className="text-sm font-semibold tracking-wide">Reviews</h3>
              <h4 className="text-2xl font-extrabold tracking-tight leading-none flex justify-center items-center gap-1">
                <StarIcon className="h-6 w-6" />
                4.5
              </h4>
            </div>
            <Button size="sm">Ver Reviews</Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4 md:col-span-2">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold tracking-tight">Mas Vistos</h1>
          <Button size="sm">Agregar Producto</Button>
        </div>
        <div className="grid items-start gap-6">
          <Card>
            <div className="grid items-start gap-4 p-4">
              <div className="flex items-start space-x-4">
                <Image
                  alt="Thumbnail"
                  className="rounded-lg"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <div className="grid items-start gap-1.5">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Example product title
                  </h2>
                  <p className="text-sm leading-none">#ABC123</p>
                  <p className="text-sm leading-none">In stock</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">
                    Description for the product. It can be quite long and
                    detailed to provide customers with all the necessary
                    information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">$49.99</p>
                </div>
                <div className="ml-auto flex items-start space-x-2">
                  <Link
                    className="text-gray-600 hover:text-gray-900 underline transition-colors duration-150"
                    href="#"
                  >
                    Edit
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                  <Link
                    className="text-gray-600 hover:text-gray-900 underline transition-colors duration-150"
                    href="#"
                  >
                    View
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="grid items-start gap-4 p-4">
              <div className="flex items-start space-x-4">
                <Image
                  alt="Thumbnail"
                  className="rounded-lg"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <div className="grid items-start gap-1.5">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Example product title
                  </h2>
                  <p className="text-sm leading-none">#ABC123</p>
                  <p className="text-sm leading-none">In stock</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">
                    Description for the product. It can be quite long and
                    detailed to provide customers with all the necessary
                    information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">$49.99</p>
                </div>
                <div className="ml-auto flex items-start space-x-2">
                  <Link className="text-sm font-medium underline" href="#">
                    Edit
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                  <Link className="text-sm font-medium underline" href="#">
                    View
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="grid items-start gap-4 p-4">
              <div className="flex items-start space-x-4">
                <Image
                  alt="Thumbnail"
                  className="rounded-lg"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <div className="grid items-start gap-1.5">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Example product title
                  </h2>
                  <p className="text-sm leading-none">#ABC123</p>
                  <p className="text-sm leading-none">In stock</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">
                    Description for the product. It can be quite long and
                    detailed to provide customers with all the necessary
                    information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="grid items-start gap-1.5">
                  <p className="text-sm leading-none">$49.99</p>
                </div>
                <div className="ml-auto flex items-start space-x-2">
                  <Link className="text-sm font-medium underline" href="#">
                    Edit
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                  <Link className="text-sm font-medium underline" href="#">
                    View
                    <svg
                      className="h-4 w-4 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                      <path
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
