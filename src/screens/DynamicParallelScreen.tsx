import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQueries} from 'react-query';
import {request} from '../utils/axios-utils';

const fetchTodo = (todoId: number) => {
  return request({url: `/todos/${todoId}`});
};

function DynamicQueryScreen({route}: any): JSX.Element {
  const {todoIds} = route.params;

  const queryResults = useQueries(
    todoIds.map((id: number) => {
      return {
        queryKey: ['todo-dynamic', id],
        queryFn: () => fetchTodo(id),
      };
    }),
  );

  console.log({queryResults});

  return (
    <SafeAreaView>
      <Text>Dynamic Query</Text>
    </SafeAreaView>
  );
}

export default DynamicQueryScreen;
