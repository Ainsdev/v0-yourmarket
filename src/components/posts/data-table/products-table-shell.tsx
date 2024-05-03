"use client";

import * as React from "react";
import Link from "next/link";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { catchError, numberToClp } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Post } from "@/lib/db/schema/posts";
import { DataTableColumnHeader } from "./data-table-column-header";
import { deletePostAction } from "@/lib/actions/posts";
import { DataTable } from "./data-table";
import { getAllSubcategories, productCategories } from "@/config/categories";

type AwaitedProduct = Pick<
  Post,
  | "id"
  | "name"
  | "active"
  | "categoryId"
  | "subcategory"
  | "price"
  | "sold"
  | "createdAt"
>;

interface ProductsTableShellProps {
  promise: Promise<{
    data: AwaitedProduct[];
    pageCount: number;
  }>;
  storeId: number;
}

export function ProductsTableShell({
  promise,
  storeId,
}: ProductsTableShellProps) {
  const { data, pageCount } = React.use(promise);

  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([]);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<AwaitedProduct, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => Number(row.id))
              );
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, Number(row.original.id)]
                  : prev.filter((id) => id !== Number(row.original.id))
              );
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Titulo" />
        ),
      },
      {
        accessorKey: "categoryId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => {
          const category = productCategories.find(
            (category) => category.id === cell.getValue()
          )?.title;

          return (
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          );
        },
      },
      {
        accessorKey: "subcategory",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Subcategoria" />
        ),
        cell: ({ cell }) => {
          const subcategory = productCategories[
            cell.row.original.categoryId
          ].subcategories.find(
            (subcategory) => subcategory.slug === cell.getValue()
          )?.title;
          return (
            <Badge variant="outline" className="capitalize">
              {subcategory}
            </Badge>
          );
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Precio" />
        ),
        cell: ({ cell }) => {
          const price = cell.getValue() as number;
          return numberToClp(`${price}`);
        },
      },
      {
        accessorKey: "sold",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Vendido" />
        ),
        //True if the product has been sold
        cell: ({ cell }) => {
          const sold = cell.getValue() as boolean;
          return sold ? "Si" : "No";
        },
      },
      {
        accessorKey: "active",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Activo" />
        ),
        cell: ({ cell }) => {
          const active = cell.getValue() as boolean;
          return (
            <Badge variant={active ? "secondary" : "outline"}>
              {active ? "Activo" : "Inactivo"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Fecha" />
        ),
        cell: ({ cell }) => {
          const date = cell.getValue() as string;
          return new Date(date).toLocaleDateString();
        },
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/stores/${storeId}/products/${row.original.id}`}
                >
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/product/${row.original.id}`}>Ver</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false);
                    toast.promise(deletePostAction(row.original.id), {
                      loading: "Eliminando...",
                      success: () => "Producto eliminado existosamente.",
                      error: (err: unknown) => catchError(err),
                    });
                  });
                }}
                disabled={isPending}
                className="text-destructive"
              >
                Eliminar
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, storeId]
  );

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(selectedRowIds.map((id) => deletePostAction(id.toString()))),
      {
        loading: "Eliminando...",
        success: () => {
          setSelectedRowIds([]);
          return "Productos eliminados existosamente.";
        },
        error: (err: unknown) => {
          setSelectedRowIds([]);
          return catchError(err);
        },
      }
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "categoryId",
          title: "Categoria",
          options: productCategories.map((category) => ({
            value: category.id.toString(),
            label: category.title,
          })),
        },
        {
          id: "subcategory",
          title: "Subcategoria",
          options: getAllSubcategories(),
        },
        {
          id: "active",
          title: "Activo",
          options: [
            { value: "true", label: "Activo" },
            { value: "false", label: "Inactivo" },
          ],
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "Name",
        },
      ]}
      newRowLink={`/dashboard/stores/${storeId}/products/new`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  );
}
