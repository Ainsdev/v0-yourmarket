import Loading from "@/app/loading";


import { getPostById } from "@/lib/api/posts/queries";

import { notFound, useRouter } from "next/navigation";
import { Suspense } from "react";
import DrawerPost from "./drawer";

export default function PostPageModal({
  params,
}: {
  params: { postId: string };
}) {
  return (
    <main className="overflow-auto">
      <Post id={params.postId} />
    </main>
  );
};

const Post = async ({ id }: { id: string }) => {
  const { post } = await getPostById(id);
  if (!post ) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <DrawerPost post={post} />
    </Suspense>
  );
};
