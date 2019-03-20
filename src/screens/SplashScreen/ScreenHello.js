import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Dimensions,ScrollView,StatusBar,AsyncStorage } from 'react-native';
import {StackActions,NavigationActions} from 'react-navigation'
import Swiper from 'react-native-swiper'
import images from "assets/images"
import { HomeScreen, SigninScreen, RegisterScreen } from 'config/screenNames';
import { color, fonts } from 'config'
import { Btn } from 'components'
import navigation from 'navigation/NavigationService';
import {connect} from 'react-redux'

const {width,height} =Dimensions.get('window')
console.log('width: ', width);
console.log('height: ', height);
 class ScreenHello extends Component {

    nextHome=()=>{
        navigation.reset(HomeScreen)
        AsyncStorage.setItem('Remember','Remember')
    }

    onLogin=()=>{
        // navigation.reset(SigninScreen)
        this.props.navigation.navigate(SigninScreen)
    }

    onSignUp=()=>{
        // navigation.reset(RegisterScreen)
        this.props.navigation.navigate(RegisterScreen)
      
    }

    // set status bar
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('dark-content');
          StatusBar.setBackgroundColor('#fff');
        });
    }
    
    componentWillUnmount() {
        this._navListener.remove();
    }

    render() {
        
        return (
            <ScrollView>
                <View >
                    <Swiper  autoplay={true}
                        dotColor="#E5F4FC"
                        activeDotColor="#80C9F0"
                        style={styles.slide}
                        autoplayTimeout={3}
                        height={height/2} >
                        <View style={styles.swiper}>
                            <Image source={images.splashSearch}
                                style={styles.image}
                                resizeMode="contain"/>
                            <Text style={styles.txt}>TÌM KIẾM NHANH</Text>
                        </View>
                        <View style={styles.swiper}>
                            <Image source={images.splashBuy}
                                style={styles.image}
                                resizeMode="contain"/>
                            <Text  style={styles.txt}>KẾT NỐI MUA BÁN</Text>
                        </View>
                        <View style={ styles.swiper}>
                            <Image source={images.splashInfo}
                                style={styles.image}
                                resizeMode="contain"/>
                            <Text style={styles.txt} >THÔNG TIN HỮU ÍCH</Text>
                        </View>
                    </Swiper>
                    <View style={styles.container}>

                    <Btn
                        onPress={this.nextHome} 
                        customStyle={styles.mb8}
                        name="Bắt đầu ngay" />

                    <View style={styles.boxOr}>
                        <View style={styles.OR}/>
                        <Text style={styles.txtOr}>Hoặc</Text>
                        <View style={styles.OR}/>
                    </View>

                    <Btn
                        onPress={this.onSignUp} 
                        customStyle={styles.register}
                        textStyle={styles.color}
                        name="Đăng ký" />

                    <Btn
                        onPress={this.onLogin} 
                        customStyle={styles.register}
                        textStyle={styles.color}
                        name="Đăng nhập" />
                    
                    
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
        fontSize: 20,
        color:color,
        textAlign:'center',
        // fontWeight: 'bold',
        marginTop: 10,
        fontFamily: fonts.bold,
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
    slide: {flex:1,marginTop:40},
    OR:{
        height:1,
        backgroundColor:'#80C9F0',
        width:width/5
    },
    boxOr: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    },
    txtOr: {
        marginHorizontal:10,
        color: '#80C9F0'},
    mb8: {
        marginBottom: 20, 
        marginTop: -20,
        fontFamily:fonts.bold
    },
    mt5: {
        marginBottom: 5
    },
    register: {
        marginTop: 0,
        marginBottom: 8, 
        backgroundColor: '#fff',
        borderWidth: 0.6, 
        borderColor: color,
        // fontFamily:fonts.bold
    },
    color: {
        color: color
    },
})
const mapStateToProps =(state)=>{
    return{
        user: state.user&& state.user.data? state.user.data:null,
        token: state.user && state.user.token ? state.user.token:null
    }
}
export default connect(mapStateToProps)(ScreenHello)