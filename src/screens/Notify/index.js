import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Footer, ViewMore } from 'components'
import { HomeScreen } from 'config/screenNames'
import { color, MessageStatus, popupOk } from 'config'
import TabNotifi from './TabNotifi';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getItem } from 'config/Controller';

class Notify extends React.Component {

    // set status bar
    componentDidMount= async ()=> {
        
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('light-content');
        //   StatusBar.setBackgroundColor(color);
          
        // });
    }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }
    // end status bar

    render(){
        return (
            <View style={{flex:1}}>
            <Header
            title={"Thông báo"}
            />
                <TabNotifi/>
            </View>
        )
    }
    // set status bar
    
    
  
}
export default connect()(Notify)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})
