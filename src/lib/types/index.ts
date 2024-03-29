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
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export type FileWithPreview = FileWithPath & {
  preview: string
}