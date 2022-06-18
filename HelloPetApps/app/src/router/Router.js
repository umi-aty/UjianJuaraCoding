import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from '../consts/colors';
import SignInScreen from '../views/screens/SignInScreen';
import SignUpScreen from '../views/screens/SignUpScreen';
import BottomNavigator from '../views/navigation/BottomNavigator';
import DetailScreen from '../views/screens/DetailScreen';
import DetailBiodata from '../views/screens/DetailBiodata';
import OnBoardScreen from '../views/screens/OnBoardScreen';
import ChatDokterScreen from '../views/screens/ChatDokterScreen';
import Profile from '../views/screens/Profile';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="DetailBiodata" component={DetailBiodata} />
        <Stack.Screen name="ChatDokterScreen" component={ChatDokterScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
