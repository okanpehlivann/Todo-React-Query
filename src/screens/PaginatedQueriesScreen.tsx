import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {request} from '../utils/axios-utils';

const fetchColors = (pageNumber: number) => {
  return request({url: `/colors?_limit=2&_page=${pageNumber}`});
};

function PaginatedQueriesScreen(): JSX.Element {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {isLoading, data, isError, error} = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    },
  );

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
      {data?.data.map((color: any) => {
        return (
          <View key={color.id}>
            <Text style={{fontSize: 18, fontWeight: '600', margin: 10}}>
              {color.id} - {color.label}
            </Text>
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
        <TouchableOpacity
          onPress={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}>
          <Text>Prev Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 4}>
          <Text>Next Page</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PaginatedQueriesScreen;
