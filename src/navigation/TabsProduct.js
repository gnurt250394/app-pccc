import { createBottomTabNavigator } from "react-navigation";
import {Image} from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import HomeScreen from 'components/Home'
import News from 'components/News'
import ProductDetail from 'components/Product'

export default createBottomTabNavigator(
  {
    [ScreenName.HomeScreen]: { 
      screen: ProductDetail,
      navigationOptions: () => ({
        title: 'home',
      }),
    },
    [ScreenName.HomeScreen]: { 
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Nhắn tin',
      }),
    },
    [ScreenName.News]: { 
      screen: News,
      navigationOptions: () => ({
        title: 'Liên hệ',
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
