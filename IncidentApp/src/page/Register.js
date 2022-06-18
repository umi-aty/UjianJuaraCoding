import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  }

  handleInputData() {
    axios
      .post("http://incidentapp.herokuapp.com/register", this.state)
      .then((response) => {
        alert(response.data);
        this.props.navigation.navigate("Main");
      })
      .catch((error) => {
        console.log("ada error sebagai berikut : " + error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.textF}> Name </Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={(value) => {
              this.setState({ name: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.email.focus()}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.textF}> Email </Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            ref={(node) => {
              this.email = node;
            }}
            onChangeText={(value) => {
              this.setState({ email: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.phone.focus()}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.textF}> Phone Number </Text>
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            ref={(node) => {
              this.phone = node;
            }}
            onChangeText={(value) => {
              this.setState({ phone: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.address.focus()}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <Text style={styles.textF}> Address </Text>
          <TextInput
            placeholder="Address"
            style={styles.input}
            ref={(node) => {
              this.address = node;
            }}
            onChangeText={(value) => {
              this.setState({ address: value });
            }}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={this.handleInputData.bind(this)}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
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
