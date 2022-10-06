import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';

import HomePage from './Stacks/HomePage';
import FreeShoot from './Stacks/FreeShoot';
import Shootout from './Stacks/Shootout';
import Timed from './Stacks/Timed';

const Stack = createStackNavigator();

export default HomeScreen = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={(headerShown = 'false')}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="FreeShoot" component={FreeShoot} />
      <Stack.Screen name="Shootout" component={Shootout} />
      <Stack.Screen name="Timed" component={Timed} />
    </Stack.Navigator>
  );
};
