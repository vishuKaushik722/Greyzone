import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import Header from '../../../components/Header'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'

class UpdatePhoneNumber extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            countryCode: '',
            countryCodeList: [
                { label: '+91', value: '01' },
                { label: '+01', value: '02' },
                { label: '1-809', value: '05' },
                { label: '+12', value: '03' }
            ],
            phoneNo: '784569874123',
            phoneNoEditable: true,
            open: false,
            value: '',

        };
    }
    componentDidMount() {
        this.setState({ expertList: [] })
    }
    setOpen(open) {
        this.setState({
            open
        });
        console.log(this.state.value)
    }
    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setCountryCodeList(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }
    render() {
        const theme = color;
        const { countryCode } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <Header showHeader showBackBtn headerTxt="Update Phone Number" headerTxtSize={20} />
                <Text style={{ fontSize: 22, letterSpacing: 0.44, lineHeight: 35, color: theme.TEXT_PRIMARY, alignSelf: 'center', fontWeight: 'bold', marginTop: 30 }}>Phone Number</Text>
                <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_SECONDARY, alignSelf: 'center', textAlign: 'center' }}>An OTP will be sent to your Phone Number</Text>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignSelf: 'center', borderRadius: 5, marginTop: 50 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <DropDownComponent
                            dropDownWidth={80}
                            open={this.state.open}
                            value={this.state.value}
                            setOpen={(e) => this.setOpen(e)}
                            setValue={(e) => this.setValue(e)}
                            setItems={(e) => this.setCountryCodeList(e)}
                            items={this.state.countryCodeList}
                            placeholderTxt=""
                            textSize={12}
                            upperContainerHeight={30} />
                    </View>
                    <TextInput
                        style={{ flex: 1, fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, backgroundColor: theme.WHITE, borderRadius: 5 }}
                        value={this.state.phoneNo}
                        editable={this.state.phoneNoEditable}
                        onChangeText={(text) => this.setState({ phoneNo: text })}
                        placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                        outlineColor={color.WHITE}
                        placeholder='Enter Your Phone Number'
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Confirm Update')}>
                    <View style={{ ...styles.primaryBtn, backgroundColor: theme.PRIMARY_GREEN }}>
                        <Text style={{ fontSize: 14, letterSpacing: 0.28, lineHeight: 21, color: theme.TEXT_WHITE, fontWeight: 'bold' }}>Proceed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default UpdatePhoneNumber
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