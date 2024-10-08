import { toTitleCase } from "@/lib/utils";

import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { getProducts } from "@/lib/api/posts/queries";
import { ProductsDefaultView } from "@/components/posts/default/posts-default";
import { getSubcategories, productCategories } from "@/config/categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    brand: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: CategoryPageProps) {
  return {
    title: toTitleCase(params.brand),
    description: `Buy products from the ${params.brand} `,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { brand } = params;
  const {
    page,
    per_page,
    sort,
    subcategories,
    price_range,
    region,
    categoryIds,
  } = searchParams;

  // Products transaction
  const { data, pageCount } = await getProducts({ ...searchParams, brand });
  const categoriesList = productCategories.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="category-page-header"
        aria-labelledby="category-page-header-heading"
      >
        <PageHeaderDescription size="sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/brands">Marcas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{toTitleCase(brand)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PageHeaderDescription>
        <PageHeaderHeading size="sm">{toTitleCase(brand)}</PageHeaderHeading>
      </PageHeader>
      <ProductsDefaultView
        products={data}
        pageCount={pageCount}
        categories={categoriesList}
      />
    </Shell>
  );
}
