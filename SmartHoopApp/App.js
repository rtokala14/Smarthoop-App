import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Screens/HomeScreen';
import Statistics from './Screens/Statistics';
import Account from './Screens/Account';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
