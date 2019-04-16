import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
import Search from 'screens/Liquidation/ListLiquidation/search';
import { searchLiquidation } from 'config/apis/Project';
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
  this.setState({listCategory})
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
            <Text style={styles.txtCheck}>{item.name}</Text>
            <Image source={images.tickerOk}
                    style={styles.ticker}
                    resizeMode="contain"
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
          
          </View>
          <View style={styles.end}/>
      </TouchableOpacity>
  )
  }
    
}
_onSearch = () => {
  let keyword = this.search ? this.search.getValue() : ''
  if (keyword == '') {
      return null
  } else {
      this.setState({ loading: true }, async () => {

          let params = {
              type: this.state.type == typeScreen.Liquidation ? 1 : 0,
              keyword: keyword,
              
              table: 'categories'
          }
          
          let datas = await searchLiquidation(params).then(res => {
              return res.data.code == Status.SUCCESS ? res.data.data : []
          }).catch(err => {
              return err.response
          })
          console.log(datas,'ddaa')
          if (datas.length == 0) {
              this.setState({
                  loading: false,
                  refreshing: false,
                  threshold: 0,
                  listLiqiudation: []
              })
          } else {

              if (this.state.page == 1) {
                  this.setState({ listLiqiudation: datas, loading: true, refreshing: false, threshold: 0.1 })
              } else {
                  this.setState({ datas: [...this.state.listLiqiudation, ...datas], refreshing: false })
              }
          }
      })
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
                finish={1}
                onFinish={this._selectList}
            />
            <Search
             onSearch={this._onSearch}
             checkFilter={1}
             onClear={this.getLiquidation}
             ref={val => this.search = val}
             filter={this.filter}
             goBack={this._goBack}
             keyword={this.state.keyword}
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
      marginRight:10
  },
  txtCheck:{
    color:'#2166A2',
    marginLeft:15
  },
    containerListChecked:{
        flex:1,
        height:50,
        justifyContent: 'center',
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
        justifyContent:'space-between',
        alignItems:'center'
    },
    end:{
        height:0.5,
        backgroundColor: '#333333',
        width,
    }
})