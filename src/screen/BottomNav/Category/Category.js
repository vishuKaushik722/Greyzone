import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity, Pressable, ImageBackground } from 'react-native'
import color from '../../../constants/colors'
import { getRequest, isNetworkConnected } from '../../../services/NetworkRequest';
import urls from '../../../constants/urls';
import {connect} from 'react-redux';

class Category extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            searchTxt: '',
            jj: false,
            categoryList: [],
            subcategoryList: [], 
			category: "",
            showSubCategoriesList : [{showSubCategories: false}, {showSubCategories: false}, {showSubCategories: false}]
        }
    }
    changeShowSubCategories = (item, index) => {

        const { categoryList, showSubCategoriesList} = this.state;
        
        showSubCategoriesList[index].showSubCategories = !showSubCategoriesList[index].showSubCategories;
    
        if(showSubCategoriesList[index].showSubCategories) {

					this.setState({category: item})

            getRequest(`https://softezi-greyzon-rishav.herokuapp.com/v1/newItems/category/${item}`)
            .then((response) => {
                console.log("SUB CATEGORIES", response);
                this.setState({subcategoryList: response.Subcategories})
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            this.setState({subcategoryList: []});
        }
    }

    imageHandler = (index) => {
        if(index === 0) {
          return require('../../../assets/grocery.png')
        } else if(index === 1) {
          return require('../../../assets/home-kitchen.png')
        } else {
          return require('../../../assets/grocery.png')
        }
      }

      subImageHandler = (item) => {
        if(item === "Foodgrains, Oil & Masala") {
          return require('../../../assets/foodgrains-oil.png')
        } else if(item === "Fruits, & Vegetables") {
          return require('../../../assets/fruits-vegetables.png')
        }
        else if(item === "Dairy & Bakery") {
          return require('../../../assets/dairy.png')
        }
        else if(item === "Snack Station") {
            return require('../../../assets/snack.png')
        }
        else if(item === "Beverage Corner") {
            return require('../../../assets/beverage.png')
        }
        else if(item === "Instant Ready Food") {
            return require('../../../assets/instant-ready.png')
        }
        else if(item === "Beauty & Personal Care") {
            return require('../../../assets/beauty.png')
        }
        else if(item === "Home Hygiene & Care") {
            return require('../../../assets/hygenic.png')
        }
        else {
          return require('../../../assets/fruits-vegetables.png')
        }
      }

      getCartNumber = () => {
        let totalCost = 0;
        this.props.cartItem.map((item) => {
            if(item.count && item.count > 0) {
                totalCost = totalCost + 1
            }
        })
        return totalCost
    }

    componentDidMount() {
        if(isNetworkConnected) {
          getRequest(urls.GET_CATEGORIES)
          .then((response) => {
            this.setState({categoryList: response.Categories})

            response.Categories.map((item) => {
                this.setState({showSubCategoriesList: [...this.state.showSubCategoriesList, {showSubCategories: false}]})
            })

            console.log(this.state.showSubCategoriesList);
          })
          .catch(err => {
            console.log(err);
          })
        } else {
          this.setState({ snackbarVisibility: true, snackbarMsg: 'No Internet' })
        }
      }
    
    render() {

        const theme = color
        const { searchTxt, categoryList, subcategoryList, showSubCategoriesList, category } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: color.BACKGROUND }}>
                <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingTop: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 40 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity
                            style={{ paddingRight: 5 }}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Image
                                source={require('../../../assets/arrow-left-white2.png')}
                                style={{ width: 16, height: 16, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Bold" }}>Category</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('PaymentStack')
                        }}>
                            <ImageBackground source={require('../../../assets/cart.png')}
                                style={{ width: 30, height: 30, }}
                                resizeMode="contain">
                                    {this.getCartNumber() === 0 ? null : 
                                <Text style={{alignSelf: "flex-end", paddingBottom: 5, color: "red", fontFamily: "Montserrat-SemiBold"}}>{this.getCartNumber()}</Text>}
                            </ImageBackground>
                            {/* <Image
                                source={require('../../../assets/cart.png')}
                                style={{ width: 30, height: 30, }}
                                resizeMode="contain"
                            /> */}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.WHITE, borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, marginHorizontal: 20, marginTop: -20, }}>
                    <Image
                        source={require('../../../assets/Mic.png')}
                        style={{ width: 12, height: 19, }}
                        resizeMode="contain"
                    />
                    <TextInput
                        style={{ flex: 1, color: theme.TEXT_PRIMARY, height: 40, fontSize: 12, fontFamily: "Montserrat-Regular" }}
                        value={searchTxt}
                        onChangeText={(text) => this.setState({ searchTxt: text })}
                        placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
                        // autoFocus
                        placeholder='Search your daily needs anytime...'
                    />
                </View>
                <FlatList
                    data={categoryList}
                    extraData={categoryList}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={{ width: DeviceWidth, backgroundColor: theme.WHITE, marginVertical: 5, }}>
                            <Pressable onPress={() => this.changeShowSubCategories(item, index)} activeOpacity={0.9}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 7, paddingBottom: 20, paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={this.imageHandler(index)}
                                            style={{ width: 38, height: 38 }}
                                            resizeMode="contain"
                                        />
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={{ fontSize: 12, letterSpacing: 0.12, lineHeight: 15, color: "#000A02", fontFamily: "Montserrat-Bold" }}>{item}</Text>
                                            {/* <Text style={{ fontSize: 8, letterSpacing: 0.24, lineHeight: 10, color: theme.TEXT_SECONDARY }}>{item.subtitle}</Text> */}
                                        </View>
                                    </View>
                                    {
                                        showSubCategoriesList[index].showSubCategories ?
                                            <Image
                                                source={require('../../../assets/arrow-up.png')}
                                                style={{ width: 10, height: 9, marginRight: 10 }}
                                                resizeMode="contain"
                                            />
                                            :
                                            <Image
                                                source={require('../../../assets/arrow-down.png')}
                                                style={{ width: 10, height: 9, marginRight: 10 }}
                                                resizeMode="contain"
                                            />
                                    }
                                </View>
                            </Pressable>

                            {console.log(showSubCategoriesList[index].showSubCategories, index)}
                            
                            {showSubCategoriesList[index].showSubCategories && this.state.category === item ? 

                                <FlatList 
                                    data={subcategoryList}
                                    extraData={subcategoryList}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) =>
                                    <View style={{ width: DeviceWidth, backgroundColor: theme.WHITE, marginVertical: 5, }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 7, paddingBottom: 20, paddingHorizontal: 15, backgroundColor: theme.BACKGROUND }}>
                                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Select Products', {item, category})}} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image
                                                        source={this.subImageHandler(item)}
                                                        style={{ width: 38, height: 38 }}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={{ marginLeft: 15 }}>
                                                        <Text style={{ fontSize: 12, letterSpacing: 0.12, lineHeight: 15, color: theme.TEXT_PRIMARY, fontFamily: "Montserrat-Medium" }}>{item}</Text>
                                                        {/* <Text style={{ fontSize: 8, letterSpacing: 0.24, lineHeight: 10, color: theme.TEXT_SECONDARY }}>{item.subtitle}</Text> */}
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />

                             : null}
                            
                        </View>
                    }
                />
            </View>
        )
    }
}


export default connect(
    //mapStateToProps,
    (state) => ({
        cartItem: state.products.cartList
    })
)(Category);

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
