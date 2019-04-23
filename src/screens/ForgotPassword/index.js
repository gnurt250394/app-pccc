import React from 'react'
import { View, Alert, ActivityIndicator, StyleSheet, StatusBar, TouchableWithoutFeedback, Keyboard ,AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { forgotPassword } from 'config/apis/users'
import { Header, BaseInput, Btn } from 'components'
import { StatusCode, CodeToMessage, popupOk, color } from 'config'
import { SigninScreen, HomeScreen } from 'config/screenNames'
import OneSignal from 'react-native-onesignal';
class ChangePassword extends React.Component {
    state = {
        token: this.props.navigation.getParam('token'),
        password: '',
        rePassword: '',
        loading: false,
        editable: true
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

    render() {
        return (
            <TouchableWithoutFeedback style={style.flex} onPress={this._dismiss}>
                <View >
                    
                    <Header
                        check={1}
                        title="Đổi mật khẩu" onPress={this._goBack} />
                    <View style={style.content}>
                        <View></View>
                        <View>
                            <BaseInput
                                icon={images.keyDark}
                                ref={val => this.password = val}
                                secureTextEntry={true}
                                editable={this.state.editable}
                                placeholder="Mật khẩu mới" />
                            <BaseInput
                                icon={images.keyDark}
                                editable={this.state.editable}
                                ref={val => this.rePassword = val}
                                secureTextEntry={true}
                                placeholder="Nhập lại mật khẩu mới" />
                                {this.state.loading ?
                        <View style={style.loading}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View> : null
                    }
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
    _sendTagOneSignal =(id)=>{
        if(id){
            AsyncStorage.setItem('user_id',`${id}`)
            OneSignal.sendTags({
                userId: `${id}`
              })
              
        }
        console.log(id,'id')
        
    }
    _onSuccess = () => () => {
        let password = this.password ? this.password.getValue() : "";
        let rePassword = this.rePassword ? this.rePassword.getValue() : "";
        if (password.trim().length < 6) {
            popupOk('Mật khẩu từ 6 ký tự')
        } else if (password != rePassword) {
            popupOk('Mật khẩu nhập lại không đúng')
        } else {
            // call api

            if (this.state.loading) {
                return null
            } else {
                this.setState({ loading: true, editable: false })
                forgotPassword({ password: password }, this.state.token).then(res => {
                        console.log(res.data,'res')
                    this.setState({ loading: false, editable: true })
                    if (res.data.code != StatusCode.Success || res.data == "") {
                        popupOk(CodeToMessage[res.data.code])
                    } else {
                        this.setState({ loading: false, editable: true })
                        Alert.alert(
                            'Thông báo',
                            'Thay đổi mật khẩu thành công.',
                            [
                                {
                                    text: 'OK', onPress: async () => {
                                        this._sendTagOneSignal(res.data.data.id)
                                        AsyncStorage.setItem('token',res.data.token)
                                        this.props.navigation.navigate(HomeScreen)
                                    }
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                }).catch(err => {
                    this.setState({ loading: false, editable: true })


                })

            }
        }
    }
}
export default connect()(ChangePassword)

const style = StyleSheet.create({
    flex: { flex: 1 },
    content: { height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40 },
    loading:{
        alignItems:'center',
        justifyContent:'center'
    }
})
