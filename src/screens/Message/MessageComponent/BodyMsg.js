import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator,TouchableOpacity,Dimensions } from 'react-native'
import images from 'assets/images'
import moment from 'moment'
import 'moment/locale/vi'
import { getItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { ShowImage } from 'config/screenNames';
const {width,height} = Dimensions.get('window')
export default class BodyMsg extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      receiver_id: '',
      image:null,
      sizeImage:false
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
  handleImage=(item)=>()=>{
    navigation.navigate(ShowImage,{image:item.get_image[0].full_path})
  }
  
  messageReceiver = (item) => {
    
    // 
    return (
      <View style={styles.container}>
        <Image style={styles.imgAvatar} resizeMode="contain" source={item.full_path ? { uri: item.full_path } : images.userBlue} />
        <View>
        {item.message ? <View style={styles.containerGuest}>
            <Text style={styles.txtGuest}>{item.message}</Text> 
          </View>: null}
          {item.get_image && item.get_image[0]  ? 
          <TouchableOpacity style={[styles.btnImage]}
          onPress={this.handleImage(item)}
          >
          <Image style={styles.img} source={{ uri: item.get_image[0].full_path }} /> 
          </TouchableOpacity>
          : null}

          <Text style={styles.time}>{this.convertTime(item.created_at)}</Text>
        </View>
      </View>
    )
  }
  messageSender = (item) => {
    // 
    return (
      <View style={styles.groupUser}>
        {item.message?<View style={styles.containerUser}>
          <Text style={styles.txtUser}>{item.message}</Text>
        </View> :null}
        {item.get_image && item.get_image[0]  ? 
        <TouchableOpacity style={styles.btnImage}
        onPress={this.handleImage(item)}
        >
        <Image style={styles.img} source={{ uri: item.get_image[0].full_path }} /> 
        </TouchableOpacity>
        : null}
        {!item.loading  ? <Text style={styles.timeUser}>{this.convertTime(item.created_at ? item.created_at:'')}</Text>
          :
          <ActivityIndicator size="small" color="#2166A2" style={styles.loading} />
        }
        
      </View>
    )
  }
  render() {
    const { item } = this.props

    // check  nếu nhắn tin của chính mình
    if (item.sender_id == this.state.user_id ) {
      console.log(item,'1111')
      return (
        <View style={styles.groupUser}>
        {item.message?<View style={styles.containerUser}>
          <Text style={styles.txtUser}>{item.message}</Text>
        </View> :null}
        {item.get_image && item.get_image[0]  ? 
        <TouchableOpacity style={styles.btnImage}
        onPress={this.handleImage(item)}
        >
        <Image style={styles.img} source={{ uri: item.get_image[0].full_path }} /> 
        </TouchableOpacity>
        : null}
        {!item.loading  ? <Text style={styles.timeUser}>{this.convertTime(item.created_at ? item.created_at:'')}</Text>
          :
          <ActivityIndicator size="small" color="#2166A2" style={styles.loading} />
        }
        
      </View>
      )
      // check nếu tin nhắn của người khác gửi đến
    } else {
      console.log(item,'2222')
      return (
        <View style={styles.container}>
        <Image style={styles.imgAvatar} resizeMode="contain" source={item.full_path ? { uri: item.full_path } : images.userBlue} />
        <View>
        {item.message ? <View style={styles.containerGuest}>
            <Text style={styles.txtGuest}>{item.message}</Text> 
          </View>: null}
          {item.get_image && item.get_image[0]  ? 
          <TouchableOpacity style={[styles.btnImage]}
          onPress={this.handleImage(item)}
          >
          <Image style={styles.img} source={{ uri: item.get_image[0].full_path }} /> 
          </TouchableOpacity>
          : null}

          <Text style={styles.time}>{this.convertTime(item.created_at)}</Text>
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
    height: '100%',
    width: '100%',
    // resizeMode:'contain'
  },
  btnImage:{
    height: 200,
    width: 130,
    marginTop: 5,
    marginRight:10
  }
})





