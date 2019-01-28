import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import images from "public/images"
import styles from "public/css" 

export default class Header extends React.Component {
    render(){
        return (
            <View style={[styles.row, {height: 80, justifyContent: 'space-between',padding: 10}]} >
                <TouchableOpacity onPress={this.props.onPress || null}>
                    <Image 
                        style={{width: 20, height: 20, }}
                        source={images.back} />
                </TouchableOpacity>
                <Text style={this.props.style || {fontSize: 23, color: '#F72626', flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{this.props.title}</Text>
            </View>
        )
    }
}

