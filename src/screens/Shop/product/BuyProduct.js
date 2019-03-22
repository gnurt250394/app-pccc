import React, { Component } from 'react';
import { View, Text,Image,ScrollView ,StyleSheet,FlatList,TextInput,TouchableOpacity,Dimensions} from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import Item from './Item';
import images from 'assets/images'
const {width} = Dimensions.get('window')
export default class BuyProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
const styles = StyleSheet.create({
    container:{
        flex:1
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