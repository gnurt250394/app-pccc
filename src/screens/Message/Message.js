import React, { Component } from 'react'
import { Text, View, StatusBar,StyleSheet ,FlatList,TouchableWithoutFeedback,Keyboard} from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import HeaderMsg from './MessageComponent/HeaderMsg';
import BodyMsg from './MessageComponent/BodyMsg';
import FooterMsg from './MessageComponent/FooterMsg';

export default class Message extends Component {
  state={
    title:this.props.navigation.getParam('title','')
  }
  _goBack=()=>{
    navigation.pop()
  }
  _renderItem=({item,index})=>{
    return(
      <BodyMsg
      item={item}
      />
    )
  }
 
  _keyExtractor=(item,index)=> `${item.id || index}`
  render() {
    return (
      <View style={styles.container}>
        <Header
          check={1}
          onPress={this._goBack}
          status={"Đang hoạt động"}
          title={this.state.title}
        />
        <HeaderMsg/>
        <FlatList
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        initialScrollIndex={data.length-1}
        data={data}
        />
        <FooterMsg/>
      </View>
    )
  }
  componentDidMount() {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('dark-content');
    //   StatusBar.setBackgroundColor('#fff');
    // });
  }

  componentWillUnmount() {
    // this._navListener.remove();
  }
}
const data =[
  {
    id:1,
    msg:'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    type:1,
    time:'Hôm nay 13:02 ',
    image:''
  },
  {
    id:2,
    msg:'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    type:1,
    time:'Hôm nay 13:10 ',
    image:''
  },
  {
    id:3,
    msg:'Chào bạn aaaaa',
    type:2,
    time:'Hôm nay 13:15 ',
    image:''
  },
  {
    id:4,
    msg:'Hello bạn!',
    type:1,
    time:'Hôm nay 13:20',
    image:''
  },
  {
    id:5,
    msg:':))',
    type:2,
    time:'Hôm nay 13:20',
    image:''
  },
  {
    id:6,
    msg:'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    type:1,
    time:'Hôm nay 13:02 ',
    image:''
  },
  {
    id:7,
    msg:'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    type:1,
    time:'Hôm nay 13:10 ',
    image:''
  },
  {
    id:8,
    msg:'Chào bạn!!',
    type:2,
    time:'Hôm nay 13:15 ',
    image:''
  },
  {
    id:9,
    msg:'Hello bạn!',
    type:1,
    time:'Hôm nay 13:20',
    image:''
  },
  {
    id:10,
    msg:'',
    type:2,
    time:'Hôm nay 13:20',
    image:''
  }
]
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F3F3F3'
  }
})