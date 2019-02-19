import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, AsyncStorage, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName, toUpperCase, popupOk, validatePhone, validateEmail, StatusCode } from 'config'
import { login } from 'config/api'

import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn, BaseInput } from 'layout'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import  { accountKit } from 'config/accountKit'


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
                    <Text style={[styles.slogan, { color: '#F55555'}]}>{toUpperCase('Siêu thị phòng cháy')}</Text>

                    <BaseInput 
                        styleIcon={{width: 11}}
                        icon={images.phoneDark}
                        ref={val => this.username = val}
                        placeholder="Email/Số điện thoại" />

                    <BaseInput 
                        icon={images.keyDark}
                        ref={val => this.password = val}
                        secureTextEntry={true}
                        placeholder="Mật khẩu"  />
                    
                    <Btn
                        onPress={this._signin()} 
                        customStyle={{marginBottom: 8}}
                        name="Đăng nhập" />
                    <Btn
                        onPress={() => this.props.navigation.navigate(ScreenName.Register)}
                        customStyle={{marginTop: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F55555',}}
                        textStyle={{color: '#F55555'}}
                        name="Đăng ký" />

                    
                    <Text 
                        onPress={this._onForgotPassword}
                        style={[styles.forgot, {width: '50%', alignSelf: 'center'}]}>Quên mật khẩu</Text>
                    <View style={{width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999', }}></View>
                        <Text style={{color: '#999999', fontSize: 14, paddingLeft: 10, paddingRight: 10}}> Hoặc </Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999'}}></View>
                        
                    </View>
                    

                    <View style={{flexDirection: 'row', alignContent: 'center', alignSelf: 'center', justifyContent: 'space-between', marginTop: 0, width: '60%'}}>
                        <TouchableOpacity onPress={this._onFacebookLogin}>
                            <Image 
                                style={[styles.logo, {height: 55,marginTop: 15}]}
                                source={images.iconFb} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onGoogleLogin}>
                            <Image 
                                style={[styles.logo, {height: 55,marginTop: 15}]}
                                source={images.iconGoogle} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }


    _onFacebookLogin = async () => {
        try {
          const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
          if (result.isCancelled) {
            // handle this however suites the flow of your app
            throw new Error('User cancelled request'); 
          }
      
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
      
          // get the access token
          const data = await AccessToken.getCurrentAccessToken();
      
          if (!data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
          }
      
          // create a new firebase credential with the token
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      
          // login with credential
          const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      
          console.log(JSON.stringify(firebaseUserCredential.user.toJSON()))
        } catch (e) {
            console.log('e: ', e);
        }
    }

    _onGoogleLogin =  async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.configure();
        
            const data = await GoogleSignin.signIn();
        
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        
            console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
          } catch (e) {
            console.error(e);
        }
    }

    _signin = () => async ()  => {
        let username = this.username.getValue();
        let password = this.password.getValue();
        
        if(!validateEmail(username) && !validatePhone(username) ){
            popupOk("Tên đăng nhập phải là Email hoặc Số điện thoại")
        }else if(password.trim() == ""){
            popupOk("Mật khẩu không được để trống")
        }else {
            login({
                username: username,
                password: password
            }).then(res => {
                if(res.data.code == StatusCode.Success){
                    this.props.dispatch({type: 'LOGIN', data: res.data.data, token: res.data.token})
                    this.props.navigation.navigate(ScreenName.HomeScreen)
                }else{
                    popupOk(res.data.message)
                }
            }).catch(err => {
                console.log('err: ', err.message);
                popupOk("Đăng nhập thất bại")
            })
            
        }
    }

    _onForgotPassword = () => {
        let RNAccountKit = accountKit()
        RNAccountKit.loginWithPhone()
            .then((token) => {
                if(token && token.code){
                    this.props.navigation.navigate(ScreenName.ForgotPassword)
                }
            })
    }
}

export default connect()(Signin)

