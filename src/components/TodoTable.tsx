'use client';
import { addTodo, removeTodo, toggleTodo } from '@/actions/todo';
import { TAddTodoForm, addTodoSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, X } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LogoutButton } from './AuthButton';
import { modal } from './Modal';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const TodoTable: React.FC<{ todos: TTodo[] }> = ({ todos }) => {
  const router = useRouter();

  const { execute: add, result: addResult } = useAction(addTodo);
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
      <div className="sticky top-16 h-fit rounded-lg border bg-background px-4 py-4 md:w-[260px] flex flex-col gap-3">
        {addResult.serverError && <div className="text-red-600">{addResult.serverError}</div>}
        <Form {...form} state={addResult}>
          <form onSubmit={form.handleSubmit(add)}>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="new todo name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add todo</Button>
            </div>
          </form>
        </Form>
        <LogoutButton />
      </div>
      <Table>
        <TableCaption>List of todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Go to</TableHead>
            <TableHead className="w-[150px] text-right">%</TableHead>
            <TableHead className="w-[150px] text-right">done / all</TableHead>
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
                <Eye className="cursor-pointer w-10" onClick={() => router.push(`/todo/${todo.id}`)} />
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
    </div>
  );
};
