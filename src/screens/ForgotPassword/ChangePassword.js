import React from 'react'
import { View, Alert, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Header, BaseInput, Btn} from 'components'
import { ScreenName, popupOk } from 'config'

class ChangePassword extends React.Component {
    state = {
        password: '',
        oldPassword: '',
        rePassword: '',
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
                <View >
                    
                    <Header title="Đổi mật khẩu mới" onPress={() => this.props.navigation.goBack()}/>
                    <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                        <View></View>
                        <View>
                            <BaseInput 
                                icon={images.keyDark}
                                onChangeText={val => this.setState({oldPassword: val})}
                                secureTextEntry={true}
                                placeholder="Mật khẩu hiện tại"  />
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
        if(this.state.oldPassword.trim().length == 0 ){
            popupOk('Mật khẩu hiện tại không đúng')
        }else if(this.state.password.trim().length < 6){
            popupOk('Mật khẩu mới phải từ 6 ký tự')
        }else if(this.state.password != this.state.rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else{
            // call api
        }
    }
}
export default connect()(ChangePassword)
