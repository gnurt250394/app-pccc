import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, FlatList, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import HeaderMsg from './MessageComponent/HeaderMsg';
import BodyMsg from './MessageComponent/BodyMsg';
import FooterMsg from './MessageComponent/FooterMsg';
import { getMessage, postMessage, LaravelEchoConfig } from 'config/apis/mesage';
import { getItem, Status } from 'config/Controller';
import Echo from 'laravel-echo';
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client/dist/socket.io';
import constant from 'config/apis/constant';
import SimpleToast from 'react-native-simple-toast';
import TabEmoji from './Emoji/Tab'
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title', ''),
      id: this.props.navigation.getParam('id', ''),
      listMessage: [],
      loading: true,
      image: null,
      page: 1,
      Threshold: 0.1,
      link: this.props.navigation.getParam('link', '')
    }
    this.configSocket()
  }

  configSocket = async () => {
    const token = await getItem('token')
    let user_id = await getItem('user_id')
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


    echo.channel('chatroom').listen('MessagePosted', data => {
      // 
      console.log(data, 'event')
      if (data && data.message) {
        if (data.message.sender_id == user_id) {
          return null
        } else if (data.message.receiver_id == this.state.id) {
          let obj = data.message
          if (data.image) {

            let list = [{
              full_path: data.image
            }]
            obj.get_image = list
          }

          this.setState({ listMessage: [obj, ...this.state.listMessage] })
        }

      }
    })
  }
  selectImage = async (value) => {
    // this.setState({image:value})
    let user_id = await getItem('user_id')

    console.log(user_id, 'id')
    let data = this.state.listMessage
    // if (message == '') return null
    let params = new FormData()
    let date = new Date()
    let name = `IMG_${date.getTime()}.png`
    params.append('receiver_id', this.state.id)
    params.append('file[]', { uri: value, type: 'image/jpeg', name }, name)
    let obj = {
      receiver_id: this.state.id,
      sender_id: user_id,
      loading: true,
      get_image: [
        {
          full_path: value
        }
      ]
    }

    this.setState({ listMessage: [obj, ...data] })

    postMessage(params).then(res => {
      console.log(res.data)
      if (res.data.code == Status.SUCCESS) {
        obj.loading = false
        obj.id = res.data.data.id
        // obj.get_image[0].full_path = value
        obj.created_at = res.data.data.created_at
        this.setState({ listMessage: [obj, ...data] })

      } else {
        SimpleToast.show("Không thể gửi tin nhắn")
      }
    }).catch(err => {
      SimpleToast.show("Không thể gửi tin nhắn")
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
    params.append('file[]', this.state.image)
    let obj = {
      message: message,
      receiver_id: this.state.id,
      sender_id: user_id,
      loading: true
    }
    this.setState({ listMessage: [obj, ...data] },()=>{
      postMessage(params).then(res => {
        if (res.data.code == Status.SUCCESS) {
           obj = res.data.data
          obj.loading = false
          this.setState({ listMessage: [obj, ...data] })
  
        } else {
          SimpleToast.show("Không thể gửi tin nhắn")
        }
      }).catch(err => {
        SimpleToast.show("Không thể gửi tin nhắn")
      })
    })
    
    this.Footer.onClear()

  }
  postMsg=(obj,params)=>{
    
  }
  _headerComponent = () => {
    return this.state.loading ? <ActivityIndicator size={"large"} color="#2166A2" /> : null
  }
  onEndReached = () => {

    this.state.loading ? this.getMessage() : null
  }
  _keyExtractor = (item, index) => `${item.id || index}`
  _listEmpty=()=> <Text style={styles.notFound}>Không có dữ liệu</Text>
  render() {
    return (
      <View style={styles.container}>
        <Header
          check={1}
          onPress={this._goBack}
          // status={"Đang hoạt động"}
          title={this.state.title}
        />
        
        {this.state.link ? <HeaderMsg /> : null}
        <FlatList
          renderItem={this._renderItem}
          ref={ref => this.flatlit = ref}
          inverted={true}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          data={this.state.listMessage}
          ListEmptyComponent={this._listEmpty}
          onEndReachedThreshold={this.state.Threshold}
          onEndReached={this.onEndReached}
          ListFooterComponent={this._headerComponent}
        />
        <FooterMsg
          ref={ref => this.Footer = ref}
          onPress={this._sentMessage}
          selectImage={this.selectImage}
        />
       <TabEmoji/>
      </View>
    )
  }
  sortData = (a, b) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  }
  getMessage = async () => {
    // let user_id = await getItem('user_id')
    let params = {
      page: this.state.page,
      user_chat: this.state.id
    }
    getMessage(params).then(res => {

      console.log(res.data, 'dddd')

      if (res.data.code == Status.SUCCESS) {

        let data = res.data.data
        // let listSend = data.filter(e => e.receiver_id == user_id && e.sender_id == this.state.id)
        // let listReciver = data.filter(e => e.receiver_id == this.state.id && e.sender_id == user_id)
        // let listFinal = listSend.concat(listReciver).sort(this.sortData)
        this.setState({ listMessage: [...this.state.listMessage, ...data], page: this.state.page + 1, loading: true })
      } else if (res.data.code == Status.NO_CONTENT) {
        this.setState({ loading: false, Threshold: 0 })
      } else {
        this.setState({ loading: false, Threshold: 0 })
      }

    }).catch(err => {

      this.setState({ loading: false, Threshold: 0 })
    })
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#2166A2');


    });
    this.getMessage()
    // this.configSocket()
  }

  componentWillUnmount() {
    this._navListener.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  notFound:{
    alignSelf:'center',
    marginTop:30,
    fontWeight:'600',
    color:'#333333',
    fontSize:16
  }
})





