import React from 'react'
import { TextInput } from 'react-native'
import styles from "public/css" 

export default class Input extends React.Component {
    render(){
        return (
            <TextInput 
                placeholder={this.props.placeholder || "Enter something"}
                placeholderTextColor={this.props.placeholderTextColor || "#E0E0E0"}
                keyboardType={this.props.keyboardType || "default" }
                secureTextEntry={this.props.secureTextEntry }
                onChangeText={this.props.onChangeText}
                style={this.props.style || [styles.input, this.props.customStyle || {}]} />
        )
    }
}
