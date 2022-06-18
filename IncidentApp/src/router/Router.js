import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../page/Home";
import Register from "../page/Register";
import Login from "../page/Login";
import Report from "../page/Report";
import Main from "../page/Main";
import History from "../page/History";
import MapKejadian from "../page/MapKejadian";

const Stack = createStackNavigator();

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registrasi" component={Register} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="MapKejadian" component={MapKejadian} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
