"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteStoreAction } from "@/lib/actions/stores";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SettingsStorePage {
  params: {
    storeId: string;
  };
}

export default function SettingsStorePage({ params }: SettingsStorePage) {
  const storeId = Number(params.storeId);
  const router = useRouter();

  const clickDeleteStore = async () => {
    try {
      await deleteStoreAction(storeId);
      toast.success("Tienda eliminada exitosamente");
      router.push("/dashboard/stores");
    } catch (e) {
      toast.error("Algo salio mal, intenta mas tarde.");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-8 p-4 w-full">
      <Card className="w-full bg-destructive/20 max-w-7xl">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Estas acciones son irreversibles</CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Eliminar Tienda</CardTitle>
              <CardDescription>
                Esta accion no se puede deshacer. Todos los productos y datos
                seran eliminados permanentemente.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive">Eliminar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>100% Seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion no se puede deshacer. Todos los productos y
                      datos seran eliminados permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clickDeleteStore}
                      className="bg-destructive"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>Otros Ajustes</CardTitle>
          <CardDescription>Ajustes de tu tienda (Proximamente)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 w-full">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">Activar Cupones</p>
              <Switch />
            </div>
            <div className="flex items-center gap-4">
              <div className="font-medium">Customizar Estilo</div>
              <div className="ml-auto">
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>Guardar Cambios</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
