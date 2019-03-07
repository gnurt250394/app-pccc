import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import styles from "assets/styles"
import { SearchScreen } from 'config/screenNames'
import { DrawerActions } from 'react-navigation-drawer';
import { color } from 'config'
let {width, height} = Dimensions.get('window')

class Home extends React.Component {
    state = {
        keyword: ''
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

    render(){
        return (
            <TouchableWithoutFeedback style= {style.flex}>
                <ScrollView>
                    <View style={style.head}>
                        <View 
                            style={style.boxSearch}>
                            <TouchableOpacity style={style.p8} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                    style={[styles.icon, style.w15]}
                                    source={images.iconSearch} />
                            </TouchableOpacity>
                            <TextInput 
                                style={[style.flex, style.txtSearch]}
                                value={this.state.keyword}
                                returnKeyLabel="Tìm"
                                onSubmitEditing={this._onSearch}
                                onChangeText={this.onChangeText('keyword')}
                                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                placeholder="Tìm kiếm" />
                            
                        </View >
                    </View>

                    <View style={style.flex}>
                        <View style={style.row}>
                            <TouchableOpacity onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box6}
                                    source={images.tttd} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box4}
                                    source={images.myShop} />
                            </TouchableOpacity>
                        </View>

                        <View style={style.row}>
                            <Text style={style.txt6}>Thông tin theo dõi</Text>
                            <Text style={style.txt4}>Shop của tôi</Text>
                        </View>

                        <View style={style.row}>
                            <TouchableOpacity style={style.box6} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box6}
                                    source={images.ttda} />
                                <Text style={style.textB6}>Thông tin dự án</Text> 
                                <View style={style.boxBadge}>
                                    <Image 
                                        style={style.iconBadge}
                                        source={images.badge} />
                                    <Text style={style.textBadge}>317</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.box4} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box4}
                                    source={images.thanhly} />
                                <Text style={style.textB4}>Thông tin đấu thầu</Text> 
                                <View style={style.boxBadge}>
                                    <Image 
                                        style={style.iconBadge}
                                        source={images.badge} />
                                    <Text style={style.textBadge}>333</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={style.row}>
                            <TouchableOpacity onPress={this._navTo(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.product}>
                                    <Text style={style.textB4}>Sản phẩm</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._navTo(SearchScreen)} >
                                <ImageBackground 
                                    style={style.box3}
                                    source={images.thongtintheodoi}>
                                    <Text style={style.textB4}>Thanh lý hàng hóa</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._navTo(SearchScreen)} >
                                <ImageBackground 
                                    style={[style.box3, {marginRight: 0}]}
                                    source={images.dangmua}>
                                    <Text style={style.textB4}>Đăng mua</Text> 
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={style.row}>
                            <TouchableOpacity style={style.box3} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box3}
                                    source={images.video} />
                                <Text style={style.textB6}>Video</Text> 
                                <View style={style.boxBadge}>
                                    <Image 
                                        style={style.iconBadge}
                                        source={images.badge} />
                                    <Text style={style.textBadge}>2</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box3}
                                    source={images.catalog} />
                                <Text style={style.textB6}>Catalog</Text> 
                                <View style={style.boxBadge}>
                                    <Image 
                                        style={style.iconBadge}
                                        source={images.badge} />
                                    <Text style={style.textBadge}>2</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3} onPress={this._navTo(SearchScreen)} >
                                <Image 
                                     style={style.box3}
                                    source={images.tailieu} />
                                <Text style={style.textB6}>Tài liệu</Text> 
                                <View style={style.boxBadge}>
                                    <Image 
                                        style={style.iconBadge}
                                        source={images.badge} />
                                    <Text style={style.textBadge}>2</Text>
                                </View>
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
export default connect()(Home)

const style = StyleSheet.create({
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 16,  width: '80%'},
    box6: {width: (width * (2/3) + 2), height: (height - 180)/4, marginRight: 1, position: 'relative'},
    box4: {width: width * (1/3), height: (height - 180)/4,  position: 'relative'},
    box3: {width: width/3 + 1.5, height: (height - 180)/4, marginRight: 0,  position: 'relative'},
    badge: {backgroundColor: '#FCCF31', position: 'absolute',top: 6, right: 6, borderRadius: 50, minWidth: 30},
    badgeImage: {height: 35, resizeMode: 'contain',},
    notify: { color: color, fontSize: 12, padding: 5, textAlign: 'center'},
    txt6: {width: (width * (2/3) + 2),  padding: 10, fontSize: 16, color: color },
    txt4: {width: width * (1/3),  padding: 10, fontSize: 16, color: color },
    textB6: {position: 'absolute', top: 8, left: 8, color: "rgba(255, 255, 255, 1)", fontSize: 16, 
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    textB4: {position: 'absolute', top: 8, left: 8, color: "rgba(255, 255, 255, 1)", fontSize: 16, width: '80%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    boxBadge: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    boxBadge4: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    boxBadge3: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    iconBadge: { height: 38, resizeMode: 'contain', marginRight: -17},
    textBadge: { textAlign: 'center', marginRight: -15, marginTop: -30, color: color},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    row: {flexDirection: 'row', marginBottom: 1, marginTop: 1,}
})
