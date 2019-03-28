import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, FlatList, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, popupOk, MIME, Follow, popupCancel, ellipsisCheckShowMore} from 'config'
import { BaseSearch } from 'components'
import images from "assets/images"
import { listDocuments, addFolow, searchDocuments, UnFolowUser  } from 'config/apis/Project'
import { getItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames'
import RNFetchBlob from 'react-native-fetch-blob'

class Catalog extends React.Component {
    state = {
        loading: true,
        refreshing: false,
        keyword: '',
        maxDesc: 48,
        type: this.props.navigation.getParam('type') || 'catalog',
        datas: [],
        backup: [],
        page: 1,
        threshold: 0.1,
        
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

    /**
     * param type: document | catalog
     */

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
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()} 
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadmore}
                        onEndReachedThreshold={this.state.threshold}
                        ListFooterComponent={this.ListFooterComponent}  />
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

    renderItem = ({item, index}) => {
        
        let count = this.state.datas.length
        return <View style={index == count -1 ? [style.box, style.btw0] : style.box}>
        
                { this.showImage(item.link) }
                
                <View style={style.right}>
                    <Text style={style.name}>{item.name}</Text>
                    { this.showDescription(item, index) }
                    <View style={style.row}>

                        <TouchableOpacity onPress={this.onDownload(item.link)}>
                            <Text style={style.download}>Tải xuống</Text>
                        </TouchableOpacity>
                        {item.follow == Follow.unfollow && <TouchableOpacity
                            onPress={this.onFollow(item.id, index)}
                            style={style.btn}>
                            <Text style={style.textBtn}>Theo dõi</Text>
                        </TouchableOpacity>}
                        {item.follow == Follow.follow && <TouchableOpacity
                            onPress={this.onUnFollow(item.id, index)}
                            style={style.btn}>
                            <Text style={style.textBtn}>Bỏ theo dõi</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
    }

    _showMore = index => () => {
        let datas = [...this.state.datas]
        let backup = [...this.state.backup]
        datas[index].description = backup[index].description
        datas[index].showMore = backup[index].showMore
        datas[index].showLess = true
        this.setState({datas})
    }

    _showLess = index => () => {
        let datas = [...this.state.datas]
        let description = ellipsisCheckShowMore(datas[index].description, this.state.maxDesc)
        datas[index].description = description.value
        datas[index].showMore = description.showMore
        datas[index].showLess = false
        this.setState({datas})
    }

    showDescription = (item, index) => {
        if(!item.showMore){
            return (
                <View>
                    <Text style={style.description}>{item.description}</Text>
                    {item.showLess && <TouchableOpacity onPress={this._showLess(index)} style={[style.p8, style.flexEnd, style.pr10]}>
                        <Image source={images.lessThan} style={style.iconMore} />
                    </TouchableOpacity>}
                </View>
            )
        }else{
            
            return (
                <View style={style.boxDesc}>
                    <Text style={style.description}>{item.description}</Text>
                    <TouchableOpacity onPress={this._showMore(index)} style={[style.p8, style.pr10]}>
                        <Image source={images.moreThan} style={style.iconMore} />
                    </TouchableOpacity>
                    
                </View>
            )
        }
        
    }

    showImage = link => {
        let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
        let source, uri;
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'png':
                source = {uri: link}
                uri= true
                break;

            case 'doc':
            case 'docx':
                source = images.document
                break;
            case 'pdf':
                source = images.pdf
                break;
            case 'csv':
            case 'xlsx':
            case 'xlsm':
            case 'xlsb':
            case 'xltx':
            case 'xltm':
            case 'xls':
            case 'xml':
            case 'xlt':
            case 'xla':
            case 'xlw':
            case 'xlr':
                source = images.excel
                break;
        
            default:
                source = this.state.type == 'catalog' ? images.pdf : images.document
                break;
        }
        return <Image  
                    style={[style.image, uri ? style.uri : {}]}
                    source={source} />
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

    onDownload = link  => () => {
        let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
        let filename = /[^\/]*$/.exec(link)[0]
        let dirs = RNFetchBlob.fs.dirs
        filePath = `${dirs.DownloadDir}/${filename}`

        RNFetchBlob.config({
            path: filePath,
            addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                mime : MIME[ext],
                description : 'Tải file thành công bởi Siêu thị vật liệu xây dựng.'
            }
        })
        .fetch('GET', link)
        .then((res) => {
            res.path()
            popupOk('Tải xuống hoàn tất.')
        })
        .catch((errorMessage, statusCode) => {
            console.log('statusCode: ', statusCode);
            console.log('errorMessage: ', errorMessage);
            popupOk('Tải xuống hoàn tất.')
        })
    }

    _onSearch = () => {
        this.setState({loading: true}, async () => {
            let keyword = this.search ? this.search.getValue() : ''
            
            let datas = await searchDocuments(this.state.type, keyword).then(res =>{
                // console.log('res:',this.state.type, res);
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
           this.formatData(datas)
        })
    }

    formatData = datas => {
        if(datas.length == 0){
            this.setState({
                loading: false,
                refreshing: false,
                threshold: 0
            })
        }else{
            let backup = [...datas]
        
            datas = datas.map(e => {
                let description = ellipsisCheckShowMore(e.description, this.state.maxDesc)
                return {...e, description: description.value, showMore: description.showMore, showLess: false}
            })
            if(this.state.page == 1){
                this.setState({ datas, backup, loading: true, refreshing: false  })
            }else{
                this.setState({ datas: [...this.state.datas, ...datas], backup: [...this.state.backup, ...backup], loading: true, refreshing: false})
            }
        }
        
    }

    getData = async () => {
        let datas = await listDocuments(this.state.type, this.state.page).then(res => {
            return res.data.code == StatusCode.Success ? res.data.data : []
        }).catch(err => {
            console.log('err: ', err);
            return []
        })
        this.formatData(datas)
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

    onSignin = () => {
        this.props.navigation.navigate(SigninScreen)
    }


}
export default connect()(Catalog)

const style = StyleSheet.create({
    heading: {justifyContent: 'space-between', padding: 10, alignContent:'center'},
    boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
    head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
    txtSearch: {color: "rgba(255, 255, 255, 0.6)"},
    w15: { width: 15},
    p8: {padding: 8},
    pr10: {paddingRight: 10},
    flex: {flex: 1},
    cancel: {color: 'white', padding: 10},
    box: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 5,
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 60,
        resizeMode: 'stretch',
    },
    uri: {
        borderWidth: 1,
        borderColor: '#C3E5FE',
        resizeMode: 'cover',
        borderRadius: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingBottom: 5,
        color: '#333333'
    },
    btn: {
        padding: 8,
        borderWidth: 1,
        borderColor: color,
        alignItems: 'center',
        borderRadius: 8
    },
    btw0: {
        borderBottomWidth: 0,
    },
    textBtn: {
        color,
        fontSize: 12,
        textAlign: 'center'
    },
    time: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    right: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'center'
    },
    boxDesc: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
        fontSize: 12,
        paddingBottom: 8,
        paddingRight: 8,
        flex: 1,
        color: '#333333'
    },
    iconMore: {
        width: 12,
        resizeMode: 'contain'
    },
    flexEnd: {
        alignSelf: 'flex-end',
    },
    showMore: {
        fontSize: 12,
        paddingBottom: 8,
        color,
        borderWidth: 1
    },
    download: {
        fontSize: 12,
        color
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    iconBack: {
        height: 18,
        width:18, 
        resizeMode: 'contain', 
        paddingLeft: 10,
    },
})

