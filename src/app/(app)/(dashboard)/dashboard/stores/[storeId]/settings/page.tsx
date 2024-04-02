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

export default function SettingsStorePage() {
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
              <Button variant="outline">Eliminar Tienda</Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <CardTitle>Other Settings</CardTitle>
          <CardDescription>Customize your store settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 w-full">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">Enable Coupons</p>
              <Switch />
            </div>
            <div className="flex items-center gap-4">
              <div className="font-medium">Enable Coupons</div>
              <div className="ml-auto">
                <Switch defaultChecked />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-medium">Enable Coupons</div>
              <div className="ml-auto">
                <Switch />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-medium">Enable Coupons</div>
              <div className="ml-auto">
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
