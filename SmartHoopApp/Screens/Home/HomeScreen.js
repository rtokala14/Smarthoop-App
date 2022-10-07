import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Easing, Text} from 'react-native';

import HomePage from './Stacks/HomePage';
import FreeShoot from './Stacks/FreeShoot';
import Shootout from './Stacks/Shootout';
import Timed from './Stacks/Timed';

const Stack = createStackNavigator();

const configOpen = {
  animation: 'timing',
  config: {
    duration: 2,
    easing: Easing.out(Easing.poly(5)),
  },
};

const configClose = {
  animation: 'timing',
  config: {
    duration: 1,
    easing: Easing.in(Easing.poly(5)),
  },
};

export default HomeScreen = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#242020'},
        headerTitleAlign: 'center',
        headerTintColor: '#d1341f',
        // presentation: 'modal',
        transitionSpec: {
          open: configOpen,
          close: configClose,
        },
      }}>
      <Stack.Screen
        name="HomePage"
        options={{title: 'SmartHoop'}}
        component={HomePage}
      />
      <Stack.Screen
        name="FreeShoot"
        options={{title: 'FreeShoot'}}
        component={FreeShoot}
      />
      <Stack.Screen
        name="Shootout"
        options={{title: 'Shootout'}}
        component={Shootout}
      />
      <Stack.Screen name="Timed" options={{title: 'Timed'}} component={Timed} />
    </Stack.Navigator>
  );
};
