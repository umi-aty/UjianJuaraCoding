import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlerLogin() {
    if (this.props.isLogin) {
      this.props.navigation.navigate("Main");
    } else {
      this.props.navigation.navigate("Login");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../res/iconpp.png")}
        ></Image>
        <View style={styles.flex}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handlerLogin();
            }}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Registrasi");
            }}
          >
            <Text style={styles.text}>Registrasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogin: state.UserReducer.isLogin,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  button: {
    padding: 10,
    width: "50%",
  },
  text: {
    textAlign: "center",
    borderWidth: 5,
    padding: 5,
    margin: 5,
  },
  flex: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 80,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 100,
  },
});
