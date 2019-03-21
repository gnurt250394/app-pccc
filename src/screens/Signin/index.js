import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { color, popupOk, validatePhone, validateEmail, StatusCode, LoginType, CodeToMessage,fonts, defaultStyle, smallScreen, height, width, sreen4_7} from 'config'
import { login, loginSocial, checkPhoneOrEmail, updateUser, accountkitInfo   } from 'config/apis/users'
import { AccessToken, LoginManager  } from 'react-native-fbsdk';
import { Btn, BaseInput } from 'components'
import * as firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import  { RegisterScreen, HomeScreen, ForgotPasswordScreen } from 'config/screenNames'
import  { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService'
import { saveItem } from 'config/Controller';
import  { accountKit, getCurrentAccount } from 'config/accountKit'

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
        loading: false
    }

    // set status bar
    componentDidMount() {
        //  // logout facebook
        // LoginManager.logOut().then(fb => {
        //     console.log('fb: ', fb);

        // }).catch(err => {
        //     console.log('err: ', err);

        // })

        //  // logout google
        // GoogleSignin.signOut().then(gg => {
        //     console.log('gg: ', gg);

        // }).catch(err => {
        //     console.log('err: ', err);

        // })

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
            <TouchableWithoutFeedback style= { style.flex } onPress={this._dismiss}>
            
            <ScrollView style={style.content}>
                {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                
                <TouchableOpacity onPress={this._goBack} style={styles.btnClose}>
                    <Image 
                            style={styles.close}
                            source={images.closeBlue} />
                </TouchableOpacity>
                
                <View>
                    <Image 
                        style={[styles.logo, style.mb50]}
                        source={images.titleLogin} />
                    
                    <BaseInput 
                        styleIcon={style.w11}
                        removeSpace={true}
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
                        customStyle={[style.mb8]}
                        name="Đăng nhập" />
                    <Btn
                        onPress={this._navTo(RegisterScreen)}
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
                                style={[ style.iconSocial]}
                                source={images.iconFb} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onGoogleLogin}>
                            <Image 
                                style={[[style.iconSocial, style.w53]]}
                                source={images.iconGoogle} />
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _navTo = screen => () => {
        this.props.navigation.navigate(screen)
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _onFacebookLogin = async () => {
        try {
          const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
          console.log('result: ', result);
          
          if (result.isCancelled)  throw new Error('User cancelled request'); 
          const data = await AccessToken.getCurrentAccessToken();
          
          if (!data) throw new Error('Something went wrong obtaining the users access token'); 
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          
          const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
          
          let provider = firebaseUserCredential.user.toJSON();
          
          let body = {
            name: provider.displayName,
            token: data.userID,
            login_type: LoginType.facebook
          } 
          
          this.setState({loading: true})
          LoginManager.logOut()
          loginSocial(body).then(res => {
                this.setState({loading: false})
                if(res.data.code == StatusCode.Success){
                    
                    this._onSwitchToHomePage(res, LoginType.facebook);
                    
                }else{
                    popupOk(CodeToMessage[res.data.code])
                }
          }).catch(err => {
              
              this.setState({loading: false})
              popupOk("Đăng nhập thất bại");
          })
        } catch (e) {
            
            this.setState({loading: false})
        }
    }

    _onGoogleLogin =  async () => {
        try {
            await GoogleSignin.configure({ forceConsentPrompt: true });
            const data = await GoogleSignin.signIn();
            
            this.setState({loading: true}, async () => {
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
                
                let provider = firebaseUserCredential.user.toJSON();
                
                this.setState({loading: true})
                GoogleSignin.signOut()

                loginSocial({
                    name: provider.displayName,
                    email: provider.providerData[0].email,
                    login_type: LoginType.google
                }).then(res => {
                    this.setState({loading: false})
                    if(res.data.code == StatusCode.Success){
                        
                        this._onSwitchToHomePage(res);
                    }else{
                        popupOk(CodeToMessage[res.data.code])
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    this.setState({loading: false})
                    popupOk("Đăng nhập thất bại");
                })
            })
            
            
        } catch (e) {
            
            
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
                    navigation.reset(HomeScreen)
                    AsyncStorage.setItem('token',res.data.token)
                    this.setState({loading: false})
                }else{
                    popupOk(CodeToMessage[res.data.code])
                    this.setState({loading: false})
                }
            }).catch(err => {
                
                popupOk("Đăng nhập thất bại");
                this.setState({loading: false})
            })
            
        }
    }

    _onForgotPassword = async () => {
        this.setState({loading: true}, async () => {
            let Actoken = await getCurrentAccount();
            if(Actoken){
                let phone = await accountkitInfo(Actoken)
                this.setState({loading: false})

                if(phone){
                    // call api check phone
                    checkPhoneOrEmail({phone: phone}).then(res => {
                        if(res.data != "" && res.data.code == StatusCode.PhoneExists ){
                            this.props.navigation.navigate(ForgotPasswordScreen, {token: res.data.token})
                        }else{

                           popupOk("Số điện thoại chưa được sử dụng.")
                        }
                    })
                    
                }else{
                    popupOk("Không thể lấy lại mật khẩu, vui lòng thử lại sau.")
                }
                
            }else{
                this.setState({loading: false})
                popupOk("Không thể lấy lại mật khẩu, vui lòng thử lại sau.")
            }
        })
        
    }

    _onSwitchToHomePage = async (res, type) => {
        let data = res.data,
            user = data.data;
        
        // check update profile
        let phone = user.phone;
        let userToken = data.token;
        if(!phone || phone == ""){
            // this.props.navigation.navigate(UpdateProfileScreen, {user: user, type: type, token: data.token});
            this.setState({loading: true}, () => this._popupUpdatePhone(userToken, phone))
        }else{
            // navigation.reset(HomeScreen);
            this.props.dispatch({type: actionTypes.USER_LOGIN, data: user, token: data.token});
            AsyncStorage.setItem('token',userToken)
            navigation.reset(HomeScreen)
            
        }
        
    }

    _popupUpdatePhone = (userToken) => {
        Alert.alert(
            'Thông báo',
            'Vui lòng cập nhật số điện thoại',
            [
              {
                text: 'Cancel', style: 'cancel',
              },
              {text: 'OK', onPress: async () => {
                let Actoken = await getCurrentAccount()
                if(Actoken){
                    let phone = await accountkitInfo(Actoken)
                    this.setState({loading: false})

                    if(phone){
                        // call api check phone
                        checkPhoneOrEmail({phone: phone}).then(res => {
                            if(res.data.code != StatusCode.Success  || res.data == ""){
                                popupOk(CodeToMessage[res.data.code])
                            }else{

                                // call api update phone
                                updateUser({phone: phone}, userToken).then(res => {
                                    if(res.data.code == StatusCode.Success){
                                        AsyncStorage.setItem('token', this.state.token)
                                        navigation.reset(HomeScreen)
                                    }else{
                                        popupOk(CodeToMessage[res.data.code])
                                    }
                                }).catch(err => {
                                    console.log('err: ', err);
                                    popupOk("Không thể cập nhật số điện thoại, vui lòng thử lại sau.")
                                })
                            }
                        })
                        
                    }else{
                        popupOk("Không thể cập nhật số điện thoại, vui lòng thử lại sau.")
                    }
                }else{
                    this.setState({loading: false})
                    popupOk("Mã xác nhận không đúng.")
                }
                
              }},
            ],
            {cancelable: false},
          );
    }

   
}
const mapStateToProps=(state)=>{
    return{
        user: state.user&& state.user.data? state.user.data :null
    }
}

export default connect(mapStateToProps)(Signin)

const style = StyleSheet.create({
    or: {color: '#80C9F0', fontSize: defaultStyle.fontSize, paddingLeft: 10, paddingRight: 10},
    line: {flex: 1, height: 1, backgroundColor: '#80C9F0'},
    boxOr: {width: '60%',
     flexDirection: 'row',
      alignSelf: 'center',
       marginTop: 13,
        alignItems: 'center'},
    forgot: {width: '50%', alignSelf: 'center',color, fontWeight: 'bold',marginBottom:5, fontSize: defaultStyle.fontSize},
    social: {flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: '45%'},
    register: {marginTop: 0, backgroundColor: '#fff', borderWidth: 0.6, borderColor: color,fontFamily:fonts.bold},
    color: {color},
    content: {flex: 1, flexDirection: 'column'},
    iconSocial: {
        width: width <= sreen4_7.width ? 40 : 55,
        height: width <= sreen4_7.width ? 40 : 55,
        resizeMode: 'contain',
        marginTop: width <= sreen4_7.width ? 8 : 15,
        marginBottom: 18,
    },
    flex: { flex:1},
    w11: { height: 15},
    w53: { width: 53},
    mb8: {marginBottom: 8},
    mt8: {marginTop: 8},
    mb50: {marginBottom: 35},
    OR:{ height:1, backgroundColor:'#80C9F0',  width: '20%' },
    textTitle1:{
        alignSelf:'center',
        fontSize:19,
        fontFamily: fonts.bold,
        color:'#2166A2',
        fontWeight:'bold'
    },
    textTitle2:{
        alignSelf:'center',
        fontSize:22,
        marginBottom:50,
        fontFamily: fonts.bold,
        color:'#2166A2',
        fontWeight:'bold'
    }
})

