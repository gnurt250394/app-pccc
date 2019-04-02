import React, { Component } from 'react';
import { View, Text,FlatList ,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import ItemList from './ItemList';
import { getListNotifi, ReviewNotifi } from 'config/apis/Notifi';
import { Status, removeItem, popup, getItem } from 'config/Controller';
import SimpleToast from 'react-native-simple-toast';
import { actionTypes } from 'actions'
import { SigninScreen } from 'config/screenNames';
import navigation from 'navigation/NavigationService';
class Folow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        refresing:true,
        Thresold:0.1,
        page:1,
        listFolow:[]
    };
  }
_reViewNotifi=(item)=>()=>{
    ReviewNotifi(item.id).then(res=>{
        console.log(res.data,'hhh')
        console.log(this.state.listFolow,'l')
        if(res.data.code == Status.SUCCESS){
            let list = this.state.listFolow
            list.forEach(e=>{
                if(e.id == item.id){
                    e.status = 1
                }
            })
            this.setState({listFolow:list})
            
        }else if(res.data.code == Status.DELETE_ID_NOT_FOUND){
            SimpleToast.show("Thông báo không tồn tại")
        } else if(res.data.code == Status.TOKEN_EXPIRED){
            removeItem('token')
        navigation.reset(SigninScreen)
        this.props.dispatch({type: actionTypes.USER_LOGOUT})
        }
    }).catch(err=>{console.log(err,'err')})
}
  _renderItem=({item})=>{
    return(
        <ItemList
            item={item}
            onPress={this._reViewNotifi(item)}
        />
    )
}
onEndReached=()=>{
    if(this.state.refresing){
        this.setState((prev)=>{
            return{
                refresing:true,
                page:prev.page +1
            }
        },this.getData)
    } else{
        return null
    }
    
}
ListFooterComponent=()=>{
    if(this.state.refresing){
        return <ActivityIndicator
            size="large"
            color="#2166A2"
        />
    } else{
        return null
    }
}
_keyExtractor=(item,index)=>{
    return `${item.id|| index}`
}
render() {
  return (
    <View>
     <FlatList
         data={this.state.listFolow}
         renderItem={this._renderItem}
         extraData={this.state}
         keyExtractor={this._keyExtractor}
         onEndReached={this.onEndReached}
         onEndReachedThreshold={this.state.Thresold}
         ListFooterComponent={this.ListFooterComponent}
     />
    </View>
  );
  }
  getData=()=>{
    getListNotifi({page:this.state.page,type:''}).then(res=>{
        console.log(res.data,'folow')
        if(res.data.code== Status.SUCCESS){
            this.setState({listFolow:[...this.state.listFolow,...res.data.data]})
        } else if(res.data.code == Status.NO_CONTENT){
            this.setState({
                refresing:false,
                Thresold:0
            })
            
        } else if(res.data.code== Status.TOKEN_EXPIRED || res.data.code == Status.TOKEN_VALID){
            navigation.reset(SigninScreen)
            SimpleToast.show('Phiên đăng nhập hết hạn')
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
        }else{
            SimpleToast.show("Lỗi hệ thống")
        }
    })
  }
  componentDidMount = async() => {
    let token =await getItem('token')
    !token? this.setState({refresing:false,Thresold:0}) :  this.getData()
  };
  
}



export default connect()(Folow)