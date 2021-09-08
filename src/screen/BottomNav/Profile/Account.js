import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, SafeAreaView, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import color from '../../../constants/colors';
import { Chip } from 'react-native-paper';
import SecondaryHeader from '../../../components/SecondaryHeader'
import DatePicker from 'react-native-datepicker'
import DropDownComponent from '../../../components/DropDownComponent'

class Account extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Account',
            name: 'Raj Aryan',
            nameEditable: false,
            dob: new Date(),
            today: new Date(),
            phoneNo: '7885524654',
            phoneNoEditable: false,
            email: 'rajaryan@gmail.com',
            emailEditable: false,
            address: 'Street No.12 Borivali East Mumbai.',
            addressEditable: false,
            genderList: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
            ],
            open: false,
            value: '',

        };
    }
    componentDidMount() {
        // this.setState({ expertList: [] })
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

    setGenderList(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    render() {
        const theme = color;
        const { expertList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
                <SecondaryHeader showHeader showBackBtn headerTxt="Account" headerTxtSize={22} />
                <ScrollView>
                    <TouchableOpacity>
                        <View style={{ alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
                            <Image
                                source={require('../../../assets/expert-1.png')}
                                style={{ height: 110, width: 110 }}
                                resizeMode="contain"
                            />
                            <Image
                                source={require('../../../assets/edit.png')}
                                style={{ height: 20, width: 20, position: 'absolute', right: 7, bottom: 10 }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>NAME</Text>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 25, backgroundColor: theme.WHITE, elevation: 2, alignItems: 'center', paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/edit.png')}
                                style={{ height: 20, width: 20, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={{ fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, flex: 1 }}
                            value={this.state.name}
                            editable={this.state.nameEditable}
                            onChangeText={(text) => this.setState({ name: text })}
                            placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                            outlineColor={color.WHITE}
                            placeholder='Enter Your Name'
                        />
                    </View>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>GENDER</Text>
                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                        <DropDownComponent
                            dropDownWidth={DeviceWidth - 50}
                            open={this.state.open}
                            value={this.state.value}
                            setOpen={(e) => this.setOpen(e)}
                            setValue={(e) => this.setValue(e)}
                            setItems={(e) => this.setGenderList(e)}
                            items={this.state.genderList}
                            placeholderTxt="Select Gender"
                            textSize={14}
                            upperContainerHeight={50} />
                    </View>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>DATE OF BIRTH</Text>
                    <View style={{ marginHorizontal: 25, backgroundColor: theme.WHITE, elevation: 2, borderRadius: 5, height: 48, justifyContent: 'center', marginBottom: 10 }}>
                        <DatePicker
                            style={{ width: DeviceWidth - 60 }}
                            date={this.state.dob}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate={this.state.today}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconSource={require('../../../assets/calendar.png')}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    marginLeft: 0,
                                    height: 16,
                                    width: 16
                                },
                                dateInput: {
                                    marginLeft: 10,
                                    borderWidth: 0,
                                    position: 'absolute',
                                    left: 0,
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ dob: date }) }}
                        />
                    </View>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>PHONE NUMBER</Text>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 25, backgroundColor: theme.WHITE, elevation: 2, alignItems: 'center', paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Update Phone Number')}>
                            <Image
                                source={require('../../../assets/edit.png')}
                                style={{ height: 20, width: 20, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={{ fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, flex: 1 }}
                            value={this.state.phoneNo}
                            editable={this.state.phoneNoEditable}
                            onChangeText={(text) => this.setState({ phoneNo: text })}
                            placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                            outlineColor={color.WHITE}
                            placeholder='Enter Your Phone Number'
                        />
                    </View>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>EMAIL</Text>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 25, backgroundColor: theme.WHITE, elevation: 2, alignItems: 'center', paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Update Email')}>
                            <Image
                                source={require('../../../assets/edit.png')}
                                style={{ height: 20, width: 20, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={{ fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, flex: 1 }}
                            value={this.state.email}
                            editable={this.state.emailEditable}
                            onChangeText={(text) => this.setState({ email: text })}
                            placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                            outlineColor={color.WHITE}
                            placeholder='Enter Your Email'
                        />
                    </View>
                    <Text style={{ fontSize: 12, letterSpacing: 0.24, lineHeight: 18, color: theme.TEXT_PRIMARY, marginLeft: 25, fontWeight: 'bold', marginBottom: 10 }}>ADDRESS</Text>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 25, backgroundColor: theme.WHITE, elevation: 2, alignItems: 'center', paddingHorizontal: 20, borderRadius: 5, marginBottom: 10 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/edit.png')}
                                style={{ height: 20, width: 20, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={{ fontSize: 14, letterSpacing: 0.28, color: color.TEXT_PRIMARY, flex: 1 }}
                            value={this.state.address}
                            editable={this.state.addressEditable}
                            onChangeText={(text) => this.setState({ address: text })}
                            placeholderTextColor={color.TEXT_SECONDARY_LIGHT}
                            outlineColor={color.WHITE}
                            placeholder='Enter Your Address'
                        />
                    </View>
                    <View style={{ height: 100 }}></View>
                </ScrollView>
            </View>
        )
    }
}

export default Account;
const DeviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PRIMARY_TINT,
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 6,
        marginVertical: 30
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