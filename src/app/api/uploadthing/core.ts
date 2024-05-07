import { getUserAuth } from "@/lib/auth/utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImage: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { session } = await getUserAuth();
      // This code runs on your server before upload
      // const user = await session.getUser();
      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),
  productImages: f({ image: { maxFileSize: "2MB", maxFileCount: 4 } })
    .middleware(async ({ req }) => {
      const { session } = await getUserAuth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
