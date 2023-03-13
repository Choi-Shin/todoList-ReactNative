import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const TodoListItem = ({
  title,
  no,
  state,
  onRemove,
  onToggle,
  uuid,
  baseUrl,
}) => {
  const [edited, setEdited] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [modified, setModified] = useState(title);
  const [t, setT] = useState(title);
  const url = baseUrl + '/' + uuid + '/' + no;
  const todo = {uuid: uuid, no: no, title: modified};
  const edit = () => {
    setEdited(!edited);
  };

  const onChange = newOne => {
    setModified(newOne);
  };

  const onSubmit = () => {
    setCompleted(!completed);
    setEdited(!edited);
    modify();
  };
  const modify = () => {
    if (JSON.stringify(t) === JSON.stringify(modified)) {
      console.log('변화한 값이 없습니다.');
      return null;
    }
    if (!edited) {
      return null;
    }

    async function insertTodo() {
      console.log(todo);
      await axios
        .post(url, todo)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    insertTodo();
    setT(modified);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={onToggle(no)}>
        {!edited ? (
          state ? (
            <View style={styles.completeCircle}>
              <Icon name="circledowno" size={30} color="#3143e8" />
            </View>
          ) : (
            <View style={styles.circle} />
          )
        ) : (
          <View style={styles.completeCircle}>
            <Icon name="form" size={30} color="#3143e8" />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer}>
        {edited ? (
          <>
            <TextInput
              style={styles.text}
              value={modified}
              onChangeText={onChange}
              autoCorrect={false}></TextInput>
          </>
        ) : (
          <Text
            style={[
              styles.text,
              state ? styles.strikeText : styles.unstrikeText,
            ]}
            onPress={edit}>
            {modified}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        {!edited ? (
          <Text style={styles.buttonText} onPress={onRemove(no)}>
            <Icon name="delete" size={30} color="#e33057" />
          </Text>
        ) : (
          <Text style={styles.buttonText} onPress={onSubmit}>
            <Icon name="check" size={30} color="#808080" />
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
  completeCircle: {
    marginRight: 20,
    marginLeft: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
});

export default TodoListItem;
