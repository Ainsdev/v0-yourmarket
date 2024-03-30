import { z } from "zod";

import { ChangeEvent, useState, useTransition } from "react";
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

import { type Action, cn, isArrayOfFile } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { checkNameExists } from "@/lib/api/stores/queries";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const FormSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: "Solo se admiten caracteres alfanumericos",
    })
    .min(5, { message: "Debe ser mas de 5 caracteres" })
    .max(20, { message: "Debe ser menos de 20 caracteres" }),
  // .min(5, { message: "Debe ser mas de 5 caracteres" })
  // .max(20, { message: "Debe ser menos de 20 caracteres" }),
  description: z.string().max(80),
  image: z.string(),
  region: z.string().min(1, { message: "Selecciona una region" }),
  city: z.string().min(1, { message: "Selecciona una comuna" }),
  mainCategories: z.number().min(1, { message: "Selecciona una categoria" }),
  phone: z.number(),
  instagram: z.string(),
});

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

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
      phone: store?.phone ?? 0,
      instagram: store?.instagram ?? "",
    },
  });
  // const { errors, hasErrors, setErrors, handleChange } = useValidatedForm<Store>(insertStoreParams);
  const editing = !!store?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [regionValue, setRegion] = useState(store?.region ?? "");
  const [pending, startMutation] = useTransition();
  //Images
  const { isUploading, startUpload } = useUploadThing("profileImage");
  const [preview, setPreview] = useState(store?.image || "");
  const [file, setFile] = useState<FileList | null>(null);

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
    if (data.phone == 0 && data.instagram == "") {
      toast.error("Debes ingresar un telefono o un instagram");
      return;
    }
    const nameExists = (await checkNameExists(data.name)).exists;
    if (nameExists) {
      toast.error("El nombre ya existe");
      form.setError("name", {
        message: "El nombre ya existe",
      });
      closeModal && closeModal();
      return; // Add this line to exit the function and prevent the try-catch block from being activated
    }
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
        //Check if name exists
        //Uploading
        //If there is a file
        if (file && file.length > 0) {
          console.log("Uploading Image");
          startUpload(Array.from(file))
            .then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }));
              return formattedImages ?? null;
            })
            .then(async (images) => {
              //Editing
              if (editing) {
                const error = await updateStoreAction({
                  ...data,
                  id: store?.id ?? "",
                  active: true,
                  slug: data.name.toLowerCase().replace(" ", "-"),
                  image: images ? images[0].url : store?.image,
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
              // //Creating
              else {
                const error = await createStoreAction({
                  ...data,
                  active: true,
                  slug: data.name.toLowerCase().replace(" ", "-"),
                  image: images ? images[0].url : "",
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
        } else {
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
          // //Creating
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
        }
        closeModal && closeModal();
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast.error("Algo salio mal, revisa tus datos.");
      } else {
        toast.error("Algo salio mal, intenta de nuevo.");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className={
          "space-y-4 p-4 flex flex-col justify-start items-start md:px-12 lg:px-24 xl:px-48 2xl:px-96 overflow-auto"
        }
      >
        {/* Schema fields start */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem id="name" className="max-w-xl w-full">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  required
                  id="name"
                  placeholder="YourMarket"
                  type="text"
                  {...field}
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
            <FormItem id="description" className="max-w-xl w-full">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input
                  required
                  id="description"
                  placeholder="Descripcion"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="text-md py-4">Elige Ubicacion Predeterminada:</h3>
        <div className="flex items-start justify-start gap-2 w-full">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Region</FormLabel>
                <Select
                  required
                  onValueChange={(value) => {
                    setRegion(value);
                    field.onChange(value);
                  }}
                  defaultValue={store?.region ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="">
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
              <FormItem className="w-full max-w-xl">
                <FormLabel>Ciudad</FormLabel>
                <Select
                  required
                  onValueChange={(value) => field.onChange(value)}
                  name="city"
                  defaultValue={store?.city ?? ""}
                >
                  <SelectTrigger className="">
                    <SelectValue
                      // defaultValue={store?.city ?? ""}
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
        </div>

        <h3 className="text-md py-4">Elige al menos un metodo de contacto:</h3>
        <div className="flex items-start justify-start gap-2 w-full">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input
                    maxLength={9}
                    placeholder="9 1234 5678"
                    onChange={(e) => {
                      //Convert string to number
                      const value = parseInt(e.target.value);
                      field.onChange(value);
                    }}
                    type="tel"
                  />
                </FormControl>
                <FormDescription>No incluyas el +56</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="w-full max-w-xl">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="@instagram" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <FormField
          control={form.control}
          name="mainCategories"
          render={({ field }) => (
            <FormItem className="max-w-xl w-full">
              <FormLabel>Categoria</FormLabel>
              <Select
                required
                onValueChange={(value) =>
                  field.onChange(
                    productCategories.find(
                      (category) => category.title === value
                    )?.id ?? 0
                  )
                }
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
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center gap-4 p-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="rounded-full"
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      setFile(files);
                      onChange(displayUrl);
                    }}
                  />
                  {preview ? (
                    <div className="">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={preview} alt="@imagen-perfil" />
                        <AvatarFallback>IMG</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : null}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        {/* Schema fields end */}
        {/* Save Button */}
        {editing ? (
          <Button
            className="w-full"
            size="default"
            type="submit"
            disabled={pending}
            onClick={form.handleSubmit(handleSubmit)}
          >
            {pending ? "Guardando..." : "Guardar"}
          </Button>
        ) : (
          <Button
            className="w-full"
            size="default"
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
            className="w-1/2"
            size="sm"
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
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;
