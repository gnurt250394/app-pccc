import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import { getOtherData } from 'config/apis/myShop';
const {width} = Dimensions.get('window')
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategory:[]
    };
  }
  _goBack=()=>{
    navigation.pop()
}
_selectList=(item)=>()=>{
  if(this.props.navigation.state && this.props.navigation.state.params.fun){
    console.log(item,'item')
    this.props.navigation.state.params.fun(item.name)
    navigation.pop()
  }
  
}
_renderItem=({item})=>{
    return(
        <TouchableOpacity 
        onPress={this._selectList(item)}
        style={styles.containerList}>
            <Text style={{marginLeft:15}}>{item.name}</Text>
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

const data =[
    
]
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerList:{
        flex:1,
        height:50,
        justifyContent: 'center',
    },
    end:{
        height:0.5,
        backgroundColor: '#333333',
        width,
        marginTop: 13,
    }
})