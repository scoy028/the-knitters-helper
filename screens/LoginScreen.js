import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
  password: ''};
  }

  static navigationOptions = {
    title: 'Log In',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => this.setState({username: text})} />
        <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => this.setState({password: text})} />
        <Button
            title="Login"
            onPress={async() => {
              await AsyncStorage.setItem('userToken', 'abc')
              this.props.navigation.navigate('Home')
            }}
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
  input: {
    textAlign: 'center'
  }
});
