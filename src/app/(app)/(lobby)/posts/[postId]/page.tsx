import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPostById } from "@/lib/api/posts/queries";
import Loading from "@/app/loading";
import DefaultPostView from "@/components/posts/DefaultViewPost";

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
  if (!post ) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <DefaultPostView post={post} />
    </Suspense>
  );
};
