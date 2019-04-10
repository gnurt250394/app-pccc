import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import ItemList from './ItemList';
import { getListNotifi, ReviewNotifi } from 'config/apis/Notifi';
import { Status, removeItem, popup, getItem } from 'config/Controller';
import SimpleToast from 'react-native-simple-toast';
import { actionTypes } from 'actions'
import { SigninScreen, DetailProject, DetailBiddingScreen } from 'config/screenNames';
import navigation from 'navigation/NavigationService';
class Folow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresing: false,
            Thresold: 0.1,
            loading:true,
            page: 1,
            listFolow: []
        };
    }
    _checkNavigate=(item)=>{
        if(item.type == "project"){
            navigation.navigate(DetailProject,{id:item.common_id})
        }else if(item.type == "bidding"){
            navigation.navigate(DetailBiddingScreen,{id:item.common_id})
        }
    }
    _reViewNotifi = (item) => () => {
        ReviewNotifi(item.id).then(res => {
            console.log(res.data, 'hhh')
            console.log(this.state.listFolow, 'l')
            if (res.data.code == Status.SUCCESS) {
                this._checkNavigate(item)
                let list = this.state.listFolow
                list.forEach(e => {
                    if (e.id == item.id) {
                        e.status = 1
                    }
                })
                this.setState({ listFolow: list })

            } else if (res.data.code == Status.ID_NOT_FOUND) {
                SimpleToast.show("Thông báo không tồn tại")
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                removeItem('token')
                navigation.reset(SigninScreen)
                this.props.dispatch({ type: actionTypes.USER_LOGOUT })
            }
        }).catch(err => { console.log(err, 'err') })
    }
    _renderItem = ({ item }) => {
        return (
            <ItemList
                item={item}
                onPress={this._reViewNotifi(item)}
            />
        )
    }
    onEndReached = () => {
        this.state.refresing ? this.setState({ refresing: true, page: this.state.page + 1 }, this.getData) : null

    }
    ListFooterComponent = () => {
       return this.state.refresing && this.state.listFolow.length >6 ? <ActivityIndicator size="large" color="#2166A2"/>: null
    }
    handleRefress=()=>{
        this.setState({loading:true,page:1},this.getData)
    }
    _keyExtractor = (item, index) => {
        return `${item.id || index}`
    }
    _ListEmpty=()=> !this.state.loading && <Text style={styles.notFound}>Không có dữ liệu</Text>
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.listFolow}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    refreshing={this.state.loading}
                    onRefresh={this.handleRefress}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={this.state.Thresold}
                    ListFooterComponent={this.ListFooterComponent}
                    ListEmptyComponent={this._ListEmpty}
                />
            </View>
        );
    }
    getData = () => {
        getListNotifi({ page: this.state.page, type: '' }).then(res => {
            console.log(res.data, 'folow')
            if (res.data.code == Status.SUCCESS) {
                if(this.state.page ==1 ){
                    this.setState({ listFolow: res.data.data,loading:false,refreshing:true,Thresold:0.1 })
                }else{
                    this.setState({ listFolow: [...this.state.listFolow, ...res.data.data],loading:false })
                }
                
            } else if (res.data.code == Status.NO_CONTENT) {
                this.setState({
                    refresing: false,
                    Thresold: 0,
                    loading:false
                })

            } else if (res.data.code == Status.TOKEN_EXPIRED ) {
                navigation.reset(SigninScreen)
                SimpleToast.show('Phiên đăng nhập hết hạn')
                removeItem('token')
                this.props.dispatch({ type: actionTypes.USER_LOGOUT })
            } else {
                SimpleToast.show("Lỗi hệ thống")
                this.setState({
                    refresing: false,
                    Thresold: 0,
                    loading:false
                })
            }
        })
    }
    componentDidMount = async () => {
        let token = await getItem('token')
        !token ? this.setState({ refresing: false, Thresold: 0,loading:false }) : this.getData()
    };

}

const styles= StyleSheet.create({
    notFound: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
      },
      container:{
          flex:1,
          backgroundColor:'#CCCCCC'
      }
})

export default connect()(Folow)