import { createBottomTabNavigator } from "react-navigation";
import {Image, View, Text} from 'react-native'
import React from 'react'
import images from "public/images"
import { ScreenName } from "config"
import HomeScreen from 'components/Home'
import News from 'components/News'
import ProductDetail from 'components/Product'

export default createBottomTabNavigator(
  {
    [ScreenName.ProductDetail]: { 
      screen: ProductDetail,
      navigationOptions: () => ({
        title: 'Chi tiết sản phẩm',
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
        var image, label;
        switch (routeName){
          case ScreenName.HomeScreen:
            image = focused ? images.tabHomeRed : images.tabHome;
            label = "Nhắn tin";
            break;
          case ScreenName.News:
            image = focused ? images.tabNewsRed : images.tabNews;
            label = "Liên hệ";
            break;
          
        }
        if(routeName == ScreenName.ProductDetail){
          return null
        }else{

          return <View style={{flexDirection: 'row', backgroundColor: '#F55555'}}>
                  <Image  style={styles.icon} source={image} />
                  <Text style={{padding: 10}}>{label}</Text>
                </View>
        }
      },
      tabBarLabel: () => {
        showLabel: false
      },
      tabBarOptions: {
        activeTintColor: '#F55555',
        
      }
    }),
  }
);
