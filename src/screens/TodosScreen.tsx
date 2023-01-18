import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import React, {useState} from 'react';
import TodoCard from '../components/TodoCard';
import {
  TodoType,
  useAddTodoData,
  useTodoListData,
} from '../hooks/useTodoListData';
import {useNavigation} from '@react-navigation/native';

function TodosScreen(): JSX.Element {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<string>('');
  let myTextInput = React.createRef<any>();

  const onSuccess = () => {
    console.log('Perform side effect after data fetching');
  };

  const onError = () => {
    console.log('Perform side effect after encountouring error');
  };

  const {data, isLoading, isError, error, isFetching} = useTodoListData({
    onSuccess,
    onError,
  });

  const {mutate: addTodoInput} = useAddTodoData();

  if (isLoading || isFetching) {
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

  const goToParallelQuery = () => {
    navigation.navigate('ParallelQuery');
  };

  const goToDynamicQuery = () => {
    navigation.navigate('DynamicQuery', {
      todoIds: [1, 3],
    });
  };

  const goToDependentQuery = () => {
    navigation.navigate('DependentQuery', {
      email: 'vishwas@gmail.com',
    });
  };

  const goToPaginatedQuery = () => {
    navigation.navigate('PaginatedQueries');
  };

  const goToInfiniteQuery = () => {
    navigation.navigate('InfiniteQueries');
  };

  const goTodoDetail = (todoId: number) => {
    navigation.navigate('Todo', {
      todoId,
    });
  };

  function addTodo(todo: string) {
    addTodoInput({title: todo});
    myTextInput?.current.clear();
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.main}>
          <TextInput
            style={styles.textinput}
            onChangeText={text => setSearchText(text)}
            ref={myTextInput}
            placeholder="Add Todo"
          />
          <TouchableOpacity onPress={() => addTodo(searchText)}>
            <Text>Ekle</Text>
          </TouchableOpacity>
        </View>

        {data?.data.map((todo: TodoType) => {
          return (
            <TouchableOpacity
              key={todo.id}
              onPress={() => goTodoDetail(todo.id)}>
              <TodoCard title={todo.title} />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={{margin: 20}} onPress={goToParallelQuery}>
          <Text>Go To Parallel Query Pageeeee</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 20}} onPress={goToDynamicQuery}>
          <Text>Go To Dynamic Query Pageeee</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 20}} onPress={goToDependentQuery}>
          <Text>Go To Dependent Query Page</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 20}} onPress={goToPaginatedQuery}>
          <Text>Go To Paginated Query Page</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{margin: 20}} onPress={goToInfiniteQuery}>
          <Text>Go To Infinite Query Page</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'gray',
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5,
    width: '80%',
  },
});

export default TodosScreen;
