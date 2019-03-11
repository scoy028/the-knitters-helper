import React from 'react';
import { ScrollView, StyleSheet, Button, Image, View, TouchableOpacity, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';

export default class ProjectScreen extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    hasCameraRollPermission: null,
  }

  static navigationOptions = {
    title: 'Project',
  };

  render() {
    const { navigation } = this.props
    const { image } = this.state;
    const { hasCameraPermission } = this.state;

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

    // if (hasCameraPermission === null) {
    //   return <View />;
    // } else if (hasCameraPermission === false) {
    //   return <Text>No access to camera</Text>;
    // } else {
      return (
        <ScrollView style={styles.container}>
          <MonoText style={styles.item}>Photos</MonoText>
          {/* image && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} /> */}
          <MonoText>{photos}</MonoText>
          <Button onPress={() => {navigation.navigate('Camera')}} title="Add a picture"/>
          <MonoText style={styles.item}>Project Info</MonoText>
          <MonoText>Name: {name}</MonoText>
          <MonoText>Pattern: {pattern}</MonoText>
          <MonoText>Craft: {craft}</MonoText>
          <MonoText>Made For: {madeFor}</MonoText>
          <MonoText>Tags: {tags}</MonoText>
          <MonoText style={styles.item}>Needles and Yarn</MonoText>
          <MonoText>Yarn: {yarn}</MonoText>
          <MonoText>Colorway: {colorway}</MonoText>
          <MonoText>Color Family: {colorFamily}</MonoText>
          <MonoText style={styles.item}>Notes</MonoText>
          <MonoText>{notes}</MonoText>
          <Button
              title="Go back"
              onPress={() => navigation.navigate('Projects')}
          />
        </ScrollView>
      );
    }
  // }
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
