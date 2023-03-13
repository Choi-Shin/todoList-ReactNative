import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import Today from './components/Today';
import deviceInfoModule from 'react-native-device-info';
import axios from 'axios';

const App = () => {
  // todos: {id: Number, textValue: string, checked: boolean}
  const [todos, setTodos] = useState([]);
  const uuid = deviceInfoModule.getUniqueId();
  useEffect(() => {
    getTodos();
  }, []);

  const baseUrl = 'http://172.20.10.8:8888/todo';

  async function getTodos() {
    await axios
      .get(baseUrl + '/' + uuid)
      .then(response => {
        setTodos(response.data);
        if (!todos) return;
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  const addTodo = text => {
    if (!text) {
      return null;
    }
    const todo = {title: text, uuid: uuid};
    async function insertTodo() {
      await axios
        .post(baseUrl, todo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    if (!todos) {
      setTodos({uuid: uuid, no: 1, title: text, state: false});
    } else {
      setTodos([
        ...todos,
        {uuid: uuid, no: todos.length + 1, title: text, state: false},
      ]);
    }
    insertTodo();
  };

  const onRemove = no => e => {
    const todo = '/' + uuid + '/' + no;
    async function deleteTodo() {
      await axios
        .delete(baseUrl + todo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    deleteTodo();
    setTodos(todos.filter(todo => todo.no !== no));
  };

  const onToggle = no => e => {
    const todo = '/' + uuid + '/' + no;
    async function completeTodo() {
      await axios
        .put(baseUrl + todo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    completeTodo();
    if (!todos) {
      return null;
    }
    setTodos(
      todos.map(todo =>
        todo.no === no ? {...todo, state: !todo.state} : todo,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Today />
      <Text style={styles.appTitle}>오늘의 목표</Text>
      <View style={styles.card}>
        <TodoInsert onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          uuid={uuid}
          baseUrl={baseUrl}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3143e8',
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 36,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#3143e8',
  },
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});

export default App;
