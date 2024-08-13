import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { cache } from "@/lib/cache";
import { SearchParams } from "@/lib/types";
import { getStoresForLobby } from "@/lib/api/stores/queries";
import StoreView from "@/components/stores/store-view";
import { revalidatePath } from "next/cache";

interface StorePageParams {
  searchParams: SearchParams;
}
//TODO: Make a button ("Upload More") for change the limit and the offset of the shown stores. ANd make the query for that adding filters like regions,cities.
const getProducts = async (params: {
  region: any;
  mainCategory?: number | null;
}) => {
  return getStoresForLobby(
    params?.region ?? null,
    params?.mainCategory ?? null
  ).then((stores) => {
    // revalidatePath("/stores");
    return stores;
  });
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function StoresPage({ searchParams }: StorePageParams) {
  const storesPromise = await getProducts({
    region: searchParams.region,
    mainCategory: Number(searchParams.mainCategory),
  });
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Tiendas</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Las mejores tiendas: {searchParams.mainCategories}
        </PageHeaderDescription>
      </PageHeader>
      <StoreView stores={storesPromise} searchParams={searchParams} />
    </Shell>
  );
}
