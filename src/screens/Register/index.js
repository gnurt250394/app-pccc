import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles" 
import { signup, checkPhoneOrEmail } from 'config/apis/users'
import { BaseInput, Btn} from 'components'
import { toUpperCase, validateEmail, popupOk, validateName, StatusCode, CodeToMessage, color } from 'config'
import  { accountKit } from 'config/accountKit'
import  { SigninScreen, HomeScreen } from 'config/screenNames'
import { actionTypes } from 'actions'
class Register extends React.Component {
    state = {
        allowPhone: false,
        allowEmail: true,
        name: ""
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
            <TouchableWithoutFeedback style= {style.flex} onPress={this._dismiss}>
            <View style={styles.content}>
                <Text style={style.title}>{toUpperCase('Đăng ký')}</Text>
                <View style={style.h70p}>
                    <BaseInput 
                        icon={images.userDark}
                        value={this.state.name}
                        onBlur={this._removeSpage}
                        ref={val => this.name = val}
                        placeholder="Họ và tên" />
                    <BaseInput 
                        styleIcon={style.h15}
                        icon={images.phoneDark}
                        removeSpace={true}
                        ref={val => this.phone = val}
                        onBlur={this._checkPhone}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Số điện thoại" />
                    <BaseInput 
                        icon={images.emailDark}
                        removeSpace={true}
                        ref={val => this.email = val}
                        onBlur={this._checkEmail}
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
                        customStyle={style.btn}
                        onPress={this._onSuccess()}
                        name="Bước tiếp theo" />

                    <TouchableOpacity 
                        style={style.boxForgot}
                        onPress={this._navTo(SigninScreen)}>
                        <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _removeSpage = () => {
        let name = this.name.getValue();
            name = name.trim();
        this.setState({name: name})
    }

    _checkEmail = () => {
        let email = this.email.getValue();
        if(email == "") return;
        try {
            checkPhoneOrEmail({email: email}).then(res => {
                if(res.data.code != StatusCode.Success  || res.data == ""){
                    this.setState({allowEmail: false})
                    popupOk(CodeToMessage[res.data.code])
                }else{
                    this.setState({allowEmail: true})
                }
            }).catch(err => {
                console.log('err: ', err);
                this.setState({allowEmail: false})
            })
        } catch (error) {
            console.log('error: ', error);
            this.setState({allowEmail: false})
        }
       
    }

    _checkPhone = () => {
        let phone = this.phone.getValue();
        if(phone == "") return;
        try {
            checkPhoneOrEmail({phone: phone}).then(res => {
                console.log('res: ', res);
                if(res.data.code != StatusCode.Success || res.data == ""){
                    this.setState({allowPhone: false})
                    popupOk(CodeToMessage[res.data.code])
                }else{
                    this.setState({allowPhone: true})
                }
    
            }).catch(err => {
                console.log('err: ', err);
                this.setState({allowPhone: false})
            })
        } catch (error) {
            console.log('error: ', error);
            this.setState({allowPhone: false})
            
        }
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
            if(this.state.allowPhone && this.state.allowEmail){
                let RNAccountKit = accountKit(phone);
                RNAccountKit.loginWithPhone()
                .then((token) => {
                    if(token && token.code){
                            signup({
                                name: name,
                                phone: phone.replace(/\+84/, "0"),
                                email: email,
                                password: password,
                            }).then(res => {
                            if(res.data.code == StatusCode.Success){
                                this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: res.data.token})
                                this.props.navigation.navigate(HomeScreen)
                            }else{
                                popupOk(CodeToMessage[res.data.code])
                            }
                            
                        }).catch(err => {
                            popupOk("Đăng ký thất bại")
                        })
                    }else {
                        popupOk('Đăng ký thất bại')
                    }
                })
            }else if(!this.state.allowPhone){
                popupOk('Số điện thoại đã được sử dụng')
            }else if(!this.state.allowEmail){
                popupOk('Email đã được sử dụng')
            }else{
                popupOk('Email & Số điện thoại đã được sử dụng')
            }
        }
    }
}
export default connect()(Register)

const style = StyleSheet.create({
    btn: {marginTop:  40, marginBottom: 50},
    boxForgot: {width: '50%', alignSelf: 'center',},
    h15: {height: 15},
    h70p: {height: '70%'},
    title: {color: color, fontWeight: 'bold', fontSize: 22, marginBottom: '10%', textAlign: 'center'},
    flex: {flex: 1}
})