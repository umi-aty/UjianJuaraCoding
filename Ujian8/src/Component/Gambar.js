import React, {useState} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import gambarNo from '../../res/no.png';
import gambarYes from '../../res/yes.png';

export default function Gambar() {
  const [alternateImage, setAlternateImage] = useState(true);

  const changeImage = () => {
    setAlternateImage(alternateImage => !alternateImage);
  };

  return (
    <View>
      <TouchableOpacity onPress={changeImage}>
        {alternateImage && (
          <Image style={styles.logo} source={gambarYes}></Image>
        )}
        {!alternateImage && (
          <Image style={styles.logo} source={gambarNo}></Image>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 3,
    marginRight: 3,
  },
});
