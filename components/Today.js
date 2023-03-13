import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Today = () => {
  let now = new Date();
  let year = now.getFullYear();
  let mth = now.getMonth() + 1;
  let month = mth > 9 ? mth : '0' + mth;
  let d = now.getDate();
  let date = d > 9 ? d : '0' + d;
  return (
    <Text style={styles.dateStyle}>
      {year}-{month}-{date}
    </Text>
  );
};

const styles = StyleSheet.create({
  dateStyle: {
    color: '#bbb',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});

export default Today;
