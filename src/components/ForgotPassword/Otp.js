import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import images from "public/images"
import styles from "public/css" 
import { signup } from 'config/api'
import { Header, Input, Btn} from '../layout'
import { ScreenName, toUpperCase } from 'config'

class Otp extends React.Component {
   constructor(props){
       super(props)
       this.state={
           timer:60
       }
   }
   componentDidUpdate(){
    if(this.state.timer === 0){ 
      clearInterval(this.interval);
      this.setState({timer:''})
    }
  }
  countDownTimer=()=>{
  this.state.timer===0?  this.setState(()=> ({ timer: 60 }),
    ()=>{
        this.interval =  setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
          );  
    })
    :
    ()=>{}
  
  }
    render(){
        return (
            <TouchableWithoutFeedback style= { { flex:1}} onPress={() =>Keyboard.dismiss()}>
            <View >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header title="Nhập mã OTP" onPress={() => this.props.navigation.goBack() }/>
                <View style={{height: '70%', flexDirection: 'column', justifyContent: 'space-between', marginTop: 40}}>
                    <View style={{width: "70%", alignSelf: 'center'}}>
                        <Text style={{textAlign: "center", fontSize: 16, color: '#555555'}}>Một mã xác thực đã được gửi đến số điện thoại của bạn. Vui lòng nhập mã OTP để xác thực</Text>
                    </View>
                    <View style={[styles.row,{width: "70%", alignSelf: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1, alignItems: 'center', paddingBottom: 0}]}>
                        <Input 
                            customStyle={{ borderBottomWidth: 0, padding: 0}}
                            placeholder="Nhập mã OTP" />
                        <TouchableOpacity style={{padding: 0, marginBottom: 0}}
                        onPress={this.countDownTimer}>
                            <Text>{toUpperCase("Gửi lại")} <Text style={{fontWeight:'bold'}}>{this.state.timer} </Text> </Text>
                        </TouchableOpacity>
                    </View>
                    <Btn name="Tạo mật khẩu mới"
                    onPress={()=>{this.props.navigation.navigate(ScreenName.ChangePassword)}}
                     />
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
    componentDidMount(){
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
          );
    }
}
export default connect()(Otp)
