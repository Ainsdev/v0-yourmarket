import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import { Checkbox } from "@/components/ui/checkbox";

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
} from "../ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
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
      gender: post?.gender,
      size: post?.size,
      categoryId: post?.categoryId,
      subcategory: post?.subcategory,
    },
  });

  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Post>(insertPostParams);
  const editing = !!post?.id;
  const [category, setCategory] = useState(post?.categoryId ?? 0);
  const [brandInName, setBrandInName] = useState(post?.brand ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? brands
                                    .slice(0, 50)
                                    .find(
                                      (brand) => brand.value === field.value
                                    )?.name
                                : "Seleccciona una marca"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar Marca..." />
                            <CommandEmpty>No hemos encontrado.</CommandEmpty>
                            {/* <CommandGroup title="Mas Populares">
                              <CommandList>
                                {mostPopularBrandsJSON.map((brand) => (
                                  <CommandItem
                                    value={brand.name}
                                    key={brand.value}
                                    onSelect={() => {
                                      form.setValue("brand", brand.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        brand.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {brand.name}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup> */}
                            <CommandGroup>
                              <CommandList>
                                {brands.slice(0, 50).map((brand) => (
                                  <CommandItem
                                    value={brand.name}
                                    key={brand.value}
                                    onSelect={() => {
                                      form.setValue("brand", brand.value);
                                    }}
                                  >
                                    {/* <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      brand.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  /> */}
                                    {brand.name}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                                if (value.includes(search)) return 1;
                                return 0;
                              }}
                            >
                              <CommandInput placeholder="Buscar Marca..." />
                              <CommandEmpty>No hemos encontrado.</CommandEmpty>
                              <CommandGroup title="Mas Populares">
                                <CommandList>
                                  {mostPopularBrandsJSON.map((brand) => (
                                    <CommandItem
                                      value={brand.name}
                                      key={brand.value}
                                      onSelect={() => {
                                        form.setValue("brand", brand.value);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          brand.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {brand.name}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                              <CommandGroup>
                                <CommandList>
                                  {brands.map((brand) => (
                                    <CommandItem
                                      value={brand.name}
                                      key={brand.value}
                                      onSelect={() => {
                                        form.setValue("brand", brand.value);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          brand.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {brand.name}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
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
                      <FormLabel>Titulo</FormLabel>
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
                        Inclcuir la marca en el titulo?
                        {/* <Checkbox
                          checked={field.value?.includes(brandInName)}
                          onChange={() => {
                            setBrandInName(
                              field.value?.includes(brandInName)
                                ? field.value
                                : `${brandInName} ${field.value}`
                            );
                          }}
                        /> */}
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
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.description ? "text-destructive" : ""
            )}
          >
            Description
          </Label>
          <Input
            type="text"
            name="description"
            className={cn(errors?.description ? "ring ring-destructive" : "")}
            defaultValue={post?.description ?? ""}
          />
          {errors?.description ? (
            <p className="text-xs text-destructive mt-2">
              {errors.description[0]}
            </p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.active ? "text-destructive" : ""
            )}
          >
            Active
          </Label>
          <br />
          <Checkbox
            defaultChecked={post?.active as boolean}
            name={"active"}
            className={cn(errors?.active ? "ring ring-destructive" : "")}
          />
          {errors?.active ? (
            <p className="text-xs text-destructive mt-2">{errors.active[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.brand ? "text-destructive" : ""
            )}
          >
            Brand
          </Label>
          <Input
            type="text"
            name="brand"
            className={cn(errors?.brand ? "ring ring-destructive" : "")}
            defaultValue={post?.brand ?? ""}
          />
          {errors?.brand ? (
            <p className="text-xs text-destructive mt-2">{errors.brand[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.images ? "text-destructive" : ""
            )}
          >
            Images
          </Label>
          <Input
            type="text"
            name="images"
            className={cn(errors?.images ? "ring ring-destructive" : "")}
            defaultValue={post?.images ?? ""}
          />
          {errors?.images ? (
            <p className="text-xs text-destructive mt-2">{errors.images[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.price ? "text-destructive" : ""
            )}
          >
            Price
          </Label>
          <Input
            type="text"
            name="price"
            className={cn(errors?.price ? "ring ring-destructive" : "")}
            defaultValue={post?.price ?? ""}
          />
          {errors?.price ? (
            <p className="text-xs text-destructive mt-2">{errors.price[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.gender ? "text-destructive" : ""
            )}
          >
            Gender
          </Label>
          <Input
            type="text"
            name="gender"
            className={cn(errors?.gender ? "ring ring-destructive" : "")}
            defaultValue={post?.gender ?? ""}
          />
          {errors?.gender ? (
            <p className="text-xs text-destructive mt-2">{errors.gender[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>

        {storeId ? null : (
          <div>
            <Label
              className={cn(
                "mb-2 inline-block",
                errors?.storeId ? "text-destructive" : ""
              )}
            >
              Store
            </Label>
            <Select defaultValue={post?.storeId} name="storeId">
              <SelectTrigger
                className={cn(errors?.storeId ? "ring ring-destructive" : "")}
              >
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>
              <SelectContent>
                {stores?.map((store) => (
                  <SelectItem key={store.id} value={store.id.toString()}>
                    {store.id}
                    {/* TODO: Replace with a field from the store model */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.storeId ? (
              <p className="text-xs text-destructive mt-2">
                {errors.storeId[0]}
              </p>
            ) : (
              <div className="h-6" />
            )}
          </div>
        )}
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
