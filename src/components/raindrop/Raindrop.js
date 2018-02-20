import React from 'react';
import { View, ImagePickerIOS } from 'react-native';
import { connect } from 'react-redux';
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
    const disabled = (this.props.sendRaindropStatus === 'sending');

    return (
      <View style={{ flex: 1 }}>
        <Button onPress={this.handleButtonPress} disabled={disabled}>
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

const mapStateToProps = ({ raindrop }) => {
  const { sendRaindropStatus } = raindrop;
  return { sendRaindropStatus };
};

export default connect(mapStateToProps)(Raindrop);
