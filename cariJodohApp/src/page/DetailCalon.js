import React, { Component } from "react";
import {
  Image,
  FlatList,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";

export class DetailCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFlatList: {},
      counter: 1,
      dataFlatListMaps: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
    };
  }

  componentDidMount() {
    this.getData();
    this.getDataMaps();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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
  getDataMaps() {
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
        this.setState({ dataFlatListMaps: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderMarker() {
    console.log(this.state.dataFlatListMaps);
    return this.state.dataFlatListMaps.map((data, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
          }}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.textj}>Detail Calon</Text>
        </View>
        <FlatList
          data={this.state.dataFlatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                style={styles.img}
                source={{
                  uri: `http://192.168.100.3:8080/photo/${item.photo}/`,
                }}
              />
              <View style={styles.flat}>
                <View style={{ flexDirection: "column", margin: 15, flex: 1 }}>
                  <Text>Name : {item.name}</Text>
                  <Text>Age : {item.umur} tahun</Text>
                  <Text>Username : {item.username}</Text>
                  <Text>Number Phone : {item.phone}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 35,
                    marginTop: 40,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`tel://${item.phone}`);
                    }}
                  >
                    <Image
                      style={styles.logo}
                      source={require("../res/phone.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: -6.240786,
                    longitude: 106.8557614,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {this.renderMarker()}
                </MapView>
              </View>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.UserReducer.isLogin,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCalon);

const styles = StyleSheet.create({
  flat: {
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
    alignSelf: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
