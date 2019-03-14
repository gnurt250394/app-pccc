import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet,StatusBar } from 'react-native'
import images from "assets/images"
import styles from "assets/styles" 
import { color } from 'config'
import navigation from 'navigation/NavigationService';

export default class Header extends React.Component {
    render(){
        return (
            <View style={ style.content} >
            <StatusBar
                backgroundColor={color}
            />
            {this.props.check ==1 ? <TouchableOpacity onPress={this.props.onPress} style={style.btn}>
                    <Image 
                        style={style.icon}
                        source={images.backLight} />
                </TouchableOpacity>
                :
                <View/>

            
            }
               
                <Text style={ style.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: color,
        height:47,
        alignItems:'center'
    },
    icon: {
        height: 18,
        width:18, 
        resizeMode: 'contain', 
    },
    title: {
        fontSize: 18, 
        color: '#fff', 
        flex: 1, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        paddingRight: 20, 
    },
    btn: {
        padding: 12, 
        paddingLeft: 0, 
        paddingTop: 0, 
        alignItems: 'center'}
})