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

    render(){
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <StatusBar backgroundColor="#FB3C30" barStyle="light-content" />
                    <View style={{backgroundColor: '#FB3C30', paddingBottom: 30, paddingTop: 30}}>
                        <Image 
                            style={{width: 80, height: 80, alignSelf: 'center' }}
                            source={images.userLight} />
                        <Text style={style.title}>Nguyễn Văn Nam</Text>
                    </View>
                    <View style={{ marginTop: 30}}>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.ViewProfile)}
                            style={{ marginBottom: 15, flexDirection: 'row'}}>
                            <Image 
                                style={style.icon}
                                source={images.iconUser} />
                            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd', paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
                                <Text style={style.label}>Thông tin cá nhân</Text>
                                <Image 
                                    style={style.iconNext}
                                    source={images.nextDark} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.ViewProfile)}
                            style={{ marginBottom: 15, flexDirection: 'row'}}>
                            <Image 
                                style={style.icon}
                                source={images.iconShopping} />
                            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd', paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
                                <Text style={style.label}>Mua hàng</Text>
                                <Image 
                                    style={style.iconNext}
                                    source={images.nextDark} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.ViewProfile)}
                            style={{ marginBottom: 15, flexDirection: 'row'}}>
                            <Image 
                                style={style.icon}
                                source={images.iconSell} />
                            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd', paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
                                <Text style={style.label}>Bán hàng</Text>
                                <Image 
                                    style={style.iconNext}
                                    source={images.nextDark} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate(ScreenName.ChangePassword)}
                            style={{ marginBottom: 15, flexDirection: 'row'}}>
                            <Image 
                                style={style.icon}
                                source={images.iconKey} />
                            <View style={{borderBottomWidth: 1.5, borderColor: '#ddd', paddingBottom: 10, flex: 1, flexDirection: 'row'}}>
                                <Text style={style.label}>Thay đổi mật khẩu</Text>
                                <Image 
                                    style={style.iconNext}
                                    source={images.nextDark} />
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
                
                <Footer navigate={this.props.navigation.navigate}/>
                
            </View>
        )
    }
}
export default connect()(Profile)

const style = StyleSheet.create({
    icon: {width: 35, height: 35, marginLeft: 10, marginRight: 10},
    iconNext: {width: 20, height: 20, marginLeft: 10, marginRight: 10},
    label: {color: '#585858', fontSize: 18, flex: 1, paddingTop: 5},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
