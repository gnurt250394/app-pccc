import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import {Image, StyleSheet } from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import Auth from 'components/Auth'
import Register from 'components/Register'
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
import News from 'components/News'
import Search from 'components/Search'
import Drawer from "./components/ScreenDrawer/Drawer";
import ProductDetail from 'components/Product'

const TabMain = createBottomTabNavigator(
  {
    [ScreenName.HomeScreen]: { 
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Trang chủ',
      }),
    },
    [ScreenName.News]: { 
      screen: News,
      navigationOptions: () => ({
        title: 'Tin tức',
      }),
    },
    [ScreenName.Search]: { 
      screen: Search,
      navigationOptions: () => ({
        title: 'Đăng mua',
      }),
    },
    [ScreenName.Cart]: { 
      screen: Cart,
      navigationOptions: () => ({
        title: 'Đăng bán',
      }),
    },
    [ScreenName.Profile]: { 
      screen: Profile,
      navigationOptions: () => ({
        title: 'Cá nhân',
      }),
    }
  },
  
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        // console.log('tintColor: ', tintColor);
        // tintColor = focused ? "#F55555" : "#555555";
        const { routeName } = navigation.state;
        var image;
        switch (routeName){
          case ScreenName.HomeScreen:
            image = focused ? images.tabHomeRed : images.tabHome;
            break;
          case ScreenName.News:
            image = focused ? images.tabNewsRed : images.tabNews;
            break;
          case ScreenName.Search:
            image = focused ? images.tabSellRed : images.tabSell;
            break;
          case ScreenName.Cart:
            image = focused ? images.tabBuyRed : images.tabBuy;
            break;
          case ScreenName.Profile:
            image = focused ? images.ProfileRed : images.ProfileDark;
            break;
        }
        
        return <Image  style={styles.icon} source={image} />
      },
      // tabBarLabel: () => {
      //   showLabel: false
      // },
      tabBarOptions: {
        activeTintColor: '#F55555',
        
      }
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
    [ScreenName.Register]: Register,
    [ScreenName.Signin]: Signin,
    [ScreenName.ForgotPassword]: ForgotPassword,
    [ScreenName.Otp]: Otp,
    [ScreenName.ChangePassword]: ChangePassword,
    [ScreenName.Complete]: Complete,
    [ScreenName.ViewProfile]: ViewProfile,
    [ScreenName.EditProfile]: EditProfile,
    [ScreenName.Profile]: TabMain,
    [ScreenName.Confirm]: Confirm,
    [ScreenName.HomeScreen]: MyDrawerNavigator,
    [ScreenName.Cart]: Cart,
    [ScreenName.ProductDetail]: ProductDetail,
    
   
  },
  {
    initialRouteName: ScreenName.HomeScreen,
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