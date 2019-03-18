import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { updateUser, updateAvatar, getInfoAcount } from 'config/apis/users'
import {  Input} from 'components'
import { validateName, popupOk, validateEmail, StatusCode, Gender, color, CodeToMessage } from 'config'
import { chooseImage } from 'config/uploadImage'
import { actionTypes } from 'actions'
import navigation from 'navigation/NavigationService';
import { SigninScreen } from 'config/screenNames';
import { removeItem } from 'config/Controller';
class InputItem extends React.Component {
    render() {
        return <View style={style.mb5}>
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
        return <View style={style.mb5}>
                <Image 
                    style={style.icon}
                    source={images.pGender} />
                <TouchableOpacity onPress={this.props.onSelectMale}>
                    <View style={style.row}>
                        
                        <Image 
                            style={[style.icon, style.w19]}
                            source={this.state.gender ==  Gender.male ? images.selected : images.unselect} />
                        <Text style={style.gender}>Nam</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onSelectFemale}>
                    <View style={style.row}>
                        <Image 
                            style={[style.icon, style.w19]}
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
            image:null,
        }
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          StatusBar.setBackgroundColor(color);
        });
        this.getInfoAccount()
      }
    
      getInfoAccount=()=>{
          getInfoAcount().then(res=>{
              
              if(res.data.code== StatusCode.Success){
                this.props.dispatch({type: actionTypes.USER_UPDATE, data: res.data.data})

                  this.setState({
                    image: res.data.data.image,
                    name:res.data.data.name,
                    address:res.data.data.address,
                    email:res.data.data.email,
                    company:res.data.data.company,
                    phone:res.data.data.phone,
                    gender:res.data.data.gender,
                    tax_code:res.data.data.tax_code
                  })
              }
          })
      }
    componentWillUnmount() {
        this._navListener.remove();
    }

    // end set status bar

    render(){
        let {image,name,company,email,phone,address,tax_code} = this.state
        return (
            <TouchableWithoutFeedback style= {style.flex} onPress={this._dismiss}>
            <ScrollView >
                <View style={style.header}>
                    <TouchableOpacity style={style.p10} onPress={this._goBack}>
                        <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onSuccess}>
                        <Text style={style.textDone}>Xong</Text>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity onPress={this._onUploadImage}
                    style={style.boxUser}>
                        <Image 
                            style={style.avatar}
                            source={image?{uri: image}:images.userBlue}
                             />
                            <Image
                                source={images.camera}
                                style={style.editCamera}
                            />
                    </TouchableOpacity>

                <View style={style.mt30}>
                    <InputItem icon={images.pUser} 
                        value={name}
                        onChangeText={this.onChangeText('name')}
                        placeholder="Họ và tên"/>
                    <InputItem icon={images.pPhone} 
                        value={phone}
                        editable={false}
                        placeholder="Số điện thoại"/>
                    <InputItem icon={images.pEmail} 
                        keyboardType='email-address'
                        value={email}
                        onChangeText={this.onChangeText('email')}
                        placeholder="Email của bạn"/>
                    <GenderItem 
                        onSelectMale={this._updateGender(Gender.male)}
                        onSelectFemale={this._updateGender(Gender.female)}
                        gender={this.state.gender}/>
                    <InputItem icon={images.pLocation} 
                        value={address}
                        onChangeText={this.onChangeText('address')}
                        placeholder="Địa chỉ"/>
                    <InputItem icon={images.pCompany} 
                        value={company}
                        onChangeText={this.onChangeText('company')}
                        placeholder="Tên công ty"/>
                    <InputItem icon={images.pThue} 
                        value={tax_code}
                        onChangeText={this.onChangeText('tax_code')}
                        placeholder="Mã số thuế"/>
                </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _updateGender = gender => () => {
        this.setState({gender: gender})
    } 
    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = screen => () => {
       navigation.navigate(screen)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }

    _onUploadImage = () => {
        chooseImage().then(url => {
            
            
            this.setState({image: url.uri})

        }).catch(err => {
            

        })
    }

    _onSuccess = () => {
        let {user} = this.props
        if(this.state.name&&this.state.name.trim().length < 2){
            popupOk('Họ và tên phải từ 2 ký tự')
        } else if(!validateName(this.state.name)){
            popupOk('Họ và tên không được dùng ký tự đặc biệt')
        }else if(this.state.email&&this.state.email.trim() != "" && !validateEmail(this.state.email)){
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
            
            if(this.state.email != user.email){
                data.email = this.state.email;
            } else {
                
            }
            updateAvatar(this.state.image).then(res=>{
                if(res.data.code== StatusCode.Success){
                    console.log(res.data,'image')
                    
                } else if(res.data.code== StatusCode.TokenExpire){
                    popupOk(CodeToMessage[res.data.code])
                    navigation.reset(SigninScreen)
                    removeItem('token')
                    
                } else{
                    console.log(res,'eeeee')
                }
            }).catch(err=>{
                console.log(err,'err')
                
            })
            updateUser(data).then(res => {
                
                if(res.data.code == StatusCode.Success){
                    this.props.dispatch({type: actionTypes.USER_UPDATE, data: res.data.data})
                    navigation.pop()
                    this.props.navigation.state.params.refress()
                }else if(res.data.code == StatusCode.TokenExpire){
                    popupOk(CodeToMessage[res.data.code])
                    navigation.reset(SigninScreen)
                    removeItem('token')
                } else if(res.data.code== StatusCode.Tokenvalid){
                    popupOk(CodeToMessage[res.data.code])
                    navigation.reset(SigninScreen)
                    removeItem('token')
                } else{
                    console.log(res.data,'else')
                    popupOk(CodeToMessage[res.data.code])
                }
            }).catch(err => {
                
                popupOk('Cập nhật thông tin không thành công')
            })
            
        }
    }
}
const mapStateToProps = (state) =>{
    console.log(state)
    return {
        user: state.users && state.users.data ? state.users.data : null,
        token: state.users && state.users.token ? state.users.token : null,
    }
}

export default connect(mapStateToProps)(EditProfile)

const style = StyleSheet.create({
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 5,},
    iconBack: {height: 15, resizeMode: 'contain' },
    textDone: {textAlign: 'right', color: '#fff', fontSize: 18, padding: 8},
    row: { marginBottom: 5, flexDirection: 'row', alignItems: 'center'},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    gender: {fontSize: 14, color: '#555555', paddingLeft: 10},
    avatar: { height: 70,width:70,borderRadius:35 },
    boxUser: {  alignItems: 'center',height:70,width:70,borderRadius: 35,justifyContent:'center',alignSelf: 'center',marginTop:10},
    p10: {padding: 10},
    mt30: { marginTop: 30},
    flex:  { flex:1},
    w19: {width: 19},
    mb5: { marginBottom: 0, flexDirection: 'row'},
    editCamera:{
        height:17,
        width:21,
        // tintColor:color,
        // opacity:0.4,
        position:'absolute',
        bottom:0,
        right:3
    }
})
