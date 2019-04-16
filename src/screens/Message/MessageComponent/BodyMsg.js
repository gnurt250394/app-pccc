import React, { Component } from 'react'
import { Text, View, StyleSheet, Image,ActivityIndicator } from 'react-native'
import images from 'assets/images'
import moment from 'moment'
import 'moment/locale/vi'
export default class BodyMsg extends React.PureComponent {
constructor(props){
  super(props)
 
}
  convertTime =(time)=>{
   
    return  moment(time,'YYYY-MM-DD hh:mm:ss').subtract(1, 'days').calendar()
  }
  render() {
    const { item } = this.props
    // check nếu tin nhắn của người khác gửi đến
    if (item.receiver_id) {
      return (
        <View style={styles.container}>
          <Image style={styles.imgAvatar} resizeMode="contain" source={item.avatar ? { uri: item.avatar } : images.userBlue} />
          <View>
            <View style={styles.containerGuest}>
              {item.message ? <Text style={styles.txtGuest}>{item.message}</Text> : null}
            </View>
            {item.image ? <Image style={styles.img} source={{ uri: item.image }} /> : null}
            
            <Text style={styles.time}>{this.convertTime(item.created_at)}</Text>
          </View>
        </View>
      )

      // check  nếu nhắn tin của chính mình
    } else {
      return (
        <View style={styles.groupUser}>
            <View style={styles.containerUser}>
              <Text style={styles.txtUser}>{item.message}</Text>
            </View>
            {item.loading?
            <ActivityIndicator size="small" color="#2166A2" style={styles.loading}
            />
            :<Text style={styles.timeUser}>{item.created_at}</Text>}
             {this.props.image ? <Image style={styles.img} source={{ uri: this.props.image }} /> : null}
        </View>
      )
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  loading:{
    alignSelf:'flex-end',
    marginRight:10
  },
  groupUser: {
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom:20
  },
  imgAvatar: {
    height: 40,
    alignSelf: 'flex-end',
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 5,
    marginBottom:20
  },
  containerGuest: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    maxWidth: '90%',
    minWidth:'20%',
    paddingVertical: 10,
    paddingStart: 10
  },
  containerUser: {
    borderRadius: 5,
    backgroundColor: '#2166A2',
    marginTop: 5,
    maxWidth: '90%',
    minWidth:'20%',
    maxHeight:'100%',
    paddingVertical: 10,
    paddingStart: 10,
    marginRight:10
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
    marginBottom: 10
  },
  txtUser: {
    width: '90%',
    color: '#FFFFFF',
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
