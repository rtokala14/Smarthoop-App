import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

export default Account = ({
  navigation,
  LoggedIn,
  AccountName,
  setLoggedIn,
  setAccountName,
}) => {
  function createAccount() {
    setAccountName('Rohit');
    setLoggedIn(true);
  }

  function logIn() {
    setAccountName('Rohit');
    setLoggedIn(true);
  }

  function logOut() {
    setAccountName('');
    setLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      {LoggedIn ? (
        <View style={styles.LoggedIn}>
          <Text style={styles.name}>Hi {AccountName}</Text>
          <View style={styles.logOutCont}>
            <Button
              color="#000000"
              style={styles.button}
              onPress={() => {
                logOut();
              }}>
              Log Out
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.notLogged}>
          <Text style={styles.name}>Hi Guest</Text>
          <View style={styles.logInCont}>
            <Button
              color="#000000"
              style={styles.button}
              onPress={() => {
                logIn();
              }}>
              Log In
            </Button>
            <Button
              color="#000000"
              style={styles.button}
              onPress={() => {
                createAccount();
              }}>
              Create Account
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#242020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  test: {
    color: '#000000',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d1341f',
  },
  button: {
    borderRadius: 10,
    padding: 3,
    backgroundColor: '#d1341f',
    marginTop: 10,
    marginBottom: 20,
  },
  logOutCont: {
    paddingTop: 30,
  },
});
