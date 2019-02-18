import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Dimensions,TouchableOpacity,ScrollView,StatusBar } from 'react-native';
import {StackActions,NavigationActions} from 'react-navigation'
import Swiper from 'react-native-swiper'
import images from 'public/images'
import { ScreenName } from 'config';

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
          actions: [NavigationActions.navigate({routeName:ScreenName.HomeScreen})]
      })
      this.props.navigation.dispatch(resetAction)
  }
  onLogin=()=>{
    const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName:ScreenName.Signin})]
    })
    this.props.navigation.dispatch(resetAction)
  }
  onSignUp=()=>{
    const resetAction = StackActions.reset({
        index:0,
        actions: [NavigationActions.navigate({routeName:ScreenName.Register})]
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
        <TouchableOpacity style={[styles.btn,{backgroundColor:'#F55555',marginBottom:20}]}
        onPress={this.nextHome}>
               <Text style={{color:'#FFFFFF',fontSize:14,fontWeight:'500'}}>BẮT ĐẦU NGAY</Text>
           </TouchableOpacity>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20}}>
           <View style={styles.OR}/>
           <Text style={{marginHorizontal:10}}>Hoặc</Text>
           <View style={styles.OR}/>
           </View>
           <TouchableOpacity style={[styles.btn,{marginBottom:5}]}
           onPress={this.onLogin}>
               <Text style={styles.txtButton}>ĐĂNG NHẬP</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btn}
           onPress={this.onSignUp}>
               <Text style={styles.txtButton}>ĐĂNG KÝ</Text>
           </TouchableOpacity>
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
        color:'#F55555',
        textAlign:'center',
        marginTop: 10,
    },
    btn:{
        alignItems:'center',
        justifyContent: 'center',
        height:40,
        width:width-50,
        borderColor:'#F55555',
        borderWidth:1,
        borderRadius: 5,
    },
    txtButton:{
        color:'#F55555',
        fontSize:14,
        fontWeight: '500',
    },
    swiper:{
        justifyContent:'center',
        alignItems:'center'
    },
    OR:{
        height:1,
        backgroundColor:'gray',
        width:width/5
    }
})