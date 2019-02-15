import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, AsyncStorage, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName, toUpperCase, popupOk, validatePhone, validateEmail } from 'config'
import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn, BaseInput } from './layout'

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }

    render(){
        AsyncStorage.getItem('test').then(console.log)
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View>
                    <Image 
                        style={[styles.logo, {}]}
                        source={images.logo} />
                    <Text style={[styles.slogan, { color: '#DA0006'}]}>{toUpperCase('Siêu thị phòng cháy')}</Text>

                    <BaseInput 
                        styleIcon={{width: 15}}
                        icon={images.phoneDark}
                        onChangeText={username => this.setState({username})}
                        // keyboardType='numeric'
                        placeholder="Email/Số điện thoại" />

                    <BaseInput 
                        icon={images.keyDark}
                        onChangeText={val => this.setState({password: val})}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    
                    <Btn
                        onPress={this._signin()} 
                        customStyle={{marginBottom: 10}}
                        name="Đăng nhập" />
                    <Btn
                        onPress={() => this.props.navigation.navigate(ScreenName.Register)}
                        customStyle={{marginTop: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F55555',}}
                        textStyle={{color: '#F55555'}}
                        name="Đăng ký" />

                    
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ForgotPassword)}
                        style={[styles.forgot, {width: '50%', alignSelf: 'center'}]}>Quên mật khẩu</Text>
                    <View style={{width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999', }}></View>
                        <Text style={{color: '#999999', fontSize: 18, paddingLeft: 10, paddingRight: 10}}> Hoặc </Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999'}}></View>
                        
                    </View>
                    

                    <View style={{flexDirection: 'row', alignContent: 'center', alignSelf: 'center', justifyContent: 'space-between', marginTop: 0, width: '60%'}}>
                        <TouchableOpacity onPress={() => this._onLoginSocial()}>
                            <Image 
                                style={[styles.logo, {}]}
                                source={images.iconFb} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._onLoginSocial()}>
                            <Image 
                                style={[styles.logo, {}]}
                                source={images.iconGoogle} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _onLoginSocial = () => () => {
        LoginManager.logInWithReadPermissions(["public_profile"]).then(
            function(result) {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
    }

    _signin = () => ()  => {
        if(!validateEmail(this.state.username) && !validatePhone(this.state.username) ){
            popupOk("Tên đăng nhập phải là Email hoặc Số điện thoại")
        }else if(this.state.password.trim() == ""){
            popupOk("Mật khẩu không được để trống")
        }else {
            this.props.navigation.navigate(ScreenName.HomeScreen)
        }
    }
}
export default connect()(Signin)

