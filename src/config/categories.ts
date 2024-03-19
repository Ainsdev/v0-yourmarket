import { Category, Option } from "@/lib/types";
import { BackpackIcon } from "@radix-ui/react-icons";

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

export const productCategories = [
  {
    id: 0,
    title: "Ropa",
    image:
      "https://cdn.dynamicyield.com/api/8767771/images/19cd410859e0a__frame_28.png",
    icon: BackpackIcon,
    subcategories: [
      {
        title: "Poleras",
        description: "Poleras y camisetas para todos.",
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9wYXxlbnwwfHwwfHx8MA%3D%3D",
        slug: "t-shirts",
      },
      {
        title: "Hoodies",
        description: "Hoodies para estar cómodo y abrigado.",
        image:
          "https://plus.unsplash.com/premium_photo-1670588892182-cd1d47097efd?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9vZGllc3xlbnwwfHwwfHx8MA%3D%3D",
        slug: "hoodies",
      },
      {
        title: "Chaquetas",
        description: "Chaquetas para estar cómodo y abrigado.",
        image:
          "https://images.unsplash.com/photo-1514833312158-4985ace72687?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
        slug: "jackets",
      },
      {
        title: "Jeans",
        description: "Jeans para estar a la moda.",
        image:
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D",
        slug: "jeans",
      },
      {
        title: "Cortavientos y parkas",
        description: "Cortavientos y parkas para estar cómodo y abrigado.",
        image:
          "https://images.unsplash.com/photo-1455274111113-575d080ce8cd?auto=format&fit=crop&q=80&w=1888&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "windbreakers-parkas",
      },
      {
        title: "Pantalones",
        description: "Pantalones variados y de todos los estilos.",
        image:
          "https://plus.unsplash.com/premium_photo-1697791163965-7dda4f7373d5?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "pants",
      },
      {
        title: "Shorts",
        description: "Shorts perfectos para el verano.",
        image:
          "https://images.unsplash.com/photo-1617952236317-0bd127407984?auto=format&fit=crop&q=80&w=1760&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "shorts",
      },
    ],
  },
  {
    id: 1,
    title: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    icon: BackpackIcon,
    subcategories: [
      {
        title: "Casuales",
        description: "Casuales y cómodos para todos los días.",
        slug: "casuals",
        image:
          "https://images.unsplash.com/photo-1636718281461-d6570e49c4b4?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Deportivos",
        description: "Deportivos y cómodos para todos los días.",
        slug: "sports",
        image:
          "https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?auto=format&fit=crop&q=80&w=1933&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Limitadas",
        description: "Limitadas y exclusivas para coleccionar.",
        slug: "limited",
        image:
          "https://images.unsplash.com/photo-1602078019624-f4355d0687fd?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0cmVldHdlYXJ8ZW58MHx8MHx8fDA%3D",
      },
      {
        title: "Diseño",
        description: "Unicas y Distintas.",
        slug: "design",
        image:
          "https://images.unsplash.com/photo-1513188732907-5f732b831ca8?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Caña alta",
        description: "Caña alta para lucir.",
        slug: "shorts",
        image:
          "https://images.unsplash.com/photo-1552066344-2464c1135c32?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Elegantes",
        description: "Elegantes para lucir en cualquier ocasión.",
        slug: "elegant",
        image:
          "https://images.unsplash.com/photo-1641893843833-a006778dc00b?auto=format&fit=crop&q=80&w=1746&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    id: 2,
    title: "Accesorios",
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJvbGV4fGVufDB8fDB8fHww",
    icon: BackpackIcon,
    subcategories: [
      {
        title: "Relojes",
        description: "Relojes para todos los estilos.",
        slug: "watches",
        image:
          "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJvbGV4fGVufDB8fDB8fHww",
      },
      {
        title: "High Tops",
        description: "Elevate your style with rad high top shoes.",
        slug: "high-tops",
        image: "",
      },
      {
        title: "Slip-ons",
        description: "Effortless style with rad slip-on shoes.",
        slug: "slip-ons",
        image: "",
      },
      {
        title: "Pros",
        description: "Performance-driven rad shoes for the pros.",
        slug: "pros",
        image: "",
      },
      {
        title: "Classics",
        description: "Timeless style with rad classic shoes.",
        slug: "classics",
        image: "",
      },
    ],
  },
  {
    id: 3,
    title: "Otros",
    image: "/images/backpack-one.webp",
    icon: BackpackIcon,
    subcategories: [
      {
        title: "Skate Tools",
        description:
          "Essential tools for maintaining your skateboard, all rad.",
        slug: "skate-tools",
        image: "",
      },
      {
        title: "Bushings",
        description: "Upgrade your ride with our rad selection of bushings.",
        slug: "bushings",
        image: "",
      },
      {
        title: "Shock & Riser Pads",
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: "shock-riser-pads",
        image: "",
      },
      {
        title: "Skate Rails",
        description:
          "Add creativity and style to your tricks with our rad skate rails.",
        slug: "skate-rails",
        image: "",
      },
      {
        title: "Wax",
        description: "Keep your board gliding smoothly with our rad skate wax.",
        slug: "wax",
        image: "",
      },
      {
        title: "Socks",
        description: "Keep your feet comfy and stylish with our rad socks.",
        slug: "socks",
        image: "",
      },
      {
        title: "Backpacks",
        description: "Carry your gear in style with our rad backpacks.",
        slug: "backpacks",
        image: "",
      },
    ],
  },
] satisfies Category[];

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export function getSubcategories(category?: string): Option[] {
  if (!category) return [];

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}
