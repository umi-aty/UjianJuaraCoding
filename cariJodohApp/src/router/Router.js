import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../page/Home";
import Register from "../page/Register";
import Login from "../page/Login";
import Main from "../page/Main";
import DataCalon from "../page/DataCalon";
import DetailCalon from "../page/DetailCalon";
import PilihCalon from "../page/PilihCalon";

const Stack = createStackNavigator();

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="DataCalon" component={DataCalon} />
          <Stack.Screen name="DetailCalon" component={DetailCalon} />
          <Stack.Screen name="PilihCalon" component={PilihCalon} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
