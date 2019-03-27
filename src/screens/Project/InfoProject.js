import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import images from "assets/images"
import { DetailProject, SigninScreen } from 'config/screenNames';
import { getNewProject, searchProject } from 'config/apis/Project';
import Toast from 'react-native-simple-toast';
import { Status, color } from 'config/Controller';
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
      refresing:true,
      keyword:''
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
  onChangeText = key => val => {
    this.setState({[key]: val})
}
_onSearch=()=>{
  searchProject(this.state.keyword,this.state.page).then(res=>{
    console.log(res.data,'ddd')
    if(res.data.code == Status.SUCCESS){
      console.log(res.data,'ddd')
      this.setState({listProject:res.data.data})
    }
  })
}
_onClose=()=>{
  this.setState({keyword:''})
  searchProject('',this.state.page).then(res=>{
    console.log(res.data,'ddd')
    if(res.data.code == Status.SUCCESS){
      console.log(res.data,'ddd')
      
      this.setState({listProject:res.data.data})
    }
  })
}
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.head}>
                   
                   <TouchableOpacity style={styles.imgBack}  onPress={this._goBack}  >
                        <Image 
                           style={styles.iconBack}
                           source={images.backLight} />
                   </TouchableOpacity>
                   <View 
                       style={styles.boxSearch}>
                      
                       <TouchableOpacity style={styles.p8}  onPress={this._onSearch}  >
                           <Image 
                               style={styles.imgSearch}
                               source={images.iconSearch} />
                       </TouchableOpacity>
                       <TextInput 

                           style={styles.txtSearch}
                           value={this.state.keyword}
                           returnKeyLabel="Tìm"
                           onSubmitEditing={this._onSearch}
                           onChangeText={this.onChangeText('keyword')}
                           placeholderTextColor="rgba(255, 255, 255, 0.6)"
                           placeholder="Tìm kiếm" />
                        <TouchableOpacity style={styles.p8}  onPress={this._onClose}  >
                           <Image 
                               style={[styles.imgSearch,{tintColor:'#FFFFFF'}]}
                               source={images.closeBlue} />
                       </TouchableOpacity>
                   </View >
               </View>
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
          console.log(res.data,'aaaa')
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
    txtSearch:{
      flex:1,
      color:'#FFFFFF'
    },
    imgSearch:{
      height:15,
      width:15
    },
    imgBack:{
      paddingLeft:10
    },
    p8:{
      padding:8,
      alignItems:'center',
      justifyContent:'center',
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
    },
    iconBack: {
      height: 18,
      width:18, 
      resizeMode: 'contain', 
      paddingLeft: 10,
  },
  head: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, paddingTop: 10, paddingBottom: 10,},
  boxSearch: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, borderRadius: 8, backgroundColor: "rgba(0, 0, 0, 0.15)", height: 40, marginLeft: 10, marginRight: 10,},
})
export default connect()(InfoProject)