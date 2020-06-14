import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, List} from 'react-native-paper';

function TeamCard({user, picks}) {
  return (
    <Card style={styles.card}>
      <Card.Title titleStyle={styles.title} title={user.displayName} />
      <Card.Content>
        <List.Section>
          {picks.map((pick, index) => (
            <List.Item
              key={index}
              title={pick.city ? pick.city + ' ' + pick.name : pick.name}
              titleStyle={styles.listText}
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
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  listText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TeamCard;
