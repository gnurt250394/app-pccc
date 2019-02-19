import React, { Component } from 'react';
import { View, Text,ScrollView,Image,StyleSheet,TouchableOpacity,StatusBar,Dimensions,TextInput,SectionList } from 'react-native';
import images from "public/images"

const {width,height} = Dimensions.get('window')

const sectionList = [{title: 'Một số sản phẩm thế mạnh',
 data: ['Hệ thống báo cháy tự động Hochiki',
 'Hệ thống báo cháy thông thường UniPOS' , 
 'Hệ thống báo cháy địa chỉ UniPOS',
 'Hệ thống báo cháy không dây UniPOS',
 'Hệ thống báo cháy Horing',
 'Hệ thống báo cháy VES']},
{title: 'Một số sản phẩm thế mạnh',
 data: ['Hệ thống chữa cháy khí aerosol FirePro Xtinguish – Hochiki',
    'Hệ thống chữa cháy khí FM-200',
    'Hệ thống chữa cháy khí N2 (Ni tơ)',
   ' Hệ thống chữa cháy khí HFC',
    'Hệ thống chữa cháy bằng khí CO2']},
{title: 'hệ thống chữa cháy thông thường',
 data: ['Bình chữa cháy bột ABC, khí Co2',
 'Cuộn vòi chữa cháy',
 'Tủ chữa cháy vách tường',
 'Trụ nước chữa cháy',
 'Van góc, alarm valve, công tắc dòng chảy …']},
{title: 'dịch vụ kỹ thuật',
 data: ['Tư vấn thiết kế hệ thống PCCC, hỗ trợ hồ sơ thủ tục thẩm duyệt, cấp giấy phép',
 'Tư vấn kiểm định thiết bị PCCC trước khi đưa vào lắp đặt tại công trình',
 'Dịch vụ lắp đặt – vận hành – chuyển giao công nghệ',
 'Dịch vụ bảo trì – bảo dưỡng hệ thống PCCC']}]

export default class Introduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  _renderHeader=({section})=>{
      return(
<Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>
      )
  }
  _RenderItem=({item})=> {
      return (
    <View style={styles.itemRow}>
        <View style={styles.items}/>
        <View style={styles.WrapText}>
        <Text style={styles.txt}>{item}</Text>
        </View>
    </View>
        )}
  
  render() {
    return (
            <View style={{flex:1}}>
         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
       <View style={styles.row}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Image 
                                style={[styles.icon, {margin: 10, width: 10,tintColor:'black'}]}
                                source={images.back} />
                        </TouchableOpacity>
                        <Text style={styles.headText}>Giới thiệu</Text>
                     
                    </View>
                    <ScrollView>
                    <View style={styles.container}>
                    <View>
                        <Text style={styles.txtTitle}>Về chúng tôi</Text>
                        <Text style={{fontSize:16,fontWeight:'500',marginBottom:7}}>SIÊU THỊ PHÒNG CHÁY CHỮA CHÁY – CTY PHÒNG CHÁY CHỮA CHÁY THĂNG LONG CAM KẾT:</Text>
                        <Text>{`“Cung cấp cho khách hàng dịch vụ tốt nhất, hàng hoá chất lượng cao nhất và giải pháp thích hợp nhất” \n
Công ty CP phòng cháy chữa cháy Thăng Long chuyên nhập khẩu và phân phối các sản phẩm phòng cháy chữa cháy. \n
Công ty cũng cung cấp dịch vụ tư vấn thiết kế, lắp đặt, vận hành và bảo trì hệ thống phòng cháy chữa cháy cho các công trình tại Việt Nam, Lào và Cambodia.`}</Text>
                      <SectionList
                      sections={sectionList}
            renderItem={this._RenderItem}
          renderSectionHeader={this._renderHeader}
          keyExtractor={(item, index) => index}
                      />
                      <Text style={{fontSize:15,fontWeight:'500',marginTop:25,marginBottom:9}}>Để được tư vấn chi tiết vui lòng gọi 024.6294.5058</Text>
                      <View>
                          <Text style={styles.txt}>Mã Số Thuế: <Text>0106374492</Text></Text>
                          <Text style={styles.txt}>Địa chỉ: <Text>58B Vũ Trọng Phụng - Thanh Xuân - Hà Nội</Text></Text>
                          <Text style={styles.txt}>Kho hàng: <Text>84 Miếu Đầm - Nam Từ Liêm - Hà Nội</Text></Text>
                          <Text style={styles.txt}>Email: <Text>kinhdoanh@phongchaythanglong.vn</Text></Text>
                      </View>
                    </View>
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 18,
        resizeMode: 'contain',
    },
    headText:{
        fontSize: 20, 
        color: '#333333', 
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container:{
        flex:1,
        padding: 15,
    },
   sectionHeader:{
        fontWeight:'500',
        fontSize:16,
        marginTop: 25,
        marginBottom: 5,
   },
    items:{
        height:6,
        width:6,
        marginRight: 8,
        backgroundColor:'#333333',
        borderRadius: 3,
        marginLeft: 5,
        marginTop:8
        // alignSelf:'center'
    },
    itemRow:{
        flexDirection:'row'
    },
    WrapText:{
        flexWrap:'wrap',
        flexShrink: 5,
    },
    txtTitle:{
        fontWeight:'bold',
        fontSize:19,
        marginBottom:8
    },
    txt:{
        marginBottom:5,
        marginRight:5
    }
   
})