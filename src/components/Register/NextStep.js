import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import {StackActions,NavigationActions} from 'react-navigation'
import { signup } from 'config/api'
import { Input, Btn} from '../layout'
import { ScreenName } from 'config'
class NextStep extends React.Component {
    state = {
        fullname: "",
        phone: "",
        password: "",
        rePassword: "",
    }
    
    register=()=>{
        const pushAction = StackActions.push({
            routeName: ScreenName.Signin,
            params:{
                user: this.state.phone,
                pass: this.state.password
            }
            
        })
        this.props.navigation.dispatch(pushAction)
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={styles.content}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={{height: "60%"}}>
                    <Input 
                        onChangeText={val => this.setState({fullname: val})}
                        placeholder="Tên tài khoản" />
                    <Input 
                        onChangeText={val => this.setState({phone: val})}
                        placeholder="Số điện thoại/Email" />
                    <Input 
                        onChangeText={val => this.setState({password: val})}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    <Input 
                        onChangeText={val => this.setState({rePassword: val})}
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu" />
                    
                    <Btn 
                        customStyle={{marginTop:  50,}}
                        onPress={this.register}
                        name="Bước tiếp theo" />

                    <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate(ScreenName.Signin)}>
                           <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(NextStep)
