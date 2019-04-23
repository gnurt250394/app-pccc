import React,{Component} from 'react'
import {Dimensions,Platform} from  'react-native'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import { SearchProductScreen, SearchLiquidationScreen, SearchProjectScreen, SearchBiddingScreen } from "config/screenNames"
import { color } from 'config'
import { fontStyle } from 'config/Controller';
import Emoji from './Emoji';

const {width,height} = Dimensions.get('window')

const TabEmoji = createMaterialTopTabNavigator({
    System: { 
        screen: props => <Emoji  {...props} />,
        navigationOptions: () => ({
          title: 'Hệ thống',
        }),
      },
      Folow: { 
        screen: props => <Emoji  {...props} />,
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
            upperCaseLabel:false,
            activeTintColor: '#2166A2',
            inactiveTintColor : '#333333',
            scrollEnabled : true,
            labelStyle: {
              fontSize: 14,
              fontWeight: '500',
              // textTransform: 'none'
              fontFamily: fontStyle.Acumin_bold 
            },
            tabStyle: {
              width: width/2,
            },
            style: {
              backgroundColor: 'white', //<== remove background color
              borderColor: '#ccc', // <== remove border
            
            },
            indicatorStyle:{
                backgroundColor:'#2166A2'
            }
          }
        }),
      }
)

export default createAppContainer(TabEmoji)