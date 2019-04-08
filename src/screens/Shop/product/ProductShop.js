import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Image, Dimensions,TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import images from "assets/images"
import { getProduct } from 'config/apis/myShop';
import { Status, removeItem, formatNumber, showPopup } from 'config/Controller';
import navigation from 'navigation/NavigationService';
import { SigninScreen, HomeScreen, BuyProduct } from 'config/screenNames';
import { height } from 'config';
import { popupCancel } from 'config';

class MenuItem extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.btnMenu}>
                <Image source={this.props.source}
                style={[styles.imgMenu,{...this.props.style}]}
                resizeMode="contain"
                />
                <Text style={styles.txtMenu}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}
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
            })
        } else if(res.data.code== Status.NO_CONTENT){
            this.setState({
                ListProduct:[],
            })
        } else if(res.data.code == Status.TOKEN_EXPIRED){
            navigation.reset(SigninScreen)
            removeItem('token')
        } else if(res.data.code == Status.TOKEN_VALID){
            popupCancel('Bạn phải đăng nhập để xử dụng tính năng này',()=>navigation.navigate(SigninScreen))
        }
    }).catch(err=>{
        console.log(err.response,'err')
    })
  }
  showTitle=(item)=>{
    let name=''
    if(item.product_name&& item.product_name.length > 20 ){
          name= item.product_name.substring(0, 19) + "..." 
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
        navigation.navigate(BuyProduct)
    }
   
}
 _checkColor=(item,color)=>{
     if(item.status == 1){
        return{
            color: color
        } 
     }else{
         return{
             color:'#999999'
         }
     }
 }
 goDetail=(index)=>()=>{
     let data = [...this.state.ListProduct]
     data[index].isShow = true
     this.setState({ListProduct:data})
 }
 _handleMenu=(index)=>()=>{
    let data = [...this.state.ListProduct]
    data[index].isShow = false
    this.setState({ListProduct:data})
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
            <View style={styles.containerList}
            onStartShouldSetResponderCapture={this._handleMenu(index)}
            >
                <Image source={{uri:item.full_path}}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={this.goDetail(index)}
                style={styles.dots}
                >
                <Image source={images.dots}
                    style={styles.imgDots}
                    resizeMode="contain"
                />
                
                </TouchableOpacity>
                {item.isShow?<View style={styles.containerMenu}>
                        <MenuItem name={"Sửa"} style={styles.imgEdit} source={images.edit}/>
                        <MenuItem name={"Xoá"} source={images.trash}/>
                    </View>:null}
                <Text style={[styles.txtName,this._checkColor(item,'#555555')]}>{this.showTitle(item)}</Text>
                <Text style={[styles.txtPrice,this._checkColor(item,'#2166A2')]}>{formatNumber(item.price)} đ</Text>
                <Text style={[styles.time,this._checkColor(item,'#DE3232')]}>{item.time}</Text>
                <View>
                    
                </View>
            </View>
        )
    }
        
     
   
 }

 
 _keyExtractor=(item,index)=>{
   return `${item.product_id|| index}`
 }
 
  render() {
    return (
      <View style={styles.container}
      >
       <FlatList
            data={this.state.ListProduct}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            extraData={this.state}
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
        price:'100000',
        time:'conf lại 30 ngày',
        status:1
    },
    {
        id:2,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy ',
        price:'100000',
        time:'conf lại 30 ngày',
        status:1
    },
    {
        id:3,
        full_path:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        product_name:'Bình chữa cháy ',
        price:'100000',
        time:'conf lại 30 ngày',
        status:0
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
    containerMenu:{
        position:'absolute',
        right:10,
        elevation:2,
        padding:4,
        borderRadius:5,
        backgroundColor:'#FFFFFF',
        // zIndex:1,
        top: 8,
        flex:1,
    },
    btnMenu:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginBottom:6
    },
    txtMenu:{
        color:'#333333'
    },
    imgEdit:{
        height:12,
        width:12,
        marginLeft:4
    },
    imgMenu:{
        height:14,
        width:14,
        marginRight:5,
        tintColor:'#333333'
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
        maxWidth:'30%',
        padding: 10,
        margin: 5,
        elevation:1,
        flex:1,
    },
    containerAdd:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxWidth:'30%',
        paddingVertical: 50,
        // paddingHorizontal:3,
        flex:1,
        margin: 5,
        elevation:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtPrice:{
        color:'#2166A2',
        marginTop: 13,
        fontSize:12,
    },
    txtAdd:{
        color:'#2166A2',
        marginTop: 13,
        fontSize:12,
    },
    
    txtName:{
        marginTop:5,
        fontSize:12
    },
    time:{
        fontSize:12,
        
    }
})