import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import ItemList from './ItemList';
import { getListNotifi } from 'config/apis/Notifi';
import { Status, removeItem, popup, getItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen } from 'config/screenNames';
import SimpleToast from 'react-native-simple-toast';
import { actionTypes } from 'actions'
 class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
        refresing:true,
        Thresold:0.1,
        page:1,
        listSystems:[]
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
    if(this.state.refresing ){
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
            data={this.state.listSystems}
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
     getListNotifi({page:this.state.page,type:'system'}).then(res=>{
         console.log(res.data,'aaaa')
         console.log(this.state.page,'page')
         if(res.data.code== Status.SUCCESS){
             this.setState({
                 listSystems:[...this.state.listSystems,...res.data.data]
                })
         } else if(res.data.code == Status.NO_CONTENT){
            //  SimpleToast.show("Không có thông báo")
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
     }).catch(err=>{
         console.log(err.response,'errr')
     })
  }
  componentDidMount =async () => {
    let token =await getItem('token')
    if(!token){
        this.setState({refresing:false,Thresold:0})
        popup('Bạn phải đăng nhập để xử dụng tính năng này',()=>navigation.navigate(HomeScreen),()=>navigation.navigate(SigninScreen))
   } else{
    this.getData()
   } 
    
  };
 
}


const data =[
    {
        id:1,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1
    },
    {
        id:2,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:1
    },
    {
        id:3,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
    {
        id:4,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
    {
        id:5,
        name:'Gói thông tin đấu thầu của bạn sẽ hết hạn vào ngày mùng 5/5/2019',
        time:'hôm nay 20:10',
        status:0
    },
]

export default connect()(System)