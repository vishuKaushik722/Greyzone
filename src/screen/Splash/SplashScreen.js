import React, { useState } from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  MaskedViewIOS,
} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import color from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      showAlert: false,
      alertMsg: '',
      alertTitle: '',
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.fetchData();
    }, 2000);
    // this.moveImageUp()
    // this.moveImageDown()
    // this.fadeInOutK()
    // if (this.state.authenticate == false) {
    //     this.touchIdSupport()
    // }
    // else {
    //     this.fadeInHeight()
    //     this.fadeInWidth()
    // }
  }
  fetchData = () => {
    //api to request data
    this.props.complete();
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.WHITE }}>
        {/* <Image
          // width="200"
          // height="100"
          style={{ width: DeviceWidth / 1.8, height: (DeviceWidth / 1.8) * 0.677 }}
          resizeMode="contain"
          source={require('../../assets/splash_logo.png')}
        /> */}
        <Text style={{ fontSize: 16, letterSpacing: 4, lineHeight: 18, color: '#155D27' }}>Welcome to</Text>
        <Text style={{ fontSize: 32, letterSpacing: 2.1, lineHeight: 40, color: '#2DC653' }}>GreYZOn.in</Text>
      </View>
    );
  }
}
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export const isLoggedIn = async () => {
  try {
    let cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
    if (cookie == null) {
      // return "LoggedIn"
      return false
    } else {
      return true
    }
  }
  catch (err) {
    // 
  }
}
