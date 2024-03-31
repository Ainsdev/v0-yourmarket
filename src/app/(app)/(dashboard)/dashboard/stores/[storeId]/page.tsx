import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarIcon } from "@radix-ui/react-icons";
import { Link } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getStoreByIdWithPosts } from "@/lib/api/stores/queries";
import { checkAuth } from "@/lib/auth/utils";
import PostList from "@/components/posts/PostList";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";
import OptimisticStore from "./OptimisticStore";

export const revalidate = 0;

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <main className="overflow-auto">
      <Store id={params.storeId} />
    </main>
  );
}

const Store = async ({ id }: { id: string }) => {
  await checkAuth();

  const { store, posts } = await getStoreByIdWithPosts(id);

  if (!store) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="stores" />
        <OptimisticStore store={store} />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">Ultimas Publicaciones</h3>
        <PostList stores={[]} storeId={store.id} posts={posts} />
      </div>
    </Suspense>
  );
};
