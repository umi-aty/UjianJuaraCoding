import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { UserAction } from "../redux/Action";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.userName,
      jenkel: this.props.route.params.jenKel,
    };
  }

  handleSignOut() {
    alert("Anda berhasil sign out");
    this.props.UserAction(false, "isLogin");
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View>
            <Text style={styles.textj}>Main Menu</Text>
          </View>
          <View>
            <Text style={{ margin: 5 }}>
              Hai, {this.props.route.params.userName}! temukan pasangan yang
              cocok untukmu disini.
            </Text>
          </View>
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("PilihCalon", {
                  userName: this.state.username,
                  jenKel: this.state.jenkel,
                });
              }}
            >
              <Text style={styles.text}>Pilih Calon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("DataCalon", {
                  userName: this.state.username,
                  jenKel: this.state.jenkel,
                });
              }}
            >
              <Text style={styles.text}>Data Calon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleSignOut();
              }}
            >
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  dataRedux: state.UserReducer.dataUser.name,
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
    borderWidth: 3,
    padding: 5,
    margin: 5,
    textAlign: "center",
    backgroundColor: "#ADD8E6",
  },
  view: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  textj: {
    textAlign: "center",
    margin: 10,
    marginBottom: 25,
    fontSize: 30,
    fontWeight: "bold",
  },
});
