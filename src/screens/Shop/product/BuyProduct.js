import React, { Component } from 'react';
import { View, Text,Image,ScrollView ,StyleSheet,FlatList,TextInput,TouchableOpacity,Dimensions} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import Item from './Item';
import images from 'assets/images'
import { chooseImage } from 'config/uploadImage';
const {width} = Dimensions.get('window')
export default class BuyProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listImage:[]
    };
  }
_goBack=()=>{
    navigation.pop()
}

    _sellProduct=()=>{
        let params={
            name:'',
            price :'',
            price_reduced:'',
            amount_sell :'',
            amount_remain :'',
            time_start :'',
            time_end :'',
            status :'',
            category_id :'',
            description:'',
            manufacturer:'',
            year_of_manufacture:'',
            user_id :'',
            city_id :'',
            district_id :'',
            address :'',
            file:'',
        }
    }
    _renderItem=({item,index})=>{
        if(index >= 2 && this.state.listImage.length !== 3){
            return(
                <View style={styles.containerList}>
                <Image 
                    source={{uri:item.image}}
                    style={styles.imageList}
                />  
                 <View style={styles.viewOpacity}>
                    <Text style={{color:'#FFFFFF'}}>{this.state.listImage.length -3}++</Text>
                </View>
                
                
               
            </View>
            )
        } else{
            return(
                <View style={styles.containerList}>
                    <Image 
                        source={{uri:item.image}}
                        style={styles.imageList}
                    />
                </View>
            )
            }
       
    }
    _choseImage=()=>{
        chooseImage().then(url => {
            this.setState({listImage: [...this.state.listImage,{image:url.uri}]})

        }).catch(err => {
            

        })
    }
    _listFooter=()=>{
        return(
            <TouchableOpacity style={styles.containerAdd}
            onPress={this._choseImage}
            >
                <Image 
                    source={images.mAdd}
                    style={styles.imageAdd}
                    resizeMode="contain"
                />
                    <Text style={{fontSize:12,color:'#2166A2'}}
                    >Thêm ảnh</Text>

            </TouchableOpacity>
        )
    }
    _keyExtractor=(item,index)=>{
        return `${item.id|| index}`
    }
    _nextCategory=()=>{
        navigation.navigate()
    }
  render() {
    return (
      <View>
      <Header
                title="Bán sản phẩm"
                check={1}
                onPress={this._goBack}
            />
            <ScrollView>
            <View style={styles.container}>
            <FlatList
                   data={this.state.listImage.slice(0,3)}
                   horizontal={true}
                   ListFooterComponent={this._listFooter}
                   showsHorizontalScrollIndicator={false}
                   renderItem={this._renderItem}
                   keyExtractor={this._keyExtractor}
               />
               
               <View style={styles.end}/>
               <TextInput 
                    style={styles.TextInput}
                    placeholder={"Tên sản phẩm"}
               />
               <View style={styles.end}/>
               <TextInput 
                    style={styles.TextInput}
                    placeholder={"Mô tả sản phẩm"}
                />
               <View style={styles.end}/>
               <TextInput 
                    style={styles.TextInput}
                    placeholder={"Thông tin chi tiết"}
               />
                <View style={styles.end2}/>
               <Item
                   source={images.menu}
                   onPress={this._nextCategory}
                   title={"Danh mục"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proPrice}
                   title={"Giá sản phẩm"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proPriceAfter}
                   title={"Giá sau giảm"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proQuanlity}
                   title={"Số lượng đăng bán"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proSupplier}
                   title={"Nhà cung cấp"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.calender}
                   title={"Thời gian đăng bán"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.sLocation}
                   title={"Địa điểm bán"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proManufacturer}
                   title={"Hãng sản phẩm"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proYear}
                   title={"Năm sản xuất"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proStatus}
                   title={"Tình trạng sản phẩm"}
                   name={''}
                   subName={">"}
               />
               <Item
                   source={images.proConfirm}
                   title={"APP xác nhận chất lượng"}
                   name={''}
                   subName={">"}
               />
               <TouchableOpacity style={styles.button}>
                   <Text style={styles.TextButton}>BÁN SẢN PHẨM</Text>
               </TouchableOpacity>
            </View>
           
            </ScrollView>
           
      </View>
    );
  }
}

const data =[
    // {
    //     id:1,
    //     image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    // },
    // {
    //     id:2,
    //     image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    // },
    // {
    //     id:3,
    //     image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    // },
    // {
    //     id:4,
    //     image:'https://znews-photo.zadn.vn/w860/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
    // },

   
    
]
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    viewOpacity:{
        opacity:0.6,
        backgroundColor:'#333333',
        flex:1,
        position: "absolute",
        height:80,
        width:width/4.4,
        alignItems:'center',
        justifyContent:'center'
    },
    containerAdd:{
        flex:1,
        height:80,
        width:width/4.4,
        marginVertical:7,
        marginLeft: 7,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#2166A2',
        borderWidth: 1,
    },
    containerList:{
        flex:1,
        height:80,
        width:width/4.4,
        marginVertical:7,
        marginLeft: 7,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#2166A2',
        borderWidth: 1,
    },
    imageList:{
        height:65,
        width:50,

    },
    imageAdd:{
        height:20,
        width:20,
        tintColor:'#2166A2'
    },
    button:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#2166A2',
        height:45,
        width:width-90,
        // marginVertical: 30,
        marginBottom:80,
        borderRadius: 8,
        alignSelf: 'center',
    },
    TextButton:{
        color:'#FFFFFF'
    },
    end:{
        height:1,
        marginTop: 5,
        width,
        backgroundColor:'#CCCCCC'
    },
    end2:{
        height:9,
        marginTop: 5,
        width,
        backgroundColor:'#CCCCCC',
        marginBottom: 10,
    },
    TextInput:{
        width,
        paddingLeft: 10,
    }
})