import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import images from 'assets/images'
export default class BodyMsg extends React.PureComponent {
  render() {
    const { item } = this.props
    // check nếu tin nhắn của người khác gửi đến
    if (item.type == 1) {
      return (
        <View style={styles.container}>
          <Image style={styles.imgAvatar} resizeMode="contain" source={item.avatar ? { uri: item.avatar } : images.userBlue} />
          <View>
            <View style={styles.containerGuest}>
              {item.msg ? <Text style={styles.txtGuest}>{item.msg}</Text> : null}
            </View>
            {item.image ? <Image style={styles.img} source={{ uri: item.image }} /> : null}
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      )

      // check  nếu nhắn tin của chính mình
    } else {
      return (
        <View style={styles.groupUser}>
          <View>
            <View style={styles.containerUser}>
              <Text style={styles.txtUser}>{item.msg}</Text>
            </View>
            <Text style={styles.timeUser}>{item.time}</Text>
          </View>
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
  groupUser: {
    flex: 1,
    alignSelf: 'flex-end',
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
    paddingVertical: 10,
    paddingStart: 10
  },
  containerUser: {
    borderRadius: 5,
    backgroundColor: '#2166A2',
    marginTop: 5,
    maxWidth: '90%',
    paddingVertical: 10,
    paddingStart: 10
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
