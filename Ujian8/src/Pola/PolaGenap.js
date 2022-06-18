import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class PolaGenap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: GambarYes,
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default PolaGenap;
