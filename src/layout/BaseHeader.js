import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import images from "public/images"
import styles from "public/css" 

export default class BaseHeader extends React.Component {
    render(){
        return (
            <View style={style.head}>
                <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                <TouchableOpacity style={style.p8} onPress={this.props.goBack} >
                    <Image 
                        style={[styles.icon,  style.w10]}
                        source={images.backLight} />
                </TouchableOpacity>
                <Text style={style.title}>{this.props.title || ""}</Text>
                <View  style={style.row}>
                    <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                        <Image 
                            style={[styles.icon, style.w15]}
                            source={images.iconSearch} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                        <Image 
                            style={[styles.icon, style.w15]}
                            source={images.filterL} />
                    </TouchableOpacity>
                    
                </View >
            </View>
        )
    }
}

const style = StyleSheet.create({
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F55555'},
    w10: { width: 10},
    w15: { width: 15},
    p8: {padding: 8},
    row: {flexDirection: 'row', alignItems: 'center'},
    title: {flex: 1, fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center'}
})
