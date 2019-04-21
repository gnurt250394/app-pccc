import React,{Component} from 'react'
import {Dimensions} from  'react-native'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import * as ScreenName from 'config/screenNames'
import ProductShop from './product/ProductShop';
import LiquidationShop from './liquidation/LiquidationShop';
import { color } from 'config'
import { fontStyles } from 'config/fontStyles';
import { fontStyle } from 'config/Controller';

const {width,height} = Dimensions.get('window')

const TabShop = createMaterialTopTabNavigator({
    [ScreenName.ProductShop]: { 
        screen: props => <ProductShop  {...props} />,
        navigationOptions: () => ({
          title: 'Sản phẩm',
        }),
      },
    [ScreenName.ShopLiquidation]: { 
        screen: props => <LiquidationShop  {...props} />,
        navigationOptions: () => ({
          title: 'Tin thanh lý',
        }),
      },
      [ScreenName.ShopPostPurchase]: { 
        screen: props => <LiquidationShop  {...props} />,
        navigationOptions: ({navigation}) => ({
          title: 'Tin đăng mua',
        }),
      },
    },{
        // initialRouteName:'LiquidationShop',  
        defaultNavigationOptions: ({ navigation }) => ({
          swipeEnabled: true,
          tabBarPosition: 'top',
          tabBarOptions: {
            upperCaseLabel:false,
            activeTintColor: '#2166A2',
            inactiveTintColor : '#333333',
            scrollEnabled : false,
            labelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              // textTransform: 'none'
              fontFamily: fontStyle.Acumin_bold 
            },
            tabStyle: {
              // width: width/2,
            },
            style: {
              backgroundColor: 'white', //<== remove background color
              borderColor: '#ccc' // <== remove border
            },
            indicatorStyle:{
                backgroundColor:'#2166A2'
            }
          }
        }),
      }
)

export default createAppContainer(TabShop)