import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ headerTxt, showBackBtn, showHeader, headerTxtSize, }) {
    const navigation = useNavigation()
    return (
        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            {
                showBackBtn &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={headerTxtSize + 2} />
                </TouchableOpacity>
            }
            {
                showHeader &&
                <View style={{ marginLeft: showBackBtn ? 10 : 0 }}>
                    <Text style={{ fontSize: headerTxtSize, color: colors.TEXT_PRIMARY, letterSpacing: 0.72, fontWeight: 'bold' }}>{headerTxt}</Text>
                </View>
            }
        </View>
    )
}
