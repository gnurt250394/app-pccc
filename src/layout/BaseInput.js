import React from 'react'
import { TextInput, View, Image, StyleSheet } from 'react-native'
import styles from "public/css" 
import images from "public/images"
export default class BaseInput extends React.Component {
    render(){
        return (
            <View style={{flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#999999', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 2,}}>
                <Image 
                    style={[styles.icon,{width: 12}, this.props.styleIcon || {}, ]} 
                    source={this.props.icon} />
                <TextInput 
                    placeholder={this.props.placeholder || "Enter something"}
                    placeholderTextColor={this.props.placeholderTextColor || "#95989A"}
                    keyboardType={this.props.keyboardType || "default" }
                    secureTextEntry={this.props.secureTextEntry }
                    onChangeText={this.props.onChangeText}
                    editable={this.props.editable}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    style={this.props.style || [style.input, this.props.customStyle || {}]} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    input: {
        color: '#333333',
        padding: 0,
        paddingLeft: 8,
        fontSize: 14,
        backgroundColor: 'white',
        flex: 1,
    },
})