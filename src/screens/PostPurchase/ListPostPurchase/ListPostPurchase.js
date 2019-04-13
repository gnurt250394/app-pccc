import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions,ScrollView, ActivityIndicator } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { Status, removeItem, getItem, popup } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, DetailLiquidation, Liquidation, PostPurchase, DetailPostPurchase } from 'config/screenNames';
import { popupCancel } from 'config';
import { Header } from 'components';
import { getListLiquidation } from 'config/apis/liquidation';
import Search from './search';
import { searchLiquidation } from 'config/apis/Project';
import Item from './Item';
import { Messages } from 'config/Status';
moment.locale('vn')
export default class ListPostPurchase extends Component {

    state = {
        listPostPurchase: [],
        Thresold: 0.1,
        page:1,
        loading:false,
        refreshing:true,
        keyword:''
    }
    goDetail =(item)=> () => {
        
        navigation.navigate(DetailPostPurchase,{id:item.id})
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
      return this.state.loading && this.state.listPostPurchase.length >5 ? <ActivityIndicator size={"large"} color={"#2166A2"}/> : null
    }

    _loadMore = () => {
        !this.state.loading ? null:this.setState({loading: true,page: this.state.page + 1},this.getLiquidation)
    }
    _nextPage = async() => {
        let token = await getItem('token')
        token  ? navigation.navigate(PostPurchase,{refress:this.getLiquidation}) : popup('Bạn phải đăng nhập để sử dụng tính năng này.', null, () => navigation.navigate(SigninScreen))
    }
    _goBack =() => {
        navigation.pop()
    }
    _onSearch = () => {
        this.setState({ loading: true }, async () => {
            let keyword = this.search ? this.search.getValue() : ''
            let params = {
                type: 0,
                keyword: keyword,
                page: this.state.page,
                table:'buy'
            }
            let datas = await searchLiquidation( params).then(res => {
                return res.data.code == Status.SUCCESS ? res.data.data : []
            }).catch(err => {
                return []
            })
            console.log(datas,'dddd')
            if (datas.length == 0) {
                this.setState({
                    loading: false,
                    refreshing: false,
                    threshold: 0,
                    listPostPurchase:[]
                })
            } else {
    
                if (this.state.page == 1) {
                    this.setState({ listPostPurchase:datas, loading: true, refreshing: false, threshold: 0.1 })
                } else {
                    this.setState({ datas: [...this.state.listPostPurchase, ...datas],  refreshing: false })
                }
            }
        })
    }
    filter=(value)=>{
        console.log(value,'value')
        this.setState({listPostPurchase:value})
    }
    _listEmpty =()=>  !this.state.refreshing && <Text style={styles.notFound}>Không có dữ liệu</Text>
    handleRefress = ()=> this.setState({refreshing:true,page :1},this.getLiquidation)
    render() {
        return (
            <View style={styles.container}>
            <Header
            check={1}
            onPress={this._goBack}
            finish={2}
            onFinish={this._nextPage}
            title={'Danh sách đăng mua'}
            />
            <Search
            onSearch={this._onSearch}
            onClear={this.getLiquidation}
            ref={val => this.search = val}
            filter={this.filter}
            goBack={this._goBack}
            keyword={this.state.keyword}
            />
           
                
                <FlatList
                    data={this.state.listPostPurchase}
                    renderItem={this._renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefress}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={this.state.Thresold}
                />
            </View>
        );
    }
    getLiquidation = async () => {
        console.log('11111')
        let params ={
            type:'buy',
            page:this.state.page
        }
        getListLiquidation(params).then(res => {
            console.log(res.data,'aaa')
            if (res.data.code == Status.SUCCESS) {
                if(this.state.page == 1){
                    this.setState({
                        listPostPurchase: res.data.data,
                        Thresold:0.1,
                        loading:true,
                        refreshing:false
                    })
                }else{
                    this.setState({
                        listPostPurchase: [...this.state.listPostPurchase,...res.data.data],
                        // Thresold:0.1,
                        // loading:true,
                        refreshing:false
                    })
                }
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({
                    Thresold: 0,
                    loading:false,
                    refreshing:false
                })
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                this.setState({Thresold: 0, loading:false,refreshing:false})
                navigation.reset(SigninScreen)
                removeItem('token')
            } else if (res.data.code == Status.TOKEN_VALID) {
                this.setState({Thresold: 0, loading:false,refreshing:false})
                popupCancel(Messages.LOGIN_REQUIRE, () => navigation.navigate(SigninScreen))
            }
        }).catch(err => {
            this.setState({Thresold: 0, loading:false,refreshing:false})
            
        })
    }
    componentDidMount = () => {
        this.getLiquidation()
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor:'#CCCCCC'
    },
    imgSearch:{
        height:15,
        width:15,
        marginHorizontal:10
    },
    inputSearch:{
        flex:1
    },
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    searchGroup:{
        flexDirection: 'row',
        backgroundColor:'#FFFFFF',
        justifyContent: 'space-between',
        borderRadius:5,
        height:40,
        margin:10,
        alignItems:'center',
        borderColor:'#8FBEDF',
        borderWidth:0.7
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
        elevation:5,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
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