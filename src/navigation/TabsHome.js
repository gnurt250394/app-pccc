import { createBottomTabNavigator } from "react-navigation";
import {Image, StatusBar} from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import Profile from 'components/Profile'
import HomeScreen from 'components/Home'
import Messenger from 'components/Messenger'
import Notify from 'components/Notify'

export default createBottomTabNavigator(
  {
    [ScreenName.HomeScreen]: { 
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Trang chủ',
      }),
    },
    [ScreenName.Messenger]: { 
      screen: Messenger,
      navigationOptions: () => ({
        title: 'Tin nhắn',
      }),
    },
    [ScreenName.Notify]: { 
      screen: Notify,
      navigationOptions: () => ({
        title: 'Thông báo',
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
        var image,  w = 17;
        switch (routeName){
          case ScreenName.HomeScreen:
            image = focused ? images.tabHomeRed : images.tabHome;
            break;
          case ScreenName.Messenger:
            image = focused ? images.tabMsgRed : images.tabMsgDark;
            w = 22;
            break;
          case ScreenName.Notify:
            image = focused ? images.notify : images.notifyDark;
            break;
          case ScreenName.Profile:
            image = focused ? images.tabUserRed : images.tabUserDark;
            break;
          default:
            w = 17;
            break;
        }
        return <Image  style={[styles.icon, {width: w}]} source={image} />
        
      },
      tabBarOptions: {
        activeTintColor: '#F55555',
      }
    }),
  }
);
