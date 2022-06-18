import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Gambar from '../Component/Gambar';

export class PolaGanjilPrima extends Component {
  render() {
    var items = [];
    for (let j = 1; j <= 50; j++) {
      items.push(<Gambar key={j}>{j}</Gambar>);
    }
    function fib() {
      const result = [0, 1];
      for (var i = 2; i < 11; i++) {
        result.push(result[i - 2] + result[i - 1]);
      }

      return result; // or result[n-1] if you want to get the nth term
    }

    return (
      <View>
        <View style={styles.gambar}>{items}</View>
        <Text>{fib()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gambar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default PolaGanjilPrima;
