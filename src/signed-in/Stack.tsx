import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Colors, IconButton, Theme, withTheme} from 'react-native-paper';
import Profile from './Profile';
import Settings from './Settings';
import SnakeStack from '../snakes/SnakeStack';

interface Props {
  theme: Theme;
}

const Stack = createStackNavigator();

function SignedInStack({theme}: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.accent,
      }}>
      <Stack.Screen
        name="SnakePit"
        component={SnakeStack}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="account"
              color={Colors.white}
              size={20}
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        })}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default withTheme(SignedInStack);
