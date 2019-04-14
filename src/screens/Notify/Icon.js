import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet} from 'react-native'
import images from 'assets/images'
import { connect } from 'react-redux'
import { Count_Notification } from 'config/apis/Notifi';
import navigation from 'navigation/NavigationService';
import SimpleToast from 'react-native-simple-toast';
import { removeItem, Status } from 'config/Controller';
import { SigninScreen } from 'config/screenNames';
import { countNotificationAction } from 'reduxs/actions/actionCreator';
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
           {this.props.count > 0?<View style={styles.containerNotifi}>
        <Text style={styles.txtNotifi}>{this._renderCount(this.props.count)}</Text>
        </View> : null}
        <Image
        source={this.props.source}
        style={styles.img}
        resizeMode="contain"
        />
      </View>
    )
  }
  getCountNotifi = () => {
      Count_Notification().then(res=> {
            console.log(res.data,'ddd')
          if(res.data.code == Status.SUCCESS){
           this.props.countNotifi(res.data.data)
          }else if(res.data.code == Status.TOKEN_EXPIRED){
            navigation.reset(SigninScreen)
            SimpleToast.show('Phiên đăng nhập hết hạn')
            removeItem('token')
          }else if(res.data.code == Status.NO_CONTENT){
            // this.props.countNotifi(res.data.code)
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
const mapStateToProps = (state) => {
  return{
    count:state.countReducer&&state.countReducer.count?state.countReducer.count:''
  }
}

const mapDispatchToProps =(dispatch)=> {
  return{
    countNotifi:(count)=>dispatch(countNotificationAction(count))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Icon)