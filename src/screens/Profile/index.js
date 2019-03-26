import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {ViewProfileScreen, ChangePasswordScreen, SigninScreen, EditProfileScreen, ShopScreen} from 'config/screenNames'
import { color, toUpperCase,StatusCode} from 'config'
import NavItem from './NavItem'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
import { getInfoAcount } from 'config/apis/users';
import { getItem} from 'config/Controller';
import CheckAuth from './CheckAuth';

class Profile extends React.Component {
   state={
       user: this.props.users || {},
       token: this.props.token|| '',
       image: null,
   }

    edit = () => {
        this.props.navigation.navigate(EditProfileScreen)
    }
  

    async componentDidMount(){
        console.log('1')
        await this.getInfo()
    }
   

    render(){
        let {user,token,image} = this.state
        console.log('2')
        console.log(token,'token')
        return (
            token 
                ?
            <View style={style.flex}>
                <ScrollView >
                    <View style={style.head}>
                        <Text style={style.title}> Cá nhân </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={this._navTo(ViewProfileScreen, {user: this.state.user, image: this.state.image, update: this.getInfo})}
                        style={style.boxUser}>
                        <Image 
                            style={style.avatar}
                            source={image?{uri:image}:images.userBlue} />
                        <View style={style.user}>
                            <Text style={style.name}>{user&& user.name ? user.name : ""}</Text>
                            <Text style={style.email}>{user && user.email ? user.email : ""}</Text>
                        </View>
                        <Image 
                            style={style.icon}
                            source={images.next} />
                    </TouchableOpacity>
                    <View style={style.mt20}>
                        <NavItem 
                            title='Gói dịch vụ' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pService} />
                        <NavItem 
                            title='Shop của tôi' 
                            onPress={this._navTo(ShopScreen)}
                            icon={images.pShop} />
                        
                        <NavItem 
                            title='Thay đổi mật khẩu' 
                            onPress={this._navTo(ChangePasswordScreen)}
                            icon={images.pChangePass} />
                    </View>
                </ScrollView>

                <Text 
                    onPress={this._logout}
                    style={style.btnLogout}>{toUpperCase('Đăng xuất')}</Text>
            </View>
                : 
            <CheckAuth />

        )
    }

    getInfo = async () => {
        let token = await getItem('token')
        let user = await getInfoAcount().then( res=> res.data.code == StatusCode.Success ? res.data.data : null).catch(err => null)
        console.log(token,'tttt')
        if(user && user.name ){
            this.setState({
                user: user,
                token: token,
                image: user.image ? user.image.full_path : null
            })
            return
        } 
        // else{
        //     navigation.reset(CheckAuthScreen)
        //     return
        // }
    }

    _logout =  () => {
        AsyncStorage.removeItem('token')
        navigation.reset(SigninScreen)
        this.props.dispatch({type: actionTypes.USER_LOGOUT})
    }

    _navTo = (screen,params) => () => {
      navigation.navigate(screen,params)
    }
    
}

const mapStateToProps = (state) =>{
    return {
        users: state.users && state.users.data ? state.users.data : {},
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
    email: {fontSize: 12, color: '#999999', },
    user: { flex: 1, flexDirection: 'column', padding: 18},
    avatar: {width: 70, height: 70, alignSelf: 'center',borderRadius: 35, },
    boxUser: { padding: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    mt20: { marginTop: 20},
    flex: {flex: 1}
})
