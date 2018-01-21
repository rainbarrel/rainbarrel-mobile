import React from 'react';
import { View, Image, ImagePickerIOS } from 'react-native';
import { Button } from '../common';


class Raindrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUri: null };
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress() {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({ imageUri });
    }, error => console.error(error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this.handleButtonPress}>
          Pick Photo
        </Button>

        {this.state.imageUri ?
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: this.state.imageUri }}
          /> :
          null
        }
      </View>
    );
  }
}

export default Raindrop;
