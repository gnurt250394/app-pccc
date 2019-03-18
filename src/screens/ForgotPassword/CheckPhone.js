import React from 'react'
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { Header, BaseInput, Btn} from 'components'
import {  popupOk, color, CodeToMessage, StatusCode } from 'config'
import  { accountKit } from 'config/accountKit'
import  { CompleteUpdateScreen  } from 'config/screenNames'
import {  checkPhoneOrEmail } from 'config/apis/users'
import * as firebase from 'react-native-firebase'

class CheckPhone extends React.Component {
    state = {
        password: '',
        rePassword: '',
        loading: false
    }
    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
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
                    <Header title="Nhập số điện thoại" onPress={this._goBack}/>
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
                    this.setState({loading: true}, () => {
                        phone = phone.replace(/^0+/, "+84");
                        firebase.auth().signInWithPhoneNumber(phone)
                            .then(confirmResult => {
                                this.setState({loading: false})
                                popupOk('Một mã xác nhận đã được gửi về số điện thoại của bạn. Vui lòng kiểm tra tin nhắn.')
                                // this.props.navigation.navigate(CompleteUpdateScreen, {phone: phone, confirmResult: confirmResult, token: this.state.token})
                                
                            })// save confirm result to use with the manual verification code)
                            .catch(error => {
                                console.log('error: ', error);
                                this.setState({loading: false})
                                popupOk('Không thể gửi mã xác nhận')
                            });
                    });
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
