import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
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
  // return axios.get<TodoType[]>('http://localhost:4000/todos');
  return request({url: '/todos'});
};

const addTodo = (todo: any) => {
  // return axios.post('http://localhost:4000/todos', todo);
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
