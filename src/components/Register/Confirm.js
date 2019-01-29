import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Input, Btn, Header} from '../layout'

class Confirm extends React.Component {
    state = {
        fullname: "",
    }
    
    render(){
        return (
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Xác thực tài khoản" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 18}}>Nhập số điện thoại của bạn để xác thực tài khoản đăng ký</Text>
                    </View>
                    <Input 
                        // customStyle={{margin: 0, borderBottomWidth: 0, padding: 0}}
                        placeholder="Số điện thoại" />
                    <Btn name="Gửi" />
                </View>
            </View>
        )
    }
}
export default connect()(Confirm)
