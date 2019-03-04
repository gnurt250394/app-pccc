import React from 'react'
import { View, Alert, Image, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { signup } from 'config/apis/users'
import { Header, BaseInput, Btn} from 'components'
import { ScreenName, popupOk, color } from 'config'

class ChangePassword extends React.Component {
    state = {
        password: '',
        rePassword: '',
    }
    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
                <View >
                    <Header title="Đổi mật khẩu" onPress={() => this.props.navigation.goBack()}/>
                    <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                        <View></View>
                        <View>
                            <BaseInput 
                                icon={images.keyDark}
                                ref={val => this.password = val}
                                secureTextEntry={true}
                                placeholder="Mật khẩu mới"  />
                            <BaseInput 
                                icon={images.keyDark}
                                ref={val => this.rePassword = val}
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
        let password = this.password ? this.password.getValue() : "";
        let rePassword = this.rePassword ? this.rePassword.getValue() : "";
        if(password.trim().length < 6){
            popupOk('Mật khẩu từ 6 ký tự')
        }else if(password != rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else{
            // call api
        }
    }
}
export default connect()(ChangePassword)
