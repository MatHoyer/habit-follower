'use client';
import createTodo from '@/actions/todo/create';
import deleteTodo from '@/actions/todo/delete';
import { getAllTodos } from '@/actions/todo/get';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TodoTable: React.FC<{ todos: TTodo[] }> = ({ todos }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('auth');
    if (!t) return;
    setToken(t);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
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
                <Switch defaultChecked={todo.isDone.at(-1)?.isDone} />
              </TableCell>
              <TableCell className="text-right">{`${
                (todo.isDone.filter((day) => day.isDone === true).length / todo.isDone.length) * 100
              }%`}</TableCell>
              <TableCell>
                <X
                  size={15}
                  className="cursor-pointer"
                  onClick={() => {
                    deleteTodo(token, todo.name);
                    location.reload();
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        className="mt-5"
        onClick={async () => {
          createTodo(token, 'new todo');
          location.reload();
        }}
      >
        Add todo
      </Button>
    </div>
  );
};

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([] as TTodo[]);
  const router = useRouter();

  const getTodos = async () => {
    const token = localStorage.getItem('auth');
    if (!token) return;
    try {
      const response = await getAllTodos(token);
      setTodos(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuthenticated(true);
      getTodos();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {isAuthenticated ? (
        <>
          <TodoTable todos={todos} />
          <Button
            onClick={() => {
              localStorage.removeItem('auth');
              location.reload();
            }}
          >
            Disconect
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => router.push('/auth/login')}>Login</Button>
          <Button onClick={() => router.push('/auth/sign-up')}>Sign Up</Button>
        </>
      )}
    </div>
  );
};

export default Home;
