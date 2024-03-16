import { type Store } from "@/lib/db/schema/stores";
import { type Post, type CompletePost } from "@/lib/db/schema/posts";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Post>) => void;

export const useOptimisticPosts = (
  posts: CompletePost[],
  stores: Store[]
) => {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (
      currentState: CompletePost[],
      action: OptimisticAction<Post>,
    ): CompletePost[] => {
      const { data } = action;

      const optimisticStore = stores.find(
        (store) => store.id === data.storeId,
      )!;

      const optimisticPost = {
        ...data,
        store: optimisticStore,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticPost]
            : [...currentState, optimisticPost];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticPost } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticPost, optimisticPosts };
};
