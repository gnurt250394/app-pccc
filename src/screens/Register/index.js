import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, StyleSheet, ActivityIndicator, Platform, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup, checkPhoneOrEmail } from 'config/apis/users'
import { BaseInput, Btn } from 'components'
import { toUpperCase, validateEmail, popupOk, validateName, StatusCode, CodeToMessage, color, defaultStyle, height, smallScreen } from 'config'
import { accountKit } from 'config/accountKit'
import { SigninScreen, HomeScreen, } from 'config/screenNames'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService'
import { fontStyle } from 'config/Controller';
import { fontStyles } from 'config/fontStyles';

class Register extends React.Component {
    state = {
        allowPhone: false,
        loading: false,
        allowEmail: true,
        name: "",
        isSuccess: false
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

    render() {
        return (

            <TouchableWithoutFeedback style={style.flex} onPress={this._dismiss}>
            {this.state.isSuccess?
                        <View style={style.loading}>
                            <ActivityIndicator size="large" color="#2166A2" />
                        </View> : 
                    
                <View style={styles.content}>
                    {this.state.loading ?
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#2166A2" />
                        </View> : null
                    }
                    

                    <Text style={[style.title, fontStyles.bold]}>{toUpperCase('Đăng ký')}</Text>
                    <View style={style.h70p}>
                        <BaseInput
                            icon={images.userDark}
                            value={this.state.name}
                            onBlur={this._removeSpage}
                            ref={val => this.name = val}
                            placeholder="Họ và tên" />
                        <BaseInput
                            styleIcon={[style.h15,{marginBottom:Platform.OS =="ios"?4:4}]}
                            customStyle={{marginTop:Platform.OS =="ios"? 7:0,marginBottom:Platform.OS =="ios"? 6:0}}
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
                            customStyle={{marginTop:Platform.OS =="ios"? 6:0,marginBottom:Platform.OS =="ios"? 4:0}}
                            ref={val => this.email = val}
                            onBlur={this._checkEmail}
                            keyboardType='email-address'
                            placeholder="Email" />

                        <BaseInput
                            icon={images.keyDark}
                            ref={val => this.password = val}
                            secureTextEntry={true}
                            placeholder="Mật khẩu" />
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

                </View>}
            </TouchableWithoutFeedback>
        )
    }

    _navTo = (screen, params = {}) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _removeSpage = () => {
        let name = this.name.getValue();
        name = name.trim();
        this.setState({ name: name })
    }

    _checkEmail = () => {
        let email = this.email.getValue();
        if (email == "") return;
        try {
            this.setState({ loading: true }, () => {
                checkPhoneOrEmail({ email: email }).then(res => {
                    if (res.data.code != StatusCode.Success || res.data == "") {
                        this.setState({ allowEmail: false, loading: false })
                        popupOk(CodeToMessage[res.data.code])
                    } else {
                        this.setState({ allowEmail: true, loading: false })
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    this.setState({ allowEmail: false, loading: false })
                })
            })
        } catch (error) {
            console.log('error: ', error);
            this.setState({ allowEmail: false })
        }

    }



    _checkPhone = () => {
        let phone = this.phone.getValue();
        if (phone == "") return;
        try {
            this.setState({ loading: true }, () => {
                checkPhoneOrEmail({ phone: phone }).then(res => {
                    console.log('res: ', res);
                    if (res.data.code != StatusCode.Success || res.data == "") {
                        this.setState({ allowPhone: false, loading: false })
                        popupOk(CodeToMessage[res.data.code])
                    } else {
                        this.setState({ allowPhone: true, loading: false })
                    }

                }).catch(err => {
                    console.log('err: ', err);
                    this.setState({ allowPhone: false, loading: false })
                })
            })

        } catch (error) {
            console.log('error: ', error);
            this.setState({ allowPhone: false })

        }
    }


    _onSuccess = () => async () => {
        
        let name = this.name.getValue()
        let phone = this.phone.getValue(),
            email = this.email.getValue(),
            password = this.password.getValue(),
            rePassword = this.rePassword.getValue();

        let allowEmail = this.state.allowEmail;
        if (email.trim() == "") allowEmail = true;

        if (name.trim().length < 2) {
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if (!validateName(name)) {
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        } else if (phone.trim().length != 10) {
            popupOk('Số điện thoại không đúng')
        } else if (email.trim() != "" && !validateEmail(email)) {
            popupOk('Email không đúng')
        } else if (password.trim().length < 6) {
            popupOk('Mật khẩu phải từ 6 ký tự')
        } else if (password != rePassword) {
            popupOk('Mật khẩu nhập lại không đúng')
        } else {
            this.setState({isSuccess:true})
            // // call api
            if (this.state.allowPhone && allowEmail) {
                let RNAccountKit = accountKit(phone);
                RNAccountKit.loginWithPhone()
                    .then((token) => {
                        if (token && token.code) {
                            signup({
                                name: name,
                                phone: phone.replace(/\+84/, "0"),
                                email: email,
                                password: password,
                            }).then(res => {
                                if (res.data.code == StatusCode.Success) {
                                    AsyncStorage.setItem('token', res.data.token)
                                    this.setState({isSuccess:false})
                                    navigation.reset(HomeScreen)
                                } else {
                                    this.setState({isSuccess:false})
                                    popupOk(CodeToMessage[res.data.code])
                                }

                            }).catch(err => {
                                console.log('err: ', err);
                                this.setState({isSuccess:false})
                                popupOk("Đăng ký thất bại")
                            })
                        } else {
                            this.setState({isSuccess:false})
                            // popupOk('Đăng ký thất bại')
                        }
                    })
            } else if (!this.state.allowPhone) {
                this.setState({isSuccess:false})
                popupOk('Số điện thoại đã được sử dụng')
            } else if (!allowEmail) {
                this.setState({isSuccess:false})
                popupOk('Email đã được sử dụng')
            } else {
                this.setState({isSuccess:false})
                popupOk('Email & Số điện thoại đã được sử dụng')
            }
        }
    }
}
export default connect()(Register)

const style = StyleSheet.create({
    btn: { marginTop: 40, marginBottom: 50 },
    boxForgot: { width: '50%', alignSelf: 'center', },
    h15: { height: 15, },
    h70p: { height: '70%' },
    title: {
        color: color, fontSize: height < smallScreen ? 16 : 22, fontWeight: '500', marginBottom: '10%', textAlign: 'center',
        // fontFamily: fontStyles.bold,
    },
    flex: { flex: 1 },
    btnClose: { position: 'absolute', top: 0, right: 10, padding: 20, },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    
})