import { z } from "zod";

export const getProductsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional().default("createdAt.desc"),
  categories: z.string().optional(),
  subcategory: z.string().optional(),
  region: z.string().optional(),
  price_range: z.string().optional(),
  store_ids: z.string().optional(),
  store_page: z.coerce.number().default(1),
  active: z.string().optional().default("true"),
  brand: z.string().optional(),
});
