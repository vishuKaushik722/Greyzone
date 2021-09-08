import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export default function SecondaryHeader({ headerTxt, showBackBtn, showHeader, headerTxtSize }) {
    const navigation = useNavigation()
    return (
        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            {
                showBackBtn &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/arrow-left-white.png')}
                        style={{ width: 11, height: 17, tintColor: colors.TEXT_PRIMARY }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            }
            {
                showHeader &&
                <View style={{ marginLeft: showBackBtn ? 22 : 0 }}>
                    <Text style={{ fontSize: headerTxtSize, color: colors.TEXT_PRIMARY, letterSpacing: 0.72, fontWeight: 'bold' }}>{headerTxt}</Text>
                </View>
            }
        </View>
    )
}
