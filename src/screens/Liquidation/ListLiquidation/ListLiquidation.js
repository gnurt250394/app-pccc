import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions,TextInput, TouchableOpacity } from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { getLiquidation } from 'config/apis/myShop';
import { Status, removeItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, DetailLiquidation } from 'config/screenNames';
import { popupCancel } from 'config';
import Item from './Item';
import { Header } from 'components';
import { getListLiquidation } from 'config/apis/liquidation';
import Search from './search';
moment.locale('vn')
export default class ListLiquidation extends Component {

    state = {
        listLiqiudation: [],
        Thresold: 0.1,
        page:1,
        loading:false,
        refressing:true
    }
    goDetail =(item)=> () => {
        console.log(item)
        navigation.navigate(DetailLiquidation,{id:item.id})
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
      return this.state.loading && this.state.listLiqiudation.length >5 ? <ActivityIndicator size={"large"} color={"#2166A2"}/> : null
    }

    _loadMore = () => {
        !this.state.loading ? null:this.setState({loading: true,page: this.state.page + 1},this.getLiquidation)
    }
    _nextPage = () => {
        navigation.navigate()
    }
    _goBack =() => {
        navigation.pop()
    }
    render() {
        return (
            <View style={styles.container}>
            <Header
            check={1}
            onPress={this._goBack}
            title={'Danh sách tin thanh lý'}
            />
            <Search
            onSearch={this._onSearch}
            onClear={this.getData}
            ref={val => this.search = val}
            goBack={this._goBack}
            keyword={this.state.keyword}
            />
            {/* <View style={styles.searchGroup}>
                <Image source={images.search} style={styles.imgSearch}/>
                <TextInput 
                placeholderTextColor={"#2166A2"}
                placeholder="Tìm kiếm"
                style={styles.inputSearch}
                />
            </View> */}
                
                <FlatList
                    data={this.state.listLiqiudation}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={this.state.Thresold}
                />
                <TouchableOpacity style={styles.btnAdd}
                    onPress={this._nextPage}
                >
                    <Image
                        source={images.shopAdd}
                        style={styles.add}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        );
    }
    getLiquidation = () => {
        let params ={
            type:'liquidation',
            page:this.state.page
        }
        getListLiquidation(params).then(res => {
            console.log(res.data,'res')
            if (res.data.code == Status.SUCCESS) {
                this.setState({
                    listLiqiudation: [...this.state.listLiqiudation,...res.data.data],
                })
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({
                    Thresold: 0,
                    loading:false
                })
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                this.setState({Thresold: 0, loading:false})
                navigation.reset(SigninScreen)
                removeItem('token')
            } else if (res.data.code == Status.TOKEN_VALID) {
                this.setState({Thresold: 0, loading:false})
                popupCancel('Bạn phải đăng nhập để xử dụng tính năng này', () => navigation.navigate(SigninScreen))
            }
        }).catch(err => {
            this.setState({Thresold: 0, loading:false})
            console.log(err.response, 'err')
        })
    }
    componentDidMount = () => {
        this.getLiquidation()
    };

}
const data= [
    {
      "id": 9,
      "title": "asdsadsadsad",
      "description": "12sadsadsadsadsad adsf dsf dsjkbfdsa fdslkfbmdsa fdjshbfmnds jhbfds  asdfdasf fadsfds fdas fdsaf  fdlsjhbfn sdfbsdlf ,mdsfhjbsad fjdbsfnds fbsdlf obfldskjn f",
      "category": "Trang phục",
      "city": "Thành phố Hà Nội",
      "time": "59 phút trước"
    },
    {
        "id": 10,
        "title": "asdsadsadsad",
        "description": "12sadsadsadsadsad adsf dsf dsjkbfdsa fdslkfbmdsa fdjshbfmnds jhbfds  asdfdasf fadsfds fdas fdsaf  fdlsjhbfn sdfbsdlf ,mdsfhjbsad fjdbsfnds fbsdlf obfldskjn f",
        "category": "Trang phục",
        "city": "Thành phố Hà Nội",
        "time": "59 phút trước"
      },
      {
        "id": 11,
        "title": "asdsadsadsad",
        "description": "12sadsadsadsadsad adsf dsf dsjkbfdsa fdslkfbmdsa fdjshbfmnds jhbfds  asdfdasf fadsfds fdas fdsaf  fdlsjhbfn sdfbsdlf ,mdsfhjbsad fjdbsfnds fbsdlf obfldskjn f",
        "category": "Trang phục",
        "city": "Thành phố Hà Nội",
        "time": "59 phút trước"
      }

  ]

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