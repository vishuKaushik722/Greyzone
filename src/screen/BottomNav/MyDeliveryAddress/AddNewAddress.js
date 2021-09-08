import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import SecondaryHeader from '../../../components/SecondaryHeader'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'
import { getRequest, patchRequest, postRequest } from '../../../services/NetworkRequest'
import urls from '../../../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';

class AddNewAddress extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            email: 'rajaryan@gmail.com',
            emailEditable: true,
            nickname: 'Home',
            house: '',
            houseStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            apartment: '',
            apartmentStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            street: '',
            streetStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            landmark: '',
            landmarkStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            area: '',
            areaStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            city: '',
            cityStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            pincode: '',
            pincodeStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },
            emailStyle: {
                elevation: 1,
                borderRadius: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                borderWidth: 1,
                marginBottom: 10,
                borderColor: color.WHITE
            },

        };
    }
    componentDidMount() {
        this.setState({ expertList: [] })
        console.log(this.props.route.params.item)

        if(this.props.route.params.item) {
            this.setState({
                house: this.props.route.params.item.house_no,
                street: this.props.route.params.item.street,
                apartment: this.props.route.params.item.appartment_name,
                pincode: this.props.route.params.item.pincode,
                area: this.props.route.params.item.area,
                city: this.props.route.params.item.city,
                landmark: this.props.route.params.item.landmark
            })
        }
    }
    addNewAddress = async () => {
        const { house, street, landmark, apartment, area, city, pincode, nickname } = this.state
        const responseBody = JSON.stringify({
            house_no: house,
            appartment_name: apartment,
            street: street,
            landmark: landmark,
            area: area,
            city: city,
            pincode: pincode,
            address_type: nickname
        });
        const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
        let response = await patchRequest('https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current/address', responseBody, cookie)
        console.log('response:', response)
        if(this.props.route.params.response) {
            this.props.navigation.navigate("Delivery Options", {data: true});
        } else {
            this.props.navigation.navigate('Delivery Address', {done: true});
        }
    }

    editAddress = async () => {
        const { house, street, landmark, apartment, area, city, pincode, nickname } = this.state
        const editResponseBody = JSON.stringify({
            house_no: house,
            appartment_name: apartment,
            street: street,
            landmark: landmark,
            area: area,
            city: city,
            pincode: pincode,
            address_type: nickname
        });
        const cookie = await AsyncStorage.getItem(storageKeys.COOKIES)
        let response = await patchRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/newUser/current/address/update/${this.props.route.params.item._id}`, editResponseBody, cookie)
        console.log('response:', response)
        if(this.props.route.params.response) {
            this.props.navigation.navigate("Delivery Options", {data: true});
        } else {
            this.props.navigation.navigate('Delivery Address', {done: true});
        }
    }

    render() {
        console.log(this.props.route.params)
        const theme = color;
        const { nickname, house, houseStyle, apartment, apartmentStyle, street, streetStyle, landmark, landmarkStyle, area, areaStyle, city, cityStyle, pincode, pincodeStyle } = this.state
        return (
            <ScrollView style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 20, paddingTop: 20, elevation: 3, paddingBottom: 10 }}>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../../../assets/arrow-left-icon.png')}
                            style={{ width: 18, height: 12, tintColor: theme.BLACK }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, lineHeight: 27, letterSpacing: 1.13, color: theme.TEXT_PRIMARY, fontFamily: "Montserrat-Bold", paddingRight: 32 }}>Add New Address</Text>
                    <Text></Text>
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>House No</Text>
                <View style={{ ...houseStyle, }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={house}
                        onChangeText={(text) => this.setState({ house: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='House No'
                        onFocus={() => { this.setState({ houseStyle: { ...houseStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ houseStyle: { ...houseStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>Apartment Name</Text>
                <View style={{ ...apartmentStyle, }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={apartment}
                        onChangeText={(text) => this.setState({ apartment: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='Apartment Name'
                        onFocus={() => { this.setState({ apartmentStyle: { ...apartmentStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ apartmentStyle: { ...apartmentStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>Street Details</Text>
                <View style={{ ...streetStyle }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={street}
                        onChangeText={(text) => this.setState({ street: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='Street Details'
                        onFocus={() => { this.setState({ streetStyle: { ...streetStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ streetStyle: { ...streetStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>Landmark</Text>
                <View style={{ ...landmarkStyle }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={landmark}
                        onChangeText={(text) => this.setState({ landmark: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='Landmark'
                        onFocus={() => { this.setState({ landmarkStyle: { ...landmarkStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ landmarkStyle: { ...landmarkStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>Area Details</Text>
                <View style={{ ...areaStyle }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={area}
                        onChangeText={(text) => this.setState({ area: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='Area Details'
                        onFocus={() => { this.setState({ areaStyle: { ...areaStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ areaStyle: { ...areaStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>City</Text>
                <View style={{ ...cityStyle }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={city}
                        onChangeText={(text) => this.setState({ city: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        placeholder='City'
                        onFocus={() => { this.setState({ cityStyle: { ...cityStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ cityStyle: { ...cityStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.72, lineHeight: 15, color: theme.TEXT_PRIMARY, marginBottom: 5, marginTop: 5, marginLeft: 20, fontFamily: "Montserrat-SemiBold" }}>Pincode</Text>
                <View style={{ ...pincodeStyle }}>
                    <TextInput
                        style={{ ...styles.textInputStyle2, }}
                        value={pincode.toString()}
                        onChangeText={(text) => this.setState({ pincode: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        multiline
                        keyboardType="number-pad"
                        placeholder='Pincode'
                        onFocus={() => { this.setState({ pincodeStyle: { ...pincodeStyle, borderWidth: 1, borderColor: theme.PRIMARY_GREEN } }) }}
                        onBlur={() => { this.setState({ pincodeStyle: { ...pincodeStyle, borderWidth: 1, borderColor: theme.WHITE } }) }}
                    />
                </View>
                <Text style={{ fontSize: 12, letterSpacing: 0.5, lineHeight: 18, color: theme.TEXT_PRIMARY, marginBottom: 10, marginTop: 20, marginLeft: 20, fontFamily: "Montserrat-Bold" }}>Nickname for Address</Text>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 8, marginBottom: 5, maxHeight: 30, marginHorizontal: 20 }}>
                    <TouchableOpacity style={(nickname == 'Home') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ nickname: 'Home' }) }}>
                        <Text style={(nickname == 'Home') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(nickname == 'Clinic') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ nickname: 'Clinic' }) }}>
                        <Text style={(nickname == 'Clinic') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Clinic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(nickname == 'Other') ? styles.selectedTopButton : styles.topButton} onPress={() => { this.setState({ nickname: 'Other' }) }}>
                        <Text style={(nickname == 'Other') ? styles.selectedTopButtonTxt : styles.topButtonTxt}>Other</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: theme.TEXT_SECONDARY_LIGHT, width: DeviceWidth, marginVertical: 10, marginHorizontal: 20 }}></View>
                {this.props.route.params.item ? <TouchableOpacity onPress={() => this.editAddress()}>
                    <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.59, lineHeight: 18, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Medium" }}>Edit</Text>
                    </View>
                </TouchableOpacity> : <TouchableOpacity onPress={() => this.addNewAddress()}>
                    <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.59, lineHeight: 18, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Medium" }}>Add</Text>
                    </View>
                </TouchableOpacity>}
            </ScrollView>
        )
    }
}

export default AddNewAddress
const DeviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 6,
        marginTop: 40,
        marginBottom: 40,
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
        fontFamily: "Montserrat-SemiBold"
        // borderColor: color.BORDER_PURPLE
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