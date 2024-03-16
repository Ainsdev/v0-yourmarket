import { Suspense } from "react";

import Loading from "@/app/loading";
import StoreList from "@/components/stores/StoreList";
import { getStores } from "@/lib/api/stores/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function StoresPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Stores</h1>
        </div>
        <Stores />
      </div>
    </main>
  );
}

const Stores = async () => {
  await checkAuth();

  const { stores } = await getStores();
  
  return (
    <Suspense fallback={<Loading />}>
      <StoreList stores={stores}  />
    </Suspense>
  );
};
