import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { Header } from 'components';
import images from "assets/images"
import Item from './Item';
const {width,height}= Dimensions.get('window')
export default class DetailProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
        project:{}
    };
  }


  showTitle=()=>{
      let name=''
      if(this.props.navigation.state&& this.props.navigation.state.params.name&& this.props.navigation.state.params.name > 30){
       name= this.props.navigation.state.params.name.substring(0, 29) + "..." 
      } else{
       name= this.props.navigation.state.params.name || 'Chi tiết dự án'
      }
    return name 
    
  }
  _renderItem=({item})=>{
      return(
          <Item
              item={item}
          />
      )
  }
  _keyExtractor=(item,index)=>{
      return `${item.id|| index}`
  }
  render() {
      let {project} = this.state
    return (
      <View style={{flex:1}}>
       <Header
            check={1}
            onPress={this._goBack}
            title={this.showTitle()}
        />
        <ScrollView>
        <View style={styles.container}>
        <Text>{project.name}</Text>
        <View style={styles.dateFolow}>
        <TouchableOpacity style={styles.buttonDate}>
            <Text>ngày tháng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.folow}>
            <Text>Theo dõi dự án</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Giá trị: {project.value}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Giai đoạn: {project.phase}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Tình trạng: {project.status}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Khởi công: {project.time_start}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Hoàn công: {project.time_end}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Hạng công trình xanh: {project.field_area}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Địa điểm: {project.address}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Diện tích sàn: {project.floor_area}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Số tầng: {project.floor}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Units: {project.unit}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Loại hình dự án: {project.type_project}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Loại hình phụ: </Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Mã số dự án: {project.project_code}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Loại quyền sở hữu: {project.ownership}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Loại đầu tư: {project.type_invest}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Mô tả dự án: {project.description}</Text>
            </View>
        <View style={styles.row}>
               <Text>
               <Image
                source={images.offline}
                style={styles.image}
               />  Các đối tác liên hệ: </Text>
            </View>
            <Text style={styles.txtTicker}>(Tích chọn để theo dõi các thông tin của đối tác)</Text>
            <FlatList
                data={data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const data = [
    {
        id: 30,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường Công Ty CP Xây Dựng & Thương Mại Phú Cường "
      },
    {
        id: 31,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
    {
        id: 32,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
    {
        id: 33,
        name: "Đào Cư Hà",
        phone: "84 24 33532855, 33530129",
        fax: null,
        email:'abcajkdasf@gmail.com',
        position:'Giám đốc',
        sub:'trung cư',
        address: "157 Ba La",
        company: "Công Ty CP Xây Dựng & Thương Mại Phú Cường"
      },
     
]
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
    },
    txtTicker:{
        fontSize:11,
        color:'#CCCCCC',
        fontStyle: 'italic',
    },
    row:{
        flexDirection:'row',
        marginBottom:9
    },
    Square:{
        flexDirection:'row'
    },
    rowList:{
        flexDirection:'row',
        marginBottom:9
    },
    dateFolow:{
        flexDirection:'row',
        marginVertical: 13,
    },
    buttonDate:{
         height:40,
         width:width/2.5,
         borderColor: '#707070',
         borderWidth: 1,
         borderRadius: 5,
         alignItems: 'center',
         justifyContent: 'center',
    },
    folow:{
         height:40,
         width:width/2.5,
         marginLeft: 15,
         borderColor: '#707070',
         borderWidth: 1,
         borderRadius: 5,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor:'#2166A2'
    },
    image:{
        height:8,
        width:8,
        tintColor:'gray',
        alignSelf: 'center',
        marginRight: 8,
    },
})