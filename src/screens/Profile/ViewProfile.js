import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import {  ShowGender } from 'config'
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
          StatusBar.setBackgroundColor('#F55555');
        });
      }
    
    componentWillUnmount() {
        this._navListener.remove();
    }
    // end set status bar
  
    render(){
        return (
            <View >
                <View style={{backgroundColor: '#F55555', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.props.navigation.goBack()}>
                        <Image 
                            style={{width: 10, resizeMode: 'contain' }}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.props.navigation.navigate(EditProfileScreen)}>
                        <Image 
                            style={{width: 20, resizeMode: 'contain' }}
                            source={images.edit} />
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F55555', paddingBottom: 25}}>
                    <Image 
                        style={{resizeMode: 'contain', height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    <Text style={style.title}>{this.props.user ? this.props.user.name : ""}</Text>
                </View>
                <View style={{ marginTop: 30}}>
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
    label: {color: '#555555', fontSize: 14, flex: 1, paddingTop: 10},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
