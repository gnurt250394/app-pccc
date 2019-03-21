import React from 'react'
import { AsyncStorage, View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Keyboard, TouchableWithoutFeedback, TextInput, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode} from 'config'
import { Header } from 'components'
import {  ListBiddingScreen, InfoProject } from 'config/screenNames'
import images from "assets/images"

class TrackingInfo extends React.Component {
    state = {
        loading: false,
    }
    // set status bar
    async componentDidMount() {
        
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
            <View style={style.flex}>
                 {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                <Header
                    check={1}
                    title="Thông tin theo dõi" onPress={this._goBack}/>
               
                

               <View style={style.content}>
                        <View style={style.row}>
                            <TouchableOpacity style={style.box2} 
                                onPress={this._navTo(InfoProject, {type: 'tracking'})} 
                                >
                                <Image 
                                    style={style.imgStreet}
                                    source={images.trackingDA} />
                                <Text style={style.textB6}>Thông tin dự án</Text> 
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={style.box2} 
                                onPress={this._navTo(ListBiddingScreen, {type: 'tracking'})} 
                                >
                                <View  style={style.box2} >
                                    <Image 
                                        style={style.imgStreet}
                                        source={images.trackingDT} />
                                    <Text style={[style.textB4]}>Thông tin đấu thầu</Text> 
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={style.row}>
                            <TouchableOpacity style={style.box2} 
                                onPress={this._navTo(InfoProject)} 
                                >
                                <Image 
                                    style={style.imgStreet}
                                    source={images.trackingSP} />
                                <Text style={style.textB6}>Sản phẩm</Text> 
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={style.box2} 
                                onPress={this._navTo(ListBiddingScreen)} 
                                >
                                <View  style={style.box2} >
                                    <Image 
                                        style={style.imgStreet}
                                        source={images.trackingNT} />
                                    <Text style={[style.textB4]}>Nhà thầu</Text> 
                                </View>
                            </TouchableOpacity>
                        </View>

                        
                        <View style={[style.row, style.mt0]}>
                            <TouchableOpacity style={style.box3} 
                            // onPress={this._navTo(SearchScreen)} 
                            >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgContaint}
                                        source={images.video} />
                                    <Text style={style.textB4}>Video</Text> 
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3}
                            //  onPress={this._navTo(SearchScreen)}
                            >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgContaint}
                                        source={images.catalog} />
                                    <Text style={style.textB4}>Catalog</Text> 
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.box3} 
                                // onPress={this._navTo(SearchScreen)} 
                                >
                                <View  style={style.box3} >
                                    <Image 
                                        style={style.imgContaint}
                                        source={images.tailieu} />
                                    <Text style={style.textB4}>Tài liệu</Text> 
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
            </View>
        )
    }

    _navTo = (screen, params = {} ) => () => {
        this.props.navigation.navigate(screen, params)
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }


}
export default connect()(TrackingInfo)

const style = StyleSheet.create({
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    w15: { width: 15},
    w20: { width: 20},
    p8: {padding: 8},
    flex: {flex: 1},
    title: {color: "rgba(255, 255, 255, 1)", padding: 10, fontSize: 16,  width: '80%'},
    box2: {
        flex: 1, 
        height: '100%',
        resizeMode: 'stretch',
        marginRight: 2, position: 'relative'},
    imgStreet: {
        width: '100%', 
        alignSelf: 'center',
        resizeMode: 'stretch',
        height: '100%'},
    box3: {
        width: width/3 + 1.5, 
        height: '100%',
        marginRight: 1,  
        position: 'relative'},
    imgContaint: {
        width: '100%', 
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
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
    row: { flex: 1, flexDirection: 'row', width: '100%', marginTop: 1,},
    content: { flexDirection: 'column', justifyContent: 'center', flex: 1},
    mr20p: {marginRight: "15%",},
    w80p: {width: "80%",},
    mr0: {marginRight: 0},
    mt0: {marginTop: 0},
})
