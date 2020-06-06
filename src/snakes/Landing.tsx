import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationParams} from 'react-navigation';
import {UserContext} from '../App';
import Leaderboard from '../components/Leaderboard';
import Snakes from '../components/Snakes';

interface Props {
  navigation: NavigationParams;
}

function Landing() {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Leaderboard />
      {/* <Snakes /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#15212b',
    color: '#fff',
  },
});

export default Landing;
