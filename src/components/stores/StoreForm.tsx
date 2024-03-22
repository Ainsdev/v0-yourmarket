import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { type Action, cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";
import { type Store, insertStoreParams } from "@/lib/db/schema/stores";
import {
  createStoreAction,
  deleteStoreAction,
  updateStoreAction,
} from "@/lib/actions/stores";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { regions } from "@/config/regions";
import { productCategories } from "@/config/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = insertStoreParams.pick({
  name: true,
  description: true,
  image: true,
  region: true,
  city: true,
  mainCategories: true,
});

const StoreForm = ({
  store,
  openModal,
  closeModal,
  postSuccess,
}: {
  store?: Store | null;

  openModal?: (store?: Store) => void;
  closeModal?: () => void;
  postSuccess?: () => void;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: store?.name ?? "",
      description: store?.description ?? "",
      image: store?.image ?? "",
      region: store?.region ?? "",
      city: store?.city ?? "",
      mainCategories: store?.mainCategories ?? 0,
    },
  });
  // const { errors, hasErrors, setErrors, handleChange } = useValidatedForm<Store>(insertStoreParams);
  const editing = !!store?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [regionValue, setRegion] = useState("");
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("stores");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Store }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Error al ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Tienda ${action}!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    closeModal && closeModal();
    const pendingStore: Store = {
      updatedAt:
        store?.updatedAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt:
        store?.createdAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      id: store?.id ?? "",
      userId: store?.userId ?? "",
      active: true,
      slug: data.name.toLowerCase().replace(" ", "-"),
      ...data,
    };
    try {
      startMutation(async () => {
        //Editing
        if (editing) {
          const error = await updateStoreAction({
            ...data,
            id: store?.id ?? "",
            active: true,
            slug: data.name.toLowerCase().replace(" ", "-"),
          });
          const errorFormatted = {
            error: error ?? "Error",
            values: pendingStore,
          };
          onSuccess(
            editing ? "update" : "create",
            error ? errorFormatted : undefined
          );
        }
        //Creating
        else {
          const error = await createStoreAction({
            ...data,
            active: true,
            slug: data.name.toLowerCase().replace(" ", "-"),
          });
          const errorFormatted = {
            error: error ?? "Error",
            values: pendingStore,
          };
          onSuccess(
            editing ? "update" : "create",
            error ? errorFormatted : undefined
          );
        }
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast.error("Algo salio mal, revisa tus datos.");
      }
    }
  };

  return (
    <Form {...form}>
      <form className={"space-y-4 p-4"}>
        {/* Schema fields start */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem id="name" className="w-full">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  required
                  id="name"
                  placeholder="YourMarket"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem id="description" className="w-full">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input
                  required
                  id="description"
                  placeholder="Descripcion"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select
                required
                onValueChange={(value) => {
                  setRegion(value);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Selecciona una region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.region} value={region.region}>
                      {region.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <Select
                required
                onValueChange={(value) => field.onChange(value)}
                name="city"
                defaultValue={store?.city ?? ""}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    defaultValue={store?.city ?? ""}
                    placeholder="Selecciona una comuna"
                  />
                </SelectTrigger>
                <SelectContent>
                  {regions
                    .find((r) => r.region === regionValue)
                    ?.comunas.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainCategories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                required
                onValueChange={(value) => field.onChange(value)}
                name="mainCategories"
                defaultValue={
                  productCategories.find(
                    (category) => category.id === store?.mainCategories
                  )?.title
                }
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    defaultValue={store?.mainCategories ?? 0}
                    placeholder="Selecciona una categoria"
                  />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category.title} value={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Schema fields end */}

        {/* Save Button */}
        {editing ? (
          <Button
            type="submit"
            disabled={pending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            {pending ? "Guardando..." : "Guardar"}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={pending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            {pending ? "Creando..." : "Crear"}
          </Button>
        )}
        {/* Delete Button */}
        {editing ? (
          <Button
            type="button"
            disabled={isDeleting || pending}
            variant={"destructive"}
            onClick={() => {
              setIsDeleting(true);
              closeModal && closeModal();
              startMutation(async () => {
                const error = await deleteStoreAction(store.id);
                setIsDeleting(false);
                const errorFormatted = {
                  error: error ?? "Error",
                  values: store,
                };
                onSuccess("delete", error ? errorFormatted : undefined);
              });
            }}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default StoreForm;
