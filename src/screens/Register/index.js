import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles" 
import { signup } from 'config/apis/users'
import { BaseInput, Btn} from 'components'
import { toUpperCase, validateEmail, popupOk, validateName, StatusCode, CodeToMessage } from 'config'
import  { accountKit } from 'config/accountKit'
import  { SigninScreen, HomeScreen } from 'config/screenNames'
class Register extends React.Component {
    state = {
        name: "",
        phone: "",
        email: "",
        password: "",
        rePassword: "",
    }
    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('dark-content');
          StatusBar.setBackgroundColor('#fff');
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    // end set status bar

    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={styles.content}>
                <Text style={{color: '#F55555', fontWeight: 'bold', fontSize: 22, marginBottom: '15%', textAlign: 'center'}}>{toUpperCase('Đăng ký')}</Text>
                <View style={{height: "60%"}}>
                    <BaseInput 
                        icon={images.userDark}
                        ref={val => this.name = val}
                        placeholder="Họ và tên" />
                    <BaseInput 
                        styleIcon={{width: 11}}
                        icon={images.phoneDark}
                        ref={val => this.phone = val}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Số điện thoại" />
                    <BaseInput 
                        icon={images.emailDark}
                        ref={val => this.email = val}
                        keyboardType='email-address'
                        placeholder="Email" />
                    <BaseInput 
                        icon={images.keyDark}
                        ref={val => this.password = val}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    <BaseInput 
                        icon={images.keyDark}
                        ref={val => this.rePassword = val}
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu" />
                    
                    <Btn 
                        customStyle={{marginTop:  50,}}
                        onPress={this._onSuccess()}
                        name="Bước tiếp theo" />

                    <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate(SigninScreen)}>
                           <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }

    
    
    _onSuccess = () => async () => {
        let name = this.name.getValue(),
            phone = this.phone.getValue(),
            email = this.email.getValue(),
            password = this.password.getValue(),
            rePassword = this.rePassword.getValue();
        if(name.trim().length < 2){
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if(!validateName(name)){
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        }else if(phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else if(email.trim() != "" && !validateEmail(email)){
            popupOk('Email không đúng')
        }else if(password.trim().length < 6){
            popupOk('Mật khẩu phải từ 6 ký tự')
        }else if(password != rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else {
           
            // // call api
           let RNAccountKit = accountKit(phone);
            RNAccountKit.loginWithPhone()
            .then((token) => {
                if(token && token.code){
                        signup({
                            name: name,
                            phone: phone,
                            email: email,
                            password: password.replace(/\+84/, "0"),
                        }).then(res => {
                            console.log('res: ', res);
                        if(res.data.code == StatusCode.Success){
                            this.props.dispatch({type: 'LOGIN', data: res.data.data, token: res.data.token})
                            this.props.navigation.navigate(HomeScreen)
                        }else{
                            popupOk(CodeToMessage[res.data.code])
                        }
                        
                    }).catch(err => {
                        console.log('err: ', err.message);
                        popupOk("Đăng ký thất bại")
                    })
                }else {
                    popupOk('Đăng ký thất bại')
                }
            })
        }
    }
}
export default connect()(Register)
const style = StyleSheet.create({
   
})