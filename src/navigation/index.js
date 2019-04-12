import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import React from 'react'
import * as ScreenName from "config/screenNames"
import Register from 'screens/Register'
import Complete from 'screens/Register/Complete'
import Confirm from 'screens/Register/Confirm'
import Signin from 'screens/Signin'
import UpdateProfile from 'screens/Signin/UpdateProfile'
import ForgotPassword from 'screens/ForgotPassword'
import ChangePassword from 'screens/ForgotPassword/ChangePassword'
import CheckPhone from 'screens/ForgotPassword/CheckPhone'
import ViewProfile from 'screens/Profile/ViewProfile'
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
import InfoProject from "screens/Project/InfoProject";
import DetailProject from "screens/Project/DetailProject";

// bidding
import ListBidding from 'screens/Bidding/List'
import DetailBidding from 'screens/Bidding/Detail'

// tttd
import TrackingInfo from 'screens/TrackingInfo'
import BuyProduct from "screens/Shop/product/BuyProduct/BuyProduct";

// video
import Video from 'screens/Video'

// Catalog
import Catalog from 'screens/Catalog'
import ListCategory from "screens/Shop/product/ListCategory";
import FolowContractor from "screens/Contractors/FolowContractor";
import DetailContractor from "screens/Contractors/Detail/DetailContractor";
import Liquidation from "screens/Liquidation/Liquidation";
import ListLiquidation from "screens/Liquidation/ListLiquidation/ListLiquidation";
import DetailLiquidation from "screens/Liquidation/Detail/DetailLiquidation";
import ListCity from "screens/Liquidation/ListLiquidation/ListCity";
import CategoryFilter from "screens/Liquidation/ListLiquidation/CategoryFilter";
import PostPurchase from "screens/PostPurchase/Purchase/PostPurchase";
import DetailPostPurchase from "screens/PostPurchase/DetailPostPurchase/DetailPostPurchase";
import ListPostPurchase from "screens/PostPurchase/ListPostPurchase/ListPostPurchase";

// const MyDrawerNavigator = createDrawerNavigator({
//   Tabs: TabsHome
//  },{
//    contentComponent:(props)=><Drawer {...props}/>
//  });
 
const App = createStackNavigator(
  {
    [ScreenName.SplashScreen]:SplashScreen,
    [ScreenName.HelloScreen]:ScreenHello,
    [ScreenName.RegisterScreen]: Register,
    
    [ScreenName.SigninScreen]: Signin,

    [ScreenName.ForgotPasswordScreen]: ForgotPassword,
    [ScreenName.ChangePasswordScreen]: ChangePassword,
    [ScreenName.CompleteScreen]: Complete,

    [ScreenName.ViewProfileScreen]: ViewProfile,
    [ScreenName.EditProfileScreen]: EditProfile,
    [ScreenName.ProfileScreen]: Profile,

    [ScreenName.ConfirmScreen]: Confirm,
    [ScreenName.HomeScreen]: TabsHome,
    [ScreenName.CartScreen]: Cart,
    [ScreenName.ProductDetailScreen]: ProductDetail,
    [ScreenName.CheckAuthScreen]: CheckAuth,

    [ScreenName.IntroduceScreen]: Introduce,
    [ScreenName.ContactsScreen]: Contacts,
    [ScreenName.ViewAllProductScreen]: ViewAllProduct,
    [ScreenName.ShopScreen]: Shop,

    [ScreenName.UpdateProfileScreen]: UpdateProfile,
    [ScreenName.SearchScreen]: Search,
    [ScreenName.CheckPhoneScreen]: CheckPhone,
    
    [ScreenName.MessengerScreen]: Messenger,

    // bidding
    [ScreenName.ListBiddingScreen]: ListBidding,
    [ScreenName.DetailBiddingScreen]: DetailBidding,
    //MyShop
    [ScreenName.BuyProduct]: BuyProduct,
    [ScreenName.ListCategory]: ListCategory,

    // Projeect
    [ScreenName.InfoProject]: InfoProject,
    [ScreenName.DetailProject]: DetailProject,

    // tttd
    [ScreenName.TrackingInfoScreen]: TrackingInfo,

    // Video
    [ScreenName.VideoScreen]: Video,

    // Catalog
    [ScreenName.CatalogScreen]: Catalog,

    // Liquidation
    [ScreenName.Liquidation] : Liquidation,
    [ScreenName.ListLiquidation]: ListLiquidation,
    [ScreenName.DetailLiquidation]:DetailLiquidation,
    [ScreenName.ListCity]:ListCity,
    [ScreenName.CategoryFilter]:CategoryFilter,

    // Post Purchase
    [ScreenName.PostPurchase]:PostPurchase,
    [ScreenName.DetailPostPurchase]:DetailPostPurchase,
    [ScreenName.ListPostPurchase]:ListPostPurchase,

    //FolowContractor
    [ScreenName.FolowContractor]: FolowContractor,
    [ScreenName.DetailContractor]: DetailContractor,
   
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
