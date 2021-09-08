import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Drawer, Text } from 'react-native-paper'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { getRequest } from '../services/NetworkRequest';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../constants/storageKeys';
import { changeLoginStatus } from '../redux/actions';


const DEVICE_HEIGHT = Dimensions.get("window").height;

const DrawerContent = (props) => {

    const [user, setUser] = useState({})

    const logout = async () => {
        let removeItem = []; //add key you don't want to delete on logout
        let keys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < removeItem.length; i++) {
          keys.splice(keys.indexOf(removeItem[i]), 1);
        }
        await AsyncStorage.multiRemove(keys);
        dispatch(changeLoginStatus(false));
        // props.navigation.navigate("LoginStack")
      };

    const getDetails = async () => {
        const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
        const data = await getRequest("https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current", cookie);
        setUser(data);
    }

    useEffect(() => {
        getDetails();
    }, [])

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{paddingLeft: 20, paddingTop: 20}}>
                        <Text style={styles.textStyle}>Greyzon.in</Text>
                    </View>

                    <View style={styles.mainContainer}>
                        
                            <Image
                                source={require('../assets/expert-2.png')}
                                style={{width: 57, height: 57, borderRadius: 50}}
                            />
                        <View style={{marginLeft: 13}}>
                            <Text style={{color: "#FFFFFF", fontSize: 16, fontFamily: "Montserrat-SemiBold"}}>{user.name}</Text>
                            <Text style={{color: "#92E6A7", fontFamily: "Montserrat-SemiBold"}}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={{borderWidth: 0}}>
                    <DrawerItem 
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                            source={require('../assets/home.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    <DrawerItem
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                                source={require('../assets/account.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="Profile"
                        onPress={() => {props.navigation.navigate('ProfileStack')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    <DrawerItem 
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                                source={require('../assets/category.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="Category"
                        onPress={() => {props.navigation.navigate('CategoryStack')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    <DrawerItem 
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                                source={require('../assets/Orders.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="Orders"
                        onPress={() => {props.navigation.navigate('OrdersStack')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    <DrawerItem 
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                                source={require('../assets/my-delivery.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="My Delivery Address"
                        onPress={() => {props.navigation.navigate('DeliveryAddressStack')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    <DrawerItem
                        style={{marginVertical: 0}}
                        icon={({color, size}) => (
                            <Image
                                source={require('../assets/my-payment.png')}
                                style={{ width: 20, height: 20}}
                            />
                        )}
                        label="My Payment"
                        onPress={() => {props.navigation.navigate('PaymentStack')}}
                        labelStyle={{color: "#10451D", fontFamily: "Montserrat-Medium"}}
                    />
                    
                </Drawer.Section>

                <Drawer.Section title="Support" style={{marginTop: DEVICE_HEIGHT/6.6, borderTopWidth: 0}}>
                    <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                    source={require('../assets/terms-conditions.png')}
                                    style={{ width: 20, height: 20}}
                                />
                            )}
                            label="Terms & Policies"
                            onPress={() => {}}
                            labelStyle={{color: "#292323", fontFamily: "Montserrat-Medium"}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image
                                    source={require('../assets/contact-us.png')}
                                    style={{ width: 20, height: 20}}
                                />
                            )}
                            label="Contact Us"
                            onPress={() => {}}
                            labelStyle={{color: "#2DC653", fontFamily: "Montserrat-Medium"}}
                        />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomItems}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Image
                            source={require('../assets/logout-png.png')}
                            style={{ width: 20, height: 20}}
                        />
                    )}
                    label="Log Out"
                    labelStyle={{color: "#292323", fontFamily: "Montserrat-Medium"}}
                    onPress={() => logout()}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        backgroundColor: "#2DC653",
        paddingBottom: 25,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },
    mainContainer: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingTop: 35,
        alignItems: "center"
    },
    bottomItems: {
        paddingTop: 10,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 0,
        paddingBottom: 20
    },
    textStyle: {
        fontSize: 26,
        color: "#ffffff",
        fontFamily: "Philosopher-Bold"
    }
})

export default DrawerContent;