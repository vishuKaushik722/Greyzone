import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animation, Image } from 'react-native';
import color from '../../constants/colors';
import { Card, Appbar, Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import { MyContext } from '../../navigation/AppNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { isNetworkConnected, postRequest, getRequest } from '../../services/NetworkRequest'
import urls from '../../constants/urls'
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullName: '',
      email: '',
      snackbarVisibility: false,
      snackbarMsg: '',
      showPassword: false,
      fullName: '',
      email: '',
      mobileNo: '',
      password: '',
      firstNameStyle: {
        elevation: 5,
        borderRadius: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
      }
    };
  }
  componentDidMount() {
  }
  sendOtp = async () => {
    const { mobileNo } = this.state
    try {
      if (isNetworkConnected) {
        if (mobileNo.trim().length == 10) {
          const responseBody = JSON.stringify({
            number: mobileNo
          })
          let response = await postRequest(urls.SEND_OTP, responseBody)
          if (response.message == "OTP sent successfully") {
            this.props.navigation.navigate('Verify Otp', {
              mobileNo: mobileNo,
              signup: false
            })
          }
          console.log('response:', response)
        }
        else {
          this.setState({ snackbarVisibility: true, snackbarMsg: 'Not Correct Mobile Number' })
          console.log('Not Correct Mobile Number')
        }
      }
      else {
        console.log('No Internet')
        this.setState({ snackbarVisibility: true, snackbarMsg: 'No Internet' })
      }
    } catch (error) {
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Some Error Occurred' })
      console.log('error:', error)
    }
  }
  render() {
    const { mobileNo, firstNameStyle } = this.state
    const theme = color
    return (
      <View style={{ flex: 1, backgroundColor: color.WHITE }}>
        <TouchableOpacity style={{ paddingLeft: 15, paddingTop: 10 }} onPress={() => this.props.navigation.navigate('Main Carousel')}>
          <MaterialCommunityIcons name={'arrow-left'} color={color.TEXT_PRIMARY} size={24} />
        </TouchableOpacity>
        <View style={{ paddingLeft: 20, marginVertical: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login To Continue</Text>
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 60 }}>
          <View style={{ ...firstNameStyle, backgroundColor: theme.PURPLE_LIGHT }}>
            <TextInput
              style={{ ...styles.textInputStyle, backgroundColor: theme.WHITE, color: theme.TEXT_PRIMARY, fontSize: 14, letterSpacing: 0.5 }}
              value={mobileNo}
              onChangeText={(text) => this.setState({ mobileNo: text })}
              placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
              // autoFocus
              placeholder='Enter Mobile Number'
              keyboardType="number-pad"
              onFocus={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.PURPLE_LIGHT } }) }}
              onBlur={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
            />
          </View>
        </View>
        <TouchableOpacity style={{ ...styles.primaryBtn }} onPress={() => this.sendOtp()}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: color.TEXT_WHITE, letterSpacing: 0.8 }}>Login</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Text style={{ color: color.TEXT_SECONDARY_LIGHT, fontSize: 15 }}>or signup using</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 14 }}>Didn't have an Account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{ color: color.PINK, fontSize: 14, }}>  Sign up here</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{ backgroundColor: color.PURPLE_LIGHT, marginBottom: 30, borderRadius: 5 }}
          duration={3000}
          onDismiss={() => this.setState({ snackbarVisibility: false })}
          action={{
            label: 'Ok',
            color: color.TEXT_WHITE,
            onPress: () => {
              this.setState({ snackbarVisibility: false })
            },
          }}>
          <Text style={{ color: color.TEXT_WHITE, fontSize: 15 }}>{this.state.snackbarMsg}</Text>
        </Snackbar>
      </View>
    );
  }
}

export default Login;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  primaryBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.PURPLE_LIGHT,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 50,
    marginBottom: 30
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

// {/* <TouchableOpacity style={{ alignItems: 'flex-end', paddingRight: 20 }} >
//           <Text style={{ fontSize: 14, color: color.TEXT_SECONDARY }}>Forgot Password ?</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{ ...styles.primaryBtn }} onPress={() => this.props.navigation.navigate('Login')}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold', color: color.TEXT_WHITE, letterSpacing: 0.8 }}>Login</Text>
//         </TouchableOpacity>
//         <View style={{ alignItems: 'center', marginVertical: 15 }}>
//           <Text style={{ color: color.TEXT_SECONDARY_LIGHT, fontSize: 15 }}>or login using</Text>
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
//           <Text style={{ fontSize: 14 }}>Didn't have an Account?</Text>
//           <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
//             <Text style={{ color: color.PINK, fontSize: 14, }}>  Sign up here</Text>
//           </TouchableOpacity> */}