import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import React from 'react'
import { ScreenName } from "config"
import Register from 'components/Register'
import Complete from 'components/Register/Complete'
import Confirm from 'components/Register/Confirm'
import Signin from 'components/Signin'
import ForgotPassword from 'components/ForgotPassword'
import ChangePassword from 'components/ForgotPassword/ChangePassword'
import ViewProfile from 'components/Profile/ViewProfile'
import Profile from 'components/Profile'
import EditProfile from 'components/Profile/EditProfile'
import Cart from 'components/Cart'
import Drawer from "./Drawer";

import TabsHome from './TabsHome'
import TabsProduct from './TabsProduct'
import SplashScreen from "../components/SplashScreen/SplashScreen";
import ScreenHello from "../components/SplashScreen/ScreenHello";


const MyDrawerNavigator = createDrawerNavigator({
  Tabs: TabsHome
 },{
   contentComponent:(props)=><Drawer {...props}/>
 });
 
const App = createStackNavigator(
  {
    [ScreenName.SplashScreen]:SplashScreen,
    [ScreenName.ScreenHello]:ScreenHello,
    [ScreenName.Register]: Register,
    [ScreenName.Signin]: Signin,
    [ScreenName.ForgotPassword]: ForgotPassword,
    [ScreenName.ChangePassword]: ChangePassword,
    [ScreenName.Complete]: Complete,
    [ScreenName.ViewProfile]: ViewProfile,
    [ScreenName.EditProfile]: EditProfile,
    [ScreenName.Profile]: Profile,
    [ScreenName.Confirm]: Confirm,
    [ScreenName.HomeScreen]: MyDrawerNavigator,
    [ScreenName.Cart]: Cart,
    [ScreenName.ProductDetail]: TabsProduct,
    
   
  },
  {
    initialRouteName: ScreenName.HomeScreen,
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default createAppContainer(App);
