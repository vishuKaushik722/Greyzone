import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import Header from '../../../components/Header'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'

class UpdateEmail extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            email: 'rajaryan@gmail.com',
            emailEditable: true,

        };
    }
    componentDidMount() {
        this.setState({ expertList: [] })
    }
    render() {
        const theme = color;
        const { countryCode } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <Header showHeader showBackBtn headerTxt="Update Email" headerTxtSize={20} />
                <Text style={{ fontSize: 22, letterSpacing: 0.44, lineHeight: 35, color: theme.TEXT_PRIMARY, alignSelf: 'center', fontFamily: "Poppins-Bold", marginTop: 40 }}>Email Address</Text>
                <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_SECONDARY, alignSelf: 'center', textAlign: 'center', fontFamily: "Poppins-Medium" }}>An OTP will be sent to your email address</Text>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignSelf: 'center', borderRadius: 5, marginTop: 50, backgroundColor: theme.WHITE, elevation: 2 }}>
                    <TextInput
                        style={{ flex: 1, fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, paddingHorizontal: 10, fontFamily: "Poppins-Medium" }}
                        value={this.state.email}
                        editable={this.state.emailEditable}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                        outlineColor={color.WHITE}
                        placeholder='Enter Your Phone Number'
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity>
                    <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_WHITE, fontFamily: "Poppins-SemiBold" }}>Proceed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default UpdateEmail
const DeviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 50
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

});