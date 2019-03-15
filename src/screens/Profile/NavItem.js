import React from 'react'
import { StyleSheet, TouchableOpacity,Image, View, Text  } from 'react-native'
import images from "assets/images"

export default class NavItem extends React.Component {
    render(){
        return <TouchableOpacity 
                    onPress={this.props.onPress || null}
                    style={style.content}>
                    <Image 
                        style={[style.icon, style.img]}
                        source={this.props.icon} />
                    <View style={style.label}>
                        <Text style={style.txt}>{this.props.title}</Text>
                        <Image 
                            style={[style.icon, style.next]}
                            source={images.next} />
                    </View>
                </TouchableOpacity>
    }
}
const style = StyleSheet.create({
    content: { marginBottom: 8,marginLeft: 10, flexDirection: 'row', alignItems: 'center',},
    icon: {width: 18, resizeMode: 'contain', },
    title: {color: '#fff', fontSize: 20, alignSelf: 'center',  paddingTop: 15 },
    txt:{  flex: 1, color:'#333333', fontSize: 14,  paddingBottom: 15, paddingTop: 8 },
    img: {marginRight: 15, marginLeft: 10},
    label: {  flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomColor: "#707070", borderBottomWidth: 0.5,},
    next: {width: 9, marginRight: 10}
})