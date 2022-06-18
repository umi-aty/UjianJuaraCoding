import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
    };
  }

  onPressLogin() {
    axios
      .get("http://incidentapp.herokuapp.com/login", {
        params: {
          email: this.state.email,
          phone: this.state.phone,
        },
      })
      .then((response) => {
        let data = response.data;
        if (data !== "") {
          this.props.UserAction(true, "isLogin");
          this.props.UserAction(data, "dataUser");
          alert("Hai " + response.data.name);
          this.props.navigation.navigate("Main");
        } else {
          alert("Login Gagal, Registrasi dahulu");
          this.props.UserAction(false, "isLogin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View>
            <Text> Email </Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              maxLength={256}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ email: value });
              }}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999"
            />

            <Text> Phone Number </Text>
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              maxLength={256}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ phone: value });
              }}
              onPress={() => {
                this.onPressLogin();
              }}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999"
            />
          </View>
          <Text>{this.state.errors}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onPressLogin();
            }}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.UserReducer,
});

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    padding: 20,
  },
  text: {
    textAlign: "center",
    borderWidth: 5,
  },
});
