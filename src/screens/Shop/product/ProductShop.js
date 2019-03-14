import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet ,Image, Dimensions,TouchableOpacity} from 'react-native';
import images from "assets/images"
export default class ProductShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goDetail=()=>{

  }
 _renderItem=({item,index})=>{
    return(
        <View style={styles.containerList}>
            <Image source={{uri:item.image}}
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
            <Text style={styles.txtName}>{item.name}</Text>
            <Text style={styles.txtPrice}>{item.price}</Text>
        </View>
       
    )
 }
 _keyExtractor=(item,index)=>{
    `${item.id}`
 }
 
  render() {
    return (
      <View style={styles.container}>
       <FlatList
            data={data}
            numColumns={3}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
       />
      </View>
    );
  }
}

const data = [
    {
        id:1,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:2,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:3,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy ',
        price:'100000'
    },
    {
        id:4,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:4,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:4,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
    {
        id:4,
        image:'https://cdn.vatgia.vn/pictures/thumb/418x418/2017/03/dnl1490670116.png',
        name:'Bình chữa cháy abc bca abc asdf à asdf we sdfa',
        price:'100000'
    },
]
const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding: 10,
    },
    image:{
        height:100,
        width:'100%',
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