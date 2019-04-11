import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet,StatusBar,Platform,SafeAreaView } from 'react-native'
import images from "assets/images"
import styles from "assets/styles" 
import { color } from 'config'
import navigation from 'navigation/NavigationService';
import { fontStyle } from 'config/Controller';
import { fontStyles } from 'config/fontStyles';

export default class Header extends React.Component {
    render(){
        return (
            <SafeAreaView style={style.container}>
            <View style={ [style.content,{...this.props.style}]} >
            {/* <StatusBar
                barStyle="light-content" 
                backgroundColor={color} /> */}
            {   this.props.check == 1 ? <TouchableOpacity onPress={this.props.onPress} style={style.btn}>
                    <Image 
                        style={style.icon}
                        source={images.backLight} />
                </TouchableOpacity>
                :
                <View style={style.view}/>

            
            }
                <Text style={[ style.title,fontStyles.Acumin_bold]}>{this.props.title}</Text>
                {this.props.finish?<TouchableOpacity 
                onPress={this.props.onFinish}
                style={style.view}>
                <Text style={[style.txtFinish,fontStyles.Acumin_thin]}>Xong</Text>
                </TouchableOpacity>:null}
            </View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: color,
        height:47,
        // flex:1,
        alignItems:'center',
        alignContent: 'center',
    },
    container:{
        backgroundColor: color,
    },
    icon: {
        height: 16,
        width:16, 
        resizeMode: 'contain', 
    },
    title: {
        // fontFamily: fontStyle.Acumin_bold,
        flex: 1, 
        fontSize: 18, 
        color: '#fff', 
        textAlign: 'center', 
        // paddingRight: 20, 
    },
    btn: {
        paddingLeft: 12, 
        paddingBottom: 8, 
        paddingTop: 0, 
        marginTop: 7,
        alignItems: 'center',
        justifyContent:'center'
    },
    view:{
        flex:1/10,
        alignItems:'center',
        justifyContent:'center'
    },
    txtFinish:{
        color:"#FFFFFF"
    }
})
