import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Dimensions,TouchableOpacity,ScrollView,StatusBar } from 'react-native';
import {StackActions,NavigationActions} from 'react-navigation'
import Swiper from 'react-native-swiper'
import images from "assets/images"
import { HomeScreen, SigninScreen, RegisterScreen } from 'config/screenNames';
import { color } from 'config'
import { Btn, BaseInput } from 'components'

const {width,height} =Dimensions.get('window')
export default class ScreenHello extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  nextHome=()=>{
      const resetAction = StackActions.reset({
          index:0,
          actions: [NavigationActions.navigate({routeName: HomeScreen})]
      })
      this.props.navigation.dispatch(resetAction)
  }
  onLogin=()=>{
    const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName: SigninScreen})]
    })
    this.props.navigation.dispatch(resetAction)
  }
  onSignUp=()=>{
    const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName: RegisterScreen})]
    })
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    return (
        <ScrollView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View >
      <Swiper  autoplay={true}
      style={{flex:1,marginTop:40}}
    //   loop={false}
      autoplayTimeout={5}
    //   showsPagination={false}
      height={height/2}
      >
        <View style={styles.swiper}>
        <Image source={images.splashSearch}
            style={styles.image}
            resizeMode="contain"
        />
          <Text style={styles.txt}>TÌM KIẾM NHANH</Text>
        </View>
        <View style={styles.swiper}>
        <Image source={images.splashBuy}
            style={styles.image}
            resizeMode="contain"
        />
          <Text  style={styles.txt}>KẾT NỐI MUA BÁN</Text>
        </View>
        <View style={ styles.swiper}>
        <Image source={images.splashInfo}
            style={styles.image}
            resizeMode="contain"
        />
          <Text style={styles.txt} >THÔNG TIN HỮU ÍCH</Text>
        </View>
      </Swiper>
        <View style={styles.container}>

           <Btn
              onPress={this.nextHome} 
              customStyle={styles.mb8}
              name="Bắt đầu ngay" />

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20}}>
              <View style={styles.OR}/>
              <Text style={{marginHorizontal:10, color: '#999999'}}>Hoặc</Text>
              <View style={styles.OR}/>
           </View>
           <Btn
              onPress={this.onLogin} 
              customStyle={styles.register}
              textStyle={styles.color}
              name="Đăng nhập" />
           <Btn
              onPress={this.onSignUp} 
              customStyle={styles.register}
              textStyle={styles.color}
              name="Đăng ký" />
           
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        marginTop:30
    },
    image:{
        height:height/3,
        width:width/1.5
    },
    txt:{
        fontSize:22,
        color:color,
        textAlign:'center',
        marginTop: 10,
    },
    btn:{
        alignItems:'center',
        justifyContent: 'center',
        height:40,
        width:width-50,
        borderColor:color,
        borderWidth:1,
        borderRadius: 5,
    },
    txtButton:{
        color:color,
        fontSize:14,
        fontWeight: '500',
    },
    swiper:{
        justifyContent:'center',
        alignItems:'center'
    },
    OR:{
        height:1,
        backgroundColor:'#999999',
        width:width/5
    },
    mb8: {marginBottom: 20, marginTop: 0},
    mt5: {marginBottom: 5},
    register: {marginTop: 0,marginBottom: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: color,},
    color: {color: color},
})