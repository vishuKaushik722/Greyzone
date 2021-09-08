import React, { Component } from 'react';
import { View, Linking , Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animation, Image, Modal, Alert } from 'react-native';
import color from '../../constants/colors';
import { Card, Appbar, Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import { MyContext } from '../../navigation/AppNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { isNetworkConnected, postRequest, getRequest } from '../../services/NetworkRequest'
import urls from '../../constants/urls'
import { WebView } from 'react-native-webview';

class Signup extends Component {
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
      htmlCode: '',
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

          if (response == "OTP sent") {

            this.setState({ snackbarVisibility: true, snackbarMsg: 'OTP sent Successfully' })
            this.props.navigation.navigate('Verify Otp', {
              mobileNo: mobileNo,
              signup: true
            })
          }
          console.log('response message:', response.message);
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

  googleCallBack = async () => {
    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow'
    // };

    // fetch("https://softezi-greyzon-rishav.herokuapp.com/v1/auth/google/callback", requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     this.setState({ htmlCode: result })

    //   })
    //   .catch(error => console.log('error', error));
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://softezi-greyzon-rishav.herokuapp.com/v1/auth/currentuser", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('result:', result)

      })
      .catch(error => console.log('error', error));
  }
  render() {
    const { mobileNo, firstNameStyle } = this.state
    const theme = color
    return (
      <View style={{ flex: 1, backgroundColor: color.WHITE }}>
        <Text style={{ fontSize: 36, color: theme.PRIMARY_GREEN, letterSpacing: 1, fontWeight: 'bold', alignSelf: 'center', marginTop: 35 }}>GreYZOn.in</Text>
        <Image
          source={require('../../assets/mobile-number-illustration.png')}
          style={{ width: 210.56, height: 190., alignSelf: 'center', marginTop: 10 }}
          resizeMode="contain"
        />
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, fontWeight: 'bold', }}>Enter Your Number</Text>
          <View style={{ ...firstNameStyle, backgroundColor: theme.PRIMARY_GREEN }}>
            <TextInput
              style={{ ...styles.textInputStyle, backgroundColor: theme.WHITE, color: theme.TEXT_PRIMARY, fontSize: 14, letterSpacing: 0.5 }}
              value={mobileNo}
              onChangeText={(text) => this.setState({ mobileNo: text })}
              placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
              // autoFocus
              placeholder='Enter Mobile Number'
              keyboardType="number-pad"
              onFocus={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
              onBlur={() => { this.setState({ firstNameStyle: { ...firstNameStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
            />
          </View>
        </View>
        <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: theme.PRIMARY_GREEN, marginVertical: 40, borderRadius: 5 }} onPress={this.sendOtp}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: color.TEXT_WHITE, letterSpacing: 0.8, paddingVertical: 14, paddingHorizontal: 80 }}>Proceed</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginHorizontal: 40, justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 50 }}>
          <Image
            source={require('../../assets/apple-logo.png')}
            style={{ width: 76, height: 42 }}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => this.googleLogin()}>
            <Image
              source={require('../../assets/google-logo.png')}
              style={{ width: 76, height: 42 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.googleCallBack()}>
            <Image
              source={require('../../assets/facebook-logo.png')}
              style={{ width: 76, height: 42 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 12, color: color.TEXT_SECONDARY }}>By Continuing, you agree to our </Text>
          <TouchableOpacity>
            <Text style={{ color: color.TEXT_SECONDARY, fontSize: 12, fontWeight: 'bold' }}> Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{ backgroundColor: color.PRIMARY_GREEN, marginBottom: 30, borderRadius: 5 }}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.htmlCode ? true : false}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setState({ htmlCode: '' })
            // this.setModalVisible(!modalVisible);
          }}
        >
          <WebView
            originWhitelist={['*']}
            source={{ html: this.state.htmlCode }}
          />
        </Modal>


      </View>
    );
  }
}

export default Signup;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  primaryBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.PRIMARY_GREEN,
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
