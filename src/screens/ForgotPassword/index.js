import React from 'react'
import { View, Alert, ActivityIndicator, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { forgotPassword } from 'config/apis/users'
import { Header, BaseInput, Btn} from 'components'
import { StatusCode, CodeToMessage, popupOk, color } from 'config'
import  {  SigninScreen } from 'config/screenNames'
class ChangePassword extends React.Component {
    state = {
        token: this.props.navigation.getParam('token'),
        password: '',
        rePassword: '',
        loading: false
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
            <TouchableWithoutFeedback style= { style.flex } onPress={this._dismiss}>
                <View >
                    {   this.state.loading ? 
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View> : null
                    }
                    <Header
                        check={1}
                        title="Đổi mật khẩu" onPress={this._goBack}/>
                    <View style={style.content}>
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

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
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
            this.setState({loading: true}, async () => {
                forgotPassword({password: password}, this.state.token).then(res => {
                    console.log('res: ', res);
                    this.setState({loading: false})
                    if(res.data.code != StatusCode.Success  || res.data == ""){
                        popupOk(CodeToMessage[res.data.code])
                    }else{
                        Alert.alert(
                            'Thông báo',
                            'Thay đổi mật khẩu thành công. Quay lại đăng nhập.',
                            [
                            {text: 'OK', onPress: async () => {
                                this.props.navigation.navigate(SigninScreen)
                            }},
                            ],
                            {cancelable: false},
                        );
                    }
                }).catch(err => {
                    console.log('err: ', err);

                })
            })
        }
    }
}
export default connect()(ChangePassword)

const style = StyleSheet.create({
    flex: { flex:1},
    content: {height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}
})
