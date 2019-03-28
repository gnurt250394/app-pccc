import React from 'react'
import {View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, TextInput, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, youtube, popupOk, popupCancel, Follow, defaultStyle} from 'config'
import images from "assets/images"
import { listDocuments, addFolow, searchDocuments } from 'config/apis/Project'
import YouTube, { YouTubeStandaloneAndroid} from 'react-native-youtube'
import { getItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames'
import { BaseSearch } from 'components'

class Video extends React.Component {
    state = {
        loading: true,
        keyword: '',
        datas: [],
        page: 1,
        threshold: 0.1,
        refreshing: false
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
                <BaseSearch 
                    onSearch={this._onSearch}
                    ref={val => this.search = val}
                    goBack={this._goBack}
                    keyword={this.state.keyword} />
               

                {
                    this.state.datas.length == 0 
                        ?
                    !this.state.loading && <Text style={style.notFound}>Không có dữ liệu</Text>
                        :
                    <FlatList
                        data={this.state.datas}
                        keyExtractor={(item, index) => index.toString()} 
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadmore}
                        onEndReachedThreshold={this.state.threshold}
                        ListFooterComponent={this.ListFooterComponent} 
                        renderItem={this.renderItem}/>
                }
            </View>
        )
    }
    handleRefresh = () => {
        this.setState( { refreshing: true, page:  1 }  , this.getData)
    }

    handleLoadmore = () => {
        this.state.loading ? this.setState( { loading: true, page: this.state.page + 1 } , this.getData) : null
    }

    ListFooterComponent = () => {
        return  this.state.loading ? <ActivityIndicator size={"large"} color="#2166A2" /> : null
    }

    getData = async () => {
        let datas = await listDocuments('video', this.state.page).then(res => {
            return res.data.code == StatusCode.Success ? res.data.data : []
        }).catch(err => {
            console.log('err: ', err);
            return []
        })
        console.log(datas);
        if(datas.length == 0){
            this.setState({ loading: false, refreshing: false, threshold: 0 })
        }else{
            if(this.state.page == 1){
                this.setState({ datas, loading: true, refreshing: false  })
            }else{
                this.setState({ datas: [...this.state.datas, ...datas], loading: true, refreshing: false})
            }
        }
        
    }

    renderItem = ({item, index}) => {
        let count = this.state.datas.length
        return <View style={index == count -1 ? [style.box, style.btw0] : style.box}>
                <TouchableOpacity onPress={this.playvideo(item.link)} style={style.posR} >
                    <Image style={style.image} source={{uri: youtube.thumbnail(item.link)}}/>
                    <Image style={style.iconPlay} source={images.playVideo}/>
                </TouchableOpacity>
                <Text style={style.name}>{item.name}</Text>
                <View style={style.row}>
                    <Text style={style.time}>{item.date && item.date != "" ? `Ngày đăng: ${item.date}`: ""}</Text>
                    {item.follow == Follow.unfollow && <TouchableOpacity
                        onPress={this.onFollow(item.id, index)}
                        style={style.btn}>
                        <Text style={style.textBtn}>Theo dõi video</Text>
                    </TouchableOpacity>}
                    {item.follow == Follow.follow && <TouchableOpacity
                        onPress={this.onUnFollow(item.id, index)}
                        style={style.btn}>
                        <Text style={style.textBtn}>Bỏ theo dõi</Text>
                    </TouchableOpacity>}
                </View>
            </View>
    }

    onFollow = (document_id, index) => () => {
        if(!this.token){
            popupCancel('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
        }else{
            addFolow({document_id, table: Follow.table_document}).then(res => {
                switch (res.data.code) {
                    case Status.TOKEN_EXPIRED:
                        popupCancel('Phiên đăng nhập đã hết hạn', () => this.props.navigation.navigate(SigninScreen))
                        break;
                    case Status.SUCCESS:
                        popupOk('Theo dõi thành công.')
                        this.changeButtonFollow(index, Follow.follow)
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

    changeButtonFollow = (index, status) => {
        let datas = [...this.state.datas]
        datas[index].follow = status
        this.setState({datas})
    }

    onUnFollow = (document_id, index) => () => {
        if(!this.token){
            popupCancel('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
        }else{
            UnFolowUser({document_id, table: Follow.table_document}).then(res => {
                switch (res.data.code) {
                    case Status.TOKEN_EXPIRED:
                        popupCancel('Phiên đăng nhập đã hết hạn', () => this.props.navigation.navigate(SigninScreen))
                        break;
                    case Status.SUCCESS:
                        popupOk('Bỏ theo dõi thành công.')
                        this.changeButtonFollow(index, Follow.unfollow)
                        break;
                
                    default:
                        popupOk('Bỏ theo dõi thất bại.')
                        break;
                }
            }).catch(err => {
                console.log('err: ', err);
                popupOk('Bỏ theo dõi thất bại.')
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

    _onSearch = () => {
        this.setState({loading: true, refreshing: true}, async () => {
            let keyword = this.search ? this.search.getValue() : ''
            let datas = await searchDocuments('video', keyword).then(res =>{
                // console.log('res: ', res);
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
            this.setState({loading: false, datas,refreshing: false})
        })
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

