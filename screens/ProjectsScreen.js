import React from 'react';
import { ScrollView, StyleSheet, Button, Text, FlatList, View } from 'react-native';

export default class ProjectsScreen extends React.Component {
  static navigationOptions = {
    title: 'Projects',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>My Projects:</Text>
        <FlatList
          data={[
            {key: 'Hat'},
            {key: 'Mittens'},
            {key: 'Onesie'},
            {key: 'Scarf'},
          ]}
          renderItem={({item}) =>
            <View>
              <Text style={styles.item}>{item.key}</Text>
              <Button title="Go to Project" onPress={() => {
                this.props.navigation.navigate('Project', {
                // photo: '',
                photos: [],
                name: item.key,
                pattern: 'Pattern One',
                craft: 'Knitting',
                madeFor: 'Mom',
                tags: [],
                yarn: 'Quince & Co.',
                colorway: 'Birch',
                colorFamily: 'Gray',
                notes: 'Soft and luxurious!',
              })}}/>
            </View>}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
