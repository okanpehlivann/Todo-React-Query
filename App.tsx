import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodosScreen from './src/screens/TodosScreen';
import TodoScreen from './src/screens/TodoScreen';
import ParallelQueriesScreen from './src/screens/ParallelQueriesScreen';
import DynamicQueryScreen from './src/screens/DynamicParallelScreen';
import DependentQueries from './src/screens/DependentQueriesScreen';
import PaginatedQueriesScreen from './src/screens/PaginatedQueriesScreen';
import InfiniteQueriesScreen from './src/screens/InfiniteQueriesScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Todos" component={TodosScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen
            name="ParallelQuery"
            component={ParallelQueriesScreen}
          />
          <Stack.Screen name="DynamicQuery" component={DynamicQueryScreen} />
          <Stack.Screen name="DependentQuery" component={DependentQueries} />
          <Stack.Screen
            name="PaginatedQueries"
            component={PaginatedQueriesScreen}
          />
          <Stack.Screen
            name="InfiniteQueries"
            component={InfiniteQueriesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

export default App;
