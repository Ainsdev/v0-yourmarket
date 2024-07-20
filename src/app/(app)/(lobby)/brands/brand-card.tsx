import Link from "next/link"


import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRandomPatternStyle } from "@/lib/generate-pattern"

// type Brand = {
//   slug: string
//   name: string
// }

interface BrandProps {
  brand: string
  href: string
}

export function BrandCard({ brand, href }: BrandProps) {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          {/* <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
              offer
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-red-600/10 bg-red-50 text-red-700"
            )}
          >
            {offer ? "Con Oferta" : ""}
          </Badge> */}
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(brand))}
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{brand}</CardTitle>
        </CardHeader>
      </Card>
      <span className="sr-only">{brand}</span>
    </Link>
  )
}
