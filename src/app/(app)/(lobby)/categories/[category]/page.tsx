import Image from "next/image";
import Link from "next/link";

import { productCategories } from "@/config/categories";
import { toTitleCase } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/shells/page-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProducts } from "@/lib/api/posts/queries";
import { ProductsDefaultView } from "@/components/posts/default/posts-default";

interface CategoryPageProps {
  params: {
    category: number;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: CategoryPageProps) {
  return {
    title: toTitleCase(productCategories[params.category].title),
    description: `Buy products from the ${params.category} category`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params;
  const {
    page,
    per_page,
    sort,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams;

  // Products transaction
  const { data, pageCount } = await getProducts({
    ...searchParams,
    categoryIds: category.toString(),
  });
  //TODO: Solve the query to only show the category

  return (
    <Shell className="overflow-hidden">
      <PageHeader
        id="category-page-header"
        aria-labelledby="category-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          {toTitleCase(productCategories[params.category].title)}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/categories">Categorias</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {productCategories[Number(category)].title}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* {`Compra ${category} En las mejores tiendas`} */}
        </PageHeaderDescription>
        <div className="mt-5 flex h-max w-full overflow-auto border border-dashed border-border p-2">
          {productCategories[category].subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/categories/${category}/${subcategory.slug}`}
            >
              <div className="card group relative m-4 h-36 w-48 cursor-pointer overflow-hidden rounded-lg border-r-2 border-t-2 border-border bg-gradient-to-tl from-card to-secondary text-gray-300 transition-all hover:from-secondary/50 hover:to-card hover:brightness-90 sm:h-[12vh] sm:w-[12vh] lg:h-[16vh] lg:w-[16vh]">
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
                  <h3 className="text-md font-medium capitalize text-slate-100 md:text-lg">
                    {subcategory.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageHeader>
      <ProductsDefaultView products={data} pageCount={pageCount} />
    </Shell>
  );
}
