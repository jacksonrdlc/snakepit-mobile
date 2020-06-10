import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import {Headline} from 'react-native-paper';
import TeamCard from '../components/TeamCard';
import firestore from '@react-native-firebase/firestore';

function Snakes() {
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

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Headline style={styles.headline}>{snake.name}</Headline>
      {users.map((user, index) => {
        const userPicks = snake.selections.filter(
          pick => pick.owner === user.id,
        );
        return <TeamCard user={user} picks={userPicks} key={index} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#15212b',
    color: '#fff',
    paddingTop: 20,
  },
  headline: {
    color: 'white',
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: '#253849',
    color: 'white',
    margin: 6,
    borderRadius: 50,
    fontWeight: 'bold',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    padding: 0,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'white',
  },
  winTotal: {
    color: 'white',
    fontSize: 20,
    marginRight: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Snakes;
