import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, BaseInput, Btn, } from '../layout'
import { ScreenName, validateEmail, validatePhone, popupOk } from 'config'
import RNAccountKit from 'react-native-facebook-account-kit'


class ForgotPassword extends React.Component {
    state = {
        phone: ''
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Quên mật khẩu" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 16, color: '#555555'}}>Nhập Số điện thoại của bạn đã sử dụng để tạo tài khoản</Text>
                    </View>

                    <BaseInput 
                        styleIcon={{width: 15}}
                        icon={images.phoneDark}
                        onChangeText={phone => this.setState({phone})}
                        keyboardType='numeric'
                        placeholder="Số điện thoại" />
                    
                    <Btn name="Gửi" onPress={this._onSuccess()} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }

    _onSuccess = () => ()  => {
        console.log(123, this.state.phone);
        if(!validatePhone(this.state.phone) ){
            popupOk("Số điện thoại không đúng")
        }else {
           // call api
           RNAccountKit.configure({
                responseType: 'code',
                // titleType: 'login',
                initialAuthState: '',
                initialPhoneCountryPrefix: '+84' + this.state.phone.replace(/^0+/, ""), 
                defaultCountry: 'VN',
            })
           RNAccountKit.loginWithPhone()
            .then((token) => {
                if(token && token.code){
                    
                }
            })
        }
    }
}
export default connect()(ForgotPassword)
