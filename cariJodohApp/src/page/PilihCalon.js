import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
  StyleSheet,
  LogBox,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { Card, CardAction, CardButton, CardImage } from "react-native-cards";

export class PilihCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFlatList: {},
    };
  }

  componentDidMount() {
    this.getData();
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <Text style={styles.textj}>Pilih Calon</Text>
          </View>
          <FlatList
            data={this.state.dataFlatList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card style={{ marginLeft: 20, marginRight: 20 }}>
                  <CardImage
                    source={{
                      uri: `http://192.168.100.3:8080/photo/${item.photo}/`,
                    }}
                    title={item.name}
                  />
                  <CardAction separator={true} inColumn={false}>
                    <CardButton
                      onPress={() => {}}
                      title="Sebelumnya"
                      color="#FEB557"
                    />
                    <CardButton
                      style={{ marginLeft: 130 }}
                      onPress={() => {}}
                      title="Selanjutnya"
                      color="#FEB557"
                    />
                  </CardAction>
                </Card>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.UserReducer.isLogin,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PilihCalon);

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
});
