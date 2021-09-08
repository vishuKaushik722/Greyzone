import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Header from '../../../components/Header'

class PaymentOptions extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cardList: [
                {
                    id: 1,
                    type: 'Personal',
                    cardNumber: '8955XXXXXXXX6548',
                    company: 'master-card',
                    image: require('../../../assets/master-card.png')
                },
                {
                    id: 2,
                    type: 'Personal',
                    cardNumber: '8955XXXXXXXX6548',
                    company: 'visa',
                    image: require('../../../assets/visa.png')
                }
            ],
            upiList: [
                {
                    id: 1,
                    type: 'Personal',
                    name: 'Google Pay',
                    cardNumber: '8955XXXXXXXX6548',
                    company: 'master-card',
                    image: require('../../../assets/g-pay.png')
                },
                {
                    id: 2,
                    type: 'Personal',
                    name: 'Paytm UPI',
                    cardNumber: '8955XXXXXXXX6548',
                    company: 'visa',
                    image: require('../../../assets/paytm.png')
                },
                {
                    id: 3,
                    type: 'Personal',
                    name: 'Phone Pe UPI',
                    cardNumber: '8955XXXXXXXX6548',
                    company: 'visa',
                    image: require('../../../assets/phone-pe.png')
                }]
        }
    }
    render() {
        const theme = color;
        const { upiList, cardList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.WHITE }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../../../assets/back-arrow.png')}
                            style={{ width: 15, height: 15, }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, letterSpacing: 0.76, lineHeight: 22, color: theme.TEXT_PRIMARY, fontWeight: 'bold' }}>Payment Options</Text>
                    <View></View>
                </View>
                <View>
                    <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, letterSpacing: 1, paddingHorizontal: 20 }}>Cards</Text>
                    <FlatList
                        data={cardList}
                        extraData={cardList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Image
                                            source={item.image}
                                            style={{ width: 47, height: item.company === 'master-card' ? 25 : 47, }}
                                            resizeMode="contain"
                                        />
                                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>{item.type}</Text>
                                            <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>{item.cardNumber}</Text>
                                        </View>
                                    </View>
                                    <Image
                                        source={require('../../../assets/3-dots-vertical.png')}
                                        style={{ width: 4, height: 14, marginRight: 10 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginVertical: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5 }}>
                            <Image
                                source={require('../../../assets/credit-card.png')}
                                style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6, lineHeight: 18, marginLeft: 10 }}>Add Credit and Debit Cards</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Add Card') }}>
                            <Image
                                source={require('../../../assets/arrow-right-grey.png')}
                                style={{ width: 8, height: 13, marginRight: 10 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: theme.TEXT_SECONDARY_DARK, marginHorizontal: 20, marginVertical: 30, opacity: 0.33 }}></View>
                    <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, letterSpacing: 1, paddingHorizontal: 20 }}>UPI</Text>
                    <FlatList
                        data={upiList}
                        extraData={upiList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, alignItems: 'center', marginVertical: 20 }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 55, height: 25 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12, color: theme.TEXT_PRIMARY, letterSpacing: 0.6 }}>{item.name}</Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }
}

export default PaymentOptions
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('window').height;