import React, { useState } from 'react';
import { View, Text, Image, StatusBar, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import Home from '../screen/BottomNav/Home/Home';
import SplashScreen, { isLoggedIn } from '../screen/Splash/SplashScreen';
import Login from '../screen/LoginScreen/Login';
import Signup from '../screen/LoginScreen/Signup';
import VerifyOtp from '../screen/LoginScreen/VerifyOtp';
import storageKeys from '../constants/storageKeys';
import MainCarousel from '../screen/LoginScreen/MainCarousel';
import PaymentOptions from '../screen/BottomNav/MyPayment/PaymentOptions';
import Profile from '../screen/BottomNav/Profile/Profile';
import UpdateEmail from '../screen/BottomNav/Profile/UpdateEmail';
import UpdatePhoneNumber from '../screen/BottomNav/Profile/UpdatePhoneNumber';
import EnterDetails from '../screen/LoginScreen/EnterDetails';
import Category from '../screen/BottomNav/Category/Category';
import Search from '../screen/BottomNav/Category/Search';
import SelectProducts from '../screen/BottomNav/Category/SelectProducts';
import Orders from '../screen/BottomNav/Orders/Orders';
import OrdersDetails from '../screen/BottomNav/Orders/OrdersDetails';
import AddCard from '../screen/BottomNav/MyPayment/AddCard';
import AddNewAddress from '../screen/BottomNav/MyDeliveryAddress/AddNewAddress';
import DeliveryAddress from '../screen/BottomNav/MyDeliveryAddress/DeliveryAddress';
import Cart from '../screen/BottomNav/MyPayment/Cart';
import DeliveryOptions from '../screen/BottomNav/MyDeliveryAddress/DeliveryOptions';
import Payment from '../screen/BottomNav/MyDeliveryAddress/Payment';
import ConfirmUpdate from '../screen/BottomNav/Profile/ConfirmUpdate';
import DrawerContent from './DrawerContent';
import { changeLoginStatus } from '../redux/actions';
const SIZE = 80;

const AppNavigation = () => {


  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const splashComplete = async () => {
    let loggedInStatus = await isLoggedIn();
    if (loggedInStatus) {
      setIsLoading(false);
      dispatch(changeLoginStatus(true))
    } else {
      setIsLoading(false);
      dispatch(changeLoginStatus(false))
    }
  };

  const LoggedIn = useSelector(state => state.products.loggedIn);

  const logout = async () => {
    let removeItem = []; //add key you don't want to delete on logout
    let keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < removeItem.length; i++) {
      keys.splice(keys.indexOf(removeItem[i]), 1);
    }
    await AsyncStorage.multiRemove(keys);
    dispatch(changeLoginStatus(false))
  };

  const login = () => {
    dispatch(changeLoginStatus(true))
  };

    return isLoading ? (
      <SplashScreen complete={splashComplete} />
    ) : (
      <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        {LoggedIn ? (
          <MyContext.Provider value={logout}>
            <View style={{ flex: 1 }}>
              {/* <LoginStack /> */}
              <DrawerNavigator />
            </View>
          </MyContext.Provider>
        ) : (
          <MyContext.Provider value={login}>
            {/* <TabNavigator /> */}
            <LoginStack />
          </MyContext.Provider>
        )}
      </View>
    );
  }

const StackNavigator = createStackNavigator();

const LoginStack = props => (
  <StackNavigator.Navigator
    initialRouteName="Signup"
    mode="modal"
    headerMode="none">
    <StackNavigator.Screen name="Login" component={Login} />
    <StackNavigator.Screen name="Main Carousel" component={MainCarousel} />
    <StackNavigator.Screen name="Signup" component={Signup} />
    <StackNavigator.Screen name="Enter Details" component={EnterDetails} />
    < StackNavigator.Screen name="Verify Otp" component={VerifyOtp} />
  </StackNavigator.Navigator>
);
const HomeStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Home"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Home" component={Home} />
    <StackNavigator.Screen name="CategoryStack" component={CategoryStack} />
    <StackNavigator.Screen name="PaymentStack" component={PaymentStack} />
    <StackNavigator.Screen name="DeliveryAddressStack" component={DeliveryAddressStack} />
    <StackNavigator.Screen name="ProfileStack" component={ProfileStack} />
    <StackNavigator.Screen name="OrdersStack" component={OrdersStack} />
  </StackNavigator.Navigator>
)
const CategoryStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Category"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Category" component={Category} />
    <StackNavigator.Screen name="Search" component={Search} />
    <StackNavigator.Screen name="Select Products" component={SelectProducts} />
    <StackNavigator.Screen name="Payment Options" component={PaymentOptions} />
    <StackNavigator.Screen name="Add Card" component={AddCard} />
    <StackNavigator.Screen name="Add New Address" component={AddNewAddress} />
    <StackNavigator.Screen name="Delivery Address" component={DeliveryAddress} />
    <StackNavigator.Screen name="Cart" component={Cart} />
  </StackNavigator.Navigator>
)
const PaymentStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Cart"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Payment Options" component={PaymentOptions} />
    <StackNavigator.Screen name="Add Card" component={AddCard} />
    <StackNavigator.Screen name="Cart" component={Cart} />
  </StackNavigator.Navigator>
)
const DeliveryAddressStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Delivery Address"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Add New Address" component={AddNewAddress} />
    <StackNavigator.Screen name="Delivery Address" component={DeliveryAddress} />
    <StackNavigator.Screen name="Delivery Options" component={DeliveryOptions} />
    <StackNavigator.Screen name="Payment" component={Payment} />
  </StackNavigator.Navigator>
)
const OrdersStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Orders"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Orders" component={Orders} />
    <StackNavigator.Screen name="Orders Details" component={OrdersDetails} />
  </StackNavigator.Navigator>
)

const ProfileStack = (props) => (
  <StackNavigator.Navigator
    initialRouteName="Profile"
    mode="card"
    headerMode="none"
  >
    <StackNavigator.Screen name="Profile" component={Profile} />
    <StackNavigator.Screen name="Update Email" component={UpdateEmail} />
    <StackNavigator.Screen name="Update Phone Number" component={UpdatePhoneNumber} />
    <StackNavigator.Screen name="Confirm Update" component={ConfirmUpdate} />


  </StackNavigator.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerNavigator = props => {
  const theme = colors
  return (
    <Drawer.Navigator
      drawerType="front"
      openByDefault={false}
      edgeWidth={120}
      backBehavior="history"
      overlayColor="transparent"
      drawerPosition="left"
      keyboardDismissMode="on-drag"
      detachInactiveScreens={false}
      drawerContent={props => <DrawerContent {...props} />}
      // goBack="goBack"
      drawerContentOptions={{
        activeTintColor: theme.DRAWER_ICON_FOCUSED,
        inactiveTintColor: theme.DRAWER_ICON_FOCUSED,
        keyboardHidesTabBar: true,
        activeBackgroundColor: theme.WHITE, //60708d
        inactiveBackgroundColor: theme.WHITE, //00223d 
        adaptive: true,
        labelStyle: {
          fontWeight: 'bold'
        },
      }}

      drawerStyle={{
        backgroundColor: theme.WHITE,
        width: DeviceWidth / 1.41,
        // justifyContent: "center",
        // paddingLeft: 35,

      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />

    </Drawer.Navigator>
  )
}

export default AppNavigation;

export const MyContext = React.createContext(() => {
  //do nothing
});
const DeviceWidth = Dimensions.get('window').width

//function to generate view for bottom nav bar icon with badge
function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <Animatable.View
      animation={badgeCount ? 'rubberBand' : ''}
      iterationCount={'infinite'}
      style={{ width: size, height: size, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </Animatable.View>
  );
}
