import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { ScreenName } from 'config'

class ViewProfile extends React.Component {
    edit = () => {
        this.props.navigation.navigate(ScreenName.EditProfile)
    }

    render(){
        return (
            <View >
                <StatusBar backgroundColor="#FB3C30" barStyle="light-content" />
                <View style={{backgroundColor: '#FB3C30', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                <View style={{backgroundColor: '#FB3C30', paddingBottom: 30}}>
                    <Image 
                        style={{width: 80, height: 80, alignSelf: 'center' }}
                        source={images.userLight} />
                    <Text style={style.title}>Nguyễn Văn Nam</Text>
                </View>
                <View style={{ marginTop: 30}}>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconPhone} />
                        <Text style={style.label}>0978789177</Text>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconEmail} />
                        <Text style={style.label}>hoanglv@vinsofts.net</Text>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconCompany} />
                        <Text style={style.label}>Cong ty vinsofts</Text>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row'}}>
                        <Image 
                            style={style.icon}
                            source={images.iconThue} />
                        <Text style={style.label}>GP500-MST</Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect()(ViewProfile)

const style = StyleSheet.create({
    icon: {width: 30, resizeMode: 'contain', marginLeft: 10, marginRight: 10,marginTop: -5},
    label: {color: '#585858', fontSize: 16, flex: 1, paddingTop: 10},
    title: {color: '#fff', fontSize: 20, alignSelf: 'center', fontWeight: "bold", paddingTop: 15 }
})
