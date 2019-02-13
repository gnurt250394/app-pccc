import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import FastImage  from 'react-native-fast-image'
import styles from "public/css" 
import ImagePicker from 'react-native-image-picker';
import { signup } from 'config/api'
import {  Input} from '../layout'
import { ScreenName } from 'config'
import { chooseImage } from '../../config/uploadImage';

class EditProfile extends React.Component {
    constructor(props){
        super(props)
        this.state={
            uriAvatar:null
        }
    }
    update = () => {
        this.props.navigation.navigate(ScreenName.ViewProfile)
    }
    ChoseImage=()=>{
        chooseImage(uri=>{
        this.setState({uriAvatar:uri})
            })
    }
    
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View >
                <StatusBar backgroundColor="#FB3C30" barStyle="light-content" />
                <View style={{backgroundColor: '#FB3C30',}}>
                    <TouchableOpacity onPress={this.update}>
                        <Text style={{textAlign: 'right', color: '#fff', fontSize: 18, padding: 10}}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#FB3C30', paddingBottom: 30}}>
                <TouchableOpacity style={{height:80,width:80,alignSelf:'center',justifyContent:'flex-end',alignItems:'flex-end'}}
                onPress={this.ChoseImage}
                >
                    <FastImage 
                        style={{width:'100%', height: '100%', alignSelf: 'center',borderRadius:40 }}
                        source={this.state.uriAvatar? {uri:this.state.uriAvatar}:images.userLight}
                        resizeMode={FastImage.resizeMode.contain} />
                    
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30}}>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconUser} />
                        <Input placeholder="Họ và tên"/>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconPhone} />
                        <Input placeholder="Số điện thoại"/>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconEmail} />
                        <Input placeholder="Email của bạn"/>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconCompany} />
                        <Input placeholder="Tên công ty (nếu có)"/>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconThue} />
                        <Input placeholder="Mã số thuế (nếu có)"/>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(EditProfile)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10, marginTop: 8},
    label: {color: '#585858', fontSize: 16, flex: 1},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
