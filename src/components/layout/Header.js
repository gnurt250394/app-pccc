import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import images from "public/images"
import styles from "public/css" 

export default class Header extends React.Component {
    render(){
        return (
            <View style={[styles.row, {height: 80,justifyContent:'space-between'}]} >
                <TouchableOpacity onPress={this.props.onPress || null} style={{padding: 10, paddingLeft: 0, paddingTop: 0}}>
                    <Image 
                        style={{width: 30, height: 30,borderWidth: 1, }}
                        source={images.backDark} />
                </TouchableOpacity>
                <Text style={this.props.style || {fontSize: 23, color: '#232323', flex: 1, textAlign: 'center', fontWeight: 'bold', paddingRight: 20, }}>{this.props.title}</Text>
            </View>
        )
    }
}

