import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import styles from "assets/styles" 
import { color } from 'config'
export default class Input extends React.Component {
    render(){
        return (
            <TextInput 
                placeholder={this.props.placeholder || "Enter something"}
                placeholderTextColor={this.props.placeholderTextColor || "#95989A"}
                keyboardType={this.props.keyboardType || "default" }
                secureTextEntry={this.props.secureTextEntry }
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                value={this.props.value}
                style={this.props.style || [style.input, this.props.customStyle || {}]} />
        )
    }
}
const style = StyleSheet.create({
    input: {
        color: color,
        padding: 0,
        paddingLeft: 8,
        fontSize: 14,
        backgroundColor: 'white',
        flex: 1,
        opacity: 0.8,
    },
    inputView: {flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 0},
    w12: {width: 12}
})
