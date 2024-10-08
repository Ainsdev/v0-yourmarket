import { FileWithPath } from "react-dropzone";

export interface Category {
  id: number;
  title: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: Subcategory[];
}

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface Subcategory {
  title: string;
  description?: string;
  image: string;
  slug: string;
  sizes: string[];
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface ProductWithStore {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  mainImage: string;
  storeId: number;
  storeName: string | null;
  storeImage: string | null;
  categoryId: number;
  subcategory: string;
}

export interface NavItem {
  title: string
  href?: string
  description?: string
  disabled?: boolean
  external?: boolean
}