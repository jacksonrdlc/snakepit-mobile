import React, {useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {SnakeContext} from './Snake';
import {Headline, List, Text} from 'react-native-paper';

function PlayerSelections() {
  const snakeData = useContext(SnakeContext);

  if (!snakeData) {
    return null;
  }

  function userName(id) {
    const u = snakeData.users.find(user => user.id === id);
    return u.displayName;
  }

  return (
    <ScrollView style={styles.container}>
      <Headline style={styles.headline}>{snakeData.snake.name}</Headline>
      <List.Section>
        {snakeData.snake.selections.map((pick, index) => (
          <List.Item
            key={index}
            title={pick.city + ' ' + pick.name}
            titleStyle={styles.titleText}
            description={userName(pick.owner)}
            descriptionStyle={styles.titleText}
            style={styles.listItem}
            right={() => <Text style={styles.winTotal}>{pick.category}</Text>}
          />
        ))}
      </List.Section>
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
