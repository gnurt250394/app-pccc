import { createBottomTabNavigator } from "react-navigation";
import {Image} from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import Profile from 'components/Profile'
import HomeScreen from 'components/Home'
import Cart from 'components/Cart'
import News from 'components/News'
import Search from 'components/Search'

export default createBottomTabNavigator(
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
