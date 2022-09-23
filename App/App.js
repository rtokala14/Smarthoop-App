// import {
//   Button,
//   NativeEventEmitter,
//   NativeModules,
//   PermissionsAndroid,
//   StyleSheet,
//   Text,
//   View,
//   ViewComponent,
// } from "react-native";

// // import BleManager from 'react-native-ble-manager'
// // const BleManagerModule = NativeModules.BleManager;
// // const bleEmitter = new NativeEventEmitter(BleManagerModule)

// import { stringToBytes } from "convert-string";
// import { useState } from "react";

// const Buffer = require("buffer/").Buffer;

// import { BleManager, Device } from "react-native-ble-plx";

// const BLTManager = new BleManager();

// const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

// const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
// const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

// export default function App() {
//   // const [isScanning, setIsScanning] = useState(false);
//   // const [list, setList] = useState([])
//   // const peripherals = new Map()
//   // const [testMode, setTestMode] = useState('read')

//   // const startScan = () => {
//   //   if (isScanning) {
//   //     return;
//   //   }

//   //   peripherals.clear();
//   //   setList(Array.from(peripherals.values()))

//   //   const durationInSeconds = 3
//   //   BleManager.scan([], durationInSeconds, true)
//   //     .then(() => {
//   //       console.log('Scanning...')
//   //       setIsScanning(true)
//   //     })
//   //     .catch((err) => {
//   //       console.log(err)
//   //     })
//   // }
//   //Is a device connected?
//   const [isConnected, setIsConnected] = useState(false);

//   const [connectedDevice, setConnectedDevice] = useState();

//   const [message, setMessage] = useState("Nothing Yet");
//   const [boxvalue, setBoxValue] = useState(false);

//   async function scanDevices() {
//     PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Permission Localisation Bluetooth",
//         message: "Requirement for Blutooth",
//         buttonNeutral: "Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK",
//       }
//     ).then((answer) => {
//       console.log("scanning");

//       BLTManager.startDevicedScan(null, null, (error, scannedDevice) => {
//         if (error) {
//           console.warn(error);
//         }

//         if (scannedDevice && scannedDevice.name == "Backboard-1") {
//           console.log("Connecting");
//           BLTManager.stopDeviceScan();
//           connectDevice(scannedDevice);
//         }
//       });

//       // stop scanning devices after 5 seconds
//       setTimeout(() => {
//         BLTManager.stopDeviceScan();
//       }, 5000);
//     });
//   }

//   async function connectDevice(device) {
//     console.log("connecting to Device:", device.name);

//     device
//       .connect()
//       .then((device) => {
//         setConnectedDevice(device);
//         setIsConnected(true);
//         return device.discoverAllServicesAndCharacteristics();
//       })
//       .then((device) => {
//         //  Set what to do when DC is detected
//         BLTManager.onDeviceDisconnected(device.id, (error, device) => {
//           console.log("Device DC");
//           setIsConnected(false);
//         });

//         //Read inital values

//         //Message
//         device
//           .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
//           .then((valenc) => {
//             setMessage(base64.decode(valenc?.value));
//           });

//         //BoxValue
//         device
//           .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
//           .then((valenc) => {
//             setBoxValue(StringToBool(base64.decode(valenc?.value)));
//           });

//         //monitor values and tell what to do when receiving an update

//         //Message
//         device.monitorCharacteristicForService(
//           SERVICE_UUID,
//           MESSAGE_UUID,
//           (error, characteristic) => {
//             if (characteristic?.value != null) {
//               setMessage(base64.decode(characteristic?.value));
//               console.log(
//                 "Message update received: ",
//                 base64.decode(characteristic?.value)
//               );
//             }
//           },
//           "messagetransaction"
//         );

//         //BoxValue
//         device.monitorCharacteristicForService(
//           SERVICE_UUID,
//           BOX_UUID,
//           (error, characteristic) => {
//             if (characteristic?.value != null) {
//               setBoxValue(StringToBool(base64.decode(characteristic?.value)));
//               console.log(
//                 "Box Value update received: ",
//                 base64.decode(characteristic?.value)
//               );
//             }
//           },
//           "boxtransaction"
//         );

//         console.log("Connection established");
//       });
//   }

//   async function disconnectDevice() {
//     console.log("Disconnecting start");

//     if (connectedDevice != null) {
//       const isDeviceConnected = await connectedDevice.isConnected();
//       if (isDeviceConnected) {
//         BLTManager.cancelTransaction("messagetransaction");
//         BLTManager.cancelTransaction("nightmodetransaction");

//         BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
//           console.log("Disconnect completed")
//         );
//       }
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.upper}>
//         <View style={styles.logo}>{/* <Text>Insert logo here</Text> */}</View>
//         <Text style={styles.AppTitle}>SmartHoop</Text>
//         <Text style={styles.AppSubTitle}>Your basketball companion</Text>
//       </View>
//       <View style={styles.lower}>
//         <Button
//           title="Connect"
//           onPress={() => scanDevices()}
//           style={styles.ConnectButton}
//         >
//           {/* <Text style={styles.buttonText}>Connect to your SmartHoop</Text> */}
//         </Button>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "#F5A300",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   upper: {
//     flex: 1,
//     flexDirection: "column",
//     padding: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     backgroundColor: "#FFBB33",
//     borderRadius: 100000,
//     height: 150,
//     width: 150,
//     marginBottom: 10,
//   },
//   AppTitle: {
//     // fontFamily: ,
//     fontSize: 35,
//     marginBottom: 5,
//   },
//   AppSubTitle: {
//     fontSize: 15,
//   },
//   lower: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignContent: "center",
//   },
//   ConnectButton: {
//     backgroundColor: "#FFBB33",
//     borderRadius: 20,
//     padding: 25,
//   },
//   buttonText: {
//     fontSize: 20,
//   },
// });

import React, { useState } from "react";
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
} from "react-native";

import base64 from "react-native-base64";

import CheckBox from "@react-native-community/checkbox";

import { BleManager, Device } from "react-native-ble-plx";
import { styles } from "./Styles/styles";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from "react-native-permissions";

const BLTManager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const MESSAGE_UUID = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const BOX_UUID = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

function StringToBool(input) {
  if (input == "1") {
    return true;
  } else {
    return false;
  }
}

function BoolToString(input) {
  if (input == true) {
    return "1";
  } else {
    return "0";
  }
}

export default function App() {
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState();

  const [message, setMessage] = useState("Nothing Yet");
  const [boxvalue, setBoxValue] = useState(false);

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    // PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: "Permission Localisation Bluetooth",
    //     message: "Requirement for Bluetooth",
    //     buttonNeutral: "Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   },
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    //   {
    //     title: "Permission for scanning BLE",
    //     message: "Rquirement for app",
    //     buttonNegative: "Don't allow",
    //     buttonPositive: "Allow",
    //   }
    // ).then((answer) => {
    //   console.log("scanning");
    //   // display the Activityindicator

    //   BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
    //     if (error) {
    //       console.warn(error);
    //     }

    //     if (scannedDevice && scannedDevice.name == "Backboard-1") {
    //       BLTManager.stopDeviceScan();
    //       connectDevice(scannedDevice);
    //     }
    //   });

    //   // stop scanning devices after 5 seconds
    //   setTimeout(() => {
    //     BLTManager.stopDeviceScan();
    //   }, 10000);
    // });
    requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ]).then((statuses) => {
      console.log("Scan", statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]);
      console.log("Connect", statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]);
    });
    BLTManager.startDeviceScan(
      null,
      {
        allowDuplicates: false,
      },
      async (error, device) => {
        // setDisplaText("Scanning...");
        console.log("scanning");
        if (error) {
          console.log(error);
          BLTManager.stopDeviceScan();
        }
        console.log(device);
        if (device) {
          if (
            device.localName == "Backboard-1" ||
            device.name == "Backboard-1"
          ) {
            connectDevice(device);
            BLTManager.stopDeviceScan();
          }
        }
        setTimeout(() => {
          BLTManager.stopDeviceScan();
        }, 10000);
      }
    );
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log("Disconnecting start");

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction("messagetransaction");
        BLTManager.cancelTransaction("nightmodetransaction");

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log("DC completed")
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  //Function to send data to ESP32
  async function sendBoxValue(value) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      BOX_UUID,
      base64.encode(value.toString())
    ).then((characteristic) => {
      console.log("Boxvalue changed to :", base64.decode(characteristic.value));
    });
  }
  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log("connecting to Device:", device.name);

    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });

        //Read inital values

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setMessage(base64.decode(valenc?.value));
          });

        //BoxValue
        device
          .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
          .then((valenc) => {
            setBoxValue(StringToBool(base64.decode(valenc?.value)));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic?.value)
              );
            }
          },
          "messagetransaction"
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          BOX_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setBoxValue(StringToBool(base64.decode(characteristic?.value)));
              console.log(
                "Box Value update received: ",
                base64.decode(characteristic?.value)
              );
            }
          },
          "boxtransaction"
        );

        console.log("Connection established");
      });
  }

  return (
    <View>
      <View style={{ paddingBottom: 200 }}></View>

      {/* Title */}
      <View style={styles.rowView}>
        <Text style={styles.titleText}>BLE Example</Text>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Connect Button */}
      <View style={styles.rowView}>
        <TouchableOpacity style={{ width: 120 }}>
          {!isConnected ? (
            <Button
              title="Connect"
              onPress={() => {
                scanDevices();
              }}
              disabled={false}
            />
          ) : (
            <Button
              title="Disonnect"
              onPress={() => {
                disconnectDevice();
              }}
              disabled={false}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Monitored Value */}

      <View style={styles.rowView}>
        <Text style={styles.baseText}>{message}</Text>
      </View>

      <View style={{ paddingBottom: 20 }}></View>

      {/* Checkbox */}
      <View style={styles.rowView}>
        <CheckBox
          disabled={false}
          value={boxvalue}
          onValueChange={(newValue) => {
            // setBoxValue(newValue);
            sendBoxValue(BoolToString(newValue));
          }}
        />
      </View>
    </View>
  );
}
