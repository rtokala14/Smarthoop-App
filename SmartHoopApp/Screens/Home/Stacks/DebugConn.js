import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default DebugConn = ({route, navigation}) => {
  const [shotCount, onChange] = React.useState(route.params.shotCount);

  let value = shotCount;

  React.useEffect(() => {
    value = shotCount;
  }, [navigation, shotCount]);
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#242020',
  },
});
