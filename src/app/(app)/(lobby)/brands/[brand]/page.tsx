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
  // const { data, pageCount } = await getProducts({ ...searchParams, brand });
  const minPrice = Number((price_range as string)?.split("-")[0]);
  const maxPrice = Number((price_range as string)?.split("-")[1]);
  const categoryIdslab = Array.isArray(categoryIds)
    ? categoryIds.map(Number)
    : categoryIds?.split(",").map(Number) ?? [];
  const regionlab = region;
  const brandlab = brand;
  const categoriesList = productCategories.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  const data = [
    {
      id: "1",
      name: "Product 1",
      brand: "Brand 1",
      price: 10,
      size: "Small",
      mainImage:
        "https://utfs.io/f/9dda66d4-f722-4c34-831f-024107da9e1b-3864fs.webp",
      storeId: 1,
      storeName: "Store 1",
      storeImage: "store1.jpg",
      categoryId: 1,
      subcategory: "Subcategory 1",
    },
    {
      id: "2",
      name: "Product 2",
      brand: "Brand 2",
      price: 20,
      size: "Medium",
      mainImage:
        "https://utfs.io/f/9dda66d4-f722-4c34-831f-024107da9e1b-3864fs.webp",
      storeId: 2,
      storeName: "Store 2",
      storeImage: "store2.jpg",
      categoryId: 2,
      subcategory: "Subcategory 2",
    },
    {
      id: "3",
      name: "Product 3",
      brand: "Brand 3",
      price: 30,
      size: "Large",
      mainImage:
        "https://utfs.io/f/9dda66d4-f722-4c34-831f-024107da9e1b-3864fs.webp",
      storeId: 3,
      storeName: "Store 3",
      storeImage: "store3.jpg",
      categoryId: 3,
      subcategory: "Subcategory 3",
    },
    {
      id: "4",
      name: "Product 4",
      brand: "Brand 4",
      price: 40,
      size: "Extra Large",
      mainImage:
        "https://utfs.io/f/9dda66d4-f722-4c34-831f-024107da9e1b-3864fs.webp",
      storeId: 4,
      storeName: "Store 4",
      storeImage: "store4.jpg",
      categoryId: 4,
      subcategory: "Subcategory 4",
    },
    {
      id: "5",
      name: "Product 5",
      brand: "Brand 5",
      price: 50,
      size: "XXL",
      mainImage:
        "https://utfs.io/f/9dda66d4-f722-4c34-831f-024107da9e1b-3864fs.webp",
      storeId: 5,
      storeName: "Store 5",
      storeImage: "store5.jpg",
      categoryId: 5,
      subcategory: "Subcategory 5",
    },
  ];

  return (
    <Shell variant="sidebar">
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
        products={data}
        pageCount={1}
        categories={categoriesList}
      />
    </Shell>
  );
}
