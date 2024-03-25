"use server";

import { revalidatePath } from "next/cache";
import {
  createStore,
  deleteStore,
  updateStore,
} from "@/lib/api/stores/mutations";
import {
  StoreId,
  NewStoreParams,
  UpdateStoreParams,
  storeIdSchema,
  insertStoreParams,
  updateStoreParams,
} from "@/lib/db/schema/stores";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  console.error(e);
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStores = () => revalidatePath("/stores");

export const createStoreAction = async (input: NewStoreParams) => {
  try {
    const payload = insertStoreParams.parse(input);
    await createStore(payload);
    revalidateStores();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStoreAction = async (input: UpdateStoreParams) => {
  try {
    const payload = updateStoreParams.parse(input);
    await updateStore(payload.id, payload);
    revalidateStores();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStoreAction = async (input: StoreId) => {
  try {
    const payload = storeIdSchema.parse({ id: input });
    await deleteStore(payload.id);
    revalidateStores();
  } catch (e) {
    return handleErrors(e);
  }
};
