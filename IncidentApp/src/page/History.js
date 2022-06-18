import React, { Component } from "react";
import { Image, FlatList, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

export class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFlatList: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://incidentapp.herokuapp.com/laporan/")
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
        <FlatList
          data={this.state.dataFlatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.flat}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: `http://incidentapp.herokuapp.com/laporan/photo/${item.photo}/`,
                }}
              />
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text>Status : {item.status}</Text>
                <Text>Jam : {item.jam}</Text>
                <Text>Alamat : {item.alamat}</Text>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  flat: {
    borderWidth: 5,
    flexDirection: "row",
    margin: 5,
  },
});
