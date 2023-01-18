import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import axios from 'axios';

const fetchTodoList = () => {
  return axios.get('http://localhost:4000/todos');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
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
