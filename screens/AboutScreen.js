import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { WebBrowser } from 'expo';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://www.ravelry.com/'
    );
  };

  render() {
    return (
    <ScrollView>
      <Text>Ravelry is a place for knitters, crocheters, designers, spinners, weavers and dyers to keep track of their yarn, tools, project and pattern information, and look to others for ideas and inspiration. The content here is all user- driven; we as a community make the site what it is. Ravelry is a great place for you to keep notes about your projects, see what other people are making, find the perfect pattern and connect with people who love to play with yarn from all over the world in our forums.</Text>
      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={this.handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText}>Visit Ravelry Online!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
