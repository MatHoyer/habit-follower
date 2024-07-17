'use client';
import { addSimpleTodo, removeSimpleTodo } from '@/actions/simpleTodo';
import { addSimpleTodoSchema, TAddTodoForm } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SimpleTodo } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const SimpleTodoTable: React.FC<{ todos: SimpleTodo[] }> = ({ todos }) => {
  const { execute: add, result: addResult } = useAction(addSimpleTodo);
  const { execute: setDone, result: setDoneResult } = useAction(removeSimpleTodo);

  const form = useForm<TAddTodoForm>({
    resolver: zodResolver(addSimpleTodoSchema),
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
      </div>
      <div className="flex flex-col gap-5">
        <Table>
          <TableCaption>List of todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[600px]">Name</TableHead>
              <TableHead>Finished</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.name}</TableCell>
                <TableCell className="flex justify-center">
                  <Button variant={'outline'} onClick={() => setDone({ id: todo.id })}>
                    Done
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SimpleTodoTable;
