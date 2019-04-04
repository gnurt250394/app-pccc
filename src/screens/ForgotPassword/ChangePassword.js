import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { signup, changePassword } from 'config/apis/users'
import { Header, BaseInput, Btn} from 'components'
import { ScreenName, popupOk } from 'config'
import { Status } from 'config/Controller';
import { CodeToMessage } from 'config';
import navigation from 'navigation/NavigationService';

class ChangePassword extends React.Component {
    state = {
        password: '',
        oldPassword: '',
        rePassword: '',
        loading:false
    }
    
    render(){
        return (
            <TouchableWithoutFeedback style= { style.flex } onPress={this._dismiss}>
                <View >
                    
                    <Header
                    check={1}
                     title="Đổi mật khẩu mới" onPress={this._goBack}/>
                    <View style={style.content}>
                        <View></View>
                        <View>
                            <BaseInput 
                                icon={images.keyDark}
                                ref={val => this.oldPassword = val}
                                secureTextEntry={true}
                                placeholder="Mật khẩu hiện tại"  />
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
                        <Btn name="Hoàn tất" onPress={this._onSuccess} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _onSuccess = () => {
        let oldPassword = this.oldPassword ? this.oldPassword.getValue() : "",
            password = this.password ? this.password.getValue() : "",
            rePassword = this.rePassword ? this.rePassword.getValue() : "";

        if(oldPassword.trim().length == 0 ){
            popupOk('Mật khẩu hiện tại không đúng')
        }else if(password.trim().length < 6){
            popupOk('Mật khẩu mới phải từ 6 ký tự')
        }else if(password != rePassword){
            popupOk('Mật khẩu nhập lại không đúng')
        }else{
            let params ={
                old_password: oldPassword,
                new_password: password
            }
            console.log(params,'sssss')
            changePassword(params).then(res=>{
                console.log(res.data,'aaaa')
                if(res.data.code == Status.SUCCESS){
                    popupOk('Đổi mật khẩu thành công')
                    navigation.pop()
                } else if(res.data.code == Status.TOKEN_EXPIRED){
                    popupOk('Phiên đăng nhập hết hạn')
                } else if(res.data.code == Status.TOKEN_VALID){
                    popupOk('Phiên đăng nhập hết hạn')
                } else if(res.data.code == Status.PASS_FAIL){
                    popupOk(CodeToMessage[res.data.code])
                }
            })
        }
    }
}
export default connect()(ChangePassword)

const style = StyleSheet.create({
    flex: { flex:1},
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}
})