import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  // componentDidMount() {
  //   if (!this.props.dataRedux.isLogin) {
  //     this.props.navigation.navigate("Home");
  //   }
  // }

  handleSignOut() {
    alert("Anda berhasil sign out");
    this.props.UserAction(false, "isLogin");
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.flex}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("Report");
              }}
            >
              <Text style={styles.text}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("History");
              }}
            >
              <Text style={styles.text}>History Laporan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flex}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("MapKejadian");
              }}
            >
              <Text style={styles.text}>Map Kejadian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleSignOut();
              }}
            >
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (this.state.counter === 3) {
                  this.setState({ counter: 1 });
                  this.props.navigation.navigate("Report");
                } else {
                  let count = this.state.counter;
                  this.setState({ counter: count + 1 });
                }
              }}
            >
              <Image
                style={styles.logo}
                source={require("../res/emergency.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  dataRedux: state.UserReducer,
});

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
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
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
