import { notFound, redirect } from "next/navigation";

import { Shell } from "@/components/shells/shell";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/shells/page-header";
import { StoreSwitcher } from "@/components/pagers/store-switcher";
import { StoreTabs } from "@/components/pagers/store-tabs";

interface StoreLayoutProps extends React.PropsWithChildren {
  params: {
    storeId: string;
  };
}

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const storeId = Number(params.storeId);

  //   const user = await currentUser()

  //   if (!user) {
  //     redirect("/signin")
  //   }

  //   const allStores = await db
  //     .select({
  //       id: stores.id,
  //       name: stores.name,
  //     })
  //     .from(stores)
  //     .where(eq(stores.userId, user.id))

  //   const store = allStores.find((store) => store.id === storeId)

  //   if (!store) {
  //     notFound()
  //   }

  //   const subscriptionPlan = await getSubscriptionPlanAction(user.id)
  const allStores = [
    {
      id: 1,
      name: "Store 1",
    },
    {
      id: 2,
      name: "Store 2",
    },
    {
      id: 3,
      name: "Store 3",
    },
  ];
  const store = allStores.find((store) => store.id === storeId);

  return (
    <Shell variant="sidebar">
      <div className="xxs:flex-row flex flex-col gap-4 pr-1">
        <PageHeader className="flex-1">
          <PageHeaderHeading size="sm">Dashboard</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Administra tu tienda
          </PageHeaderDescription>
        </PageHeader>
        {store && allStores.length > 1 ? (
          <StoreSwitcher
            className="sm:w-1/3"
            currentStore={store}
            stores={allStores}
            dashboardRedirectPath={"/dashboard/stores/"}
          />
        ) : null}
      </div>
      <div className="space-y-8 overflow-auto">
        <StoreTabs storeId={storeId} />
        {children}
      </div>
    </Shell>
  );
}
