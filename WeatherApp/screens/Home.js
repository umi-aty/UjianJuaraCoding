import React, {useState, useEffect} from 'react';
import {TextInput, Button, Card, Title} from 'react-native-paper';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Home = props => {
  const [info, setInfo] = useState({
    name: 'loading !!',
    temp: 'loading',
    desc: 'loading',
    icon: 'loading',
  });
  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = async () => {
    let MyCity = await AsyncStorage.getItem('newcity');
    if (!MyCity) {
      const {city} = props.route.params;
      MyCity = city;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=3c45724b6f5b70ea69901ed87be81fab&units=metric`,
    )
      .then(data => data.json())
      .then(results => {
        setInfo({
          name: results.name,
          temp: results.main.temp,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
        });
      })
      .catch(err => {
        alert(err.message);
      });
  };
  if (props.route.params.city != 'bekasi') {
    getWeather();
  }
  return (
    <View style={{flex: 1}}>
      <Header name="Weather App" />
      <View style={{alignItems: 'center'}}>
        <Title
          style={{
            color: '#ff1493',
            marginTop: 30,
            fontSize: 30,
          }}>
          {info.name}
        </Title>
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={{
            uri: 'https://openweathermap.org/img/w/' + info.icon + '.png',
          }}
        />
      </View>

      <Card
        style={{
          flexDirection: 'row',
          marginLeft: '25%',
          width: '50%',
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#ff1493', textAlign: 'center'}}>
          {info.temp}°C
        </Title>
      </Card>
      <Card
        style={{
          flexDirection: 'row',
          marginLeft: '25%',
          width: '50%',
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#ff1493', textAlign: 'center'}}>
          {info.desc}
        </Title>
      </Card>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginLeft: '25%',
    width: '50%',
    margin: 5,
    padding: 12,
  },
});
