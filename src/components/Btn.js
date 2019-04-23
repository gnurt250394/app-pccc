import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from "assets/styles" 
import {  toUpperCase } from 'config'
import { fontStyles } from 'config/fontStyles';

export default class Btn extends React.Component {
    render(){
        return (
            <TouchableOpacity 
                onPress={this.props.onPress || null}
                style={[styles.btnLogin, this.props.customStyle || {}]}>

                <Text style={[styles.textLogin,fontStyles.bold, this.props.textStyle || {}]}>{this.props.UpperCase ? this.props.name : toUpperCase(this.props.name)}</Text>
            </TouchableOpacity>
        )
    }
}

