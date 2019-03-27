import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import images from "assets/images"
import {  SigninScreen, DetailContractor } from 'config/screenNames';
import { getNewProject, listUserFollows } from 'config/apis/Project';
import Toast from 'react-native-simple-toast';
import { Status, removeItem } from 'config/Controller';
import { connect } from 'react-redux'
import ListItem from './ListItem';
import { actionTypes } from 'actions';
const {width,height}= Dimensions.get('window')

 class FolowContractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProject:[],
      page:1,
      Threshold:0.1,
      refresing:true
    };
  }

/**
 * check thêm phần chuyển từ màn tracking qua => param type: tracking
 */

_nextPage=(router,params)=>()=>{
    navigation.navigate(router,params)
}
  _renderItem=({item})=>{
    return(
      <ListItem
        onPress={this._nextPage(DetailContractor,{id:item.id})}
        item={item}
      />
    )
  }
  onEndReached=()=>{
    if(this.state.refresing){
      this.setState((prev)=>{
        return{
          refresing:true,
          page: prev.page +1
        }
      },this.getData)
    } else{
      return null
    }
  }
  ListFooterComponent=()=>{
    if(this.state.refresing){
      return <ActivityIndicator
                size={"large"}
                color="#2166A2"
              />
    } else{
      return null
    }
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  _goBack=()=>{
    navigation.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
            check={1}
            onPress={this._goBack}
            title={"Thông tin dự án"}
        />
        <FlatList
            data={this.state.listProject}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            // onEndReached={this.onEndReached}
            // onEndReachedThreshold={this.state.Threshold}
            // ListFooterComponent={this.ListFooterComponent}
        />
      </View>
    );
  }
  getData = async () => {
        listUserFollows().then(res=>{
          console.log(res.data,'aaaa')
          if(res.data.code== Status.SUCCESS){
            this.setState({ listProject:res.data.data})
          } else if(res.data.code == Status.DELETE_ID_NOT_FOUND){
            this.setState({refresing:false})
          } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
            Toast.show('Phiên đăng nhập hết hạn')
            navigation.reset(SigninScreen)
            removeItem('token')
            this.props.dispatch({type: actionTypes.USER_LOGOUT})
          }
        })

      
  }
  componentDidMount = () => {
    this.getData()
  };
  
}

const styles= StyleSheet.create({
    containerList:{
        flex:1,
        padding: 10,
    },
    container:{
        flex:1,
    },
    image:{
        height:8,
        width:8,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    txtHeader:{
        fontWeight:'600',
        fontSize:15,
    },
    row:{
        flexDirection:'row',
        marginBottom:5
    },Header:{
        marginBottom:15
    },
    end:{
        height:8,
        backgroundColor: '#CCCCCC',
        width
    }
})
export default connect()(FolowContractor)