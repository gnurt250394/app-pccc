import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import images from "assets/images"
import { BaseSearch } from 'components'
import { SearchScreen, ShopScreen, ListBiddingScreen, InfoProject, TrackingInfoScreen, VideoScreen, SigninScreen, CatalogScreen, Liquidation, ListLiquidation, ListPostPurchase } from 'config/screenNames'
import { color, toUpperCase, width, popupOk } from 'config'
import { getItem } from 'config/Controller';
import { popupCancel } from 'config';
// import navigation from 'navigation/NavigationService';


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
        if(this._navListener) this._navListener.remove();
    }

    render(){
        return (
            <TouchableWithoutFeedback style= {style.flex} onPress={this._dismiss}>
                <View style= {style.flex}>
                    <BaseSearch 
                        onSearch={this._onSearch}
                        ref={val => this.search = val}
                        keyword={this.state.keyword} />

                    <View style={style.top}>
                        <TouchableOpacity style={[style.btnTop, style.mr20p]} 
                            onPress={this._navTo(TrackingInfoScreen)} >
                            <Image 
                                    style={style.iconTop}
                                source={images.tttd} />
                                <Text style={style.textTop}>Thông tin theo dõi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.btnTop]} 
                            onPress={
                                // this._navTo(ShopScreen)
                                () => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')
                            } 
                            >
                            <Image 
                                style={style.iconTop}
                                source={images.myShop} />
                                <Text style={style.textTop}>Shop của tôi</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={style.category}>{toUpperCase('Danh mục chức năng')}</Text>

                    <View style={style.bot}>
                        <View style={style.row}>
                            <TouchableOpacity style={style.box6} 
                                onPress={this._navTo(InfoProject)} 
                                >
                                <Image 
                                    style={style.imgbox6}
                                    source={images.ttda} />
                                <Text style={style.textB6}>Thông tin dự án</Text> 
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={style.box4} 
                                onPress={this._navTo(ListBiddingScreen)} 
                                >
                                {/* <Image 
                                    style={style.imgbox4}
                                    source={images.thongtindauthau} />
                                <Text style={style.textB4}>Thông tin đấu thầu</Text>  */}
                                <View  style={style.box4} >
                                    <Image 
                                        style={style.imgbox4}
                                        source={images.thongtindauthau}
                                    />
                                    <Text style={[style.textB4]}>Thông tin đấu thầu</Text> 
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={style.row}>
                            <TouchableOpacity 
                                // onPress={this._navTo(SearchScreen)} 
                                onPress={() => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')} 
                                >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.product} />
                                    <Text style={[style.textB4, style.w80p]}>Sản phẩm</Text> 
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this._navTo(ListLiquidation)} 
                                // onPress={() => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')}
                                >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.thanhly} />
                                    <Text style={style.textB4}>Thanh lý hàng hóa</Text> 
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this._navTo(ListPostPurchase)}
                                // onPress={() => popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')}
                                >
                                <View  style={[style.box3, style.mr0]} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.dangmua} />
                                    <Text style={[style.textB4, style.w80p]}>Đăng mua</Text> 
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.row, style.mt0]}>
                            <TouchableOpacity style={style.box3} 
                                onPress={this._navTo(VideoScreen)} >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.video} />
                                    <Text style={style.textB4}>Video</Text> 
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3}
                                onPress={this._navTo(CatalogScreen, {type: 'catalog'})} >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.catalog} />
                                    <Text style={style.textB4}>Catalog</Text> 
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3} 
                                onPress={this._navTo(CatalogScreen, {type: 'document'})} >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgbox3}
                                        source={images.tailieu} />
                                    <Text style={style.textB4}>Tài liệu</Text> 
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        console.log('keyword: 1', keyword);
        if(keyword.trim() != "") this.props.navigation.navigate(SearchScreen, {keyword: keyword})
    }

    onChangeText = key => val => {
        this.setState({[key]: val})
    }

    _navTo = (screen, params = {} ) => async() => {
        let listcheckLogin = [TrackingInfoScreen, ShopScreen]

        if(!listcheckLogin.includes(screen)){
            this.props.navigation.navigate(screen, params)
        }else{
            let token = await getItem('token')
            if(token) this.props.navigation.navigate(screen, params)
            else popupCancel('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
        }
        
        
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
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 16,  width: '80%'},
    box6: {
        width: (width * (2/3) + 4), 
        height: '100%',
        resizeMode: 'stretch',
        marginRight: 2, position: 'relative'},
    imgbox6: {
        width: '100%', 
        alignSelf: 'center',
        resizeMode: 'stretch',
        height: '100%'},
    box4: {
        width: width * (1/3), 
        height: '100%', 
        position: 'relative'},
    imgbox4: {
        width: '100%',
        alignSelf: 'center',
        // resizeMode: 'stretch',
        height: '100%'},
    box3: {
        width: width/3 + 1.5, 
        height: '100%',
        marginRight: 1,  
        position: 'relative'},
    imgbox3: {
        width: '100%', 
        alignSelf: 'center',
        resizeMode: 'stretch',
        height: '100%'},
    badge: {backgroundColor: '#FCCF31', position: 'absolute',top: 6, right: 6, borderRadius: 50, minWidth: 30},
    badgeImage: {height: 35, resizeMode: 'contain',},
    notify: { color: color, fontSize: 12, padding: 5, textAlign: 'center'},
    txt6: {width: (width * (2/3) + 2),  padding: 10, fontSize: 16, color: color },
    txt4: {width: width * (1/3),  padding: 10, fontSize: 16, color: color },
    textB6: {position: 'absolute', top: 8, left: 8, color: "rgba(255, 255, 255, 1)", fontSize: 14, 
        // textShadowColor: "gray",
        // textShadowOffset: {
        //     width: -1,
        //     height: 1,
        // },
        // textShadowRadius: 2,
        // elevation: 2,
    },
    textB4: {position: 'absolute', top: 8, left: 8, color: "rgba(255, 255, 255, 1)", fontSize: 14, width: '60%',
        // textShadowColor: "gray",
        // textShadowOffset: {
        //     width: -1,
        //     height: 1,
        // },
        // textShadowRadius: 2,
        // elevation: 2,
    },
    boxBadge: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    boxBadge4: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    boxBadge3: {position: 'absolute',top: 0, right: 0,alignItems: 'center', justifyContent: 'flex-end'},
    iconBadge: { height: 38, resizeMode: 'contain', marginRight: -17},
    textBadge: { textAlign: 'center', marginRight: -15, marginTop: -30, color: color},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    row: { flex: 1, flexDirection: 'row', width: '100%', marginTop: 1,},
    category: { fontWeight: '500', fontSize: 14, padding: 10, color},
    top: { 
        backgroundColor: color, 
        justifyContent: 'center', flexDirection: 'row', 
        borderTopColor: '#fff', borderTopWidth: 0.5, 
        paddingTop: 8, paddingBottom: 10,
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
    },
    bot: { flexDirection: 'column', justifyContent: 'center', flex: 1},
    iconTop: { height: width < 400 ? 55 : 70, resizeMode: 'contain'},
    btnTop: { flexDirection: 'column', alignItems: 'center'},
    mr20p: {marginRight: "15%",},
    w80p: {width: "80%",},
    textTop: {color: 'white', paddingTop: 8, fontSize: 14,
        // textShadowColor: "gray",
        // textShadowOffset: {
        //     width: -1,
        //     height: 1,
        // },
        // textShadowRadius: 2,
        // elevation: 2,
    },
    mr0: {marginRight: 0},
    mt0: {marginTop: 0},
})
