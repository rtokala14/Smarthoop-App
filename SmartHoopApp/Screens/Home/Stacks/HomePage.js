import React, {useState} from 'react';
import {Button, Card, Surface, Text, Title} from 'react-native-paper';
import {PermissionsAndroid, SafeAreaView, StyleSheet, View} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

import base64 from 'react-native-base64';

const BLTManager = new BleManager();

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const SHOT_CHARACTERISTIC_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';

const SEND_UUID = '07c4743f-639c-49ab-9d14-31ca27193ad0';

export default HomePage = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const [shotCounter, setShotCounter] = useState('0');

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

          console.log(scannedDevice.name);

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
      // .then(BLTManager.connectToDevice(device.id))
      .then(device => {
        console.log('connected');
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device Disconnected');
          setIsConnected(false);
        });

        device
          .readCharacteristicForService(SERVICE_UUID, SHOT_CHARACTERISTIC_UUID)
          .then(valenc => {
            setShotCounter(base64.decode(valenc?.value));
          });

        // console.log('read S&C');

        device.monitorCharacteristicForService(
          SERVICE_UUID,
          SHOT_CHARACTERISTIC_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setShotCounter(base64.decode(characteristic?.value));
              console.log(
                'Message received (SHOT MADE): Shot ',
                base64.decode(characteristic?.value),
                // characteristic?.value,
              );
            }
          },
        );
        // console.log('Monitoring');
      });

    // let test = await device.discoverAllServicesAndCharacteristics();
    // console.log(test);
  }

  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelDeviceConnection(connectedDevice.id);
        console.log('Disconnect completed');
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
                labelStyle={styles.buttonText}
                style={styles.button}
                mode="contained">
                Connect
              </Button>
            ) : (
              <>
                <Button
                  onPress={() => {
                    disconnectDevice();
                  }}
                  color="#d1341f"
                  labelStyle={styles.buttonText}
                  style={styles.button}
                  mode="contained">
                  Disconnect
                </Button>
                <Button
                  // onPress={() => {
                  //   navigation.push('DebugConn', {shotCount: shotCounter});
                  // }}
                  color="#d1341f"
                  labelStyle={styles.buttonText}
                  style={styles.debugBtn}
                  mode="contained">
                  {/* Debug - ({shotCounter}) */}
                  {shotCounter}
                </Button>
              </>
            )}
          </Card.Actions>
        </Card.Content>
      </Card>
      <Text style={styles.gameTitle}>Game Modes</Text>
      {isConnected ? (
        <></>
      ) : (
        <Text style={styles.gameWarning}>
          Connect to backboard to enable game modes
        </Text>
      )}
      <Card mode="elevated" elevation={2} style={styles.gameCard}>
        <Card.Content style={styles.modeContent}>
          <Title>FreeShoot</Title>
          <Card.Actions>
            <Button
              color="#d1341f"
              labelStyle={styles.buttonText}
              style={styles.button}
              disabled={isConnected ? false : true}
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
              labelStyle={styles.buttonText}
              style={styles.button}
              disabled={isConnected ? false : true}
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
              labelStyle={styles.buttonText}
              style={styles.button}
              disabled={isConnected ? false : true}
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
    borderRadius: 20,
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
    maxHeight: 90,
    borderRadius: 20,
  },
  modeContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
  buttonText: {
    color: '#000000',
  },
  button: {
    borderRadius: 10,
    padding: 3,
  },
  gameWarning: {
    color: '#d1341f',
    alignSelf: 'center',
    fontSize: 15,
  },
  debugBtn: {
    borderRadius: 10,
    padding: 3,
    marginLeft: 10,
  },
});
