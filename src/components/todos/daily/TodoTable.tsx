'use client';
import { addTodo, changeColor, removeTodo, toggleTodo } from '@/actions/todo';
import { modal } from '@/components/Modal';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TAddTodoForm, addTodoSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Circle, Eye, X } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AddForm from '../AddForm';
import { StatChart } from './StatChart';

export const TodoTable: React.FC<{ todos: TTodo[] }> = ({ todos }) => {
  const router = useRouter();

  const { execute: remove, result: removeResult } = useAction(removeTodo);
  const { execute: toggle, result: toggleResult } = useAction(toggleTodo);

  const form = useForm<TAddTodoForm>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  return (
    <div className="flex gap-5">
      <AddForm action={addTodo} schema={addTodoSchema} />
      <div className="flex flex-col gap-5">
        <Table>
          <TableCaption>List of todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Go to</TableHead>
              <TableHead></TableHead>
              <TableHead className="w-[150px] text-right">%</TableHead>
              <TableHead className="text-right">done / all</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.name}</TableCell>
                <TableCell>
                  <Switch defaultChecked={todo.days.at(-1)?.isDone} onCheckedChange={() => toggle({ id: todo.id })} />
                </TableCell>
                <TableCell>
                  <Eye className="cursor-pointer w-10" onClick={() => router.push(`/daily/${todo.id}`)} />
                </TableCell>
                <TableCell>
                  <div className="relative w-5 h-5 cursor-pointer">
                    <input
                      type="color"
                      defaultValue={todo.color}
                      className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
                      onBlur={(e) => {
                        e.stopPropagation();
                        changeColor({ id: todo.id, color: e.target.value });
                      }}
                    />
                    <Circle color={todo.color} fill={todo.color} />
                  </div>
                </TableCell>
                <TableCell className="text-right">{`${Math.floor(
                  (todo.days.filter((day) => day.isDone === true).length / todo.days.length) * 100
                )}%`}</TableCell>
                <TableCell className="text-right">{`${todo.days.filter((day) => day.isDone === true).length} / ${
                  todo.days.length
                }`}</TableCell>
                <TableCell>
                  <X
                    size={15}
                    className="cursor-pointer"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const res = await modal.question({
                        title: 'Supprimer la todo ?',
                        message: 'Cette action est irreversible',
                      });
                      if (res) {
                        remove({ id: todo.id });
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <StatChart todos={todos} />
      </div>
    </div>
  );
};
