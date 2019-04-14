import React from 'react'
import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { updateUser } from 'config/apis/users'
import {  color, popupOk, StatusCode, CodeToMessage } from 'config'
import { Input, Btn, Header, BaseInput} from 'components'
import { loginAction } from 'reduxs/actions/actionCreator';

class Confirm extends React.Component {
    state = {
        phone: "",
    }

    constructor(props){
        super(props)
        this.user = this.props.navigation.getParam('data')
        console.log('this.user: ', this.user);
    }
    confirm = () => {
        let phone = this.phone ? this.phone.getValue() : "";
        if(phone.trim().length != 10){
            popupOk('Số điện thoại không đúng')
        }else { 
            updateUser(this.token, data).then(res => {
                console.log( data,'data')
                console.log(res,'res')
                if(res.data.code == StatusCode.Success){
                    this.props.login(res.data.data,res.data.token)
                    navigation.reset(HomeScreen)
                }else{
                    popupOk(CodeToMessage[res.data.code])
                }
            }).catch(err => {
                popupOk("Cập nhật thông tin thất bại")
            })
        }
        
       
    }
    
    render(){
        return (
            <TouchableWithoutFeedback style= { style.flex } onPress={this._dismiss}>
                <View >
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Header title="Xác thực tài khoản" onPress={this._goBack }/>
                    <View style={style.content}>
                        <View style={style.boxMsg}>
                            <Text style={style.msg}>Nhập số điện thoại của bạn để xác thực tài khoản đăng ký</Text>
                        </View>
                        <BaseInput 
                            styleIcon={style.h15}
                            icon={images.phoneDark}
                            removeSpace={true}
                            ref={val => this.phone = val}
                            onBlur={this._checkPhone}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder="Số điện thoại" />

                        <Btn
                            onPress={this.confirm} 
                            name="Gửi" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _checkPhone = () => {
        let phone = this.phone.getValue();
        if(phone == "") return;
        try {
            this.setState({loading: true}, () => {
                checkPhoneOrEmail({phone: phone}).then(res => {
                    console.log('res: ', res);
                    if(res.data.code != StatusCode.Success || res.data == ""){
                        this.setState({allowPhone: false, loading: false})
                        popupOk(CodeToMessage[res.data.code])
                    }else{
                        this.setState({allowPhone: true, loading: false})
                    }
        
                }).catch(err => {
                    console.log('err: ', err);
                    this.setState({allowPhone: false, loading: false})
                })
            })
            
        } catch (error) {
            console.log('error: ', error);
            this.setState({allowPhone: false})
            
        }
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
      login:(user,token)=>dispatch(loginAction(user,token))
    }
  }
export default connect(mapDispatchToProps)(Confirm)
const style = StyleSheet.create({
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40},
    flex: { flex:1},
    msg: {textAlign: "center", fontSize: 18},
    boxMsg: {width: "80%", alignSelf: 'center'},
    inputView: {flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 0},
    resend: {padding: 0, marginBottom: 0},
    input: {margin: 0, borderBottomWidth: 0, padding: 0},
    btn: {marginTop:  40, marginBottom: 50},
    boxForgot: {width: '50%', alignSelf: 'center',},
    h15: {height: 15},
    h70p: {height: '70%'},
    title: {color: color, fontWeight: 'bold', fontSize: 22, marginBottom: '10%', textAlign: 'center'},
    flex: {flex: 1}
})
