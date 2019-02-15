import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, BaseInput, Btn, } from '../layout'
import { ScreenName, validateEmail, validatePhone, popupOk } from 'config'

class ForgotPassword extends React.Component {
    state = {
        username: ''
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Quên mật khẩu" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 18}}>Nhập Số điện thoại hoặc Email của bạn đã sử dụng để tạo tài khoản</Text>
                    </View>

                    <BaseInput 
                        styleIcon={{width: 15}}
                        icon={images.phoneDark}
                        onChangeText={username => this.setState({username})}
                        // keyboardType='numeric'
                        placeholder="Email/Số điện thoại" />
                    
                    <Btn name="Gửi" onPress={this._onSuccess()} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }

    _onSuccess = () => ()  => {
        if(!validateEmail(this.state.username) && !validatePhone(this.state.username) ){
            popupOk("Bạn phải nhập đúng Email hoặc Số điện thoại")
        }else {
           // call api
        }
    }
}
export default connect()(ForgotPassword)
