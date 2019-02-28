import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { SearchScreen } from 'config/screenNames'
import { DrawerActions } from 'react-navigation-drawer';
let {width, height} = Dimensions.get('window')

class Home extends React.Component {
    state = {
        keyword: ''
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

    render(){
        return (
            <TouchableWithoutFeedback style= {style.flex} onPress={() =>this.props.navigation.closeDrawer()}>
                <ScrollView>

                    <View style={style.head}>
                        <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.dispatch(DrawerActions.toggleDrawer())} >
                            <Image 
                                style={[styles.icon, style.w20]}
                                source={images.menu} />
                        </TouchableOpacity>
                        
                        <View 
                            style={style.boxSearch}>
                            <TouchableOpacity style={style.p8} onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <Image 
                                    style={[styles.icon, style.w15]}
                                    source={images.iconSearch} />
                            </TouchableOpacity>
                            <TextInput 
                                style={[style.flex, {color: "rgba(255, 255, 255, 0.6)"}]}
                                value={this.state.keyword}
                                returnKeyLabel="Tìm"
                                onSubmitEditing={this._onSearch}
                                onChangeText={keyword => this.setState({keyword})}
                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                placeholder="Tìm kiếm" />
                            
                        </View >
                    </View>
                    <View style={style.flex}>
                        <View style={{flexDirection: 'row', marginBottom: 1, marginTop: 1,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box6}
                                    source={images.projectInfo}>
                                    <Text style={style.title}>Thông tin dự án</Text> 
                                    
                                    <View style={style.badge}>
                                        {/* <Image
                                            style={style.badgeImage}
                                            source={images.badge} /> */}
                                            <Text style={style.notify}>10</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box4}
                                    source={images.product}>
                                    <Text style={style.title}>Sản phẩm</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 1,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box6}
                                    source={images.thongtindauthau}>
                                    <Text style={style.title}>Thông tin đấu thầu</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>15</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box4}
                                    source={images.thanhly}>
                                    <Text style={[style.title]}>Thanh lý hàng hóa</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>362</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 1,}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.dangmua}>
                                    <Text style={style.title}>Đăng mua</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.thongtintheodoi}>
                                    <Text style={style.title}>Thông tin theo dõi</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>7</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={[style.box3, {marginRight: 0}]}
                                    source={images.myShop}>
                                    <Text style={style.title}>Shop của tôi</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.tailieu}>
                                    <Text style={style.title}>Tài liệu</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>7</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.catalog}>
                                    <Text style={style.title}>Catalog</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>7</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate(SearchScreen)} >
                                <ImageBackground 
                                    style={[style.box3, {marginRight: 0}]}
                                    source={images.video}>
                                    <Text style={style.title}>Video</Text> 
                                    <View style={style.badge}>
                                        <Text style={style.notify}>7</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                    
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }

    _onSearch = () => {
        console.log(11, this.state.keyword);
    }
}
export default connect()(Home)

const style = StyleSheet.create({
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F55555'},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 16,  width: '80%'},
    box6: {width: (width * (2/3) + 2), height: (height - 136)/4, marginRight: 1},
    box4: {width: width * (1/3), height: (height - 136)/4},
    box3: {width: width/3, height: (height - 136)/4, marginRight: 1},
    badge: {backgroundColor: '#FCCF31', position: 'absolute',top: 6, right: 6, borderRadius: 50, minWidth: 30},
    badgeImage: {height: 35, resizeMode: 'contain',},
    notify: { color: "#F55555", fontSize: 12, padding: 5, textAlign: 'center'},
})
