import React, {PropsWithChildren} from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TodoCardProps = PropsWithChildren<{
  title: string;
}>;

function TodoCard({title}: TodoCardProps): JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    margin: 17,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default TodoCard;
