import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {  ShowGender, color } from 'config'
import { EditProfileScreen } from 'config/screenNames'
import { getInfoAcount } from 'config/apis/users';
import { Status } from 'config/Controller';
class ListItem extends React.Component {
    render() {
      return this.props.name ? <View style={{ marginBottom: 2, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Text style={style.label}>{this.props.name}</Text>
            </View> : null
    };
}
class ViewProfile extends React.Component {
        state = {
            user:  {},
    }

   

    getInfo= ()=>{
        getInfoAcount().then(res=>{
            if(res.data.code==Status.Success){
                this.setState({
                    user:res.data.data
                })
            }
        })
    }
        // set status bar
    componentDidMount =async()=> {
        this.getInfo()
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
        let {user} = this.state
        return (
            <View >
                <View style={style.header}>
                    <TouchableOpacity style={style.p10} onPress={this._goBack}>
                        <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <Text style={style.title}> Thông tin cá nhân </Text>
                    <TouchableOpacity style={style.p10} onPress={this._navTo(EditProfileScreen,{refress:this.getInfo})}>
                        <Image 
                            style={style.iconEdit}
                            source={images.edit} />
                    </TouchableOpacity>
                </View>
                <View style={style.boxUser}>
                    <Image 
                        style={style.avatar}
                        source={user&&user.image?{uri:user.image}:images.userBlue} />
                    <Text style={style.name}>{user.name}</Text>
                </View>
                <View style={style.mt30}>
                    <ListItem icon={images.pPhone} name={user.phone} />
                    <ListItem icon={images.pEmail} name={user.email} />
                    <ListItem icon={images.pGender} name={ShowGender(user.gender)} />
                    <ListItem icon={images.pLocation} name={user.address} />
                    <ListItem icon={images.pCompany} name={user.company} />
                    <ListItem icon={images.pThue} name={user.tax_code} />
                </View>
            </View>
        )
    }

    _navTo = (screen,params) => () => {
        this.props.navigation.navigate(screen,params)
    }

    _goBack = () => {
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
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 10,marginTop: -5},
    iconBack: {height: 15, resizeMode: 'contain' },
    iconEdit: {height: 18, resizeMode: 'contain' },
    label: {color: '#555555', fontSize: 14, flex: 1, paddingTop: 10},
    title: {color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: "bold", flex: 1  },
    boxUser: { padding: 10, flexDirection: 'column', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    name: {fontSize: 16, color: '#333333', fontWeight: 'bold', padding: 6},
    avatar: { height: 70,width:70,borderRadius: 35, alignSelf: 'center' },
    p10: {padding: 10},
    mt30: { marginTop: 30}
})
