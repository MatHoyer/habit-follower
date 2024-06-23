'use client';
import { getAllTodos } from '@/actions/todo/get';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          {todos.map((todo) => (
            <div key={todo.id}>{todo.name}</div>
          ))}
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
