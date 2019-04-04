import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { color, defaultStyle } from 'config'

export default class Input extends React.Component {
    render() {
        return (
            <TextInput
                placeholder={this.props.placeholder || "Enter something"}
                placeholderTextColor={this.props.placeholderTextColor || "#95989A"}
                keyboardType={this.props.keyboardType || "default"}
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.props.onChangeText}
                editable={this.props.editable}
                value={this.props.value}
                style={this.props.style || [style.inputView, this.props.customStyle || {}]} />
        )
    }
}
const style = StyleSheet.create({
    input: {
        // color: color,
        padding: 0,
        paddingLeft: 8,
        fontSize: defaultStyle.fontSize,
        backgroundColor: 'white',
        flex: 1,
        opacity: 0.8,
    },
    inputView: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        height: 35,
        borderBottomColor: '#CCCCCC',
        width: '80%',
        alignSelf: 'center',
        // alignItems: 'baseline',
        marginBottom: 8,
        paddingBottom: 0
    },
    w12: { width: 12 }
})
