import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import color from '../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default function DropDownComponent({ dropDownWidth, placeholderTxt, textSize, upperContainerHeight, open, value, items, setOpen, setItems, setValue }) {

    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    // ]);
    // useEffect(() => {
    //     setItems(listItems)
    //   }, []); 
    return (
        <View style={{ marginHorizontal: 10 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                closeAfterSelecting={true}
                placeholder={placeholderTxt}
                ArrowUpIconComponent={({ style }) => <Image
                    source={require("../assets/arrow-orange-up.png")}
                    style={{ height: textSize + 2, width: textSize + 2, marginHorizontal: 5, tintColor: color.DARK_BLUE }}
                    resizeMode="contain"
                />}
                ArrowDownIconComponent={({ style }) => <Image
                    source={require("../assets/arrow-orange-down.png")}
                    style={{ height: textSize + 2, width: textSize + 2, marginHorizontal: 5, tintColor: color.DARK_BLUE }}
                    resizeMode="contain"
                />}
                TickIconComponent={({ style }) => <Icon
                    name={'radiobox-marked'}
                    size={20}
                    color={color.DARK_BLUE}
                />}
                placeholderStyle={{
                    color: color.TEXT_SECONDARY,
                    fontSize: textSize
                }}
                dropDownContainerStyle={{
                    backgroundColor: color.WHITE,
                    marginTop: 10,
                    borderRadius: 0,
                    borderWidth: 0.1,
                    borderColor: color.BORDER,
                    elevation: 2,
                    borderRadius: 5

                }}
                selectedItemLabelStyle={{
                    fontSize: textSize
                }}
                listItemLabelStyle={{
                    fontSize: textSize
                }}
                textStyle={{
                    fontSize: textSize
                }}
                style={{
                    backgroundColor: color.WHITE,
                    borderRadius: 0,
                    borderWidth: 0.1,
                    borderColor: color.BORDER,
                    elevation: 2,
                    borderRadius: 5,
                    height: upperContainerHeight

                }}
                containerStyle={{
                    width: dropDownWidth
                }}
            />
        </View>
    )
}