import { Suspense } from "react";

import Loading from "@/app/loading";
import PostList from "@/components/posts/PostList";
import { getPosts } from "@/lib/api/posts/queries";
import { getStores } from "@/lib/api/stores/queries";

export const revalidate = 0;

export default async function PostsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Posts</h1>
        </div>
        <Posts />
      </div>
    </main>
  );
}

const Posts = async () => {
  
  const { posts } = await getPosts();
  const { stores } = await getStores();
  return (
    <Suspense fallback={<Loading />}>
      <PostList posts={posts} stores={stores} />
    </Suspense>
  );
};
