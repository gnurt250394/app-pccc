import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Footer, ViewMore } from 'layout'
import { ScreenName } from 'config'

class Notify extends React.Component {
    render(){
        return (
            <View style={{}}>
                <ScrollView>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Text>Thông báo</Text>
                </ScrollView>
            </View>
        )
    }
}
export default connect()(Notify)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'}
})
