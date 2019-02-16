import React from 'react'
import { View, Alert, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, BaseInput, Btn} from '../layout'
import { ScreenName, popupOk } from 'config'

class ChangePassword extends React.Component {
    state = {
        password: '',
        rePassword: '',
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
                <View >
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <Header title="Đổi mật khẩu mới" onPress={() => this.props.navigation.goBack()}/>
                    <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                        <View></View>
                        <View>
                            <BaseInput 
                                icon={images.keyDark}
                                onChangeText={val => this.setState({password: val})}
                                secureTextEntry={true}
                                placeholder="Mật khẩu mới"  />
                            <BaseInput 
                                icon={images.keyDark}
                                onChangeText={val => this.setState({rePassword: val})}
                                secureTextEntry={true}
                                placeholder="Nhập lại mật khẩu mới"  />
                        </View>
                        <Btn name="Hoàn tất" onPress={this._onSuccess()} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _onSuccess = () => () => {
        if(this.state.password.trim().length < 6){
            popupOk('Mật khẩu từ 6 ký tự')
        }else if(this.state.password != this.state.rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else{
            // call api
        }
    }
}
export default connect()(ChangePassword)
