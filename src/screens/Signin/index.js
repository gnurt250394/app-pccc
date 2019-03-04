import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { color, popupOk, validatePhone, validateEmail, StatusCode, LoginType } from 'config'
import { login, loginSocial } from 'config/apis/users'
import { AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn, BaseInput } from 'components'
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import  { accountKit } from 'config/accountKit'
import  { RegisterScreen, ForgotPasswordScreen, HomeScreen } from 'config/screenNames'
import  { actionTypes } from 'actions'

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
        loading: false
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('dark-content');
          StatusBar.setBackgroundColor('#fff');
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    // end set status bar

    render(){
        return (
            <TouchableWithoutFeedback style= { style.flex } onPress={() => Keyboard.dismiss()}>
            
            <ScrollView style={style.content}>
                {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                
                <View>
                    <Image 
                        style={[styles.logo, {marginBottom: 50}]}
                        source={images.logo} />
                    {/* <Text style={[styles.slogan, style.color]}>{toUpperCase('Siêu thị vật liệu xây dựng')}</Text> */}

                    <BaseInput 
                        styleIcon={style.w11}
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
                        customStyle={style.mb8}
                        name="Đăng nhập" />
                    <Btn
                        onPress={() => this.props.navigation.navigate(RegisterScreen)}
                        customStyle={style.register}
                        textStyle={style.color}
                        name="Đăng ký" />

                    
                    <Text 
                        onPress={this._onForgotPassword}
                        style={[styles.forgot, style.forgot]}>Quên mật khẩu</Text>
                    <View style={style.boxOr}>
                        <View style={style.line}></View>
                        <Text style={style.or}> Hoặc </Text>
                        <View style={style.line}></View>
                        
                    </View>
                    

                    <View style={style.social}>
                        <TouchableOpacity onPress={this._onFacebookLogin}>
                            <Image 
                                style={[styles.logo, style.iconSocial]}
                                source={images.iconFb} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onGoogleLogin}>
                            <Image 
                                style={[styles.logo, style.iconSocial]}
                                source={images.iconGoogle} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }


    _onFacebookLogin = async () => {
        console.log();
        try {
          const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
          if (result.isCancelled) {
            // handle this however suites the flow of your app
            throw new Error('User cancelled request'); 
          }
      
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
          let provider = firebaseUserCredential.user.toJSON();
          let body = {
            name: provider.displayName,
            token: data.accessToken,
            login_type: LoginType.facebook
          } 
          this.setState({loading: true})
          loginSocial(body).then(res => {
              this._onSwitchToHomePage(res);
              this.setState({loading: false})
          }).catch(err => {
              this.setState({loading: false})
              popupOk("Đăng nhập thất bại");
          })
        } catch (e) {
            console.log('e: ', e);
            this.setState({loading: false})
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
            let provider = firebaseUserCredential.user.toJSON();
            this.setState({loading: true})
            loginSocial({
                name: provider.displayName,
                email: provider.email,
                login_type: LoginType.google
            }).then(res => {
                this._onSwitchToHomePage(res);
                this.setState({loading: false})
            }).catch(err => {
                popupOk("Đăng nhập thất bại");
                this.setState({loading: false})
            })
            
        } catch (e) {
            console.error(e);
            this.setState({loading: false})
        }
    }

    _signin = () => async ()  => {
        let username = this.username.getValue();
        let password = this.password.getValue();
        
        if(!validateEmail(username) && !validatePhone(username) ){
            popupOk("Tên đăng nhập phải là Email hoặc Số điện thoại");
        }else if(password.trim() == ""){
            popupOk("Mật khẩu không được để trống");
        }else {
            this.setState({loading: true})
            login({
                username: username,
                password: password
            }).then(res => {
                if(res.data.code == StatusCode.Success){
                    this._onSwitchToHomePage(res);
                    this.setState({loading: false})
                }else{
                    popupOk(res.data.message);
                    this.setState({loading: false})
                }
            }).catch(err => {
                console.log('err: ', err.message);
                popupOk("Đăng nhập thất bại");
                this.setState({loading: false})
            })
            
        }
    }

    _onForgotPassword = () => {
        let RNAccountKit = accountKit()
        RNAccountKit.loginWithPhone()
            .then((token) => {
                if(token && token.code){
                    this.props.navigation.navigate(ForgotPasswordScreen);
                }
            })
    }

    _onSwitchToHomePage = res => {
        this.props.dispatch({type: actionTypes.USER_LOGIN, data: res.data.data, token: res.data.token});
        this.props.navigation.navigate(HomeScreen);
    }
}

export default connect()(Signin)

const style = StyleSheet.create({
    or: {color: '#999999', fontSize: 14, paddingLeft: 10, paddingRight: 10},
    line: {flex: 1, height: 1, backgroundColor: '#999999'},
    boxOr: {width: '80%', flexDirection: 'row', alignSelf: 'center', marginTop: 20, alignItems: 'center'},
    forgot: {width: '50%', alignSelf: 'center', color: color, fontWeight: 'bold',},
    social: {flexDirection: 'row', alignContent: 'center', alignSelf: 'center', justifyContent: 'space-between', marginTop: 0, width: '60%'},
    register: {marginTop: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: color,},
    color: {color: color},
    content: {flex: 1, flexDirection: 'column'},
    iconSocial: {height: 55,marginTop: 15},
    flex: { flex:1},
    w11: {width: 11},
    mb8: {marginBottom: 8}
})

