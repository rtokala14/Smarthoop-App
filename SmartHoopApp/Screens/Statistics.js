import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default Statistics = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.board}>
        <View style={styles.listing}>
          <Text style={styles.listItem}>1.</Text>
          <Text style={styles.listItem}>Guest</Text>
          <Text style={styles.listItem}>15</Text>
        </View>
        <View style={styles.listing}>
          <Text style={styles.listItem}>2.</Text>
          <Text style={styles.listItem}>Rohit</Text>
          <Text style={styles.listItem}>13</Text>
        </View>
        <View style={styles.listing}>
          <Text style={styles.listItem}>3.</Text>
          <Text style={styles.listItem}>Guest</Text>
          <Text style={styles.listItem}>11</Text>
        </View>
        <View style={styles.listing}>
          <Text style={styles.listItem}>4.</Text>
          <Text style={styles.listItem}>Guest</Text>
          <Text style={styles.listItem}>7</Text>
        </View>
        <View style={styles.listing}>
          <Text style={styles.listItem}>5.</Text>
          <Text style={styles.listItem}>Guest</Text>
          <Text style={styles.listItem}>5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#242020',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d1341f',
    marginBottom: 30,
  },
  board: {
    borderColor: '#d1341f',
    borderWidth: 1,
    height: '60%',
    width: '90%',
    borderRadius: 20,
    justifyContent: 'space-evenly',
  },
  listing: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  listItem: {
    color: '#d1341f',
    fontSize: 20,
  },
});
