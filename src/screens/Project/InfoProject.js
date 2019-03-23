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
            onEndReached={this.onEndReached}
            onEndReachedThreshold={this.state.Threshold}
            ListFooterComponent={this.ListFooterComponent}
        />
      </View>
    );
  }
  getData = async () => {
        let listProject = await getNewProject({page: this.state.page}).then(res=>{
            return res.data.code == Status.SUCCESS ? res.data.data : []
        }).catch(err=> {
            console.log('err: ', err);
            return []
        })

      this.setState({listProject, refresing: false})
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