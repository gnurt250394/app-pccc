import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { Btn } from 'components'
import { CheckAuthScreen, ViewProfileScreen, ChangePasswordScreen, SigninScreen, EditProfileScreen } from 'config/screenNames'
import { color, toUpperCase,StatusCode } from 'config'
import {StackActions,NavigationActions} from 'react-navigation'
import NavItem from './NavItem'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
import { getInfoAcount } from 'config/apis/users';
class Profile extends React.Component {
   state={
       user:{}
   }

    edit = () => {
        this.props.navigation.navigate(EditProfileScreen)
    }


    // set status bar
    componentDidMount= async()=> {
        console.log(this.props.user,'user')
        this.getInfoAccount()
        let token = await AsyncStorage.getItem('token')
        if(token == null ){
            navigation.reset(CheckAuthScreen)
        }

        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //   StatusBar.setBarStyle('light-content');
        //   StatusBar.setBackgroundColor(color);
        // });
        
    }
    
    componentWillUnmount() {
        // this._navListener.remove();
    }

    render(){
        let {user} = this.state
        return (
            <View style={style.flex}>
                <ScrollView >
                    <View style={style.head}>
                        <Text style={style.title}> Cá nhân </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={this._navTo(ViewProfileScreen,{name:user.name})}
                        style={style.boxUser}>
                        <Image 
                            style={style.avatar}
                            source={images.userBlue} />
                        <View style={style.user}>
                            <Text style={style.name}>{user&& user.name ? user.name : "Nguyen Van A"}</Text>
                            <Text style={style.email}>{user && user.email ? user.email : "email@example.com"}</Text>
                        </View>
                        <Image 
                            style={style.icon}
                            source={images.next} />
                    </TouchableOpacity>
                    <View style={style.mt20}>

                        <NavItem 
                            title='Shop của tôi' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pShop} />
                        <NavItem 
                            title='Mua gói dịch vụ' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pService} />
                        <NavItem 
                            title='Sản phẩm yêu cầu báo giá' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pProduct} />
                        <NavItem 
                            title='Thay đổi mật khẩu' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pChangePass} />
                    </View>
                </ScrollView>

                <Text 
                    onPress={this._logout}
                    style={style.btnLogout}>{toUpperCase('Đăng xuất' )}</Text>
            </View>
        )
    }

    getInfoAccount=()=>{

        getInfoAcount().then(res=>{
            if(res.data.code == StatusCode.Success ){
               this.setState({user:res.data.data})
            }
        })
    }
    _logout = () => {
        this.props.dispatch({type: actionTypes.USER_LOGOUT})
        AsyncStorage.removeItem('token')
        navigation.reset(SigninScreen)
    }

    _navTo = (screen,params) => () => {
      navigation.navigate(screen,params)
    }
    
}

const mapStateToProps = (state) =>{
    return {
        user: state.users && state.users.data ? state.users.data : null,
        token: state.users && state.users.token ? state.users.token : null,
    }
}
export default connect(mapStateToProps)(Profile)

const style = StyleSheet.create({
    icon: {width: 10, resizeMode: 'contain', },
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", padding: 6,  },
    btnLogout: {color: '#F55555', fontSize: 16, width: '60%', alignSelf: 'center', textAlign:'center', fontWeight: 'bold', padding: 10, marginBottom: 50},
    head: {backgroundColor: color},
    name: {fontSize: 16, color: '#333333', fontWeight: 'bold', paddingBottom: 6},
    email: {fontSize: 14, color: '#999999', },
    user: { flex: 1, flexDirection: 'column', padding: 18},
    avatar: {width: 70, height: 70, alignSelf: 'center' },
    boxUser: { padding: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    mt20: { marginTop: 20},
    flex: {flex: 1}
})
