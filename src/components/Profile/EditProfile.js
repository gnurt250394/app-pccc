import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import {  Input} from 'layout'
import { ScreenName, validateName, popupOk, validateEmail } from 'config'
class InputItem extends React.Component {
    render() {
        return <View style={{ marginBottom: 5, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Input 
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                    editable={this.props.editable}
                    value={this.props.value}
                    placeholder={this.props.placeholder}/>
            </View>
    };
}
class Gender extends React.Component {
    state = {
        gender: this.props.gender
    }

    render() {
        return <View style={{ marginBottom: 5, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={images.pGender} />
                <TouchableOpacity onPress={this.props.onSelectMale}>
                    <View style={style.row}>
                        
                        <Image 
                            style={[style.icon, {width: 19}]}
                            source={this.state.gender ? images.selected : images.unselect} />
                        <Text style={style.gender}>Nam</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onSelectFemale}>
                    <View style={style.row}>
                        <Image 
                            style={[style.icon, {width: 19}]}
                            source={this.state.gender ? images.unselect : images.selected} />
                        <Text style={style.gender}>Nữ</Text>
                    </View>
                </TouchableOpacity>
            </View>
    };

    componentWillReceiveProps(props){
        this.setState({gender: props.gender})
    }
}

class EditProfile extends React.Component {
    state = {
        name: '',
        company: '',
        email: '',
        phone: '0978789177',
        gender: true,
        address: '',
        tax_code: '',
    }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <ScrollView >
                <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                <View style={{backgroundColor: '#F55555'}}>
                    <TouchableOpacity onPress={this._onSuccess()}>
                        <Text style={style.textDone}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F55555', paddingBottom: 30}}>
                    <Image 
                        style={{width: 80, height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    
                    
                </View>
                <View style={{ marginTop: 30}}>
                    <InputItem icon={images.pUser} 
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder="Họ và tên"/>
                    <InputItem icon={images.pPhone} 
                        onChangeText={phone => this.setState({phone})}
                        value={this.state.phone}
                        keyboardType='numeric'
                        editable={false}
                        placeholder="Số điện thoại"/>
                    <InputItem icon={images.pEmail} 
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeholder="Email của bạn"/>
                    <Gender 
                        onSelectMale={() => this.setState({gender: true})}
                        onSelectFemale={() => this.setState({gender: false})}
                        gender={this.state.gender}/>
                    <InputItem icon={images.pLocation} 
                        value={this.state.address}
                        onChangeText={address => this.setState({address})}
                        placeholder="Địa chỉ"/>
                    <InputItem icon={images.pCompany} 
                        value={this.state.company}
                        onChangeText={company => this.setState({company})}
                        placeholder="Tên công ty"/>
                    <InputItem icon={images.pThue} 
                        value={this.state.tax_code}
                        onChangeText={tax_code => this.setState({tax_code})}
                        placeholder="Mã số thuế"/>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _onSuccess = () => () => {
        if(this.state.name.trim().length < 2){
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if(!validateName(this.state.name)){
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        }else if(this.state.email.trim() != "" && !validateEmail(this.state.email)){
            popupOk('Email không đúng')
        } else {
            // call api -> go back
            this.props.navigation.goBack()
        }
    }
}
export default connect()(EditProfile)

const style = StyleSheet.create({
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 5,},
    textDone: {textAlign: 'right', color: '#fff', fontSize: 18, padding: 10},
    row: { marginBottom: 5, flexDirection: 'row', alignItems: 'center'},
    gender: {fontSize: 14, color: '#555555', paddingLeft: 10}
})
