import React, { PureComponent } from 'react'
import { Text, View, FlatList, Image, Dimensions, TextInput, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import color from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getRequest, isNetworkConnected } from '../../../services/NetworkRequest';
import urls from '../../../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys';
import HomeSkeleton from './HomeSkeleton';
import { connect } from 'react-redux';


class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchTxt: '',
      bookingList: [
        {
          color: '#B7EFC5',
        }, {
          color: '#EFEFB7',
        }, {
          color: '#B7EFC5',
        }, {
          color: '#EFEFB7',
        },
      ],
      bookingList2: [
        
      ],
      loading: true
    }
  }

  componentDidMount() {
    if(isNetworkConnected) {
      getRequest("https://softezi-greyzon-rishav.herokuapp.com/v1/newItems/category/Groceries")
      .then((response) => {
        this.setState({bookingList2: response.Subcategories}, () => {
          this.setState({loading: false});
        })
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.setState({ snackbarVisibility: true, snackbarMsg: 'No Internet' })
    }
  }

  logout = async () => {
    await AsyncStorage.removeItem(storageKeys.COOKIES);
  };
  category = () => {
    this.props.navigation.navigate('CategoryStack');
  }

  imageHandler = (item) => {
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

  secondImageHandler = (index) => {
    if(index === 0) {
      return require('../../../assets/vegetables.png')
    } else if(index === 1) {
      return require('../../../assets/fruits.png')
    }
    else if(index === 2) {
      return require('../../../assets/bakery.png')
    } else {
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

  render() {
    const theme = color
    const { searchTxt, loading } = this.state
    // if(loading) {
    //   return <HomeSkeleton />
    // }
    console.log("ITEMS",this.state.bookingList2)
    return (
      <View style={{ flex: 1, color: color.BACKGROUND }}>
        <View style={{ backgroundColor: theme.PRIMARY_GREEN, paddingHorizontal: 20, paddingVertical: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <TouchableOpacity
              style={{ paddingRight: 5 }}
              onPress={() => { this.props.navigation.toggleDrawer() }}>
              <Image
                source={require('../../../assets/drawer-icon.png')}
                style={{ width: 16, height: 12, }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 15, color: theme.TEXT_WHITE, fontFamily: "Montserrat-Medium" }}>{'Hey there,\nLet me help in your shopping'}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentStack")}>
            {/* <Image
              source={require('../../../assets/cart.png')}
              style={{ width: 30, height: 30, }}
              resizeMode="contain"
            /> */}

              <ImageBackground source={require('../../../assets/cart.png')}
                style={{ width: 30, height: 30, }}
                resizeMode="contain">
                {this.getCartNumber() === 0 ? null : 
                <Text style={{alignSelf: "flex-end", paddingBottom: 5, color: "red", fontFamily: "Montserrat-SemiBold"}}>{this.getCartNumber()}</Text>}
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate("CategoryStack", {screen: "Search"})}} style={{ flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: theme.WHITE, borderRadius: 10, paddingHorizontal: 10, marginTop: 25 }}>
            <Image
              source={require('../../../assets/Mic.png')}
              style={{ width: 12, height: 19, }}
              resizeMode="contain"
            />
            <TextInput
              style={{ flex: 1, color: theme.TEXT_PRIMARY, height: 40, fontSize: 12, fontFamily: "Montserrat-Regular" }}
              value={searchTxt}
              onFocus={() => this.props.navigation.navigate("CategoryStack", {screen: "Search"})}
              placeholderTextColor={theme.TEXT_SECONDARY_LIGHT}
              // autoFocus
              placeholder='Search your daily needs anytime...'
            />
          </TouchableOpacity>
        </View>
        {loading ? <HomeSkeleton /> : 
        <ScrollView style={{ marginTop: 12, borderTopRightRadius: 50, borderTopLeftRadius: 50, backgroundColor: theme.BACKGROUND, height: 168 }}>
          <View style={{ marginHorizontal: 20, backgroundColor: theme.WHITE, paddingVertical: 10, borderRadius: 15}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 13, letterSpacing: 0.32, color: "#000A02", fontFamily: "Montserrat-Bold" }}>Categories</Text>
              <TouchableOpacity onPress={this.category}>
                <Text style={{ fontSize: 12, letterSpacing: 0.16, color: color.PRIMARY_GREEN, fontWeight: 'bold' }}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.bookingList2}
              extraData={this.state.bookingList2}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) =>
                <View style={{ paddingHorizontal: 15, borderRadius: 10, height: 150, width: 120, backgroundColor: theme.WHITE, marginHorizontal: 6, }}>
                  <View style={{}}>
                    <Image
                      source={this.imageHandler(item)}
                      style={{ width: 105, height: 110 }}
                      resizeMode="contain"
                    />
                    <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 15, color: theme.TEXT_PRIMARY, alignSelf: "center", fontFamily: "Montserrat-Medium" }}>{item}</Text>
                  </View>
                </View>
              }
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <FlatList
              data={this.state.bookingList}
              extraData={this.state.bookingList}
              keyExtractor={(item, index) => index.toString()}
              // showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 20 }}
              horizontal
              renderItem={({ item, index }) =>
                <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 12, height: 120, width: 255, backgroundColor: item.color, marginHorizontal: 5 }}>
                  <View style={{ flex: 3 / 5 }}>
                    <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, fontFamily: "Montserrat-Bold", color: '#25A244' }}>30% Discount</Text>
                    <Text style={{ fontSize: 10, letterSpacing: 0.3, lineHeight: 13, color: '#10451D', fontFamily: "Montserrat-Medium" }}>Order any food from app and get instant discount</Text>
                  </View>
                  <Image
                    source={require('../../../assets/discount.png')}
                    style={{ width: 100, height: 100, alignSelf: 'flex-end', flex: 2 / 5 }}
                    resizeMode="contain"
                  />
                </View>
              }
            />
          </View>
          <View style={{ marginHorizontal: 20, backgroundColor: theme.WHITE, paddingVertical: 10, borderRadius: 15, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 13, letterSpacing: 0.32, fontFamily: "Montserrat-Bold", color: color.TEXT_PRIMARY }}>Best Deals</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12, letterSpacing: 0.16, color: color.PRIMARY_GREEN, fontWeight: 'bold' }}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.bookingList2}
              extraData={this.state.bookingList2}
              keyExtractor={(item, index) => index.toString()}
              // showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) =>
                <View style={{ paddingHorizontal: 15, borderRadius: 10, height: 150, width: 120, backgroundColor: theme.WHITE, marginHorizontal: 6, }}>
                  <View style={{}}>
                    <Image
                      source={this.secondImageHandler(index)}
                      style={{ width: 105, height: 110 }}
                      resizeMode="contain"
                    />
                    <Text style={{ fontSize: 12, letterSpacing: 0.36, lineHeight: 15, color: theme.TEXT_PRIMARY, fontFamily: "Montserrat-Medium", alignSelf: "center" }}>{item}</Text>
                  </View>
                </View>
              }
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <FlatList
              data={this.state.bookingList}
              extraData={this.state.bookingList}
              keyExtractor={(item, index) => index.toString()}
              // showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 20 }}
              horizontal
              renderItem={({ item, index }) =>
                <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 12, height: 120, width: 255, backgroundColor: item.color, marginHorizontal: 5 }}>
                  <View style={{ flex: 3 / 5 }}>
                    <Text style={{ fontSize: 18, letterSpacing: 0.54, lineHeight: 22, fontFamily: "Montserrat-Bold", color: '#25A244' }}>30% Discount</Text>
                    <Text style={{ fontSize: 10, letterSpacing: 0.3, lineHeight: 13, color: '#10451D', fontFamily: "Montserrat-Medium" }}>Order any food from app and get instant discount</Text>
                  </View>
                  <Image
                    source={require('../../../assets/discount.png')}
                    style={{ width: 100, height: 100, alignSelf: 'flex-end', flex: 2 / 5 }}
                    resizeMode="contain"
                  />
                </View>
              }
            />
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView> }
      </View>
    )
  }
}

export default connect(
  //mapStateToProps,
  (state) => ({
      cartItem: state.products.cartList
  })
)(Home);

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
