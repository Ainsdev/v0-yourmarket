"use client";

import { useMemo, useState } from "react";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { brands } from "@/config/brands";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { BrandCard } from "./brand-card";
export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Shell>
      <PageHeader
        id="brands-page-header"
        aria-labelledby="brands-page-header-heading"
      >
        <PageHeaderHeading size="sm">Marcas Destacadas</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Estas son las Mejores Marcas
        </PageHeaderDescription>
      </PageHeader>
      <div aria-labelledby="brands-page-heading" className="flex flex-col">
        <div className="relative w-full max-w-md py-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"   
            placeholder="Buscar marcas..."
            className="pl-10 pr-4 py-2 rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard
              key={brand.value}
              brand={brand.name}    
              href={`/brands/${brand.value}`}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}
