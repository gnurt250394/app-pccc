import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet,Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {  ShowGender, color,StatusCode  } from 'config'
import { EditProfileScreen } from 'config/screenNames'
import { getInfoAcount } from 'config/apis/users';
import { getItem, removeItem, Status } from 'config/Controller';
const {height,width} =Dimensions.get('window')
class ListItem extends React.Component {
    render() {
      return this.props.name ? <View style={{ marginBottom: 2, flexDirection: 'row'}}>
                <Image 
                    style={[style.icon, this.props.styleIcon || {}]}
                    source={this.props.icon} />
                <Text style={style.label}>{this.props.name}</Text>
            </View> : <View style={{ marginBottom: 2, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Text style={style.sub}>{this.props.label}</Text>
            </View>
    };
}
class ViewProfile extends React.Component {
    state = {
        user:  this.props.navigation.getParam('user') || {},
        image: this.props.navigation.getParam('image')
    }
  
        // set status bar
    componentDidMount =()=> {
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
        let {user,image} = this.state
        return (
            <View >
                <View style={style.header}>
                    <TouchableOpacity style={style.p10} onPress={this._goBack}>
                        <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <Text style={style.title}> Thông tin cá nhân </Text>
                    <TouchableOpacity style={style.p10} onPress={this._navTo(EditProfileScreen, {user: this.state.user, image: this.state.image, refress: this.getInfo})}>
                        <Image 
                            style={style.iconEdit}
                            source={images.edit} />
                    </TouchableOpacity>
                </View>
                <View style={style.boxUser}>
                    <Image 
                        style={style.avatar}
                        source={image?{uri:image}:images.userBlue} />
                    <Text style={style.name}>{user.name}</Text>
                </View>
                <View style={style.mt30}>
                    <ListItem icon={images.pPhone} label={""} name={user.phone} styleIcon={style.iconPhone} />
                    <ListItem icon={images.pEmail} label={"Cập nhật Email"} name={user.email} />
                    <ListItem icon={images.pGender} label={"Cập nhật giới tính"} name={ShowGender(user.gender)} styleIcon={style.iconGender}/>
                    <ListItem icon={images.pLocation} label={"Cập nhật địa chỉ"} name={user.address} styleIcon={style.iconLocation} />
                    <ListItem icon={images.pCompany} label={"Cập nhật tên công ty"} name={user.company} styleIcon={style.iconLocation}/>
                    <ListItem icon={images.pThue} label={"Cập nhật mã số thuế"} name={user.tax_code} />
                </View>
            </View>
        )
    }

    getInfo = async () => {
        let token = await getItem('token')
        
        let user = await getInfoAcount(token).then( res=> {
            return res.data.code == StatusCode.Success ? res.data.data : null
        }).catch(err => {
            return null
        })
        if(user && user.name ){
            this.setState({
                user: user,
                image: user.image ? user.image.full_path : null
            })
            return
        }
    }

    _navTo = (screen,params) => () => {
        this.props.navigation.navigate(screen,params)
    }

    _goBack = () => {
        this.props.navigation.state.params.update()
        this.props.navigation.goBack()
    }

}
const mapStateToProps = (state) =>{
    return {
        user: state.users && state.users.data ? state.users.data : null,
        token: state.users && state.users.token ? state.users.token : null,
    }
}

export default connect(mapStateToProps)(ViewProfile)

const style = StyleSheet.create({
    icon: {
        width: 18, 
        resizeMode: 'contain', 
        marginLeft: 10, 
        marginRight: 10,
        marginTop: 0
    },
    w26: { width: 26},
    iconPhone: { width: 15, marginLeft: 12, marginRight: 12},
    iconGender: { width: 20, marginLeft: 9, marginRight: 9},
    iconLocation: { width: 15, marginLeft: 12, marginRight: 12},
    iconBack: {height: 15, resizeMode: 'contain' },
    iconEdit: {height: 18, resizeMode: 'contain' },
    label: {
        color: '#555555', 
        fontSize: 14, 
        flex: 1, 
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomColor:'#CCCCCC',
        borderBottomWidth:0.5,
        // borderWidth: 1,
    },
    title: {color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: "bold", flex: 1  },
    boxUser: { padding: 10, flexDirection: 'column', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    name: {fontSize: 16, color: '#333333', fontWeight: 'bold', padding: 6},
    avatar: { height: 70,width:70,borderRadius: 35, alignSelf: 'center' },
    p10: {padding: 10},
    mt30: { marginTop: 30},
    end:{
        height:1,
        width:width-100,
        alignSelf:'flex-end',
        backgroundColor:'#F1F1F1'
    },
    sub: {color: '#BBBBBB', fontSize: 14, flex: 1, paddingTop: 10,borderBottomColor:'#CCCCCC',borderBottomWidth:0.5},
})
