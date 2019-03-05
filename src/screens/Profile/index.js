import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { Btn } from 'components'
import { CheckAuthScreen, ViewProfileScreen, ChangePasswordScreen, SigninScreen, EditProfileScreen } from 'config/screenNames'
import { color, toUpperCase } from 'config'
import {StackActions,NavigationActions} from 'react-navigation'
import NavItem from './NavItem'
import { actionTypes } from 'actions'
class Profile extends React.Component {
    constructor(props){
        super(props);
        
    }

    edit = () => {
        this.props.navigation.navigate(EditProfileScreen)
    }


    // set status bar
    componentDidMount() {
        if(!this.props.user){
            const resetAction = StackActions.reset({
                index:0,
                actions: [NavigationActions.navigate({routeName: CheckAuthScreen})]
            })
            this.props.navigation.dispatch(resetAction)
        }

        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
        
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView >
                    <View style={style.head}>

                        <Text style={style.title}> Cá nhân </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate(ViewProfileScreen)}
                        style={style.boxUser}>
                        <Image 
                            style={style.avatar}
                            source={images.userBlue} />
                        <View style={style.user}>
                            <Text style={style.name}>{this.props.user ? this.props.user.name : "Nguyen Van A"}</Text>
                            <Text style={style.email}>{this.props.user ? this.props.user.email : "email@example.com"}</Text>
                        </View>
                        <Image 
                            style={style.icon}
                            source={images.next} />
                    </TouchableOpacity>
                    <View style={style.mt20}>

                        <NavItem 
                            title='Shop của tôi' 
                            onPress={() => this.props.navigation.navigate(ChangePasswordScreen)}
                            icon={images.pShop} />
                        <NavItem 
                            title='Mua gói dịch vụ' 
                            onPress={() => this.props.navigation.navigate(ChangePasswordScreen)}
                            icon={images.pService} />
                        <NavItem 
                            title='Sản phẩm yêu cầu báo giá' 
                            onPress={() => this.props.navigation.navigate(ChangePasswordScreen)}
                            icon={images.pProduct} />
                        <NavItem 
                            title='Thay đổi mật khẩu' 
                            onPress={() => this.props.navigation.navigate(ChangePasswordScreen)}
                            icon={images.pChangePass} />
                    </View>
                </ScrollView>

                <Text 
                    onPress={() => {
                        this.props.dispatch({type: actionTypes.USER_LOGOUT})
                        this.props.navigation.navigate(SigninScreen)}
                    }
                    style={style.btnLogout}>{toUpperCase('Đăng xuất' )}</Text>
            </View>
        )
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
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", padding: 10,  },
    btnLogout: {color: '#F55555', fontSize: 16, width: '60%', alignSelf: 'center', textAlign:'center', fontWeight: 'bold', padding: 10, marginBottom: 50},
    head: {backgroundColor: color},
    name: {fontSize: 16, color: '#333333', fontWeight: 'bold', paddingBottom: 6},
    email: {fontSize: 14, color: '#999999', },
    user: { flex: 1, flexDirection: 'column', padding: 18},
    avatar: {width: 70, height: 70, alignSelf: 'center' },
    boxUser: { padding: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    mt20: { marginTop: 20}
})
