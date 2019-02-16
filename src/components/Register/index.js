import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { BaseInput, Btn} from 'layout'
import { ScreenName, toUpperCase, validateEmail, popupOk, validateName } from 'config'
class Register extends React.Component {
    state = {
        name: "",
        phone: "",
        email: "",
        password: "",
        rePassword: "",
    }
    
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={styles.content}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Text style={{color: '#F55555', fontWeight: 'bold', fontSize: 22, marginBottom: '15%', textAlign: 'center'}}>{toUpperCase('Đăng ký')}</Text>
                <View style={{height: "60%"}}>
                    <BaseInput 
                        icon={images.userDark}
                        onChangeText={val => this.setState({name: val})}
                        placeholder="Họ và tên" />
                    <BaseInput 
                        styleIcon={{width: 11}}
                        icon={images.phoneDark}
                        onChangeText={val => this.setState({phone: val})}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Số điện thoại" />
                    <BaseInput 
                        icon={images.emailDark}
                        onChangeText={val => this.setState({email: val})}
                        keyboardType='email-address'
                        placeholder="Email" />
                    <BaseInput 
                        icon={images.keyDark}
                        onChangeText={val => this.setState({password: val})}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    <BaseInput 
                        icon={images.keyDark}
                        onChangeText={val => this.setState({rePassword: val})}
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu" />
                    
                    <Btn 
                        customStyle={{marginTop:  50,}}
                        onPress={this._onSuccess()}
                        name="Bước tiếp theo" />

                    <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate(ScreenName.Signin)}>
                           <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }
    
    _onSuccess = () => () => {
        if(this.state.name.trim().length < 2){
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if(!validateName(this.state.name)){
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        }else if(this.state.phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else if(this.state.email.trim() != "" && !validateEmail(this.state.email)){
            popupOk('Email không đúng')
        }else if(this.state.password.trim().length < 6){
            popupOk('Mật khẩu phải từ 6 ký tự')
        }else if(this.state.password != this.state.rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else {
            // call api
        }
    }
}
export default connect()(Register)
const style = StyleSheet.create({
   
})