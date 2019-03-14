import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import {PixelRatio} from 'react-native'
import React from 'react'
import { SearchProductScreen, SearchLiquidationScreen, SearchProjectScreen, SearchBindingScreen } from "config/screenNames"
import { color } from 'config'
import SearchProduct from './Product'
import SearchBinding from './Binding'
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
      screen: props => <SearchProduct indicatorStyle={indicatorStyle(props)} {...props} />,
      navigationOptions: () => ({
        title: 'Sản phẩm',
      }),
    },
    [SearchLiquidationScreen]: { 
      screen: props => <SearchLiquidation indicatorStyle={indicatorStyle(props)} {...props} />,
      navigationOptions: () => ({
        title: 'Thanh lý',
      }),
    },
    [SearchProjectScreen]: { 
      screen: props => <SearchProject indicatorStyle={indicatorStyle(props)} {...props} />,
      navigationOptions: () => ({
        title: 'Tin dự án',
      }),
    },
    [SearchBindingScreen]: { 
      screen: props => <SearchBinding indicatorStyle={indicatorStyle(props)} {...props} />,
      navigationOptions: () => ({
        title: 'Tin đấu thầu',
      }),
    },
    
  },
  
  {
    initialRouteName: SearchProjectScreen,
    defaultNavigationOptions: ({ navigation }) => ({

      swipeEnabled: true,
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
      }
    }),
  }
);

export default createAppContainer(tabs);
