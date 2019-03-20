import React,{Component} from 'react'
import {Dimensions} from  'react-native'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import { SearchProductScreen, SearchLiquidationScreen, SearchProjectScreen, SearchBiddingScreen } from "config/screenNames"
import ProductShop from './product/ProductShop';
import LiquidationShop from './liquidation/LiquidationShop';
import { color } from 'config'

const {width,height} = Dimensions.get('window')

const TabShop = createMaterialTopTabNavigator({
    ProductShop: { 
        screen: props => <ProductShop  {...props} />,
        navigationOptions: () => ({
          title: 'Sản phẩm',
        }),
      },
    LiquidationShop: { 
        screen: props => <LiquidationShop  {...props} />,
        navigationOptions: () => ({
          title: 'Thanh lý',
        }),
      },

    },{
        initialRouteName:'LiquidationShop',
        defaultNavigationOptions: ({ navigation }) => ({
          swipeEnabled: true,
          tabBarPosition: 'top',
          tabBarOptions: {
            activeTintColor: '#2166A2',
            inactiveTintColor : '#333333',
            scrollEnabled : true,
            labelStyle: {
              fontSize: 12,
              fontWeight: '500',
              // textTransform: 'none'
            },
            tabStyle: {
              width: width/2,
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