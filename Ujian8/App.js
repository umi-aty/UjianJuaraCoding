import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PolaGanjilPrima from './src/Pola/PolaGanjilPrima.js';

class App extends Component {
  render() {
    return (
      <View>
        <Text style={styles.textheader}> Ujian Minggu ke-8 </Text>
        <View>
          <PolaGanjilPrima />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textheader: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});

export default App;
