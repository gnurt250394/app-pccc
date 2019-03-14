import React from 'react'
import { View, Text, TouchableWithoutFeedback, StatusBar, Keyboard, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { checkPhoneOrEmail, updateUser } from 'config/apis/users'
import { BaseInput, Btn} from 'components'
import { toUpperCase, validateEmail, popupOk, LoginType, StatusCode, CodeToMessage, color } from 'config'
import  { accountKit } from 'config/accountKit'
import  { HomeScreen } from 'config/screenNames'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
class UpdateProfile extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            allowPhone: false,
            allowEmail: true,
        }
        this.user = this.props.navigation.getParam('user')
        this.type = this.props.navigation.getParam('type')
        this.token = this.props.navigation.getParam('token')
        

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
            <TouchableWithoutFeedback style= {style.flex } onPress={this._dismiss}>
            <View style={style.content}>
                <Text style={style.title}>{toUpperCase('Cập nhật thông tin')}</Text>
                <View style={style.h65p}>
                    <BaseInput 
                        styleIcon={style.h15}
                        value={this.user.phone}
                        icon={images.phoneDark}
                        ref={val => this.phone = val}
                        onBlur={this._checkPhone}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Số điện thoại" />
                    {this.type == LoginType.facebook ? <BaseInput 
                        icon={images.emailDark}
                        value={this.user.email}
                        ref={val => this.email = val}
                        onBlur={this._checkEmail}
                        keyboardType='email-address'
                        placeholder="Email" /> : null}

                    <Btn 
                        customStyle={style.mt100}
                        onPress={this._onSuccess()}
                        name="Bước tiếp theo" />
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }


    _dismiss = () => {
        Keyboard.dismiss()
    }

    _checkEmail = () => {
        let email = this.email ? this.email.getValue() : "";
        if(email == "") return;
        try {
            checkPhoneOrEmail({email: email}).then(res => {
                if(res.data.code != StatusCode.Success){
                    this.setState({allowEmail: false})
                    popupOk(CodeToMessage[res.data.code])
                }else{
                    this.setState({allowEmail: true})
                }
            }).catch(err => {
                
                this.setState({allowEmail: false})
            })
        } catch (error) {
            
            this.setState({allowEmail: false})
        }
       
    }

    _checkPhone = () => {
        let phone = this.phone ? this.phone.getValue() : "";
        
        if(phone == "") return;
        try {
            checkPhoneOrEmail({phone: phone}).then(res => {
                
                if(res.data.code != StatusCode.Success  || res.data == ""){
                    this.setState({allowPhone: false})
                    popupOk(CodeToMessage[res.data.code])
                }else{
                    this.setState({allowPhone: true})
                }
    
            }).catch(err => {
                
                this.setState({allowPhone: false})
            })
        } catch (error) {
            
            this.setState({allowPhone: false})
            
        }
    }
    
    
    _onSuccess = () => async () => {
        let phone = this.phone ? this.phone.getValue() : '',
            email = this.email ? this.email.getValue() : '';
            
        if(phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else if(email.trim() != "" && !validateEmail(email)){
            popupOk('Email không đúng')
        }else {
           
           
            // // call api
            if(this.state.allowPhone && this.state.allowEmail){
                let RNAccountKit = accountKit(phone);
                RNAccountKit.loginWithPhone().then((token) => {
                    console.log('token: ', token);
                    if(token && token.code){
                        let data = {
                            phone: phone
                        }
                        if (this.type == LoginType.facebook) data.email = email;
                        

                        updateUser(this.token, data).then(res => {
                            console.log( data,'data')
                            console.log(res,'res')
                            if(res.data.code == StatusCode.Success){
                                this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: res.data.token})
                                navigation.reset(HomeScreen)
                            }else{
                                popupOk(CodeToMessage[res.data.code])
                            }
                        }).catch(err => {
                            popupOk("Cập nhật thông tin thất bại")
                        })
                    }else {
                        popupOk('Cập nhật thông tin thất bại')
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

export default connect()(UpdateProfile)

const style = StyleSheet.create({
    h65p: {height: '65%'},
    h15: {height: 15},
    title: {color: color, fontWeight: 'bold', fontSize: 22, marginBottom: 80, textAlign: 'center'},
    content: {justifyContent: 'space-between', marginTop: 80},
    flex: {flex: 1},
    mt100: {marginTop:  100,}
})