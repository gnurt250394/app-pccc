import React, { Component } from 'react';
import { View, Text ,StyleSheet,Dimensions,Image,FlatList,ScrollView,Animated} from 'react-native';
import { Header } from 'components';
import { fontStyle, color } from 'config/Controller';
import images from 'assets/images'
import navigation from 'navigation/NavigationService';
const {width,height}= Dimensions.get('window')

const HEADER_MAX_HEGHT = 120
const HEADER_MIN_HEGHT = 55
class Item extends Component{
    render(){
        return this.props.name? <View style={styles.Square}>
                <Image source={this.props.source}
                     style={styles.image}
                     resizeMode="contain"
                 />
                 <View style={{flexWrap:'wrap',flexShink:5}}>
                 <Text style={styles.txt} >
                    {this.props.name}</Text>
                 </View>  
             </View>
        : null
    }
}
export default class DetailContractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scrollY: new Animated.Value(0)
    };
  }

  _renderItem=({item})=>{
      return(
          <View>
        <View style={styles.containerList}>
            <Text style={styles.titleList}>{item.name}</Text>
            <Text style={styles.timeList}>{item.time}</Text>
            
        </View>
        <View  style={styles.end}/>
        </View>
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  _goBack=()=>{
    navigation.pop()
  }
  render() {
      const headerHeight = this.state.scrollY.interpolate({
          inputRange:[0,HEADER_MAX_HEGHT-HEADER_MIN_HEGHT],
          outputRange:[HEADER_MAX_HEGHT,HEADER_MIN_HEGHT],
          extrapolate:'clamp'
      })
      const marginTop = this.state.scrollY.interpolate({
          inputRange:[0,HEADER_MAX_HEGHT-HEADER_MIN_HEGHT],
          outputRange:[HEADER_MAX_HEGHT-100,HEADER_MAX_HEGHT+20],
          extrapolate:'clamp'
      })
      const zIndex = this.state.scrollY.interpolate({
          inputRange:[0,HEADER_MAX_HEGHT-HEADER_MIN_HEGHT],
          outputRange:[0,1],
          extrapolate:'clamp'
      })
    return (
      <View style={styles.container}>
        
        <Animated.View
        style={[styles.header,{
            height:headerHeight,
            zIndex
            }]}
        >
      

        </Animated.View>
        <Header
            check={1}
            // style={styles.header}
            onPress={this._goBack}
            title={"Thông tin nhà thầu"}
        />
        <Animated.View
        style={[styles.header,{
            height:headerHeight,
            zIndex
            }]}
        >
      <Header
            check={1}
            style={styles.header}
            onPress={this._goBack}
            title={"Thông tin nhà thầu"}
        />

        </Animated.View>
        <ScrollView 
        style={{flex:1}}
        scrollEventThrottle={15}
        onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{y:this.state.scrollY }}}]
        )}
        >
       <Animated.View style={[styles.containerPosition,{marginTop}]}>
            <Text style={styles.txtBold}>abc</Text>
            <Item source={images.proEmail} name={'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm '}/>
            <Item source={images.proPhone} name={'aaa'}/>
            <Item source={images.proLocation} name={'aaa'}/>
            <Item source={images.proCompany} name={'aaa'}/>
          
       </Animated.View>
       <View style={styles.containerFooter}>
            <Text style={styles.txtFooter}>Tin tức nhà thầu</Text>
            <FlatList
                data={data}
                keyboardShouldPersistTaps="always"
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
       </View>
       </ScrollView>
      </View>
    );
  }
}
const data =[
    {
        id:1,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:2,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:3,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:4,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:5,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:6,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:7,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:8,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:9,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:10,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:11,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:12,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:13,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:14,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:15,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm ',
        time:'Hôm nay 20:03'
    },
    {
        id:16,
        name:'Nguyễn Văn Nam vừa đăng bán sản phẩm Máy Bơm 111',
        time:'Hôm nay 20:03'
    },
]
const styles = StyleSheet.create({
    header:{
        alignItems: 'flex-start',
        // paddingTop:10,
        position:'absolute',
        backgroundColor:color,
        top:0,
        left:0,
        right:0
    },
    containerList:{
        flex:1,
        paddingHorizontal:15
    },
    container:{
        flex:1
    },
    titleList:{
        color:'#333333',
        fontFamily:fontStyle.Acumin_RPro_0,
    },
    timeList:{
        fontFamily:fontStyle.Acumin_ItPro_0,
        fontSize:11,
        color:'#999999',
        marginTop:5

    },
    end:{
        height:1,
        backgroundColor:'#DEDEDE',
        width,
        marginVertical: 5,
    },
    containerPosition:{
        // position:'absolute',
        // top: 55,
        // height:height/4,
       
        elevation:4,
        width:width-20,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 15,
        flex:1,
        backgroundColor: '#FFFFFF',
    },
    txtBold:{
        fontFamily:fontStyle.Acumin_bold,
        color:'#333333',
        marginBottom: 8,
        fontSize:16
    },
    txtFooter:{
        fontFamily:fontStyle.Acumin_bold,
        color:'#333333',
        marginBottom: 4,
        fontSize:16,
        marginLeft: 11,
    },
    image:{
        height:10,
        width:10,
        // tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    txt:{
        color:'#333131',
        fontSize:13,
        // textAlign:'center'
    },
    Square:{
        flexDirection:'row',
        marginBottom:10
    },
    containerFooter:{
        marginTop:10,
        flex:1
    }
})