import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { ScreenName } from 'config'
import { DrawerActions } from 'react-navigation-drawer';
let {width, height} = Dimensions.get('window')
class HomeScreen extends React.Component {
   
    render(){
        return (
            <TouchableWithoutFeedback style= {style.flex} onPress={() =>this.props.navigation.closeDrawer()}>
                <ScrollView>
                    <StatusBar backgroundColor="#F55555" barStyle="light-content" />

                    <View style={style.head}>
                        <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.dispatch(DrawerActions.toggleDrawer())} >
                            <Image 
                                style={[styles.icon, style.w20]}
                                source={images.menu} />
                        </TouchableOpacity>
                        
                        <View 
                            style={style.boxSearch}>
                            <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <Image 
                                    style={[styles.icon, style.w15]}
                                    source={images.iconSearch} />
                            </TouchableOpacity>
                            <TextInput 
                                style={style.flex}
                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                placeholder="Tìm kiếm" />
                            
                        </View >
                    </View>
                    <View style={style.flex}>
                        <View style={{flexDirection: 'row', marginBottom: 2,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box6}
                                    source={images.projectInfo}>
                                    <Text style={style.title}>Thông tin dự án</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box4}
                                    source={images.product}>
                                    <Text style={style.title}>Sản phẩm</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 2,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box6}
                                    source={images.thongtindauthau}>
                                    <Text style={style.title}>Thông tin đấu thầu</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box4}
                                    source={images.thanhly}>
                                    <Text style={style.title}>Thanh lý hàng hóa</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 2,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.dangmua}>
                                    <Text style={style.title}>Đăng mua</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.thongtintheodoi}>
                                    <Text style={style.title}>Thông tin theo dõi</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={[style.box3, {marginRight: 0}]}
                                    source={images.myShop}>
                                    <Text style={style.title}>Shop của tôi</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.tailieu}>
                                    <Text style={style.title}>Tài liệu</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.catalog}>
                                    <Text style={style.title}>Catalog</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(ScreenName.Search)} >
                                <ImageBackground 
                                    style={[style.box3, {marginRight: 0}]}
                                    source={images.video}>
                                    <Text style={style.title}>Video</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                    
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect()(HomeScreen)

const style = StyleSheet.create({
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F55555'},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 18},
    box6: {width: width * (0.55), height: 125, marginRight: 2},
    box4: {width: width * (0.45), height: 125},
    box3: {width: width/3, height: 125, marginRight: 2}
})
