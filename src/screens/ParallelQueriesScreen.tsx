import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {request} from '../utils/axios-utils';

const fetchTodoList = () => {
  return request({url: `/todos`});
};

const fetchFriends = () => {
  return request({url: `/friends`});
};

function ParallelQueriesScreen(): JSX.Element {
  const {data: todoList} = useQuery('todo-list', fetchTodoList);
  const {data: friends} = useQuery('friends', fetchFriends);

  return (
    <SafeAreaView>
      <Text>ParallelQueries</Text>
    </SafeAreaView>
  );
}

export default ParallelQueriesScreen;
