import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import {  Input} from '../layout'
import { ScreenName } from 'config'
class InputItem extends React.Component {
    render() {
      return <View style={{ marginBottom: 5, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Input 
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}/>
            </View>
    };
}

class EditProfile extends React.Component {
    state = {
        name: '',
        company: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        thue: '',
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <ScrollView >
                <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                <View style={{backgroundColor: '#F55555'}}>
                    <TouchableOpacity onPress={this._onSuccess()}>
                        <Text style={{textAlign: 'right', color: '#fff', fontSize: 18, padding: 10}}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F55555', paddingBottom: 30}}>
                    <Image 
                        style={{width: 80, height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    
                    
                </View>
                <View style={{ marginTop: 30}}>
                    <InputItem icon={images.pUser} 
                        onChangeText={name => this.setState({name})}
                        placeholder="Họ và tên"/>
                    <InputItem icon={images.pPhone} 
                        onChangeText={phone => this.setState({phone})}
                        placeholder="Số điện thoại"/>
                    <InputItem icon={images.pEmail} 
                        onChangeText={email => this.setState({email})}
                        placeholder="Email của bạn"/>
                    <InputItem icon={images.pGender} 
                        onChangeText={gender => this.setState({gender})}
                        placeholder="Gioi tinh"/>
                    <InputItem icon={images.pLocation} 
                        onChangeText={address => this.setState({address})}
                        placeholder="Địa chỉ"/>
                    <InputItem icon={images.pCompany} 
                        onChangeText={company => this.setState({company})}
                        placeholder="Tên công ty"/>
                    <InputItem icon={images.pThue} 
                        onChangeText={thue => this.setState({thue})}
                        placeholder="Mã số thuế"/>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _onSuccess = () => () => {
        this.props.navigation.goBack()
    }
}
export default connect()(EditProfile)

const style = StyleSheet.create({
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 5,},
})
