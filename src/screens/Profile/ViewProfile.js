import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {  ShowGender, color } from 'config'
import { EditProfileScreen } from 'config/screenNames'
class ListItem extends React.Component {
    render() {
      return this.props.name ? <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Text style={style.label}>{this.props.name}</Text>
            </View> : null
    };
}
class ViewProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user ? this.props.user : {}
        }
    }

    componentWillReceiveProps(props){
        if(props.user) this.setState({user: props.user})
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
            <View >
                <View style={style.header}>
                    <TouchableOpacity style={style.p10} onPress={() => this.props.navigation.goBack()}>
                        <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <Text style={style.title}> Thông tin cá nhân </Text>
                    <TouchableOpacity style={style.p10} onPress={() => this.props.navigation.navigate(EditProfileScreen)}>
                        <Image 
                            style={style.iconEdit}
                            source={images.edit} />
                    </TouchableOpacity>
                </View>
                <View style={style.boxUser}>
                    <Image 
                        style={style.avatar}
                        source={images.userBlue} />
                    <Text style={style.name}>{this.props.user ? this.props.user.name : "Nguyen Van A"}</Text>
                </View>
                <View style={style.mt30}>
                    <ListItem icon={images.pPhone} name={this.state.user.phone} />
                    <ListItem icon={images.pEmail} name={this.state.user.email} />
                    <ListItem icon={images.pGender} name={ShowGender(this.state.user.gender)} />
                    <ListItem icon={images.pLocation} name={this.state.user.address} />
                    <ListItem icon={images.pCompany} name={this.state.user.company} />
                    <ListItem icon={images.pThue} name={this.state.user.tax_code} />
                </View>
            </View>
        )
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
    iconBack: {width: 10, resizeMode: 'contain' },
    iconEdit: {width: 20, resizeMode: 'contain' },
    label: {color: '#555555', fontSize: 14, flex: 1, paddingTop: 10},
    title: {color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: "bold", flex: 1  },
    boxUser: { padding: 10, flexDirection: 'column', alignItems: 'center', borderBottomWidth: 5, borderBottomColor: '#F1F1F1',},
    header: {backgroundColor: color, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    name: {fontSize: 16, color: '#333333', fontWeight: 'bold', padding: 6},
    avatar: {resizeMode: 'contain', height: 70, alignSelf: 'center' },
    p10: {padding: 10},
    mt30: { marginTop: 30}
})
