import React from 'react';
import { ScrollView, StyleSheet, Button, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { listProjects } from './reducer';

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    title: 'Projects',
  };

  componentDidMount() {
    this.props.listProjects('scoy028');
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        this.props.navigation.navigate('ProjectScreen', { name: item.name })
      }
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>My Projects:</Text>
        <FlatList
          data={projects}
          // renderItem={({item}) =>
          //   <View>
          //     <Text style={styles.item}>{item.key}</Text>
          //     <Button title="Go to Project" onPress={() => {
          //       this.props.navigation.navigate('Project', {
          //       // photo: '',
          //       photos: [],
          //       name: item.key,
          //       pattern: '',
          //       craft: '',
          //       madeFor: '',
          //       tags: [],
          //       yarn: '',
          //       colorway: '',
          //       colorFamily: '',
          //       notes: '',
          //     })}}/>
          //   </View>}
          renderItem={this.renderItem}
        />
        {/* <Button onPress={() => {this.props.navigation.navigate('Camera')}} title="Add a picture"/> */}
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

const mapStateToProps = state => {
  let storedProjects = state.projects.map(project => ({ key: project.id, ...project }));
  return {
    projects: storedProjects
  };
};

const mapDispatchToProps = {
  listProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);
