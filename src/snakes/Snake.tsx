import React, {createContext, useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayerSelections from './PlayerSelections';
import Leaderboard from './Leaderboard';
import firestore from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

export const SnakeContext = createContext(null);

function Snake() {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [snake, setSnake] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(users);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const getSnakeDoc = async () => {
      const snakeDoc = await firestore()
        .collection('snakes')
        .doc(route.params.snake.key)
        .get();
      setSnake(snakeDoc.data());
      setLoading(false);
    };
    getSnakeDoc();
  }, [route.params.snake.key]);

  const snakeData = {snake, users};

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SnakeContext.Provider value={snakeData}>
      <Tab.Navigator>
        <Tab.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{
            tabBarLabel: 'Leaderboard',
            tabBarIcon: () => <Icon name="trophy-outline" size={26} />,
          }}
        />
        <Tab.Screen
          name="Pick List"
          component={PlayerSelections}
          options={{
            tabBarLabel: 'Player Picks',
            tabBarIcon: ({color}) => (
              <Icon name="format-list-bulleted" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SnakeContext.Provider>
  );
}

export default Snake;
