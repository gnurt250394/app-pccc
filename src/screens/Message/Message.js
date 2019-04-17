import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import HeaderMsg from './MessageComponent/HeaderMsg';
import BodyMsg from './MessageComponent/BodyMsg';
import FooterMsg from './MessageComponent/FooterMsg';
import { getMessage, postMessage, LaravelEchoConfig } from 'config/apis/mesage';
import { getItem, Status } from 'config/Controller';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title', ''),
      id:this.props.navigation.getParam('id',''),
      listMessage: data,
      loading: false,
      image: null
    }
   this.configSocket()
  }

configSocket=async()=>{
 let res=await LaravelEchoConfig()
 console.log(res,'ssss')
}

  _goBack = () => {
    navigation.pop()
  }
  _renderItem = ({ item, index }) => {
    return (
      <BodyMsg
        item={item}
        image={item.image ? item.image : this.state.image}
      />
    )
  }
  _sentMessage =async () => {
    let user_id = await getItem('user_id')
    let message = this.Footer.state.text || ''
    let data = this.state.listMessage
    if (message == '') return null
    let params = new FormData()
    params.append('receiver_id', '640')
    params.append('message', message)
    params.append('file[]', '')
    let obj = {
      'sender_id':user_id,
      'message': message,
      'file[]': '',
    }
    data.push(obj)
    this.setState({listMessage:[data,...this.state.listMessage]})
    postMessage(params).then(res=>{
      console.log(res,'res')
      if(res.data.code == Status.SUCCESS){
        let obj = res.data.data
        obj.loading = false
        this.setState({ listMessage: [obj, ...this.state.listMessage] })
      }
    }).catch(err=>{
      console.log(err.response,'err')
    })
    this.Footer.onClear()

  }
  _keyExtractor = (item, index) => `${item.id || index}`
  render() {
    return (
      <View style={styles.container}>
        <Header
          check={1}
          onPress={this._goBack}
          status={"Đang hoạt động"}
          title={this.state.title}
        />
        <HeaderMsg />
        <FlatList
          renderItem={this._renderItem}
          inverted={true}
          keyExtractor={this._keyExtractor}
          data={this.state.listMessage}
        />
        <FooterMsg
          ref={ref => this.Footer = ref}
          onPress={this._sentMessage}
        />
      </View>
    )
  }
  getMessage = () => {
    getMessage().then(res => {
      console.log(res.data,'aaa')
      this.setState({listMessage:res.data.data})
    }).catch(err=>{
      console.log(err.response,'err')
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
const data = [
  {
    id: 1,
    message: 'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    receiver_id: 1,
    created_at: '2019-02-12 06:41:25',
    image: ''
  },
  {
    id: 2,
    message: 'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    receiver_id: 1,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 3,
    message: 'Chào bạn aaaaa',
    receiver_id: 2,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 4,
    message: 'Hello bạn!',
    sender_id: 1,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 5,
    message: ':))',
    receiver_id: 2,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 6,
    message: 'Mình là Nam, mình thấy bạn đang bán sản phẩm Báo cháy HOCHIKI, giá bao nhiêu ạ?',
    sender_id: 1,
    created_at: '2019-02-12 06:41:25',
    image: ''
  },
  {
    id: 7,
    message: 'Bên mình đang sale 30% giá là 350.000 đ bạn nhé!',
    receiver_id: 1,
    created_at: '2019-03-12 06:41:25',
    image: ''
  },
  {
    id: 8,
    message: 'Chào bạn!!',
    receiver_id: 2,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 9,
    message: 'Hello bạn!',
    sender_id: 1,
    created_at: '2019-04-12 06:41:25',
    image: ''
  },
  {
    id: 10,
    message: '',
    sender_id: 2,
    created_at: '2019-04-12 06:41:25',
    image: ''
  }
]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3'
  }
})