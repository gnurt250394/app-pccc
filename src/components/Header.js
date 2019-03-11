import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import images from "assets/images"
import styles from "assets/styles" 
import { color } from 'config'

export default class Header extends React.Component {
    render(){
        return (
            <View style={[styles.row, style.content]} >
                <TouchableOpacity onPress={this.props.onPress || null} style={style.btn}>
                    <Image 
                        style={style.icon}
                        source={images.backLight} />
                </TouchableOpacity>
                <Text style={this.props.style || style.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    content: {justifyContent: 'space-between',paddingTop: 8, backgroundColor: color, paddingBottom: 2,},
    icon: {height: 15, resizeMode: 'contain', },
    title: {fontSize: 18, color: '#fff', flex: 1, textAlign: 'center', fontWeight: 'bold', paddingRight: 20, },
    btn: {padding: 12, paddingLeft: 0, paddingTop: 0, alignItems: 'center'}
})