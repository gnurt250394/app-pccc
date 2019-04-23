import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { getLiquidation } from 'config/apis/myShop';
import { Status, removeItem, getItem, popup, typeScreen } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, DetailLiquidation, Liquidation } from 'config/screenNames';
import { popupCancel } from 'config';
import Item from './Item';
import { Header } from 'components';
import { getListLiquidation } from 'config/apis/liquidation';
import Search from './search';
import { searchLiquidation } from 'config/apis/Project';
import { Messages } from 'config/Status';
moment.locale('vn')
export default class ListLiquidation extends Component {

    state = {
        listLiqiudation: [],
        Thresold: 0.1,
        page: 1,
        loading: false,
        refreshing: true,
        keyword: '',
        type: this.props.navigation.getParam('type', typeScreen.postPurchase)
    }
    goDetail = (item) => () => {

        navigation.navigate(DetailLiquidation, { id: item.id, type: this.state.type })
    }
    _renderItem = ({ item, index }) => {
        return (
            <Item
                onPress={this.goDetail(item)}
                item={item}
            />


        )
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _renderFooter = () => {
        return this.state.loading && this.state.listLiqiudation.length > 5 ? <ActivityIndicator size={"large"} color={"#2166A2"} /> : null
    }

    _loadMore = () => {
        !this.state.loading ? null : this.setState({ loading: true, page: this.state.page + 1 }, this.getLiquidation)
    }
    _nextPage = async () => {
        let token = await getItem('token')
        if(token){
            this.setState({page:1})
            navigation.navigate(Liquidation, { refress: this.getLiquidation, type: this.state.type }) 
        }else{
            popup(Messages.LOGIN_REQUIRE, null, () => navigation.navigate(SigninScreen))
        }
           
    }
    _goBack = () => {
        navigation.pop()
    }
    _onSearch = () => {
        let keyword = this.search ? this.search.getValue() : ''
        if (keyword == '') {
            return null
        } else {
            this.setState({ refreshing: true,loading:true ,page:1}, async () => {

                let params = {
                    type: this.state.type == typeScreen.Liquidation ? 1 : 0,
                    keyword: keyword,
                    table: 'news_products',
                    // 'data[]':'category',
                    // 'data[]':'city',
                    // 'data[]':'title',
                    // 'data[]':'description',
                    // 'data[]':'time',
                    // 'data[]':'id'
                }
                
                let datas = await searchLiquidation(params).then(res => {
                    return res.data.code == Status.SUCCESS ? res.data.data : []
                }).catch(err => {
                    return err.response
                })
                
                if (datas.length == 0) {
                    this.setState({
                        loading: false,
                        refreshing: false,
                        threshold: 0,
                        listLiqiudation: []
                    })
                } else {

                    if (this.state.page == 1) {
                        this.setState({ listLiqiudation: datas, loading: true, refreshing: false, threshold: 0.1 })
                    } else {
                        this.setState({ datas: [...this.state.listLiqiudation, ...datas], refreshing: false })
                    }
                }
            })
        }

    }
    filterStart=()=>{
        this.setState({refreshing:true})
    }
    filter = (value) => {
        
        this.setState({ listLiqiudation: value ,refreshing:false})
    }
    _listEmpty = () => !this.state.refreshing && <Text style={styles.notFound}>Không có dữ liệu</Text>

    handleRefress = () => this.setState({ refreshing: true, page: 1 },()=>{ this.getLiquidation(), this.search.resetFilter()})
    render() {
        const { type } = this.state
        return (
            <View style={styles.container}>
                <Header
                    check={1}
                    onPress={this._goBack}
                    finish={2}
                    onFinish={this._nextPage}
                    title={type == typeScreen.Liquidation ? 'Danh sách tin thanh lý' : 'Danh sách đăng mua'}
                />
                <Search
                    onSearch={this._onSearch}
                    onClear={this.refressData}
                    ref={val => this.search = val}
                    filter={this.filter}
                    filterStart={this.filterStart}
                    type={this.state.type}
                    goBack={this._goBack}
                    keyword={this.state.keyword}
                />


                <FlatList
                    data={this.state.listLiqiudation}
                    renderItem={this._renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefress}
                    ListEmptyComponent={this._listEmpty}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={this.state.Thresold}
                />
            </View>
        );
    }
    getData = (page) => {
        let params ={
            type: this.state.type,
            page:page
        }
        getListLiquidation(params).then(res => {
            
            if (res.data.code == Status.SUCCESS) {
                if (page == 1) {
                    this.setState({
                        listLiqiudation: res.data.data,
                        Thresold: 0.1,
                        loading: true,
                        refreshing: false
                    })
                } else {
                    this.setState({
                        listLiqiudation: [...this.state.listLiqiudation, ...res.data.data],
                        Thresold: 0.1,
                        loading: true,
                        refreshing: false
                    })
                }
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({
                    Thresold: 0,
                    loading: false,
                    refreshing: false
                })
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                this.setState({ Thresold: 0, loading: false, refreshing: false })
                navigation.reset(SigninScreen)
                removeItem('token')
            } else if (res.data.code == Status.TOKEN_VALID) {
                this.setState({ Thresold: 0, loading: false, refreshing: false })
                popupCancel(Messages.LOGIN_REQUIRE, () => navigation.navigate(SigninScreen))
            }
        }).catch(err => {
            
            this.setState({ Thresold: 0, loading: false, refreshing: false })

        })
    }
    refressData = () => {
        this.setState({refreshing:true})
       let page = 1
        this.getData(page)
    }
    getLiquidation = async () => {
        
       
        this.getData(this.state.page)
    }
    componentDidMount = () => {
        this.getLiquidation()
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#F1F1F1'
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    imgSearch: {
        height: 15,
        width: 15,
        marginHorizontal: 10
    },
    inputSearch: {
        flex: 1
    },
    searchGroup: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        borderRadius: 5,
        height: 40,
        margin: 10,
        alignItems: 'center',
        borderColor: '#8FBEDF',
        borderWidth: 0.7
    },
    add: {
        width: 25,
        tintColor: '#FFFFFF'
    },
    btnAdd: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#2166A2',
        position: 'absolute',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        // shadowRadius:25,
        bottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        right: '5%'
    },
    end: {
        height: 1,
        backgroundColor: 'gray',
        width: '100%'
    },
    image: {
        height: '80%',
        width: '80%',

    },
    Image: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1
    },
    dots: {
        height: 25,
        width: 25,
        position: 'absolute',
        right: 5,
        top: 8,
    },
    imgDots: {
        height: 13,
        width: 13,
        alignSelf: 'flex-end',
    },
    containerList: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
    },
    txtPrice: {
        color: '#2166A2',
        marginTop: 5,
    },
    txtName: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    rowList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgLocation: {
        height: 12,
        width: 12,
        marginTop: 4,
        marginHorizontal: 7,
    },
    containerText: {
        paddingLeft: 10,
        flexWrap: 'wrap',
        flexShrink: 6
    }
})