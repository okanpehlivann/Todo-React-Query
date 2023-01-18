import axios from 'axios';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useQuery} from 'react-query';

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
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
