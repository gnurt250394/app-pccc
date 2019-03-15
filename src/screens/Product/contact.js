import React, { Component } from 'react';
import { View, Text,ScrollView,Image,StyleSheet,TouchableOpacity,StatusBar,Dimensions,TextInput } from 'react-native';
import images from "assets/images"
import { color } from 'config'

const {width,height}=Dimensions.get('window')

const RenderRow =(props)=> <View style={styles.rowItem}>
        <Image source={props.source}
            style={styles.image}
            resizeMode="contain" />
        <View style={styles.txt}>
        <Text>{props.title}</Text>
    </View>
</View>


const RenderTextInput =(props)=>{
    return(
        <View style={{marginTop:10}}>
        <Text>{props.name}</Text>
            <TextInput
                style={[styles.TextInput,props.style]}
                multiline={true}

            />

        </View>
    )
}
export default class Contacts extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._goBack} >
                        <Image 
                            style={[styles.icon, styles.iconBack]}
                            source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.headText}>Liên hệ</Text>
                    {/* <TouchableOpacity onPress={() =>  null} >
                            <Image 
                                style={[styles.icon, {margin: 10, height: 18}]}
                                source={images.share} />
                    </TouchableOpacity> */}
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.txtTitle}>Thông tin về chúng tôi</Text>
                            <RenderRow
                                source={images.contactEarth}
                                title={"sieuthiphongchay.vn"} />
                            <RenderRow
                                source={images.contactPhone}
                                title={"0987654321/ 0123456789"}  />
                            <RenderRow
                                source={images.contactSMS}
                                title={"cskh@phongchaythanglong.vn"} />
                            <RenderRow
                                source={images.contactLocation1}
                                title={"84 Miếu Đầm - Nam Từ Liêm - Hà Nội"} />
                            <RenderRow
                                source={images.contactLocation}
                                title={"100/70 Nguyễn Hoàng, P.Mỹ Đình 2, Q.Nam Từ Liêm,Hà Nội"} />
                        
                            <View style={styles.viewEnd}/>
                                <Text style={styles.txtTitle}>Tư vấn, Hỏi đáp</Text>
                                <RenderTextInput name={"Tên của bạn"} />
                                <RenderTextInput name={"Email"} />
                                <RenderTextInput name={"Tiêu đề"} />
                                <RenderTextInput
                                    name={"Nội dung"}
                                    style={styles.h120} />
                                <View style={styles.box}>

                                <View/>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.fw500}>GỬI</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </View>
        );
    }

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _dismiss = () => {
        Keyboard.dismiss()
    }
}

const styles = StyleSheet.create({
    iconBack: {margin: 10, width: 10,tintColor:'black'},
    flex: {flex: 1},
    h120: {height:120},
    box: {justifyContent:'space-between',flexDirection:'row'},
    fw500: {fontWeight:'500'},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 18,
        resizeMode: 'contain',
    },
    headText:{
        fontSize: 20, 
        color: '#333333', 
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container:{
        flex:1,
        padding: 15,
    },
    rowItem:{
        flexDirection:'row',
        marginTop: 15,
    },
    image:{
        height:18,
        width:18,
        marginRight: 15,
    },
    txt:{
        flexWrap:'wrap',
        flexShrink: 7,
    },
    viewEnd:{
        height:1,
        backgroundColor:'gray',
        width:width-20,
        alignSelf: 'center',
        marginVertical: 20,
    },
    txtTitle:{
        fontSize:19,
        fontWeight:'500'
    },
    TextInput:{
        height:38,
        width:width-20,
        alignSelf:'center',
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: 1,
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        alignContent: 'flex-end',
        backgroundColor:color,
        height:40,
        width:70,
        borderRadius:10,
        marginVertical:10,
    }
})