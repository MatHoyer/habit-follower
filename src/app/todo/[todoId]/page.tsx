import { TodoInspect } from '@/components/TodoInspect';
import { useTodo } from '@/components/hook/useTodos';

const Todo: React.FC<{ params: { todoId: string } }> = async ({ params }) => {
  const todo = await useTodo(params.todoId);

  return <div className="container max-w-5xl my-10 space-y-10 px-3">{<TodoInspect todo={todo} />}</div>;
};

export default Todo;
