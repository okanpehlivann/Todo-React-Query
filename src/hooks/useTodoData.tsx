import {QueryFunctionContext, useQuery, useQueryClient} from 'react-query';
import {TodoType} from './useTodoListData';
import {request} from '../utils/axios-utils';

export type TUseTodoData = {
  todoId: number;
};

const fetchTodo = ({
  queryKey,
}: QueryFunctionContext<[number, string | null | undefined]>) => {
  const todoId = queryKey[1];

  return request({url: `/todos/${todoId}`});
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
