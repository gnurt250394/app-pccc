import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import { Btn } from 'layout'
import { ScreenName } from 'config'
import {StackActions,NavigationActions} from 'react-navigation'
import NavItem from './NavItem'

class Profile extends React.Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount() {
        if(!this.props.user){
            const resetAction = StackActions.reset({
                index:0,
                actions: [NavigationActions.navigate({routeName: ScreenName.CheckAuth})]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    edit = () => {
        this.props.navigation.navigate(ScreenName.EditProfile)
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

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                    <View style={{backgroundColor: '#F55555', paddingBottom: 10, paddingTop: 10}}>
                        <Image 
                            style={{width: 80, resizeMode: 'contain', alignSelf: 'center' }}
                            source={images.userLight} />
                        <Text style={style.title}>{this.props.user ? this.props.user.name : ""}</Text>
                    </View>
                    <View style={{ marginTop: 20}}>

                        <NavItem 
                            title='Thông tin cá nhân' 
                            onPress={() => this.props.navigation.navigate(ScreenName.ViewProfile)}
                            icon={images.pUser} />
                        <NavItem 
                            title='Mua gói dịch vụ' 
                            onPress={() => this.props.navigation.navigate(ScreenName.ChangePassword)}
                            icon={images.pService} />
                        <NavItem 
                            title='Tin tức đánh dấu' 
                            onPress={() => this.props.navigation.navigate(ScreenName.ChangePassword)}
                            icon={images.pNews} />
                        <NavItem 
                            title='Sản phẩm đánh dấu' 
                            onPress={() => this.props.navigation.navigate(ScreenName.ChangePassword)}
                            icon={images.pProduct} />
                        <NavItem 
                            title='Thay đổi mật khẩu' 
                            onPress={() => this.props.navigation.navigate(ScreenName.ChangePassword)}
                            icon={images.pChangePass} />
                    </View>
                </ScrollView>
                <Btn name='Đăng xuất' 
                    onPress={() => {
                        this.props.dispatch({type: 'LOGOUT'})
                        this.props.navigation.navigate(ScreenName.Signin)}
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
export default connect(mapStateToProps)(Profile)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", paddingTop: 10 },
})
