import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Image, Dimensions,TouchableOpacity} from 'react-native';
import images from "assets/images"
import moment from 'moment'
import { getLiquidation } from 'config/apis/myShop';
import { Status, removeItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen } from 'config/screenNames';
    moment.locale('vn')
export default class LiquidationShop extends Component {

  state={
      listLiqiudation:[],
      Thresold:0.1
  }
  goDetail=()=>{

  }
 _renderItem=({item,index})=>{
    return(
        <View>
        <View style={styles.containerList}>
        <View style={styles.Image}>
            <Image source={{uri:item.image}}
                style={styles.image}
                resizeMode="contain"
            />
            </View>
            <TouchableOpacity onPress={this.goDetail}
            style={styles.dots}
            >
            <Image source={images.dots}
                style={styles.imgDots}
                resizeMode="contain"
            />
            </TouchableOpacity>
            <View style={styles.containerText}>
            <Text style={styles.txtName}>{item.name}</Text>
            <Text style={styles.txtPrice}>{item.description}</Text>
            <View style={styles.rowList}>
            <View style={styles.row}>
                <Image source={images.shopLocation}
                    style={styles.imgLocation}
                    resizeMode="contain"
                />
                <Text>{item.city_id}</Text>
                </View>
                <View style={styles.row}>
                <Image 
                    source={images.shopPrice}
                    style={styles.imgLocation}
                    resizeMode="contain"
                />
                <Text>{item.price}</Text>
                </View>
                <Text style={{marginLeft:10}}>{item.time}</Text>

            </View>
            </View>
           
        </View>
        <View
                style={styles.end}
            />
        </View>
       
    )
 }
 _keyExtractor=(item,index)=>{
   return `${item.id || index}`
 }
 _renderFooter=()=>{
    if(this.state.loadMore){
    return(
       <ActivityIndicator
           size={"large"}
           color={"#2166A2"}
       />
    )
   } else{
       return null
   }
}

_loadMore=()=>{
    if(!this.state.loadMore){
       return null
    } else{
        this.setState((preState)=>{
            return{
               loadMore:true,
               page:preState.page +1
            }
        },()=>{
            this.getDetail()
        })
    }
}
  render() {
    return (
      <View style={styles.container}>
       <FlatList
            data={this.state.listLiqiudation}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._loadMore}
            onEndReachedThreshold={this.state.Thresold}
       />
      </View>
    );
  }
  getLiquidation=()=>{
      getLiquidation(this.state.page).then(res=>{
          if(res.data.code== Status.SUCCESS){
              this.setState({
                listLiqiudation:res.data.data,
                loadMore:true
              })
          } else if(res.data.code == Status.NO_CONTENT){
              this.setState({
                  listLiqiudation:[],
                  loadMore:false,
                  Thresold:0
              })
          } else if(res.data.code == Status.TOKEN_EXPIRED){
            navigation.reset(SigninScreen)
            removeItem('token')
        } else if(res.data.code == Status.TOKEN_VALID){
            navigation.reset(SigninScreen)
            removeItem('token')
          }
      })
  }
  componentDidMount = () => {
    this.getLiquidation()
  };
  
}

const data = [
    {
        id:1,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        description:'ssss',
        price:'100000',
        location:'Hà nội'
    },
    {
        id:2,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        description:'ssss',
        price:'100000',
        location:'Hà nội'
    },
    {
        id:3,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        description:'aaaa',
        price:'100000',
        location:'Hà nội'
    },
    {
        id:4,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        description:'abc',
        price:'100000',
        location:'Hà nội'
    },
    
]
const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding: 10,
    },
    end:{
        height:1,
        backgroundColor: 'gray',
        width:'100%'
    },
    image:{
        height:'80%',
        width:'80%',
      
    },
    Image:{
        height:100,
        alignItems:'center',
        justifyContent:'center',
        width:100,
        borderColor:'gray',
        borderRadius:5,
        borderWidth:1
    },
    dots:{
        height:25,
        width:25,
        position:'absolute',
        right:5,
        top: 8,
    },
    imgDots:{
        height:13,
        width:13,
        alignSelf: 'flex-end',
    },
    containerList:{
        padding: 10,
        flex:1,
        flexDirection: 'row',
    },
    txtPrice:{
        color:'#2166A2',
        marginTop: 5,
    },
    txtName:{
        marginTop:5,
        fontWeight: 'bold',
    },
    rowList:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
        flex:1
    },
    row:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    imgLocation:{
        height:12,
        width:12,
        marginTop: 4,
        marginHorizontal: 7,
    },
    containerText:{
        paddingLeft:10,
        flexWrap: 'wrap',
        flexShrink: 6
    }
})