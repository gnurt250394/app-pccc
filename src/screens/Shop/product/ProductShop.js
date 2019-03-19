import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Image, Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import images from "assets/images"
import { getProduct } from 'config/apis/myShop';
import { Status, _formatNumber, removeItem } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen } from 'config/screenNames';
export default class ProductShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ListProduct:[],
        loadMore:false,
        page:0,
        Threshold:0.1
    };
  }
  getDetail=()=>{
    getProduct(this.state.page).then(res=>{
        console.log(res.data,'log')
        if(res.data.code== Status.SUCCESS){
            this.setState({
                ListProduct:res.data.data,
                loadMore:true
            })
        } else if(res.data.code== Status.NO_CONTENT){
            this.setState({
                ListProduct:[],
                loadMore:false,
                Threshold:0
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
 _renderItem=({item,index})=>{
    if(item.id ==8){
        return (
         <View style={styles.containerList}>
         <Image source={images.shopAdd}
             style={styles.image}
         />
         <Text style={styles.txtPrice}>Thêm sản phẩm</Text>
     </View>
        )
    } else{
        return(
            <View style={styles.containerList}>
                <Image source={{uri:item.full_path}}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={this.goDetail}
                style={styles.dots}
                >
                <Image source={images.dots}
                    style={styles.imgDots}
                    resizeMode="contain"
                />
                </TouchableOpacity>
                <Text style={styles.txtName}>{item.product_name}</Text>
                <Text style={styles.txtPrice}>{_formatNumber(item.price)} đ</Text>
            </View>
        )
    }
        
     
   
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
         console.log('bb')
        return null
     } else{
         this.setState((preState)=>{
             return{
                loadMore:true,
                page:preState.page +1
             }
         },()=>{
             this.getDetail()
            console.log('aa')
         })
     }
 }
 _keyExtractor=(item,index)=>{
   return `${item.product_id|| index}`
 }
 
  render() {
    return (
      <View style={styles.container}>
       <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={(this._renderItem)}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._loadMore}
            onEndReachedThreshold={this.state.Threshold}
       />
      </View>
    );
  }
  componentDidMount = () => {
    this.getDetail()
  };
  
}

const data = [
    {
        id:1,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:2,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:3,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:4,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:5,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:6,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:7,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:8
    }
]
const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding: 10,
    },
    image:{
        height:100,
        width:100,
    },
    dots:{
        height:25,
        width:25,
        position:'absolute',
        right:5,
        top: 8,
    },
    imgDots:{
        height:15,
        width:15,
        alignSelf: 'flex-end',
    },
    containerList:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth:'31%',
        padding: 10,
        margin: 5,
        elevation:2,
        flex:1
    },
    txtPrice:{
        color:'#2166A2',
        marginTop: 13,
    },
    txtName:{
        marginTop:5
    }
})