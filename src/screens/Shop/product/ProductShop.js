import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import images from "assets/images"
import { getProduct } from 'config/apis/myShop';
import { Status, removeItem, formatNumber, showPopup } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen, BuyProduct, ShopScreen } from 'config/screenNames';
import { height } from 'config';
import { popupCancel } from 'config';
import { Messages } from 'config/Status';
import { popupOk } from 'config';
import ItemProduct from './ItemProduct';


export default class ProductShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListProduct: data,
            loadMore: false,
            page: 0,
            Threshold: 0.1,
            dropZoneValues: null,
        };
    }
    getDetail = () => {
        getProduct(this.state.page).then(res => {
            
            if (res.data.code == Status.SUCCESS) {
                this.setState({
                    ListProduct: [res.data.data, { add: true }],
                })
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({
                    ListProduct: [{ add: true }],
                })
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                navigation.reset(SigninScreen)
                removeItem('token')
            } else if (res.data.code == Status.TOKEN_VALID) {
                popupCancel(Messages.LOGIN_REQUIRE, () => navigation.navigate(SigninScreen))
            }
        }).catch(err => {
            
        })
    }
    hideMenu = () => {
        let data = this.state.ListProduct
        data.forEach(item => item.isShow = false)
        this.setState({ ListProduct: data })
    }
    showMenu = (index) => () => {
        let data = [...this.state.ListProduct]
        data[index].isShow = true
        this.setState({ ListProduct: data })
    }




    _keyExtractor = (item, index) => {
        return `${item.product_id || index}`
    }
    
    render() {
        return (
            <View style={styles.container}
                onStartShouldSetResponderCapture={this.hideMenu}
                onLayout={(event)=>{
                    const ProductShop = new ItemProduct()
                    ProductShop.setDropZoneValues(event)
                    
                }}
            >
                <View style={{
                    height: 100,
                    width: '100%',
                    backgroundColor: 'green',
                    position: 'absolute',
                    zIndex: 1,
                    top: 0,
                }}
               
                >

                </View>
                <FlatList
                    style={{ marginTop: 100, zIndex: 2 }}
                    data={this.state.ListProduct}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    extraData={this.state}
                    renderItem={(this._renderItem)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
    _renderItem = ({ item, index }) => {
        return (
            <ItemProduct
                item={item}
                ListProduct={this.state.ListProduct}
                ref={ ref => this.FlatList = ref}
                showMenu={this.showMenu(index)}
            />
        )



    }
    componentDidMount = () => {
        
        // this.handleChil = this.FlatList.setDropZoneValues()
        this._didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
                
            }
        );
        // this.getDetail()
    };
    componentWillUnmount() {
        this._didFocus().remove()
    }
}

const data = [
   
    {
        id: 1,
        full_path: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name: 'Bình chữa cháy ',
        price: '100000',
        time: 'conf lại 30 ngày',
        status: 1
    },
    {
        id: 2,
        full_path: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name: 'Bình chữa cháy ',
        price: '100000',
        time: 'conf lại 30 ngày',
        status: 1
    },
    {
        id: 3,
        full_path: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name: 'Bình chữa cháy ',
        price: '100000',
        time: 'conf lại 30 ngày',
        status: 0
    },
    {
        id: 24,
        full_path: 'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name: 'Bình chữa cháy ',
        price: '100000',
        time: 'conf lại 30 ngày',
        status: 1,
        add: true
    },

]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
    },
    containerMenu: {
        position: 'absolute',
        right: 10,
        elevation: 2,
        padding: 4,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        // zIndex:1,
        top: 8,
        flex: 1,
    },
    btnMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 6
    },
    txtMenu: {
        color: '#333333'
    },
    imgEdit: {
        height: 12,
        width: 12,
        marginLeft: 4
    },
    imgMenu: {
        height: 14,
        width: 14,
        marginRight: 5,
        tintColor: '#333333'
    },
    image: {
        height: 100,
        // width:100,
    },
    imageAdd: {
        height: 50,
        width: 50,
    },
    dots: {
        height: 25,
        width: 25,
        position: 'absolute',
        right: 5,
        top: 8,
    },
    imgDots: {
        height: 15,
        width: 15,
        alignSelf: 'flex-end',
    },
    containerList: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth: '30%',
        padding: 10,
        margin: 5,
        elevation: 1,
        flex: 1,
    },
    containerAdd: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth: '30%',
        paddingVertical: 50,
        // paddingHorizontal:3,
        flex: 1,
        margin: 5,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtPrice: {
        color: '#2166A2',
        marginTop: 13,
        fontSize: 12,
    },
    txtAdd: {
        color: '#2166A2',
        marginTop: 13,
        fontSize: 12,
    },

    txtName: {
        marginTop: 5,
        fontSize: 12
    },
    time: {
        fontSize: 12,

    }
})