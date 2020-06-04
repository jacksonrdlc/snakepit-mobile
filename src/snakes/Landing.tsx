import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {NavigationParams} from 'react-navigation';
import {UserContext} from '../App';
import Leaderboard from '../components/Leaderboard';

interface Props {
  navigation: NavigationParams;
}

function Landing({navigation}: Props) {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Leaderboard />
      <List.Section>
        <List.Item
          title="First Item"
          description="Item description"
          onPress={() => navigation.navigate('Snake')}
        />
        <List.Item
          title="First Item"
          description="Item description"
          onPress={() => navigation.navigate('Snake')}
        />
        <List.Item
          title="First Item"
          description="Item description"
          onPress={() => navigation.navigate('Snake')}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
  },
  profile: {
    marginTop: -50,
    paddingVertical: 10,
  },
  avatar: {
    borderColor: '#fff',
    borderWidth: 5,
    elevation: 4,
  },
  providers: {
    backgroundColor: '#F6F7F8',
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Landing;
