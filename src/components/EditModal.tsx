import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRouter } from 'next/navigation';

type EditModalProps = {
  id: number
  title: string
}

export function EditModal({ id, title }: EditModalProps) {
    const router = useRouter();    
    
    const handleEdit = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {id, title});
      router.refresh();
    } catch (e) {
        console.error("Error editing todo:", e);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button type="button" variant="ghost" size="icon">
          ✏️
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-lg">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Make changes to your todo here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        <div className="grid gap-4">
            <Label htmlFor="title-1">Todo Title</Label>
            <Input id="title-1" name="title" defaultValue="Study" />
        </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button type="submit" onClick={handleEdit}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
