import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import images from 'assets/images'
import moment from 'moment'
import 'moment/locale/vi'
import { getItem } from 'config/Controller';
export default class BodyMsg extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      receiver_id: ''
    }
  }
  componentDidMount = async () => {
    let user_id = await getItem('user_id')
    let receiver_id = this.props.receiver_id
    this.setState({ user_id, receiver_id })
  }
  convertTime = (time) => {
    let date = new Date().getDate()
    let datePre = new Date(time).getDate()
    if (date == datePre) {
      return moment(time, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')
    } else {
      return moment(time, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')
    }

  }
  messageReceiver = (item) => {
    // console.log(item,'messageReceiver')
    return (
      <View style={styles.container}>
        <Image style={styles.imgAvatar} resizeMode="contain" source={item.avatar ? { uri: item.full_path } : images.userBlue} />
        <View>
          <View style={styles.containerGuest}>
            {item.message ? <Text style={styles.txtGuest}>{item.message}</Text> : null}
          </View>
          {item.image ? <Image style={styles.img} source={{ uri: item.image }} /> : null}

          <Text style={styles.time}>{this.convertTime(item.created_at)}</Text>
        </View>
      </View>
    )
  }
  messageSender = (item) => {
    // console.log(item,'messageSender')
    return (
      <View style={styles.groupUser}>
        <View style={styles.containerUser}>
          <Text style={styles.txtUser}>{item.message}</Text>
        </View>
        {item.created_at ? <Text style={styles.timeUser}>{this.convertTime(item.created_at)}</Text>
          :
          <ActivityIndicator size="small" color="#2166A2" style={styles.loading} />
        }
        {this.props.image ? <Image style={styles.img} source={{ uri: this.props.image }} /> : null}
      </View>
    )
  }
  render() {
    const { item } = this.props

    // check  nếu nhắn tin của chính mình
    if (item.sender_id == this.state.user_id ) {
      return this.messageSender(item)
      // check nếu tin nhắn của người khác gửi đến
    } else {
      return this.messageReceiver(item)
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  loading: {
    alignSelf: 'flex-end',
    marginRight: 10
  },
  groupUser: {
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  imgAvatar: {
    height: 40,
    alignSelf: 'flex-end',
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 20
  },
  containerGuest: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    maxWidth: '90%',
    minWidth: '20%',
    paddingVertical: 10,
    paddingStart: 10
  },
  containerUser: {
    borderRadius: 5,
    backgroundColor: '#2166A2',
    marginTop: 5,
    maxWidth: '90%',
    minWidth: '20%',
    maxHeight: '100%',
    paddingVertical: 10,
    paddingStart: 10,
    marginRight: 10
  },
  timeUser: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'right',
    marginRight: 10
  },
  time: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 10,
    marginTop:3
  },
  txtUser: {
    width: '90%',
    color: '#FFFFFF',
    marginTop:3,
    marginBottom: 10
  },
  txtGuest: {
    width: '90%',
    color: '#333333'
  },
  img: {
    height: 200,
    width: 130,
    marginTop: 5
  }
})
