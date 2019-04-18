import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import HeaderMsg from './MessageComponent/HeaderMsg';
import BodyMsg from './MessageComponent/BodyMsg';
import FooterMsg from './MessageComponent/FooterMsg';
import { getMessage, postMessage, LaravelEchoConfig } from 'config/apis/mesage';
import { getItem, Status } from 'config/Controller';
import Echo from 'laravel-echo';
import SocketIOClient from 'socket.io-client/dist/socket.io';
import constant from 'config/apis/constant';
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title', ''),
      id: this.props.navigation.getParam('id', ''),
      listMessage: [],
      loading: false,
      image: null
    }
    // this.configSocket()
  }

  configSocket = async () => {
    let token = await getItem('token')
    let echo = new Echo({
      broadcaster: 'socket.io',
      host: constant.BASE_SOCKET,
      client: SocketIOClient,
      auth: {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      },
    });
    console.log('start')
    echo.channel('chatroom').listen('MessagePosted', data => {
        console.log(data,'event')
        if(data && data.message){
          this.setState({listMessage:[data.message,...this.state.listMessage]})
        }
      })
  }

  _goBack = () => {
    navigation.pop()
  }
  _renderItem = ({ item, index }) => {
    return (
      <BodyMsg
        item={item}
        receiver_id={this.state.id}
        image={item.image ? item.image : this.state.image}
      />
    )
  }
  _sentMessage = async () => {
    let user_id = await getItem('user_id')
    let message = this.Footer.state.text || ''
    let data = this.state.listMessage
    if (message == '') return null
    let params = new FormData()
    params.append('receiver_id', this.state.id)
    params.append('message', message)
    params.append('file[]', '')
    let obj = {
      message: message,
      receiver_id: this.state.id,
      sender_id: user_id,
      loading:true
    }
    
    
    
    this.setState({ listMessage: [obj,...this.state.listMessage] })
    postMessage(params).then(res => {
      
      if (res.data.code == Status.SUCCESS) {
        let obj = this.state.listMessage
        obj.forEach(e=>{
          if(e.message == message){
            e = res.data.data
          }
        })
        
        this.setState({ listMessage: obj })
        
      }
    }).catch(err => {
      
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
          ref={ref => this.flatlit = ref}
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
  sortData = (a, b) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  }
  getMessage = async () => {
    let user_id = await getItem('user_id')
    
    getMessage().then(res => {
      
      

      if(res.data.code == Status.SUCCESS){
        
        let data = res.data.data
        let listSend = data.filter(e => e.receiver_id == user_id && e.sender_id == this.state.id)
        let listReciver = data.filter(e => e.receiver_id == this.state.id && e.sender_id == user_id)
        let listFinal = listSend.concat(listReciver).sort(this.sortData)
        this.setState({ listMessage: listFinal })
      }else{
        
      }
      
      
    }).catch(err => {
      
    })
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#2166A2');
      this.getMessage()

    });
    this.configSocket()
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