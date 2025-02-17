/** @hoanglv */

import React from 'react'
import App from './src/navigation';
import { Provider } from 'react-redux'
import store from 'config/store'
export default class MyApp extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}


