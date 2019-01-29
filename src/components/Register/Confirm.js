import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Input, Btn, Header} from '../layout'
import RNAccountKit from 'react-native-facebook-account-kit'

class Confirm extends React.Component {
    state = {
        phone: "",
    }

    confirm = () => {
        // if(this.state.phone.trim().length != 10){
        //     Alert.alert(
        //         'Thông báo',
        //         'Số điện thoại không đúng.',
        //         [
        //           {text: 'OK'},
        //         ],
        //         {cancelable: false},
        //       );
        // }else{
            // RNAccountKit.configure({
            //     responseType: 'code',
            //     // titleType: 'login',
            //     initialAuthState: '',
            //     initialPhoneCountryPrefix: '+84' + this.state.phone.replace(/^0+/, ""), 
            //     defaultCountry: 'VN',
            // })
    
            RNAccountKit.loginWithPhone()
            .then((token) => {
                if (!token) {
                console.log('Login cancelled')
                } else {
                console.log(`Logged with phone. Token: ${token}`)
                }
            })
        // }
        
       
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
                        keyboardType='numeric'
                        onChangeText={phone => this.setState({phone})}
                        placeholder="Số điện thoại" />
                    <Btn
                        onPress={this.confirm} 
                        name="Gửi" />
                </View>
            </View>
        )
    }
}
export default connect()(Confirm)
