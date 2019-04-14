import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import ItemList from './ItemList';
import { getListNotifi, ReviewNotifi } from 'config/apis/Notifi';
import { Status, removeItem, popup, getItem, typeScreen } from 'config/Controller';
import SimpleToast from 'react-native-simple-toast';
import { SigninScreen, DetailProject, DetailBiddingScreen, DetailContractor } from 'config/screenNames';
import navigation from 'navigation/NavigationService';
import { logoutAction, countNotificationAction } from 'reduxs/actions/actionCreator';
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
        if(item.type == typeScreen.project){
            navigation.navigate(DetailProject,{id:item.common_id})
        }else if(item.type == typeScreen.bidding){
            navigation.navigate(DetailBiddingScreen,{id:item.common_id})
        }else if(item.type == typeScreen.user){
            navigation.navigate(DetailContractor,{id:item.common_id})
        }
    }
    _reViewNotifi = (item,index) => () => {
        ReviewNotifi(item.id).then(res => {
            
            
            if (res.data.code == Status.SUCCESS) {
                this._checkNavigate(item)
                let listFolow = [...this.state.listFolow]
                listFolow[index].status = 1
                // let listChange = listFolow.filter(item=>item.status == 0)
                
                //     this.props.countNotifi(listChange.length)
                this.setState({ listFolow })

            } else if (res.data.code == Status.ID_NOT_FOUND) {
                SimpleToast.show("Thông báo không tồn tại")
            } else if (res.data.code == Status.TOKEN_EXPIRED) {
                removeItem('token')
                navigation.reset(SigninScreen)
                this.props.logout()
            }
        }).catch(err => { })
    }
    _renderItem = ({ item ,index}) => {
        return (
            <ItemList
                item={item}
                onPress={this._reViewNotifi(item,index)}
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
                this.props.logout()
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
        this._willFocus = this.props.navigation.addListener('willFocus', () => {
            this.getData()
        }
        )
    };
    componentWillUnmount() {
        this._willFocus.remove()
    }
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
const mapStateToProps = ()=>{
    return{

    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
      logout:()=>dispatch(logoutAction()),
      countNotifi:(count)=>dispatch(countNotificationAction(count))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Folow)