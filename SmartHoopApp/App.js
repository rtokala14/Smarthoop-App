import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {LogBox, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Screens/Home/HomeScreen';
import Statistics from './Screens/Statistics';
import Account from './Screens/Account';
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const Tab = createMaterialBottomTabNavigator();
const MyTheme = {
  dark: true,
  colors: {
    primary: '#d1341f',
    background: '#242020',
    card: '#FFBB33',
    text: '#d9420f',
    border: '#240a01',
    notification: '#di341f',
  },
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        theme={MyTheme}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Stats') {
              iconName = focused ? 'analytics-outline' : 'analytics-sharp';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={25} color={color} />;
          },
        })}
        labeled="false"
        shifting={true}
        activeColor="#d1341f"
        inactiveColor="#d1341f"
        barStyle={{
          backgroundColor: '#241d1c',
          height: 70,
          justifyContent: 'center',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={Statistics} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
