import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            name:""
        };

    }

    componentDidMount(){
      this.getData();
    }
    componentDidUpdate(){
      this.getData();
    }

    getData =()=>{
        axios.get(`http://192.168.1.8:8080/user/${this.state.name}`)
        .then( (response) => {
          let data=response.data;   
          this.setState({data:data}); 
        })
        .catch(function (error) {
         console.log(error);
        })
    }

    deleteData(id){
      console.log(id);
      axios.delete(`http://192.168.1.8:8080/user/delete/${id}`)
      .then( (response) => {
          alert(response.data)
      })
      .catch(function (error) {
       console.log(error);
      })
    }

    renderItem = ({ item }) => (
        <View>
            <Text style={styles.title}>Nama : {item.name}</Text>
            <Text style={styles.title}>Email : {item.email}</Text>
            <Text style={styles.title}>Phone : {item.phone}</Text>
            <Text style={styles.title}>Address : {item.address}</Text>
            <View style={styles.flex}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("UpdateUser",item)}} style={styles.button}><Text style={styles.title}>Update User</Text></TouchableOpacity>
            <TouchableOpacity  onPress={()=>{Alert.alert('Anda yakin?',
              'Jika dihapus data tidak dapat dikembalikan',[
                {text: 'TIDAK', onPress: () => console.warn('Batal Menghapus'), style: 'cancel'},
                {text: 'YA', onPress: () => this.deleteData(item.id)},
              ])}} 
              style={styles.button}>
                <Text style={styles.title}>Delete User</Text>
            </TouchableOpacity>
            </View>
              
        </View>
    )

    

    render() {
        return (
            <SafeAreaView style={styles.container}>
              <TextInput TextInput placeholder="Cari User" style = {{borderWidth:5, borderColor:"grey"}} onChangeText={(data)=>{this.setState({name:data})}}/>
              <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
              <View style={styles.flex}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("App")}} style={styles.button}><Text style={styles.title}>LIST</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("AddUser")}} style={styles.button}><Text style={styles.title}>REGISTER</Text></TouchableOpacity>
              </View>
            </SafeAreaView>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
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