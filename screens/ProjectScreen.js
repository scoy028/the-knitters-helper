import React from 'react';
import { ScrollView, StyleSheet, Button, Image, View, Text } from 'react-native';

export default class ProjectScreen extends React.Component {
  state = {
    image: null,
  }

  static navigationOptions = {
    title: 'Project',
  };

  render() {
    const { navigation } = this.props
    // const photo = navigation.getParam('photo', '')
    const photos = navigation.getParam('photos', ['N/A'])
    const name = navigation.getParam('name', 'N/A')
    const pattern = navigation.getParam('pattern', 'N/A')
    const craft = navigation.getParam('craft', 'N/A')
    const madeFor = navigation.getParam('madeFor', 'N/A')
    const tags = navigation.getParam('tags', ['N/A'])
    const yarn = navigation.getParam('yarn', 'N/A')
    const colorway = navigation.getParam('colorway', 'N/A')
    const colorFamily = navigation.getParam('colorFamily', 'N/A')
    const notes = navigation.getParam('notes', 'N/A')
    const imageFromCamera = navigation.getParam('imageFromCamera')

    console.log(this.props)
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.item}>Photos</Text>
        {/* <Image source={{ uri: imageFromCamera }} style={{ width: 200, height: 200 }} /> */}
        <Text>{photos}</Text>
        <Button onPress={() => {navigation.navigate('Camera')}} title="Add a picture"/>
        <Text style={styles.item}>Project Info</Text>
        <Text>Name: {name}</Text>
        <Text>Pattern: {pattern}</Text>
        <Text>Craft: {craft}</Text>
        <Text>Made For: {madeFor}</Text>
        <Text>Tags: {tags}</Text>
        <Text style={styles.item}>Needles and Yarn</Text>
        <Text>Yarn: {yarn}</Text>
        <Text>Colorway: {colorway}</Text>
        <Text>Color Family: {colorFamily}</Text>
        <Text style={styles.item}>Notes</Text>
        <Text>{notes}</Text>
        <Button
            title="Go back"
            onPress={() => navigation.navigate('Projects')}
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
