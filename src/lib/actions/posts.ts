"use server";

import { revalidatePath } from "next/cache";
import {
  createPost,
  deletePost,
  updatePost,
  updateStatusPost,
} from "@/lib/api/posts/mutations";
import {
  PostId,
  NewPostParams,
  UpdatePostParams,
  postIdSchema,
  insertPostParams,
  updatePostParams,
} from "@/lib/db/schema/posts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, algo salio mal.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePosts = () => revalidatePath("/dashboard/stores");

export const createPostAction = async (input: NewPostParams) => {
  console.log("createPostAction");
  console.log("input", input);
  try {
    console.log("iniciando try");
    const payload = insertPostParams.parse(input);
    console.log("payload", payload);
    await createPost(payload);
    // revalidatePosts();
  } catch (e) {
    console.log("❌ error", e);
    return handleErrors(e);
  }
};

export const updatePostAction = async (input: UpdatePostParams) => {
  try {
    const payload = updatePostParams.parse(input);
    await updatePost(payload.id, payload);
    revalidatePosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePostAction = async (input: PostId) => {
  //ADD VALIDATION OF USER
  try {
    const payload = postIdSchema.parse({ id: input });
    await deletePost(payload.id);
    revalidatePosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatusPostAction = async (
  id: PostId,
  status: boolean,
  type: "ACTIVE" | "SOLD"
) => {
  try {
    await updateStatusPost(id, status, type);
    revalidatePosts();
  } catch (e) {
    return handleErrors(e);
  }
};
