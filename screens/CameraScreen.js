import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, MediaLibrary, Permissions } from 'expo';
const SERVER_URL = 'http://localhost:8080/'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
  };

  async componentDidMount() {
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraStatus = cameraPerm.status
    const rollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const rollStatus = rollPerm.status
    this.setState({ hasCameraPermission: cameraStatus === 'granted', hasCameraRollPermission: rollStatus === 'granted' });
  }

  uploadPicture = () => {
    return fetch(SERVER_URL, {
      body: JSON.stringify({
        image: this.state.photo.base64
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
  }

  takePicture = () => {
    this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: true
    }).then(photo => {
      const photoUri = photo.uri
      this.setState({ photo }, () => {
        this.uploadPicture()
      });
    });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={cam => this.camera = cam}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <Button
            title="Take Picture"
            onPress={() => this.takePicture.bind(this)}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Projects')}
          />
        </View>
      );
    }
  }
}
