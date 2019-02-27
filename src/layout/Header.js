import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import images from "public/images"
import styles from "public/css" 

export default class Header extends React.Component {
    render(){
        return (
            <View style={[styles.row, {justifyContent: 'space-between',paddingTop: 15, backgroundColor:"#F55555"}]} >
                <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                <TouchableOpacity onPress={this.props.onPress || null} style={{padding: 12, paddingLeft: 0, paddingTop: 0}}>
                    <Image 
                        style={{width: 10, resizeMode: 'contain', }}
                        source={images.backLight} />
                </TouchableOpacity>
                <Text style={this.props.style || {fontSize: 18, color: '#fff', flex: 1, textAlign: 'center', fontWeight: 'bold', paddingRight: 20, }}>{this.props.title}</Text>
            </View>
        )
    }
}

