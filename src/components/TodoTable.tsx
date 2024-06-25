'use client';
import { addTodo, removeTodo, toggleTodo } from '@/actions/todo';
import { X } from 'lucide-react';
import { useState } from 'react';
import { LogoutButton } from './AuthButton';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const TodoTable: React.FC<{ todos: TTodo[] }> = ({ todos }) => {
  const [newName, setNewName] = useState('');

  return (
    <div className="flex gap-5">
      <div className="sticky top-16 h-fit rounded-lg border bg-background px-4 py-4 md:w-[260px] flex flex-col gap-3">
        <Input placeholder="new todo name" onChange={(e) => setNewName(e.target.value)} />
        <Button onClick={() => addTodo(newName)} disabled={newName === ''}>
          Add todo
        </Button>
        <LogoutButton />
      </div>
      <Table>
        <TableCaption>List of todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[150px] text-right">%</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="font-medium">{todo.name}</TableCell>
              <TableCell>
                <Switch defaultChecked={todo.days.at(-1)?.isDone} onCheckedChange={() => toggleTodo(todo.id)} />
              </TableCell>
              <TableCell className="text-right">{`${
                (todo.days.filter((day) => day.isDone === true).length / todo.days.length) * 100
              }%`}</TableCell>
              <TableCell>
                <X size={15} className="cursor-pointer" onClick={() => removeTodo(todo.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
