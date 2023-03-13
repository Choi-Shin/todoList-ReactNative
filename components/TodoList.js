// components/TodoList.js
import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import TodoListItem from './TodoListItem';

const TodoList = ({todos, onRemove, onToggle, uuid, baseUrl}) => {
  if (!todos || todos === undefined) {
    console.log(todos);
    return null;
  }
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {todos || todos !== undefined
        ? todos.map(todo => (
            <TodoListItem
              key={todo.no}
              {...todo}
              onRemove={onRemove}
              onToggle={onToggle}
              uuid={uuid}
              baseUrl={baseUrl}
            />
          ))
        : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default TodoList;
