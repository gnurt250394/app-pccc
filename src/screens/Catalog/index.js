import React from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {  color, width, StatusCode, popupOk, MIME, Follow} from 'config'
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
        datas: []
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
            this.setState({ datas, loading: false })
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
                <Header
                    check={1}
                    title={ this.state.type == 'catalog' ? "Catalog" : 'Tài liệu'} onPress={this._goBack}/>
               
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
                <Image 
                    style={style.image}
                    source={this.state.type == 'catalog' ? images.pdf : images.document} />
                
                <View style={style.right}>
                    <Text style={style.name}>{item.name}</Text>
                    <Text style={style.description}>{item.description}</Text>
                    <View style={style.row}>

                        <TouchableOpacity onPress={this.onDownload(item.link_id)}>
                            <Text style={style.download}>tải xuống</Text>
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
        let ext = link ? /[^\.]*$/.exec(link)[0] : 'txt'
        
        RNFetchBlob.config({
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
            popupOk('Tải xuống thành công.')
        })
        .catch((errorMessage, statusCode) => {
            console.log('statusCode: ', statusCode);
            console.log('errorMessage: ', errorMessage);
            popupOk('Có lỗi xảy ra trong quá trình tải xuống, vui lòng thử lại sau.')
            
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
        paddingBottom: 5
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
    description: {
        fontSize: 12,
        paddingBottom: 8
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
    }
})

