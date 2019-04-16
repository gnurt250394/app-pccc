import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage, ActivityIndicator, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { ViewProfileScreen, ChangePasswordScreen, SigninScreen, EditProfileScreen, ShopScreen, RegisterScreen } from 'config/screenNames'
import { color, toUpperCase, StatusCode, log } from 'config'
import NavItem from './NavItem'

import FastImage from 'react-native-fast-image'
import navigation from 'navigation/NavigationService';
import { getInfoAcount } from 'config/apis/users';
import { getItem } from 'config/Controller';
import { popupCancel } from 'config';
import { popupOk } from 'config';
import { fontStyles } from 'config/fontStyles';
import OneSignal from 'react-native-onesignal';
import { logoutAction } from 'reduxs/actions/actionCreator';

class Profile extends React.Component {
    state = {
        user: this.props.users || {},
        token: this.props.token || '',
        image: null,
        loading: true,
    }

    edit = () => {
        this.props.navigation.navigate(EditProfileScreen)
    }
    async componentDidMount() {
        console.log(this.props.count,'count')
        // phải check đoạn này vì đang dùng tabs
        this.props.navigation.addListener('willFocus', () => this.getInfo())
    }


    render() {

        return (
            <View style={style.flex}>
                {this.state.loading
                    ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#2166A2" />
                    </View>
                    :
                    this.renderView()

                }
            </View>
        )
    }

    renderView = () => {
        let { user, token, image, loading } = this.state
        if (!loading && token) {
            return (
                <View style={style.flex}>
                    <ScrollView >
                        <SafeAreaView style={style.SafeAreaView}>
                            <View style={style.head}>
                                <Text style={style.title}> Cá nhân </Text>
                            </View>
                        </SafeAreaView>
                        <TouchableOpacity
                            onPress={this._navTo(ViewProfileScreen, { user: this.state.user, image: this.state.image, update: this.getInfo })}
                            style={style.boxUser}>
                            <FastImage
                                style={style.avatar}
                                source={image ? { uri: image } : images.userBlue} />
                            <View style={style.user}>
                                <Text style={style.name}>{user && user.name ? user.name : ""}</Text>
                                <Text style={style.email}>{user && user.email ? user.email : ""}</Text>
                            </View>
                            <Image
                                style={style.icon}
                                source={images.next} />
                        </TouchableOpacity>
                        <View style={style.mt20}>
                            <NavItem
                                title='Gói dịch vụ'
                                onPress={() => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')}
                                icon={images.pService} />
                            <NavItem
                                title='Shop của tôi'
                                onPress={() => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')}
                                icon={images.pShop} />

                            <NavItem
                                title='Thay đổi mật khẩu'
                                onPress={this._navTo(ChangePasswordScreen)}
                                icon={images.pChangePass} />
                        </View>
                        <TouchableOpacity style={style.btnLogout}
                    onPress={this._logout}>
                    <Text
                        
                        style={style.txtLogout}>{toUpperCase('Đăng xuất')}</Text>
                    </TouchableOpacity>
                    </ScrollView>
                    
                    

                </View>
            )
        } else {
            return (
                <View style={style.modal}>
                    <View style={style.bodyModal}> 
                    <View style={style.headModal}>
                        <Text style={style.txtModal}>Yêu cầu đăng nhập</Text>
                        </View>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={[style.groupTxt, { backgroundColor: color, borderBottomLeftRadius: 8 }]}
                            onPress={this._navTo(SigninScreen)}>
                                <Text
                                    
                                    style={[style.btnModal]}>{toUpperCase("Đăng nhập")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.groupTxt, { backgroundColor: '#FFFFFF', borderBottomRightRadius: 8, }]}
                            onPress={this._navTo(RegisterScreen)}>
                                <Text
                                    
                                    style={[style.btnModal, style.register]}>{toUpperCase("Đăng ký")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }


    getInfo = async () => {
        let token = await getItem('token')
        let user = await getInfoAcount().then(res => res.data.code == StatusCode.Success ? res.data.data : null).catch(err => null)
        log('user: ', user);
        console.log(token, 'token')
        console.log(user, 'user')
        if (user && user.name) {
            this.setState({
                user: user,
                token: token,
                image: user.image ? user.image.full_path : null,
                loading: false
            })
        } else {
            this.setState({ loading: false })
        }
        return

    }

    _logout = () => {
        AsyncStorage.removeItem('token')
        navigation.reset(SigninScreen)
        OneSignal.sendTags({userId:''})
        this.props.logout()
    }

    _navTo = (screen, params) => () => {
        navigation.navigate(screen, params)
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.users && state.users.data ? state.users.data : {},
        token: state.users && state.users.token ? state.users.token : null,
        count:state.countReducer.count
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
      logout:()=>dispatch(logoutAction())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Profile)

const style = StyleSheet.create({
    SafeAreaView: { backgroundColor: color },
    icon: { width: 10, resizeMode: 'contain', },
    iconNext: { width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10 },
    label: { color: '#585858', fontSize: 16, flex: 1, paddingTop: 5 },
    title: { color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", padding: 6, },
    btnLogout: { height:50, width: '60%', alignSelf: 'center',  padding: 10, },
    txtLogout:{
        textAlign: 'center', 
        fontWeight: 'bold',
        color: '#F55555', 
        fontSize: 16,
    },
    head: { backgroundColor: color },
    name: { fontSize: 16, color: '#333333', fontWeight: 'bold', paddingBottom: 6 },
    email: { fontSize: 12, color: '#999999', },
    user: { flex: 1, flexDirection: 'column', padding: 18 },
    avatar: { width: 70, height: 70, alignSelf: 'center', borderRadius: 35, },
    boxUser: { padding: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1', },
    mt20: { marginTop: 20 },
    flex: { flex: 1 },
    modal: { backgroundColor: '#999999', justifyContent: 'center', flex: 1, },
    bodyModal: { width: '80%',height:'15%', alignSelf: 'center', backgroundColor: '#FFFFFF', flexDirection: 'column', borderRadius: 8, },
    headModal: { alignItems:'center',justifyContent:'center', flex:1,paddingTop:10 },
    txtModal:{
        color: '#333333', 
        fontWeight: 'bold', 
        fontSize: 18 ,
        flex:1,
    },
    footerModal: {
        flex:1,
        height:'100%',
        flexDirection: 'row',
        alignItems:'flex-end',
        width:'100%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        // backgroundColor:color,
        // borderColor:color,
        // borderWidth:1
    },
    btnModal: { fontSize: 16, fontWeight: '500', height: '100%', width: '100%', color: 'white', flex: 1, textAlign: 'center', },
    register: { color: color, backgroundColor: 'white' },
    groupTxt: {
        flex: 1,
        width: '100%',
        height:'100%',
        padding: 10,
        height: 41,
        borderTopColor:color,
        borderTopWidth:1
    }
    // login: {borderBottomRightRadius: 0},
})
