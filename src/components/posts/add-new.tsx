"use client";

import React from "react";
import { DrawerDialog } from "../DrawerDialog";
import PostForm from "./PostForm";
import { Button } from "../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function NewPostComponent(params: { storeId: number }) {
  const [open, setOpen] = React.useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
  return (
    <>
      <DrawerDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={"Crear Producto"}
        dialogDescription="Es facil y rapido"
      >
        <PostForm
          openModal={openModal}
          closeModal={closeModal}
          storeId={params.storeId}
        />
      </DrawerDialog>
      <Button
        className="flex gap-1 justify-center items-center"
        onClick={() => openModal()}
      >
        <PlusCircledIcon className="hidden sm:flex"/> Nuevo Producto
      </Button>
    </>
  );
}
