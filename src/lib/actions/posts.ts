"use server";

import { revalidatePath } from "next/cache";
import {
  createPost,
  deletePost,
  updatePost,
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
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePosts = () => revalidatePath("/posts");

export const createPostAction = async (input: NewPostParams) => {
  try {
    const payload = insertPostParams.parse(input);
    await createPost(payload);
    revalidatePosts();
  } catch (e) {
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
  try {
    const payload = postIdSchema.parse({ id: input });
    await deletePost(payload.id);
    revalidatePosts();
  } catch (e) {
    return handleErrors(e);
  }
};