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
import { UserAction } from "../redux/Action";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      jenkel: "",
      phone: "",
      umur: "",
      photo:
        "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
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
      .post("http://192.168.100.3:8080/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data);
        this.props.navigation.navigate("Main", {
          userName: this.state.username,
        });
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.textj}> Register </Text>
        </View>
        <View>
          <Text style={styles.texti}> Username </Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ username: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.texti}> Name </Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ name: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.texti}> Jenis Kelamin </Text>
          <Picker
            selectedValue={this.state.jenkel}
            style={{ height: 50, width: 150 }}
            onValueChange={(value) => {
              this.setState({ jenkel: value });
            }}
          >
            <Picker.Item label="Jenis Kelamin" value="" />
            <Picker.Item label="Laki-Laki" value="Laki-Laki" />
            <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
          <Text style={styles.texti}> Phone Number </Text>
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ phone: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.texti}> Umur </Text>
          <TextInput
            placeholder="Umur"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ umur: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={this.handleInputData.bind(this)}
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
            <Text style={styles.textb}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  dataRegis: state.UserReducer,
});

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    padding: 20,
  },
  textb: {
    textAlign: "center",
    borderWidth: 3,
    backgroundColor: "#ADD8E6",
    padding: 3,
  },
  texti: {
    marginLeft: 10,
  },
  textj: {
    textAlign: "center",
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});
