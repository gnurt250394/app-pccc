import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import Header from './layout/Header'
import Input from './layout/Input'
import { ScreenName, toUpperCase } from 'config'

class ForgotPassword extends React.Component {
    render(){
        return (
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Quên mật khẩu"/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 18}}>Nhập Số điện thoại hoặc Email của bạn đã sử dụng để tạo tài khoản</Text>
                    </View>

                    <Input placeholder="Số điện thoại/Email" />
                    <TouchableOpacity 
                        // onPress={() => this.props.navigation.navigate(ScreenName.Signup)}
                        style={[styles.btnLogin,]}>
                        <Text style={styles.textLogin}>{toUpperCase("Gửi")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default connect()(ForgotPassword)
