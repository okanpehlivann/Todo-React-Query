import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useTodoData} from '../hooks/useTodoData';

function TodoScreen({route}: any): JSX.Element {
  const navigation = useNavigation();
  const {todoId} = route.params;

  const {isLoading, data, isError, error} = useTodoData({todoId});

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView>
        <Text>{error?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 50, fontWeight: 'bold', fontSize: 20}}>
        {data?.data.title}
      </Text>
    </SafeAreaView>
  );
}

export default TodoScreen;
