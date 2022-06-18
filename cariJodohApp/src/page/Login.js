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
      username: "",
      phone: "",
    };
  }

  onPressLogin() {
    axios
      .get("http://192.168.100.3:8080/login/", {
        params: {
          username: this.state.username,
          phone: this.state.phone,
        },
      })
      .then((response) => {
        let data = response.data;
        if (data !== "") {
          this.props.UserAction(true, "isLogin");
          this.props.UserAction(data, "dataUser");
          alert("Hai " + response.data.name);
          this.props.navigation.navigate("Main", {
            userName: response.data.username,
            jenKel: response.data.jenkel,
          });
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
            <Text style={styles.textj}> Login </Text>
          </View>
          <View>
            <Text style={styles.texti}> Username </Text>
            <TextInput
              placeholder="Username"
              style={styles.input}
              maxLength={256}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ username: value });
              }}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999"
            />

            <Text style={styles.texti}> Phone Number </Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onPressLogin();
            }}
          >
            <Text style={styles.textb}>Login</Text>
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
