import { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";

import { getPostById } from "@/lib/api/posts/queries";
import { getStoreById, getStores } from "@/lib/api/stores/queries";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";
import OptimisticPost from "./OptimisticPost";


export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {

  return (
    <main className="overflow-auto">
      <Post id={params.postId} />
    </main>
  );
}

const Post = async ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  // StoreId is the number in BASE_URL/dashboard/stores/1/products/nnnnnn
  const storeId = Number(searchParams.get("storeId"));
  const { post } = await getPostById(id);
  const { store } = await getStoreById(post?.storeId ?? storeId)

  if (!post) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="posts" />
        <OptimisticPost post={post} store={store} storeId={1} />
      </div>
    </Suspense>
  );
};
