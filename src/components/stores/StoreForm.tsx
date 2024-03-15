import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/stores/useOptimisticStores";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";


import { Checkbox } from "@/components/ui/checkbox"


import { type Store, insertStoreParams } from "@/lib/db/schema/stores";
import {
  createStoreAction,
  deleteStoreAction,
  updateStoreAction,
} from "@/lib/actions/stores";


const StoreForm = ({
  
  store,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  store?: Store | null;
  
  openModal?: (store?: Store) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Store>(insertStoreParams);
  const editing = !!store?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("stores");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Store },
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
      toast.success(`Store ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const storeParsed = await insertStoreParams.safeParseAsync({  ...payload });
    if (!storeParsed.success) {
      setErrors(storeParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = storeParsed.data;
    const pendingStore: Store = {
      updatedAt: store?.updatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: store?.createdAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      id: store?.id ?? "",
      userId: store?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingStore,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateStoreAction({ ...values, id: store.id })
          : await createStoreAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingStore 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={store?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.description ? "text-destructive" : "",
          )}
        >
          Description
        </Label>
        <Input
          type="text"
          name="description"
          className={cn(errors?.description ? "ring ring-destructive" : "")}
          defaultValue={store?.description ?? ""}
        />
        {errors?.description ? (
          <p className="text-xs text-destructive mt-2">{errors.description[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
<div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.active ? "text-destructive" : "",
          )}
        >
          Active
        </Label>
        <br />
        <Checkbox defaultChecked={store?.active} name={'active'} className={cn(errors?.active ? "ring ring-destructive" : "")} />
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
            errors?.image ? "text-destructive" : "",
          )}
        >
          Image
        </Label>
        <Input
          type="text"
          name="image"
          className={cn(errors?.image ? "ring ring-destructive" : "")}
          defaultValue={store?.image ?? ""}
        />
        {errors?.image ? (
          <p className="text-xs text-destructive mt-2">{errors.image[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.region ? "text-destructive" : "",
          )}
        >
          Region
        </Label>
        <Input
          type="text"
          name="region"
          className={cn(errors?.region ? "ring ring-destructive" : "")}
          defaultValue={store?.region ?? ""}
        />
        {errors?.region ? (
          <p className="text-xs text-destructive mt-2">{errors.region[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.city ? "text-destructive" : "",
          )}
        >
          City
        </Label>
        <Input
          type="text"
          name="city"
          className={cn(errors?.city ? "ring ring-destructive" : "")}
          defaultValue={store?.city ?? ""}
        />
        {errors?.city ? (
          <p className="text-xs text-destructive mt-2">{errors.city[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.slug ? "text-destructive" : "",
          )}
        >
          Slug
        </Label>
        <Input
          type="text"
          name="slug"
          className={cn(errors?.slug ? "ring ring-destructive" : "")}
          defaultValue={store?.slug ?? ""}
        />
        {errors?.slug ? (
          <p className="text-xs text-destructive mt-2">{errors.slug[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.mainCategories ? "text-destructive" : "",
          )}
        >
          Main Categories
        </Label>
        <Input
          type="text"
          name="mainCategories"
          className={cn(errors?.mainCategories ? "ring ring-destructive" : "")}
          defaultValue={store?.mainCategories ?? ""}
        />
        {errors?.mainCategories ? (
          <p className="text-xs text-destructive mt-2">{errors.mainCategories[0]}</p>
        ) : (
          <div className="h-6" />
        )}
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
              addOptimistic && addOptimistic({ action: "delete", data: store });
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
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default StoreForm;

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
