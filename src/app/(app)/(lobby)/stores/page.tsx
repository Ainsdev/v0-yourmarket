import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/shells/page-header";
import { Shell } from "@/components/shells/shell";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { SewingPinFilledIcon } from "@radix-ui/react-icons";

//TODO: Make a button ("Upload More") for change the limit and the offset of the shown stores. ANd make the query for that.

export default function StoresPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Tiendas</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Las mejores tiendas que buscas
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <h3 className="text-2xl font-bold">Tiendas Destacadas</h3>
        <div className="w-full flex flex-col gap-4 overflow-x-scroll py-6">
          <div className="w-max flex gap-10">
            <DirectionAwareHover
              className="w-56 md:w-72"
              imageClassName="opacity-70"
              childrenClassName="flex flex-col items-start justify-center gap-2"
              imageUrl={
                "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
              }
            >
              <p className="font-bold text-xl">YourMarket</p>
              <p className="font-normal text-sm flex">
                <SewingPinFilledIcon />
                Maipu
              </p>
              <Button>Ver Tienda</Button>
            </DirectionAwareHover>
            <DirectionAwareHover
              className="w-56 md:w-72"
              imageClassName="opacity-70"
              childrenClassName="flex flex-col items-start justify-center gap-2"
              imageUrl={
                "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
              }
            >
              <p className="font-bold text-xl">YourMarket</p>
              <p className="font-normal text-sm flex">
                <SewingPinFilledIcon />
                Maipu
              </p>
              <Button>Ver Tienda</Button>
            </DirectionAwareHover>
          </div>
        </div>
        <h3 className="text-2xl font-bold">Tiendas Recientes</h3>
        <div className="grid grid-cols-4">
          <DirectionAwareHover
            imageClassName="opacity-70"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={
              "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
            }
          >
            <p className="font-bold text-xl">YourMarket</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              Maipu
            </p>
            <Button>Ver Tienda</Button>
          </DirectionAwareHover>
          <DirectionAwareHover
            imageClassName="opacity-70"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={
              "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
            }
          >
            <p className="font-bold text-xl">YourMarket</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              Maipu
            </p>
            <Button>Ver Tienda</Button>
          </DirectionAwareHover>
          <DirectionAwareHover
            imageClassName="opacity-70"
            childrenClassName="flex flex-col items-start justify-center gap-2"
            imageUrl={
              "https://utfs.io/f/6f13283b-77a2-4e1c-aa58-737876be66ea-1ji407.jpg"
            }
          >
            <p className="font-bold text-xl">YourMarket</p>
            <p className="font-normal text-sm flex">
              <SewingPinFilledIcon />
              Maipu
            </p>
            <Button>Ver Tienda</Button>
          </DirectionAwareHover>
        </div>
      </div>
    </Shell>
  );
}
