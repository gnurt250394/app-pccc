import React from 'react'
import { StyleSheet, TouchableOpacity,Image, View, Text  } from 'react-native'
import styles from "public/css" 
import images from "public/images"
export default class NavItem extends React.Component {
    render(){
        return <TouchableOpacity 
                    onPress={this.props.onPress || null}
                    style={{ marginBottom: 30, flexDirection: 'row', alignItems: 'center',}}>
                    <Image 
                        style={[style.icon, {marginRight: 5}]}
                        source={this.props.icon} />
                    <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                        <Text style={style.txt}>{this.props.title}</Text>
                        {this.props.showMore ? <Image  style={[style.icon, {width: 18, marginRight: 10}]} source={images.mAdd}  /> : null}
                    </View>
                </TouchableOpacity>
        }
}
const style = StyleSheet.create({
    icon: {width: 22, resizeMode: 'contain', },
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 },
    txt:{
        flex: 1,
        color:'white',
        fontSize:16,
        marginLeft: 10,
        fontWeight:'500'
    },
})