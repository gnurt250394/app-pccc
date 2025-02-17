import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, Input, Btn} from '../layout'
import { ScreenName, toUpperCase } from 'config'

class Complete extends React.Component {
    render(){
        return (
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Nhập mã OTP" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 18}}>Một mã xác thực đã được gửi đến số điện thoại của bạn. Vui lòng nhập mã OTP để xác thực</Text>
                    </View>
                    <View style={[styles.row,{width: "70%", alignSelf: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1, alignItems: 'center', paddingBottom: 0}]}>
                        <Input 
                            customStyle={{margin: 0, borderBottomWidth: 0, padding: 0}}
                            placeholder="Nhập mã OTP" />
                        <TouchableOpacity style={{padding: 0, marginBottom: 0}}>
                            <Text>{toUpperCase("Gửi lại")} (60)</Text>
                        </TouchableOpacity>
                    </View>
                    <Btn name="Hoàn tất đăng ký" />
                </View>
            </View>
        )
    }
}
export default connect()(Complete)
