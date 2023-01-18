import {useMutation, useQuery, useQueryClient} from 'react-query';
import {request} from '../utils/axios-utils';

export type TodoType = {
  id: number;
  title: string;
};

export type TUseTodoList = {
  onSuccess: () => void;
  onError: () => void;
};

const fetchTodoList = () => {
  return request({url: '/todos'});
};

const addTodo = (todo: any) => {
  return request({url: '/todos', method: 'post', data: todo});
};

export const useTodoListData = ({onSuccess, onError}: TUseTodoList) => {
  return useQuery('todos', fetchTodoList, {
    onSuccess,
    onError,
    // select: data => {
    //   const todoDesc = data?.data.map((todo: TodoType) => todo.title);
    //   return todoDesc;
    // },
  });
};

export const useAddTodoData = () => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: data => {
      // queryClient.invalidateQueries('todos');

      queryClient.setQueryData('todos', (oldQueryData: any) => {
        console.log('OLD QUERY DATA => ', oldQueryData);
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data?.data],
        };
      });
    },
  });
};
