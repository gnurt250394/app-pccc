import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, FlatList, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, popupOk, MIME, Follow, ellipsis, ellipsisCheckShowMore} from 'config'
import { Header } from 'components'
import images from "assets/images"
import { listDocuments, addFolow } from 'config/apis/Project'
import { getItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames'
import RNFetchBlob from 'react-native-fetch-blob'


class Catalog extends React.Component {
    state = {
        loading: true,
        keyword: '',
        type: this.props.navigation.getParam('type') || 'catalog',
        datas: [],
        backup: []
    }
    // set status bar
    async componentDidMount() {
        this.token = await getItem('token')
        this._navListener = this.props.navigation.addListener('didFocus', async () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor(color);
            let datas = await listDocuments(this.state.type).then(res => {
                return res.data.code == StatusCode.Success ? res.data.data : []
            }).catch(err => {
                console.log('err: ', err);
                return []
            })
            let backup = [...datas]
            
            let newData = []
            backup.forEach(e => {
                let description = ellipsisCheckShowMore(e.description, 50)
                newData.push({...e, description: description.value, showMore: description.showMore})
            })
            this.setState({ datas: newData, backup, loading: false })
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
                 {   this.state.loading ? 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View> : null
                }
                {/* <Header
                    check={1}
                    title={ this.state.type == 'catalog' ? "Catalog" : 'Tài liệu'} onPress={this._goBack}/> */}
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
        item.link_id = item.link_id.replace('uploads/documents/', 'uploads/document/') // server return  path failed
        
        return <View style={style.box}>
        
                { this.showImage(item.link_id) }
                
                <View style={style.right}>
                    <Text style={style.name}>{item.name}</Text>
                    { this.showDescription(item, index) }
                    <View style={style.row}>

                        <TouchableOpacity onPress={this.onDownload(item.link_id)}>
                            <Text style={style.download}>Tải xuống</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onFollow(item.id)}
                            style={style.btn}>
                            <Text style={style.textBtn}>Theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    }

    _showMore = index => () => {
        let datas = [...this.state.datas]
        let backup = [...this.state.backup]
        datas[index].description = backup[index].description
        datas[index].showMore = backup[index].showMore
        this.setState({datas})
    }

   

    showDescription = (item, index) => {
        if(!item.showMore){
            return <Text style={style.description}>{item.description}</Text>
        }else{
            
            return (
                <View style={style.boxDesc}>
                    <Text style={style.description}>{item.description}</Text>
                    <TouchableOpacity onPress={this._showMore(index)} style={style.p8}>
                        <Image source={images.moreThan} style={style.iconMore} />
                    </TouchableOpacity>
                    
                </View>
            )
        }
        
    }

    showImage = link => {
        let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
        let source;
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'png':
                source = {uri: link}
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
            style={style.image}
            source={source} />
    }



    onFollow = document_id => () => {
        if(!this.token){
            popupOk('Bạn phải đăng nhập để sử dụng tính năng này.', () => this.props.navigation.navigate(SigninScreen))
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

    onDownload = link  => () => {
        link = link.replace('uploads/documents/', 'uploads/document/')
        
        let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
        let filename = /[^\/]*$/.exec(link)[0]
        console.log( ext, MIME[ext], filename, link);
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
        borderRadius: 5
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

