import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
// import { Chip } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

class AddCard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            email: 'rajaryan@gmail.com',
            emailEditable: true,
            nickname: 'Home',
            house: '',
            nameOnCard: '',
            cardNumber: '',
            expiryDate: '',
            typeOfCard: 'personal',
            text: '',
            disabledBtn: false

        };
    }
    componentDidMount() {
        this.setState({ expertList: [] })
    }
    render() {
        const theme = color;
        const { nickname, nameOnCard, cardNumber, expiryDate, typeOfCard, text, disabledBtn } = this.state
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
                    <Text style={{ fontSize: 18, letterSpacing: 0.76, lineHeight: 22, color: theme.TEXT_PRIMARY, fontWeight: 'bold' }}>Add Card</Text>
                    <View></View>
                </View>
                <Text style={{ fontSize: 16, marginHorizontal: 20, letterSpacing: 0.6, color: theme.TEXT_PRIMARY, marginTop: 20 }}>
                    We accept Credit and Debit card from Visa, Mastercard, RuPay, American Express and Discover
                </Text>
                <TextInput
                    style={{ ...styles.textInputFocusStyle1, color: theme.TEXT_PRIMARY, marginTop: 15 }}
                    value={nameOnCard}
                    onChangeText={(txt) => this.setState({ nameOnCard: txt })}
                    placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                    onFocus={() => { { styles.textInputFocusStyle1 = { borderBottomColor: theme.PRIMARY_GREEN, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    onBlur={() => { { styles.textInputFocusStyle1 = { borderBottomColor: theme.BORDER, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    placeholder='Name on Card'
                />
                <TextInput
                    style={{ ...styles.textInputFocusStyle2, color: theme.TEXT_PRIMARY, marginTop: 15 }}
                    value={cardNumber}
                    onChangeText={(txt) => this.setState({ cardNumber: txt })}
                    placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                    onFocus={() => { { styles.textInputFocusStyle2 = { borderBottomColor: theme.PRIMARY_GREEN, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    onBlur={() => { { styles.textInputFocusStyle2 = { borderBottomColor: theme.BORDER, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    placeholder='Card Number'
                    keyboardType="number-pad"
                />
                <TextInput
                    style={{ ...styles.textInputFocusStyle3, color: theme.TEXT_PRIMARY, marginTop: 15 }}
                    value={expiryDate}
                    onChangeText={(txt) => this.setState({ expiryDate: txt })}
                    placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                    onFocus={() => { { styles.textInputFocusStyle3 = { borderBottomColor: theme.PRIMARY_GREEN, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    onBlur={() => { { styles.textInputFocusStyle3 = { borderBottomColor: theme.BORDER, marginHorizontal: 20, borderBottomWidth: 1 } } }}
                    placeholder='Expiry Date (MM/YY)'
                />
                <Text style={{ marginHorizontal: 20, fontWeight: 'bold', fontSize: 12, letterSpacing: 0.5, color: theme.TEXT_PRIMARY, marginTop: 20 }}>Nickname for Card</Text>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 8, marginBottom: 5, maxHeight: 30, marginHorizontal: 20 }}>
                    <TouchableOpacity style={(typeOfCard == 'personal') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ typeOfCard: 'personal' }) }}>
                        <Text style={(typeOfCard == 'personal') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(typeOfCard == 'business') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ typeOfCard: 'business' }) }}>
                        <Text style={(typeOfCard == 'business') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Business</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(typeOfCard == 'other') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ typeOfCard: 'other' }) }}>
                        <Text style={(typeOfCard == 'other') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Other</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: theme.TEXT_SECONDARY_LIGHT, marginHorizontal: 20, marginVertical: 30, opacity: 0.33 }}></View>
                <Text style={{ fontSize: 12, marginHorizontal: 20, letterSpacing: 0.5, color: theme.TEXT_SECONDARY_LIGHT }}>
                    We will save your card for convenience. If required, you can remove the card from in 'Wallet' section. We do not store CVV.
                </Text>
                <TouchableOpacity disabled={nameOnCard.trim() === '' || cardNumber.trim() === '' || expiryDate.trim() === ''} onPress={() => this.props.navigation.navigate('Delivery Address')}>
                    <View style={{ ...styles.primaryBtn, backgroundColor: false ? theme.GREY_DARK : theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Add Card</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
}

export default AddCard
const DeviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 5,
        marginVertical: 40
    },
    textInputStyle: {
        borderRadius: 5,
        paddingHorizontal: 5,
        fontSize: 15,
        width: 291
    },
    textInputFocusStyle1: {
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderBottomColor: color.BORDER,
    },
    textInputFocusStyle2: {
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderBottomColor: color.BORDER,

    },
    textInputFocusStyle3: {
        borderBottomWidth: 1,
        marginHorizontal: 20,
        borderBottomColor: color.BORDER,
    },
    topButton: {
        flex: 1 / 3,
        alignItems: 'center',
        backgroundColor: color.WHITE,
        marginHorizontal: 5,
        paddingVertical: 5,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: color.PRIMARY_GREEN,
        borderWidth: 1
    },
    topButtonTxt: {
        color: color.PRIMARY_GREEN,
        fontSize: 12
    },
    selectedTopButton: {
        flex: 1 / 3,
        alignItems: 'center',
        backgroundColor: color.PRIMARY_GREEN,
        marginHorizontal: 5,
        paddingVertical: 5,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: color.PRIMARY_GREEN,
        borderWidth: 1
    },
    selectedTopButtonTxt: {
        color: color.WHITE,
        fontSize: 12
    },

});