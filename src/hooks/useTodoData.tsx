import {QueryFunctionContext, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {TodoType} from './useTodoListData';

export type TUseTodoData = {
  todoId: number;
};

const fetchTodo = ({
  queryKey,
}: QueryFunctionContext<[number, string | null | undefined]>) => {
  const todoId = queryKey[1];

  return axios.get<TodoType>(`http://localhost:4000/todos/${todoId}`);
};

export const useTodoData = ({todoId}: TUseTodoData) => {
  const queryClient = useQueryClient();

  return useQuery(['todo', todoId], () => fetchTodo, {
    initialData: () => {
      const todo = queryClient
        .getQueryData('todos')
        ?.data?.find((todo: TodoType) => todo.id === todoId);

      if (todo) {
        return {
          data: todo,
        };
      } else {
        return undefined;
      }
    },
  });
};
