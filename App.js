/** @hoanglv */

import React from 'react'
import App from './src/navigation';
import { Provider } from 'react-redux'
import {NetInfo,Modal,StyleSheet,View,Text,Dimensions} from 'react-native'
import store from './src/redux'
import NavigationService from './src/navigation/NavigationService';
const {width,height} = Dimensions.get('window')
export default class MyApp extends React.Component {
    state={
        isConnected: true,
    }
    componentDidMount = () => {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );

    };
    handleConnectivityChange = isConnected => {
        if (this.state.isConnected !== isConnected) {
            this.setState({ isConnected });
        }

    };
    render(){
        return(!this.state.isConnected ?
            <Modal>
                <View style={styles.containerModal}>
                    <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.txtheader}>Thông báo</Text>
                        <View style={styles.end}/>
                    </View>
                   <View style={styles.viewEnd}>
                        <Text>Vui lòng kết nối mạng</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            :
            <Provider store={store}>
           
                <App ref={navigationref=>NavigationService.setTopLevelNavigator(navigationref)}> 
                </App>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    modal: {
        backgroundColor: '#FFFFFF',
        height: height/4,
        width: width/1.5,
        borderColor: '#2166A2',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-around'
    },
    header:{
        height:70,
        alignItems:'center',
        justifyContent:'center'
    },
    end:{
        height:1,
        backgroundColor:'#2166A2',
        width:width/2
    },
    txtheader:{
        marginBottom:15,
        color:'#2166A2',
        fontWeight: 'bold',
        fontSize:17
    },
    viewEnd:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

