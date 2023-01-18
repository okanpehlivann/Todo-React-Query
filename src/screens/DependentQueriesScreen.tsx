import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {request} from '../utils/axios-utils';

const fetchUserByEmail = (email: string) => {
  return request({url: `/users/${email}`});
};

const fetchCoursesByChannelId = (channelId: string) => {
  return request({url: `/channels/${channelId}`});
};

function DependentQueries({route}): JSX.Element {
  const {email} = route.params;

  const {data: user} = useQuery(['user', email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  const {data: courses} = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    },
  );

  console.log('COURSES => ', courses?.data);

  return (
    <SafeAreaView>
      <View>
        {courses?.data.courses.map((item: any, index: number) => {
          return <Text key={index}>{item}</Text>;
        })}
      </View>
    </SafeAreaView>
  );
}

export default DependentQueries;
