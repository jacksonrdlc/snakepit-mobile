import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Avatar, Headline, List, Text} from 'react-native-paper';
// import {NavigationParams} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';

function Snakes() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          users.sort((a, b) => {
            return b.wins.length - a.wins.length;
          });
          setUsers(users);
          setLoading(false);
        });
    };
    getUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Headline style={styles.headline}>Leaderboard</Headline>
      <List.Section>
        {users.map((user, index) => (
          <List.Item
            key={index}
            title={user.displayName}
            titleStyle={styles.listText}
            style={styles.listItem}
            right={() => (
              <Text style={styles.winTotal}>{user.wins.length} wins</Text>
            )}
            left={() => (
              <Avatar.Text style={styles.avatar} size={40} label={user.place} />
            )}
          />
        ))}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#253849',
    fontWeight: 'bold',
  },
  headline: {
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 36,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: '#253849',
    color: 'white',
    margin: 6,
    borderRadius: 50,
    fontWeight: 'bold',
  },
  listText: {
    color: 'white',
    fontSize: 20,
    padding: 0,
    fontWeight: 'bold',
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
