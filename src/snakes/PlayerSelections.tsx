import React, {useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Headline} from 'react-native-paper';
import TeamCard from '../components/TeamCard';
import {SnakeContext} from './Snake';

function PlayerSelections() {
  const snakeData = useContext(SnakeContext);

  if (!snakeData) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Headline style={styles.headline}>{snakeData.snake.name}</Headline>
      {snakeData.users.map((user, index) => {
        const userPicks = snakeData.snake.selections.filter(
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

export default PlayerSelections;
