/** @hoanglv */

import React from 'react'
import App from './src/navigation';
import { Provider } from 'react-redux'
import { NetInfo, Modal, StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import store from './src/reduxs'
import NavigationService from './src/navigation/NavigationService';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import NoInternetScreen from 'components/CheckNetWorking';
const { width, height } = Dimensions.get('window')
export default class MyApp extends React.Component {
    constructor(properties) {
        super(properties);
        OneSignal.init("73f83b30-0153-4dd4-8cc1-3e9b1a944b50");
    
        OneSignal.inFocusDisplaying(2)
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
      }
    
      componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
      }
    
      onReceived(notification) {
        console.log("Notification received: ", notification);
      }
    
      onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      }
    
      onIds(device) {
        console.log('Device info: ', device);
      }
    render() {
        return (

            <Provider store={store}>

                <App ref={navigationref => NavigationService.setTopLevelNavigator(navigationref)}>
                </App>
                <NoInternetScreen />
            </Provider>
        )
    }
}

