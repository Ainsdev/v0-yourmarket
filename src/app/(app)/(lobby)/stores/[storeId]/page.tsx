import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";
import { SearchParams } from "@/lib/types";
import { searchParamsSchema } from "@/lib/validations/params";
import { z } from "zod";
import Image from "next/image";
import { RevealBento } from "@/components/posts/post-gallery/data-gallery-image-post";

export const revalidate = 0;

interface ProductsPageProps {
  params: {
    storeId: string;
  };
  searchParams: SearchParams;
}
const storesProductsSearchParamsSchema = searchParamsSchema.extend({
  name: z.string().optional(),
  categoryId: z.string().optional(),
  subcategory: z.string().optional(),
});

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <main className="overflow-auto">
      <p>Store Page: {params.storeId}</p>
      <Store id={params.storeId} />
    </main>
  );
}

const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99 },
  { id: 2, name: "Skinny Jeans", price: 49.99 },
  { id: 3, name: "Leather Jacket", price: 99.99 },
  { id: 4, name: "Floral Dress", price: 39.99 },
  { id: 5, name: "Casual Shorts", price: 24.99 },
  { id: 6, name: "Striped Sweater", price: 29.99 },
];

const Store = async ({ id }: { id: string }) => {
  // const { store, posts } = await getStoreByIdWithPosts(id);

  // if (!store) notFound();
  return (
    // <Suspense fallback={<Loading />}>
    //   <div className="relative">

    //   </div>
    //   <div className="relative mt-8 mx-4">
    //     {/* <h3 className="text-xl font-medium mb-4">{store.name}&apos;s Posts</h3> */}

    //   </div>
    // </Suspense>
    <div className="w-full">
      <RevealBento />
    </div>
  );
};
