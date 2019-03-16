import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Header, Input, Btn} from 'components'
import {  toUpperCase, popupOk, StatusCode, CodeToMessage } from 'config'
import  { HomeScreen} from 'config/screenNames'
import { actionTypes } from 'actions'
class Complete extends React.Component {
    constructor(props){
        super(props)
        this.state  = {
            user: this.props.navigation.getParam('data'),
            confirmResult: this.props.navigation.getParam('confirmResult'),
            verifyCode: '',
            loading: false
        }
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
                <Header title="Nhập mã OTP" check={1} onPress={this._goBack}/>
                <View style={style.content}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={style.msg}>Một mã xác thực đã được gửi đến số điện thoại của bạn. Vui lòng nhập mã OTP để xác thực</Text>
                    </View>
                    <View style={style.inputView}>
                        <Input 
                            onChangeText={this.onChangeText('verifyCode')}
                            customStyle={style.input}
                            placeholder="Nhập mã OTP" />
                        <TouchableOpacity style={style.resend}>
                            <Text>{toUpperCase("Gửi lại")} (60)</Text>
                        </TouchableOpacity>
                    </View>
                    <Btn 
                        onPress={this._onSuccess}
                        name="Hoàn tất đăng ký" />
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

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _onSuccess = () => {
        if(this.state.verifyCode == ""){
            popupOk("Vui lòng nhập mã xác nhận")
        }else{
            this.setState({loading: true}, () => {
                this.state.confirmResult.confirm(this.state.verifyCode)
                .then(user => {
                    let body = {...this.state.user}
                    body.phone = body.phone.replace(/\+84/, "0")
                    signup(body).then(res => {
                        this.setState({loading: false})
                        if(res.data.code == StatusCode.Success){
                            AsyncStorage.setItem('token',res.data.token)
                            this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: res.data.token})
                            this.props.navigation.navigate(HomeScreen)
                        }else{
                            popupOk(CodeToMessage[res.data.code])
                        }
                    })
                }).catch(err => {
                    this.setState({loading: false})
                    popupOk("Mã xác nhận không đúng.")
                    console.log('err: ', err);

                })
            })
            
        }
    }
}
export default connect()(Complete)

const style = StyleSheet.create({
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40},
    flex: { flex:1},
    msg: {textAlign: "center", fontSize: 18},
    // viewInput: { alignSelf: 'center',borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', borderBottomWidth: 1, alignItems: 'center', paddingBottom: 0},
    inputView: {flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 0},
    resend: {padding: 0, marginBottom: 0},
    input: {margin: 0, borderBottomWidth: 0, padding: 0}
})
