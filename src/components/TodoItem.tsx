'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { EditModal } from '@/components/EditModal';
import axios from 'axios';

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean | 'indeterminate') => {
    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, { id, completed: !!checked });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, { data: { id } });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 flex items-center justify-between bg-white/10 rounded-md border border-white/10">
      <div>
        <Checkbox
          id={`todo-${id}`}
          checked={completed}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
        <label
          htmlFor={`todo-${id}`}
          className={`text-white ${completed ? 'line-through opacity-60' : ''} px-4`}
        >
          {title}
        </label>
      </div>
      <div className='flex flex-row gap-2'>
        <EditModal />
        <Button type="button" onClick={handleDelete} disabled={loading} variant="ghost" size="icon">
          ×
        </Button>
      </div>
    </div>
  );
}
