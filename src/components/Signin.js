import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, AsyncStorage, StatusBar, TouchableWithoutFeedback, Keyboard,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName, toUpperCase, popupOk, validatePhone, validateEmail } from 'config'
import {StackActions,NavigationActions} from 'react-navigation'
import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn, BaseInput } from './layout'

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }
    
    onLoginFB =async () => {
       await  LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
        if (result.isCancelled) {
          console.log("Login Cancelled");
        } else {
          console.log("Login Success permission granted:" + result.grantedPermissions);
        }
      }, function(error) {
         console.log("some error occurred!!");
      })
    }

    _signin = () => ()  => {
        if(!validateEmail(this.state.username) && !validatePhone(this.state.username) ){
            popupOk("Tên đăng nhập phải là Email hoặc Số điện thoại")
        }else if(this.state.password.trim() == ""){
            popupOk("Mật khẩu không được để trống")
        }else {
            // const resetAction = StackActions.reset({
            //     index:0,
            //     actions: [NavigationActions.navigate({routeName: ScreenName.HomeScreen})]
            // })
            // this.props.navigation.dispatch(resetAction)
            this.props.navigation.navigate(ScreenName.HomeScreen)
        }
    }

    render(){
        // AsyncStorage.getItem('test').then(console.log)
        const user = this.props.navigation.getParam('user');
        const pass = this.props.navigation.getParam('pass');
        console.log(pass,'pass')
        console.log(user,'user')
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <ScrollView>
                <View>
                    <Image 
                        style={[styles.logo, {marginTop: 20}]}
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
                        style={styles.forgot}>Quên mật khẩu</Text>
                    <View style={{width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 20, alignItems: 'center'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999', }}></View>
                        <Text style={{color: '#999999', fontSize: 18, paddingLeft: 10, paddingRight: 10}}> Hoặc </Text>
                        <View style={{flex: 1, height: 1, backgroundColor: '#999999'}}></View>
                        
                    </View>
                    

                    <View style={{flexDirection: 'row', alignContent: 'center', alignSelf: 'center', justifyContent: 'space-between', marginTop: 0, width: '60%'}}>
                        <Image 
                            style={[styles.logo, {}]}
                            source={images.iconFb} />
                        <Image 
                            style={[styles.logo,]}
                            source={images.iconGoogle} />
                    </View>
                </View>
                </ScrollView>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(Signin)

