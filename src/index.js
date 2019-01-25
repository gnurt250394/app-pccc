import { createStackNavigator, createAppContainer } from "react-navigation";
import { ScreenName } from "config"
import Auth from 'components/Auth'
import Signup from 'components/Signup'
import Signin from 'components/Signin'

const App = createStackNavigator(
  {
    [ScreenName.Auth]: {
      screen: Auth,
      navigationOptions: () => ({
          header: null
      })
    },
    [ScreenName.Signup]: {
      screen: Signup,
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
   
  },
  {
    initialRouteName: ScreenName.Auth
  }
);

export default createAppContainer(App);