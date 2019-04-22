import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler, TouchableWithoutFeedback } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { Status, removeItem, getItem, popup, typeScreen } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, DetailLiquidation, Liquidation, ShopLiquidation, EditLiquidation } from 'config/screenNames';
import { popupCancel } from 'config';
import Item from './Item';
import { Header } from 'components';
import { NavigationEvents } from 'react-navigation';
import { getListLiquidation, deleteLiquidation } from 'config/apis/liquidation';
import { Messages } from 'config/Status';
moment.locale('vn')
export default class LiquidationShop extends Component {

    state = {
        listLiqiudation: [],
        Thresold: 0.1,
        page: 1,
        loading: false,
        refreshing: true,
        keyword: '',
        type: this.props.navigation.state.key == ShopLiquidation ? typeScreen.Liquidation : typeScreen.postPurchase
    }
    goDetail = (item) => () => {
        this._hideMenu()
        navigation.navigate(DetailLiquidation, { id: item.id, type: this.state.type })
    }
    _hideMenu = () => {
        let listLiqiudation = this.state.listLiqiudation
        listLiqiudation.forEach(item => item.isShow = false)
        this.setState({ listLiqiudation })


    }
    showMenu = (item) => () => {

        let listLiqiudation = this.state.listLiqiudation
        listLiqiudation.forEach(e => {
            if (e.id == item.id) {
                e.isShow = true
            } else {
                e.isShow = false
            }
        })

        this.setState({ listLiqiudation })
    }
    _deleteItem = (item) => () => {
        let data = this.state.listLiqiudation
        let listFinal = []
        data.forEach(e => {
            if (e.id == item.id) {
                listFinal = data.filter(e => e.id != item.id)
            }
        })
        this.setState({ listLiqiudation: listFinal })
        deleteLiquidation(item.id).then(res => {

        }).catch(err => {

        })
    }
    _editLiquidation = (item) => () => {
        this.setState({ page: 1 })
        this._hideMenu()
        navigation.navigate(EditLiquidation, { id: item.id, type: this.state.type, item: item, refress: this.getLiquidation })
    }
    _renderItem = ({ item, index }) => {
        return (
            <Item
                // onStartShouldSetResponderCapture={this._hideMenu}
                onPress={this.goDetail(item)}
                edit={this._editLiquidation(item)}
                item={item}
                delete={this._deleteItem(item)}
                index={index}
                onShowMenu={this.showMenu(item)}
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
        !this.state.loading ? null : this.setState({ page: this.state.page + 1 }, this.getData)
    }
    // _nextPage = () => {
    //     this.setState({ page: 1 })
    //     navigation.navigate(Liquidation, { refress: this.getLiquidation, type: this.state.type })
    // }
    _goBack = () => {
        navigation.pop()
    }

    _listEmpty = () => !this.state.refreshing && <Text style={styles.notFound}>Không có dữ liệu</Text>

    handleRefress = () => this.setState({ refreshing: true, page: 1 }, this.getData)
    onDidFocus = () => {
        this.props.navigation.setParams('type', this.props.navigation.state.key)
    }
    render() {
        const { type } = this.state
        return (
            <TouchableWithoutFeedback style={styles.container}
                onPress={this._hideMenu}
            >
                <View style={styles.container}
                >
                    <NavigationEvents
                        //   onDidFocus={this.onDidFocus}
                        onDidBlur={this._hideMenu}
                    />
                    <FlatList
                        data={this.state.listLiqiudation}
                        renderItem={this._renderItem}
                        extraData={this.state}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefress}
                        ListEmptyComponent={this._listEmpty}
                        keyExtractor={this._keyExtractor}
                        ListFooterComponent={this._renderFooter}
                        onEndReached={this._loadMore}
                        onEndReachedThreshold={this.state.Thresold}
                    />
                    {/* <TouchableOpacity style={styles.btnAdd}
                        onPress={this._nextPage}
                    >
                        <Image
                            source={images.shopAdd}
                            style={styles.add}
                            resizeMode="contain"
                        />
                    </TouchableOpacity> */}
                </View>
            </TouchableWithoutFeedback>
        );
    }
    getData = async () => {
        let params = {
            type: this.state.type,
            page: this.state.page
        }

        let token = await getItem('token')
        let data = await getListLiquidation(params, token).then(res => {

            switch (res.data.code) {
                case Status.SUCCESS: return res.data.data
                case Status.NO_CONTENT: return []
                case Status.TOKEN_EXPIRED: {
                    this.setState({ Thresold: 0, loading: false, refreshing: false })
                    navigation.reset(SigninScreen)
                    removeItem('token')
                    return
                }
                default: return []
            }
        }).catch(err => {
            this.setState({ Thresold: 0, loading: false, refreshing: false })
            return []
        })
        this.formatData(data)
    }
    formatData = (data) => {
        if (data.length == 0) {
            this.setState({ Thresold: 0, loading: false, refreshing: false, page: 1 })
        } else {
            if (this.state.page == 1) {
                this.setState({
                    listLiqiudation: data,
                    loading: true,
                    refreshing: false
                })
            } else {
                this.setState({
                    listLiqiudation: [...this.state.listLiqiudation, ...data],
                    loading: true,
                    refreshing: false
                })
            }
        }
    }
    // refressData = () => {
    //     let params = {
    //         type: this.state.type,
    //         page: 1
    //     }
    //     this.getData(params)
    // }
    // getLiquidation = async (page = 1) => {
    //     if (this.state.page == 1) { this.setState({ refreshing: true }) }
    //     let params = {
    //         type: this.state.type,
    //         page: page
    //     }
    //     
    //     this.getData(params)
    // }

    getDataFromParent =async()=>{
        let params = {
            type: this.state.type,
            page: this.state.page
        }
        if (this.state.type == typeScreen.Liquidation) {
            this.props.screenProps.next(typeScreen.Liquidation)
            let data = await this.props.screenProps.getList(params)
            this.formatData(data)
        } else {
            this.props.screenProps.next(typeScreen.postPurchase)
            let data = await this.props.screenProps.getList(params)
            this.formatData(data)
        }

    }
    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.pop(); // works best when the goBack is async
            return true;
        });
        this._willFocus = this.props.navigation.addListener('willFocus', async () => {
            // this.getData()
            this.getDataFromParent()
        }
        )
    };
    componentWillUnmount() {
        this.backHandler.remove();
        this._willFocus.remove()

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#CCCCCC'
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