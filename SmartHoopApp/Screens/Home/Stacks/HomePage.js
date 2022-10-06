import React from 'react';
import {Button, Card, Surface, Text, Title} from 'react-native-paper';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export default HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card elevation={2} mode="elevated" style={styles.connectionCard}>
        <Card.Content style={styles.contentBox}>
          <Title style={styles.connectTitle}>Backboard not connected</Title>
          <Card.Actions>
            <Button color="#d1341f" mode="contained">
              Connect
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
      <Text style={styles.gameTitle}>Game Modes</Text>
      <Card mode="elevated" elevation={2} style={styles.gameCard}>
        <Card.Content style={styles.modeContent}>
          <Title>FreeShoot</Title>
          <Card.Actions>
            <Button
              color="#d1341f"
              mode="contained"
              onPress={() => navigation.push('FreeShoot')}>
              Start
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
      <Card mode="elevated" elevation={2} style={styles.gameCard}>
        <Card.Content style={styles.modeContent}>
          <Title>Shootout</Title>
          <Card.Actions>
            <Button
              color="#d1341f"
              mode="contained"
              onPress={() => navigation.push('Shootout')}>
              Start
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
      <Card mode="elevated" elevation={2} style={styles.gameCard}>
        <Card.Content style={styles.modeContent}>
          <Title>Timed</Title>
          <Card.Actions>
            <Button
              color="#d1341f"
              mode="contained"
              onPress={() => navigation.push('Timed')}>
              Start
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#242020',
  },
  connectionCard: {
    backgroundColor: '#d17164',
    height: 100,
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d1341f',
  },
  connectTitle: {
    fontSize: 20,
  },
  contentBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    backgroundColor: '#d17164',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    maxHeight: 100,
  },
  modeContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
});
