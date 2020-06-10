import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, List} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

function PlayerCard({user, picks}) {
  return (
    <Card style={styles.card}>
      <Card.Title titleStyle={styles.title} title={user.displayName} />
      <Card.Content>
        <List.Section>
          {picks.map((pick, index) => (
            <List.Item
              key={index}
              title={pick.firstName + ' ' + pick.lastName}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#253849',
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
  },
  card: {
    backgroundColor: '#253849',
    color: 'white',
    margin: 16,
    borderRadius: 10,
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

export default PlayerCard;
