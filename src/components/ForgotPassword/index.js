import React from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, Input, Btn} from '../layout'
import { ScreenName, toUpperCase } from 'config'
import RNAccountKit from 'react-native-facebook-account-kit'

class ForgotPassword extends React.Component {
    nextPage=()=>{
        // RNAccountKit.loginWithPhone()
        // .then((token) => {
        //   if (!token) {
        //     console.log('Login cancelled')
        //   } else {
        //     console.log(`Logged with phone. Token: ${JSON.stringify(token)}`)
          
        //   }
        // })
        this.props.navigation.navigate(ScreenName.Otp)
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Quên mật khẩu" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 18}}>Nhập Số điện thoại hoặc Email của bạn đã sử dụng để tạo tài khoản</Text>
                    </View>

                    <Input placeholder="Số điện thoại/Email" />
                    
                    <Btn
                    onPress={this.nextPage}
                     name="Gửi" />
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(ForgotPassword)
