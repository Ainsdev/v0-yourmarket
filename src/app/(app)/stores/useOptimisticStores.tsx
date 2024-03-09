
import { type Store, type CompleteStore } from "@/lib/db/schema/stores";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Store>) => void;

export const useOptimisticStores = (
  stores: CompleteStore[],
  
) => {
  const [optimisticStores, addOptimisticStore] = useOptimistic(
    stores,
    (
      currentState: CompleteStore[],
      action: OptimisticAction<Store>,
    ): CompleteStore[] => {
      const { data } = action;

      

      const optimisticStore = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticStore]
            : [...currentState, optimisticStore];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticStore } : item,
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

  return { addOptimisticStore, optimisticStores };
};
