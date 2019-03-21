import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import {PixelRatio} from 'react-native'
import React from 'react'
import { SearchProductScreen, SearchLiquidationScreen, SearchProjectScreen, SearchBiddingScreen } from "config/screenNames"
import { color } from 'config'
import SearchProduct from './Product'
import SearchBidding from './Bidding'
import SearchLiquidation from './Liquidation'
import SearchProject from './Project'
// IndicatorStyle is an absolute positioned View

const indicatorStyle = props => ({
	borderBottomColor:  props.activeTintColor,
	alignSelf: 'center',
});


const tabs =  createMaterialTopTabNavigator(
  {
    [SearchProductScreen]: { 
      screen: props => <SearchProduct  {...props} />,
      navigationOptions: () => ({
        title: 'Sản phẩm',
      }),
    },
    [SearchLiquidationScreen]: { 
      screen: props => <SearchLiquidation  {...props} />,
      navigationOptions: () => ({
        title: 'Thanh lý',
      }),
    },
    [SearchProjectScreen]: { 
      screen: props => <SearchProject  {...props} />,
      navigationOptions: () => ({
        title: 'Tin dự án',
      }),
    },
    [SearchBiddingScreen]: { 
      screen: props => <SearchBidding  {...props} />,
      navigationOptions: () => ({
        title: 'Tin đấu thầu',
      }),
    },
    
  },
  
  {
    initialRouteName: SearchProductScreen,
    defaultNavigationOptions: ({ navigation }) => ({

      swipeEnabled: true,
      lazy: false,
      tabBarPosition: 'top',
      tabBarOptions: {
        activeTintColor: color,
        inactiveTintColor : '#333333',
        scrollEnabled : true,
        labelStyle: {
          fontSize: 12,
          fontWeight: '500',
          // textTransform: 'none'
        },
        tabStyle: {
          width: 122,
        },
        style: {
          backgroundColor: 'white', //<== remove background color
          borderColor: '#ccc' // <== remove border
        }
      },

      
    }),
   
  }
);

export default createAppContainer(tabs);
