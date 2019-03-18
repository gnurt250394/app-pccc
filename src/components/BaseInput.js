import React from 'react'
import { TextInput, View, Image, StyleSheet } from 'react-native'
import styles from "assets/styles" 
import { color, defaultStyle } from 'config'

export default class BaseInput extends React.PureComponent {

    static defaultProps = {
        value: ''
    }

    state = {
        value: this.props.value,
        showIcon: this.props.showIcon || true,
    }
    componentWillReceiveProps(props){
        if(props.value != "") this.setState({value: props.value})
    }

    render(){
        return (
            <View style={style.inputView}>

                {this.state.showIcon && <Image 
                    style={[styles.icon,style.w12, this.props.styleIcon || {}, ]} 
                    source={this.props.icon} />}
                <TextInput 
                    placeholder={this.props.placeholder || "Enter something"}
                    placeholderTextColor={this.props.placeholderTextColor || "#8FBEDF"}
                    keyboardType={this.props.keyboardType || "default" }
                    secureTextEntry={this.props.secureTextEntry }
                    onChangeText={this.onChangeText}
                    editable={this.props.editable}
                    onBlur={this.props.onBlur}
                    value={this.state.value}
                    maxLength={this.props.maxLength}
                    style={this.props.style || [style.input, this.props.customStyle || {}]} />
            </View>
        )
    }

    onChangeText = text => {
        if(this.props.removeSpace) text = text.replace(/ /g, '');
        this.setState({value: text})
    }

    getValue = () => this.state.value
}

const style = StyleSheet.create({
    input: {
        color: color,
        padding: 0,
        paddingLeft: 8,
        fontSize: defaultStyle.fontSize,
        backgroundColor: 'white',
        flex: 1,
        // opacity: 0.8,
    },
    inputView: {flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 0},
    w12: {width: 12}
})