import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';

import HomePage from './Stacks/HomePage';
import FreeShoot from './Stacks/FreeShoot';
import Shootout from './Stacks/Shootout';
import Timed from './Stacks/Timed';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
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
          open: config,
          close: config,
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
