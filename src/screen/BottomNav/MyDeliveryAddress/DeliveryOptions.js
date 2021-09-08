import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import SecondaryHeader from '../../../components/SecondaryHeader'
import DatePicker from 'react-native-datepicker'
import RazorpayCheckout from 'react-native-razorpay';
import DropDownComponent from '../../../components/DropDownComponent'
import { getRequest, postRequest, patchRequest } from '../../../services/NetworkRequest';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';
import { removeFromCart } from '../../../redux/actions';

let DELIVERY_CHARGE = 50;


const DeliveryOptions = ({navigation, route}) => {
    

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.cartList);


    const [addressList, setAddressList] = useState([]);
    const [dummyArray, setDummyArray] = useState([{isSelected: true}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false},
        {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false},
        {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false},
        {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}, {isSelected: false}])

    const [selectedAddressId, setSelectedAddressId] = useState("")

    const getAllAddress = async () => {
        try {
            const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
            console.log(cookie);

            const response = await getRequest('https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current/address', cookie)
            console.log('response:', response[0].addresses);
            setAddressList(response[0].addresses)
            response[0].addresses.map((item) => {
                setDummyArray([...dummyArray, {isSelected: false}])
            })

            setSelectedAddressId(response[0].addresses[0]._id);
            
        } catch(err) {
            console.log(err);
        }
    }

    const getTotalCost = () => {
        let totalCost = 0;
        products.map((item) => {
            if(item.count && item.count > 0) {
                totalCost = totalCost + item.count * item.itemPrice
            }
        })
        return totalCost
    }

    const paymentHandler = async () => {
        const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
        var options = {
            description: 'Pay for your order',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_ffb24E25WEp1hz', // Your api key
            amount: (getTotalCost() + DELIVERY_CHARGE) * 100,
            name: 'Greyzon.in',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software'
            },
            theme: {color: '#25A244'}
          }
          RazorpayCheckout.open(options).then((data) => {
            console.log(`Success: ${data.razorpay_payment_id}`);

            const responseBody = JSON.stringify({
                order_status: "confirmed"
            })
        
            postRequest("https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current", responseBody, cookie)
            .then(data => {
                products.map(async item => {
                    if(item.count && item.count > 0) {
                        const myBody = JSON.stringify({
                            item_id: item._id,
                            item_quantity: item.count
                        })
                        await patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current/add/${data._id}`, myBody, cookie)
                    }
    
                })
                const addressBody = JSON.stringify({
                    id: selectedAddressId
                })
                patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current/address/${data._id}`, addressBody, cookie)
                .then(() => {
                    dispatch(removeFromCart());
                    navigation.navigate('Home');
                })
                .catch(err => {
                    console.log(err);
                })
            }
            )
            .catch(err => {
                console.log(err);
            })
          }).catch((error) => {
            // handle failure
            console.log(`Error: ${error.code} | ${error.description}`);
            const responseBody = JSON.stringify({
                order_status: "Cancelled"
            })
        
            postRequest("https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current", responseBody, cookie)
            .then(data => {
                products.map(async item => {
                    if(item.count && item.count > 0) {
                        const myBody = JSON.stringify({
                            item_id: item._id,
                            item_quantity: item.count
                        })
                        await patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current/add/${data._id}`, myBody, cookie)
                    }
                    
                })
                const addressBody = JSON.stringify({
                    id: selectedAddressId
                })
                patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current/address/${data._id}`, addressBody, cookie)
                .then(() => {
                    dispatch(removeFromCart());
                    navigation.navigate('Home');
                })
                .catch(err => {
                    console.log(err);
                })
            }
            )
          });
    }
    
    useEffect(() => {
        getAllAddress()
        console.log("ROUTE", route.params)
    }, [route.params])
    const selectAddress = (item, index) => {
        dummyArray.map((i, j) => {
            if(j === index) {
                dummyArray[j].isSelected = true
            } else {
            dummyArray[j].isSelected = false
            }
        })
        setSelectedAddressId(item)
        console.log(selectedAddressId);
    }
        const theme = color;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingTop: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ paddingRight: 5 }}
                            onPress={() => { navigation.goBack() }}>
                            <Image
                                source={require('../../../assets/arrow-left-white2.png')}
                                style={{ width: 16, height: 16, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Bold" }}>Delivery Options</Text>
                        <View></View>
                    </View>
                </View>
                {
                    addressList.map((item, index) => {
                        return (
                            <Pressable onPress={() => selectAddress(item._id, index)} style={{ borderRadius: 10, width: (DeviceWidth - 60), backgroundColor: theme.WHITE, marginVertical: 10, marginHorizontal: 30, elevation: 2, paddingHorizontal: 10, paddingVertical: 17, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    {dummyArray[index].isSelected ? 
                                        <Image
                                        source={require('../../../assets/selected-radio.png')}
                                        style={{ width: 13, height: 13, }}
                                        resizeMode="contain"
                                        /> 
                                    : null}
                                    <View style={{ paddingLeft: 8 }}>
                                        <Text style={{ fontSize: 12, letterSpacing: 0.5, lineHeight: 18, fontFamily: "Poppins-SemiBold", color: theme.TEXT_PRIMARY, paddingBottom: 3, marginTop: -5 }}>{item.address_type}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{"Adam Steve"}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.area}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.city}</Text>
                                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 16, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item.pincode}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('Add New Address', {response: true, item})}>
                                    <Image
                                        source={require('../../../assets/edit.png')}
                                        style={{ width: 11, height: 11, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </Pressable>
                        )
                    })
                }
                <TouchableOpacity onPress={() => navigation.navigate('Add New Address', {response: true})}>
                    <View style={{ backgroundColor: theme.WHITE, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginTop: 15, alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 10, letterSpacing: 0.42, lineHeight: 15, color: theme.PRIMARY_GREEN, fontFamily: "Montserrat-Medium" }}>+ Add Address</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={paymentHandler} style={{ alignSelf: 'center' }}>
                    <View style={{ backgroundColor: '#1A7431', justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 10, alignSelf: 'flex-start', paddingHorizontal: 33, paddingVertical: 11, borderRadius: 10, }}>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, letterSpacing: 0.5, lineHeight: 18, color: theme.WHITE }}>PROCEED TO PAY</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
}


export default DeliveryOptions
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