import React, { Component } from 'react'
import { View,StyleSheet, Text,  TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            address:""
        }
    }

     handleAdd(){
        axios.post('http://192.168.1.8:8080/user/add',this.state)
        .then( (response) => {
          alert(response.data)
          this.props.navigation.navigate("App")
        })
        .catch(function (error) {
         console.log(error);
        })
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Name</Text>
                <TextInput placeholder="Name" onChangeText={(data)=>{this.setState({name:data})}}/>
                <Text style={styles.title}>Email</Text>
                <TextInput placeholder="Email" onChangeText={(data)=>{this.setState({email:data})}}/>
                <Text style={styles.title}>Phone</Text>
                <TextInput placeholder="Phone" onChangeText={(data)=>{this.setState({phone:data})}}/>
                <Text style={styles.title}>Address</Text>
                <TextInput placeholder="Address" onChangeText={(data)=>{this.setState({address:data})}}/>
                <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}><Text style={styles.title}>Tambahkan User</Text></TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.replace("App")}}><Text style={styles.title}>Cancel</Text></TouchableOpacity> */}
            <View style={styles.flex}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("App")}} style={styles.button2}><Text style={styles.title}>LIST</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddUser")}} style={styles.button2}><Text style={styles.title}>REGISTER</Text></TouchableOpacity>
            </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 18,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
    },
    button2: {
      width:"49%",
      margin:"0.5%",
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
    },
    flex:{
      flexDirection: 'row',
      flexWrap: 'wrap',      
      alignSelf: 'flex-end',
    }
  });
