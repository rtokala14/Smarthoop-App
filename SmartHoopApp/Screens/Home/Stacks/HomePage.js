import React, {useState} from 'react';
import {Button, Card, Surface, Text, Title} from 'react-native-paper';
import {PermissionsAndroid, SafeAreaView, StyleSheet, View} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

const BLTManager = new BleManager();

export default HomePage = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();

  async function scanDevices() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Blutooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
      .then(
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: 'Permission Localisation Bluetooth',
            message: 'Requirement for Blutooth',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ),
      )
      .then(
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission Localisation Bluetooth',
            message: 'Requirement for Blutooth',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ),
      )
      .then(answer => {
        console.log('scanning');

        BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
          if (error) {
            console.warn(error);
          }

          if (scannedDevice && scannedDevice.name == 'Backboard-1') {
            console.log('Connecting');
            BLTManager.stopDeviceScan();
            connectDevice(scannedDevice);
          }

          setTimeout(() => {
            BLTManager.stopDeviceScan();
          }, 5000);
        });
      });
  }

  async function connectDevice(device) {
    console.log('Connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device Disconnected');
          setIsConnected(false);
        });
      });
  }

  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        (
          await BLTManager.cancelDeviceConnection(connectedDevice.id)
        ).writeCharacteristicWithResponseForService(() =>
          console.log('Disconnect complete'),
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <Card elevation={2} mode="elevated" style={styles.connectionCard}>
        <Card.Content style={styles.contentBox}>
          <Title style={styles.connectTitle}>
            {!isConnected
              ? 'Backboard not connected'
              : 'Connected to Backboard'}
          </Title>
          <Card.Actions>
            {!isConnected ? (
              <Button
                onPress={() => {
                  scanDevices();
                }}
                color="#d1341f"
                mode="contained">
                Connect
              </Button>
            ) : (
              <Button
                onPress={() => {
                  disconnectDevice();
                }}
                color="#d1341f"
                mode="contained">
                Disconnect
              </Button>
            )}
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
