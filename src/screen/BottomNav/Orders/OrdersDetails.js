import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../constants/colors'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView, } from 'react-native-gesture-handler';

class OrdersDetails extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            orderItems: [],
            orderSummary: {},
            user: {}
        }
    }

    componentDidMount() {
        this.setState({orderSummary: this.props.route.params})
        this.setState({user: this.props.route.user})
        this.setState({orderItems: this.props.route.params.items})
    }

    getDetail = (item) => {
        let quantity = 0;
        if(item === "quantity") {
            this.state.orderItems.map(item => {
                quantity = quantity + item.item_quantity
            })
    
            return quantity;
        }

        if(item === "total") {
            this.state.orderItems.map(item => {
                quantity = quantity + item.item_total_price
            })
    
            return quantity;
        }
    }

    imageHandler = (index) => {
        if(index === 0) {
          return require('../../../assets/apple.png')
        } else if(index === 1) {
          return require('../../../assets/watermelon.png')
        }
        else if(index === 2) {
          return require('../../../assets/orange.png')
        } else {
          return require('../../../assets/strawberry.png')
        }
      }
    
    changeShowSubCategories = (index) => {
        const { categoryList } = this.state
        console.log('categoryList[index].showSubCategories before:', categoryList[index].showSubCategories)
        categoryList[index].showSubCategories === true ? (categoryList[index].showSubCategories = false) : (categoryList[index].showSubCategories = true)
        console.log('categoryList[index].showSubCategories:', categoryList[index].showSubCategories)
        this.setState({ categoryList })
    }

    OrderSummaryPage = (props) => {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: props.color.BACKGROUND }}>
                <View style={{ marginHorizontal: 20, marginVertical: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 10, letterSpacing: 2, lineHeight: 16, color: props.color.TEXT_PRIMARY, fontFamily: "Poppins-Regular" }}>DELIVERY SLOT</Text>
                    <View style={{ backgroundColor: props.color.WHITE, paddingVertical: 12, paddingHorizontal: 10, marginVertical: 3, borderRadius: 5 }}>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-SemiBold" }}>{this.state.orderSummary.createdAt}</Text>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>02:30 PM - 04:30 PM</Text>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>Order Status: {this.state.orderSummary.order_status}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Text style={{ fontSize: 10, letterSpacing: 2, lineHeight: 16, color: props.color.TEXT_PRIMARY, fontFamily: "Poppins-Regular" }}>ADDRESS</Text>
                    <View style={{ backgroundColor: props.color.WHITE, paddingVertical: 12, paddingHorizontal: 10, marginVertical: 3, borderRadius: 5 }}>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-SemiBold" }}>{this.props.route.params.user.name}</Text>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>{`${this.props.route.params.order_address.appartment_name} - ${this.props.route.params.order_address.area}`} </Text>
                        <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>{this.props.route.params.user.phone}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Text style={{ fontSize: 10, letterSpacing: 2, lineHeight: 16, color: props.color.TEXT_PRIMARY, fontFamily: "Poppins-Regular" }}>PAYMENT DETAILS</Text>
                    <View style={{ backgroundColor: props.color.WHITE, paddingVertical: 12, paddingHorizontal: 10, marginVertical: 3, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Order no: </Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>{this.state.orderSummary._id}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Payment options</Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>Cash On Delivery</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Order Quantity</Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>{this.getDetail("quantity")}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Sub Total</Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>{this.getDetail("total")}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Delivery Charges</Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-Medium" }}>50</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#000A02", fontFamily: "Poppins-Medium" }}>Total</Text>
                            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 18, color: "#011F07", fontFamily: "Poppins-SemiBold" }}>{this.getDetail("total") + 50}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    OrderItemPage = (props) => {
        return (
            <View style={{ flex: 1, backgroundColor: props.color.BACKGROUND }}>
                <FlatList
                    data={this.state.orderItems}
                    extraData={this.state.orderItems}
                    keyExtractor={item => item.item_id}
                    style={{ marginHorizontal: 20, marginTop: 10 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={{ backgroundColor: props.color.WHITE, height: 86, borderRadius: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={this.imageHandler(index)}
                                style={{ width: 129, height: 86 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 14, letterSpacing: 0, lineHeight: 18, color: props.color.TEXT_PRIMARY, fontFamily: 'Montserrat-SemiBold' }}>{item.item_name}</Text>
                                <Text style={{ fontSize: 8, letterSpacing: 0, lineHeight: 10, color: props.color.TEXT_SECONDRY_LIGHT, fontFamily: 'Montserrat-SemiBold' }}>₹ {item.item_total_price / item.item_quantity} per piece</Text>
                                <Text style={{ fontSize: 12, letterSpacing: 0, lineHeight: 15, color: props.color.PRIMARY_GREEN, fontFamily: 'Montserrat-SemiBold' }}>₹ {item.item_total_price}</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
    render() {
        console.log(this.state.orderSummary);
        const theme = color
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
                    <Text style={{ fontSize: 16, letterSpacing: 0.48, lineHeight: 25, color: theme.TEXT_PRIMARY, fontWeight: 'bold' }}>Orders Details</Text>
                    <View></View>
                </View>
                <ScrollableTabView
                    tabBarTextStyle={{ ...styles.tabBarTextStyle }}
                    tabBarInactiveTextColor={theme.TEXT_PRIMARY}
                    tabBarActiveTextColor={theme.TEXT_PRIMARY}
                    tabBarUnderlineStyle={{ backgroundColor: theme.PRIMARY_GREEN, width: DeviceWidth / 3, height: 2.5, marginLeft: DeviceWidth / 12 }}
                    initialPage={0}>
                    <this.OrderSummaryPage color={theme} tabLabel="Summary" />
                    <this.OrderItemPage color={theme} tabLabel="Items" />
                </ScrollableTabView>

            </View>
        )
    }
}

export default OrdersDetails

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
    },
    topButtonTxt: {
        color: color.PRIMARY_GREEN
    },

});
