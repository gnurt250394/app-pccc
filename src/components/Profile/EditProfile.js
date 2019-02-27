import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import { updateUser } from 'config/api'
import {  Input} from 'layout'
import { validateName, popupOk, validateEmail, StatusCode, Gender } from 'config'
import { chooseImage } from 'config/uploadImage'
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
class GenderItem extends React.Component {
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
                            source={this.state.gender ==  Gender.male ? images.selected : images.unselect} />
                        <Text style={style.gender}>Nam</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onSelectFemale}>
                    <View style={style.row}>
                        <Image 
                            style={[style.icon, {width: 19}]}
                            source={this.state.gender ==  Gender.male ? images.unselect : images.selected} />
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

    constructor(props){
        super(props);
        let user = this.props.user || {}
        this.user = {...user} // check old email
        this.state = {
            name: user.name ? user.name : "",
            company: user.company ? user.company : "",
            email: user.email ? user.email : "",
            phone: user.phone ? user.phone.toString() : "",
            address: user.address ? user.address : "",
            tax_code: user.tax_code ? user.tax_code : "",
            gender: user.gender != null ? user.gender : Gender.male,
           
        }
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor('#F55555');
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    // end set status bar

    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <ScrollView >
                <View style={{backgroundColor: '#F55555'}}>
                    <TouchableOpacity onPress={this._onSuccess()}>
                        <Text style={style.textDone}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F55555', paddingBottom: 30}}>
                    <TouchableOpacity onPress={this._onUploadImage}>
                        <Image 
                            style={{width: 80, height: 80, alignSelf: 'center' }}
                            source={images.userLight} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30}}>
                    <InputItem icon={images.pUser} 
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder="Họ và tên"/>
                    <InputItem icon={images.pPhone} 
                        value={this.state.phone}
                        editable={false}
                        placeholder="Số điện thoại"/>
                    <InputItem icon={images.pEmail} 
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeholder="Email của bạn"/>
                    <GenderItem 
                        onSelectMale={() => this.setState({gender: Gender.male})}
                        onSelectFemale={() => this.setState({gender: Gender.female})}
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

    _onUploadImage = () => {
        console.log(123);
        chooseImage().then(url => {
            console.log('url: ', url);

        }).catch(err => {
            console.log('err: ', err);

        })
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
            let data = {
                name: this.state.name,
                gender: this.state.gender,
                company: this.state.company,
                address: this.state.address,
                tax_code: this.state.tax_code,
            }
            if(this.state.email != this.user.email) data.email = this.state.email;
            updateUser(this.props.token, data).then(res => {
                if(res.data.code == StatusCode.Success){
                    this.props.dispatch({type: 'UPDATE_USER', data: res.data.data})
                    this.props.navigation.goBack()
                }else{
                    popupOk(res.data.message)
                }
            }).catch(err => {
                console.log('err: ', err);
                popupOk('Cập nhật thông tin không thành công')
            })
            
        }
    }
}
const mapStateToProps = (state) =>{
    return {
        user: state.users && state.users.data ? state.users.data : null,
        token: state.users && state.users.token ? state.users.token : null,
    }
}

export default connect(mapStateToProps)(EditProfile)

const style = StyleSheet.create({
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 5,},
    textDone: {textAlign: 'right', color: '#fff', fontSize: 18, padding: 10},
    row: { marginBottom: 5, flexDirection: 'row', alignItems: 'center'},
    gender: {fontSize: 14, color: '#555555', paddingLeft: 10}
})
