import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Image, Dimensions, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../constants/colors'
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView, } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector, useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { patchRequest, postRequest } from '../../../services/NetworkRequest';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';
import { removeFromCart } from '../../../redux/actions';




let DELIVERY_CHARGE = 50;

const Cart = ({ navigation }) => {

    const [bottomSheetHeight, setBottomSheetHeight] = useState(138)
    const [test, setTest] = useState(true)
    const dispatch = useDispatch()

    const products = useSelector(state => state.products.cartList);
    // const increaseDecreaseCount = (index, count) => {
    //     // this.props.navigation.navigate('Payment Options')
    //     setBottomSheetHeight(500)
    //     // const { productsList } = this.state
    //     // console.log('productsList:', productsList)
    //     // productsList[index].count = productsList[index].count + count;
    //     // console.log('productsList[index]:', productsList[index].count)
    //     // this.setState({ productsList })
    // }

    const increaseDecreaseCount = (index, count) => {
        if(!products[index].count) {
            products[index].count = 0;
        }
        products[index].count = products[index].count + count
        console.log('products:', products[index])
        setTest(!test);
    }

    const deleteItem = (index, count) => {
        if(!products[index].count) {
            products[index].count = 0;
        }
        products[index].count = 0
        console.log('products:', products)
        setTest(!test);
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

    const emptyCart = () => {
        let showCart = false;
        products.map((item) => {
            if(item.count && item.count > 0) {
                return showCart = true
            }
        })
        return showCart
    }

    useEffect(() => {
        console.log("products", products);
    }, [])

    const PaymentStatusBottomSheet = (props) => {
        return (

                <View style={{ flex: 1, backgroundColor: props.color.PRIMARY_GREEN, position: "absolute", width: "100%", bottom: 0, paddingBottom: 10}}>
                    {
                        bottomSheetHeight == 138 ?
                            <TouchableOpacity
                                style={{ alignSelf: 'center', marginTop: 10, }}
                                onPress={() => setBottomSheetHeight(100) }>
                                <Image
                                    source={require('../../../assets/arrow-down-white.png')}
                                    style={{ width: 16, height: 9, }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{ alignSelf: 'center', marginTop: 10, }}
                                onPress={() => setBottomSheetHeight(100) }>
                                <Image
                                    source={require('../../../assets/arrow-up-white.png')}
                                    style={{ width: 16, height: 9, }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 3 }}>
                        <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, color: '#B7EFC5', fontFamily: "Montserrat-Medium" }}>Item Value</Text>
                        <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, color: '#B7EFC5', fontFamily: "Montserrat-Medium" }}>{getTotalCost()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 3 }}>
                        <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, color: '#B7EFC5', fontFamily: "Montserrat-Medium" }}>Delivery Charges</Text>
                        <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, color: '#B7EFC5', fontFamily: "Montserrat-Medium" }}>Rs. 50</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10 }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.84, lineHeight: 18, fontFamily: "Montserrat-SemiBold", color: props.color.WHITE }}>Total Amount</Text>
                        <Text style={{ fontSize: 14, letterSpacing: 0.84, lineHeight: 18, fontFamily: "Montserrat-SemiBold", color: props.color.WHITE }}>{getTotalCost() + DELIVERY_CHARGE}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, }}>
                        <Text style={{ fontSize: 10, letterSpacing: 0.6, lineHeight: 13, color: '#155D27', fontFamily: "Montserrat-SemiBold" }}>Saved Rs. 110</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("DeliveryAddressStack", {screen: "Delivery Options"})}>
                            <View style={{ paddingHorizontal: 35, paddingVertical: 10, backgroundColor: '#1A7431', borderRadius: 10 }}>
                                <Text style={{ fontSize: 14, letterSpacing: 0.84, lineHeight: 18, fontFamily: "Montserrat-SemiBold", color: props.color.WHITE }}>Checkout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    const theme = color
    return (
        <View style={{ flex: 1, backgroundColor: color.BACKGROUND }}>
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
                    <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Bold" }}>Cart</Text>
                    <Image
                        source={require('../../../assets/search.png')}
                        style={{ width: 15, height: 15, tintColor: theme.WHITE }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {emptyCart() ? <>

            <FlatList
                data={products}
                extraData={products}
                keyExtractor={item => item._id}
                // showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                <View>
                {item.count > 0 ?
                    <View style={{ width: DeviceWidth - 40, flexDirection: 'row', backgroundColor: theme.WHITE, marginVertical: 10, borderRadius: 10 }}>
                        
                        <Image
                            source={require('../../../assets/apple.png')}
                            style={{ width: 129, height: 86 }}
                            resizeMode="contain"
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingVertical: 5 }}>
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 14, lineHeight: 18, fontFamily: "Montserrat-SemiBold", color: theme.TEXT_PRIMARY }}>{item.itemName}</Text>
                                <Text style={{ fontSize: 8, lineHeight: 10, color: theme.TEXT_SECONDARY_LIGHT, fontFamily: "Montserrat-SemiBold" }}>{item.itemPrice}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 15, color: theme.PRIMARY_GREEN, fontFamily: "Montserrat-SemiBold" }}>{item.itemPrice * item.count}</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', paddingRight: 10 }}>
                                <TouchableOpacity onPress={() => deleteItem(index)}>
                                    <Image
                                        source={require('../../../assets/trash-red.png')}
                                        style={{ width: 20, height: 20, alignSelf: 'flex-end' }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => increaseDecreaseCount(index, 1)}>
                                        <Image
                                            source={require('../../../assets/add-btn.png')}
                                            style={{ width: 21, height: 21, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    {
                                        item.count > 0 &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12, lineHeight: 15, color: theme.PRIMARY_GREEN, fontWeight: 'bold', marginHorizontal: 5 }}>{item.count}</Text>
                                            <TouchableOpacity onPress={() => increaseDecreaseCount(index, -1)}>
                                                <Image
                                                    source={require('../../../assets/sub-btn.png')}
                                                    style={{ width: 21, height: 21, }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View> : null}
                    </View>
                }
            />
            <PaymentStatusBottomSheet color={theme} />
            </> :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../../assets/no-orders.png')}
                    style={{ width: 245, height: 185 }}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 16, letterSpacing: 0.96, lineHeight: 25, fontFamily: "Poppins-SemiBold", color: theme.TEXT_SECONDARY, marginTop: 20, marginBottom: 30 }}>Your cart is empty</Text>
                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.PRIMARY_GREEN, borderRadius: 10 }}>
                    <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_WHITE, fontFamily: "Poppins-SemiBold", paddingVertical: 10, paddingHorizontal: 42 }}>Shop Now</Text>
                </View>
            </View>}
        </View>
    )
}

export default Cart

const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PRIMARY_BLUE,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
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
        // borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 14,
        backgroundColor: color.WHITE,
        color: color.TEXT_PRIMARY,
        letterSpacing: 0.5,
        borderRadius: 5,
        // borderColor: color.BORDER_PURPLE
    }
});
