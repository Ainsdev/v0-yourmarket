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
import { IdCardIcon, LinkBreak2Icon } from "@radix-ui/react-icons";

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
      <div className="w-full flex flex-col gap-4 justify-center items-start md:flex-row xl:px-20">
        <Card className="w-full bg-gradient-to-br from-[#6366F1] to-[#9333EA] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <LinkBreak2Icon className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="text-secondary-foreground font-semibold text-lg">
                Conecta tu cuenta bancaria
              </h3>
              <p className="text-muted-foreground text-sm">
                Empieza a aceptar pagos directamente a tu cuenta.
              </p>
            </div>
          </div>
          <div className="pt-6 flex w-full justify-center items-center px-12 xl:px-48">
            <Button
              size="sm"
              disabled
              variant="secondary"
              className="w-full bg-secondary/90"
            >
              Conectar Cuenta (Proximamente)
            </Button>
          </div>
        </Card>
        <Card className="w-full bg-gradient-to-br from-[#57ace8] to-[#3482d5] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <IdCardIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-secondary-foreground font-semibold text-lg">
                Verifica tu identidad
              </h3>
              <p className="text-muted-foreground text-sm">
                Asegurate de que tus clientes confien en ti.
              </p>
            </div>
          </div>
          <div className="pt-6 flex w-full justify-center items-center px-12 xl:px-48">
            <Button
              size="sm"
              disabled
              variant="secondary"
              className="w-full bg-secondary/90"
            >
              Verificar (proximamente)
            </Button>
          </div>
        </Card>
      </div>
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
    </div>
  );
}
