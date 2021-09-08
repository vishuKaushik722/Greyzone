import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import Header from '../../../components/Header'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

class ConfirmUpdate extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            email: 'rajaryan@gmail.com',
            emailEditable: true,
            otpValue: ''

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
                <Header showHeader showBackBtn headerTxt="Update Phone Number" headerTxtSize={20} />
                <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_SECONDARY, alignSelf: 'center', textAlign: 'center', marginHorizontal: 40, marginTop: 40, marginBottom: 20 }}>Please enter code we just sent to +91-784569874123 to proceed</Text>
                <View style={{ marginHorizontal: 10 }}>
                    <CodeField
                        // ref={ref}
                        value={this.state.otpValue}
                        onChangeText={otpValue => {
                            this.setState({ otpValue: otpValue })
                            // this.verifyOtp(otpValue)
                        }}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
                <TouchableOpacity>
                    <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Verify</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_SECONDARY, alignSelf: 'center', textAlign: 'center' }}>Didn't receive OTP?
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: '#1A7431', fontWeight: 'bold' }}> Resend</Text>
                </Text>
            </View>
        )
    }
}

export default ConfirmUpdate
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
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: color.BORDER_LIGHT,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    focusCell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: color.PRIMARY_GREEN,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },


});