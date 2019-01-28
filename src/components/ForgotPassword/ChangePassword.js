import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, Input, Btn} from '../layout'
import { ScreenName } from 'config'

class ChangePassword extends React.Component {
    render(){
        return (
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Đổi mật khẩu mới"/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View></View>
                    <View>
                        <Input placeholder="Mật khẩu mới" />
                        <Input placeholder="Nhập lại mật khẩu mới" />
                    </View>
                    <Btn name="Hoàn tất" />
                </View>
            </View>
        )
    }
}
export default connect()(ChangePassword)
