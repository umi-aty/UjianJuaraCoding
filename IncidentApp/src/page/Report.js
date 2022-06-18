import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      kejadian: "",
      alamat: "",
      keterangan: "",
      photo:
        "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
      status: "",
      latitude: "",
      longitude: "",
    };
  }

  componentDidMount() {
    this.getPermission();
    this.getLocation();
  }

  async getPermission() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  }

  async getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Lokasinya adalah :" + JSON.stringify(location));

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  handleInputData() {
    let formData = new FormData();
    let filename = this.state.photo;
    console.log("nama gambar " + filename.split("/").pop());
    formData.append("data", JSON.stringify(this.state));
    formData.append("file", {
      uri: this.state.photo, //Your Image File Path
      type: "image/jpeg",
      name: filename.split("/").pop(),
    });
    axios
      .post("http://incidentapp.herokuapp.com/laporan/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data);
        this.props.navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.textF}> Nama </Text>
          <TextInput
            placeholder="Nama"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ nama: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.kejadian.focus()}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.textF}> Kejadian </Text>
          <Picker
            selectedValue={this.state.kejadian}
            style={{ height: 50, width: 150 }}
            onValueChange={(value) => {
              this.setState({ kejadian: value });
            }}
          >
            <Picker.Item label="Pemerkosaan" value="pemerkosaan" />
            <Picker.Item label="Perampokan" value="perampokan" />
            <Picker.Item label="Bencana" value="bencana" />
            <Picker.Item label="Pembunuhan" value="pembunuhan" />
          </Picker>
          <Text style={styles.textF}> Alamat </Text>
          <TextInput
            placeholder="Alamat"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ alamat: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.keterangan.focus()}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.textF}> Keterangan </Text>
          <TextInput
            placeholder="Keterangan"
            style={styles.input}
            ref={(node) => {
              this.keterangan = node;
            }}
            onChangeText={(value) => {
              this.setState({ keterangan: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Button
            title="Pick an image from camera roll"
            onPress={() => {
              this.pickImage();
            }}
          />

          <Image
            source={{ uri: this.state.photo }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleInputData();
            }}
          >
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Report);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
  },
  button: {
    padding: 20,
  },
  text: {
    textAlign: "center",
    borderWidth: 5,
  },
  textF: {
    margin: 5,
  },
});
