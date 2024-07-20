'use client';
import { addSimpleTodo, removeSimpleTodo } from '@/actions/simpleTodo';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addSimpleTodoSchema } from '@/lib/validation';
import { SimpleTodo } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import AddForm from '../AddForm';

const SimpleTodoTable: React.FC<{ todos: SimpleTodo[] }> = ({ todos }) => {
  const { execute: setDone, result: setDoneResult } = useAction(removeSimpleTodo);

  return (
    <div className="flex gap-5">
      <AddForm action={addSimpleTodo} schema={addSimpleTodoSchema} />
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
