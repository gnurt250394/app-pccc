import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from "public/css" 
import {  toUpperCase } from 'config'

export default class Btn extends React.Component {
    render(){
        return (
            <TouchableOpacity 
                onPress={this.props.onPress || null}
                style={[styles.btnLogin, this.props.customStyle || {}]}>

                <Text style={styles.textLogin}>{toUpperCase(this.props.name)}</Text>
            </TouchableOpacity>
        )
    }
}

