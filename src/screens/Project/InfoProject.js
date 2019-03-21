import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,TouchableOpacity } from 'react-native';
import { Header } from 'components';
import navigation from 'navigation/NavigationService';
import images from "assets/images"
import { DetailProject } from 'config/screenNames';

const {width,height}= Dimensions.get('window')
export default class InfoProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

/**
 * check thêm phần chuyển từ màn tracking qua => param type: tracking
 */

_nextPage=(router,params)=>()=>{
    navigation.navigate(router,params)
}
  _renderItem=({item})=>{
      return(
          <TouchableOpacity
          onPress={this._nextPage(DetailProject,{id:item.id,name:item.name})}
           style={styles.container}>
          <View style={styles.containerList}>
            <View style={styles.Header}>
                <Text style={styles.txtHeader}>{item.name}</Text>
            </View>
            <View style={styles.row}>
               
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Loại dự án: {item.type_project}</Text>
            </View>
            <View style={styles.row}>
               
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Trạng thái dự án: {item.status}</Text>
            </View>
            <View style={styles.row}>
               
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Thời gian bắt đầu: {item.time_start}</Text>
            </View>
            <View style={styles.row}>
               
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Thời gian kết thúc: {item.time_end}</Text>
            </View>
            <View style={styles.row}>
               
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Địa điểm: {item.address}</Text>
            </View>
          </View>
          <View style={styles.end}/>
          </TouchableOpacity>
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  _goBack=()=>{
    navigation.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
            check={1}
            onPress={this._goBack}
            title={"Thông tin dự án"}
        />
        <FlatList
            data={data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const data = [
    {
        id: 5,
        "name": "TRƯỜNG MẦM NON - xây mới",
        "name_description": "TRƯỜNG MẦM NON TẠI LÔ ĐẤT MN SỐ 90 ĐƯỜNG NGUYỄN TUÂN - QUẬN THANH XUÂN",
        "status": "Triển khai thi công chính thức",
        "type_project": null,
        "time_start": "2018-07-26 07:28:04",
        "time_end": "2019-09-29 00:00:00",
        "address": "Lô MN, 90 Nguyễn Tuân, Phường Thanh Xuân Trung"
      },
      {
        "id": 4,
        "name": "TRƯỜNG MẦM NON - xây mới (TRƯỜNG MẦM NON TẠI PHƯỜNG KHƯƠNG ĐÌNH - QUẬN THANH XUÂN)",
        "name_description": "TRƯỜNG MẦM NON TẠI PHƯỜNG KHƯƠNG ĐÌNH - QUẬN THANH XUÂN",
        "status": "Triển khai thi công chính thức",
        "type_project": null,
        "time_start": "2018-08-14 07:28:04",
        "time_end": "2019-10-21 00:00:00",
        "address": "Phường Khương Đình"
      }
]
const styles= StyleSheet.create({
    containerList:{
        flex:1,
        padding: 10,
    },
    container:{
        flex:1,
    },
    image:{
        height:8,
        width:8,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
    txtHeader:{
        fontWeight:'600',
        fontSize:15,
    },
    row:{
        flexDirection:'row',
        marginBottom:5
    },Header:{
        marginBottom:15
    },
    end:{
        height:8,
        backgroundColor: '#CCCCCC',
        width
    }
})
