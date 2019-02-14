import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { BaseInput, Btn} from '../layout'
import { ScreenName, toUpperCase, validateEmail } from 'config'
class Register extends React.Component {
    state = {
        name: "",
        phone: "",
        email: "",
        password: "",
        rePassword: "",
    }
    
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={styles.content}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Text style={{color: '#F55555', fontWeight: 'bold', fontSize: 22, marginBottom: '15%', textAlign: 'center'}}>{toUpperCase('Đăng ký')}</Text>
                <View style={{height: "60%"}}>
                    <BaseInput 
                        icon={images.userDark}
                        onChangeText={val => this.setState({name: val})}
                        placeholder="Họ và tên" />
                    <BaseInput 
                        styleIcon={{width: 15}}
                        icon={images.phoneDark}
                        onChangeText={val => this.setState({phone: val})}
                        keyboardType='numeric'
                        placeholder="Số điện thoại" />
                    <BaseInput 
                        icon={images.emailDark}
                        onChangeText={val => this.setState({email: val})}
                        keyboardType='email-address'
                        placeholder="Email" />
                    <BaseInput 
                        icon={images.keyDark}
                        onChangeText={val => this.setState({password: val})}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    <BaseInput 
                        icon={images.keyDark}
                        onChangeText={val => this.setState({rePassword: val})}
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu" />
                    
                    <Btn 
                        customStyle={{marginTop:  50,}}
                        onPress={this._onSuccess()}
                        name="Bước tiếp theo" />

                    <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate(ScreenName.Signin)}>
                           <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }
    _alert(msg){
        Alert.alert(
            'Thông báo',
            msg,
            [
              {
                text: 'ok',style: 'cancel',
              },
              
            ],
            {cancelable: false},
        );
    }
    _onSuccess = () => () => {
        console.log(11);
        if(this.state.name.trim() == ''){
            this._alert('Họ và tên không được để trống')
        }else if(this.state.phone.trim().length != 10){
            this._alert('Số điện thoại không đúng')
        }else if(!validateEmail(this.state.email)){
            this._alert('Email không đúng')
        }else if(this.state.password.trim().length < 6){
            this._alert('Mật khẩu phải từ 6 ký tự')
        }else if(this.state.password != this.state.rePassword){
            this._alert('Mật khẩu nhập lại không đúng')
        }else {
            // call api
        }
    }
}
export default connect()(Register)
const style = StyleSheet.create({
   
})