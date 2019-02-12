import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, Input, Btn} from '../layout'
import { ScreenName } from 'config'

class ChangePassword extends React.Component {
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
                <View >
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Header title="Đổi mật khẩu mới" onPress={() => this.props.navigation.goBack()}/>
                    <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                        <View></View>
                        <View>
                            <Input placeholder="Mật khẩu mới" />
                            <Input placeholder="Nhập lại mật khẩu mới" />
                        </View>
                        <Btn name="Hoàn tất" />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(ChangePassword)
