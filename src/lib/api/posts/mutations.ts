import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  PostId, 
  NewPostParams,
  UpdatePostParams, 
  updatePostSchema,
  insertPostSchema, 
  posts,
  postIdSchema 
} from "@/lib/db/schema/posts";

export const createPost = async (post: NewPostParams) => {
  const newPost = insertPostSchema.parse(post);
  try {
    const [p] =  await db.insert(posts).values(newPost).returning();
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePost = async (id: PostId, post: UpdatePostParams) => {
  const { id: postId } = postIdSchema.parse({ id });
  const newPost = updatePostSchema.parse(post);
  try {
    const [p] =  await db
     .update(posts)
     .set({...newPost, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(posts.id, postId!))
     .returning();
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePost = async (id: PostId) => {
  const { id: postId } = postIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(posts).where(eq(posts.id, postId!))
    .returning();
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

