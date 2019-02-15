import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { ScreenName } from 'config'
class ListItem extends React.Component {
    render() {
      return <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                <Image 
                    style={style.icon}
                    source={this.props.icon} />
                <Text style={style.label}>{this.props.name}</Text>
            </View>
    };
}
class ViewProfile extends React.Component {
    edit = () => {
        this.props.navigation.navigate(ScreenName.EditProfile)
    }

    render(){
        return (
            <View >
                <StatusBar backgroundColor="#F55555" barStyle="light-content" />
                <View style={{backgroundColor: '#F55555', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.props.navigation.goBack()}>
                        <Image 
                            style={{width: 10, resizeMode: 'contain' }}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10}} onPress={this.edit}>
                        <Image 
                            style={{width: 20, resizeMode: 'contain' }}
                            source={images.edit} />
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#F55555', paddingBottom: 25}}>
                    <Image 
                        style={{resizeMode: 'contain', height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    <Text style={style.title}>Nguyễn Văn Nam</Text>
                </View>
                <View style={{ marginTop: 30}}>
                    <ListItem icon={images.pPhone} name="0978789177" />
                    <ListItem icon={images.pEmail} name="hoanglv@vinsofts.net" />
                    <ListItem icon={images.pGender} name="Nam" />
                    <ListItem icon={images.pLocation} name="So 8 Phan Van Truong" />
                    <ListItem icon={images.pCompany} name="Cong ty vinsofts" />
                    <ListItem icon={images.pThue} name="GP500-MST" />
                </View>
            </View>
        )
    }
}
export default connect()(ViewProfile)

const style = StyleSheet.create({
    icon: {width: 26, resizeMode: 'contain', marginLeft: 10, marginRight: 10,marginTop: -5},
    label: {color: '#555555', fontSize: 14, flex: 1, paddingTop: 10},
    title: {color: '#fff', fontSize: 18, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
