import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { updateUser } from 'config/apis/users'
import {  Input} from 'components'
import { validateName, popupOk, validateEmail, StatusCode, Gender, color, CodeToMessage } from 'config'
import { chooseImage } from 'config/uploadImage'
import { actionTypes } from 'actions'
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
        console.log('user: ', user);
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
          StatusBar.setBackgroundColor(color);
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
                <View style={style.header}>
                    <TouchableOpacity style={style.p10} onPress={() => this.props.navigation.goBack()}>
                        <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onSuccess()}>
                        <Text style={style.textDone}>Xong</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.boxUser}>
                    <TouchableOpacity onPress={this._onUploadImage}>
                        <Image 
                            style={style.avatar}
                            source={images.userBlue} />
                    </TouchableOpacity>
                </View>

                <View style={style.mt30}>
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
            console.log(11, data);
            if(this.state.email != this.user.email) data.email = this.state.email;
            updateUser(this.props.token, data).then(res => {
                if(res.data.code == StatusCode.Success){
                    this.props.dispatch({type: actionTypes.USER_UPDATE, data: res.data.data})
                    this.props.navigation.goBack()
                }else{
                    popupOk(CodeToMessage[res.data.code])
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
    iconBack: {width: 10, resizeMode: 'contain' },
    textDone: {textAlign: 'right', color: '#fff', fontSize: 18, padding: 10},
    row: { marginBottom: 5, flexDirection: 'row', alignItems: 'center'},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    gender: {fontSize: 14, color: '#555555', paddingLeft: 10},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    avatar: {resizeMode: 'contain', height: 70, alignSelf: 'center' },
    boxUser: { padding: 10, flexDirection: 'column', alignItems: 'center'},
    p10: {padding: 10},
    mt30: { marginTop: 30}
})
