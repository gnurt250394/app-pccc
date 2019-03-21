import React from 'react'
import { View, Text, TouchableWithoutFeedback, StatusBar, Keyboard, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { checkPhoneOrEmail, updateUser } from 'config/apis/users'
import { BaseInput, Btn} from 'components'
import { toUpperCase,  popupOk, StatusCode, CodeToMessage, color } from 'config'
import  { HomeScreen } from 'config/screenNames'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
import * as firebase from 'react-native-firebase'
import  { accountKit } from 'config/accountKit'

class UpdateProfile extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            allowPhone: false,
            loading: false,
            // token: this.props.navigation.state && this.props.navigation.state.params.token,
            user: this.props.navigation.getParam('user'),
        }
        

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
                {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                <Text style={style.title}>{toUpperCase('Cập nhật số điện thoại')}</Text>
                <View style={style.h65p}>
                    <BaseInput 
                        styleIcon={style.h15}
                        icon={images.phoneDark}
                        ref={val => this.phone = val}
                        onBlur={this._checkPhone}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder="Số điện thoại" />

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
        let phone = this.phone ? this.phone.getValue() : '';
            
        if(phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else {
           
            // // call api
            if(this.state.allowPhone){
                this.setState({loading: true}, () => {
                    
                    let RNAccountKit = accountKit(phone);
                    RNAccountKit.loginWithPhone().then((token) => {
                    console.log('token: ', token);
                    if(token && token.code){
                        phone = phone.replace(/\+84/, "0")
                        
                        updateUser(this.state.token, {phone: phone}).then(res => {
                            if(res.data.code == StatusCode.Success){
                                // AsyncStorage.setItem('token', this.state.token)
                                this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: this.state.token})
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
                });
            }else{
                popupOk('Số điện thoại đã được sử dụng')
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