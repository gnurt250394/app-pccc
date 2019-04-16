import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
import images from "assets/images"
const {width} = Dimensions.get('window')
export default class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory:[],
      
    };
  }
  _goBack=()=>{
    navigation.pop()
}
_selectList=(item)=>()=>{
  
  
  if(this.props.navigation.state && this.props.navigation.state.params.fun){
   console.log(item,'itemC')
    this.props.navigation.state.params.fun(item)
    navigation.pop()
  }
  
}

_renderItem=({item,index})=>{
 
    return(
      <TouchableOpacity 
      onPress={this._selectList(item)}
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
                // finish={1}
                // onFinish={this._selectList}
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
        alignItems:'center',
        justifyContent:'space-between'
    },
    end:{
        height:0.5,
        backgroundColor: '#333333',
        width,
    }
})