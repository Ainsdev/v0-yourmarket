import { toTitleCase } from "@/lib/utils";

import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { getProducts } from "@/lib/api/posts/queries";
import { ProductsDefaultView } from "@/components/posts/default/posts-default";

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
  // const products = getProducts(searchParams);
  const minPrice = Number((price_range as string)?.split("-")[0]);
  const maxPrice = Number((price_range as string)?.split("-")[1]);
  const categoryIdslab = Array.isArray(categoryIds)
    ? categoryIds.map(Number)
    : categoryIds?.split(",").map(Number) ?? [];
  const regionlab = region;
  const brandlab = brand;
  return (
    <Shell>
      <PageHeader
        id="category-page-header"
        aria-labelledby="category-page-header-heading"
      >
        <PageHeaderHeading size="sm">{toTitleCase(brand)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Estas son las mejores tiendas que venden ${brand}`}
          Filters active: {minPrice}, {maxPrice}, {categoryIdslab}, {regionlab},{" "}
          {brandlab}
        </PageHeaderDescription>
      </PageHeader>
      <ProductsDefaultView
        products={[
          {
            id: 1,
            name: "Product",
            price: 100,
            mainImage: "https://via.placeholder.com/150",
            categoryId: 1,
            subcategory: "Subcategory",
          },
          {
            id: 2,
            name: "Product",
            price: 100,
            mainImage: "https://via.placeholder.com/150",
            categoryId: 1,
            subcategory: "Subcategory",
          },
        ]}
        pageCount={0}
        categories={["albu", "alba", "hala"]}
      />
    </Shell>
  );
}
