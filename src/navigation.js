import { createStackNavigator, createAppContainer } from "react-navigation";
import { ScreenName } from "config"
import Auth from 'components/Auth'
import NextStep from 'components/Register/NextStep'
import Signin from 'components/Signin'
import ForgotPassword from 'components/ForgotPassword'
import Otp from 'components/ForgotPassword/Otp'
import ChangePassword from 'components/ForgotPassword/ChangePassword'

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
   
  },
  {
    initialRouteName: ScreenName.NextStep
  }
);

export default createAppContainer(App);