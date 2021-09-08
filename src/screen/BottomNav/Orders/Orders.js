import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../constants/colors'
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView, } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';
import { getRequest } from '../../../services/NetworkRequest';

class Orders extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            searchTxt: '',
            ordersList: [
                
            ]
        }
    }

    getAllOrdersOfUser = async () => {
        try {
            const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
            console.log(cookie);

            const response = await getRequest('https://softezi-greyzon-rishav.herokuapp.com/v1/orders/current', cookie)
            this.setState({ordersList: response});
        } catch(err) {
            console.log(err);
        }
    }

    getCost = (item) => {
        let totalPrice = 0;
        item.items.map(price => {
            totalPrice = totalPrice + price.item_total_price;
        });
        return totalPrice;
    }

    componentDidMount() {
        this.getAllOrdersOfUser();
    }

    changeShowSubCategories = (index) => {
        const { categoryList } = this.state
        console.log('categoryList[index].showSubCategories before:', categoryList[index].showSubCategories)
        categoryList[index].showSubCategories === true ? (categoryList[index].showSubCategories = false) : (categoryList[index].showSubCategories = true)
        console.log('categoryList[index].showSubCategories:', categoryList[index].showSubCategories)
        this.setState({ categoryList })
    }
    render() {
        const theme = color
        const { searchTxt } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../../../assets/back-arrow.png')}
                            style={{ width: 12, height: 12, }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, letterSpacing: 0.48, lineHeight: 25, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-SemiBold"   }}>Orders</Text>
                    <View></View>
                </View>
                {
                    this.state.ordersList.length == 0 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/no-orders.png')}
                                style={{ width: 245, height: 185 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 16, letterSpacing: 0.96, lineHeight: 25, fontFamily: "Poppins-SemiBold", color: theme.TEXT_SECONDARY, marginTop: 20, marginBottom: 30 }}>You have no orders</Text>
                            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.PRIMARY_GREEN, borderRadius: 10 }}>
                                <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_WHITE, fontFamily: "Poppins-SemiBold", paddingVertical: 10, paddingHorizontal: 42 }}>Shop Now</Text>
                            </View>
                        </View>
                        :
                        <FlatList
                            data={this.state.ordersList}
                            extraData={this.state.ordersList}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ marginHorizontal: 20 }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Orders Details', item)}>
                                    <View style={{ width: DeviceWidth - 40, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: theme.WHITE, elevation: 2, borderRadius: 5, marginVertical: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, fontFamily: "Poppins-SemiBold", color: theme.TEXT_PRIMARY }}>Mon 26 Jul 2021</Text>
                                            <Image
                                                source={require('../../../assets/arrow-right-circle.png')}
                                                style={{ width: 17, height: 17 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>{item._id}</Text>
                                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Medium" }}>Rs. {this.getCost(item)}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                                            <Text style={{ fontSize: 10, letterSpacing: 0.3, lineHeight: 10, color: theme.TEXT_PRIMARY, fontFamily: "Poppins-Regular" }}>{item.items.length} items</Text>
                                            <Text style={{ fontSize: 10, letterSpacing: 0.3, lineHeight: 10, color: theme.ATT_RED, fontFamily: "Poppins-Regular" }}>{item.order_status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                }
            </View>
        )
    }
}

export default Orders

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
