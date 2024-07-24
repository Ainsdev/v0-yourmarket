import { toTitleCase } from "@/lib/utils";

import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { getProducts } from "@/lib/api/posts/queries";

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
  } = searchParams

  // Products transaction
  const products = getProducts(searchParams);

  return (
    <Shell>
      <PageHeader
        id="category-page-header"
        aria-labelledby="category-page-header-heading"
      >
        <PageHeaderHeading size="sm">{toTitleCase(brand)}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {`Estas son las mejores tiendas que venden ${brand}`}
        </PageHeaderDescription>
      </PageHeader>
      Products
    </Shell>
  );
}
