import React, {useContext, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  View,
} from 'react-native';
import {SnakeContext} from './Snake';
import {Headline, List, Text} from 'react-native-paper';
import useAxios from 'axios-hooks';

function Leaderboard() {
  const snakeData = useContext(SnakeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [{data, loading, error}, refetch] = useAxios(snakeData.snake.dataUrl);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  if (!snakeData || error) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator />
      </View>
    );
  }

  function userName(id) {
    const u = snakeData.users.find(user => user.id === id);
    return u.displayName;
  }

  function userRank(name) {
    const u = data.Players.find(player => player.Name === name);
    if (!u) {
      console.log(name);
      return null;
    }
    return u.Rank;
  }

  function userScore(name) {
    const u = data.Players.find(player => player.Name === name);
    if (!u) {
      console.log(name);
      return null;
    }
    return u.TotalScore;
  }

  function userWins(name) {
    const u = data.find(team => team.Name === name);
    return u.Wins;
  }

  let sortablePicks = [];
  let unsortablePicks = [];

  if (snakeData.snake.category === 'golf') {
    snakeData.snake.selections.forEach(pick => {
      if (userRank(pick.name)) {
        pick.rank = userRank(pick.name);
        pick.score = Math.round(userScore(pick.name));
        sortablePicks.push(pick);
      } else {
        pick.rank = 'unranked';
        unsortablePicks.push(pick);
      }
    });
  } else if (snakeData.snake.category === 'hockey' || 'basketball') {
    snakeData.snake.selections.forEach(pick => {
      pick.rank = userWins(pick.name);
      sortablePicks.push(pick);
    });
  }

  if (snakeData.snake.category === 'golf') {
    sortablePicks.sort((a, b) => {
      return a.rank - b.rank;
    });
  } else if (snakeData.snake.category === 'hockey' || 'basketball') {
    sortablePicks.sort((a, b) => {
      return b.rank - a.rank;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Headline style={styles.headline}>{snakeData.snake.name}</Headline>
        <List.Section>
          {sortablePicks.map((pick, index) => (
            <List.Item
              key={index}
              title={
                pick.city
                  ? pick.city + ' ' + pick.name
                  : pick.name + '  ' + pick.score
              }
              titleStyle={
                pick.rank === 1 ? styles.titleTextFirst : styles.titleText
              }
              description={userName(pick.owner)}
              descriptionStyle={
                pick.rank === 1
                  ? styles.descriptionTextFirst
                  : styles.descriptionText
              }
              style={pick.rank === 1 ? styles.listItemFirst : styles.listItem}
              right={() => (
                <Text
                  style={
                    pick.rank === 1 ? styles.winTotalFirst : styles.winTotal
                  }>
                  {pick.rank ? pick.rank : pick.wins}
                </Text>
              )}
            />
          ))}
          {unsortablePicks.map((pick, index) => (
            <List.Item
              key={index}
              title={pick.city ? pick.city + ' ' + pick.name : pick.name}
              titleStyle={styles.titleText}
              description={userName(pick.owner)}
              descriptionStyle={styles.descriptionText}
              style={styles.listItem}
              right={() => <Text style={styles.winTotal}>{pick.rank}</Text>}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15212b',
  },
  view: {
    flex: 1,
    backgroundColor: '#253849',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listItemFirst: {
    backgroundColor: '#d4af37',
    margin: 6,
    borderRadius: 50,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: '#253849',
    margin: 6,
    borderRadius: 50,
    fontWeight: 'bold',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleTextFirst: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'white',
  },
  descriptionTextFirst: {
    color: 'black',
  },
  winTotal: {
    color: 'white',
    fontSize: 20,
    marginRight: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  winTotalFirst: {
    color: 'black',
    fontSize: 20,
    marginRight: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Leaderboard;
