"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EditModal } from "@/components/EditModal";
import axios from "axios";

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<boolean>(completed); // optimistic state

  const handleDelete = async () => {
    try {
      await axios.delete("/api/todo", { data: { id } });
      router.refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (next: boolean | "indeterminate") => {
    // optimistic update
    const nextVal = !!next;
    const prev = checked;
    setChecked(nextVal);

    setLoading(true);
    try {
      await axios.patch("/api/todo", {
        id,
        completed: nextVal,
      });
    } catch (e) {
      console.error("Error toggling todo:", e);
      setChecked(prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 flex items-center justify-between bg-white/10 rounded-md border border-white/10">
      <div className="flex items-center gap-3">
        <Checkbox
          id={`todo-${id}`}
          checked={checked}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
        <label
          htmlFor={`todo-${id}`}
          className={`text-white px-3 ${
            checked ? "line-through opacity-60" : ""
          }`}
        >
          {title}
        </label>
      </div>

      <div className="flex flex-row gap-2">
        <EditModal id={id} title={title} />
        <Button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          variant="ghost"
          size="icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
