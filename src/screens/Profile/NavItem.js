import React from 'react'
import { StyleSheet, TouchableOpacity,Image, View, Text  } from 'react-native'
import images from "assets/images"

export default class NavItem extends React.Component {
    render(){
        return <TouchableOpacity 
                    onPress={this.props.onPress || null}
                    style={{ marginBottom: 8,marginLeft: 10, flexDirection: 'row', alignItems: 'center',}}>
                    <Image 
                        style={[style.icon, {marginRight: 15, marginLeft: 10}]}
                        source={this.props.icon} />
                    <View style={{  flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomColor: "#707070", borderBottomWidth: 0.5,}}>
                        <Text style={style.txt}>{this.props.title}</Text>
                        <Image 
                            style={[style.icon, {width: 9, marginRight: 10}]}
                            source={images.next} />
                    </View>
                </TouchableOpacity>
        }
}
const style = StyleSheet.create({
    icon: {width: 18, resizeMode: 'contain', },
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center',  paddingTop: 15 },
    txt:{
        flex: 1,
        color:'#333333',
        fontSize: 14,
        paddingBottom: 15,
        paddingTop: 8,
    },
})