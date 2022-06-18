import React, { Component } from "react";
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";

export class DataCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFlatList: {},
      username: this.props.route.params.userName,
      jenkel: this.props.route.params.jenKel,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://192.168.100.3:8080/calon/", {
        params: {
          username: this.props.route.params.userName,
          jenkel: this.props.route.params.jenKel,
        },
      })
      .then((response) => {
        let data = response.data;
        console.log(data);
        this.setState({ dataFlatList: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.textj}>Data Calon</Text>
        </View>
        <FlatList
          data={this.state.dataFlatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("DetailCalon", {
                    userName: this.state.username,
                    jenKel: this.state.jenkel,
                  });
                }}
              >
                <View style={styles.flat}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `http://192.168.100.3:8080/photo/${item.photo}/`,
                    }}
                  />
                  <View
                    style={{ flexDirection: "column", alignSelf: "center" }}
                  >
                    <Text>Name : {item.name}</Text>
                    <Text>Age : {item.umur} tahun</Text>
                    <Text>Username : {item.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.UserReducer.isLogin,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataCalon);

const styles = StyleSheet.create({
  flat: {
    borderWidth: 3,
    flexDirection: "row",
    margin: 15,
  },
  textj: {
    textAlign: "center",
    margin: 10,
    marginBottom: 25,
    fontSize: 30,
    fontWeight: "bold",
  },
  img: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
