import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity } from 'react-native';
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
      page:0
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
        />
      </View>
    );
  }
  getData=()=>{
    getNewProject({page:this.state.page}).then(res=>{
      if(res.data.code == Status.SUCCESS){
        this.setState({
          listProject:res.data.data
        })
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
export default connect()(InfoProject)