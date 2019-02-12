import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, AsyncStorage, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName, toUpperCase } from 'config'
import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn } from './layout'

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }
    
    onLoginFB = () => {
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

    _signin = ()  => {
        this.props.navigation.navigate(ScreenName.HomeScreen)
    }

    render(){
        AsyncStorage.getItem('test').then(console.log)
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View>
                    <Image 
                        style={[styles.logo, {marginTop: 30}]}
                        source={images.logo} />
                    <Text style={[styles.slogan, { color: '#DA0006'}]}>{toUpperCase('Fire Protection')}</Text>

                    <View style={styles.inputBox}>
                        <Image 
                            style={[styles.icon]}
                            source={images.user} />
                        <TextInput 
                            placeholder="Tài khoản"
                            placeholderTextColor="#DADADA"
                            onChangeText={username => this.setState({username})}
                            style={styles.loginInput} />
                    </View>

                    <View style={styles.inputBox}>
                        <Image 
                            style={[styles.icon]}
                            source={images.key} />
                        <TextInput 
                            placeholder="Mật khẩu"
                            placeholderTextColor="#DADADA"
                            keyboardType="default"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({password})}
                            style={styles.loginInput} />
                    </View>
                    
                    <Btn
                        onPress={this._signin} 
                        name="Đăng nhập" />

                    
                    <Text 
                        onPress={() => this.props.navigation.navigate(ScreenName.ForgotPassword)}
                        style={styles.forgot}>Quên mật khẩu</Text>
                    <View style={{width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#DADADA', }}></View>
                        <Text style={{color: '#DADADA', fontSize: 18, paddingLeft: 10, paddingRight: 10}}> Hoặc </Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#DADADA'}}></View>
                        
                    </View>
                    <TouchableOpacity 
                        onPress={this.onLoginFB}
                        style={[styles.btnLogin, { backgroundColor: '#3A5A97', marginTop: 10, alignContent: 'center'}]}>
                        {/* <Image 
                            style={{width: 20, height: 20, backgroundColor: '#fff'}}
                            source={images.fb} /> */}
                        <Text style={[styles.textLogin]}>{toUpperCase("Đăng nhập với facebook")}</Text>
                    </TouchableOpacity>
                    {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 40}}>
                        <LoginButton
                            style={{padding: 20, alignSelf: 'center', width: '80%'}}
                            onLoginFinished={
                                (error, result) => {
                                    console.log('result: ', result);
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log(data.accessToken.toString())
                                    }
                                    )
                                }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")}/>
                    </View> */}
                    

                    <View style={{flexDirection: 'row', alignContent: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: '300', fontSize: 18, color: '#A9A9A9'}}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity 
                             onPress={() => this.props.navigation.navigate(ScreenName.NextStep)}>
                            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#FB3C30', marginLeft: 10}}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(Signin)

