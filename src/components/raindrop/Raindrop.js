import React from 'react';
import { View, ImagePickerIOS } from 'react-native';
import { Button } from '../common';
import RaindropImageAndSearch from './RaindropImageAndSearch';


class Raindrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUri: null };
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress() {
    ImagePickerIOS.openSelectDialog({}, (imageUri) => {
      this.setState({ imageUri });
    }, error => console.log(error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this.handleButtonPress}>
          Pick Photo
        </Button>

        {this.state.imageUri ?
          <RaindropImageAndSearch
            imageUri={this.state.imageUri}
          /> :
          null
        }
      </View>
    );
  }
}

export default Raindrop;
