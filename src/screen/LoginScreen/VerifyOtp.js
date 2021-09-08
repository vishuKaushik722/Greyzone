import React, { Component } from 'react';
import {
  View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image
} from 'react-native';
import color from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import { MyContext } from '../../navigation/AppNavigation';
import { Snackbar, Checkbox, Button } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { isNetworkConnected, postRequest, getRequest } from '../../services/NetworkRequest'
import urls from '../../constants/urls'

class VerifyOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      otpStatus: '0',
      timer: 30,
      otpValue: '',
      mobileNo: '',
      signup: false,
      firstNameStyle: {
        elevation: 5,
        borderRadius: 10,
        borderRadius: 5,
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 40
      }
    };
  }
  componentDidMount() {
    this.setData();
    const mobileNo = this.props.route.params.mobileNo
    const signup = this.props.route.params.signup
    console.log('mobileNo:', mobileNo)
    this.setState({ mobileNo: mobileNo, signup: signup })
    if (this.state.timer >= 0) {
      this.interval = setInterval(
        () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
        1000
      );
    }
    // this.setData()
  }
  setData = async () => {
    // await AsyncStorage.setItem(storageKeys.COOKIES, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiI5Njk2ODA1NDIyIiwiaWF0IjoxNjI2OTgxODQwLCJleHAiOjE2Mjk1NzM4NDB9.NAIjDAQXWeSKvUPfpAdDW0HnmqGbHiOdAMHnGAs7N6k')
  }
  sendOtp = async () => {
    const { mobileNo } = this.state
    try {
      if (isNetworkConnected) {
        const responseBody = JSON.stringify({
          phone_number: mobileNo
        })
        let response = await postRequest(urls.SEND_OTP, responseBody)
        if (response.message === "OTP sent successfully") {
          console.log('a:', a)
          this.setState({ timer: 30 })
        }
        else {
          console.log(response.message)
        }
        console.log('response:', response)
      }
      else {
        this.setState({ snackbarVisibility: true, snackbarMsg: 'No Internet' })
      }
    } catch (error) {
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Some Error Occurred' })
      console.log('error:', error)

    }
  }
  verifyOtp = async (login) => {
    const { otpValue, signup } = this.state
    // this.props.navigation.navigate('Enter Details')
    console.log('otpValue:', otpValue)
    const { mobileNo } = this.state
    if (otpValue.length <= 5) {
      // this.setState({ otpValue: otpValue })
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Enter 6 digit OTP' })
    }
    else {
      this.setState({ otpValue: otpValue })
      try {
        if (isNetworkConnected) {
          const responseBody = JSON.stringify({
            number: mobileNo,
            otp: otpValue
          })
          let response = await postRequest(urls.VERIFY_OTP, responseBody)
          console.log('response:', response)
          if (response.token) {
            await AsyncStorage.setItem(storageKeys.COOKIES, response.token)
            // this.props.navigation.navigate('Enter Details')
            signup ? this.props.navigation.navigate('Enter Details') : login()
            console.log('signup:', signup)
            // login()
          }
          else {
            console.log(response.message)
            this.setState({ snackbarVisibility: true, snackbarMsg: response.message })
          }
        }
        else {
          console.log('No Internet')
          this.setState({ snackbarVisibility: true, snackbarMsg: 'No Internet' })
        }
      } catch (error) {
        console.log('error:', error)
        this.setState({ snackbarVisibility: true, snackbarMsg: 'Some Error Occurred' })

      }
    }
  }
  // componentDidUpdate(){
  //   if(this.state.timer === 1){ 
  //     clearInterval(this.interval);
  //   }
  // }

  componentWillUnmount() {
    this.setData()
  }

  setData = async () => { };
  render() {
    const theme = color
    const { otpValue, firstNameStyle } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: theme.WHITE, }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 50 }}>
          <Text style={{ flex: 3 / 5, fontSize: 24, color: theme.TEXT_PRIMARY, letterSpacing: 1, fontWeight: 'bold', alignSelf: 'center', marginTop: 25 }}>ENTER YOUR OTP</Text>
          <Image
            source={require('../../assets/otp-illustration.png')}
            style={{ width: 164.56, height: 122., alignSelf: 'center', alignSelf: 'flex-start', marginTop: 10, flex: 2 / 5 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ ...firstNameStyle, backgroundColor: theme.PRIMARY_GREEN }}>
          <TextInput
            style={{ ...styles.textInputStyle, backgroundColor: theme.WHITE, color: theme.TEXT_PRIMARY, fontSize: 14, letterSpacing: 0.5 }}
            value={otpValue}
            onChangeText={(text) => this.setState({ otpValue: text })}
            placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
            // autoFocus
            placeholder='Enter OTP'
            keyboardType="number-pad"
            onFocus={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
            onBlur={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
          />
        </View>
        <TouchableOpacity onPress={this.verifyOtp}>
          <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
            <Text style={{ fontSize: 14, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Verify</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: theme.TEXT_SECONDARY }}>Didn't received OTP?</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: theme.PRIMARY_GREEN }}> Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY }}>{this.props.mobileNo}</Text>
          </View>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: theme.PRIMARY_GREEN }}> Change?</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 12, color: theme.TEXT_SECONDARY_LIGHT, textAlign: 'center' }}>Sending OTP to the above number</Text>
      </View>
    );
  }
}

export default VerifyOtp;
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: color.BORDER_LIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: color.PRIMARY_GREEN,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  primaryBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 5,
    marginVertical: 40
  },
  textInputContainer: {
    backgroundColor: color.WHITE,
    elevation: 5,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 10
  },
  textInputStyle: {
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 15,
  }
});
