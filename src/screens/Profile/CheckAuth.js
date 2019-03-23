import React from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ScreenName, toUpperCase, color } from 'config'
import { HomeScreen, SigninScreen, RegisterScreen } from 'config/screenNames'
import navigation from 'navigation/NavigationService';
import {withNavigation} from 'react-navigation'



class CheckAuth extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            modalVisible: true,
        };
    }

    // set status bar
    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('dark-content');
        //   StatusBar.setBackgroundColor('#999999');
        // });
      }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }
    render() {
        return (
                <View style={style.modal}>
                    <View style={style.bodyModal}>
                        <Text style={style.headModal}>Yêu cầu đăng nhập</Text>
                        <View style={style.footerModal}>
                            <Text 
                                onPress={this._navTo(SigninScreen)}
                                style={[style.btnModal, style.login]}>{toUpperCase("Đăng nhập")}</Text>
                            <Text 
                                onPress={this._navTo(RegisterScreen)}
                                style={[style.btnModal, style.register]}>{toUpperCase("Đăng ký")}</Text>
                        </View>
                    </View>
            </View>
        )
    }

    

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }
    
}

export default withNavigation(CheckAuth)

const style = StyleSheet.create({
    modal: {backgroundColor: '#999999', justifyContent: 'center', flex: 1, },
    bodyModal: {width: '80%', alignSelf: 'center', backgroundColor: 'white',  flexDirection: 'column', borderRadius: 8,},
    headModal: {textAlign: 'center', padding: 10, color: '#333333',  fontWeight: 'bold', fontSize: 18},
    footerModal: {flexDirection: 'row', borderWidth: 1, borderColor: color, borderBottomLeftRadius: 8, borderBottomRightRadius: 8,},
    btnModal: {padding: 10, fontSize: 16, fontWeight: '400', backgroundColor: color, color: 'white', flex: 1, textAlign: 'center', borderBottomLeftRadius: 5, borderBottomRightRadius: 8},
    close: {  color: '#333333', textAlign: 'center',  marginTop: 40, fontSize: 16,  fontWeight: 'bold' },
    register: {color: color, backgroundColor: 'white', borderBottomLeftRadius: 0},
    login: {borderBottomRightRadius: 0},
    cancel:{
        position:'absolute',
        top:1,
        right: 7,
        height:30,
        width:30,
        alignItems: 'flex-end',
    },
    txt:{
        color:color
    }
})
