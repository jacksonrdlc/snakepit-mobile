import React, {useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {UserContext} from '../App';
import Leaderboard from '../components/Leaderboard';
import Snakes from '../components/Snakes';

function Landing() {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Leaderboard />
      <Snakes />
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
});

export default Landing;
