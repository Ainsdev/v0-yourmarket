import { z } from "zod";

import { useMemo, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn, numberToClp } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Post, insertPostParams } from "@/lib/db/schema/posts";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/lib/actions/posts";
import { type Store, type StoreId } from "@/lib/db/schema/stores";
import { TAddOptimistic } from "@/app/(app)/(lobby)/posts/useOptimisticPosts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "../ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { CheckIcon, ChevronDownIcon, UploadIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { brands, mostPopularBrandsJSON } from "@/config/brands";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { productCategories } from "@/config/categories";
import Image from "next/image";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FileWithPreview } from "@/lib/types";
import { FileDialog } from "../file-dialog";
import { Zoom } from "../zoom-image";
import { Switch } from "../ui/switch";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const PostForm = ({
  stores,
  storeId,
  post,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  post?: Post | null;
  stores: Store[];
  storeId?: StoreId;
  openModal?: (post?: Post) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const form = useForm<z.infer<typeof insertPostParams>>({
    resolver: zodResolver(insertPostParams),
    defaultValues: {
      active: post?.active ?? true,
      name: post?.name,
      description: post?.description,
      brand: post?.brand,
      images: post?.images,
      price: post?.price,
      gender: post?.gender as any,
      size: post?.size,
      categoryId: post?.categoryId,
      subcategory: post?.subcategory,
      condition: post?.condition,
      mainImage: post?.mainImage,
      rangePrice: post?.rangePrice,
    },
  });
  //IMAGES UPLOAD
  const { isUploading, startUpload } = useUploadThing("productImages");
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);

  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Post>(insertPostParams);
  const editing = !!post?.id;
  // const [brandInName, setBrandInName] = useState(post?.brand ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  // const brandOptions = useMemo(() => {
  //   return brands.map((brand) => (
  //     <CommandItem
  //       value={brand.name}
  //       key={brand.value}
  //       onSelect={() => {
  //         form.setValue("brand", brand.value);
  //       }}
  //     >
  //       {brand.name}
  //     </CommandItem>
  //   ));
  // }, [form]);

  const router = useRouter();
  const backpath = useBackPath("posts");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Post }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Post ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const postParsed = await insertPostParams.safeParseAsync({
      storeId,
      ...payload,
    });
    if (!postParsed.success) {
      setErrors(postParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = postParsed.data;
    const pendingPost: Post = {
      updatedAt:
        post?.updatedAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt:
        post?.createdAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      id: post?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingPost,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updatePostAction({ ...values, id: post.id })
          : await createPostAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingPost,
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 p-4 flex flex-col justify-start items-start md:px-12 overflow-auto">
        {/* Schema fields start */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Detalles del Producto</CardTitle>
            <CardDescription>Te recomendamos un titulo:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Marca</FormLabel>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-max justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? brands.find(
                                  (brand) => brand.value === field.value
                                )?.name
                              : "Seleccciona una marca"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mt-4 border-t">
                            <Command
                              filter={(value, search) => {
                                return value
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                                  ? 1
                                  : 0;
                              }}
                            >
                              <CommandInput placeholder="Buscar Marca..." />
                              <CommandEmpty>No hemos encontrado.</CommandEmpty>

                              <CommandList>
                                {
                                  // Make a group for every letter in the alphabet (Include symbols and numbers int e final group)
                                  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                    .split("")
                                    .map((letter) => (
                                      <CommandGroup
                                        heading={letter.toUpperCase()}
                                        key={letter}
                                      >
                                        {brands
                                          .filter((brand) =>
                                            brand.name
                                              .toUpperCase()
                                              .startsWith(letter)
                                          )
                                          .map((brand) => (
                                            <CommandItem
                                              key={brand.value}
                                              value={brand.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  "brand",
                                                  brand.value
                                                );
                                              }}
                                            >
                                              {brand.name}
                                              <CheckIcon
                                                className={cn(
                                                  "w-4 h-4 text-primary",
                                                  field.value === brand.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                      </CommandGroup>
                                    ))
                                }
                                {
                                  // Add a group for symbols and numbers
                                  <CommandGroup heading="Otros">
                                    {brands
                                      .filter((brand) =>
                                        brand.name.match(/^[^a-zA-Z]/)
                                      )
                                      .map((brand) => (
                                        <CommandItem
                                          key={brand.value}
                                          value={brand.value}
                                          onSelect={() => {
                                            form.setValue("brand", brand.value);
                                          }}
                                        >
                                          {brand.name}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                }
                              </CommandList>
                            </Command>
                          </div>
                        </DrawerContent>
                      </Drawer>
                      <FormDescription>Busca una marca.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                {/* PUT THE BRAND FIRST */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem id="name" className="max-w-xl w-full">
                      <FormLabel>Titulo Principal</FormLabel>
                      <FormControl>
                        <Input
                          required
                          id="name"
                          placeholder="Air Max 90"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        El titulo se vera asi:{" "}
                        <span
                          className={
                            form.watch("brand")
                              ? "opacity-100 font-semibold"
                              : "opacity-0"
                          }
                        >
                          {brands.find(
                            (brand) => brand.value === form.watch("brand")
                          )?.name +
                            " " +
                            form.watch("name")}
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Descripcion</Label>
                <Textarea
                  id="description"
                  defaultValue=""
                  className="min-h-32"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Categoria del Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={`${category.id}`}
                            >
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SubCategoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories[
                            form.watch("categoryId") || 0
                          ].subcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory.title}
                              value={subcategory.slug}
                              onSelect={() => {
                                form.setValue("subcategory", subcategory.slug);
                              }}
                            >
                              {subcategory.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condicion</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una condicion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">Nuevo</SelectItem>
                          <SelectItem value="used">Semi-Nuevo</SelectItem>
                          <SelectItem value="used">Usado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genero</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={`${field.value}`}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un genero" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Hombre</SelectItem>
                          <SelectItem value="1">Mujer</SelectItem>
                          <SelectItem value="2">Unisex</SelectItem>
                          <SelectItem value="3">Niños</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Talla</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una talla" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories[
                            form.watch("categoryId") || 0
                          ].subcategories
                            .find(
                              (subcategory) =>
                                subcategory.slug === form.watch("subcategory")
                            )
                            ?.sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Elige tu talla en US o CL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Imagenes</CardTitle>
              <CardDescription>
                Elige las mejores imagenes para tu producto
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <FormItem className="flex w-full flex-col gap-1.5">
                <FormLabel>Images</FormLabel>
                {files?.length ? (
                  <div className="flex items-center gap-2">
                    {files.map((file, i) => (
                      <Zoom key={i}>
                        <Image
                          src={file.preview}
                          alt={file.name}
                          className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                          width={80}
                          height={80}
                        />
                      </Zoom>
                    ))}
                  </div>
                ) : null}
                <FormControl>
                  <FileDialog
                    setValue={form.setValue}
                    name="images"
                    maxFiles={3}
                    maxSize={1024 * 1024 * 4}
                    files={files}
                    setFiles={setFiles}
                    isUploading={isUploading}
                    disabled={pending}
                  />
                </FormControl>
                <UncontrolledFormMessage
                  message={form.formState.errors.images?.message}
                />
              </FormItem> */}
              
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Precio</CardTitle>
              <CardDescription>
                (proximamente) te recomendaremos el mejor precio basado en tu producto.
              </CardDescription>
              <CardContent>
                <div className="grid gap-3 py-3 ">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            id="price"
                            step={1000}
                            placeholder="20k"
                            className="max-w-xs"
                            type="text"
                            onChange={(e) => {
                              e.target.value = numberToClp(e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publicar inmediatamente</FormLabel>
                          <FormDescription>
                            Al Desactivar, solo tu podras ver el producto.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        {/* Schema fields end */}
        {/* Save Button */}
        <SaveButton errors={hasErrors} editing={editing} />
        {/* Delete Button */}
        {editing ? (
          <Button
            type="button"
            disabled={isDeleting || pending || hasErrors}
            variant={"destructive"}
            onClick={() => {
              setIsDeleting(true);
              closeModal && closeModal();
              startMutation(async () => {
                addOptimistic &&
                  addOptimistic({ action: "delete", data: post });
                const error = await deletePostAction(post.id);
                setIsDeleting(false);
                const errorFormatted = {
                  error: error ?? "Error",
                  values: post,
                };

                onSuccess("delete", error ? errorFormatted : undefined);
              });
            }}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default PostForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
