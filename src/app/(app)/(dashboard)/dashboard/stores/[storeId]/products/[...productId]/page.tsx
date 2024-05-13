import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPostById } from "@/lib/api/posts/queries";
import { getStoreById } from "@/lib/api/stores/queries";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";
import OptimisticPost from "./OptimisticPost";
import { Store } from "@/lib/db/schema/stores";

export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { storeId: string; productId: string[] };
}) {
  return (
    <main className="overflow-auto">
      <Post
        opened={params.productId[1] === "edit" ? true : false}
        storeId={params.storeId}
        id={params.productId[0]}
      />
    </main>
  );
}

const Post = async ({
  id,
  storeId,
  opened,
}: {
  storeId: string;
  id: string;
  opened: boolean;
}) => {
  const { post } = await getPostById(id);
  if (!post) notFound();
  const { store } = await getStoreById(Number(storeId));

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative w-full overflow-hidden">
        <BackButton currentResource="posts" />
        <OptimisticPost
          post={post}
          store={store as Store}
          storeId={store?.id}
          startOpen={opened}
        />
      </div>
    </Suspense>
  );
};
