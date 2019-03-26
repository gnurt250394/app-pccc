import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Image, Dimensions,TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import images from "assets/images"
import { getProduct } from 'config/apis/myShop';
import { Status, removeItem, formatNumber, showPopup } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen, BuyProduct } from 'config/screenNames';
import { height } from 'config';
export default class ProductShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ListProduct:data,
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
  showTitle=(item)=>{
    let name=''
    if(item.product_name&& item.product_name.length > 50 ){
          name= item.product_name.substring(0, 49) + "..." 
    } else{
     name= item.product_name 
    }
  return name 
}

_addItem=()=>{
    let list = this.state.ListProduct
    if(list.length >5){
        Alert.alert(
            'Thông báo',
            'Bạn muốn mua thêm lượt không?',
            [
              {
                text: 'Cancel', style: 'cancel'
              },
              {text: 'OK', onPress:  () => {
                    navigation.navigate(HomeScreen)
                
              }},
            ],
            {cancelable: false},
          );
    } else{
        // this.setState({ListProduct:[{id:10,full_path:'',price:100000000,product_name:'bình cứu hỏa 123'},...this.state.ListProduct]})
        console.log(this.state.ListProduct,'liiisst')
        navigation.navigate(BuyProduct)
    }
   
}
 _renderItem=({item,index})=>{
    if(item.add ==true){
        return (
         <TouchableOpacity style={styles.containerAdd}
         onPress={this._addItem}
         >
         <Image source={images.shopAdd}
             style={styles.imageAdd}
         />
         <Text style={styles.txtAdd}>Thêm sản phẩm</Text>
     </TouchableOpacity>
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
                <Text style={styles.txtName}>{this.showTitle(item)}</Text>
                <Text style={styles.txtPrice}>{formatNumber(item.price)} đ</Text>
            </View>
        )
    }
        
     
   
 }

 
 _keyExtractor=(item,index)=>{
   return `${item.product_id|| index}`
 }
 
  render() {
    return (
      <View style={styles.container}>
       <FlatList
            data={this.state.ListProduct}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={(this._renderItem)}
            keyExtractor={this._keyExtractor}
       />
      </View>
    );
  }
  componentDidMount = () => {
    // this.getDetail()
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
        add:true
    }
]
const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding: 10,
    },
    image:{
        height:100,
        // width:100,
    },
    imageAdd:{
        height:50,
        width:50,
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
        flex:1,
        height:height/3
    },
    containerAdd:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth:'31%',
        padding: 10,
        margin: 5,
        elevation:2,
        height:height/3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtPrice:{
        color:'#2166A2',
        marginTop: 13,
        fontSize:12,
        justifyContent:'flex-end',
        position:'absolute',
        bottom:8,
        left:4
    },
    txtAdd:{
        color:'#2166A2',
        marginTop: 13,
        fontSize:12,
    },
    
    txtName:{
        marginTop:5,
        fontSize:12
    }
})