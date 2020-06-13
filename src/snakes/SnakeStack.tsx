import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Colors, IconButton, withTheme} from 'react-native-paper';
import Landing from './Landing';
import Snake from './Snake';

const Stack = createStackNavigator();

function SnakeStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <IconButton
            icon="chevron-left"
            color={Colors.white}
            size={20}
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      <Stack.Screen name="SnakePit" component={Landing} />
      <Stack.Screen name="Snake" component={Snake} />
    </Stack.Navigator>
  );
}

export default withTheme(SnakeStack);
