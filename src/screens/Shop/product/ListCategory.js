import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet ,Dimensions} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
const {width} = Dimensions.get('window')
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _goBack=()=>{
    navigation.pop()
}

_renderItem=({item})=>{
    return(
        <View style={styles.containerList}>
            <Text style={{marginLeft:15}}>{item.name}</Text>
            <View style={styles.end}/>
        </View>
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
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
      />
      </View>
    );
  }

  getData=()=>{

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