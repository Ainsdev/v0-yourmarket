import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  StoreId, 
  NewStoreParams,
  UpdateStoreParams, 
  updateStoreSchema,
  insertStoreSchema, 
  stores,
  storeIdSchema 
} from "@/lib/db/schema/stores";
import { getUserAuth } from "@/lib/auth/utils";

export const createStore = async (store: NewStoreParams) => {
  const { session } = await getUserAuth();
  const newStore = insertStoreSchema.parse({ ...store, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(stores).values(newStore).returning();
    return { store: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStore = async (id: StoreId, store: UpdateStoreParams) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  const newStore = updateStoreSchema.parse({ ...store, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(stores)
     .set({...newStore, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(stores.id, storeId!), eq(stores.creatorUserId, session?.user.id!)))
     .returning();
    return { store: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStore = async (id: StoreId) => {
  const { session } = await getUserAuth();
  const { id: storeId } = storeIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(stores).where(and(eq(stores.id, storeId!), eq(stores.creatorUserId, session?.user.id!)))
    .returning();
    return { store: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

