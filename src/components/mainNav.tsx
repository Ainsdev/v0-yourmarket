"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "./ui/separator";
import { Icon } from "@radix-ui/react-select";
import { NavItem } from "@/lib/types";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 font-mono md:gap-10">
      <Popover>
        <PopoverTrigger className="md:hidden">
          <Menu className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <Link
              key="index"
              href="/"
              className="flex items-center text-sm font-medium"
            >
              Ir a comprar
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              key="index"
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground"
            >
              Ropa
            </Link>
            <Link
              key="index"
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground"
            >
              Sneakers
            </Link>
            <Link
              key="index"
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground"
            >
              Mujer
            </Link>
            <Separator className="my-2" />
            <p className="text-sm font-medium">Tu tienda</p>
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
        </PopoverContent>
      </Popover>
      <Link href="/" className="flex items-center space-x-2">
        <Icon className="h-6 w-6" />
        <span className="inline-block font-bold">YourMarket</span>
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ir a comprar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary to-muted p-6 no-underline outline-none hover:scale-105 focus:shadow-md"
                      href="/"
                    >
                      <Icon className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Ultimas Ofertas
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Llena de productos de marcas reconocidas. Encuentra tu
                        Oferta!!
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Marcas Chilenas">
                  Encuentra una gran variedad de marcas nacionales.
                </ListItem>
                <ListItem href="/docs/installation" title="Ropa">
                  Todo tipo de prendas unicas y de calidad.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Sneakers">
                  Encuentra los mejores y utlimos modelos de zapatillas.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tu tienda</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {items?.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contactanos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
