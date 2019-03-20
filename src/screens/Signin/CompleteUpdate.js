import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, Keyboard, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import styles from "assets/styles"
import { updateUser } from 'config/apis/users'
import { Header, Input, Btn} from 'components'
import {  toUpperCase, popupOk, StatusCode, CodeToMessage } from 'config'
import  { HomeScreen} from 'config/screenNames'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService'

class CompleteUpdate extends React.Component {
    constructor(props){
        super(props)
        this.state  = {
            phone: this.props.navigation.getParam('phone'),
            token: this.props.navigation.getParam('token'),
            confirmResult: this.props.navigation.getParam('confirmResult'),
            verifyCode: '',
            loading: false
        }
        console.log(1, this.state);
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
                        name="Hoàn tất" />
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
                    let phone = this.state.phone
                    phone = phone.replace(/\+84/, "0")

                    updateUser(this.state.token, { phone: phone}).then(res => {
                        console.log(res,'res')
                        if(res.data.code == StatusCode.Success){
                            this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: res.data.token})
                            // navigation.reset(HomeScreen)
                            this.props.navigation.navigate(HomeScreen)
                        }else{
                            popupOk(CodeToMessage[res.data.code])
                        }
                    }).catch(err => {
                        console.log('err: ', err);
                        this.setState({loading: false})
                        popupOk("Cập nhật thông tin thất bại")
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
export default connect()(CompleteUpdate)

const style = StyleSheet.create({
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40},
    flex: { flex:1},
    msg: {textAlign: "center", fontSize: 18},
    inputView: {flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: '#C3E5FE', width:'80%', alignSelf: 'center', alignItems: 'center', marginBottom: 15, paddingBottom: 0},
    resend: {padding: 0, marginBottom: 0},
    input: {margin: 0, borderBottomWidth: 0, padding: 0}
})
