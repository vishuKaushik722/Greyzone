import React, { Component, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animation, Image } from 'react-native';
import color from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { Card, Appbar, Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import { MyContext } from '../../navigation/AppNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { isNetworkConnected, patchRequest, getRequest } from '../../services/NetworkRequest'
import { changeLoginStatus } from '../../redux/actions';

const EnterDetails = () => {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [fullNameStyle, setFullNameStyle] = useState({
        elevation: 5,
        borderRadius: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
    })
    const [emailStyle, setEmailStyle] = useState({
        elevation: 5,
        borderRadius: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20
    });

    const [snackbarVisibility, setSnackbarVisibility] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState("")



    submit = async (login) => {
        const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
        console.log('cookie:', cookie)
        try {
            if (isNetworkConnected) {
                if (fullName.trim() !== '' || email.trim() !== '') {
                    const responseBody = JSON.stringify({
                        name: fullName.trim(),
                        email: email.trim()
                    });
                    console.log(responseBody);
                    const response = await patchRequest("https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current", responseBody, cookie);
                    console.log(response);
                        if(response.name && response.email) {
                            setSnackbarVisibility(true)
                            setSnackbarMsg("Details Saved")
                            dispatch(changeLoginStatus(true));
                        }
                    }
                else {
                    console.log('Fill form')
                    setSnackbarVisibility(true)
                    setSnackbarMsg("Fill all fields")
                }
            }
            else {
                setSnackbarVisibility(true);
                setSnackbarMsg("No Internet");
                console.log('No Internet')
            }
        } catch (error) {
            console.log('error:', error)
            setSnackbarVisibility(true);
            setSnackbarMsg("Some Error Occurred")
        }
    }
        const theme = color
        return (
            <View style={{ flex: 1, backgroundColor: color.WHITE }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 20, marginBottom: 60 }}>
                    <Text style={{ flex: 3 / 5, fontSize: 24, color: theme.TEXT_PRIMARY, letterSpacing: 1, fontWeight: 'bold', alignSelf: 'center', marginTop: 25 }}>ENTER YOUR DETAILS</Text>
                    <Image
                        source={require('../../assets/date-illustration.png')}
                        style={{ width: 164.56, height: 122., alignSelf: 'center', alignSelf: 'flex-start', marginTop: 10, flex: 2 / 5 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, marginLeft: 20 }}>Full Name</Text>
                <View style={{ ...fullNameStyle, backgroundColor: theme.PRIMARY_GREEN }}>
                    <TextInput
                        style={{ ...styles.textInputStyle, backgroundColor: theme.WHITE, color: theme.TEXT_PRIMARY, fontSize: 14, letterSpacing: 0.5 }}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        // autoFocus
                        placeholder='Enter Full Name'
                        onFocus={() => { setFullNameStyle({ ...fullNameStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN }) }}
                        onBlur={() => { setFullNameStyle({ ...fullNameStyle, borderWidth: 1, borderColor: theme.WHITE } ) }}
                    />
                </View>
                <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, marginLeft: 20, marginTop: 20 }}>Email</Text>
                <View style={{ ...emailStyle, backgroundColor: theme.PRIMARY_GREEN }}>
                    <TextInput
                        style={{ ...styles.textInputStyle, backgroundColor: theme.WHITE, color: theme.TEXT_PRIMARY, fontSize: 14, letterSpacing: 0.5 }}
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        // autoFocus
                        placeholder='Enter Email'
                        keyboardType="email-address"
                        onFocus={() => { setEmailStyle({ ...emailStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN }) }}
                        onBlur={() => { setEmailStyle({ ...emailStyle, borderWidth: 1, borderColor: theme.WHITE } ) }}
                    />
                </View>

                <MyContext.Consumer>
                    {
                        value => (
                            <TouchableOpacity style={{ ...styles.primaryBtn }} onPress={() => this.submit(value)}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: color.TEXT_WHITE, letterSpacing: 0.8 }}>Save</Text>
                            </TouchableOpacity>
                        )
                    }
                </MyContext.Consumer>
                <Snackbar
                    visible={snackbarVisibility}
                    style={{ backgroundColor: color.PRIMARY_GREEN, marginBottom: 30, borderRadius: 5 }}
                    duration={3000}
                    onDismiss={() => setSnackbarVisibility(false)}
                    action={{
                        label: 'Ok',
                        color: color.TEXT_WHITE,
                        onPress: () => {
                            setSnackbarVisibility(false)
                        },
                    }}>
                    <Text style={{ color: color.TEXT_WHITE, fontSize: 15 }}>{snackbarMsg}</Text>
                </Snackbar>
            </View>
        );
    }

export default EnterDetails;
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
        paddingVertical: 16,
        borderRadius: 6,
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
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 14,
    }
});
