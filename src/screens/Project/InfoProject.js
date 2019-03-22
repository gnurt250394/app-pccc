import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import images from "assets/images"
import { DetailProject, SigninScreen } from 'config/screenNames';
import { getNewProject } from 'config/apis/Project';
import Toast from 'react-native-simple-toast';
import { Status } from 'config/Controller';
import ListItem from './ListItemInfoProject';
import { connect } from 'react-redux'
const {width,height}= Dimensions.get('window')
 class InfoProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProject:[],
      page:0,
      Threshold:0.1,
      refresing:false
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
        onPress={this._nextPage(DetailProject,{id:item.id,name:item.name})}
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
            onEndReached={this.onEndReached}
            onEndReachedThreshold={this.state.Threshold}
            ListFooterComponent={this.ListFooterComponent}
        />
      </View>
    );
  }
  getData=()=>{
    getNewProject({page:this.state.page}).then(res=>{
      if(res.data.code == Status.SUCCESS){
        this.setState({
          listProject:[...this.state.listProject,...res.data.data]
        })
      } else if(res.data.code == Status.TOKEN_EXPIRED|| res.data.code == Status.TOKEN_VALID){
        Toast.show('Phiên đăng nhập hết hạn')
        navigation.reset(SigninScreen)
        removeItem('token')
        this.props.dispatch({type: actionTypes.USER_LOGOUT})
      } else if(res.data.code == Status.NO_CONTENT){
        this.setState({ refresing :false, Threshold:0})
      } else{
        this.setState({refresing:false,Threshold:0})
      }
      }).catch(err=>{
        console.log(err.response,'errr')
        this.setState({refresing:false,Threshold:0})
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
export default connect()(InfoProject)