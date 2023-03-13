import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const TodoModify = onBlur => {
  const [edited, setEdited] = useState(false);
  const [modified, setModified] = useState(title);

  const onPress = () => {
    setEdited(!edited);
  };
  const onChange = newOne => {
    setModified(newOne);
  };

  const modify = (no, modified) => {
    if (!edited) {
      return null;
    }
    const url = baseUrl;
    const id = uuid;
    const todo = '/' + id + '/' + no + '/' + modified;
    async function insertTodo() {
      await axios
        .put(url + todo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    insertTodo();
  };
  return (
    <TextInput
      style={styles.text}
      value={modified}
      onChangeText={onChange}
      onBlur={modify(no, modified)}
      onPress={onPress}></TextInput>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
});

export default TodoModify;
