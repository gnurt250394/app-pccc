import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Footer } from '../layout'
import { ScreenName } from 'config'

class Profile extends React.Component {
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
            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd',paddingBottom:10, flex: 1, flexDirection: 'row',alignItems:'center'}}>
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
                <StatusBar backgroundColor="#FB3C30" barStyle="light-content" />
                <View style={{backgroundColor: '#FB3C30', paddingBottom: 30, paddingTop: 30}}>
                    <Image 
                        style={{width: 80, height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    <Text style={style.title}>Nguyễn Văn Nam</Text>
                </View>
                <View style={{ marginTop: 30}}>

                    {this.renderItem('Thông tin cá nhân', ScreenName.ViewProfile, images.iconUser)}
                    {this.renderItem('Mua hàng', ScreenName.ViewProfile, images.iconShopping)}
                    {this.renderItem('Bán hàng', ScreenName.ViewProfile, images.iconSell)}
                    {this.renderItem('Thay đổi mật khẩu', ScreenName.ChangePassword, images.iconKey)}
                    {this.renderItem('Đăng xuất', ScreenName.Signin, images.iconUser)}
                </View>
            </View>
        )
    }
}
export default connect()(Profile)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    iconNext: {width: 10, resizeMode: 'contain', marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
