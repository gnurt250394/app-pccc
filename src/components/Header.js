import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet,StatusBar } from 'react-native'
import images from "assets/images"
import styles from "assets/styles" 
import { color } from 'config'
import navigation from 'navigation/NavigationService';

export default class Header extends React.Component {
    render(){
        console.log(1, this.props.check);
        return (
            <View style={ style.content} >
            <StatusBar
                barStyle="light-content" 
                backgroundColor={color} />
            {   this.props.check == 1 ? <TouchableOpacity onPress={this.props.onPress} style={style.btn}>
                    <Image 
                        style={style.icon}
                        source={images.backLight} />
                </TouchableOpacity>
                :
                <View style={style.view}/>

            
            }
                <Text style={ style.title}>{this.props.title}</Text>
                <View style={style.view}/>
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
        alignItems:'center',
        alignContent: 'center',
    },
    icon: {
        height: 18,
        width:18, 
        resizeMode: 'contain', 
    },
    title: {
       
        flex: 1, 
        fontSize: 18, 
        color: '#fff', 
        textAlign: 'center', 
        fontWeight: 'bold', 
        // paddingRight: 20, 
    },
    btn: {
        padding: 12, 
        paddingLeft: 0, 
        paddingTop: 0, 
        marginTop: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    view:{
        flex:1/10
    }
})
