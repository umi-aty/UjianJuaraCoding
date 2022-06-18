import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

const Stack = createStackNavigator();
export default class Home extends Component {
    render() {
        return (
            <NavigationContainer>
                    <Stack.Navigator> 
                        <Stack.Screen 
                        name="App" 
                        component={App}/>
                        <Stack.Screen 
                        name="AddUser" 
                        component={AddUser}/>
                        <Stack.Screen 
                        name="UpdateUser" 
                        component={UpdateUser}/>
                    </Stack.Navigator>
                </NavigationContainer>
        )
    }
}
