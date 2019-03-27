import React, { Component } from 'react';
import { View, Text,FlatList ,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import ItemList from './ItemList';
import { getListNotifi } from 'config/apis/Notifi';
import { Status, removeItem, popup, getItem } from 'config/Controller';
import SimpleToast from 'react-native-simple-toast';
import { actionTypes } from 'actions'
import { SigninScreen } from 'config/screenNames';
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

  _renderItem=({item})=>{
    return(
        <ItemList
            item={item}
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
const data =[
    {
        id:1,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1,
        image:'https://ttol.vietnamnetjsc.vn/images/2018/05/25/13/40/net-cuoi-be-gai-5-1527053440031984418330.jpg'
    },
    {
        id:2,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1,
        image:'http://vuanhiepanh.com/files/news/thumb/hinh-hoa.jpg'
    },
    {
        id:3,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0,
        image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    },
    {
        id:4,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0,
        image:'https://ttol.vietnamnetjsc.vn/images/2018/05/25/13/40/net-cuoi-be-gai-9-1527053440039156820618.jpg'
    },
    {
        id:5,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0,
        image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    },
]


export default connect()(Folow)