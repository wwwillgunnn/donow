"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";

type EditModalProps = { id: number; title: string };

const formSchema = z.object({
  newTodoName: z
    .string()
    .min(2, { message: "todo must be more than 2 characters." }),
});

export function EditModal({ id, title }: EditModalProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null); // ref to hidden close

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newTodoName: title },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put("/api/todo", { id, title: values.newTodoName });
      router.refresh();
      closeRef.current?.click(); // programmatically close modal
    } catch (e) {
      console.error("Error editing todo:", e);
      form.setError("newTodoName", { message: "Failed to update. Try again." });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Edit todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-lg">
        <DialogHeader>
          <DialogTitle className="text-3xl">Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your todo name and save.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="newTodoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={`title-${id}`}>
                    Current name: {title}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`title-${id}`}
                      placeholder="Enter new name here"
                      className="placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>

        {/* Hidden close button to click programmatically */}
        <DialogClose ref={closeRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
