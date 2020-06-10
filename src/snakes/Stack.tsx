import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Colors, IconButton, Theme, withTheme} from 'react-native-paper';
import Landing from './Landing';
import List from './List';
import Snake from './Snake';

interface Props {
  theme: Theme;
}

const Stack = createStackNavigator();

function SnakeStack({theme}: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.accent,
          headerRight: () => (
            <IconButton
              icon="person"
              color={Colors.white}
              size={20}
              onPress={() => console.log('Pressed')}
            />
          ),
        }}>
        <Stack.Screen name="SnakePit" component={Landing} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Snake" component={Snake} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(SnakeStack);
