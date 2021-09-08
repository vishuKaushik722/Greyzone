import React, { PureComponent, useEffect, useState } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import SecondaryHeader from '../../../components/SecondaryHeader'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'
import { getRequest, deleteRequest, patchRequest } from '../../../services/NetworkRequest';
import urls from '../../../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';


const DeliveryAddress = ({navigation, route}) => {

    const [addressList, setAddressList] = useState([]);

    const getAllAddress = async () => {
        try {
            const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
            console.log(cookie);

            const response = await getRequest('https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current/address', cookie)
            console.log('response:', response[0].addresses);
            setAddressList(response[0].addresses);
            
        } catch(err) {
            console.log(err);
        }
    }
    const deleteAddress = async (item) => {
        try {
            const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
            const response = await patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current/address/delete/${item._id}`, {} , cookie);
            console.log('response:', response)
            if(response.message === "Address Deleted successfully") {
                getAllAddress()
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllAddress()
    }, [route.params])


        console.log("ADDRESS", addressList)
        const theme = color;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 20, paddingTop: 20, elevation: 3, paddingBottom: 10, marginBottom: 30 }}>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => { navigation.goBack() }}>
                        <Image
                            source={require('../../../assets/arrow-left-icon.png')}
                            style={{ width: 18, height: 12, tintColor: theme.BLACK }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, lineHeight: 27, letterSpacing: 1.13, color: theme.TEXT_PRIMARY, fontFamily: 'Montserrat-Bold', paddingRight: 32 }}>Delivery Address</Text>
                    <Text></Text>
                </View>
                {
                    addressList.map((item, index) => {
                        return (
                            <View key={item._id} style={{ borderRadius: 10, width: (DeviceWidth - 60), backgroundColor: theme.WHITE, marginVertical: 10, marginHorizontal: 30, elevation: 2, paddingHorizontal: 10, paddingVertical: 17, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Image
                                        source={require('../../../assets/selected-radio.png')}
                                        style={{ width: 13, height: 13, }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ paddingLeft: 8 }}>
                                        <Text style={{ fontSize: 12, letterSpacing: 0.5, lineHeight: 18, fontFamily: "Poppins-SemiBold", color: theme.TEXT_PRIMARY, paddingBottom: 3, marginTop: -5 }}>{item.address_type}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.name}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.appartment_name + " " + item.house_no}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.location}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.street}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Add New Address', {item})}>
                                        <Image
                                            source={require('../../../assets/edit.png')}
                                            style={{ width: 11, height: 11, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={require('../../../assets/v-line.png')}
                                        style={{ width: 5, height: 6, marginLeft: 5 }}
                                        resizeMode="contain"
                                    />
                                    <TouchableOpacity onPress={() => deleteAddress(item)}>
                                        <Image
                                            source={require('../../../assets/delete.png')}
                                            style={{ width: 11, height: 11, marginLeft: 5 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
                {/* <FlatList
                    data={this.state.addressList}
                    extraData={this.state.addressList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={{ borderRadius: 10, width: (DeviceWidth - 60), backgroundColor: theme.WHITE, marginVertical: 10, marginHorizontal: 30, elevation: 2, paddingHorizontal: 10, paddingVertical: 17, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Image
                                    source={require('../../../assets/selected-blue.png')}
                                    style={{ width: 13, height: 13, }}
                                    resizeMode="contain"
                                />
                                <View style={{ paddingLeft: 8 }}>
                                    <Text style={{ fontSize: 12, letterSpacing: 0.5, lineHeight: 18, fontWeight: 'bold', color: theme.TEXT_PRIMARY, paddingBottom: 3, marginTop: -5 }}>{item.type}</Text>
                                    <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY }}>{item.name}</Text>
                                    <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY }}>{item.building}</Text>
                                    <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY }}>{item.location}</Text>
                                    <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY }}>{item.pincode}</Text>
                                </View>
                            </View>
                            <View>
                                <Image
                                    source={require('../../../assets/edit-blue.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"
                                />
                                <Image
                                    source={require('../../../assets/delete.png')}
                                    style={{ width: 20, height: 20, marginTop: 5 }}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    }
                /> */}
                <TouchableOpacity onPress={() => navigation.navigate('Add New Address')}>
                    <View style={{ backgroundColor: theme.PRIMARY_GREEN, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginTop: 15, alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 6 }}>
                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 15, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Medium" }}>+ Add Address</Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={{ marginLeft: 30, flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                    <Image
                        source={require('../../../assets/location-grey.png')}
                        style={{ width: 12, height: 14, }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 15, color: theme.TEXT_SECONDARY_LIGHT, paddingLeft: 5 }}>Use Current location</Text>
                </View> */}
            </ScrollView>
        )
    }


export default DeliveryAddress
const DeviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        marginBottom: 50,
        marginTop: 10
    },
    textInputContainer: {
        backgroundColor: color.WHITE,
        elevation: 5,
        paddingHorizontal: 15,
        marginHorizontal: 2,
        paddingVertical: 0,
        borderRadius: 10,
        marginVertical: 10
    },
    textInputStyle2: {
        // borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 12,
        backgroundColor: color.WHITE,
        color: color.TEXT_PRIMARY,
        letterSpacing: 0.5,
        borderRadius: 5,
        fontWeight: 'bold'
        // borderColor: color.BORDER_PURPLE
    }

});