import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { Btn } from 'components'
import { CheckAuthScreen, ViewProfileScreen, ChangePasswordScreen, SigninScreen, EditProfileScreen } from 'config/screenNames'
import { color } from 'config'
import {StackActions,NavigationActions} from 'react-navigation'
import NavItem from './NavItem'
import { actionTypes } from 'actions'
class MyProfile extends React.Component {
    constructor(props){
        super(props);
        
    }

    edit = () => {
        this.props.navigation.navigate(EditProfileScreen)
    }

    renderItem = (title, screen, icon) => {
        return <TouchableOpacity 
            onPress={() => this.props.navigation.navigate(screen)}
            style={{ marginBottom: 15, flexDirection: 'row'}}>
            <Image 
                style={style.icon}
                source={icon} />
            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd', paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
                <Text style={style.label}>{title}</Text>
                <Image 
                    style={style.iconNext}
                    source={images.next} />
            </View>
        </TouchableOpacity>
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
                <ScrollView>
                    <View style={{backgroundColor: color, paddingBottom: 10, paddingTop: 10}}>
                        <Image 
                            style={{width: 80, resizeMode: 'contain', alignSelf: 'center' }}
                            source={images.userLight} />
                        <Text style={style.title}>{this.props.user ? this.props.user.name : ""}</Text>
                    </View>
                    <View style={{ marginTop: 20}}>

                        <NavItem 
                            title='Thông tin cá nhân' 
                            onPress={() => this.props.navigation.navigate(ViewProfileScreen)}
                            icon={images.pUser} />
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
                <Btn name='Đăng xuất' 
                    onPress={() => {
                        this.props.dispatch({type: actionTypes.USER_LOGOUT})
                        this.props.navigation.navigate(SigninScreen)}
                    } />
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
export default connect(mapStateToProps)(MyProfile)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", paddingTop: 10 },
})
