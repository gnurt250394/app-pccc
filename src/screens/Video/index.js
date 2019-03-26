import React from 'react'
import {View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, youtube, popupOk, Follow, defaultStyle} from 'config'
import images from "assets/images"
import { listDocuments, addFolow } from 'config/apis/Project'
import YouTube, { YouTubeStandaloneAndroid} from 'react-native-youtube'
import { getItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames'

class Video extends React.Component {
    state = {
        loading: true,
        keyword: '',
        datas: [],
        page: 1,
        threshold: 0.1,
        refresing: true
    }
    // set status bar
    async componentDidMount() {
        await this.getData()
        this.token = await getItem('token')

        this._navListener = this.props.navigation.addListener('didFocus', async () => {
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
               
               <View style={style.head}>
                   
                    <TouchableOpacity style={style.p8} 
                            onPress={this._goBack} 
                        >
                         <Image 
                            style={style.iconBack}
                            source={images.backLight} />
                    </TouchableOpacity>
                    <View 
                        style={style.boxSearch}>
                       
                        <TouchableOpacity style={style.p8} 
                            // onPress={this._navTo()} 
                            >
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

                <ScrollView>

                    {
                        this.state.datas.length == 0 
                            ?
                        !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                            :
                        <FlatList
                            data={this.state.datas}
                            keyExtractor={(item, index) => index.toString()} 
                            // onEndReached={this.onEndReached}
                            // onEndReachedThreshold={this.state.threshold}
                            // ListFooterComponent={this.ListFooterComponent} 
                            renderItem={this.renderItem}/>
                    }
                </ScrollView>
            </View>
        )
    }

    onEndReached = () => {
        console.log(123);
        this.state.refresing ? this.setState( { refresing: true, page: this.state.page + 1 } , this.getData) : null
    }

    getData = async () => {
        let datas = await listDocuments('video').then(res => {
            return res.data.code == StatusCode.Success ? res.data.data : []
        }).catch(err => {
            console.log('err: ', err);
            return []
        })
        this.setState({ datas, loading: false, refresing: false })
    }

    ListFooterComponent = () => {
        return  this.state.refresing ? <ActivityIndicator size={"large"} color="#2166A2" /> : null
    }
    

    renderItem = ({item, index}) => {
        let count = this.state.datas.length
        return <View style={index == count -1 ? [style.box, style.btw0] : style.box}>
                <TouchableOpacity onPress={this.playvideo(item.link_id)} style={style.posR} >
                    <Image style={style.image} source={{uri: youtube.thumbnail(item.link_id)}}/>
                    <Image style={style.iconPlay} source={images.playVideo}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
                <View style={style.row}>
                    <Text style={style.time}>{item.date && item.date != "" ? `Ngày đăng: ${item.date}`: ""}</Text>
                    {item.follow == Follow.unfollow && <TouchableOpacity
                        onPress={this.onFollow(item.id)}
                        style={style.btn}>
                        <Text style={style.textBtn}>Theo dõi video</Text>
                    </TouchableOpacity>}
                </View>
            </View>
    }

    onFollow = document_id => () => {
        if(!this.token){
            popupOk('Bạn phải đăng nhập để sử dụng tính năng này.')
        }else{
            addFolow({document_id, table: Follow.table_document}).then(res => {
                switch (res.data.code) {
                    case Status.TOKEN_EXPIRED:
                        popupOk('Phiên đăng nhập đã hết hạn', () => this.props.navigation.navigate(SigninScreen))
                        break;
                    case Status.SUCCESS:
                        popupOk('Theo dõi thành công.')
                        break;
                
                    default:
                        popupOk('Theo dõi thất bại.')
                        break;
                }
            }).catch(err => {
                console.log('err: ', err);
                popupOk('Theo dõi thất bại.')
            })
        }
    }

    playvideo = id => () => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: youtube.apiKey,     // Your YouTube Developer API Key
            videoId: id,     // YouTube video ID
            autoplay: true,             // Autoplay the video
            fullscreen: true,
            startTime: 120,             // Starting point of video (in seconds)
          })
            .then(() => console.log('Standalone Player Exited'))
            .catch(errorMessage => console.error(errorMessage))
    }

    onReady = e => {
        console.log('e: ', e);
        this.setState({ isReady: true })
    }

    onChangeState = e => {
        console.log('e: ', e);
        this.setState({ status: e.state })
    }

    onChangeQuality = e => {
        console.log('e: ', e);
        this.setState({ quality: e.quality })
    }

    onError = e => {
        console.log('e: ', e);
        this.setState({ error: e.error })
    }

    _onSearch = () => {

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


}
export default connect()(Video)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    w15: { width: 15},
    p8: {padding: 8},
    flex: {flex: 1},
    cancel: {color: 'white', padding: 10},
    iconPlay: {position: 'absolute', top: 48, left: '46%', width: 60, resizeMode: 'contain'},
    posR: {position: 'relative'},
    iconBack: {
        height: 18,
        width:18, 
        resizeMode: 'contain', 
        paddingLeft: 10,
    },
    box: {
        width: '100%',
        padding: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 8,
        paddingBottom: 10,
    },
    btw0: {
        borderBottomWidth: 0,
    },
    image: {
        width: '100%',
        height: 160
        // resizeMode:'stretch'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        color: '#333333'
    },
    btn: {
        width: 150,
        padding: defaultStyle.padding,
        backgroundColor: color,
        alignItems: 'center',
        borderRadius: 5
    },
    textBtn: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    time: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})

