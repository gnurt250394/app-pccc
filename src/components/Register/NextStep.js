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
        username: "",
        password: "",
        rePassword: "",
    }
    _signup = async () => {
        if(
            this.state.fullname == "" || 
            this.state.username == "" || 
            this.state.password == "" 
        ){
            Alert.alert("Vui lòng nhập đủ thông tin");
        }else if(this.state.password != this.state.rePassword){
            Alert.alert("Mật khẩu nhập lại không đúng");
        }else{
            // something here
            let data = await signup({
                fullname: this.state.fullname,
                username: this.state.username,
                password: this.state.password,
            })
            console.log('data: ', data);
        }
    }
    render(){
        return (
            <View style={styles.content}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={{height: "60%"}}>
                    <Input placeholder="Tên tài khoản" />
                    <Input placeholder="Số điện thoại/Email" />
                    <Input 
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    <Input 
                        secureTextEntry={true}
                        placeholder="Nhập lại mật khẩu" />
                    
                    <Btn 
                        customStyle={{marginTop:  50,}}
                        name="Bước tiếp theo" />

                    <Text style={styles.forgot}>Tôi đã có tài khoản</Text>
                    
                </View>
                
            </View>
        )
    }
}
export default connect()(NextStep)
