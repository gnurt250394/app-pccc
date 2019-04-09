import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet} from 'react-native'
import images from 'assets/images'
import { connect } from 'react-redux'
import { Count_Notification } from 'config/apis/Notifi';
import navigation from 'navigation/NavigationService';
import SimpleToast from 'react-native-simple-toast';
import { removeItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames';
class Icon extends Component {
      state ={
            count:''
      }
      _renderCount =(count)=>{
          return count < 99 ? count : 99
      }
  render() {
    return (
      <View style={styles.flex}>
           {this.state.count > 0?<View style={styles.containerNotifi}>
        <Text style={styles.txtNotifi}>{this._renderCount(this.state.count)}</Text>
        </View> : null}
        <Image
        source={this.props.source}
        style={styles.img}
        />
      </View>
    )
  }
  getCountNotifi = () => {
      Count_Notification().then(res=> {
            console.log(res.data,'ddd')
          if(res.data.code == Status.SUCCESS){
           this.setState({count:res.data.data})
          }else if(res.data.code == Status.TOKEN_EXPIRED){
            navigation.reset(SigninScreen)
            SimpleToast.show('Phiên đăng nhập hết hạn')
            removeItem('token')
          }else if(res.data.code == Status.NO_CONTENT){
            this.setState({count:0})
          }
      })
  }
  componentDidMount() {
    this.getCountNotifi()
  }
  
}

const styles = StyleSheet.create({
      img:{
            height:16,
            width:16,
            marginTop:7,
            marginBottom:4,
      },
      containerNotifi:{
            height:17,
            width:17,
            borderRadius:10,
            backgroundColor:'red',
            position:'absolute',
            top:-3,
            right:-7,
            zIndex:1,
            alignItems:'center',
            justifyContent:'center'
      },
      flex:{
            flex:1
      },
      txtNotifi:{
            color:'#FFFFFF',
            fontWeight:'bold',
            fontSize:10
      }
})


export default connect()(Icon)