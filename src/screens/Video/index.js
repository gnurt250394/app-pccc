import React from 'react'
import {View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, youtubeApiKey, popupOk, Follow} from 'config'
import images from "assets/images"
import { listDocuments, FolowProject } from 'config/apis/Project'
import YouTube, { YouTubeStandaloneAndroid} from 'react-native-youtube'
import { getItem } from 'config/Controller';
import { SigninScreen } from 'config/screenNames'

class Video extends React.Component {
    state = {
        loading: true,
        keyword: '',
        datas: [],
        isReady: false,
        status: null,
        quality: null,
        error: null,
    }
    // set status bar
    async componentDidMount() {
        this.token = await getItem('token')

        this._navListener = this.props.navigation.addListener('didFocus', async () => {
            StatusBar.setBarStyle('light-content');
             StatusBar.setBackgroundColor(color);

            let datas = await listDocuments('video').then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
            this.setState({ datas, loading: false })
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
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()} />
                    }
                </ScrollView>
            </View>
        )
    }

    renderItem = ({item, index}) => {
        return <View style={style.box}>

                {/* <YouTube
                    apiKey={youtubeApiKey}
                    videoId={item.link_id}  // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={true}       // control whether the video should play in fullscreen or inline
                    loop={true}             // control whether the video should loop when ended
                    onReady={this.onReady}
                    onChangeState={this.onChangeState}
                    onChangeQuality={this.onChangeQuality}
                    onError={this.onError}
                    style={style.youtube} /> */}
                
                <TouchableOpacity onPress={this.playvideo(item.link_id)} >
                    <Image style={style.image} source={images.videoImage}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
                <View style={style.row}>
                    <Text style={style.time}>Ngày đăng: {item.date}</Text>
                    {item.follow == Follow.unfollow && <TouchableOpacity
                        onPress={this.onFollow}
                        style={style.btn}>
                        <Text style={style.textBtn}>Theo dõi video</Text>
                    </TouchableOpacity>}
                </View>
            </View>
    }

    onFollow = (id) => {
        if(!this.token){
            popupOk('Bạn phải đăng nhập để sử dụng tính năng này.', this.props.navigation.navigate(SigninScreen))
        }else{
            FolowProject({
                table: Follow.table_project,
                project_id: id
            }).then(res => {
                console.log('res: ', res);
                
            }).catch(err => {
                console.log('err: ', err);

            })
            popupOk('Tính năng đang phát triển. Vui lòng quay lại sau.')
        }
    }

    playvideo = id => () => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: youtubeApiKey,     // Your YouTube Developer API Key
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
    image: {
        width: '100%',
        height: 250
        // resizeMode:'stretch'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10
    },
    btn: {
        width: 150,
        padding: 10,
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
        alignItems: 'flex-end'
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    }
})

