import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { getSubcategory, productCategories } from "@/config/categories";
import { Subcategory } from "@/lib/types";
import { toTitleCase } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: SubcategoryPageProps) {
  const subcategory = getSubcategory(params.subcategory) as Subcategory;

  return {
    title: toTitleCase(subcategory.title),
    description: `Compra lo mejor en ${subcategory}`,
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryPageProps) {
  const { category, subcategory } = params;
  const { page, per_page, sort, price_range, store_ids, store_page } =
    searchParams;
  const subcategoryData = getSubcategory(params.subcategory) as Subcategory;

  return (
    <Shell>
      <PageHeader
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          {toTitleCase(subcategoryData.title)}
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
                <BreadcrumbLink>
                  <Link href={`/categories/${category}`}>{
                    productCategories[Number(category)].title
                  }</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subcategory}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PageHeaderDescription>
      </PageHeader>
      <h1>PRODUCTS</h1>
    </Shell>
  );
}
