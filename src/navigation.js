import { createStackNavigator, createAppContainer } from "react-navigation";
import { ScreenName } from "config"
import Auth from 'components/Auth'
import NextStep from 'components/Register/NextStep'
import Complete from 'components/Register/Complete'
import Confirm from 'components/Register/Confirm'
import Signin from 'components/Signin'
import ForgotPassword from 'components/ForgotPassword'
import Otp from 'components/ForgotPassword/Otp'
import ChangePassword from 'components/ForgotPassword/ChangePassword'
import ViewProfile from 'components/Profile/ViewProfile'
import EditProfile from 'components/Profile/EditProfile'
import Profile from 'components/Profile'
import HomeScreen from 'components/Home'

const App = createStackNavigator(
  {
    [ScreenName.Auth]: {
      screen: Auth,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.NextStep]: {
      screen: NextStep,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Signin]: {
      screen: Signin,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.ForgotPassword]: {
      screen: ForgotPassword,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Otp]: {
      screen: Otp,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.ChangePassword]: {
      screen: ChangePassword,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Complete]: {
      screen: Complete,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.ViewProfile]: {
      screen: ViewProfile,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.EditProfile]: {
      screen: EditProfile,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Profile]: {
      screen: Profile,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Confirm]: {
      screen: Confirm,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.HomeScreen]: {
      screen: HomeScreen,
      navigationOptions: () => ({
          header: null
      })
    },
   
  },
  {
    initialRouteName: ScreenName.Signin
  }
);

export default createAppContainer(App);