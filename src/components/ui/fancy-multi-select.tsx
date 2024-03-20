"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Cross1Icon } from "@radix-ui/react-icons";

export interface FancyMultiSelectProps {
  data: string[];
  onChange: (selected: string[]) => void;
  max?: number;
}

export const FancyMultiSelect = ({
  data,
  onChange,
  max,
}: FancyMultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [reachMax, setReachMax] = React.useState(false);

  const handleUnselect = React.useCallback(
    (framework: string) => {
      setSelected((prev) => prev.filter((s) => s !== framework));
      onChange(selected.filter((s) => s !== framework));
    },
    [selected, onChange],
  );

  // ...existing code...

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
          onChange(selected.slice(0, -1));
        }
      }

      // ...existing code...
    },
    [selected, onChange],
  );

  const selectables = data.filter((framework) => !selected.includes(framework));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={uuid()} className="flex items-center">
                {framework}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <Cross1Icon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Selecciona uno o más items"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <p className="text-xs text-destructive">
          {reachMax ?? `Solo puedes seleccionar ${max} items` }
        </p>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((framework) => {
                return (
                  <CommandItem
                    key={uuid()}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      //validate if the max is reached
                      if (max && selected.length > max) {
                        setReachMax(true);
                        return;
                      } else {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                        onChange([...selected, framework]); // Add onChange here
                      }
                    }}
                    className={"cursor-pointer"}
                  >
                    {framework}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

function uuid() {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
  return uuid;
}
