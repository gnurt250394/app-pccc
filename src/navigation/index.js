import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import React from 'react'
import * as ScreenName from "config/screenNames"
import Register from 'screens/Register'
import Complete from 'screens/Register/Complete'
import Confirm from 'screens/Register/Confirm'
import Signin from 'screens/Signin'
import CompleteUpdate from 'screens/Signin/CompleteUpdate'
import UpdateProfile from 'screens/Signin/UpdateProfile'
import ForgotPassword from 'screens/ForgotPassword'
import ChangePassword from 'screens/ForgotPassword/ChangePassword'
import CheckPhone from 'screens/ForgotPassword/CheckPhone'
import ViewProfile from 'screens/Profile/ViewProfile'
import MyProfile from 'screens/Profile/profile'
import Profile from 'screens/Profile'
import CheckAuth from 'screens/Profile/CheckAuth'
import EditProfile from 'screens/Profile/EditProfile'
import Cart from 'screens/Cart'
import Drawer from "./Drawer";
import ProductDetail from 'screens/Product'
import ViewAllProduct from 'screens/Product/ViewAll'
import TabsHome from './TabsHome'
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import ScreenHello from "../screens/SplashScreen/ScreenHello";
import Contacts from "../screens/Product/contact";
import Introduce from "../screens/Introduce/Introduce";
import Shop from "../screens/Shop";
import Search from "../screens/Search";
import Messenger from 'screens/Messenger'

// bidding
import ListBidding from 'screens/Bidding/List'
import DetailBidding from 'screens/Bidding/Detail'


const MyDrawerNavigator = createDrawerNavigator({
  Tabs: TabsHome
 },{
   contentComponent:(props)=><Drawer {...props}/>
 });
 
const App = createStackNavigator(
  {
    [ScreenName.SplashScreen]:SplashScreen,
    [ScreenName.HelloScreen]:ScreenHello,
    [ScreenName.RegisterScreen]: Register,
    
    [ScreenName.SigninScreen]: Signin,
    [ScreenName.CompleteUpdateScreen]: CompleteUpdate,

    [ScreenName.ForgotPasswordScreen]: ForgotPassword,
    [ScreenName.ChangePasswordScreen]: ChangePassword,
    [ScreenName.CompleteScreen]: Complete,
    [ScreenName.ViewProfileScreen]: ViewProfile,
    [ScreenName.EditProfileScreen]: EditProfile,
    [ScreenName.ProfileScreen]: Profile,
    [ScreenName.ConfirmScreen]: Confirm,
    [ScreenName.HomeScreen]: MyDrawerNavigator,
    [ScreenName.CartScreen]: Cart,
    [ScreenName.ProductDetailScreen]: ProductDetail,
    [ScreenName.CheckAuthScreen]: CheckAuth,
    [ScreenName.IntroduceScreen]: Introduce,
    [ScreenName.ContactsScreen]: Contacts,
    [ScreenName.ViewAllProductScreen]: ViewAllProduct,
    [ScreenName.ShopScreen]: Shop,
    [ScreenName.MyProfile]: MyProfile,
    [ScreenName.UpdateProfileScreen]: UpdateProfile,
    [ScreenName.SearchScreen]: Search,
    [ScreenName.CheckPhoneScreen]: CheckPhone,
    [ScreenName.MessengerScreen]: Messenger,

    // bidding
    [ScreenName.ListBiddingScreen]: ListBidding,
    [ScreenName.DetailBiddingScreen]: DetailBidding,
   
  },
  {
    initialRouteName: ScreenName.SplashScreen,
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default createAppContainer(App);
