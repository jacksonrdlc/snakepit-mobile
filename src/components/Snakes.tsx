import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Headline, List, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Snakes() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [snakes, setSnakes] = useState([]);

  useEffect(() => {
    const getSnakes = async () => {
      await firestore()
        .collection('snakes')
        .onSnapshot(querySnapshot => {
          const snakes = [];

          querySnapshot.forEach(documentSnapshot => {
            snakes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setSnakes(snakes);
          setLoading(false);
        });
    };
    getSnakes();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Headline style={styles.headline}>Snakes</Headline>
      <List.Section>
        {snakes.map((snake, index) => (
          <List.Item
            key={index}
            title={snake.name}
            titleStyle={styles.listText}
            style={styles.listItem}
            right={() => <Text style={styles.winTotal}>{snake.category}</Text>}
            onPress={() => navigation.navigate('Snake', {snake})}
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
