import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import SecondaryHeader from '../../../components/SecondaryHeader'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

class Payment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            checked: 'cod',
            addressList: [
                {
                    type: 'Home',
                    name: 'Adam Steve',
                    building: 'Flat 102 Sky Apartment',
                    location: 'Near Caffee Day ',
                    pincode: 'Boston 649846564'
                },
            ]

        };
    }
    componentDidMount() {
        this.setState({ expertList: [] })
    }
    render() {
        const theme = color;
        const { countryCode, email, emailStyle, checked } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingTop: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ paddingRight: 5 }}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Image
                                source={require('../../../assets/arrow-left-white2.png')}
                                style={{ width: 16, height: 16, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Payment</Text>
                        <View></View>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: theme.BACKGROUND, width: DeviceWidth, }}>
                    <Text style={{ fontSize: 18, letterSpacing: 0.54, color: theme.TEXT_PRIMARY, paddingHorizontal: 20, fontWeight: 'bold', paddingVertical: 26 }}>Select Payment Mode</Text>
                    <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, letterSpacing: 1, paddingHorizontal: 20 }}>Cards</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'master-card' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'master-card' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/master-card.png')}
                            style={{ width: 47, height: 25, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Personal</Text>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>8955XXXXXXXX6548</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'visa' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'visa' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/visa.png')}
                            style={{ width: 41, height: 42, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Personal</Text>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>8955XXXXXXXX6548</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, letterSpacing: 1, paddingHorizontal: 20 }}>UPI</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'g-pay' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'g-pay' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/g-pay.png')}
                            style={{ width: 55, height: 25, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Google Pay</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'paytm' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'paytm' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/paytm.png')}
                            style={{ width: 55, height: 25, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Google Pay</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'phone-pe' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'phone-pe' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/phone-pe.png')}
                            style={{ width: 55, height: 25, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Phone Pe UPI</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'upi' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'upi' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <Image
                            source={require('../../../assets/upi.png')}
                            style={{ width: 55, height: 25, marginLeft: 30 }}
                            resizeMode="contain"
                        />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Pay via UPI</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, letterSpacing: 1, paddingHorizontal: 20 }}>COD</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        {
                            checked == 'cod' ?
                                <Image
                                    source={require('../../../assets/radio-btn-checked.png')}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain"

                                />
                                :
                                <TouchableOpacity onPress={() => this.setState({ checked: 'cod' })}>
                                    <Image
                                        source={require('../../../assets/radio-btn-unchecked.png')}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                        }
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Cash On Delivery</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.36, fontWeight: 'bold', paddingHorizontal: 20, marginVertical: 16 }}>Add Payment method</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/credit-card.png')}
                                style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>Add Credit and Debit Cards</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddCard') }}>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.TEXT_SECONDARY_DARK} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                        <Image
                            source={require('../../../assets/tags.png')}
                            style={{ width: 20, height: 20, }}
                            resizeMode="contain"
                        />
                        <Text style={{ color: theme.GREEN, fontSize: 10, letterSpacing: 0.3, marginLeft: 20 }}>DIS22 Applied</Text>
                    </View> */}
                    <TouchableOpacity>
                        <View style={{ ...styles.paymentBtn, backgroundColor: '#10451D' }}>
                            <Text style={{ fontSize: 14, color: theme.TEXT_WHITE, fontWeight: 'bold', letterSpacing: 0.42 }}>Proceed</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default Payment
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
    },
    paymentBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 10
    },

});