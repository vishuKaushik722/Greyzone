import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Image, Dimensions, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import color from '../../../constants/colors'
import { getRequest, isNetworkConnected, patchRequest, postRequest } from '../../../services/NetworkRequest';
import { setProductsListAction, addToCart } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const SelectProducts = ({route, navigation}) => {

    const [test, setTest] = useState(true);
    const [cat, setCat] = useState("")

    const products = useSelector(state => state.products.productList);
    const cartProducts = useSelector(state => state.products.cartList)
    const dispatch = useDispatch();

    const increaseDecreaseCount = (index, count) => {
        if(!products[index].count) {
            products[index].count = 0;
        }
        products[index].count = products[index].count + count
        console.log('products:', products[index])
        setTest(!test);
    }
    changeIsLiked = (index) => {
        products[index].isLiked = true
        console.log('products:', products)
    }

    const imageHandler = (index) => {
        if(index === 0) {
          return require('../../../assets/apple.png')
        } else if(index === 1) {
          return require('../../../assets/watermelon.png')
        }
        else if(index === 2) {
          return require('../../../assets/strawberry.png')
        }
        else if(index === 3) {
            return require('../../../assets/banana.png')
        } else if(index === 4) {
          return require('../../../assets/orange.png')
        } else if(index === 5) {
            return require('../../../assets/pineapple.png')
        } else if(index === 6) {
            return require('../../../assets/watermelon.png')
        } else {
            return require('../../../assets/apple.png')
        }
      }

      const getCartNumber = () => {
        let totalCost = 0;
        cartProducts.map((item) => {
            if(item.count && item.count > 0) {
                totalCost = totalCost + 1
            }
        })
        return totalCost
    }

    useEffect(() => {
        if(route.params) {
            const { category, item } = route.params;
            setCat(category);
            if(isNetworkConnected) {
                getRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/newItems/items/${category}/${item}`)
                .then((response) => {
                  dispatch(setProductsListAction(response));
                  dispatch(addToCart(response));
                  console.log("RESPONSE", response)
                })
                .catch(err => {
                  console.log(err);
                })
            } else {
                console.log("No Internet");
            }
        }

        // return () => {
        //     console.log("UNMOUNTED")
        //     dispatch(addToCart(products))
        // }
    }, []);

    const theme = color;
    return (
        <View style={{ flex: 1, backgroundColor: color.BACKGROUND }}>
            <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingTop: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 30, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
                    <TouchableOpacity
                        style={{ paddingRight: 5 }}
                        onPress={() => { navigation.goBack() }}>
                        <Image
                            source={require('../../../assets/arrow-left-white2.png')}
                            style={{ width: 16, height: 16, }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Bold" }}>{cat}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("PaymentStack")}>

                        <ImageBackground source={require('../../../assets/cart.png')}
                            style={{ width: 30, height: 30, }}
                            resizeMode="contain">
                                {getCartNumber() === 0 ? null : 
                            <Text style={{alignSelf: "flex-end", paddingBottom: 5, color: "red", fontFamily: "Montserrat-SemiBold"}}>{getCartNumber()}</Text>}
                        </ImageBackground>
                        {/* <Image
                            source={require('../../../assets/cart.png')}
                            style={{ width: 30, height: 30, }}
                            resizeMode="contain"
                        />
                        <Text>2</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={products}
                extraData={products}
                keyExtractor={item => item._id}
                style={{ marginHorizontal: 15 }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                // showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <View style={{ width: (DeviceWidth - 50) / 2, marginHorizontal: 5, height: 180, backgroundColor: theme.WHITE, marginVertical: 10, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => changeIsLiked(index)}>
                            <ImageBackground
                                source={imageHandler(index)}
                                style={{ width: (DeviceWidth - 50) / 2, height: 105 }}
                                resizeMode="stretch"
                            >
                                {
                                    products[index].isLiked ?
                                        <TouchableOpacity onPress={() => changeIsLiked(index)}>
                                            <Image
                                                source={require('../../../assets/like-selected.png')}
                                                style={{ width: 31, height: 31, position: 'absolute', top: 5, right: 5 }}
                                                resizeMod="contain"

                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => changeIsLiked(index)}>
                                            <Image
                                                source={require('../../../assets/like-unselected.png')}
                                                style={{ width: 31, height: 31, position: 'absolute', top: 5, right: 5 }}
                                                resizeMod="contain"
                                            />
                                        </TouchableOpacity>
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ width: (DeviceWidth - 50) / 2, height: 75, paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 14, lineHeight: 18, fontFamily: "Montserrat-SemiBold", color: theme.TEXT_PRIMARY }}>{item.itemName}</Text>
                            <Text style={{ fontSize: 8, lineHeight: 10, color: theme.TEXT_SECONDARY_LIGHT, fontFamily: "Montserrat-SemiBold" }}>{item.itemPrice}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, lineHeight: 15, color: theme.PRIMARY_GREEN, fontFamily: "Montserrat-SemiBold" }}>{item.itemPrice}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => increaseDecreaseCount(index, 1)}>
                                        <Image
                                            source={require('../../../assets/add-btn.png')}
                                            style={{ width: 21, height: 21, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    {
                                    
                                        products[index].count > 0 ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, lineHeight: 15, color: theme.PRIMARY_GREEN, fontWeight: 'bold', marginHorizontal: 5 }}>{products[index].count}</Text>
                                                <TouchableOpacity onPress={() => increaseDecreaseCount(index, -1)}>
                                                    <Image
                                                        source={require('../../../assets/sub-btn.png')}
                                                        style={{ width: 21, height: 21, }}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            : console.log('Nai chal rha')
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>
    )

}

export default SelectProducts;

const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    primaryBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PRIMARY_BLUE,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 30
    },
    textInputContainer: {
        backgroundColor: color.WHITE,
        elevation: 5,
        marginHorizontal: 20,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10
    },
    textInputStyle: {
        // borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 14,
        backgroundColor: color.WHITE,
        color: color.TEXT_PRIMARY,
        letterSpacing: 0.5,
        borderRadius: 5,
        // borderColor: color.BORDER_PURPLE
    }
});
