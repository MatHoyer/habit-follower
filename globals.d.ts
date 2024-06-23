type TToken = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type TTodo = {
  id: number;
  name: string;
  ownerId: number;
  isDone: {
    id: number;
    isDone: boolean;
    todoId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
