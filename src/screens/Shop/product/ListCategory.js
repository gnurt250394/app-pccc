import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
const {width} = Dimensions.get('window')
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory:[],
      
    };
  }
  _goBack=()=>{
    navigation.pop()
}
_selectList=()=>{
  console.log(this.state.listFinish,'item')
  let listFinal = this.state.listCategory.filter(item => item.checked == true)
  let listIdFinish=[],
  listName=[]
  listFinal.forEach(item=>{
    listIdFinish.push(item.id)
    listName.push(item.name)
  })
  
  if(this.props.navigation.state && this.props.navigation.state.params.fun){
   
    this.props.navigation.state.params.fun(listName.join(','),listIdFinish)
    navigation.pop()
  }
  
}
reduce =(a,b)=> a+b
_checked =(index)=>()=>{
  let listCategory = [...this.state.listCategory]
  listCategory[index].checked = false
  this.setState({listCategory,listIdFinish})
}
_unChecked =(index)=>()=>{
  let listCategory = [...this.state.listCategory]
  
  listCategory[index].checked = true
  this.setState({listCategory})
}
_renderItem=({item,index})=>{
  if(item.checked){
    return(
        <TouchableOpacity 
        onPress={this._checked(index)}
        style={styles.containerListChecked}>
        <View style={styles.containerBtn}>
            <Text style={{marginLeft:15}}>{item.name}</Text>
            <Image source={images.icon_ticker}
                    style={styles.ticker}
            />
            </View>
            <View style={styles.end}/>
        </TouchableOpacity>
    )
  }else{
    return(
      <TouchableOpacity 
      onPress={this._unChecked(index)}
      style={styles.containerListUnChecked}>
      <View style={styles.containerBtn}>
          <Text style={{marginLeft:15}}>{item.name}</Text>
          {/* <Image source={images.icon_ticker}
                  style={styles.ticker}
          /> */}
          </View>
          <View style={styles.end}/>
      </TouchableOpacity>
  )
  }
    
}
_keyExtractor=(item,index)=>{
    return `${item.id || index}`
}
  render() {
    return (
      <View style={styles.container}>
      <Header
                title="Chọn danh mục sản phẩm"
                check={1}
                onPress={this._goBack}
                finish={true}
                onFinish={this._selectList}
            />
      <FlatList
          data={this.state.listCategory}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
      />
      </View>
    );
  }

  getData = () => {
    getOtherData({ table: 'categories' }).then(res => {

          this.setState({
                listCategory: res.data.data
          })
    }).catch(err => {

    })
}
componentDidMount = () => {
    this.getData()
};
  
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ticker:{
      height:14,
      width:14,
  },
    containerListChecked:{
        flex:1,
        height:50,
        justifyContent: 'center',
        backgroundColor:'#2166A2'
    },
    containerListUnChecked:{
      flex:1,
      height:50,
      justifyContent: 'center',
      backgroundColor:'#FFFFFF'
  },
    containerBtn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    end:{
        height:0.5,
        backgroundColor: '#333333',
        width,
        marginTop: 13,
    }
})