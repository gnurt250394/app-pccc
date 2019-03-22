import React,{Component} from 'react'
import {Dimensions} from  'react-native'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import { SearchProductScreen, SearchLiquidationScreen, SearchProjectScreen, SearchBiddingScreen } from "config/screenNames"
import { color } from 'config'
import System from './System/System';
import Folow from './Folow/Folow';
import { fontStyle } from 'config/Controller';

const {width,height} = Dimensions.get('window')

const TabNotifi = createMaterialTopTabNavigator({
    System: { 
        screen: props => <System  {...props} />,
        navigationOptions: () => ({
          title: 'Hệ thống',
        }),
      },
      Folow: { 
        screen: props => <Folow  {...props} />,
        navigationOptions: () => ({
          title: 'Theo dõi',
        }),
      },

    },{
        // initialRouteName:'Folow',
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
              fontFamily: fontStyle.Acumin_bold,
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

export default createAppContainer(TabNotifi)