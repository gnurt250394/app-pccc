import React from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { ScreenName, toUpperCase } from 'config'
import { HomeScreen, SigninScreen, RegisterScreen } from 'config/screenNames'


class CheckAuth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: true,
        };
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('dark-content');
          StatusBar.setBackgroundColor('#999999');
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render() {
        return (
            <TouchableWithoutFeedback style= {style.flex} onPress={() =>this.props.navigation.navigate(HomeScreen)}>
                <View style={style.modal}>
                    <View style={style.bodyModal}>
                        <Text style={style.headModal}>Yêu cầu đăng nhập</Text>
                        <View style={style.footerModal}>
                            <Text 
                                onPress={() => this.props.navigation.navigate(SigninScreen)}
                                style={[style.btnModal, {borderBottomRightRadius: 0}]}>{toUpperCase("Đăng nhập")}</Text>
                            <Text 
                                onPress={() => this.props.navigation.navigate(RegisterScreen)}
                                style={[style.btnModal, {color: '#F55555', backgroundColor: 'white', borderBottomLeftRadius: 0}]}>{toUpperCase("Đăng ký")}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    
}

export default connect()(CheckAuth)

const style = StyleSheet.create({
    modal: {backgroundColor: '#999999', justifyContent: 'center', flex: 1, },
    bodyModal: {width: '80%', alignSelf: 'center', backgroundColor: 'white',  flexDirection: 'column', borderRadius: 8,},
    headModal: {textAlign: 'center', padding: 10, color: '#333333',  fontWeight: 'bold', fontSize: 18},
    footerModal: {flexDirection: 'row', borderWidth: 1, borderColor: '#F55555', borderBottomLeftRadius: 8, borderBottomRightRadius: 8,},
    btnModal: {padding: 10, fontSize: 16, fontWeight: '400', backgroundColor: '#F55555', color: 'white', flex: 1, textAlign: 'center', borderBottomLeftRadius: 5, borderBottomRightRadius: 8},
    close: {
        color: '#333333',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
