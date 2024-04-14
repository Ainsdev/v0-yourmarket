"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function DrawerDialog({
  children,
  dialogTitle,
  dialogDescription,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Drawer
      
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerContent className="max-h-[90vh] w-full">
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
