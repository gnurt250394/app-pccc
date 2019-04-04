import React from 'react'
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { Header, BaseInput, Btn} from 'components'
import {  popupOk, color, CodeToMessage, StatusCode } from 'config'
import  { accountKit } from 'config/accountKit'
import  { ForgotPasswordScreen  } from 'config/screenNames'
import {  checkPhoneOrEmail } from 'config/apis/users'


class CheckPhone extends React.Component {
    state = {
        password: '',
        rePassword: '',
        loading: false
    }
    // set status bar
    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('light-content');
        //   StatusBar.setBackgroundColor(color);
        // });
      }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }

    render(){
        return (
            <TouchableWithoutFeedback style= { style.flex } onPress={this._dismiss}>
                <View >
                    {   this.state.loading ? 
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View> : null
                    }
                    <Header 
                        ckeck={1}
                        title="Nhập số điện thoại" onPress={this._goBack}/>
                    <View style={style.content}>
                        <View></View>
                        <View>
                            <BaseInput 
                                styleIcon={style.h15}
                                icon={images.phoneDark}
                                removeSpace={true}
                                ref={val => this.phone = val}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholder="Nhập số điện thoại"  />
                            
                        </View>
                        <Btn name="Bước tiếp theo" onPress={this._onSuccess()} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _onSuccess = () => () => {
        let phone = this.phone ? this.phone.getValue() : "";

        if(phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else{
            // call api
            checkPhoneOrEmail({phone: phone}).then(res => {
                console.log('res: ', res);
                if(res.data.code == StatusCode.Success || res.data == ""){
                    popupOk("Số điện thoại chưa đăng ký")
                }else{
                    let RNAccountKit = accountKit(phone)
                    RNAccountKit.loginWithPhone()
                        .then((token) => {
                            if(token && token.code){
                                this.props.navigation.navigate(ForgotPasswordScreen);
                            }
                        })
                }
    
            }).catch(err => {
                console.log('err: ', err);
            })

            
        }
    }
}
export default connect()(CheckPhone)

const style = StyleSheet.create({
    flex: { flex:1},
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40},
    h15: {height: 15},
})
