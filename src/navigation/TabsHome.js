import { createBottomTabNavigator } from "react-navigation";
import {Image, StatusBar} from 'react-native'
import React from 'react'
import images from "assets/images"
import { HomeScreen, ProfileScreen, NotifyScreen, ListChatScreen } from "config/screenNames"
import Profile from 'screens/Profile'
import Home from 'screens/Home'

import ListChat from 'screens/Message/ListChat'
import Notify from 'screens/Notify'
import { color } from 'config'
import Icon from "screens/Notify/Icon";

export default createBottomTabNavigator(
  {
    [HomeScreen]: { 
      screen: Home,
      navigationOptions: () => ({
        title: 'Trang chủ',
      }),
    },
    [ListChatScreen]: { 
      screen: ListChat,
      navigationOptions: () => ({
        title: 'Tin nhắn',
      }),
    },
    [NotifyScreen]: { 
      screen:Notify,
      navigationOptions: () => ({
        title: 'Thông báo',
      //   tabBarIcon: ({ focused }) => {  
      //     // You can return any component that you like here! 
      //     // We usually create an icon component rendering some svg        
      //     return <Icon  source={focused ? images.notify : images.notifyDark }/>;       
      //  }
     
      }),
    },
    [ProfileScreen]: { 
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
          case HomeScreen:
            image = focused ? images.tabHomeRed : images.tabHome;
            w = 22;
            break;
          case ListChatScreen:
            image = focused ? images.tabMsgRed : images.tabMsgDark;
            w = 22;
            break;
          case NotifyScreen:
            image = focused ? images.notify : images.notifyDark;
            break;
          case ProfileScreen:
            image = focused ? images.userDark : images.tabUserDark;
            break;
          default:
            w = 17;
            break;
        }
        return <Image resizeMode="contain" style={{width: 17,height:17}} source={image} />
        
      },
      tabBarOptions: {
        activeTintColor: color,
        inactiveTintColor:'#555555',
        style: {
          paddingBottom: 5,
        },
      }
    }),
  }
);
