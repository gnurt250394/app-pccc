import React, { Component } from 'react'
import { Text, View, StatusBar,StyleSheet ,FlatList,TouchableWithoutFeedback,Keyboard} from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import HeaderMsg from './MessageComponent/HeaderMsg';
import BodyMsg from './MessageComponent/BodyMsg';
import FooterMsg from './MessageComponent/FooterMsg';
import { getMessage } from 'config/apis/mesage';

export default class Message extends Component {
  state={
    title:this.props.navigation.getParam('title',''),
    listMessage:data,
    loading:false,
    image:null
  }
  _goBack=()=>{
    navigation.pop()
  }
  _renderItem=({item,index})=>{
    return(
      <BodyMsg
      item={item}
      image={item.image?item.image:this.state.image}
      />
    )
  }
  _sentMessage =()=>{
    let date = new Date()
    this.setState({loading:true})
    let message = this.Footer.state.text || ''
    if(message =='') return null
    let params ={
      'sender_id':'431',
      'message':message,
      'file[]':'',
    }
    data.push(params)
    this.setState({listMessage:[{...params,loading:true,},...this.state.listMessage]})
    this.Footer.onClear()
    
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
        inverted={true}
        keyExtractor={this._keyExtractor}
        // initialScrollIndex={data.length-1}
        data={this.state.listMessage}
        />
        <FooterMsg
        ref={ref=>this.Footer = ref}
        onPress={this._sentMessage}
        />
      </View>
    )
  }
  getMessage=()=>{
    getMessage().then(res=>{
      console.log(res.data)
    })
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#2166A2');
      this.getMessage()

    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }
}
const data =[
  {
    id:1,
    message:'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    receiver_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:2,
    message:'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    receiver_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:3,
    message:'Chào bạn aaaaa',
    receiver_id:2,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:4,
    message:'Hello bạn!',
    sender_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:5,
    message:':))',
    receiver_id:2,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:6,
    message:'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    sender_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:7,
    message:'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    receiver_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:8,
    message:'Chào bạn!!',
    receiver_id:2,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:9,
    message:'Hello bạn!',
    sender_id:1,
    created_at:'2019-04-12 06:41:25',
    image:''
  },
  {
    id:10,
    message:'',
    sender_id:2,
    created_at:'2019-04-12 06:41:25',
    image:''
  }
]
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F3F3F3'
  }
})