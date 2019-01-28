import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import {  Input} from '../layout'
import { ScreenName } from 'config'

class EditProfile extends React.Component {
    update = () => {
        this.props.navigation.navigate(ScreenName.ViewProfile)
    }
    render(){
        return (
            <View >
                <StatusBar backgroundColor="#FB3C30" barStyle="light-content" />
                <View style={{backgroundColor: '#FB3C30'}}>
                    <TouchableOpacity onPress={this.update}>
                        <Text style={{textAlign: 'right', color: '#fff', fontSize: 18, padding: 10}}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#FB3C30', paddingBottom: 30}}>
                    <Image 
                        style={{width: 80, height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    
                    
                </View>
                <View style={{ marginTop: 30}}>
                    <View style={{ marginBottom: 15, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconUser} />
                        <Input placeholder="Họ và tên"/>
                    </View>
                    <View style={{ marginBottom: 15, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconPhone} />
                        <Input placeholder="Số điện thoại"/>
                    </View>
                    <View style={{ marginBottom: 15, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconEmail} />
                        <Input placeholder="Email của bạn"/>
                    </View>
                    <View style={{ marginBottom: 15, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconCompany} />
                        <Input placeholder="Tên công ty (nếu có)"/>
                    </View>
                    <View style={{ marginBottom: 15, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconThue} />
                        <Input placeholder="Mã số thuế (nếu có)"/>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect()(EditProfile)

const style = StyleSheet.create({
    icon: {width: 35, height: 35, marginLeft: 10, marginRight: 10, marginTop: 10},
    label: {color: '#585858', fontSize: 18, flex: 1},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
