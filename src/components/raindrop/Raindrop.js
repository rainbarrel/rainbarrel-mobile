import React from 'react';
import { View, FlatList, Image, CameraRoll } from 'react-native';
import { Button } from '../common';


class Raindrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  handleButtonPress() {
    CameraRoll.getPhotos({
      first: 3
    })
      .then((response) => {
        this.setState({ photos: response.edges });
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  keyExtractor = item => item.node.timestamp;

  renderItem = ({ item }) => (
    <Image
      style={{
        width: 300,
        height: 100
      }}
      source={{ uri: item.node.image.uri }}
    />
  )

  render() {
    return (
      <View>
        <Button onPress={this.handleButtonPress}>
          Load Images
        </Button>

        <FlatList
          data={this.state.photos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default Raindrop;
