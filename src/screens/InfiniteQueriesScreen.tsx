import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';

const fetchColors = ({pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

function InfiniteQueriesScreen(): JSX.Element {
  const {isLoading, isError, error, data, hasNextPage, fetchNextPage} =
    useInfiniteQuery(['colors-infinite'], fetchColors, {
      getNextPageParam: (_lastPage: any, pages: any) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  console.log('DATAAA => ', data?.pages);

  if (isError) {
    return (
      <SafeAreaView>
        <Text>{error?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {data?.pages.map((group: any, index: number) => {
        return (
          <View key={index}>
            {group.data.map((color: any) => {
              return (
                <Text
                  key={color.id}
                  style={{fontSize: 18, fontWeight: '600', margin: 10}}>
                  {color.id} - {color.label}
                </Text>
              );
            })}
          </View>
        );
      })}

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 40,
        }}>
        <TouchableOpacity onPress={fetchNextPage} disabled={!hasNextPage}>
          <Text>Load More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default InfiniteQueriesScreen;
