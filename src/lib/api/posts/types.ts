export interface FeaturedPost {
  id: string;
  name: string;
  brand: string;
  price: number;
  mainImage: string;
  categoryId: number;
  subcategory: string;
  storeId: number;
  storeName: string | null;
}
