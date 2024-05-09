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
  params: { postId: string };
}) {
  return (
    <main className="overflow-auto">
      <Post id={params.postId} />
    </main>
  );
}

const Post = async ({ id }: { id: string }) => {
  const { post } = await getPostById(id);
  if (!post) notFound();
  const { store } = await getStoreById(post?.storeId as number);

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="posts" />
        <OptimisticPost
          post={post}
          store={store as Store}
          storeId={store?.id}
        />
      </div>
    </Suspense>
  );
};
