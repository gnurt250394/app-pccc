import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import {Image, StyleSheet } from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import Auth from 'components/Auth'
import NextStep from 'components/Register/NextStep'
import Complete from 'components/Register/Complete'
import Confirm from 'components/Register/Confirm'
import Signin from 'components/Signin'
import ForgotPassword from 'components/ForgotPassword'
import Otp from 'components/ForgotPassword/Otp'
import ChangePassword from 'components/ForgotPassword/ChangePassword'
import ViewProfile from 'components/Profile/ViewProfile'
import EditProfile from 'components/Profile/EditProfile'
import Profile from 'components/Profile'
import HomeScreen from 'components/Home'
import Cart from 'components/Cart'
import More from 'components/More'
import Search from 'components/Search'
import Drawer from "./components/ScreenDrawer/Drawer";
import Product from 'components/Product'

const TabMain = createBottomTabNavigator(
  {
    [ScreenName.HomeScreen]: HomeScreen,
    [ScreenName.More]: More,
    [ScreenName.Search]: Search,
    [ScreenName.Cart]: Cart,
    [ScreenName.Profile]: Profile
  },
  
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        var image;
        switch (routeName){
          case ScreenName.HomeScreen:
            image = focused ? images.HomeRed : images.HomeDark;
            break;
          case ScreenName.More:
            image = focused ? images.MoreRed : images.MoreDark;
            break;
          case ScreenName.Search:
            image = focused ? images.SearchRed : images.search;
            break;
          case ScreenName.Cart:
            image = focused ? images.cartRed : images.cart;
            break;
          case ScreenName.Profile:
            image = focused ? images.ProfileRed : images.ProfileDark;
            break;
        }
        
        return <Image  style={styles.icon} source={image} />
      },
      tabBarLabel: () => {
        showLabel: false
      },
    }),
  }
);

const MyDrawerNavigator = createDrawerNavigator({
  Tabs:TabMain
 },{
   contentComponent:(props)=><Drawer {...props}/>
 });
 
const App = createStackNavigator(
  {
    [ScreenName.Auth]: Auth,
    [ScreenName.NextStep]: NextStep,
    [ScreenName.Signin]: Signin,
    [ScreenName.ForgotPassword]: ForgotPassword,
    [ScreenName.Otp]: Otp,
    [ScreenName.ChangePassword]: ChangePassword,
    [ScreenName.Complete]: Complete,
    [ScreenName.ViewProfile]: ViewProfile,
    [ScreenName.EditProfile]: EditProfile,
    [ScreenName.Profile]: Profile,
    [ScreenName.Confirm]: Confirm,
    [ScreenName.HomeScreen]: MyDrawerNavigator,
    [ScreenName.Cart]: Cart,
    [ScreenName.Product]: Product,
   
  },
  {
    initialRouteName: ScreenName.Signin,
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default createAppContainer(App);

const styles = StyleSheet.create({
  icon: {
    width: 18,
    resizeMode: 'contain'
  },
})