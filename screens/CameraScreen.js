// import React from 'react';
// import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
// import { Camera, ImagePicker, Permissions } from 'expo';
// const SERVER_URL = 'http://localhost:8080/'

// export default class CameraScreen extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       hasCameraPermission: null,
//       hasCameraRollPermission: null,
//       type: Camera.Constants.Type.back,
//       image: null,
//     };
//     // this.takePicture = this.takePicture.bind(this)
//     // this.uploadPicture = this.uploadPicture.bind(this)
//   }

//   async componentDidMount() {
//     const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
//     const cameraStatus = cameraPerm.status
//     const rollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     const rollStatus = rollPerm.status
//     this.setState({ hasCameraPermission: cameraStatus === 'granted', hasCameraRollPermission: rollStatus === 'granted' });
//   }


//   uploadPicture = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };

//   takePicture = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };

//   render() {
//     const { hasCameraPermission } = this.state;
//     let { image } = this.state;

//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type} ref={cam => this.camera = cam}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type: this.state.type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text
//                   style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                   {' '}Flip{' '}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{
//                   flex: 0.8,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.takePicture
//                   this.props.navigation.navigate('Project', {imageFromCamera: this.state.image})
//                   console.log(this.state.image)
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                   {' '}Take Picture{' '}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{
//                   flex: 0.8,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.uploadPicture
//                   this.props.navigation.navigate('Project', {imageFromCamera: this.state.image})
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                   {' '}Upload Picture{' '}</Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//           <Button
//             title="Go back"
//             onPress={() => this.props.navigation.navigate('Projects')}
//           />
//           {/* <Button
//             title="Pick an image from camera roll"
//             onPress={this.uploadPicture}
//           /> */}
//           {image &&
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </View>
//       );
//     }
//   }
// }



import React from 'react';
import { Button, Image, View, TouchableOpacity, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    hasCameraRollPermission: null,
  };

  async componentDidMount() {
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraStatus = cameraPerm.status
    const rollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const rollStatus = rollPerm.status
    this.setState({ hasCameraPermission: cameraStatus === 'granted', hasCameraRollPermission: rollStatus === 'granted' });
  }

  render() {
    const { image } = this.state;
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <TouchableOpacity
            onPress={this._takePicture}
          >
            <Text>Take a Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._uploadPicture}
          >
            <Text>Pick an Image from Camera Roll</Text>
          </TouchableOpacity>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Projects')}
          />
        </View>
      );
    }
  }

  _uploadPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}


