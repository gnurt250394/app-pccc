import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native'
import images from "assets/images"
import styles from "assets/styles"
import { color } from 'config'
import navigation from 'navigation/NavigationService';
import { fontStyle } from 'config/Controller';
import { fontStyles } from 'config/fontStyles';

export default class Header extends React.Component {
    render() {
        return (
            <SafeAreaView style={style.container}>
                <View style={[style.content, { ...this.props.style }]} >
                    {/* <StatusBar
                        barStyle="light-content"
                        backgroundColor={color} /> */}
                    {this.props.check == 1 ? <TouchableOpacity onPress={this.props.onPress} style={style.btn}>
                        <Image
                            style={style.icon}
                            source={images.backLight} />
                    </TouchableOpacity>
                        :
                        <View style={style.end} />}
                    <View style={style.flex}>
                        <Text style={[style.title, fontStyles.Acumin_bold]}>{this.props.title}</Text>
                        {/* {this.props.status && (
                            <View style={style.row}>
                                <Image
                                    style={style.dot}
                                    source={this.props.status ? images.online : images.offline} />
                                <Text style={style.status}>{this.props.status?'Đang hoạt động':'Không hoạt động'}</Text>
                            </View>
                        )} */}
                    </View>
                    {this.props.finish == 1 ? <TouchableOpacity
                        onPress={this.props.onFinish}
                        style={style.view}>
                        <Text style={[style.txtFinish]}>Xong</Text>
                    </TouchableOpacity> : this.props.finish == 2 ? <TouchableOpacity style={style.btnAdd}
                        onPress={this.props.onFinish}
                    >
                        <Image
                            source={images.liquiAdd}
                            style={style.add}
                            resizeMode="contain"
                        />
                    </TouchableOpacity> : <View style={style.right} />}
                </View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    flex: {
        alignSelf: 'center',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        marginLeft:40,
    },
    row:{
        flexDirection:'row',
        alignItems:'center'

    },
    dot: {
        width: 10,
        height: 10,
        marginRight:4,
        alignSelf:'center',
        resizeMode: 'contain',
    },
    status: {
        fontSize: 11,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '300',
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: color,
        height: 47,
        // flex:1,
        alignItems: 'center',
        alignContent: 'center',
    },
    end:{
        paddingLeft: 12,
        paddingBottom: 8,
        paddingTop: 0,
        marginTop: 7,
        width:16
    },
    container: {
        backgroundColor: color,
    },
    icon: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    right: {
        height: '90%',
        width: '18%',
    },
    title: {
        // fontFamily: fontStyle.Acumin_bold,
        // flex: 1, 
        fontSize: 18,
        color: '#fff',
        textAlign: 'center', 
    },
    btn: {
        paddingLeft: 12,
        paddingBottom: 8,
        paddingTop: 0,
        marginTop: 7,
    },
    view: {
        // flex:1/9,
        // paddingRight:7,
        alignItems: 'center',
        justifyContent: 'center',
        width: '18%',
        height: '90%'
    },
    txtFinish: {
        color: "#FFFFFF",
        fontSize: 16
    },
    btnAdd: {
        height: '90%',
        width: '18%',
        paddingLeft:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        width: 17,
        height: 17,
        tintColor: '#FFFFFF'
    },
})
