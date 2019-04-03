import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet,Dimensions ,SafeAreaView} from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {  ShowGender, color,StatusCode  } from 'config'
import { EditProfileScreen } from 'config/screenNames'
import { getInfoAcount } from 'config/apis/users';
import FastImage from 'react-native-fast-image'
import { getItem, removeItem, Status } from 'config/Controller';
const {height,width} =Dimensions.get('window')
class ListItem extends React.Component {
    render() {
      return this.props.name ? <View style={{  flexDirection: 'row'}}>
                <Image 
                    style={[style.icon, this.props.styleIcon || {}]}
                    source={this.props.icon} />
                    <View style={style.label}>
                <Text style={style.txtLabel}>{this.props.name}</Text>
                </View>
            </View> : <View style={{ marginBottom: 2, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                    <View style={style.sub}>
                <Text style={style.txtSub}>{this.props.label}</Text>
                </View>
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
                <SafeAreaView style={style.SafeAreaView}>
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
                </SafeAreaView>
                <View style={style.boxUser}>
                    <FastImage 
                        style={style.avatar}
                        source={image?{uri:image}:images.userBlue} />
                    <Text style={style.name}>{user.name}</Text>
                </View>
                <View style={style.mt30}>
                    <ListItem icon={images.pPhone} label={""} name={user.phone} styleIcon={style.iconPhone} />
                    <ListItem icon={images.pEmail} label={"Cập nhật Email"} name={user.email} styleIcon={style.iconGender} />
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
    SafeAreaView:{
        backgroundColor:color
    },
    icon: {
        width: 12, 
        resizeMode: 'contain', 
        marginLeft: 10, 
        marginRight: 10,
        marginTop: 8
    },
    w26: { width: 26},
    iconEmail:{
        width:15
    },
    iconPhone: { width: 10, },
    // iconGender: { width: 17, },
    // iconLocation: { width: 15, },
    iconBack: {height: 15, resizeMode: 'contain' },
    iconEdit: {height: 18, resizeMode: 'contain' },
    
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
    label: {
        flex: 1, 
        paddingBottom: 5,
        height:40,
        borderBottomColor:'#333333',
        borderBottomWidth:0.4,
        justifyContent:'flex-end',
    },
    sub: {
        flex: 1, 
        borderBottomColor:'#333333',
        borderBottomWidth:0.4,
        paddingBottom: 5,
        justifyContent:'flex-end',
        height:40,
    },
    txtSub:{
        color: '#555555', 
        fontSize: 14, 
        marginLeft:7
    },
    txtLabel:{
        color: '#555555', 
        fontSize: 14, 
        marginLeft:7
    }
})
