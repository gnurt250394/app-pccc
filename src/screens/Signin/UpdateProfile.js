import React from 'react'
import { View, Text, TouchableWithoutFeedback, StatusBar, Keyboard, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { checkPhoneOrEmail } from 'config/apis/users'
import { BaseInput, Btn} from 'components'
import { toUpperCase,  popupOk, StatusCode, CodeToMessage, color } from 'config'
import  { CompleteUpdateScreen } from 'config/screenNames'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
import * as firebase from 'react-native-firebase'

class UpdateProfile extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            allowPhone: false,
            loading: false,
            token: this.props.navigation.getParam('token'),
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
                <Text style={style.title}>{toUpperCase('Cập nhật thông tin')}</Text>
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
                    phone = phone.replace(/^0+/, "+84");
                    firebase.auth().signInWithPhoneNumber(phone)
                        .then(confirmResult => {
                            this.setState({loading: false})
                            // popupOk('Một mã xác nhận đã được gửi về số điện thoại của bạn. Vui lòng kiểm tra tin nhắn.')
                            this.props.navigation.navigate(CompleteUpdateScreen, {phone: phone, confirmResult: confirmResult, token: this.state.token})
                            
                        })// save confirm result to use with the manual verification code)
                        .catch(error => {
                            console.log('error: ', error);
                            this.setState({loading: false})
                            popupOk('Không thể gửi mã xác nhận')
                        });
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