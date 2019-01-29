import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Input, Btn} from '../layout'

class NextStep extends React.Component {
    state = {
        fullname: "",
        phone: "",
        password: "",
        rePassword: "",
    }
    
    render(){
        return (
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
                        onPress={() => console.log()}
                        name="Bước tiếp theo" />

                    <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    
                </View>
                
            </View>
        )
    }
}
export default connect()(NextStep)
