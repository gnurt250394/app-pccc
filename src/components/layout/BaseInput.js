import React from 'react'
import { TextInput, View, Image, StyleSheet } from 'react-native'
import styles from "public/css" 
import images from "public/images"
export default class BaseInput extends React.Component {
    render(){
        return (
            <View style={{flexDirection: "row", borderBottomWidth: 1, borderBottomColor: '#999999', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 2,}}>
                <Image 
                    style={[styles.icon, this.props.styleIcon || {}]} 
                    source={this.props.icon} />
                <TextInput 
                    placeholder={this.props.placeholder || "Enter something"}
                    placeholderTextColor={this.props.placeholderTextColor || "#E0E0E0"}
                    keyboardType={this.props.keyboardType || "default" }
                    secureTextEntry={this.props.secureTextEntry }
                    onChangeText={this.props.onChangeText}
                    style={this.props.style || [style.input, this.props.customStyle || {}]} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    input: {
        color: '#999999',
        padding: 2,
        paddingLeft: 8,
        fontSize: 16,
        backgroundColor: 'white',
        flex: 1,
    },
})