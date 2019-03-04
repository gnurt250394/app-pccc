import React from 'react'
import { TextInput, View, Image, StyleSheet } from 'react-native'
import styles from "assets/styles" 

export default class BaseInput extends React.PureComponent {

    static defaultProps = {
        value: ''
    }

    state = {
        value: this.props.value
    }
    render(){
        return (
            <View style={{flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 20, paddingBottom: 0,}}>
                <Image 
                    style={[styles.icon,{width: 12}, this.props.styleIcon || {}, ]} 
                    source={this.props.icon} />
                <TextInput 
                    placeholder={this.props.placeholder || "Enter something"}
                    placeholderTextColor={this.props.placeholderTextColor || "#8FBEDF"}
                    // placeholderTextColor={this.props.placeholderTextColor || "rgba(33, 102, 162, 0.5)"}
                    keyboardType={this.props.keyboardType || "default" }
                    secureTextEntry={this.props.secureTextEntry }
                    onChangeText={this.onChangeText}
                    editable={this.props.editable}
                    value={this.state.value}
                    maxLength={this.props.maxLength}
                    style={this.props.style || [style.input, this.props.customStyle || {}]} />
            </View>
        )
    }

    onChangeText = text => {
        this.setState({value: text})
    }

    getValue = () => this.state.value
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