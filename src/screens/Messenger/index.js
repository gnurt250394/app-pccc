import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Footer, ViewMore } from 'components'
import { ScreenName } from 'config'

class Messenger extends React.Component {
    render(){
        return (
            <View style={{}}>
                <ScrollView>
                    <Text>Nhắn tin</Text>
                </ScrollView>
            </View>
        )
    }

    // set status bar
    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('dark-content');
        //   StatusBar.setBackgroundColor('#fff');
        // });
      }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }
}
export default connect()(Messenger)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})
