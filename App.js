/** @hoanglv */

import React from 'react'
import App from './src/navigation';
import { Provider } from 'react-redux'
import { NetInfo, Modal, StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import store from './src/redux'
import NavigationService from './src/navigation/NavigationService';
import NoInternetScreen from 'components/CheckNetWorking';
const { width, height } = Dimensions.get('window')
export default class MyApp extends React.Component {

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

